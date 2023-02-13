import { Box, Button, FormControl } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { LoginInput, useLoginMutation } from "../generated/graphql";
import { mapFieldError } from "../helpers/mapFieldErrors";

const Login = () => {
    const router = useRouter();

    const initialValues: LoginInput = { usernameOrEmail: "", password: "" }

    const [loginUser, {loading: _loginUserLoading, data, error}] = useLoginMutation()

    const handleLoginSubmit = async (values: LoginInput, {setErrors}: FormikHelpers<LoginInput>) => {
        const response = await loginUser({
            variables: {
                loginInput: values
            }
        })
        if(response.data?.login.errors){
           setErrors(mapFieldError(response.data.login.errors))
        }else if(response.data?.login.user){
          router.push('/');
        }
    }
  return (
      <Wrapper>
        {error && <p>Failed login. Internal Server</p>}
        {data && data.login.success ? <p>Login successfully {JSON.stringify(data)}</p> : null}
        <Formik
        initialValues={initialValues}
        onSubmit={handleLoginSubmit}
      >
        {({isSubmitting}) => (
          <Form>
            <FormControl isInvalid={!!error}>
              <InputField
                name="usernameOrEmail"
                placeholder="username or email"
                label="Username or Email"
                type="text"
              ></InputField>
               <Box mt="4">
                <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                ></InputField>
               </Box>
              
              <Button type="submit" colorScheme='teal' mt="4" isLoading={isSubmitting}>
                   Login
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
      </Wrapper>
     
  );
}

export default Login