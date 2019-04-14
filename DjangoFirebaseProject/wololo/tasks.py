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
from .helperFunctions import calculatePointsForVillage, getUserIdByVillageId
from wololo.commonFunctions import getGameConfig, getVillageIndex
from random import randint

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

db = get_db()
gameConfig = getGameConfig()

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

    calculatePointsForVillage(village_id) #put this into another task later
        
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

#battle occures in that function
@app.task(bind=True, name='wololo.tasks.attack')
def attack(self, attacker_village_id, defender_village_id, attacker_troops):
    defender_user = firebaseUser(getUserIdByVillageId(defender_village_id))
    defender_troops = defender_user.getAllInVallageUnits(defender_village_id)
    
    #calculation of attack_force#
    attack_force = 0
    cavalry_attack_force = 0
    total_attacker_other_units = 0
    total_attacker_cavalry_units = 0

    for unit_type_name, unit_type in attacker_troops.items():
        for unit_name, unit_quantity in unit_type.items():
            unit_quantity = int(unit_quantity)
            if(unit_type_name=='cavalry'):
                cavalry_attack_force += int(unit_quantity * gameConfig['units'][unit_type_name][unit_name]['Skills']['Attack'])
                total_attacker_cavalry_units += unit_quantity
            else:
                attack_force += int(unit_quantity * gameConfig['units'][unit_type_name][unit_name]['Skills']['Attack'])
                total_attacker_other_units += unit_quantity

    total_attacker_units = total_attacker_other_units + total_attacker_cavalry_units
    attacker_other_units_perc = 100 * float(total_attacker_other_units)/float(total_attacker_units)
    attacker_cavalry_units_perc = float(100) - attacker_other_units_perc

    #calculation of defend_force#
    defend_force = 0
    cavalry_defend_force = 0


    for unit_type_name, unit_type in defender_troops.items():
        for unit_name, unit_quantity in unit_type.items():
            unit_quantity = int(unit_quantity)
            defend_force += int((unit_quantity*(attacker_other_units_perc/100))*gameConfig['units'][unit_type_name][unit_name]['Skills']['Defence'])
            cavalry_defend_force += int((unit_quantity*(attacker_cavalry_units_perc/100))*gameConfig['units'][unit_type_name][unit_name]['Skills']['Cavalry Defence'])
    ##

    print(attacker_other_units_perc, "attacker_other_units_perc")
    print(attacker_cavalry_units_perc, "attacker_cavalry_units_perc")

    print(attack_force, " attack force")
    print(cavalry_attack_force, " cavalry attack force")

    print(defend_force, " defend force")
    print(cavalry_defend_force, " cavalry defend force")

    total_attack_force = attack_force + cavalry_attack_force
    total_defend_force = defend_force + cavalry_defend_force
    ## luck (for attacker)
    luck = randint(-25, 25)
    luck = 0
    print(luck, " luck")
    total_attack_force += int(total_attack_force*(luck/100.0))

    ## wall (do the same thing for defender)

    ##

    diff = total_attack_force - total_defend_force
    print(diff, " diff")
    if(diff>0):
        print("attacker won")
        casualty_rate = total_defend_force / total_attack_force
        print(casualty_rate, "casualty rate for attacker")
    elif(diff<0):
        print("defender won")
        casualty_rate = total_attack_force / total_defend_force
        print(casualty_rate, "casualty rate for defender")

    else:
        ##everyone dies
        print("nobody won wtf")

@app.task(bind=True, name='wololo.tasks.return_from_attack')
def return_from_attack(self, attacker_user_id, attacker_village_id, defender_user_id, defender_village_id, returning_attacker_troops):
    
    print('a')