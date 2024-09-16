from django.contrib import admin
from .models import *

# Register your models here.

# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from .form import *

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ["email", "username",]
    










admin.site.register(CustomUser)
admin.site.register(Product)
admin.site.register(ChosenProduct)
admin.site.register(Address)
admin.site.register(Profile)