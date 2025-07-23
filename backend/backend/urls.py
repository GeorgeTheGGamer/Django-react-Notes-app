from django.contrib import admin
from django.urls import path
from api.views import CreateUserView    # Import custom create user view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
]
