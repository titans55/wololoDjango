import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
import datetime
import json
import os
import dateutil.parser
import pytz
import pyrebase
from .initFirestore import get_db
import datetime

db = get_db()


script_dir = os.path.dirname(__file__)
file_path = os.path.join(script_dir, 'gameConfig.json')
with open(file_path, 'r') as f:
    gameConfig = json.load(f)

def getCurrentResource(village, resourceBuilding, now):

    resourceSum = village['buildings']['resources'][resourceBuilding]['sum']
    resourceLevel = village['buildings']['resources'][resourceBuilding]['level']
    resourceLastInteractionDate = village['buildings']['resources'][resourceBuilding]['lastInteractionDate']
    hourlyProductionByLevel = gameConfig['buildings']['resources'][resourceBuilding]['hourlyProductionByLevel'][resourceLevel]
    totalHoursOfProduction = (now-resourceLastInteractionDate).total_seconds() / 60 / 60
    totalCurrentResource = (totalHoursOfProduction * hourlyProductionByLevel) + resourceSum
    if totalCurrentResource >= gameConfig['buildings']['storage']['capacity'][village['buildings']['storage']['level']]:
        totalCurrentResource = gameConfig['buildings']['storage']['capacity'][village['buildings']['storage']['level']]
    return int(totalCurrentResource)

def updateSumAndLastInteractionDateOfResource(request, village_id, resourceBuilding, newSum, now):
    user_id = request.session['userID']
    village = db.collection('players').document(user_id).collection('villages').document(village_id)
    village.update({
        'buildings.resources.'+resourceBuilding+'.sum' : newSum,
        'buildings.resources.'+resourceBuilding+'.lastInteractionDate' : now,
    })


    return True

def getRequiredTimeForUpgrade(village, building_path, upgrade_levelTo):
    
    if '.' in building_path :
        reqiured_time = gameConfig['buildings']['resources'][building_path.split('.')[1]]['upgradeTime'][upgrade_levelTo] 
    else:
        reqiured_time = gameConfig['buildings'][building_path]['upgradeTime'][upgrade_levelTo]

    speedPercantageOfTownCenter = gameConfig['buildings']['townCenter']['buildingSpeed'][str(village['townCenter']['level'])]
    reqiured_time = int(reqiured_time - (reqiured_time * speedPercantageOfTownCenter / 100 )) * 60 #seconds
    
    return reqiured_time

def setUpgradingTime(request, village_id, building_path, reqiured_time):
    user_id = request.session['userID']
    village = db.collection('players').document(user_id).collection('villages').document(village_id)
    now = datetime.datetime.now()
    willEnd = now+datetime.timedelta(0, reqiured_time)
    
    if '.' in building_path :
        village.update({
            'buildings.resources.'+building_path+'.upgrading.time.startedUpgradingAt' : now,
            'buildings.resources.'+building_path+'.upgrading.time.willBeUpgradedAt' : willEnd,
            'buildings.resources.'+building_path+'.upgrading.state' : True
        })
    else:
        village.update({
            'buildings.'+building_path+'.upgrading.time.startedUpgradingAt' : now,
            'buildings.'+building_path+'.upgrading.time.willBeUpgradedAt' : willEnd,
            'buildings.'+building_path+'.upgrading.state' : True
        })

def upgradingEnds(user_id, village_id, building_path):
    village = db.collection('players').document(user_id).collection('villages').document(village_id)

    if '.' in building_path :
        village.update({
            'buildings.resources.'+building_path+'.upgrading.state' : False
        })
    else:
        village.update({
            'buildings.'+building_path+'.upgrading.state' : False
        })