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


def setSumAndLastInteractionDateOfResource(user_id, village_id, resourceBuilding, newSum, now):
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

    speedPercantageOfTownCenter = gameConfig['buildings']['townCenter']['buildingSpeed'][str(village['buildings']['townCenter']['level'])]
    reqiured_time = int(reqiured_time - (reqiured_time * speedPercantageOfTownCenter / 100 )) * 60 #seconds
    
    return reqiured_time


def getRequiredTimeForTrainUnits(village, unitType, unitName):

    reqiured_time = gameConfig['units'][unitType][unitName]['neededTrainingBaseTime']
    speedPercantageOfBarracks = gameConfig['buildings']['barracks']['trainingSpeed'][str(village['buildings']['barracks']['level'])]
    reqiured_time = int(reqiured_time - (reqiured_time * speedPercantageOfBarracks / 100 )) * 60 #seconds
    
    return reqiured_time
