import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  mutation ($username: String, $password: String) {
    authenticate(username: $username, password: $password) {
      authToken
      refreshToken
    }
  }
`;

export const REAUTHENTICATE = gql`
  mutation Authentication($token: String) {
    reauthenticate(token: $token) {
      authToken
      refreshToken
    }
  }
`;

export const REGISTER = gql`
  mutation (
    $firstName: String
    $lastName: String
    $username: String
    $password: String
    $publicKey: String
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
      publicKey: $publicKey
    ) {
      user {
        id
        username
        createdOn
      }
      totpSecret
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation ($request: SendMessageRequestInput, $toUserId: UUID!) {
    sendMessage(request: $request, sendToUserId: $toUserId) {
      id
      senderId
      receiverId
      createdOn
    }
  }
`;

// export const DELETE_ALL_MESSAGES = gql`
//   mutation ($userId: Uuid) {
//     deleteAllMessages(userId: $userId) {
//       id
//     }
//   }
// `;
