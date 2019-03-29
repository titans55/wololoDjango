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
            # import datetime
            # now = datetime.datetime.now()
            # db.collection('players').document(self.id).collection('villages').document(village.reference.id).set(
            #     {   
            #         "villageName" : 'Village -' + str(numberOfVillages),
            #         "buildings" : {
            #             "townCenter" : {
            #                 "level" : "1",
            #                 "upgrading" : {
            #                     "state": True,
            #                     "time" : {
            #                         "startedUpgradingAt" : now,
            #                         "willBeUpgradedAt" : now 
            #                     }
            #                 }
            #             },
            #             "barracks" : {
            #                 "level" : "0",
            #                 "upgrading" : {
            #                     "state": False,
            #                     "time" : {
            #                         "startedUpgradingAt" : now,
            #                         "willBeUpgradedAt" : now 
            #                     }
            #                 }
            #             },
            #             "stable" : {
            #                 "level" : "0",
            #                 "upgrading" : {
            #                     "state": False ,
            #                     "time" : {
            #                         "startedUpgradingAt" : now,
            #                         "willBeUpgradedAt" : now 
            #                     }
            #                 }
            #             },
            #             "workshop" : {
            #                 "level" : "0",
            #                 "upgrading" : {
            #                     "state": False ,
            #                     "time" : {
            #                         "startedUpgradingAt" : now,
            #                         "willBeUpgradedAt" : now 
            #                     }
            #                 }
            #             },
            #             "storage" : {
            #                 "level" : "1",
            #                 "upgrading" : {
            #                     "state": False ,
            #                     "time" : {
            #                         "startedUpgradingAt" : now,
            #                         "willBeUpgradedAt" : now 
            #                     }
            #                 }
            #             },
            #             "farm" : {
            #                 "level" : "1",
            #                 "upgrading" : {
            #                     "state": False ,
            #                     "time" : {
            #                         "startedUpgradingAt" : now,
            #                         "willBeUpgradedAt" : now 
            #                     }
            #                 }
            #             },
            #             "resources" : {
            #                 "woodCamp" : {
            #                     "lastInteractionDate" : now,
            #                     "level" : "0",
            #                     "sum" : 0,
            #                     "upgrading" : {
            #                         "state": False ,
            #                         "time" : {
            #                             "startedUpgradingAt" : now,
            #                             "willBeUpgradedAt" : now 
            #                         }
            #                     }
            #                 },
            #                 "ironMine" : {
            #                     "lastInteractionDate" : now,
            #                     "level" : "0",
            #                     "sum" : 0,
            #                     "upgrading" : {
            #                         "state": False ,
            #                         "time" : {
            #                             "startedUpgradingAt" : now,
            #                             "willBeUpgradedAt" : now 
            #                         }
            #                     }
            #                 },
            #                 "clayPit" : {
            #                     "lastInteractionDate" : now,
            #                     "level" : "0",
            #                     "sum" : 0,
            #                     "upgrading" : {
            #                         "state": False ,
            #                         "time" : {
            #                             "startedUpgradingAt" : now,
            #                             "willBeUpgradedAt" : now 
            #                         }
            #                     }
            #                 }
            #             }
            #         },
            #         "troops" : {
            #             "inVillage" : {
            #                 "infantry" :  {
            #                     "Spearman" : 0,
            #                     "Swordsman" : 0,
            #                     "Axeman" : 0,
            #                     "Archer" : 0
            #                 },
            #                 "cavalry" : {
            #                     "Scout" : 0,
            #                     "Light Cavalry": 0,
            #                     "Heavy Cavalry" : 0
            #                 },
            #                 "siegeWeapons" : {
            #                     "Ram" : 0,
            #                     "Catapult": 0
            #                 }
            #             },
            #             "onMove" : [
            #                 # {
            #                 #     "from" : "fromVillageID",
            #                 #     "to" : "targetVillageID",
            #                 #     "movementType" : "Attack/Support",
            #                 #     "state" : "going/returning",
            #                 #     "arrivalTime" : "timestamp"
            #                 #     "troops": [
            #                 #         {
            #                 #             "unitName" : "Spearman"
            #                 #             "unitType" : "Infantry",
            #                 #             "size" : 0
            #                 #         },
            #                 #         {
            #                 #             "unitName" : "Swordsman",
            #                 #             "unitType" : "Infantry",
            #                 #             "size" : 0
            #                 #         }
            #                 #     ]
            #                 # }
            #             ],
            #             "total" : {
            #                 "infantry" :  {
            #                     "Spearman" : 40,
            #                     "Swordsman" : 0,
            #                     "Axeman" : 0,
            #                     "Archer" : 0
            #                 },
            #                 "cavalry" : {
            #                     "Scout" : 0,
            #                     "Light Cavalry": 0,
            #                     "Heavy Cavalry" : 0
            #                 },
            #                 "siegeWeapons" : {
            #                     "Ram" : 0,
            #                     "Catapult": 0
            #                 }
            #             },
            #         }
            #     }
            # )

            # print(village)
            village._data['index'] = numberOfVillages 
            village._data['id'] = village.reference.id
            village._data['buildings']['resources']['woodCamp']['lastInteractionDate'] = str(village._data['buildings']['resources']['woodCamp']['lastInteractionDate'])
            village._data['buildings']['resources']['ironMine']['lastInteractionDate'] = str(village._data['buildings']['resources']['ironMine']['lastInteractionDate'])
            village._data['buildings']['resources']['clayPit']['lastInteractionDate'] = str(village._data['buildings']['resources']['clayPit']['lastInteractionDate'])

            for buildingName, building in village._data['buildings'].items():
                if buildingName == 'resources': 
                    for resource in building:
                        if(village._data['buildings']['resources'][resource]['upgrading']['state']):
                            state = 'true'
                        else:
                            state = 'false'
                        village._data['buildings']['resources'][resource]['upgrading']['state'] = state
                        village._data['buildings']['resources'][resource]['upgrading']['time']['startedUpgradingAt'] = str(village._data['buildings']['resources'][resource]['upgrading']['time']['startedUpgradingAt'])
                        village._data['buildings']['resources'][resource]['upgrading']['time']['willBeUpgradedAt'] = str(village._data['buildings']['resources'][resource]['upgrading']['time']['willBeUpgradedAt'])
                else :
                    if(village._data['buildings'][buildingName]['upgrading']['state']):
                        state = 'true'
                    else:
                        state = 'false'
                    village._data['buildings'][buildingName]['upgrading']['state'] = state
                    village._data['buildings'][buildingName]['upgrading']['time']['startedUpgradingAt'] = str(village._data['buildings'][buildingName]['upgrading']['time']['startedUpgradingAt'])
                    village._data['buildings'][buildingName]['upgrading']['time']['willBeUpgradedAt'] = str(village._data['buildings'][buildingName]['upgrading']['time']['willBeUpgradedAt'])

            temp = village._data['buildings']
            village._data['buildings'] = {}
            for building in gameConfig['buildings'].keys():
                if building == 'resources':
                    resources = {}
                    for resourceBuilding in gameConfig['buildings']['resources'].keys():
                        resources[resourceBuilding] = temp['resources'][resourceBuilding]
                    village._data['buildings']['resources'] = resources
                else: 
                    village._data['buildings'][building] = temp[building]
        
            print(village._data['buildings'])
                
            myVillages.append(village._data)
            numberOfVillages += 1

        self.myVillages = myVillages
        self.numberOfVillages = numberOfVillages
        self.regionSelected = db.collection('players').document(self.id).get()._data['regionSelected']