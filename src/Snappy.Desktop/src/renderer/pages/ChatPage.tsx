import React, { useEffect, useState } from "react";
import { Spinner, Stack, Textarea } from "@chakra-ui/react";
import Header from "../components/Header";
import CurrentUser from "../components/CurrentUser";
import { SnappyStore } from "../data/DataStore";
import Message, { IMessage } from "../components/Message";
import ConversationList from "../components/ConversationList";
import { GET_CONVERSATION } from "../data/apollo/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { SEND_MESSAGE } from "../data/apollo/Mutations";
import { v4 as uuidv4 } from "uuid";

const ChatPage = () => {
  // Get messages of conversation
  const { selectedContactId, currentUser } = SnappyStore.useState();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { data, loading, error } = useQuery(GET_CONVERSATION, {
    variables: {
      userId: selectedContactId,
    },
  });
  useEffect(() => {
    console.log(data);
    if (data) {
      setMessages(data.conversation.nodes);
    }
  }, [data]);

  // Add message to conversation on enter
  const [content, setContent] = useState("");
  const [sendMessage, { loading: sendLoading, error: sendError }] =
    useMutation(SEND_MESSAGE);
  const handleKeyPressSent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleMessageSent();
      e.preventDefault(); // prevents new line
      e.stopPropagation();
    }
  };
  const handleMessageSent = async () => {
    var request = {
      messageKey: "new key",
      messagePayload: content,
      senderCopyKey: "sender key",
      senderCopyPayload: content,
    };
    sendMessage({
      variables: {
        request,
        toUserId: selectedContactId,
      },
      optimisticResponse: {
        __typename: "Mutation",
        sendMessage: {
          __typename: "Message",
          ...request,
          id: uuidv4(),
          senderId: currentUser.id,
          receiverId: selectedContactId,
          createdOn: new Date().toDateString(),
        },
      },

      update: (proxy, { data: { sendMessage } }) => {
        // Get the data from GraphQL cache
        const data: any = proxy.readQuery({
          query: GET_CONVERSATION,
          variables: { userId: selectedContactId },
        });

        console.log({ data, proxy, sendMessage });
        // Update the cache with the query
        proxy.writeQuery({
          query: GET_CONVERSATION,
          variables: {
            userId: selectedContactId,
          },
          data: {
            ...data,
            conversation: { nodes: [...data.conversation.nodes, sendMessage] },
          },
        });
      },
    }).catch((err) => err);
    setContent("");
  };

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
            <Stack direction="column-reverse">
              {loading || error ? (
                <Spinner />
              ) : (
                messages.map((m, i) => {
                  return <Message key={i} {...m} />;
                })
              )}
            </Stack>
          </Stack>
          <Textarea
            placeholder="Write your next message here..."
            resize="none"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            onKeyDown={handleKeyPressSent}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ChatPage;
