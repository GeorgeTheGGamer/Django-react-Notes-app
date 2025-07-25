from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NotesSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

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

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class= NotesSerializer
    permission_classes=[IsAuthenticated]            # Must have a JWT Token

    # Only view notes written by you and not someone elses 
    def get_queryset(self):
        user = self.request.user                    # Get the user that is authenticated and interacting currently  
        return Note.objects.filter(author=user)     # Get all the notes for the specific user

# Manually add in the author as we have specified the need for a read only author 
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NotesSerializer
    permission_classes=[IsAuthenticated]

# The queryset is what can be changed. In this instance Notes that are owned by the user 
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    