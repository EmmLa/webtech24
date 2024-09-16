# myapp/management/commands/populate_db.py

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from myapp.models import Product, ChosenProduct  # Adjust this import based on your app and models
from random import choice

User = get_user_model()

class Command(BaseCommand):
    help = 'Populates the database with test users and products'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Product.objects.all().delete()
        ChosenProduct.objects.all().delete()

        # Create users
        users = []
        for i in range(1, 7):  # 6 users
            user = User.objects.create_user(
                username=f'testuser{i}',
                password=f'pass{i}',
                email=f'testuser{i}@shop.aa'
            )
            users.append(user)

        # Create products
        products = []
        for i in range(1, 31):  # 30 products
            product = Product.objects.create(
                name=f'Product {i}',
                description=f'Description for product {i}',
                price=10.0 + i,
                category='Category',
                image='path/to/image.jpg',  # Adjust if necessary
                brand='Brand'
            )
            products.append(product)

        # Assign products to some users
        for i in range(0, 3):  # First 3 users are sellers
            for j in range(0, 10):  # Each seller has 10 products
                ChosenProduct.objects.create(
                    user=i,
                    item=j
                )

        self.stdout.write(self.style.SUCCESS('Database successfully populated with test data.'))
