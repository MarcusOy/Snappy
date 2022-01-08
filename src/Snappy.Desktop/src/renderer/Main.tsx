import { ChakraProvider, Spinner } from "@chakra-ui/react";
import React from "react";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import { SnappyStore } from "./data/DataStore";
import useLoader from "./hooks/useLoader";
import { ApolloProvider } from "@apollo/client";
import useSnappyApolloClient from "./hooks/useSnappyApolloClient";

const MainLoader = () => {
  let { isLoading, isError } = useLoader();

  let content = <Main />;
  if (isLoading || isError)
    content = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner label="Loading Snappy..." />{" "}
      </div>
    );

  return <ChakraProvider>{content}</ChakraProvider>;
};

const Main = () => {
  const client = useSnappyApolloClient();
  let state = SnappyStore.useState();
  let isAuthenticated =
    state.identity.accessToken && state.identity.refreshToken;

  console.log({ state });
  console.log({ isAuthenticated });

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        {isAuthenticated ? <ChatPage /> : <LoginPage />}
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MainLoader;
