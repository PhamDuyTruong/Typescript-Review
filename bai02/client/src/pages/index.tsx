import { Box, Flex, Spinner, Stack, Link, Heading, Text } from "@chakra-ui/react";
import { PostDocument, usePostsQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import NextLink from 'next/link';
import Layout from "../components/Layout";
import PostEditDeleteButton from "../components/PostEditDeleteButton";

export const limit = 3
const Index = () => {
  const {data, loading} = usePostsQuery({
    variables: { limit },
		notifyOnNetworkStatusChange: true
  })

  return(
  <Layout>
     {
      loading ? (
        <Spinner />
      ) : (
        <Stack spacing={8}>
            {data?.posts?.paginatedPosts.map(post => {
              return (
                <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
                  <Box>
                    <NextLink href={`/post/${post.id}`}>
                      <Link>
                        <Heading fontSize='xl'>
                          {post.title}
                        </Heading>
                      </Link>
                    </NextLink>
                    <Text>Posted by {post.user.username}</Text>
                    <Flex align="center">
                      <Text mt={4}>{post.textSnippet}</Text>
                      <Box ml="auto">
                          <PostEditDeleteButton />
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              );
            })}
        </Stack>
      )
     }
  </Layout>)
};

export const getStaticProps = async() => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: PostDocument,
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default Index
