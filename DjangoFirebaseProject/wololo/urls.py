from django.urls import path

# from . import views
from wololo.views.afterLoginViews.buildingViews import barracksView
from wololo.views.afterLoginViews import mapView, villagesViews, clansView, reportsView
from wololo.views.beforeLoginViews import selectingRegionView, landingView, registerView
from wololo.views import auth
urlpatterns = [
    path('', landingView.landingPage, name='landingPage'),
    path('register', registerView.registerPage, name='registerPage'),
    path('createAccount', auth.createAccount, name='createAccount'), #FORM CALL
    path('game/selectRegion', selectingRegionView.selectRegionOnFirstLoginView, name='selectRegion'),


    path('game', villagesViews.villages, name='myVillage'),
    path('game/<int:village_index>', villagesViews.villages),

    path('game/map', mapView.map, name='map'),
    path('game/<int:village_index>/map', mapView.map),

    path('game/barracks', barracksView.barracks, name='barracks'),
    path('game/<int:village_index>/barracks', barracksView.barracks, name='barracks'),
    path('game/barracks/trainUnits', barracksView.trainUnits, name='trainUnits'), #AJAX CALL



    path('game/clans', clansView.clans, name='clans'),
    path('game/reports', reportsView.reports, name='reports'),


    path('game/upgrade', villagesViews.upgrade, name='upgrade'),
    path('game/cancelUpgrade', villagesViews.cancelUpgrade, name='cancelUpgrade'),

    #FORM CALL
    path('game/selectingRegion', selectingRegionView.selectingRegion),
    path('verifyLogin', auth.verifyLogin, name='verifyLogin'),
    path('logout', auth.logout, name='verifyLogin'),


]