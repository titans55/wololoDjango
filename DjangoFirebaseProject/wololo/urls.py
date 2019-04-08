from django.urls import path

from . import views

urlpatterns = [
    path('', views.landingPage, name='landingPage'),
    path('register', views.registerPage, name='registerPage'),
    path('createAccount', views.createAccount, name='createAccount'),
    path('game/selectRegion', views.selectRegionOnFirstLoginView, name='selectRegion'),


    path('game', views.villages, name='myVillage'),
    path('game/<int:village_index>', views.villages),

    path('game/map', views.map, name='map'),
    path('game/<int:village_index>/map', views.map),

    path('game/barracks', views.barracks, name='barracks'),
    path('game/<int:village_index>/barracks', views.barracks),


    path('game/clans', views.clans, name='clans'),
    path('game/reports', views.reports, name='reports'),


    #AJAX CALL
    path('game/upgrade', views.upgrade, name='upgrade'),
    path('game/cancelUpgrade', views.cancelUpgrade, name='cancelUpgrade'),
    path('game/barracks/trainUnits', views.trainUnits, name='trainUnits'),

    #FORM CALL
    path('game/selectingRegion', views.selectingRegion),
    path('verifyLogin', views.verifyLogin, name='verifyLogin'),
    path('logout', views.logout, name='verifyLogin'),


]