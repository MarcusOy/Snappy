# Snappy API endpoints

## `.../api/register/` 

|   |   |
|-:|:-|
| **Type**: | `POST` |
| **Content-Type**: | `application/json` |
| **Authorization Required**: | None |
| **Description**: | Used to register a user/add a user to the database |
| **Arguments**: | `user_name`: *Username*,<br />`password`: *Plain Text Password (not secure, but ok for this project)*,<br />`public_key`: *RSA Public Key*,<br />`first_name`: *Users's First Name* |
| **Argument Requirements**: | `user_name`: *must be unique*,<br />`public_key`: *must be unique* |
| **Example**: | `curl -X POST http://127.0.0.1:8000/api/register/ -d '{ "user": {"user_name": "benne238", "password": "<plain-text_password>", "public_key": "<public_key>", "first_name": "Jacob"}}' -H "Content-Type: application/json"` |
| **Return on Success**: | `{"token":{"refresh":"<refresh_token>", "access":"<access_token>"}, "user_name":<user_name_of_newly_created_user>}`|

This endpoint will add a user directly to the database. The fields of the database correspond directly to the names of the arguments used in the post request. Anyone is able to do this without any authorization.

## `.../api/messages/` (POST)

|  |   |
|-:|:-|
| **Type**: | `POST` |
| **Content-Type**: | `application/json` |
| **Authorization Required**: | A valid access token is needed|
| **Description**: | Used to "send" a message (or more literally, add a message to the database) |
| **Arguments**: | `recipient`: *Username of the recipient*,<br />`encrypted_message`: *The encrypted message (can include additional information in any format, but it must be encrypted* |
| **Argument Requirements**: | `user_name`: *must exist*,<br />`public_key`: *must be encrypted with the recipient's public key (the api doesn't check for this!)* |
| **Example**: | `curl -X POST -d '{"message":{"recipient":"benne238", "encrypted_message":"no!!!!"}}' -H "Content-Type: application/json" -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM3MzEyMTc2LCJpYXQiOjE2MzczMTE4NzYsImp0aSI6IjA3Y2YxNmU3NGVhMTQxNmViYjM1NDUxZTE5MjVhN2ZmIiwidXNlcl9pZCI6Imdlb3JnZSJ9.4kWQxa5iwT9KU2ThFWw1pUiQkIKKWZPRn0jsRFJM6b0' http://127.0.0.1:8000/api/messages/` |
| **Return on Success**: | `{"success": True}`|

When using a post request with the `/api/messages` endpoint, it is the equivalent of sending a message or adding a message to the database. A valid access token is required to be present in the header of the request, otherwise the api will refuse to honor the request and the message will not be sent

## `.../api/messages/` (GET)

|  |   |
|-:|:-|
| **Type**: | `GET` |
| **Content-Type**: | None |
| **Authorization Required**: | A valid access token is needed to use this endpoint |
| **Description**: | Used to get all of the associated chats and messaged with a user |
| **Arguments**: | None | 
| **Example**: | `curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM3MzA2OTg3LCJpYXQiOjE2MzcyOTkxMTAsImp0aSI6IjM4NmZmNDUzZWVhNTQ4ODg5NDUxYmYwNmE5NmZmM2YyIiwidXNlcl9pZCI6ImJlbm5lMjM4In0.oTSYpzFUBTyRvWqnJvIzTFT4lJ78K_p_nYkFO28A3eQ" http://127.0.0.1:8000/api/messages/` |
| **Return on Success**: | `[`<br/>&emsp;`{`<br/>&emsp;&emsp;`"chat_id": <int representing the chat_id>,`<br/>&emsp;&emsp;`"sender": <user_name of the sedner>,`<br/>&emsp;&emsp;`"recipient": <user_name of the recipient>,`<br/>&emsp;&emsp;`"messages": [`<br/>&emsp;&emsp;&emsp;`"message_ID": <message_ID of this particular message>,`<br/>&emsp;&emsp;&emsp;`"encrypted_message": <encrypted_message>` <br/>&emsp;&emsp;`]`<br/>&emsp;`},`<br/>`...`<br/>`]`|

This endpoint, unlike the `POST` endpoint of the same name, will get all of the messages and chats associated with a user. For integrity, there is no "user_name" argument to specify which user's messages are returned, but rather the access token provided with the request (which is required) is already associated with a user. The only chats and messages that will be returned will be chats and messages that the owner of the access token is a part of (this prevents `user_a` for requesting all the chats that `user_b` might be a part of)

## `.../api/get/public_key/<str:user_name>`

|  |   |
|-:|:-|
| **Type**: | `GET` |
| **Content-Type**: | None |
| **Authorization Required**: | A valid access token is needed to use this endpoint |
| **Description**: | Used to get the public key associated with a user |
| **Arguments**: | `user_name`: *the user_name whose public key is desired* | 
| **Example**: | `curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM3MzA2OTg3LCJpYXQiOjE2MzcyOTkxMTAsImp0aSI6IjM4NmZmNDUzZWVhNTQ4ODg5NDUxYmYwNmE5NmZmM2YyIiwidXNlcl9pZCI6ImJlbm5lMjM4In0.oTSYpzFUBTyRvWqnJvIzTFT4lJ78K_p_nYkFO28A3eQ" http://127.0.0.1:8000/api/get/public_key/benne238` |
| **Return on Success**: | `{"user_name": <user_name>, "public_key": <public_key>}`|

This endpoint will return the `public key` associated with a given `user_name` if it exists. This enpoint is unique in that arguments are given directly to the url. For example: `.../api/get/public_key/hello` will get the public key for the user `hello`.

## `../api/login/`

|   |   |
|-:|:-|
| **Type**: | `POST` |
| **Content-Type**: | `application/json` |
| **Authorization Required**: | Already existing user, but doesn't need an access token |
| **Description**: | Used to "log" a user into the api. Or in a literal sense: it is used to create a new refresh/access token pair for a given user |
| **Arguments**: | `user_name`: *Username*,<br />`password`: *Plain Text Password (not secure, but ok for this project)* |
| **Argument Requirements**: | None |
| **Example**: | `curl -X POST -H "Content-Type: application/json" -d '{"user_name": "benne238", "password":"pass_word"}' http://127.0.0.1:8000/api/login/` |
| **Return on Success**: | `{"refresh":"<refresh_token>", "access":"<access_token>"}`|

For all intents and purposes, this endpoint is used to log users into the api and give them a valid refresh and access token. They must be an already existing user in order to use this endpoint, so providing the `user_name` and `password` in the request is basically the user logging in.

## `../api/refresh/`

|   |   |
|-:|:-|
| **Type**: | `POST` |
| **Content-Type**: | `application/json` |
| **Authorization Required**: | needs a valid refresh token, but not (necessarily) a valid access token |
| **Description**: | Used to extend a user's session. Access tokens expire very quickly, but refresh tokens do not, so the user, every 5 minutes provide their refresh token in order to recive a new access token. |
| **Arguments**: | `refresh`: *resfresh token* |
| **Argument Requirements**: | `refresh`: *must be a valid refresh token* |
| **Example**: | `curl -X POST -H "Content-Type: application/json" -d '{"refresh": "<refresh_token>"}' http://127.0.0.1:8000/api/refresh/` |
| **Return on Success**: | `{"access":"<access_token>"}`|

This endpoint allows the user to continue to prove their authentication: the access token is the only token that allows a user to interact with the api and it expires every 5 minutes, requiring that the user submit their refresh token in order tto continue using the api.
