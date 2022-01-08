import { gql } from "@apollo/client";

export const ON_CONVERSATIONS_UPDATE = gql`
  subscription {
    onConversationsUpdate {
      id
      messageKey
      messagePayload
      senderCopyKey
      senderCopyPayload
      createdOn
      otherUser {
        id
        firstName
        lastName
        username
      }
    }
  }
`;

export const ON_WHO_AM_I_UPDATE = gql`
  subscription {
    onUserUpdate {
      id
      username
      firstName
      lastName
      publicKey
      createdOn
    }
  }
`;
