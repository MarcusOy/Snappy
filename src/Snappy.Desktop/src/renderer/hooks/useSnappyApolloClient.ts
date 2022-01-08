import { SnappyStore } from "../data/DataStore";
import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  split,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { ApolloLinkJWT } from "../data/apollo/apollo-jwt/index";
import { useCallback, useEffect, useState } from "react";
import { getMainDefinition } from "@apollo/client/utilities";
import { getGqlString } from "../data/Helpers";
import { REAUTHENTICATE } from "../data/apollo/Mutations";
import { customFetch } from "../data/apollo/apolloCustomFetch";
import ServerService from "../data/services/ServerService";
import IdentityService from "../data/services/IdentityService";

const useSnappyApolloClient = (): ApolloClient<any> => {
  const identityState = SnappyStore.useState((s) => s.identity);
  const connectionState = SnappyStore.useState((s) => s.connection);
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  const getTokens = useCallback(async () => {
    const { accessToken, refreshToken } = identityState;

    return {
      accessToken,
      refreshToken,
    };
  }, [identityState]);

  const onRefreshComplete = useCallback(
    async (data: any) => {
      // Find and return the access token and refresh token from the provided fetch callback
      // console.log(data);
      const newAccessToken = data?.data?.reauthenticate?.authToken;
      const newRefreshToken = data?.data?.reauthenticate?.refreshToken;

      // Handle sign out logic if the refresh token attempt failed
      if (!newAccessToken || !newRefreshToken) {
        // Before we log the user out, check if server is down
        if (await ServerService.isServerUp()) {
          // Server is not down and user's credentials are bad
          console.log("Server is online and rejecting user credientials.");
          IdentityService.logOut();
        } else {
          // Server is down, so do not log out the user
          console.log("Server seems to be down.");
        }
        return;
      }

      // Update Identity
      IdentityService.authenticate(
        identityState.username!,
        newAccessToken,
        newRefreshToken
      );

      // Return the tokens back to the lib to cache for later use
      return {
        newAccessToken,
        newRefreshToken,
      };
    },
    [identityState]
  );

  /**
   * Configure the body of the token refresh method
   */
  const fetchBody = useCallback(
    async () => ({
      query: getGqlString(REAUTHENTICATE),
      variables: {
        token: identityState.refreshToken,
      },
    }),
    [identityState]
  );

  /**
   * Construct Apollo client's chain of links.
   * Change the api endpoint ONLY when user changes servers
   */
  useEffect(() => {
    // If no server is selected, do not set a client
    if (!connectionState) {
      setClient(null);
      return;
    }
    const uri = `https://${connectionState.hostName}/api/${connectionState.apiVersion}/graphql`;
    console.log(`Changing client uri to ${uri}`);
    // Create Apollo Link JWT
    const apolloLinkJWT = ApolloLinkJWT({
      apiUrl: uri,
      getTokens,
      fetchBody,
      onRefreshComplete,
      fetchHeaders: {
        "Content-Type": "application/json",
      },
      debugMode: false,
    });

    // Normal Apollo HTTP link, with Upload Multi-part capability
    const httpLinkWithUpload = createUploadLink({
      uri: uri,
      fetch: customFetch as any, // customFetch allows progress tracking
    });

    // Websocket Apollo link
    const wsLink = new WebSocketLink({
      uri: `wss://${connectionState.hostName}/api/${connectionState.apiVersion}/graphql`,
      options: {
        reconnect: true,
        lazy: true,
        connectionParams: {
          Authorization: identityState.accessToken,
        },
      },
    });

    // Split link between websocket (subscriptions) and HTTP requests (queries, mutations, etc)
    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLinkWithUpload
    );

    // Bypass JWT authentication ONLY when logged out
    const links = [splitLink];
    if (identityState.accessToken && identityState.refreshToken)
      links.unshift(apolloLinkJWT);

    setClient(
      new ApolloClient({
        link: from(links),
        cache: new InMemoryCache(),
      })
    );
  }, [connectionState, identityState]);

  return (
    client ??
    new ApolloClient({
      uri: "https://localhost:1337/api/v1/graphql",
      cache: new InMemoryCache(),
    })
  );
};

export default useSnappyApolloClient;
