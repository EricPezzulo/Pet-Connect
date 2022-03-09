import { ApolloClient, InMemoryCache } from "@apollo/client";

// const apolloClient = new ApolloClient({
//   uri: "https://pet-connect.vercel.app/api/graphql",
//   cache: new InMemoryCache(),
// });

const apolloClient = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export default apolloClient;
