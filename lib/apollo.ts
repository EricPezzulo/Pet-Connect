import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://pet-connect.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

export default apolloClient;
