"""snappy_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from core import views

urlpatterns = [
    #path('hello/', views.HelloView.as_view(), name = 'hello'),
    path('api/get/public_key/<str:user_name>', views.PublicKey.as_view(), name='public_key'),
    path('api/login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/messages/', views.Messages.as_view(), name = 'messages'),
    path('api/register/', views.CreateUser.as_view()),#path('register', views.CreateUser.as_view(), name = "create_user")
]
