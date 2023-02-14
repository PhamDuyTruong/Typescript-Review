import { Box, Flex, Spinner, Stack, Link, Heading, Text, Button } from "@chakra-ui/react";
import { PostDocument, usePostsQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import NextLink from 'next/link';
import Layout from "../components/Layout";
import PostEditDeleteButton from "../components/PostEditDeleteButton";
import { NetworkStatus } from "@apollo/client";

export const limit = 3
const Index = () => {
  const {data, loading, fetchMore, networkStatus} = usePostsQuery({
    variables: { limit },
		notifyOnNetworkStatusChange: true
  });

  const loadMorePost = () => fetchMore({variables: {cursor: data?.posts?.cursor}});
  const loadingMorePost = networkStatus === NetworkStatus.fetchMore

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
     {data?.posts?.hasMore && (
      <Flex>
        <Button m="auto" my={8} isLoading={loadingMorePost} onClick={loadMorePost}>
          {loadingMorePost ? "loading": "Show more"}
        </Button>
      </Flex>
     )}
  </Layout>)
};

export const getStaticProps = async() => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: PostDocument,
    variables: {
      limit
    }
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default Index
