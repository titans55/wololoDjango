from django.shortcuts import render, redirect
from wololo.firebaseUser import firebaseUser
import urllib.request
import urllib.error
from wololo.views.auth import myuser_login_required
from wololo.commonFunctions import getGameConfig, getVillageIndex
from wololo.helperFunctions import getAllPlayersOrderedByPoints

gameConfig = getGameConfig()

@myuser_login_required    
def ranking(request, village_index=None):
    user_id = request.session['userID']
    user = firebaseUser(user_id)
    if user.regionSelected is False :
        return redirect("selectRegion")

    selected_village_index = getVillageIndex(request, user, village_index)
    if(selected_village_index == 'outOfList'):
        return redirect('ranking')

    allPlayers = getAllPlayersOrderedByPoints()
    print(allPlayers)

    data = { 
        'villages_info' : user.myVillages,
        'selectedVillage': user.myVillages[selected_village_index],
        'gameConfig' : gameConfig,
        'allPlayers' : allPlayers,
        'unviewedReportExists' : user.unviewedReportExists,
        'page' : 'ranking'
    }

    return render(request, 'ranking.html', {'myVillages':user.myVillages, 'data' : data})
