import { ApolloClient, InMemoryCache } from "@apollo/client";
import { urlResolver } from "./UrlResolver";

export const client = new ApolloClient({
  uri: urlResolver.graphql(),
  cache: new InMemoryCache(),
});
