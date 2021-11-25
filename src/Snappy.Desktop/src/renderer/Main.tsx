import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";

import { SnappyStore } from "./data/DataStore";

const Main = () => {
  let authState = SnappyStore.useState((s) => s.identity);
  let isAuthenticated = authState.accessKey && authState.refreshKey;

  console.log(authState);
  console.log(isAuthenticated);

  return (
    <ChakraProvider>
      {isAuthenticated ? <ChatPage /> : <LoginPage />}
    </ChakraProvider>
  );
};

export default Main;
