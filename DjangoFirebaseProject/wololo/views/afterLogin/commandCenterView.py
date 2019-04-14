from django.shortcuts import render, redirect
from wololo.firebaseUser import firebaseUser
import urllib.request
import urllib.error
from wololo.views.auth import myuser_login_required
from wololo.commonFunctions import getGameConfig, getVillageIndex
from wololo.helperFunctions import getVillageInfo, getPublicVillages
import json
import datetime
import pytz
from wololo.tasks import attack

gameConfig = getGameConfig()

@myuser_login_required    
def commandCenter(request, village_index=None):
    user_id = request.session['userID']
    user = firebaseUser(user_id)
    if user.regionSelected is False :
        return redirect("selectRegion")

    selected_village_index = getVillageIndex(request, user, village_index)
    if(selected_village_index == 'outOfList'):
        return redirect('commandCenter')

    commandTargetVillageID = request.POST.get("commandTargetVillageID")
    targetVillage = getVillageInfo(commandTargetVillageID)
    print(targetVillage)

    publicVillages = getPublicVillages(user)

    data = { 
        'selectedVillage': user.myVillages[selected_village_index],
        'gameConfig' : gameConfig,
        'targetVillage' : targetVillage,
        'page' : 'commandCenter'
    }
    currentUser = {}
    currentUser['id'] = user_id

    return render(request, 'commandCenter.html', {'currentUser':currentUser, 'publicVillages':json.dumps(publicVillages), 'myVillages':user.myVillages, 'data' : data})

def sendAttack(request):
    now = datetime.datetime.now(pytz.utc)
    estimatedMinutes = request.POST.get("estimatedMinutes")
    attackerTroops = json.loads(request.POST.get("troops")) 
    fromVillageID = request.POST.get("fromVillageID")
    targetVillageID = request.POST.get("targetVillageID")

    # print(attackerTroops)

    task_id = attack.apply_async((fromVillageID, targetVillageID, attackerTroops),countdown = 2)
    task_id = task_id.id

    return redirect('myVillage')