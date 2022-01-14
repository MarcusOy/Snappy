import React, { useEffect } from "react";
import { Spinner, Stack } from "@chakra-ui/react";
import Header from "../components/Header";
import CurrentUser from "../components/CurrentUser";
import { SnappyStore } from "../data/DataStore";
import Message, { IMessage } from "../components/Message";
import ConversationList from "../components/ConversationList";
import { GET_CONVERSATION } from "../data/apollo/Queries";
import { useLazyQuery } from "@apollo/client";
import MessageSender from "../components/MessageSender";

const ChatPage = () => {
  // Get messages of conversation
  const { selectedContactId } = SnappyStore.useState();
  const [getConvo, { data, loading, error }] = useLazyQuery(GET_CONVERSATION, {
    variables: {
      userId: selectedContactId,
    },
    fetchPolicy: "cache-and-network",
  });
  useEffect(() => {
    if (selectedContactId != "") getConvo();
  }, [selectedContactId]);

  let messages: IMessage[] = data?.conversation?.nodes || [];

  return (
    <Stack spacing={0}>
      <Header />
      <Stack flexGrow={1} direction="row" flex="1" overflowY="scroll">
        <Stack
          display={["none", "flex"]}
          w="16rem"
          height="100%"
          bg="gray.50"
          borderRightWidth="1px"
        >
          <ConversationList />
          <CurrentUser />
        </Stack>
        <Stack
          p="1"
          pr="2"
          direction="column"
          justifyContent="flex-end"
          flexGrow={1}
          h="100%"
        >
          <Stack flex="1 1 auto" overflowY="scroll" flexDir="column-reverse">
            <Stack direction="column-reverse" pt="10">
              {(messages.length <= 0 && loading) || error ? (
                <Spinner />
              ) : (
                messages.map((m, i) => {
                  return <Message key={i} {...m} />;
                })
              )}
            </Stack>
          </Stack>
          <MessageSender />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ChatPage;
