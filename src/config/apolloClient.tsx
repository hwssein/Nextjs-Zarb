import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: process.env.HYGRAPH_URI,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
