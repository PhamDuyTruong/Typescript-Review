import { Box, Button, FormControl } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import {RegisterInput, useRegisterMutation} from '../generated/graphql'

const Register = () => {

    const initialValues: RegisterInput = { username: "", email: "", password: "" }

    const [registerUser, {loading: _registerUserLoading, data, error}] = useRegisterMutation()

    const handleRegisterSubmit = async (values: RegisterInput) => {
        const response = await registerUser({
            variables: {
                registerInput: values
            }
        })
        console.log(response)
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
