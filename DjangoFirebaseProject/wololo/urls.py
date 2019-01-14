from django.urls import path

from . import views

urlpatterns = [
    path('', views.landingPage, name='landingPage'),
    path('register', views.registerPage, name='registerPage'),
    path('createAccount', views.createAccount, name='createAccount'),

    path('game', views.village, name='game'),
    path('game/map', views.map, name='map'),
    path('game/clans', views.clans, name='clans'),
    
    #FORM CALL
    path('verifyLogin', views.verifyLogin, name='verifyLogin'),
    path('logout', views.logout, name='verifyLogin'),


]