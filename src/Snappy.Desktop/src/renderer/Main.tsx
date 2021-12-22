import { ChakraProvider, Spinner } from "@chakra-ui/react";
import React from "react";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import { SnappyStore } from "./data/DataStore";
import useLoader from "./hooks/useLoader";

// request interceptor to add token to request headers
axios.interceptors.request.use(
  async (config) => {
    const { server, accessKey } = SnappyStore.getRawState().identity;
    config.baseURL = `http://${server}/api/`;

    if (accessKey) {
      config.headers = {
        Authorization: `Bearer ${accessKey}`,
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
      console.log("Authentication failed. Refreshing token...");
      config._retry = true;

      let token = await refreshAccessToken();
      localStorage.setItem("token", token);
      SnappyStore.update((s) => {
        s.identity.accessKey = token;
      });

      return axios(config);
    }

    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  let { refreshKey, server } = SnappyStore.getRawState().identity;

  let token = await axios.request({
    method: "POST",
    url: `http://${server}/api/refresh/`,
    data: { refresh: refreshKey },
  });

  return token.data.accessKey;
};

const Main = () => {
  let { isLoading, isError } = useLoader();
  let authState = SnappyStore.useState((s) => s.identity);
  let isAuthenticated = authState.accessKey && authState.refreshKey;

  console.log(authState);
  console.log(isAuthenticated);

  if (isLoading) return <Spinner />;
  if (isError) return <Spinner label="Error occured. Restart the app." />;

  return (
    <ChakraProvider>
      {isAuthenticated ? <ChatPage /> : <LoginPage />}
    </ChakraProvider>
  );
};

export default Main;
