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
from DjangoFirebaseProject import settings

from asgiref.sync import async_to_sync

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



@app.task(name='wololo.tasks.upgrade_building')
def upgrade_building(user_id, village_id, building_path, upgrade_level):
    village = db.collection('players').document(user_id).collection('villages').document(village_id)
    villageDict = db.collection('players').document(user_id).collection('villages').document(village_id).get().to_dict()
    # print(villageDict)
    # print(building_path.split('.')[1],"tasdsada")
  
    os.environ['DJANGO_SETTINGS_MODULE'] = 'DjangoFirebaseProject.settings'

    from channels.layers import get_channel_layer
    channel_layer = get_channel_layer()
    print(channel_layer, "wololo")
   
    async_to_sync ( channel_layer. group_send ) (
        user_id , { "type" : "notify.user" , "text" : 'selamalaeyys' }
    )
    
    # if '.' in villageDict :
    #     now = datetime.datetime.now(pytz.utc)
    #     newSum = getCurrentResource(villageDict, building_path.split('.')[1], now)
    #     print("readyyty")

    #     village.update({
    #         building_path+'.sum' : newSum,
    #         building_path+'.lastInteractionDate' : now,
    #         building_path+'.level' : upgrade_level
    #     })
    #     print("sueccesfullll")
        
        

    # else:
    #     village.update({
    #         building_path+'.level' : upgrade_level
    #     })

        
    
    return True

