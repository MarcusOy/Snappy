from json.encoder import JSONEncoder
from django.http.response import JsonResponse
import rest_framework
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
import rest_framework_simplejwt
from rest_framework_simplejwt.authentication import JWTAuthentication as API_auth
from core.models import MESSAGE, CHAT, USER
from core.serializers import RegistrationSerializer
from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# class HelloView(APIView):
#     permission_classes = (IsAuthenticated,) #uncomment this to require authentication to access this content
    
#     def get(self, request):
#         content = {'message': 'Hello, World!'}
#         #return Response(content) #uncoment the return statement to get a more "admin" friendly website
#         return JsonResponse(content)
#     def post(self, request):
#         token = request.data.get("token", {})
#         return JsonResponse(request.data)

class PublicKey(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, user_name):
        #print(user_name)

        try:
            user = USER.objects.get(user_name=user_name)
        except:
            return JsonResponse({"response": f"user: \"{user_name}\" doesn't exist"})
        
        return JsonResponse(
            {
                "user_name": user_name,
                "public_key": user.public_key
            }
        )

class Messages(APIView):
    permission_classes = (IsAuthenticated,)

    # gets messages for a given logged in user
    def get(self, request):
        user = request.user
        user_name = user.user_name

        response = []
        #content = MESSAGE.objects.all()
        chats = CHAT.objects.filter(sender=user_name).values() | CHAT.objects.filter(reciever=user_name).values()
        for index, chat in enumerate(chats):
            response.append(
                {
                    "chat_ID": chat["chat_ID"],
                    "sender": str(chat["sender_id"]),
                    "recipient": str(chat["reciever_id"]),
                    "messages" : []
                }
            )
            for message in MESSAGE.objects.filter(chat_ID=chat["chat_ID"]).values():
                message_dict = {}
                message_dict["message_ID"] = message["message_ID"]
                if chat["sender_id"] == user_name:
                    message_dict["encrypted_message"] = message["sender_copy"]
                else:
                    message_dict["encrypted_message"] = message["encrypted_message"]

                # "message_ID": message["message_ID"],
                # "encrypted_message": message["encrypted_message"]
                # }
                response[index]["messages"].append(message_dict)
            #response[index]["messages"] = [message_ID, encrypted_message, for MESSAGE.objects.filter(chat_ID=chats.chat_ID)]

        return JsonResponse({"response":response})

    # allows user to "send" message as themselves to any other user
    def post(self, request):
        user = request.user
        user_name = user.user_name
        raw_message = request.data.get("message")
        
        if not USER.objects.filter(user_name=user_name):
            return JsonResponse({"Error": f"Sender: \"{user_name}\"; this user_name doesn't exist"})

        elif not USER.objects.filter(user_name=raw_message["recipient"]):
            return JsonResponse({"Error": f"Recipient \"{raw_message['recipient']}\" doesn't exist"})

        try:
            chat = CHAT.objects.get(sender=user_name, reciever=raw_message["recipient"])

        except:
            sender = USER.objects.get(user_name=user_name)
            reciever = USER.objects.get(user_name=raw_message["recipient"])
            chat = CHAT(sender=sender, reciever=reciever)
            chat.save()

        message = MESSAGE(
            chat_ID=chat, 
            encrypted_message=raw_message["encrypted_message"],
            sender_copy=raw_message["sender_copy"]
        )
        message.save()
        #user_name_request = API_auth.get_user(self, validated_token = request)
        #database_user = MESSAGE(user_name = user_name_request).objects
        return JsonResponse({"success": True})

class CreateUser(APIView):

    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

    def post(self, request):
        user = request.data.get('user', {})

        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        token = {
            "refresh": str(TokenObtainPairSerializer.get_token(serializer.instance)),
            "access": str(TokenObtainPairSerializer.get_token(serializer.instance).access_token)
        }
        response = {
            "token": token,
            "user_name": serializer.instance.user_name
        }

        return Response(response, status=status.HTTP_201_CREATED)
        # if type(request) != Request:
        #     return JsonResponse({"error": "Fatal: request very invalid"})
        
        # request_dict = dict(request.data)
        # USER_fields = [field.name for field in USER._meta.fields]
        # for field in USER_fields:
        #     if field not in request_dict.keys():
        #         return JsonResponse({"Error": f'Required: "{field}" field not specified in request'})

        # if USER.objects.filter(user_name = request_dict["user_name"]):
        #     return JsonResponse({"Error": f'Username "{request_dict["user_name"]}" already exists'})
        # if USER.objects.filter(public_key = request_dict["public_key"]):
        #     return JsonResponse({"Error": 'Public key already in use'})
        # try:
        #     new_user = USER(**request_dict)
        #     new_user.save()
        # except Exception as e:
        #     JsonResponse({"Error": str(e)})
        
        # return JsonResponse({"Success": True})
