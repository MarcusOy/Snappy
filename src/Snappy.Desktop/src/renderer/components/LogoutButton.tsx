import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { Button, ButtonGroup, Text } from "@chakra-ui/react";
import React from "react";
import IdentityService from "../data/IdentityService";

const LogoutButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const doLogout = () => IdentityService.logOut();
  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      placement="right"
      onClose={close}
    >
      <PopoverTrigger>
        <Button onClick={open} colorScheme="red">
          Logout
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Are you sure you want to logout?
          <br />
          <Text color="gray.700" fontSize="xs">
            You will be able to quickly log back in to this account from the
            login screen.
          </Text>
        </PopoverBody>
        <PopoverFooter d="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button onClick={close} variant="outline">
              Cancel
            </Button>
            <Button onClick={doLogout} colorScheme="red">
              Logout
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default LogoutButton;
