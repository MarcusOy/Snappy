import { gql } from "@apollo/client";

export const WHO_AM_I = gql`
  query {
    whoAmI {
      user {
        id
        username
        devices {
          id
          name
          deviceType {
            name
            color
          }
          createdOn
        }
        group {
          name
        }
        createdOn
      }
      device {
        id
        name
        isFirstTimeSetup
        createdOn
        deviceType {
          name
          color
        }
        incomingTransfers {
          id
          createdOn
          stack {
            id
            name
            vanityName {
              name
              suffix
            }
            files {
              id
              name
              fileExtension
            }
          }
          clip {
            id
            isSecured
            content
          }
          fromDevice {
            id
            name
          }
        }
      }
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
          firstName
          lastName
        }
      }
    }
  }
`;
