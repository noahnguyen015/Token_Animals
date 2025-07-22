from django.urls import path, include
from .views import RegisterView, LoginView, InventoryView, WalletView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('inventory/', InventoryView.as_view(), name='inventory'),
    path('wallet/', WalletView.as_view(), name='wallet'),
    path('', include(router.urls))
]