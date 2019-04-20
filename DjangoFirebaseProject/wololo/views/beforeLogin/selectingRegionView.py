from django.shortcuts import render, redirect
from django.http import JsonResponse
from wololo.initFirestore import get_db, get_auth
from wololo.firebaseUser import firebaseUser
from wololo.commonFunctions import getGameConfig
import urllib.request
import urllib.error

import datetime

from wololo.views.auth import myuser_login_required


db = get_db()
auth = get_auth()
gameConfig = getGameConfig()


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
                "onMove" :{

                },
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
                },
                "totalIncomingStrangetTroops": {

                },
            }
        }
        db.collection('players').document(user_id).collection('villages').document(firstVillage._data['id']).set(villageInfo)
        db.collection('villages').document(firstVillage._data['id']).update({'user_id': user_id})
        db.collection('villages').document(firstVillage._data['id']).update({'playerName':userInfo['username']})
        db.collection('villages').document(firstVillage._data['id']).update({'villageName':'Yigidin Harman Oldugu Yer'})
        db.collection('players').document(user_id).update({'regionSelected' : True})
    return redirect('myVillage')