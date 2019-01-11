from django.urls import path

from . import views

urlpatterns = [
    path('', views.landingPage, name='landingPage'),
    path('register', views.register, name='register'),
    path('changeThis', views.index, name='index'),

    path('game', views.village, name='game'),
    path('game/map', views.map, name='map'),
    path('game/clans', views.clans, name='clans'),
]