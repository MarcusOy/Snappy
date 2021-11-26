import { Store } from "pullstate";
import { IChatContact } from "../components/ChatContact";

export interface ISnappyStore {
  currentServer?: string;
  identity: IUserIdentity;
  contacts: IChatContact[];
  selectedContact: string;
}

export interface IUserIdentity {
  username?: string;
  accessKey?: string;
  refreshKey?: string;
  contact?: IChatContact;
}

// const sampleYou: IChatContact = {
//   id: "you",
//   name: "Marcus Orciuch",
//   status: "online",
// };

export const sampleContacts: IChatContact[] = [
  {
    id: "asdf",
    name: "Marcus Orciuch",
    status: "online",
    lastMessage: "Hey, what's up?",
  },
  {
    id: "asf",
    name: "Someone cute",
    status: "offline",
    lastMessage: "Go out with me pleasepleasepleasepleasepleaseplease.",
  },
  {
    id: "a",
    name: "Annoying person",
    status: "away",
    lastMessage: "K",
  },
  {
    id: "b",
    name: "Kyle Orciuch",
    status: "doNotDisturb",
    lastMessage: "Hey, what's up?",
  },
  {
    id: "f",
    name: "Patrick Mansour",
    status: "online",
    lastMessage: "Hey, what's up?",
  },
  // {
  //   name: "Marcus Orciuch",
  //   status: "online",
  //   lastMessage: "Hey, what's up?",
  // },
  // {
  //   name: "Someone cute",
  //   status: "offline",
  //   lastMessage: "Go out with me pleasepleasepleasepleasepleaseplease.",
  // },
  // {
  //   name: "Annoying person",
  //   status: "away",
  //   lastMessage: "K",
  // },
  // {
  //   name: "Kyle Orciuch",
  //   status: "doNotDisturb",
  //   lastMessage: "Hey, what's up?",
  // },
  // {
  //   name: "Patrick Mansour",
  //   status: "online",
  //   lastMessage: "Hey, what's up?",
  // },
  // {
  //   name: "Marcus Orciuch",
  //   status: "online",
  //   lastMessage: "Hey, what's up?",
  // },
  // {
  //   name: "Someone cute",
  //   status: "offline",
  //   lastMessage: "Go out with me pleasepleasepleasepleasepleaseplease.",
  // },
  // {
  //   name: "Annoying person",
  //   status: "away",
  //   lastMessage: "K",
  // },
  // {
  //   name: "Kyle Orciuch",
  //   status: "doNotDisturb",
  //   lastMessage: "Hey, what's up?",
  // },
  // {
  //   name: "Patrick Mansour",
  //   status: "online",
  //   lastMessage: "Hey, what's up?",
  // },
];

const initialState: ISnappyStore = {
  currentServer: undefined,
  identity: {},
  contacts: sampleContacts,
  selectedContact: "f",
};

export const SnappyStore = new Store<ISnappyStore>(initialState);
