import jwt

from datetime import datetime, timedelta

from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)
from django.db import models

class UserManager(BaseUserManager):
    """
    Django requires that custom users define their own Manager class. By
    inheriting from `BaseUserManager`, we get a lot of the same code used by
    Django to create a `User`. 

    All we have to do is override the `create_user` function which we will use
    to create `User` objects.
    """

    def create_user(self, user_name, public_key, first_name, password):
        """Create and return a `User` with an email, username and password."""
        if user_name is None:
            raise TypeError('Users must have a username.')

        if public_key is None:
            raise TypeError('Users must have an email address.')
        
        if first_name is None:
            raise TypeError('User must have a first name.')

        if password is None:
            raise TypeError('User must have a password.')

        user = self.model(user_name=user_name, first_name=first_name, public_key=public_key)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, user_name, public_key, first_name, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if user_name is None:
            raise TypeError('Superusers must have a username.')

        if public_key is None:
            raise TypeError('Superusers must have an email address.')
        
        if first_name is None:
            raise TypeError('Superuser must have a first name.')
        
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(user_name, public_key, first_name, password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

class USER(AbstractBaseUser, PermissionsMixin):
    # Each `User` needs a human-readable unique identifier that we can use to
    # represent the `User` in the UI. We want to index this column in the
    # database to improve lookup performance.
    user_name = models.CharField(
        primary_key=True,
        db_index=True,
        max_length=20,
        unique=True
    )

    public_key = models.TextField(
        null = False,
        unique = True
    )

    first_name = models.CharField(
        null = False,
        max_length = 100
    )

    password = models.CharField(
        null = False,
        max_length = 128
    )
    # We also need a way to contact the user and a way for the user to identify
    # themselves when logging in. Since we need an email address for contacting
    # the user anyways, we will also use the email for logging in because it is
    # the most common form of login credential at the time of writing.
    #email = models.EmailField(db_index=True, unique=True)

    # When a user no longer wishes to use our platform, they may try to delete
    # their account. That's a problem for us because the data we collect is
    # valuable to us and we don't want to delete it. We
    # will simply offer users a way to deactivate their account instead of
    # letting them delete it. That way they won't show up on the site anymore,
    # but we can still analyze the data.
    #is_active = models.BooleanField(default=True)

    # The `is_staff` flag is expected by Django to determine who can and cannot
    # log into the Django admin site. For most users this flag will always be
    # false.
    #is_staff = models.BooleanField(default=False)

    # A timestamp representing when this object was created.
    #created_at = models.DateTimeField(auto_now_add=True)

    # A timestamp reprensenting when this object was last updated.
    #updated_at = models.DateTimeField(auto_now=True)

    # More fields required by Django when specifying a custom user model.

    # The `USERNAME_FIELD` property tells us which field we will use to log in.
    # In this case we want it to be the email field.
    USERNAME_FIELD = 'user_name'
    REQUIRED_FIELDS = ['public_key', 'first_name', 'password']

    # Tells Django that the UserManager class defined above should manage
    # objects of this type.
    objects = UserManager()

    def __str__(self):
        """
        Returns a string representation of this `User`.

        This string is used when a `User` is printed in the console.
        """
        return str(self.user_name)

    @property
    def token(self):
        """
        Allows us to get a user's token by calling `user.token` instead of
        `user.generate_jwt_token().

        The `@property` decorator above makes this possible. `token` is called
        a "dynamic property".
        """
        return self._generate_jwt_token()

    def get_full_name(self):
        """
        This method is required by Django for things like handling emails.
        Typically this would be the user's first and last name. Since we do
        not store the user's real name, we return their username instead.
        """
        return self.first_name

    def get_short_name(self):
        """
        This method is required by Django for things like handling emails.
        Typically, this would be the user's first name. Since we do not store
        the user's real name, we return their username instead.
        """
        return self.first_name

    def _generate_jwt_token(self):
        """
        Generates a JSON Web Token that stores this user's ID and has an expiry
        date set to 60 days into the future.
        """
        dt = datetime.now() + timedelta(days=60)

        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, algorithm='HS256')

        return token
    
    # def set_password(self, password):
    #     self.password = password

#class USER(models.Model):
#    user_name = models.CharField(
#        unique = True,
#        primary_key = True,
#        max_length = 20
#    )
#    public_key = models.TextField(
#        null = False,
#        unique = True
#    )
#    first_name = models.CharField(
#        null = False,
#        max_length = 100
#    )
#    hashed_password = models.CharField(
#        null = False,
#        max_length = 64
#    )

class CHAT(models.Model):
    chat_ID = models.AutoField(primary_key = True)
    sender = models.ForeignKey(
        USER, 
        on_delete = models.CASCADE,
    )
    reciever = models.ForeignKey(
        USER,
        on_delete = models.CASCADE,
        related_name = "reciever"
    )

class MESSAGE(models.Model):
    message_ID = models.AutoField(primary_key = True)
    chat_ID = models.ForeignKey(
        CHAT,
        null = False,
        on_delete = models.CASCADE
    )
    encrypted_message = models.TextField(null = False)
    sender_copy = models.TextField(null = False)

    class Meta:
        unique_together = (("message_ID", "chat_ID"),)
# Create your models here.
