from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView    # Import custom create user view
# These are custom pre-built views which allow for access and refresh tokens 
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# These URLs we can use to call a specific function or operation 
# When we go to these roots then it calls a specific view
# So once registered then create a user 
urlpatterns = [
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    # This takes URLs such as 
    path("api-auth/", include("rest_framework.urls")),   
    # If none of the other urls are matching then go into the urls in the api app. Then choose the view that matches there    
    path("api/", include("api.urls")),                                        
]
