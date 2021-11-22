import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Stack,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import { SnappyStore } from "../data/DataStore";

export interface IMessage {
  id: string;
  senderId: string;
  receiverId: string;
  sentOn: Date;
  content: string;
  cipherText: string;
}

const Message = (m: IMessage) => {
  const { id } = SnappyStore.useState((s) => s.self);
  const isFromYou = m.senderId == id;

  return (
    <Tooltip label={m.cipherText} placement="top">
      <Box
        p="3"
        borderRadius="2xl"
        maxW="xs"
        borderBottomLeftRadius={!isFromYou ? 0 : "2xl"}
        borderBottomRightRadius={isFromYou ? 0 : "2xl"}
        bg={isFromYou ? "gray.100" : "blue.100"}
        textAlign={isFromYou ? "right" : "left"}
        alignSelf={isFromYou ? "end" : "start"}
      >
        {m.content}
      </Box>
    </Tooltip>
  );
};

export default Message;
