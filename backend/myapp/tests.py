from django.test import TestCase

# Create your tests here.
from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth.models import User

# Importations nécessaires
from django.contrib.auth import authenticate, get_user_model

# Obtention du modèle CustomUser
CustomUser = get_user_model()

# Création d'un utilisateur (si ce n'est pas déjà fait)
user = CustomUser.objects.create_user(
    username='lax', 
    email='lax@lax.lax', 
    password='password1234', 
    name='Test', 
    last_name='User'
)

# Authentification de l'utilisateur en utilisant l'email
user = authenticate(email='lax@lax.lax', password='password1234')

if user is not None:
    print("Login réussi")
    print("Nom:", user.name)
    print("Prénom:", user.last_name)
    print("Email:", user.email)
else:
    print("Échec de la connexion")
