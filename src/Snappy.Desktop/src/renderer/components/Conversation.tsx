import React from "react";
import { Avatar, AvatarBadge, Box, Stack, Textarea } from "@chakra-ui/react";
import { SnappyStore } from "../data/DataStore";
import ConversationService from "../data/services/ConversationService";
import { IUser } from "./CurrentUser";

export interface IConversation {
  id: string;
  user: IUser;
  status: "online" | "offline" | "away" | "doNotDisturb";
  lastMessage?: string;
}

const Conversation = (c: IConversation) => {
  const { selectedContactId } = SnappyStore.useState();
  const isSelected = selectedContactId == c.id;

  let name = c.user.firstName + " " + c.user.lastName;

  return (
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
      bg={isSelected ? "gray.300" : undefined}
      onClick={() => ConversationService.switchTo(c.id)}
    >
      <Box p="3">
        <Box display="flex" alignItems="center">
          <Avatar name={name} size="sm">
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
              {name}
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

export default Conversation;
