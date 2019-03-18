from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from .tasks import add_village
from .tasks import upgrade_building
from .upgradeMethods import getCurrentResource, updateSumAndLastInteractionDateOfResource, getRequiredTimeForUpgrade
from .initFirestore import get_db, get_auth
import time
import urllib.request
import urllib.error
import json
import os

import datetime
import pytz
import dateutil.parser


db = get_db()
auth = get_auth()
def myuser_login_required(f):
    def wrap(request, *args, **kwargs):
        #this check the session if userid key exist, if not it will redirect to login page
        if(not request.session['user']):
            messages.error(request,'Log in in order to continue.')
            return redirect('landingPage')
             
        return f(request, *args, **kwargs)
    wrap.__doc__=f.__doc__
    wrap.__name__=f.__name__
    return wrap
# Create your views here.

def landingPage(request):
    if('user' in request.session):
        if (request.session['user']):
            return redirect('myVillage')

    return render(request, 'beforeLogin/landingPage.html')

def registerPage(request):
    
    return render(request, 'beforeLogin/register.html')

def createAccount(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        auth.create_user_with_email_and_password(email, password)
        user = auth.sign_in_with_email_and_password(email, password)
        user_id = auth.current_user['localId']
        db.collection('players').document(user_id).set(***REMOVED***
            "clan": "",
            "regionSelected": False,
            "username": "userrrr"
        ***REMOVED***)
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
                
            request.session['user'] = user
            user_id = request.session['user']['localId']
            request.session['user_id'] = user_id
            userInfo = db.collection('players').document(user_id).get()._data
            # print(userInfo['regionSelected'])
            if userInfo['regionSelected'] is False :
                return redirect("selectRegion")
            
        except:
            messages.error(request,'Email or password is not correct.')
            return redirect("landingPage")
        

        return redirect(settings.LOGIN_REDIRECT_URL)
    return HttpResponse("why y r here")

def logout(request):
    # auth.current_user = None
    request.session['user'] = None
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
        villageInfo = ***REMOVED***
            "villageName" : "Yigidin Harman Oldugu Yer",
            "townCenter" : ***REMOVED***
                "level" : "1"
            ***REMOVED***,
            "barracks" : ***REMOVED***
                "level" : "0"
            ***REMOVED***,
            "stable" : ***REMOVED***
                "level" : "0"
            ***REMOVED***,
            "workshop" : ***REMOVED***
                "level" : "0"
            ***REMOVED***,
            "storage" : ***REMOVED***
                "level" : "1"
            ***REMOVED***,
            "farm" : ***REMOVED***
                "level" : "1"
            ***REMOVED***,
            "resources" : ***REMOVED***
                "woodCamp" : ***REMOVED***
                    "lastInteractionDate" : now,
                    "level" : "0",
                    "sum" : 0,
                ***REMOVED***,
                "ironMine" : ***REMOVED***
                    "lastInteractionDate" : now,
                    "level" : "0",
                    "sum" : 0,
                ***REMOVED***,
                "clayPit" : ***REMOVED***
                    "lastInteractionDate" : now,
                    "level" : "0",
                    "sum" : 0,
                ***REMOVED***
            ***REMOVED***,
            "troops" : ***REMOVED***
                "inVillage" : ***REMOVED***
                    "infantry" :  ***REMOVED***
                        "Spearman" : 0,
                        "Swordsman" : 0,
                        "Axeman" : 0,
                        "Archer" : 0
                    ***REMOVED***,
                    "cavalry" : ***REMOVED***
                        "Scout" : 0,
                        "Light Cavalry": 0,
                        "Heavy Cavalry" : 0
                    ***REMOVED***,
                    "siegeWeapons" : ***REMOVED***
                        "Ram" : 0,
                        "Catapult": 0
                    ***REMOVED***
                ***REMOVED***,
                "onMove" : [
                ],
                "total" : ***REMOVED***
                    "infantry" :  ***REMOVED***
                        "Spearman" : 0,
                        "Swordsman" : 0,
                        "Axeman" : 0,
                        "Archer" : 0
                    ***REMOVED***,
                    "cavalry" : ***REMOVED***
                        "Scout" : 0,
                        "Light Cavalry": 0,
                        "Heavy Cavalry" : 0
                    ***REMOVED***,
                    "siegeWeapons" : ***REMOVED***
                        "Ram" : 0,
                        "Catapult": 0
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
        db.collection('players').document(user_id).collection('villages').document(firstVillage._data['id']).set(villageInfo)
        db.collection('villages').document(firstVillage._data['id']).update(***REMOVED***'user_id': user_id***REMOVED***)
        db.collection('villages').document(firstVillage._data['id']).update(***REMOVED***'playerName':'Player Naaame'***REMOVED***)
        db.collection('villages').document(firstVillage._data['id']).update(***REMOVED***'villageName':'village Naaame'***REMOVED***)
        db.collection('players').document(user_id).update(***REMOVED***'regionSelected' : True***REMOVED***)
    return redirect('myVillage')

@myuser_login_required
def upgrade(request):
    if request.method == "POST":
        script_dir = os.path.dirname(__file__)
        file_path = os.path.join(script_dir, 'gameConfig.json')
        with open(file_path, 'r') as f:
            gameConfig = json.load(f)

        user_id = request.session['user']['localId']
        village_id = request.POST.get("village_id") #this should come from request
        building_path = request.POST.get("building_path") #this should also come from request
        firing_time = request.POST.get("firingTime")
        print(firing_time)

        village = db.collection('players').document(user_id).collection('villages').document(village_id).get().to_dict()
        #upgrade_levelTo = village[building_path]['level'] + 1
        if '.' in building_path : 
            # print(village['resources'],"kololo")
            upgrade_levelTo = str(int(village['resources'][building_path.split('.')[1]]['level']) + 1)
            required_clay = gameConfig['buildings']['resources'][building_path.split('.')[1]]['upgradingCosts'][upgrade_levelTo]['clay']
            required_iron = gameConfig['buildings']['resources'][building_path.split('.')[1]]['upgradingCosts'][upgrade_levelTo]['iron']
            required_wood = gameConfig['buildings']['resources'][building_path.split('.')[1]]['upgradingCosts'][upgrade_levelTo]['wood']
        else :
            upgrade_levelTo = str(int(village[building_path]['level']) + 1)
            required_clay = gameConfig['buildings'][building_path]['upgradingCosts'][upgrade_levelTo]['clay']
            required_iron = gameConfig['buildings'][building_path]['upgradingCosts'][upgrade_levelTo]['iron']
            required_wood = gameConfig['buildings'][building_path]['upgradingCosts'][upgrade_levelTo]['wood']
        #retrieve required resources from gameConfig.json with upgrade_level
        reqiured_time = getRequiredTimeForUpgrade(village, building_path, upgrade_levelTo)
        now = datetime.datetime.now(pytz.utc)
        wood_total = getCurrentResource(village, 'woodCamp', now)
        clay_total = getCurrentResource(village, 'clayPit', now)
        iron_total = getCurrentResource(village, 'ironMine', now)

        if(wood_total >= required_wood and iron_total >= required_iron and clay_total >= required_clay):
            #update sum and lastInteractionDate of resources (-cost)
            updateSumAndLastInteractionDateOfResource(request, village_id, 'woodCamp', wood_total-required_wood, now)
            updateSumAndLastInteractionDateOfResource(request, village_id, 'clayPit', clay_total-required_clay, now)
            updateSumAndLastInteractionDateOfResource(request, village_id, 'ironMine', iron_total-required_iron, now)

            upgrade_building.apply_async((user_id, village_id, building_path, upgrade_levelTo),countdown = reqiured_time)
            print("upgrading")
            return HttpResponse("Success")
        else:
            print("not enough resources")
            return HttpResponse("Fail")
        # return render(request, 'villages.html')

######## MAIN PAGES ########
@myuser_login_required
def villages(request, village_index=None):
    print(request.session['user'])
    print(auth.current_user)

    user_id = request.session['user']['localId']
    userInfo= db.collection('players').document(user_id).get()._data
    if userInfo['regionSelected'] is False :
        return redirect("selectRegion")
    

    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, 'gameConfig.json')
    with open(file_path, 'r') as f:
        gameConfig = json.load(f)
    #print(gameConfig)

    #add_village.apply_async((user_id,'6thSense', 'Murat Kekili'),countdown = 5)

    villages_ref = db.collection('players').document(user_id).collection('villages')
    villages = villages_ref.get()
    myVillages = []
    
    i = 0
    for village in villages:
        village._data['index'] = i 
        village._data['id'] = village.reference.id
        village._data['resources']['woodCamp']['lastInteractionDate'] = str(village._data['resources']['woodCamp']['lastInteractionDate'])
        village._data['resources']['ironMine']['lastInteractionDate'] = str(village._data['resources']['ironMine']['lastInteractionDate'])
        village._data['resources']['clayPit']['lastInteractionDate'] = str(village._data['resources']['clayPit']['lastInteractionDate'])
        myVillages.append(village._data)
        i += 1

        # db.collection('players').document(user_id).collection('villages').document(village._data['id']).update(
        #     ***REMOVED***
        #         "troops" : ***REMOVED***
        #             "inVillage" : ***REMOVED***
        #                 "infantry" :  ***REMOVED***
        #                     "Spearman" : 0,
        #                     "Swordsman" : 0,
        #                     "Axeman" : 0,
        #                     "Archer" : 0
        #                 ***REMOVED***,
        #                 "cavalry" : ***REMOVED***
        #                     "Scout" : 0,
        #                     "Light Cavalry": 0,
        #                     "Heavy Cavalry" : 0
        #                 ***REMOVED***,
        #                 "siegeWeapons" : ***REMOVED***
        #                     "Ram" : 0,
        #                     "Catapult": 0
        #                 ***REMOVED***
        #             ***REMOVED***,
        #             "onMove" : [
        #                 # ***REMOVED***
        #                 #     "from" : "fromVillageID",
        #                 #     "to" : "targetVillageID",
        #                 #     "movementType" : "Attack/Support",
        #                 #     "state" : "going/returning",
        #                 #     "arrivalTime" : "timestamp"
        #                 #     "troops": [
        #                 #         ***REMOVED***
        #                 #             "unitName" : "Spearman"
        #                 #             "unitType" : "Infantry",
        #                 #             "size" : 0
        #                 #         ***REMOVED***,
        #                 #         ***REMOVED***
        #                 #             "unitName" : "Swordsman",
        #                 #             "unitType" : "Infantry",
        #                 #             "size" : 0
        #                 #         ***REMOVED***
        #                 #     ]
        #                 # ***REMOVED***
        #             ],
        #             "total" : ***REMOVED***
        #                 "infantry" :  ***REMOVED***
        #                     "Spearman" : 40,
        #                     "Swordsman" : 0,
        #                     "Axeman" : 0,
        #                     "Archer" : 0
        #                 ***REMOVED***,
        #                 "cavalry" : ***REMOVED***
        #                     "Scout" : 0,
        #                     "Light Cavalry": 0,
        #                     "Heavy Cavalry" : 0
        #                 ***REMOVED***,
        #                 "siegeWeapons" : ***REMOVED***
        #                     "Ram" : 0,
        #                     "Catapult": 0
        #                 ***REMOVED***
        #             ***REMOVED***,
        #         ***REMOVED***
        #     ***REMOVED***
        # )

        # now = datetime.datetime.now()
        # db.collection('players').document(user_id).collection('villages').document(village._data['id']).update(
        #     ***REMOVED***
        #         "resources" : ***REMOVED***
        #             "woodCamp" : ***REMOVED***
        #                 "lastInteractionDate" : now,
        #                 "level" : "0",
        #                 "sum" : 0,
        #             ***REMOVED***,
        #             "ironMine" : ***REMOVED***
        #                 "lastInteractionDate" : now,
        #                 "level" : "0",
        #                 "sum" : 0,
        #             ***REMOVED***,
        #             "clayPit" : ***REMOVED***
        #                 "lastInteractionDate" : now,
        #                 "level" : "0",
        #                 "sum" : 0,
        #             ***REMOVED***
        #         ***REMOVED***
        #     ***REMOVED***
        # )

    if village_index is not None and i>=village_index:
        selected_village_index = int(village_index)
        request.session['selected_village_index'] = selected_village_index
    elif 'selected_village_index' in request.session and i>request.session['selected_village_index']:
        selected_village_index = request.session['selected_village_index']
    else: 
        selected_village_index = 0
        request.session['selected_village_index'] = 0
    print(selected_village_index)

    if village_index is not None and i <= village_index:
        request.session['selected_village_index'] = 0
        return redirect('myVillage')

    data = ***REMOVED*** 
        'villages_info' : myVillages,
        'selectedVillage': myVillages[selected_village_index],
        'gameConfig' : gameConfig,
        'page' : 'myVillages'
    ***REMOVED***
    return render(request, 'villages.html', ***REMOVED***'myVillages':myVillages, 'data' : data***REMOVED***)
@myuser_login_required
def map(request, village_index=None):

    user_id = request.session['user']['localId']
    userInfo= db.collection('players').document(user_id).get()._data
    if userInfo['regionSelected'] is False :
        return redirect("selectRegion")

   
    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, 'gameConfig.json')
    with open(file_path, 'r') as f:
        gameConfig = json.load(f)

    villages_ref = db.collection('players').document(user_id).collection('villages')
    villages = villages_ref.get()
    myVillages = []

    i = 0
    for village in villages:
        village._data['index'] = i 
        village._data['id'] = village.reference.id
        village._data['resources']['woodCamp']['lastInteractionDate'] = str(village._data['resources']['woodCamp']['lastInteractionDate'])
        village._data['resources']['ironMine']['lastInteractionDate'] = str(village._data['resources']['ironMine']['lastInteractionDate'])
        village._data['resources']['clayPit']['lastInteractionDate'] = str(village._data['resources']['clayPit']['lastInteractionDate'])
        myVillages.append(village._data)
        i += 1

    if village_index is not None and i>=village_index:
        selected_village_index = int(village_index)
        request.session['selected_village_index'] = selected_village_index
    elif 'selected_village_index' in request.session and i>request.session['selected_village_index']:
        selected_village_index = request.session['selected_village_index']
    else: 
        selected_village_index = 0
        request.session['selected_village_index'] = 0
    print(selected_village_index)

    public_villages_ref = db.collection('villages')
    publicVillages = public_villages_ref.get()
    publicVillagesInfo = []
    for village in publicVillages:
        if(village._data['user_id']!=''):
            village._data['village_id'] = village.reference.id
            if(village._data['user_id'] == user_id):
                village._data['owner'] = True
                for myVillage in myVillages:
                    if (village._data['village_id'] == myVillage['id']):
                        myVillage['coords'] = ***REMOVED***
                            'x' : village._data['coords']['x'],
                            'y' : village._data['coords']['y']
                        ***REMOVED***
            publicVillagesInfo.append(village._data)

    if village_index is not None and i <= village_index:
        request.session['selected_village_index'] = 0
        return redirect('map')

    data = ***REMOVED*** 
        'selectedVillage': myVillages[selected_village_index],
        'gameConfig' : gameConfig,
        'page' : 'map'
    ***REMOVED***

    return render(request, 'map.html', ***REMOVED***'publicVillages' : json.dumps(publicVillagesInfo), 'myVillages':myVillages, 'data' : data ***REMOVED***)
    
def clans(request):
    user_id = request.session['user']['localId']
    userInfo= db.collection('players').document(user_id).get()._data
    if userInfo['regionSelected'] is False :
        return redirect("selectRegion")

    return render(request, 'clans.html')

def reports(request):
    user_id = request.session['user']['localId']
    userInfo= db.collection('players').document(user_id).get()._data
    if userInfo['regionSelected'] is False :
        return redirect("selectRegion")

    return render(request, 'reports.html')
##########

######## BUILDING PAGES ######

def barracks(request, village_index=None):

    user_id = request.session['user']['localId']
    userInfo= db.collection('players').document(user_id).get()._data
    if userInfo['regionSelected'] is False :
        return redirect("selectRegion")

    user_id = request.session['user']['localId']
    userInfo= db.collection('players').document(user_id).get()._data
    if userInfo['regionSelected'] is False :
        return redirect("selectRegion")

   
    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, 'gameConfig.json')
    with open(file_path, 'r') as f:
        gameConfig = json.load(f)

    villages_ref = db.collection('players').document(user_id).collection('villages')
    villages = villages_ref.get()
    myVillages = []

    i = 0
    for village in villages:
        village._data['index'] = i 
        village._data['id'] = village.reference.id
        village._data['resources']['woodCamp']['lastInteractionDate'] = str(village._data['resources']['woodCamp']['lastInteractionDate'])
        village._data['resources']['ironMine']['lastInteractionDate'] = str(village._data['resources']['ironMine']['lastInteractionDate'])
        village._data['resources']['clayPit']['lastInteractionDate'] = str(village._data['resources']['clayPit']['lastInteractionDate'])
        myVillages.append(village._data)
        i += 1

    if village_index is not None and i>=village_index:
        selected_village_index = int(village_index)
        request.session['selected_village_index'] = selected_village_index
    elif 'selected_village_index' in request.session and i>request.session['selected_village_index']:
        selected_village_index = request.session['selected_village_index']
    else: 
        selected_village_index = 0
        request.session['selected_village_index'] = 0

    data = ***REMOVED*** 
        'selectedVillage': myVillages[selected_village_index],
        'gameConfig' : gameConfig,
        'page' : 'barracks'
    ***REMOVED***

    return render(request, 'barracks.html', ***REMOVED***'myVillages':myVillages, 'data' : data ***REMOVED***)
