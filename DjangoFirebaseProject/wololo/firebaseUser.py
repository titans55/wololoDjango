from .initFirestore import get_db
from .commonFunctions import getGameConfig
import os
import json

db = get_db()
gameConfig = getGameConfig()
class firebaseUser():
    def __init__(self, id):
        self.id = id
        villages_ref = db.collection('players').document(self.id).collection('villages')
        villages = villages_ref.get()
        myVillages = []
        numberOfVillages = 0
        for village in villages:
            village._data['index'] = numberOfVillages 
            village._data['id'] = village.reference.id
            village._data['resources']['woodCamp']['lastInteractionDate'] = str(village._data['resources']['woodCamp']['lastInteractionDate'])
            village._data['resources']['ironMine']['lastInteractionDate'] = str(village._data['resources']['ironMine']['lastInteractionDate'])
            village._data['resources']['clayPit']['lastInteractionDate'] = str(village._data['resources']['clayPit']['lastInteractionDate'])
            myVillages.append(village._data)
            numberOfVillages += 1

        self.myVillages = myVillages
        self.numberOfVillages = numberOfVillages
        self.regionSelected = db.collection('players').document(self.id).get()._data['regionSelected']
