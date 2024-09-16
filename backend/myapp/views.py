from django.shortcuts import render
from .models import *
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import permissions, viewsets
from django.contrib.auth import authenticate, get_user_model, login, logout
User = get_user_model()
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from myapp.models import CustomUser
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from django.core.management import call_command
from django.views import View

# Create your views here.

class ProductView(APIView) :
    def get(self,request) :
        products = Product.objects.all()
        serializers = ProductSerializer(products, many=True)
        return Response(serializers.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class ProductCreationView(APIView) :

    permission_classes = [permissions.AllowAny]
    serializer = ProductSerializer

    def post(self, request):
        serializer = self.serializer(data=request.data)
        print(serializer.get_fields)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        print("coucou d'en bas ")
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
        

class ProductDetailView(APIView):
    def get(self, request, id):
        try:
            product = Product.objects.get(pk=id)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return JsonResponse({'error': 'Product not found'}, status=404)




class CustomModelListView(APIView):
     def get(self, request, id):
        try:
            user = CustomUser.objects.get(pk=id)
            serializer = CustomUserSerialiszer(user)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return JsonResponse({'error': 'Product not found'}, status=404)


class MyCartListView(APIView):
     permission_classes = [permissions.AllowAny]

     def get(self, request):
        print("je suis dans get")
        user_id = request.query_params.get('userId')
        try:
            product = ChosenProduct.objects.filter(user=user_id)
            serializer = ChoosenProductSerializer(product, many=True)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return JsonResponse({'error': 'Product not found'}, status=404)

     def post(self, request):
        print("je suis dans post", request.data)
        try:
            item_id = request.data['productId']
            print("a")
            item = Product.objects.get(id=item_id)
            print("b")
            user_id = request.data['userid']
            print(item_id, user_id)
            data = {'user' : user_id, 'item' : item_id }
            serializer = ChoosenProductSerializer(data=data)
            print("oulala kamek")
            print("serializer :", serializer.get_fields)
            if serializer.is_valid():
                print("serializer is fine")
                try:
                    serializer.save()
                    print('Saved successfully!')
                except Exception as e:
                    print(f"Save failed with error: {e}")
                return Response({'message': 'Item ajouté au cart'}, status=201)
                serializer.save()
                
                return Response({'message': 'Item ajouté au cart'}, status=201)
            print("ca marche")
            return Response(serializer.errors, status=400)
        except Product.DoesNotExist:
            return JsonResponse({'error': 'Item not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
  

class RegisterViewset(APIView):
    print("register")
    permission_classes = [permissions.AllowAny]
    serializer = RegisterSerializer  # Garder `serializer` au lieu de `serializer_class`

    def post(self, request):
        print("POST Method")
        print("requete : ", request.data)
        serializer = self.serializer(data=request.data)  # Utiliser `self.serializer` au lieu de `self.serializer_class`
        print("serializer :", serializer.get_fields)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)  # Renvoie un code de statut HTTP 201
        else:
            print("tchoutchou")
            return Response(serializer.errors, status=400)  # Renvoie un code de statut HTTP 400 pour les erreurs
        


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        print("Bonjour")
        serializer = LoginSerializer(data=request.data)
        print("Hello")
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            print('coucou')
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'id':(user.id)
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    print("coucou")
    if request.method == 'POST':
        print("ma request :", request)
        serializer = LoginSerializer(data=request.data)
        print("mon serializer:", serializer)
        
        print(serializer.is_valid())

        if serializer.is_valid():

            user = serializer.initial_data['user']
            user_id = serializer.get_user_id_from_email(user)
            print(user_id)
            refresh = RefreshToken.for_user(user)
            print("Login successful")
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_id': user_id,
            }, status=status.HTTP_200_OK)
        print("Login UNsuccessful")
        

    return Response({"error": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class LogoutView(APIView):
     print('coucou je suis là ')
     permission_classes = (IsAuthenticated,)
     def post(self, request):
          
          try:
               print('coucou je suis là : test')
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               print('l erreur est là  ')
               return Response(status=status.HTTP_400_BAD_REQUEST)
                
class PopulateDBView(View):
    def get(self, request, *args, **kwargs):
        try:
            call_command('populate_db')
            return JsonResponse({'message': 'Database successfully populated.'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
