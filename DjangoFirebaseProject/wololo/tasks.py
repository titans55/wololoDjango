from __future__ import absolute_import, unicode_literals
from celery import Celery
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
import datetime
import json
import os
from .initFirestore import get_db
from .upgradeMethods import getCurrentResource
import pytz
from django.conf import settings

db = get_db()
script_dir = os.path.dirname(__file__)
file_path = os.path.join(script_dir, 'gameConfig.json')

# set the default Django settings module for the 'celery' program.

app = Celery('tasks', broker='pyamqp://guest@localhost//',backend='amqp://guest@localhost//')

# Load task modules from all registered Django app configs.

@app.task(name='wololo.tasks.add_village')
def add_village(user_id, user_name, village_name):
    village = ***REMOVED***
        "coords":***REMOVED***
            "x": 123,
            "y": 200
        ***REMOVED***,
        "playerName": user_name,
        "user_id": user_id,
        "villageName": village_name
    ***REMOVED***
    db.collection("villages").add(village)
    return True

@app.task(name='wololo.tasks.upgrade_building')
def upgrade_building(user_id, village_id, building_path, upgrade_level):
    village = db.collection('players').document(user_id).collection('villages').document(village_id)
    villageDict = db.collection('players').document(user_id).collection('villages').document(village_id).get().to_dict()
    print(villageDict)
    # print(building_path.split('.')[1],"tasdsada")
    if '.' in villageDict :
        now = datetime.datetime.now(pytz.utc)
        newSum = getCurrentResource(villageDict, building_path.split('.')[1], now)
        print("readyyty")

        village.update(***REMOVED***
            building_path+'.sum' : newSum,
            building_path+'.lastInteractionDate' : now,
            building_path+'.level' : upgrade_level
        ***REMOVED***)
        print("sueccesfullll")
    else:
        village.update(***REMOVED***
            building_path+'.level' : upgrade_level
        ***REMOVED***)
    
    return True

