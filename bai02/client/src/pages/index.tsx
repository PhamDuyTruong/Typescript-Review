import Navbar from "../components/Navbar"
import { PostDocument } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";


const Index = () => (
  <>
     <Navbar />
    <h1>Hello World</h1>

  </>
);

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
