import React, { useEffect } from "react";
import Conversation, { IConversation } from "./Conversation";
import { SnappyStore } from "../data/DataStore";
import { GET_CONVERSATIONS } from "../data/apollo/Queries";
import { useQuery } from "@apollo/client";
import { Spinner, Stack } from "@chakra-ui/react";
import ConversationService from "../data/services/ConversationService";

const ConversationList = () => {
  const { data, loading, error } = useQuery(GET_CONVERSATIONS);
  const { conversations: contacts } = SnappyStore.useState();

  useEffect(() => {
    if (data) {
      let c: IConversation[] = [];
      data.conversations.nodes.map((n: any) => {
        c.push({
          id: n.otherUser.id,
          name: n.otherUser.firstName
            ? n.otherUser.firstName + " " + n.otherUser.lastName
            : n.otherUser.username,
          status: "online",
          lastMessage: n.messagePayload,
        });
      });
      ConversationService.update(c);
    }
  }, [data]);

  if (loading) return <Spinner />;

  return (
    <Stack flex="1" overflowY="scroll">
      {contacts && contacts.map((c, i) => <Conversation key={i} {...c} />)}
    </Stack>
  );
};

export default ConversationList;
