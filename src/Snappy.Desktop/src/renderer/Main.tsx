import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import { SnappyStore } from "./data/DataStore";

// request interceptor to add token to request headers
axios.interceptors.request.use(
  async (config) => {
    const token = SnappyStore.getRawState().identity.accessKey;

    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor intercepting 401 responses, refreshing token and retrying the request
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (error.response.status === 401 && !config._retry) {
      config._retry = true;
      localStorage.setItem("token", await refreshAccessToken());

      return axios(config);
    }

    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  let refresh = SnappyStore.getRawState().identity.refreshKey;
  let url = SnappyStore.getRawState().currentServer;

  let token = await axios.request({
    method: "POST",
    url: `http://${url}/api/refresh/`,
    data: { refresh },
  });

  return token.data.accessKey;
};

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
