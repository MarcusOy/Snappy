import React, { useState } from "react";
import { Textarea } from "@chakra-ui/react";
import { SnappyStore } from "../data/DataStore";
import { GET_CONVERSATION } from "../data/apollo/Queries";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../data/apollo/Mutations";
import { v4 as uuidv4 } from "uuid";

const MessageSender = () => {
  const { selectedContactId, currentUser, conversations } =
    SnappyStore.useState();
  // Add message to conversation on enter
  const [content, setContent] = useState("");
  const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE);
  const handleKeyPressSent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (content != "") handleMessageSent();
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
          id: uuidv4(),
          senderId: currentUser.id,
          sender: currentUser,
          receiverId: selectedContactId,
          receiver: conversations.filter((c) => c.id == selectedContactId)[0]
            .user,
          otherUser: conversations.filter((c) => c.id == selectedContactId)[0]
            .user,
          createdOn: new Date(0).toISOString(),
          ...request,
        },
      },
      update: (cache, { data: { sendMessage } }) => {
        cache.updateQuery(
          {
            query: GET_CONVERSATION,
            variables: { userId: selectedContactId },
          },
          (data) => ({
            ...data,
            conversation: {
              __typename: "ConversationConnection",
              nodes: [sendMessage, ...data.conversation.nodes],
            },
          })
        );
        // // Get the data from GraphQL cache
        // const data: any = proxy.readQuery({
        //   query: GET_CONVERSATION,
        //   variables: { userId: selectedContactId },
        // });
        // // Update the cache with the query
        // proxy.writeQuery({
        //   query: GET_CONVERSATION,
        //   variables: {
        //     userId: selectedContactId,
        //   },
        //   data: {
        //     ...data,
        //     conversation: {
        //       __typename: "ConversationConnection",
        //       nodes: [sendMessage, ...data.conversation.nodes],
        //     },
        //   },
        // });
      },
    }).catch((err) => err);
    setContent("");
  };
  return (
    <Textarea
      placeholder="Write your next message here..."
      resize="none"
      value={content}
      onChange={(e) => {
        setContent(e.target.value);
      }}
      onKeyDown={handleKeyPressSent}
    />
  );
};

export default MessageSender;
