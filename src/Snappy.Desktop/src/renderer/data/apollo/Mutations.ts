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
    }
  }
`;

// export const UPDATE_NOTIFICATION_IDENTIFIER = gql`
//   mutation ($identifier: String!) {
//     updateDeviceNotificationIdentifier(identifier: $identifier) {
//       id
//     }
//   }
// `;

// export const UPLOAD_FILE = gql`
//   mutation ($file: Upload!) {
//     uploadFile(f: $file)
//   }
// `;

// export const CREATE_STACK = gql`
//   mutation ($fileIds: [Uuid!]) {
//     createStack(fileIds: $fileIds) {
//       id
//     }
//   }
// `;

// export const CREATE_STARTER_STACK = gql`
//   mutation {
//     createStartingStack {
//       files {
//         id
//       }
//     }
//   }
// `;

// export const ENSURE_STACK = gql`
//   mutation ($stackId: Uuid!, $fileIds: [Uuid!]!) {
//     ensureInStack(stackId: $stackId, fileIds: $fileIds) {
//       id
//     }
//   }
// `;

// export const RENAME_STACK = gql`
//   mutation ($stackId: Uuid!, $newName: String) {
//     renameStack(stackId: $stackId, newName: $newName)
//   }
// `;

// export const RENAME_FILE = gql`
//   mutation ($fileId: Uuid!, $newName: String) {
//     renameFile(fileId: $fileId, newName: $newName)
//   }
// `;

// export const DELETE_STACK = gql`
//   mutation ($stackIds: [Uuid!]) {
//     deleteStacks(stackIds: $stackIds) {
//       id
//     }
//   }
// `;

// export const DELETE_FILE = gql`
//   mutation ($fileIds: [Uuid!]) {
//     deleteFiles(fileIds: $fileId) {
//       id
//     }
//   }
// `;

// export const GET_DOWNLOAD_TOKENS_FOR_STACK = gql`
//   mutation ($stackId: Uuid!) {
//     downloadTokensForStack(stackId: $stackId) {
//       id
//     }
//   }
// `;

// export const EDIT_DEVICE = gql`
//   mutation ($name: String!, $deviceType: DeviceTypeEnum!) {
//     editDevice(request: { name: $name, deviceType: $deviceType }) {
//       id
//     }
//   }
// `;
// export const TRANSFER_STACK = gql`
//   mutation ($stackId: Uuid!, $toDeviceId: Uuid!) {
//     transferStack(stackId: $stackId, toDeviceId: $toDeviceId) {
//       id
//       stack {
//         id
//         name
//       }
//       toDevice {
//         id
//         name
//       }
//     }
//   }
// `;
// export const ACCEPT_TRANSFER = gql`
//   mutation ($transferId: Uuid!) {
//     acceptTransfer(transferId: $transferId) {
//       id
//     }
//   }
// `;
// export const DECLINE_TRANSFER = gql`
//   mutation ($transferId: Uuid!) {
//     declineTransfer(transferId: $transferId) {
//       id
//       status
//     }
//   }
// `;

// export const DISMISS_TRANFER = gql`
//   mutation ($transferId: Uuid!, $didCopy: Boolean!) {
//     dismissClipTransfer(transferId: $transferId, didCopy: $didCopy) {
//       id
//     }
//   }
// `;

// export const CREATE_STARTING_CLIP = gql`
//   mutation {
//     createStartingClip {
//       id
//       content
//       isSecured
//       createdOn
//     }
//   }
// `;

// export const CREATE_AND_SEND_CLIP = gql`
//   mutation ($content: String, $isSecure: Boolean!, $transferTo: [Uuid!]) {
//     createClip(
//       content: $content
//       isSecure: $isSecure
//       transferTo: $transferTo
//     ) {
//       id
//     }
//   }
// `;
// export const DELETE_CLIPS = gql`
//   mutation ($clipIds: [Uuid!]) {
//     deleteClips(clipIds: $clipIds) {
//       id
//     }
//   }
// `;
