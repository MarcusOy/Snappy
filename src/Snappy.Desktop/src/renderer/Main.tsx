import { ChakraProvider, Spinner } from "@chakra-ui/react";
import React from "react";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import { SnappyStore } from "./data/DataStore";
import useLoader from "./hooks/useLoader";
import { ApolloProvider } from "@apollo/client";
import useAudexApolloClient from "./hooks/useAudexApolloClient";

const Main = () => {
  let { isLoading, isError } = useLoader();
  let authState = SnappyStore.useState((s) => s.identity);
  let isAuthenticated = authState.accessToken && authState.refreshToken;

  console.log({ authState });
  console.log({ isAuthenticated });

  const client = useAudexApolloClient();

  let content;
  if (isLoading) content = <Spinner />;
  if (isError) content = <Spinner label="Error occured. Restart the app." />;
  content = isAuthenticated ? <ChatPage /> : <LoginPage />;

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>{content}</ChakraProvider>
    </ApolloProvider>
  );
};

export default Main;
