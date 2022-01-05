import { gql } from "@apollo/client";

export const WHO_AM_I = gql`
  query {
    whoAmI {
      id
      username
      firstName
      lastName
      publicKey
      createdOn
    }
  }
`;

export const GET_CONVERSATIONS = gql`
  query {
    conversations {
      nodes {
        id
        messagePayload
        createdOn
        otherUser {
          id
          username
          firstName
          lastName
          username
        }
      }
    }
  }
`;

export const GET_CONVERSATION = gql`
  query ($userId: UUID!) {
    conversation(userId: $userId) {
      nodes {
        id
        messageKey
        messagePayload
        senderCopyKey
        senderCopyPayload
        createdOn
        sender {
          id
          username
          firstName
          lastName
        }
        receiver {
          id
          username
          firstName
          lastName
        }
      }
    }
  }
`;
