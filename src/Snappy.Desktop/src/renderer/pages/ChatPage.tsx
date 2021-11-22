import React from "react";
import { Avatar, AvatarBadge, Box, Stack, Textarea } from "@chakra-ui/react";
import ChatContact from "../components/ChatContact";
import Header from "../components/Header";
import CurrentUser from "../components/CurrentUser";
import { SnappyStore } from "../data/DataStore";
import Message, { IMessage } from "../components/Message";

const messages: IMessage[] = [
  {
    id: "1",
    senderId: "you",
    receiverId: "f",
    sentOn: new Date(),
    content: "This is a message sent by you to the other person.",
    cipherText: "jak;sdfj;aewiofn32inoi2o322o8h32",
  },
  {
    id: "2",
    senderId: "f",
    receiverId: "you",
    sentOn: new Date(),
    content: "This is a message sent by the other person to you.",
    cipherText: "nvjlnidvbloabrevoa84o83y23hif82o",
  },
];

const ChatPage = () => {
  const s = SnappyStore.useState();
  console.log(s);

  return (
    <Stack spacing={0}>
      <Header />
      <Stack flexGrow={1} direction="row">
        <Stack
          display={["none", "flex"]}
          w="16rem"
          height="100%"
          bg="gray.50"
          borderRightWidth="1px"
          overflowY="scroll"
        >
          {s.contacts &&
            s.contacts.map((c, i) => <ChatContact key={i} {...c} />)}
          <Box flexGrow={1} />
          <CurrentUser />
        </Stack>
        <Stack
          p="1"
          pr="2"
          direction="column"
          justifyContent="flex-end"
          flexGrow={1}
        >
          {messages.map((m) => {
            return <Message {...m} />;
          })}
          <Textarea
            placeholder="Write your next message here..."
            resize="none"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ChatPage;
