import { Alert, AlertIcon, AlertTitle, Box, Button, Flex, Heading, Spinner } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout';
import PostEditDeleteButton from '../../components/PostEditDeleteButton';
import { PostDocument, PostIdsDocument, PostIdsQuery, PostQuery, usePostIdsQuery, usePostQuery } from '../../generated/graphql';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';
import NextLink from 'next/link'
const  Post = () => {
    const router = useRouter();
    const {data, loading, error} = usePostQuery({variables: {id: router.query.id as string}});

    if(error){
        return null
    }

    if(!data?.post){
        return (
            <Alert status='error'>
                <AlertIcon />
                <AlertTitle>{error ? "Error" : "Post not found"}</AlertTitle>
            </Alert>
        )
    }
  return (
    <Layout>
        {loading ? (<Spinner />) : (
            <>
              <Heading mb={4}>{data.post.title}</Heading>
              <Box mb={4}>
                {data.post.text}
              </Box>
              <Flex justifyContent='space-between' alignItems='center'>
				<PostEditDeleteButton
					postId={data.post.id}
					postUserId={data.post.userId.toString()}
				/>
				<NextLink href='/'>
					<Button>Back to Homepage</Button>
				</NextLink>
			</Flex>
            </>
        )}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async() => {
    const apolloClient = initializeApollo()

	const { data } = await apolloClient.query<PostIdsQuery>({
		query: PostIdsDocument,
		variables: { limit: 3 }
	})
    return {
        paths: data?.posts!.paginatedPosts.map(post =>(
            {params: {id: `${post.id}`}}
        )),
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps<
	{ [key: string]: any },
	{ id: string }
> = async ({ params }) => {
	const apolloClient = initializeApollo()

	await apolloClient.query<PostQuery>({
		query: PostDocument,
		variables: { id: params?.id }
	})

	return addApolloState(apolloClient, { props: {} })
}

export default Post