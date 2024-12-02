"use client";

import { Children } from "@/types/types";

import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@/config/apolloClient";

const client = createApolloClient();

function ApolloProviders({ children }: Children) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloProviders;
