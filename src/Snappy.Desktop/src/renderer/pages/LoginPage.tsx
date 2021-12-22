import React from "react";
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
} from "@chakra-ui/react";
import Form from "../components/Form";
import FormTextBox from "../components/FormTextBox";
import useAxios from "axios-hooks";
import IdentityService from "../data/IdentityService";
import LoginIdentity from "../components/LoginIdentity";

interface FormFields {
  identity: string;
  password: string;
  isPersistent: boolean;
  code?: string;
}

const LoginPage = () => {
  const [{ loading, error }, doLogin] = useAxios({}, { manual: true });
  const onSubmit = (data: FormFields) => {
    let [username, server] = data.identity.split("@");

    doLogin({
      url: `http://${server}/api/login/`,
      method: "POST",
      data: {
        user_name: username,
        password: data.password,
      },
    })
      .then((r) => {
        IdentityService.authenticate(
          username,
          server,
          r.data.access,
          r.data.refresh
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onError = (errors: any, e: any) => {};

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
              <AlertTitle mr={2}>Unable to log in.</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          <Text color="gray.700" fontSize="sm">
            or login with a new identity
          </Text>

          <Form onFormSubmit={onSubmit} onFormError={onError}>
            <Stack spacing="2">
              <FormTextBox
                name="identity"
                defaultValue="marcus@127.0.0.1:8000"
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
