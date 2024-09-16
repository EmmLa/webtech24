"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import *
from myapp.views import *
from rest_framework_simplejwt import views as jwt_views
from rest_framework.routers import DefaultRouter
from myapp.views import login
from myapp.views import PopulateDBView  # Import the view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', ProductView.as_view(), name="something"),
    path('products/<int:id>/', ProductDetailView.as_view(), name='product_detail'),
    path('productsCreation/', ProductCreationView.as_view(), name='product_creation'),
    path('custommodels/<int:id>/', CustomModelListView.as_view()),
    path('register/', RegisterViewset.as_view(), name='register'),
    path('cart/', MyCartListView.as_view(), name='mycart'),
     path('api/login/', login, name='login'),
     path('api/logout/', LogoutView.as_view(), name ='logout'),
     path('api/', include('myapp.api.urls')),
     path('populate-db/', PopulateDBView.as_view(), name='populate_db'),
    
]


