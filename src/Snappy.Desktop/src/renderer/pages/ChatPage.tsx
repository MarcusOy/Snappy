import React from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Heading,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import ChatContact, { IChatContact } from "../components/ChatContact";

const contacts: IChatContact[] = [
  {
    name: "Marcus Orciuch",
    status: "online",
    lastMessage: "Hey, what's up?",
  },
  {
    name: "Someone cute",
    status: "offline",
    lastMessage: "Go out with me please.",
  },
  {
    name: "Annoying person",
    status: "away",
    lastMessage: "K",
  },
  {
    name: "Kyle Orciuch",
    status: "doNotDisturb",
    lastMessage: "Hey, what's up?",
  },
  {
    name: "Patrick Mansour",
    status: "online",
    lastMessage: "Hey, what's up?",
  },
];

const ChatPage = () => {
  return (
    <div>
      <Box p="2" bg="gray.50" borderWidth="1px" borderBottomRadius="lg">
        <Heading size="md">Snappy</Heading>
      </Box>
      <Stack direction="row">
        <Stack bg="gray.50" borderRightWidth="1px">
          {contacts.map((c, i) => (
            <ChatContact key={i} {...c} />
          ))}
        </Stack>
        <Stack p="1" direction="column" justifyContent="flex-end" flexGrow={1}>
          <Textarea
            placeholder="Write your next message here..."
            resize="none"
          />
        </Stack>
      </Stack>
    </div>
  );
};

export default ChatPage;
