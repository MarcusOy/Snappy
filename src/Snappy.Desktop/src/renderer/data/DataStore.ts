import { IServer } from "./services/ServerService";
import { Store } from "pullstate";
import { IConversation } from "../components/Conversation";
import { IMessage } from "../components/Message";
import { IUser } from "../components/CurrentUser";

export interface ISnappyStore {
  connection: IServer;
  identity: IIdentity;
  currentUser: IUser;
  conversations: IConversation[];
  selectedContactId: string;
}

export interface IIdentity {
  username?: string;
  accessToken?: string;
  refreshToken?: string;
}

const initialState: ISnappyStore = {
  connection: {},
  identity: {},
  currentUser: {
    id: "invalid",
    username: "invalidUser",
    firstName: "invalid",
    lastName: "user",
    publicKey: "no key",
    createdOn: "01/01/2001",
    status: "offline",
  },
  conversations: [],
  selectedContactId: "",
};

export const SnappyStore = new Store<ISnappyStore>(initialState);
