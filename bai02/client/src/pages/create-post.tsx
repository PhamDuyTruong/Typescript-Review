import { Box, Button, Flex, FormControl, Spinner } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import router from 'next/router';
import React from 'react'
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import { CreatePostInput, useCreatePostMutation } from '../generated/graphql';
import { useCheckAuth } from '../utils/useCheckAuth';

const CreatePost = () => {
    const { data: authData, loading: authLoading } = useCheckAuth();
    const initialValues = {title: '', text: ''}
    const [createPost, _] = useCreatePostMutation();
    const handleCreateSubmit = async (values: CreatePostInput) => {
        await createPost({
            variables: {createPostInput: values},
            update(cache, {data}){
                cache.modify({
                    fields: {
                        posts(existing){
                            if(data?.createPost.success && data.createPost.post){
                                const newPostRef = cache.identify(data.createPost.post);

                                const newPostAfterCreation = {
                                    ...existing,
                                    totalCount: existing.totalCount + 1,
                                    paginatedPosts: [
                                        {_ref: newPostRef},
                                        ...existing.paginatedPost,
                                        
                                    ]
                                }
                                return newPostAfterCreation
                            }
                        }
                    }
                })
            }
        })
        router.push("/")
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