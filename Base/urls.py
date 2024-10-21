from django.contrib import admin
from django.urls import path
from Home.views import Home_view
from Chat.views import chat_view

urlpatterns = [
    path('', Home_view, name='base_view'),
    path('chat/', chat_view, name='chat'),
    path("admin/", admin.site.urls),
]
