from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Views handle HTTP Requests and responses 

'''
Process incoming request data (GET, POST, etc.)
Interact with models (database operations)
Apply business logic
Return a response (HTML, JSON, redirect, etc.)=
'''

# Class based view allowing for implenting a new user
class CreateUserView(generics.CreateAPIView):   # Inherit

    # List of all objects (so we don't create a user that already exists )
    queryset = User.objects.all()
    # What is needed to accept a new user 
    serializer_class = UserSerializer
    # Specifies who can call this (Even non authenticated)
    permission_classes = [AllowAny]