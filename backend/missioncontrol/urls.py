"""missioncontrol URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
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

from missioncontrol import api


board_api_urls = [
    path('', api.BoardAPIView.as_view()),
    path('tasks/', api.TaskListAPIView.as_view()),
    path('task/<str:task_id>/', api.TaskAPIView.as_view()),
]

api_urls = [
    path('boards/', api.BoardListAPIView.as_view()),
    path('board/<int:board_id>/', include(board_api_urls)),
    path('login/github/', api.github_login),
]

urlpatterns = [
    path('healthcheck', api.health_check),
    path('admin', admin.site.urls),
    path('api/', include(api_urls))
]
