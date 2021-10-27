## Endpoints

### `/snappy/register`
I think this be a simple registration page that adds a user to the database

As far as the json syntax for the `PUT` request, maybe somethin like this:
```json
{
"user_name": "<user_name>",
"public_key": "<public_key>"
}
```
*We can obviously include more personal information in this registration form as we see fit, but this would be the bare minimum*

### `/snappy/messages`
This enpoint should return a basic list of all the chats that a user is a part of. (A chat, for all intents an purposes, is a conversation between two users)

json return syntax:
```json
[
  {
    "chat_id": "<chat_id as found in the database>",
    "user_one": "<the first user_name in the chat>",
    "user_two": "<the second user_name in the chat>"
  },
  {
    ...
  }
]
```

### `/snappy/messages/<chat_id>`
This endpoint should return all the (encrypted) messages in a given `chat_id`.

json return syntax (after being decrypted):
```json
[
  {
    "message_id": "<message_id>",
    "sender": "<sender>",
    "reciever": "<reciever>",
    "datetime": "<datetime>"
  },
  {
  ...
  }
]
```

### Considerations:
Moving forward with these endpoints, we also need to ensure there is proper integrity when accessing items from the back end. For example: if **UserA** attempts to load 
`/snappy/messages/1245` but `chat 1254` is between **UserB** and **UserC**, then this should be a prohibited action. Small things like this. We also need a way
to properly authenticate with the api from the frontend whether this is through access tokens or via the private/public keys.

### Summary
I think these three are the "bread and butter" for all the functioning parts of the chat app and these aren't sent in stone and are more of a rough outline.
