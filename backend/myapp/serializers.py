from rest_framework import serializers
from .models import *
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, get_user_model 
User = get_user_model()
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken




class ProductSerializer(serializers.ModelSerializer):    

    class Meta:
        model = Product
        fields = ['id','name', 'description', 'price', 'category','image','brand'] #Image ?

        def create(self, validated_data) :
                product = Product(
            name=validated_data['name'],
            description=validated_data['description'],
            price=validated_data['price'],
            category=validated_data['category'],
            image=validated_data['image'],
            brand=validated_data['brand'],

        )
                product.save()
                return product
        




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'address', 'country', 'zip_code']
      
class ChoosenProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChosenProduct
        fields = ['id', 'user', 'item']

    def validate(self, data):
        user_id = data.get('user')
        item_id = data.get('item')
        if not User.objects.filter(id=user_id).exists():
            raise serializers.ValidationError({'user': 'User not found'})
        if not Product.objects.filter(id=item_id).exists():
            raise serializers.ValidationError({'item': 'Item not found'})
        print("hohohoho")
        return data  # <--- Return the validated data

    
    
    def create(self, validated_data):
        print("jesus ici")
        return ChosenProduct.objects.create(**validated_data)


class Order(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'ref_id','items', 'ordered_date', 'ordered', 'received', 'payment']

 

class Address(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['street_address', 'name_address', 'counrty', 'zip']



class CustomUserSerialiszer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'last_name', 'email', 'password']

class CustomTokenSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    def validate(self, email, password):
        try:
            self.user = CustomUser.objects.get(email=email)
        except ObjectDoesNotExist as e:
            message = {'error': f'User with email={email} does not exist.'}
            return message
        check_auth = authenticate(username=email, password=password)
        if check_auth is None:
            message = {'error': 
                       'The user exists, but the password is incorrect.'}
            return message
        data = self.user.jwt_tokens
        update_last_login(None, self.user)
        return data
    

class RegisterSerializer(serializers.ModelSerializer):
    class Meta :
        model = User
        fields = ('id', 'email', 'password')
        extra_kwargs = {'password' : {'write_only':True}}
                        
        def create(self, validated_data) :
            user = User.objects.create_user(**validated_data)
            return user
                        


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def get_user_id_from_email(self, email):
        try:
            user = User.objects.get(email=email)
            return user.id
        except User.DoesNotExist:
            return None

    def is_valid(self):
        print("coucou")
        email = self.initial_data['username']
        password = self.initial_data['password']
        

        print(f"Email: {email}, Password: {password}")

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                username=email, password=password)
            
            print(f"Authenticated user: {user}")
            print(user.id)

            if not user:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "email" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        self.initial_data['user'] = user
        print("fin de la méthode")
        return True
    


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Profile
        fields = ('user', 'first_name', 'last_name', 'email')



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['name', 'last_name', 'email', 'username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords must match."})
        return data

    def create(self, validated_data) : 
        user = CustomUser(
            name=validated_data['name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            username=validated_data.get('username', None)
        )
        user.set_password(validated_data['password'])
        user.save()
        return user