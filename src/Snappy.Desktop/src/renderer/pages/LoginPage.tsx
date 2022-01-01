import React, { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Form from "../components/Form";
import FormTextBox from "../components/FormTextBox";
import IdentityService from "../data/services/IdentityService";
import LoginIdentity from "../components/LoginIdentity";
import { AUTHENTICATE } from "../data/apollo/Mutations";
import ServerService from "../data/services/ServerService";
import { ApolloClient, InMemoryCache, useMutation } from "@apollo/client";
interface FormFields {
  identity: string;
  password: string;
  isPersistent: boolean;
  code?: string;
}

const LoginPage = () => {
  const [authenticate, { loading, error }] = useMutation(AUTHENTICATE);
  const [isShowingTwoFactor, setIsShowingTwoFactor] = useState(false);
  const toast = useToast();
  const onSubmit = (data: FormFields) => {
    let [username, server] = data.identity.split("@");

    ServerService.setServer(server)
      .then(async (c) => {
        authenticate({
          variables: {
            username: username,
            password: data.password,
            code: data.code ?? "",
          },
        })
          .then((r) => {
            IdentityService.authenticate(
              username,
              r.data.authenticate.authToken,
              r.data.authenticate.refreshToken
            );
          })
          .catch((r: any) => {
            console.log(r);
            console.log(JSON.stringify(r));
            if (
              r.graphQLErrors[0].extensions &&
              r.graphQLErrors[0].extensions.code &&
              r.graphQLErrors[0].extensions.code == "2FA_CHALLENGE"
            )
              setIsShowingTwoFactor(true);
          });
      })
      .catch((e) => {
        console.log({ e });
        toast({
          title: "Server unreachable.",
          description: "The server included in your identity is unreachable.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  const onError = (errors: any, e: any) => {
    console.log(errors);
  };

  const storedIdentities = [
    {
      username: "marcus",
      server: "snappy.app",
    },
    {
      username: "kyle",
      server: "snappy.app",
    },
    {
      username: "test",
      server: "localhost:8000",
    },
    {
      username: "marcus",
      server: "snappy.app",
    },
    {
      username: "kyle",
      server: "snappy.app",
    },
    {
      username: "test",
      server: "localhost:8000",
    },
    {
      username: "marcus",
      server: "snappy.app",
    },
    {
      username: "kyle",
      server: "snappy.app",
    },
    {
      username: "test",
      server: "localhost:8000",
    },
  ];

  return (
    <Stack className="login-bg" alignItems="center" justifyContent="center">
      <Box
        p="5"
        w={["100%", "lg"]}
        bg="white"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      >
        <Stack spacing="2">
          <Heading size="md">Login to Snappy Server</Heading>
          <Text color="gray.700" fontSize="sm">
            Quickly use a stored identity
          </Text>
          <HStack overflowX="scroll">
            {storedIdentities.map((i, index) => (
              <LoginIdentity key={index} {...i} />
            ))}
          </HStack>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <Stack spacing={0}>
                <AlertTitle mr={2}>Unable to log in.</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Stack>
            </Alert>
          )}
          <Text color="gray.700" fontSize="sm">
            or login with a new identity
          </Text>

          <Form onFormSubmit={onSubmit} onFormError={onError}>
            <Stack spacing="2">
              <FormTextBox
                name="identity"
                defaultValue="marcus@localhost:7228"
                inputProps={{ placeholder: "username@server.com:port" }}
              />
              <FormTextBox
                name="password"
                inputProps={{ placeholder: "************", type: "password" }}
              />
              <Button type="submit" isLoading={loading}>
                Login
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Box>
    </Stack>
  );
};

export default LoginPage;
