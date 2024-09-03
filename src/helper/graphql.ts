import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import {setContext} from "@apollo/client/link/context";

import {apiUrl} from "../config";

import {getToken} from "./storage";

const httpLink = new HttpLink({
  uri: apiUrl,
  credentials: "include",
});

const authLink = setContext((_, {headers}) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const gqlClient = new ApolloClient({
  uri: apiUrl,
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
