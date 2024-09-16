
from django.db import models
from django.conf import settings
from django_countries.fields import CountryField
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.auth.models import BaseUserManager
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from django.template.defaultfilters import slugify



class CustomUserManager(BaseUserManager) :
     def create_user(self, email, password, **extra_fields) : 
         
         if not email : 
             raise ValueError('Email is a required field')
         email = self.normalize_email(email)
         user = self.model(email=email, **extra_fields)
         user.set_password(password)
         
         user.save(using=self._db)
         
         return user
     

     def create_superuser(self, email, password, **extra_fields) :
         extra_fields.setdefault('is_staff', True)
         extra_fields.setdefault('is_superuser', True)
         return self.create_user( email, password, **extra_fields)

     def __str__(self):
        return self.username

         



class CustomUser(AbstractUser) :
    name = models.CharField(max_length=300, blank=False)
    last_name = models.CharField(max_length=300, blank=False)
    email = models.EmailField(max_length=200, blank=False, unique=True)
    username = models.CharField(max_length=200, null=True, blank=True, unique=True)

    
    REQUIRED_FIELDS = ['name', 'last_name']
    USERNAME_FIELD = 'email' #utilise l'email pour s'authentifier




    @property
    def jwt_tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
   



CATEGORY_CHOICES = (
    ('CAM', 'Camera'),
    ('POL', 'Polaroid'),
    ('MIC', 'Microphone'),
    ('ACC', 'Accesories'),)



# Create your models here.
class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    price = models.CharField(max_length=4)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=4)
    image = models.ImageField(blank=True, null= True)
    brand = models.CharField(max_length=100)
   


class ChosenProduct(models.Model) :
    id = models.AutoField(primary_key=True)
    user = models.IntegerField()
    item = models.IntegerField()
    

class Order(models.Model) :
    ref_id = models.CharField(max_length=20, blank=True, null=True)
    items = models.ManyToManyField(Product)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)
    received = models.BooleanField(default=False)
   


class Address(models.Model):
    street_address = models.CharField(max_length=100)
    name_address = models.CharField(max_length=100)
    country = CountryField(multiple=False)
    zip = models.CharField(max_length=100)



class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.user.username

  
    
   

    