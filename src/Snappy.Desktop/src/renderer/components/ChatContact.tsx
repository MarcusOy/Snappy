import React from "react";
import { Avatar, AvatarBadge, Box, Stack, Textarea } from "@chakra-ui/react";
import { SnappyStore } from "../data/DataStore";
import ContactService from "../data/ContactService";

export interface IChatContact {
  id: string;
  name: string;
  status: "online" | "offline" | "away" | "doNotDisturb";
  lastMessage: string;
}

const ChatContact = (c: IChatContact) => {
  const { selectedContact } = SnappyStore.useState();
  const isSelected = selectedContact == c.id;

  return (
    <Box
      userSelect="none"
      cursor="pointer"
      _hover={{
        backgroundColor: "gray.200",
      }}
      key="i"
      w="64"
      h="20"
      borderBottomWidth="1px"
      overflow="hidden"
      bg={isSelected ? "gray.300" : undefined}
      onClick={() => ContactService.switchToContact(c.id)}
    >
      <Box p="3">
        <Box display="flex" alignItems="center">
          <Avatar name={c.name} size="sm">
            <AvatarBadge
              boxSize="1em"
              bg={
                c.status == "online"
                  ? "green.500"
                  : c.status == "offline"
                  ? "gray.500"
                  : c.status == "doNotDisturb"
                  ? "red.500"
                  : "yellow.300"
              }
            />
          </Avatar>
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
};

export default ChatContact;
