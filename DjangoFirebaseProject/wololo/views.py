from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from .tasks import add_village
from .tasks import schedule_upgrade_building, train_unit
from .helperFunctions import setSumAndLastInteractionDateOfResource, getRequiredTimeForUpgrade, getRequiredTimeForTrainUnits
from .initFirestore import get_db, get_auth
from .firebaseUser import firebaseUser
from .commonFunctions import getGameConfig, getVillageIndex
import time
import urllib.request
import urllib.error
import json
import os

import datetime
import pytz
import dateutil.parser
from celery import chain
import math

db = get_db()
auth = get_auth()
gameConfig = getGameConfig()

def myuser_login_required(f):
    def wrap(request, *args, **kwargs):
        #this check the session if userid key exist, if not it will redirect to login page
        if( 'loggedIn' not in request.session):
            messages.error(request,'Log in in order to continue.')
            return redirect('landingPage')
             
        return f(request, *args, **kwargs)
    wrap.__doc__=f.__doc__
    wrap.__name__=f.__name__
    return wrap
# Create your views here.

def landingPage(request):
    if('loggedIn' in request.session):
        if (request.session['loggedIn']):
            return redirect('myVillage')

    return render(request, 'beforeLogin/landingPage.html')

def registerPage(request):
    
    return render(request, 'beforeLogin/register.html')

def createAccount(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        username = request.POST.get("username")
        if email is '' or password is '' or username is '':
            messages.error(request, 'Please fill all the fields.')
            return redirect("registerPage")

        print(db.collection('players').get())
        
        import urllib.request as urllib2
        try: 
            auth.create_user_with_email_and_password(email, password)
        except urllib2.HTTPError as err:
            if err.code == 400:
                messages.error(request, 'That email is already registered.')
            else:
                raise
            return redirect("registerPage")


        for player in db.collection('players').get():
            userInfo = player._data
            print (userInfo['username'])
            if userInfo['username'] == username:
                messages.error(request, 'Username exists.')
                return redirect("registerPage")

        user = auth.sign_in_with_email_and_password(email, password)
        user_id = user['localId']
        db.collection('players').document(user_id).set({
            "clan": "",
            "regionSelected": False,
            "username": username
        })
        user = auth.refresh(user['refreshToken']) #now we have 1 hour expiry token
        auth.send_email_verification(user['idToken'])
        print(user)
        messages.error(request, 'Please verify your email.')
        return redirect("landingPage")

def verifyLogin(request):
    if request.method == 'POST':
        email=request.POST.get("email")
        password = request.POST.get("password")
        try:
            user = auth.sign_in_with_email_and_password(email, password)
            if auth.get_account_info(auth.current_user['idToken'])['users'][0]['emailVerified'] is False:
                messages.error(request,'Email is not verified.')
                # auth.send_email_verification(user['idToken'])
                return redirect("landingPage")
                
            request.session['userID'] = user['localId']
            request.session['loggedIn'] = True
            user = firebaseUser(request.session['userID'])
            print(user.regionSelected)
            if user.regionSelected == False :
                return redirect("selectRegion")
            
        except:
            messages.error(request,'Email or password is not correct.')
            return redirect("landingPage")
        
        return redirect(settings.LOGIN_REDIRECT_URL)
    return HttpResponse("why y r here")

def logout(request):
    del request.session['userID']
    del request.session['selected_village_index']
    del request.session['loggedIn']
    request.session.modified = True

    return redirect(settings.LANDING_PAGE_REDIRECT_URL)

@myuser_login_required
def selectRegionOnFirstLoginView(request):
    user_id = request.session['user']['localId']
    userInfo = db.collection('players').document(user_id).get()._data
    if userInfo['regionSelected'] is True :
        return redirect('myVillage')

    return render(request, "firstLogin/selectRegion.html")

@myuser_login_required
def selectingRegion(request):
    user_id = request.session['user']['localId']
    userInfo = db.collection('players').document(user_id).get()._data
    if userInfo['regionSelected'] is True :
        return redirect('myVillage')
    
    selectedRegion = request.POST.get("selectedRegion")
    if selectedRegion != '':
        print(selectedRegion)
        allVillages = db.collection('villages').get()
        emptyVillages = []
        for village in allVillages:
            if village._data['playerName'] == '' and village._data['region'] == selectedRegion:
                emptyVillages.append(village)
        import random
        firstVillage = random.choice(emptyVillages)
        print("selected")
        firstVillage._data['id'] = firstVillage.reference.id
        print(firstVillage._data['id'])
        now = datetime.datetime.now()
        villageInfo = {
            "villageName" : "Yigidin Harman Oldugu Yer",
            "townCenter" : {
                "level" : "1"
            },
            "barracks" : {
                "level" : "0"
            },
            "stable" : {
                "level" : "0"
            },
            "workshop" : {
                "level" : "0"
            },
            "storage" : {
                "level" : "1"
            },
            "farm" : {
                "level" : "1"
            },
            "resources" : {
                "woodCamp" : {
                    "lastInteractionDate" : now,
                    "level" : "0",
                    "sum" : 0,
                },
                "ironMine" : {
                    "lastInteractionDate" : now,
                    "level" : "0",
                    "sum" : 0,
                },
                "clayPit" : {
                    "lastInteractionDate" : now,
                    "level" : "0",
                    "sum" : 0,
                }
            },
            "troops" : {
                "inVillage" : {
                    "infantry" :  {
                        "Spearman" : 0,
                        "Swordsman" : 0,
                        "Axeman" : 0,
                        "Archer" : 0
                    },
                    "cavalry" : {
                        "Scout" : 0,
                        "Light Cavalry": 0,
                        "Heavy Cavalry" : 0
                    },
                    "siegeWeapons" : {
                        "Ram" : 0,
                        "Catapult": 0
                    }
                },
                "onMove" : [
                ],
                "total" : {
                    "infantry" :  {
                        "Spearman" : 0,
                        "Swordsman" : 0,
                        "Axeman" : 0,
                        "Archer" : 0
                    },
                    "cavalry" : {
                        "Scout" : 0,
                        "Light Cavalry": 0,
                        "Heavy Cavalry" : 0
                    },
                    "siegeWeapons" : {
                        "Ram" : 0,
                        "Catapult": 0
                    }
                }
            }
        }
        db.collection('players').document(user_id).collection('villages').document(firstVillage._data['id']).set(villageInfo)
        db.collection('villages').document(firstVillage._data['id']).update({'user_id': user_id})
        db.collection('villages').document(firstVillage._data['id']).update({'playerName':userInfo['username']})
        db.collection('villages').document(firstVillage._data['id']).update({'villageName':'Yigidin Harman Oldugu Yer'})
        db.collection('players').document(user_id).update({'regionSelected' : True})
    return redirect('myVillage')

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
        # return render(request, 'villages.html')
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

######## MAIN PAGES ########
@myuser_login_required
def villages(request, village_index=None):
    user_id = request.session['userID']
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
def map(request, village_index=None):

    user_id = request.session['userID']
    user = firebaseUser(user_id)

    selected_village_index = getVillageIndex(request, user, village_index)
    if(selected_village_index is 'outOfList'):
        return('barracks')

    public_villages_ref = db.collection('villages')
    publicVillages = public_villages_ref.get()
    publicVillagesInfo = []
    for village in publicVillages:
        if(village._data['user_id']!=''):
            village._data['village_id'] = village.reference.id
            if(village._data['user_id'] == user_id):
                village._data['owner'] = True
                for myVillage in user.myVillages:
                    if (village._data['village_id'] == myVillage['id']):
                        myVillage['coords'] = {
                            'x' : village._data['coords']['x'],
                            'y' : village._data['coords']['y']
                        }
            publicVillagesInfo.append(village._data)

    data = { 
        'selectedVillage': user.myVillages[selected_village_index],
        'gameConfig' : gameConfig,
        'page' : 'map'
    }

    return render(request, 'map.html', {'publicVillages' : json.dumps(publicVillagesInfo), 'myVillages':user.myVillages, 'data' : data })
@myuser_login_required    
def clans(request):
    user_id = request.session['userID']
    user = firebaseUser(user_id)
    if user.regionSelected is False :
        return redirect("selectRegion")

    return render(request, 'clans.html')
@myuser_login_required    
def reports(request):
    user_id = request.session['userID']
    user = firebaseUser(user_id)
    if user.regionSelected is False :
        return redirect("selectRegion")

    return render(request, 'reports.html')
##########

######## BUILDING PAGES ######
@myuser_login_required    
def barracks(request, village_index=None):

    user_id = request.session['userID']
    user = firebaseUser(user_id)
    selected_village_index = getVillageIndex(request, user, village_index)
    if(selected_village_index is 'outOfList'):
        return('barracks')

    # print (user.myVillages)
    data = { 
        'selectedVillage': user.myVillages[selected_village_index],
        'gameConfig' : gameConfig,
        'page' : 'barracks'
    }

    return render(request, 'buildingPages/barracks.html', {'myVillages':user.myVillages, 'data' : data })


@myuser_login_required
def trainUnits(request):
    now = datetime.datetime.now(pytz.utc)
    firing_time = request.POST.get("firingTime") #we should use this instead of now
    user_id = request.session['userID']
    user = firebaseUser(user_id)
    selected_village_index = getVillageIndex(request, user, None)  

    village_id = request.POST.get("village_id") 
    unit_type = request.POST.get("unitType") 
    unit_name = request.POST.get("unitName") 
    numberOfUnitsToTrain = int(request.POST.get("value"))


    #if we have resources
    if(user.weHaveResourcesToTrainUnit(village_id, unit_type, unit_name, numberOfUnitsToTrain)):

        village = db.collection('players').document(user_id).collection('villages').document(village_id).get().to_dict()
        reqiured_time = getRequiredTimeForTrainUnits(village, unit_type, unit_name)



        currentWood = user.getCurrentResource(village_id, 'woodCamp')
        currentIron = user.getCurrentResource(village_id, 'ironMine')
        currentClay = user.getCurrentResource(village_id, 'clayPit')

        reqiuredWood = gameConfig['units'][unit_type][unit_name]['Cost']['Wood'] * numberOfUnitsToTrain
        reqiuredIron = gameConfig['units'][unit_type][unit_name]['Cost']['Iron'] * numberOfUnitsToTrain
        reqiuredClay = gameConfig['units'][unit_type][unit_name]['Cost']['Clay'] * numberOfUnitsToTrain

        setSumAndLastInteractionDateOfResource(user_id, village_id, 'woodCamp', currentWood-reqiuredWood, now)
        setSumAndLastInteractionDateOfResource(user_id, village_id, 'clayPit', currentIron-reqiuredIron, now)
        setSumAndLastInteractionDateOfResource(user_id, village_id, 'ironMine', currentClay-reqiuredClay, now)
        # reqiured_time = 3 

        # user.setUnitstrainingTime(village_id, unit_type, unit_name, now, reqiured_time*numberOfUnitsToTrain)

        result = user.checkTrainingQueueReturnLastOneIfExists(village_id, unit_type)

        if(result == False):
            subtasks = []
            for i in range(numberOfUnitsToTrain):
                subtasks.append(
                    train_unit.si(user_id = user_id, village_id = village_id, unit_type = unit_type, unit_name = unit_name).set(countdown=reqiured_time)
                )
                
            workflow = chain(*subtasks)
            generatedChain = workflow.apply_async()
            chain_id = generatedChain.id
            user.addToTrainingQueue(village_id, chain_id, unit_type, unit_name, numberOfUnitsToTrain, now, reqiured_time*numberOfUnitsToTrain)
        else:
            willStartAt = result['willEndAt']
            print("i will wait in queue totally seconds = >")
            firstTaskDelayedCountdown = math.ceil(((result['willEndAt'] + datetime.timedelta(0, reqiured_time)) - now).total_seconds())
            print(firstTaskDelayedCountdown)

            subtasks = []
            for i in range(numberOfUnitsToTrain):
                if i == 0 :
                    subtasks.append(
                        train_unit.si(user_id = user_id, village_id = village_id, unit_type = unit_type, unit_name = unit_name).set(countdown=firstTaskDelayedCountdown)
                    )
                else:
                    subtasks.append(
                        train_unit.si(user_id = user_id, village_id = village_id, unit_type = unit_type, unit_name = unit_name).set(countdown=reqiured_time)
                    )
                
            workflow = chain(*subtasks)
            generatedChain = workflow.apply_async()
            chain_id = generatedChain.id
            user.addToTrainingQueue(village_id, chain_id, unit_type, unit_name, numberOfUnitsToTrain, willStartAt, reqiured_time*numberOfUnitsToTrain)

        print(datetime.datetime.now(pytz.utc))
        user.update()
        print(datetime.datetime.now(pytz.utc))
        newResources = user.myVillages[selected_village_index]['buildings']['resources']

        data = {
            'result' : 'Success',
            'newResources' : newResources
        }

        return JsonResponse(data)

    else:

        data = {
            "result" : 'Fail'
        }

        return JsonResponse(data)
