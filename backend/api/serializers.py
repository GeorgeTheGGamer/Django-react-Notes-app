from django.contrib.auth.models import User 
from rest_framework import serializers
from .models import Note


# ORM (Object relational mapping) - Django handles database operations from just Python Code 
# JSON - Communicate JSON Objects from website and send JSON Objects back 

# A serializer takes python code and output it as a JSON Object for the webiste to understand and use Accordingly 
# And vise versa 

class UserSerializer(serializers.ModelSerializer):
    # This specifies the User and the fields that will go between JSON object and Django 
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password": {"write_only": True}}   # No one can read the password (Only can be written to )


    # This creates a new user by passing in the validated data (Key Word Arguments)
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)   # Validation data kwarg allows for cleaner all user registration data  
        return user 
    

# Conversion into JSON Object to be passed to React front end 
class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note    # Take the model from the note
        fields = ["id","title","content","created_at","author"]
        extra_kwargs = {"author": {"read_only":True}}



