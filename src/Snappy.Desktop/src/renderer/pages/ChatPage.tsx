import React from "react";
import { Avatar, AvatarBadge, Box, Stack, Textarea } from "@chakra-ui/react";

const contacts: {
  name: string;
  status: "online" | "offline" | "away" | "doNotDisturb";
  lastMessage: string;
}[] = [
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
    name: "Marcus Orciuch",
    status: "doNotDisturb",
    lastMessage: "Hey, what's up?",
  },
  {
    name: "Marcus Orciuch",
    status: "online",
    lastMessage: "Hey, what's up?",
  },
];

const ChatPage = () => {
  return (
    <Stack direction="row">
      <Stack>
        {contacts.map((c, i) => {
          return (
            <Box
              key="i"
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Box p="3">
                <Box display="flex" alignItems="center">
                  <Avatar name={c.name} size="sm">
                    <AvatarBadge boxSize="1em" bg="green.500" />
                  </Avatar>
                  <Box ml="2" flexDirection="column">
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {c.name}
                    </Box>

                    <Box as="span" color="gray.600" fontSize="sm">
                      {c.lastMessage}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
      <Stack direction="column">
        <Textarea placeholder="Write your next message here..." resize="none" />
      </Stack>
    </Stack>
  );
};

export default ChatPage;
