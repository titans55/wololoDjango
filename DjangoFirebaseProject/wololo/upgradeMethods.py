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

db = get_db()


script_dir = os.path.dirname(__file__)
file_path = os.path.join(script_dir, 'gameConfig.json')
with open(file_path, 'r') as f:
    gameConfig = json.load(f)

def getCurrentResource(village, resourceBuilding, now):

    resourceSum = village['resources'][resourceBuilding]['sum']
    resourceLevel = village['resources'][resourceBuilding]['level']
    resourceLastInteractionDate = village['resources'][resourceBuilding]['lastInteractionDate']
    hourlyProductionByLevel = gameConfig['buildings']['resources'][resourceBuilding]['hourlyProductionByLevel'][resourceLevel]
    totalHoursOfProduction = (now-resourceLastInteractionDate).total_seconds() / 60 / 60
    totalCurrentResource = (totalHoursOfProduction * hourlyProductionByLevel) + resourceSum
    if totalCurrentResource >= gameConfig['buildings']['storage']['capacity'][village['storage']['level']]:
        totalCurrentResource = gameConfig['buildings']['storage']['capacity'][village['storage']['level']]
    return int(totalCurrentResource)

def updateSumAndLastInteractionDateOfResource(request, village_id, resourceBuilding, newSum, now):
    user_id = request.session['user_id']
    village = db.collection('players').document(user_id).collection('villages').document(village_id)
    village.update(***REMOVED***
        'resources.'+resourceBuilding+'.sum' : newSum,
        'resources.'+resourceBuilding+'.lastInteractionDate' : now,
    ***REMOVED***)


    return True