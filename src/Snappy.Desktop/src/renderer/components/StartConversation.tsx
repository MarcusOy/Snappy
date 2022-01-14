import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import MessageSender from "./MessageSender";
import { GET_USER_BY_USERNAME } from "../data/apollo/Queries";
import { useLazyQuery } from "@apollo/client";
import useDebounce from "../hooks/useDebounce";
import { IUser } from "./CurrentUser";
import { SnappyStore } from "../data/DataStore";
import ConversationService from "../data/services/ConversationService";

const StartConversation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Get user object by username (to pass to MessageSender)
  const hostname = SnappyStore.useState((s) => s.connection.hostName);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<IUser | null>(null);
  const debouncedUsername = useDebounce(username, 500);
  const [getUser, { loading, error }] = useLazyQuery(GET_USER_BY_USERNAME, {
    variables: {
      username: debouncedUsername,
    },
  });
  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onModalClose = () => {
    setUser(null);
    setUsername("");
    onClose();
  };
  useEffect(() => {
    setUser(null);
    if (debouncedUsername != "") {
      getUser()
        .then((r) => {
          setUser(r.data.userByUsername);
        })
        .catch(() => setUser(null));
    }
  }, [debouncedUsername]);

  return (
    <>
      <Box
        userSelect="none"
        cursor="pointer"
        _hover={{
          backgroundColor: "gray.200",
        }}
        key="i"
        w="64"
        minH="20"
        borderBottomWidth="1px"
        overflowX="hidden"
        onClick={onOpen}
      >
        <Box p="3">
          <Box display="flex" alignItems="center">
            <AddIcon width="32px" />
            <Box
              ml="2"
              flexDirection="column"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              w="64"
            >
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                Start a new conversation
              </Box>

              <Box as="span" color="gray.600" fontSize="sm">
                with a user on this server
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack mb="5">
              <FormControl isInvalid={error != undefined}>
                <FormLabel htmlFor="username">Receipient username</FormLabel>
                <InputGroup size="sm">
                  <Input
                    name="username"
                    value={username}
                    onChange={onUsernameChange}
                  />
                  <InputRightAddon children={`@${hostname}`} />
                </InputGroup>
                {user ? (
                  <FormHelperText color="green">
                    {loading && <Spinner size="sm" mr="1" />}
                    User with username <b>{debouncedUsername}</b> exists!
                  </FormHelperText>
                ) : error ? (
                  <FormErrorMessage>
                    {loading && <Spinner size="sm" mr="1" />}
                    Username <b>{debouncedUsername}</b> not found.
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>
                    {loading && <Spinner size="sm" mr="1" />}
                    Enter the username of the receipient.
                  </FormHelperText>
                )}
              </FormControl>
              <Box display={user ? "block" : "none"}>
                <MessageSender
                  toUser={user!}
                  onMessageSent={() => {
                    onModalClose();
                    setTimeout(
                      () => ConversationService.switchTo(user?.id!),
                      500
                    );
                  }}
                />
              </Box>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StartConversation;
