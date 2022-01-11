import React from "react";
import {
  Box,
  Tooltip,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  HStack,
  Heading,
  Code,
  Spinner,
} from "@chakra-ui/react";
import { SnappyStore } from "../data/DataStore";
import { IUser } from "./CurrentUser";

export interface IMessage {
  id?: string;
  messageKey?: string;
  messagePayload?: string;
  senderCopyKey?: string;
  senderCopyPayload?: string;
  createdOn?: string;
  senderId?: string;
  sender?: IUser;
  receiverId?: string;
  receiver?: IUser;
  otherUserId?: string;
  otherUser?: IUser;
}

const Message = (m: IMessage) => {
  const self = SnappyStore.useState((s) => s.identity.username);
  const isFromYou = m.sender!.username == self;

  // Inspector modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip label="Inspect message" placement="top">
        <Box
          p="3"
          borderRadius="2xl"
          maxW="xs"
          borderBottomLeftRadius={!isFromYou ? 0 : "2xl"}
          borderBottomRightRadius={isFromYou ? 0 : "2xl"}
          bg={isFromYou ? "gray.100" : "blue.100"}
          textAlign={isFromYou ? "right" : "left"}
          alignSelf={isFromYou ? "end" : "start"}
          onClick={onOpen}
          cursor="pointer"
        >
          {new Date(m.createdOn!) == new Date(0) && (
            <Spinner mr="3" size={"xs"} />
          )}
          {m.messagePayload}
        </Box>
      </Tooltip>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Message Inspector</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="xs">Sent on:</Heading>
            <Code mb="5" w="100%">
              {new Date(m.createdOn!).toLocaleString()}
            </Code>
            <Heading size="xs">What you see (after decryption):</Heading>
            <Code mb="5" w="100%">
              {m.messagePayload}
            </Code>
            <Heading size="xs">What the server sees (receiver's copy):</Heading>
            <Code mb="5" w="100%">
              cipher
            </Code>
            <Heading size="xs">What the server sees (sender's copy):</Heading>
            <Code mb="5" w="100%">
              sender cipher
            </Code>
          </ModalBody>
          <ModalFooter>
            <HStack spacing="2">
              <Button onClick={onClose}>Close</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Message;
