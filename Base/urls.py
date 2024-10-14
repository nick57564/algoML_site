from django.contrib import admin
from django.urls import path
from Home.views import Home_view

urlpatterns = [
    path('', Home_view, name='base_view'),
    path("admin/", admin.site.urls),
]
