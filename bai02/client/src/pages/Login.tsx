import { Box, Button, FormControl, Spinner, useToast } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { LoginInput, MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { mapFieldError } from "../helpers/mapFieldErrors";
import { useChekAuth } from "../utils/useCheckAuth";

const Login = () => {
    const router = useRouter();
    const toast = useToast();
    const {data: authData, loading: authLoading} = useChekAuth();
    const initialValues: LoginInput = { usernameOrEmail: "", password: "" }

    const [loginUser, {loading: _loginUserLoading, data, error}] = useLoginMutation()

    const handleLoginSubmit = async (values: LoginInput, {setErrors}: FormikHelpers<LoginInput>) => {
        const response = await loginUser({
            variables: {
                loginInput: values
            },
            update(cache, {data}){
                if(data?.login.success){
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {me: data.login.user}
                    })
                }
            }
        })
        if(response.data?.login.errors){
           setErrors(mapFieldError(response.data.login.errors))
        }else if(response.data?.login.user){
            toast({
                title: 'Welcome.',
                description: "Login successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
              })      
          router.push('/');
        }
    }

    if(authLoading || (!authLoading && authData?.me)){
        return <Spinner />
    }
  return (
      <Wrapper>
        {error && <p>Failed login. Internal Server</p>}
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