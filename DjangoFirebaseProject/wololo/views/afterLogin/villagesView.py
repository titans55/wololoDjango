from django.shortcuts import render, redirect
from django.http import JsonResponse
from wololo.tasks import schedule_upgrade_building
from wololo.helperFunctions import setSumAndLastInteractionDateOfResource, getRequiredTimeForUpgrade
from wololo.firebaseUser import firebaseUser
from wololo.commonFunctions import getGameConfig, getVillageIndex
import urllib.request
import urllib.error
import json
import datetime
import pytz
from celery import chain
from wololo.views.auth import myuser_login_required

gameConfig = getGameConfig()

@myuser_login_required
def villages(request, village_index=None):
    user_id = request.session['userID']
    print(user_id)
    user = firebaseUser(user_id)
    if user.regionSelected is False :
        return redirect("selectRegion")
       
    selected_village_index = getVillageIndex(request, user, village_index)
    if(selected_village_index is 'outOfList'):
        return('barracks')

         

    data = { 
        'villages_info' : user.myVillages,
        'selectedVillage': user.myVillages[selected_village_index],
        'gameConfig' : gameConfig,
        'page' : 'myVillages'
    }
    # data = json.dumps(data)
    return render(request, 'villages.html', {'myVillages':user.myVillages, 'data' : data})


@myuser_login_required
def upgrade(request):
    if request.method == "POST":
        now = datetime.datetime.now(pytz.utc)
        firing_time = request.POST.get("firingTime") #we should use this instead of now
        village_id = request.POST.get("village_id")
        building_path = request.POST.get("building_path")

        user_id = request.session['userID']
        user = firebaseUser(user_id)
        if user.regionSelected is False :
            return redirect("selectRegion")

        selected_village_index = getVillageIndex(request, user, None)  


        village = user.myVillages[selected_village_index]
        #upgrade_levelTo = village[building_path]['level'] + 1
        if '.' in building_path : 
            # print(village['resources'],"kololo")
            upgrade_levelTo = str(int(village['buildings']['resources'][building_path.split('.')[1]]['level']) + 1)
            required_clay = gameConfig['buildings']['resources'][building_path.split('.')[1]]['upgradingCosts'][upgrade_levelTo]['clay']
            required_iron = gameConfig['buildings']['resources'][building_path.split('.')[1]]['upgradingCosts'][upgrade_levelTo]['iron']
            required_wood = gameConfig['buildings']['resources'][building_path.split('.')[1]]['upgradingCosts'][upgrade_levelTo]['wood']
        else :
            upgrade_levelTo = str(int(village['buildings'][building_path]['level']) + 1)
            required_clay = gameConfig['buildings'][building_path]['upgradingCosts'][upgrade_levelTo]['clay']
            required_iron = gameConfig['buildings'][building_path]['upgradingCosts'][upgrade_levelTo]['iron']
            required_wood = gameConfig['buildings'][building_path]['upgradingCosts'][upgrade_levelTo]['wood']
        #retrieve required resources from gameConfig.json with upgrade_level
        reqiured_time = getRequiredTimeForUpgrade(village, building_path, upgrade_levelTo)
        reqiured_time = 10
        wood_total = user.getCurrentResource(village_id, 'woodCamp')
        clay_total = user.getCurrentResource(village_id, 'clayPit')
        iron_total = user.getCurrentResource(village_id, 'ironMine')

        if(wood_total >= required_wood and iron_total >= required_iron and clay_total >= required_clay):
            #update sum and lastInteractionDate of resources (-cost)
            setSumAndLastInteractionDateOfResource(user_id, village_id, 'woodCamp', wood_total-required_wood, now)
            setSumAndLastInteractionDateOfResource(user_id, village_id, 'clayPit', clay_total-required_clay, now)
            setSumAndLastInteractionDateOfResource(user_id, village_id, 'ironMine', iron_total-required_iron, now)
            
            task_id = schedule_upgrade_building.apply_async((user_id, village_id, building_path, upgrade_levelTo),countdown = reqiured_time)
            task_id = task_id.id
            print(str(task_id) + " adadas")
            
            user.setUpgradingTimeAndState(village_id, building_path, reqiured_time, str(task_id), now)

            print(datetime.datetime.now(pytz.utc))
            user.update()
            print(datetime.datetime.now(pytz.utc))
            newResources = user.myVillages[selected_village_index]['buildings']['resources']

            data = {
                'result' : 'Success',
                'newResources' : newResources
            }
            if( '.' not in building_path):
                data['newBuilding'] = user.myVillages[selected_village_index]['buildings'][building_path]
            

            print("upgrading")
            return JsonResponse(data)
        else:
            data = {
                'result' : 'Fail',
            }
            print("not enough resources")
            return JsonResponse(data)


@myuser_login_required
def cancelUpgrade(request):
    now = datetime.datetime.now(pytz.utc)
    village_id = request.POST.get("village_id") 
    building_path = request.POST.get("building_path")
    firing_time = request.POST.get("firingTime")

    user_id = request.session['userID']
    user = firebaseUser(user_id)



    user.cancelUpgrading(village_id, building_path, now)

    user.update()
    selected_village_index = getVillageIndex(request, user, None)  
    newResources = user.myVillages[selected_village_index]['buildings']['resources']

    data = {
        'result' : 'Success',
        'newResources' : newResources
    }
    return JsonResponse(data)
