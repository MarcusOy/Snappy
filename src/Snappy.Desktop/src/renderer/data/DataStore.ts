import { Store } from "pullstate";
import { IChatContact } from "../components/ChatContact";
import { IMessage } from "../components/Message";

export interface ISnappyStore {
  identity: IUserIdentity;
  contacts: IChatContact[];
  selectedContact: string;
}

export interface IUserIdentity {
  username?: string;
  server?: string;
  accessKey?: string;
  refreshKey?: string;
  messages?: IMessage;
}

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
    lastMessage: "This is a message sent by the other person to you.",
  },
];

const initialState: ISnappyStore = {
  identity: {},
  contacts: sampleContacts,
  selectedContact: "f",
};

export const SnappyStore = new Store<ISnappyStore>(initialState);
