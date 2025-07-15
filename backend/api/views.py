from django.shortcuts import render
from .models import Inventory
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer, LoginSerializer, InventorySerializer

import json

class RegisterView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            #calls create in serializer
            serializer.save()
            return Response({'message': 'Successful Registration'}, status=status.HTTP_201_CREATED)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = LoginSerializer(data=request.data)

        if not serializer.is_valid():
            print(serializer.errors)

        if serializer.is_valid():
            #runs validate() in the login serializer, and if good sends back user
            user = serializer.validated_data

            #generate refresh token
            refresh = RefreshToken.for_user(user)
            #return access and request token with username

            return Response({
                'refresh-token': str(refresh),
                'access-token': str(refresh.access_token),
                'username': user.username,
            })
        else:
            #if error happens, then show the inputted data and the error that occurred
            print("Incoming data:", request.data)
            print("Serializer errors:", serializer.errors)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.

class InventoryView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        
        inventory = Inventory.objects.filter(user=request.user).order_by("id")

        #convert JSON -> serializer
        serializer = InventorySerializer(inventory, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        print(request.data)

        inv_data = request.data

        inventory = Inventory.objects.create(user=request.user, 
                                             item_name=inv_data["item_name"],
                                             tier=inv_data["tier"],
                                             item_image=inv_data["item_image"])

        serializer = InventorySerializer(inventory, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Item added to Inventory", "data": serializer.data}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        



        