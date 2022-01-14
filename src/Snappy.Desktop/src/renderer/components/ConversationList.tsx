import React, { useEffect } from "react";
import Conversation, { IConversation } from "./Conversation";
import { SnappyStore } from "../data/DataStore";
import { GET_CONVERSATIONS } from "../data/apollo/Queries";
import { useQuery, useSubscription } from "@apollo/client";
import { Spinner, Stack } from "@chakra-ui/react";
import ConversationService from "../data/services/ConversationService";
import { ON_CONVERSATIONS_UPDATE } from "../data/apollo/Subscriptions";
import StartConversation from "./StartConversation";

const ConversationList = () => {
  const { data, loading, error, refetch } = useQuery(GET_CONVERSATIONS);
  const onConversationsUpdate = useSubscription(ON_CONVERSATIONS_UPDATE);
  const { conversations: contacts } = SnappyStore.useState();

  useEffect(() => {
    console.log(onConversationsUpdate.data);
    refetch();
  }, [onConversationsUpdate.data]);

  useEffect(() => {
    if (data) {
      let c: IConversation[] = [];
      data.conversations.nodes.map((n: any) => {
        c.push({
          id: n.otherUser.id,
          user: n.otherUser,
          status: "online",
          lastMessage: n.messagePayload,
        });
      });
      ConversationService.update(c);
    }
  }, [data]);

  if (loading) return <Spinner />;

  return (
    <Stack flex="1" overflowY="scroll" overflowX="hidden">
      {contacts && contacts.map((c, i) => <Conversation key={i} {...c} />)}
      <StartConversation />
    </Stack>
  );
};

export default ConversationList;