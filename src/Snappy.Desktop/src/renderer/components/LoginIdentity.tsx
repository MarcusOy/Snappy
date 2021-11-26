import { Stack, Text } from "@chakra-ui/layout";
import { Avatar, CloseButton } from "@chakra-ui/react";
import React from "react";

interface ILoginIdentity {
  username: string;
  server: string;
}

const LoginIdentity = (i: ILoginIdentity) => {
  return (
    <Stack
      p="2"
      pt="0"
      w="90px"
      borderRadius="lg"
      className="login-identity"
      _hover={{
        cursor: "pointer",
        backgroundColor: "gray.200",
      }}
      alignItems="center"
      spacing="0"
    >
      <CloseButton
        color="white"
        zIndex={100}
        className="login-identity-close"
        transition="all 0.1s ease-in"
        opacity={0}
        _hover={{
          cursor: "pointer",
          backgroundColor: "red.600",
        }}
        bg="red.500"
        position="relative"
        top="10px"
        alignSelf="end"
        size="sm"
      />
      <Avatar name={i.username} />
      <Text fontSize="sm">{i.username}</Text>
      <Text fontSize="xs">{i.server}</Text>
    </Stack>
  );
};

export default LoginIdentity;
