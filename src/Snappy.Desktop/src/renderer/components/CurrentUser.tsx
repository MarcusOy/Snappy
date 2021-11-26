import React from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import LogoutButton from "./LogoutButton";

const CurrentUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box p="5" bg="gray.200" display="flex" alignItems="center">
        <Avatar name="Test User" size="sm">
          <AvatarBadge boxSize="1em" bg={"green.500"} />
        </Avatar>
        <Box
          ml="2"
          flexDirection="column"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            Test User
          </Box>
        </Box>
        <Box flexGrow={1} />
        <IconButton
          aria-label="Open settings"
          icon={<SettingsIcon />}
          onClick={onOpen}
        />
      </Box>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>One</Tab>
                <Tab>Two</Tab>
                <Tab>Three</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <HStack spacing="2">
              <LogoutButton />
              <Button onClick={onClose}>Close</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CurrentUser;
