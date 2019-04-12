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

def calculatePointsForVillage(village_id):

    public_village_ref = db.collection('villages').document(village_id)
    public_village = public_village_ref.get().to_dict()
    user_id = public_village['user_id']
    village = db.collection('players').document(user_id).collection('villages').document(village_id).get().to_dict()

    calculatedPoints = 0
    for buildingName, building in village['buildings'].items():
        if buildingName == 'resources':
            for resourceBuildingName, resourceBuilding in building.items():
                pointOfBuilding = gameConfig['buildings']['resources'][resourceBuildingName]['pointByLevel'][resourceBuilding['level']]
                calculatedPoints += pointOfBuilding
        else:
            pointOfBuilding = gameConfig['buildings'][buildingName]['pointByLevel'][building['level']]
            calculatedPoints += pointOfBuilding

    # calculatedPoints = 5

    public_village_ref.update({
        'points': calculatedPoints
    })
    calculatePointsForPlayer(user_id)

def calculatePointsForPlayer(user_id):
    player_ref = db.collection('players').document(user_id)
    villages_ref = db.collection('villages')
    playersVillagesGenerator = player_ref.collection('villages').get()
    calculatedPoints = 0
    for village in playersVillagesGenerator: 
        villagePoints = villages_ref.document(village.reference.id).get({'points'}).to_dict()['points']      
        calculatedPoints+=villagePoints
    player_ref.update({
        'points': calculatedPoints
    })
    
        
def getAllPlayers():

    players_ref = db.collection('players')
    players = []
    for player in players_ref.get(): 
        numberOfVillages = 0
        for village in players_ref.document(player.reference.id).collection('villages').get(): numberOfVillages += 1
        print(numberOfVillages, " wololo")
        playerDict = player.to_dict()
        playerDict['numberOfVillages'] = numberOfVillages
        playerDict['id'] = player.reference.id
        players.append(playerDict)


    players = sorted(players, key = lambda i: i['points'], reverse=True) 

    return players

def getPlayerInfo(player_id):
    players_ref = db.collection('players')
    villages_ref = db.collection('villages')
    playerInfo = players_ref.document(player_id).get().to_dict()
    playersVillages = []
    for village in villages_ref.get(): 
        village = village.to_dict()
        if(village['user_id'] == player_id): playersVillages.append(village)
    
    playerInfo['playersVillages'] = playersVillages
    playerInfo['id'] = player_id
    return playerInfo            