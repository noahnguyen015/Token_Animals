from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.

class CustomUserManager(BaseUserManager):
    
    def create_user(self, username, password):
        if not username:
            raise ValueError("Please Enter a Username")
        if not password:
            raise ValueError("Please Enter a Password")
        
        #set the username field to the input username
        user = self.model(username=username)
        #hash password
        user.set_password(password)

        #save to model
        user.save()

        return user
    

class CustomUser(AbstractBaseUser):
    
    username = models.CharField(max_length = 50, unique = True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default = False)

    #link manager, so to call the customUserManager, use objects.(FUNCTION)
    objects = CustomUserManager()

    #use username login field 
    USERNAME_FIELD = "username"

    def __str__ (self):
        return self.username

class Inventory(models.Model):

    # (1-1, on delete of user, inventory is gone, inventory is how user calls Inventory model)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="inventory")

    item_name = models.CharField(max_length=50)
    tier = models.CharField(max_length=30)
    item_image = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.item_name} & {self.tier}"

