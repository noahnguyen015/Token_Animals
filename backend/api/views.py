from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer, LoginSerializer

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
                'username': user.username
            })
        else:
            #if error happens, then show the inputted data and the error that occurred
            print("Incoming data:", request.data)
            print("Serializer errors:", serializer.errors)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
