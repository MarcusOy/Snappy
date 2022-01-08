import React from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import ConversationList from "./ConversationList";
import CurrentUser from "./CurrentUser";
import { SnappyStore } from "../data/DataStore";

const Header = () => {
  const { conversations, selectedContactId } = SnappyStore.useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const c = conversations.find((c) => c.id == selectedContactId);

  if (c == undefined) return <Spinner />;
  let name = c.user.firstName + " " + c.user.lastName;

  return (
    <>
      <HStack p="2" bg="gray.50" borderWidth="1px" borderBottomRadius="lg">
        <HStack w="16rem">
          <IconButton
            display={["block", "none"]}
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
          />
          <Heading size="md">Snappy</Heading>
        </HStack>
        <HStack flexGrow={1} justifyContent="center">
          <Box>
            <Menu placement="bottom">
              <MenuButton
                as={Button}
                bg="gray.50"
                rightIcon={<ChevronDownIcon />}
              >
                <HStack>
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
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {name}
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem>View info</MenuItem>
                <MenuItem>Block contact</MenuItem>
                <MenuItem color="red">Delete conversation</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      </HStack>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent w="16rem !important" bg="gray.50">
          <DrawerCloseButton />
          <DrawerHeader>Contacts</DrawerHeader>

          <DrawerBody px={0}>
            <Stack
              bg="gray.50"
              borderRightWidth="1px"
              onClick={() => onClose()}
            >
              <ConversationList />
            </Stack>
          </DrawerBody>
          <DrawerFooter px={0} pb={0}>
            <Stack flexGrow={1}>
              <CurrentUser />
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
