import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Stack,
  Textarea,
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
} from "@chakra-ui/react";
import { SnappyStore } from "../data/DataStore";

export interface IMessage {
  id: string;
  sender: string;
  receiver: string;
  sentOn: Date;
  content: string;
  cipher: string;
  senderCopyCipher: string;
}

const Message = (m: IMessage) => {
  const self = SnappyStore.useState((s) => s.identity.username);
  const isFromYou = m.sender == self;

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
          {m.content}
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
              {m.sentOn.toLocaleString()}
            </Code>
            <Heading size="xs">What you see (after decryption):</Heading>
            <Code mb="5" w="100%">
              {m.content}
            </Code>
            <Heading size="xs">What the server sees (receiver's copy):</Heading>
            <Code mb="5" w="100%">
              {m.cipher}
            </Code>
            <Heading size="xs">What the server sees (sender's copy):</Heading>
            <Code mb="5" w="100%">
              {m.senderCopyCipher}
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
