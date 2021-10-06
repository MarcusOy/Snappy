import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import * as ReactDOM from "react-dom";
import ChatPage from "./pages/ChatPage";

import "./App.css";

ReactDOM.render(
  <ChakraProvider>
    <ChatPage />
  </ChakraProvider>,
  document.getElementById("root")
);
