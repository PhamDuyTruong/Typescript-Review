import { Box, Button, Flex, FormControl, Spinner } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react'
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import { useCheckAuth } from '../utils/useCheckAuth';

const CreatePost = () => {
    const { data: authData, loading: authLoading } = useCheckAuth();
    const initialValues = {title: '', text: ''}
    const handleCreateSubmit = () => {

    }
    if (authLoading || (!authLoading && !authData?.me)) {
        return (
            <Flex justifyContent="center" alignItems="center" minH="100vh">
                <Spinner></Spinner>
            </Flex>
        )
    } else {
        return (
            <Layout>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleCreateSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <FormControl>
                                <InputField
                                    name="title"
                                    placeholder="Title"
                                    label="Title"
                                    type="text"
                                ></InputField>
                                <Box mt="4">
                                    <InputField
                                        textarea
                                        name="text"
                                        placeholder="Text"
                                        label="Text"
                                        type="text"
                                    ></InputField>
                                </Box>

                                <Button type="submit" colorScheme='teal' mt="4" isLoading={isSubmitting}>
                                    Create Post
                                </Button>
                            </FormControl>
                        </Form>
                    )}
                </Formik>
            </Layout>
        )

    }


}

export default CreatePost