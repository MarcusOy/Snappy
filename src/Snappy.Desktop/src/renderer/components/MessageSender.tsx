import React, { useState } from "react";
import { Textarea, useToast } from "@chakra-ui/react";
import { SnappyStore } from "../data/DataStore";
import { GET_CONVERSATION } from "../data/apollo/Queries";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../data/apollo/Mutations";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "./CurrentUser";

interface IMessageSenderProps {
  onMessageSent?: () => void;
  toUser?: IUser;
}

const MessageSender = (p: IMessageSenderProps) => {
  const { selectedContactId, currentUser, conversations } =
    SnappyStore.useState();
  // Add message to conversation on enter
  const [content, setContent] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const toast = useToast();
  const handleKeyPressSent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (content != "") handleMessageSent();
      e.preventDefault(); // prevents new line
      e.stopPropagation();
    }
  };
  const handleMessageSent = async () => {
    let request = {
      messageKey: "new key",
      messagePayload: content,
      senderCopyKey: "sender key",
      senderCopyPayload: content,
    };
    let toUser =
      p.toUser ??
      conversations.filter((c) => c.id == selectedContactId)[0].user;
    sendMessage({
      variables: {
        request,
        toUserId: toUser.id,
      },
      optimisticResponse: {
        __typename: "Mutation",
        sendMessage: {
          __typename: "Message",
          id: uuidv4(),
          senderId: currentUser.id,
          sender: currentUser,
          receiverId: toUser.id,
          receiver: toUser,
          otherUser: toUser,
          createdOn: new Date(0).toISOString(),
          ...request,
        },
      },
      update: (cache, { data: { sendMessage } }) => {
        cache.updateQuery(
          {
            query: GET_CONVERSATION,
            variables: { userId: toUser.id },
          },
          (data) => ({
            ...data,
            conversation: {
              __typename: "ConversationConnection",
              nodes: [sendMessage, ...data.conversation.nodes],
            },
          })
        );
      },
    })
      .then(() => {
        if (p.onMessageSent) p.onMessageSent();
      })
      .catch((err) =>
        toast({
          title: "Message delivery error.",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      );
    setContent("");
  };
  return (
    <Textarea
      placeholder="Write your next message here, then press Enter..."
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
