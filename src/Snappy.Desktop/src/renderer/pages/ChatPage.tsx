import React, { useEffect, useState } from "react";
import { Avatar, AvatarBadge, Box, Stack, Textarea } from "@chakra-ui/react";
import ChatContact from "../components/ChatContact";
import Header from "../components/Header";
import CurrentUser from "../components/CurrentUser";
import { SnappyStore } from "../data/DataStore";
import Message, { IMessage } from "../components/Message";
import CryptoService from "../data/services/CryptoService";
import useAxios from "axios-hooks";

// function groupBy(objectArray: any, property: string) {
//   return objectArray.reduce((acc, obj) => {
//      const key = obj[property];
//      if (!acc[key]) {
//         acc[key] = [];
//      }
//      // Add object to list for given key's value
//      acc[key].push(obj);
//      return acc;
//   }, {});
// }

const ChatPage = () => {
  const s = SnappyStore.useState();
  console.log(s);

  const [{ data, loading }, refetch] = useAxios("/messages/");
  const [lastResponseHash, setLastResponseHash] = useState<string | null>(null);
  // Poll every 5 seconds for messages
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 1000 * 5);
    return () => clearInterval(intervalId);
  }, []);
  console.log({ data, loading, setLastResponseHash });

  // Structurize response into datastore
  useEffect(() => {
    if (data) {
    }
  }, [data]);

  // Create example conversation
  const [messages, setMessages] = useState<IMessage[]>([]);
  useEffect(() => {
    const genMessages = async () => {
      let myKeys = CryptoService.generateKeyPair();
      let theirKeys = CryptoService.generateKeyPair();

      let myMessage = "This is a message sent by you to the other person.";
      let theirMessage = "This is a message sent by the other person to you.";

      let m: IMessage[] = [];
      m.push({
        id: "1",
        sender: "marcus",
        receiver: "kyle",
        sentOn: new Date(),
        content: myMessage,
        cipher: await CryptoService.encMessage(
          myMessage,
          (
            await theirKeys
          ).publicKey!
        ),
        senderCopyCipher: await CryptoService.encMessage(
          myMessage,
          (
            await myKeys
          ).publicKey!
        ),
      });
      m.push({
        id: "2",
        sender: "kyle",
        receiver: "marcus",
        sentOn: new Date(),
        content: theirMessage,
        cipher: await CryptoService.encMessage(
          theirMessage,
          (
            await myKeys
          ).publicKey!
        ),
        senderCopyCipher: await CryptoService.encMessage(
          theirMessage,
          (
            await theirKeys
          ).publicKey!
        ),
      });

      setMessages(m);
    };
    genMessages();
  }, []);

  // Add message to conversation on enter
  const [content, setContent] = useState("");
  const handleKeyPressSent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleMessageSent();
      e.preventDefault(); // prevents new line
      e.stopPropagation();
    }
  };
  const handleMessageSent = async () => {
    let myKeys = CryptoService.generateKeyPair();
    let theirKeys = CryptoService.generateKeyPair();
    let m: IMessage[] = [...messages];
    m.push({
      id: new Date().getTime().toString(),
      sender: "marcus",
      receiver: "kyle",
      sentOn: new Date(),
      content: content,
      cipher: await CryptoService.encMessage(
        content,
        (
          await theirKeys
        ).publicKey!
      ),
      senderCopyCipher: await CryptoService.encMessage(
        content,
        (
          await myKeys
        ).publicKey!
      ),
    });
    setMessages(m);
    setContent("");
  };

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
          {messages.map((m, i) => {
            return <Message key={i} {...m} />;
          })}
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
