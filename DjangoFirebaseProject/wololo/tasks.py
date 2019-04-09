from __future__ import absolute_import, unicode_literals
from celery import Celery
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
import datetime
import json
import os
from .initFirestore import get_db
import pytz
from DjangoFirebaseProject import settings
from .firebaseUser import firebaseUser

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

db = get_db()
script_dir = os.path.dirname(__file__)
file_path = os.path.join(script_dir, 'gameConfig.json')

# set the default Django settings module for the 'celery' program.

app = Celery('tasks', broker='pyamqp://guest@localhost//',backend='amqp://guest@localhost//')

# Load task modules from all registered Django app configs.

@app.task(name='wololo.tasks.add_village')
def add_village(user_id, user_name, village_name):
    village = {
        "coords":{
            "x": 123,
            "y": 200
        },
        "playerName": user_name,
        "user_id": user_id,
        "villageName": village_name
    }
    db.collection("villages").add(village)
    return True


import urllib.request

@app.task(name='wololo.tasks.upgrade_building')
def schedule_upgrade_building(user_id, village_id, building_path, upgrade_level):
    os.environ['DJANGO_SETTINGS_MODULE'] = 'DjangoFirebaseProject.settings'
    channel_layer = get_channel_layer()

    user = firebaseUser(user_id)
    user.upgradeBuilding(village_id, building_path)

   
    
    user.update()

    village = user.getVillageById(village_id)
    newBuildings = village['buildings']
    notifyData = {
        'messageType': 'upgradeBuilding',
        'target': building_path,
        'newBuildings' : newBuildings,
        'village_id' : village_id
    }    

    async_to_sync ( channel_layer. group_send ) (
        user_id , { "type" : "notify.user" , "json" : notifyData }
    )
        
    return True

@app.task(bind=True, name='wololo.tasks.train_unit')
def train_unit(self, user_id, village_id, unit_type, unit_name):
    
    user = firebaseUser(user_id)
    if user.getUnitsLeft(village_id, unit_type, unit_name) == 0: ##if unitsLeft is 0 
        print("cancelled unit")
        self.request.chain = None #For cancelling training units
    else :
        os.environ['DJANGO_SETTINGS_MODULE'] = 'DjangoFirebaseProject.settings'
        channel_layer = get_channel_layer()
        
        user.trainUnit(village_id, unit_type, unit_name)

        notifyData = {
            'messageType': 'trainUnit',
            'unit_name': unit_name,
            'village_id' : village_id
        }    

        async_to_sync ( channel_layer. group_send ) (
            user_id , { "type" : "notify.user" , "json" : notifyData }
        )