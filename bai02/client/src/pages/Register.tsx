import { Box, Button, FormControl } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import {useMutation} from '@apollo/client'

const Register = () => {

    const initialValues: NewUserInput = { username: "", email: "", password: "" }

    interface UserMutationResponse{
        code: number
        success: boolean
        message: string
        user: string
        errors: string
    }

    interface NewUserInput{
        username: string
        email: string
        password: string
    }

    const [registerUser, {data, error}] = useMutation<
       {register: UserMutationResponse},
       {registerInput: NewUserInput}
    >(registerMutation);

    const handleRegisterSubmit = (values: NewUserInput) => {
        return registerUser({
            variables: {
                registerInput: values
            }
        })
    }
  return (
      <Wrapper>
        {error && <p>Failed to register</p>}
        {data && data.register.success ? <p>Registered successfully {JSON.stringify(data)}</p> : null}
        <Formik
        initialValues={initialValues}
        onSubmit={handleRegisterSubmit}
      >
        {({isSubmitting}) => (
          <Form>
            <FormControl>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
                type="text"
              ></InputField>
               <Box mt="4">
                <InputField
                    name="email"
                    placeholder="email"
                    label="Email"
                    type="text"
                ></InputField>
               </Box>
               <Box mt="4">
                <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                ></InputField>
               </Box>
              
              <Button type="submit" colorScheme='teal' mt="4" isLoading={isSubmitting}>
                   Register
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
      </Wrapper>
     
  );
};

export default Register;
