from django.shortcuts import render, redirect
from wololo.firebaseUser import firebaseUser
import urllib.request
import urllib.error
from wololo.views.auth import myuser_login_required
from wololo.commonFunctions import getGameConfig, getVillageIndex

@myuser_login_required    
def clans(request, village_index=None):
    user_id = request.session['userID']
    user = firebaseUser(user_id)
    if user.regionSelected is False :
        return redirect("selectRegion")

    selected_village_index = getVillageIndex(request, user, village_index)
    if(selected_village_index == 'outOfList'):
        return redirect('clans')

    return render(request, 'clans.html')
