import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Heading,
  Stack,
} from "@chakra-ui/react";
import Form from "../components/Form";
import FormTextBox from "../components/FormTextBox";
import useAxios from "axios-hooks";
import IdentityService from "../data/IdentityService";

interface FormFields {
  identity: string;
  password: string;
  isPersistent: boolean;
  code?: string;
}

const LoginPage = () => {
  const [{ data, loading, error }, doLogin] = useAxios({}, { manual: true });
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
        IdentityService.authenticate(r.data.access, r.data.refresh);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onError = (errors: any, e: any) => {};

  return (
    <Stack alignItems="center" justifyContent="center">
      <Box
        p="5"
        w={["100%", "lg"]}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Stack spacing="5">
          <Heading size="md">Login to Snappy</Heading>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Unable to log in.</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
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
