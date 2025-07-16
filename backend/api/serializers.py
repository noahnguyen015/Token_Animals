from rest_framework import serializers
from .models import CustomUser, Inventory
from django.contrib.auth import authenticate


class RegisterSerializer(serializers.ModelSerializer):

    #write_only = write to Django, but never receive from Django
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["username", "password"]

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)

class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        # **data = unpacks the data received to place them in proper arguments
        user = authenticate(**data)

        #if active, allow use of user for tokens
        if user and user.is_active:
            return user
        
        #HTTP 400
        raise serializers.ValidationError("Invalid Login Credentials")
        

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ["item_name", "tier"]
