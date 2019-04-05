from .initFirestore import get_db
from .commonFunctions import getGameConfig
import os
import json
import pytz, datetime
from celery import current_app
from .upgradeMethods import updateSumAndLastInteractionDateOfResource

db = get_db()
gameConfig = getGameConfig()
class firebaseUser():

    refreshVillages = False #change this true to refresh villages to level 1

    def __init__(self, id):
        self.id = id
        self.initUser()

    def update(self):
        self.initUser()
        
    def initUser(self):
        villages = db.collection('players').document(self.id).collection('villages').get()
        myVillages = []
        numberOfVillages = 0
        for village in villages:
            import datetime
            now = datetime.datetime.now()
            if(self.refreshVillages):
                db.collection('players').document(self.id).collection('villages').document(village.reference.id).set(
                    {   
                        "villageName" : 'Village -' + str(numberOfVillages),
                        "buildings" : {
                            "townCenter" : {
                                "level" : "1",
                                "upgrading" : {
                                    "state": False,
                                    "time" : {
                                        "startedUpgradingAt" : now,
                                        "willBeUpgradedAt" : now 
                                    },
                                    "task_id" : ''
                                }
                            },
                            "barracks" : {
                                "level" : "0",
                                "upgrading" : {
                                    "state": False,
                                    "time" : {
                                        "startedUpgradingAt" : now,
                                        "willBeUpgradedAt" : now 
                                    },
                                    "task_id" : ''
                                }
                            },
                            "stable" : {
                                "level" : "0",
                                "upgrading" : {
                                    "state": False ,
                                    "time" : {
                                        "startedUpgradingAt" : now,
                                        "willBeUpgradedAt" : now 
                                    },
                                    "task_id" : ''
                                }
                            },
                            "workshop" : {
                                "level" : "0",
                                "upgrading" : {
                                    "state": False ,
                                    "time" : {
                                        "startedUpgradingAt" : now,
                                        "willBeUpgradedAt" : now 
                                    },
                                    "task_id" : ''
                                }
                            },
                            "storage" : {
                                "level" : "1",
                                "upgrading" : {
                                    "state": False ,
                                    "time" : {
                                        "startedUpgradingAt" : now,
                                        "willBeUpgradedAt" : now 
                                    },
                                    "task_id" : ''
                                }
                            },
                            "farm" : {
                                "level" : "1",
                                "upgrading" : {
                                    "state": False ,
                                    "time" : {
                                        "startedUpgradingAt" : now,
                                        "willBeUpgradedAt" : now 
                                    },
                                    "task_id" : ''
                                }
                            },
                            "resources" : {
                                "woodCamp" : {
                                    "lastInteractionDate" : now,
                                    "level" : "0",
                                    "sum" : 0,
                                    "upgrading" : {
                                        "state": False ,
                                        "time" : {
                                            "startedUpgradingAt" : now,
                                            "willBeUpgradedAt" : now 
                                        },
                                        "task_id" : ''
                                    }
                                },
                                "ironMine" : {
                                    "lastInteractionDate" : now,
                                    "level" : "0",
                                    "sum" : 0,
                                    "upgrading" : {
                                        "state": False ,
                                        "time" : {
                                            "startedUpgradingAt" : now,
                                            "willBeUpgradedAt" : now 
                                        },
                                        "task_id" : ''
                                    }
                                },
                                "clayPit" : {
                                    "lastInteractionDate" : now,
                                    "level" : "0",
                                    "sum" : 0,
                                    "upgrading" : {
                                        "state": False ,
                                        "time" : {
                                            "startedUpgradingAt" : now,
                                            "willBeUpgradedAt" : now 
                                        },
                                        "task_id" : ''
                                    }
                                }
                            }
                        },
                        "troops" : {
                            "inVillage" : {
                                "infantry" :  {
                                    "Spearman" : 0,
                                    "Swordsman" : 0,
                                    "Axeman" : 0,
                                    "Archer" : 0
                                },
                                "cavalry" : {
                                    "Scout" : 0,
                                    "Light Cavalry": 0,
                                    "Heavy Cavalry" : 0
                                },
                                "siegeWeapons" : {
                                    "Ram" : 0,
                                    "Catapult": 0
                                }
                            },
                            "onMove" : [
                                # {
                                #     "from" : "fromVillageID",
                                #     "to" : "targetVillageID",
                                #     "movementType" : "Attack/Support",
                                #     "state" : "going/returning",
                                #     "arrivalTime" : "timestamp"
                                #     "troops": [
                                #         {
                                #             "unitName" : "Spearman"
                                #             "unitType" : "Infantry",
                                #             "size" : 0
                                #         },
                                #         {
                                #             "unitName" : "Swordsman",
                                #             "unitType" : "Infantry",
                                #             "size" : 0
                                #         }
                                #     ]
                                # }
                            ],
                            "total" : {
                                "infantry" :  {
                                    "Spearman" : 40,
                                    "Swordsman" : 0,
                                    "Axeman" : 0,
                                    "Archer" : 0
                                },
                                "cavalry" : {
                                    "Scout" : 0,
                                    "Light Cavalry": 0,
                                    "Heavy Cavalry" : 0
                                },
                                "siegeWeapons" : {
                                    "Ram" : 0,
                                    "Catapult": 0
                                }
                            },
                        }
                    }
                )
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
        
            # print(village._data['buildings'])
                
            myVillages.append(village._data)
            numberOfVillages += 1

        self.myVillages = myVillages
        self.numberOfVillages = numberOfVillages
        self.regionSelected = db.collection('players').document(self.id).get()._data['regionSelected']

    def upgradeBuilding(self, village_id, building_path):
        village_ref = db.collection('players').document(self.id).collection('villages').document(village_id)
        village = village_ref.get().to_dict()
        if('.' in building_path):
            upgrade_level_to = str(int(village['buildings']['resources'][building_path.split('.')[1]]['level']) + 1)
        else:
            upgrade_level_to = str(int(village['buildings'][building_path]['level']) + 1)
        
        village_ref.update({
            'buildings.'+building_path+'.upgrading.state' : False,
            'buildings.'+building_path+'.level' : upgrade_level_to
        })

        if('.' in building_path):

            now = datetime.datetime.now(pytz.utc)
            newSum = self.getCurrentResource(village_id, building_path.split('.')[1])
           
            village_ref.update({
                'buildings.'+building_path+'.sum' : newSum,
                'buildings.'+building_path+'.lastInteractionDate' : now
            })
            print("sueccesfullll")

    def setUpgradingTimeAndState(self, village_id, building_path, reqiured_time, task_id, now):
        user_id = self.id
        village = db.collection('players').document(user_id).collection('villages').document(village_id)
        # now = datetime.datetime.now()
        # now = datetime.datetime.fromtimestamp(now)
        willEnd = now+datetime.timedelta(0, reqiured_time)
    
        village.update({
            'buildings.'+building_path+'.upgrading.time.startedUpgradingAt' : now,
            'buildings.'+building_path+'.upgrading.time.willBeUpgradedAt' : willEnd,
            'buildings.'+building_path+'.upgrading.state' : True,
            'buildings.'+building_path+'.upgrading.task_id' : task_id
        })


    def cancelUpgrading(self, village_id, building_path, now):
        task_id_to_revoke = self.getBuildingUpgradeTaskId(village_id, building_path)
        current_app.control.revoke(task_id_to_revoke)
        print("task is revoked")
        user_id = self.id
        village = db.collection('players').document(user_id).collection('villages').document(village_id)
        village.update({
            'buildings.'+building_path+'.upgrading.state' : False
        })
        
        
        capacity = gameConfig['buildings']['storage']['capacity'][str(self.getBuildingLevel(village_id, 'storage'))]

        oldWood = self.getCurrentResource(village_id, 'woodCamp')
        oldIron = self.getCurrentResource(village_id, 'ironMine')
        oldClay = self.getCurrentResource(village_id, 'clayPit')

        if '.' in building_path : 
            upgrade_levelTo = str(int(self.getBuildingLevel(village_id, building_path)) + 1)
            returned_clay = gameConfig['buildings']['resources'][building_path.split('.')[1]]['upgradingCosts'][upgrade_levelTo]['clay'] *20/100
            returned_iron = gameConfig['buildings']['resources'][building_path.split('.')[1]]['upgradingCosts'][upgrade_levelTo]['iron'] *20/100
            returned_wood = gameConfig['buildings']['resources'][building_path.split('.')[1]]['upgradingCosts'][upgrade_levelTo]['wood'] *20/100
        else :
            upgrade_levelTo = str(int(self.getBuildingLevel(village_id, building_path)) + 1)
            returned_clay = gameConfig['buildings'][building_path]['upgradingCosts'][upgrade_levelTo]['clay'] *20/100
            returned_iron = gameConfig['buildings'][building_path]['upgradingCosts'][upgrade_levelTo]['iron'] *20/100
            returned_wood = gameConfig['buildings'][building_path]['upgradingCosts'][upgrade_levelTo]['wood'] *20/100

        newWood = oldWood + returned_wood if oldWood + returned_wood < capacity else capacity
        newIron = oldIron + returned_iron if oldIron + returned_iron < capacity else capacity
        newClay = oldClay + returned_clay if oldClay + returned_clay < capacity else capacity
        #20% of cost


        updateSumAndLastInteractionDateOfResource(self.id, village_id, 'woodCamp', newWood, now)
        updateSumAndLastInteractionDateOfResource(self.id, village_id, 'ironMine', newIron, now)
        updateSumAndLastInteractionDateOfResource(self.id, village_id, 'clayPit', newClay, now)

    




    def getCurrentResource(self, village_id, resourceBuilding):

        now = datetime.datetime.now(pytz.utc)
        village = db.collection('players').document(self.id).collection('villages').document(village_id).get().to_dict()
        resourceSum = village['buildings']['resources'][resourceBuilding]['sum']
        resourceLevel = village['buildings']['resources'][resourceBuilding]['level']
        resourceLastInteractionDate = village['buildings']['resources'][resourceBuilding]['lastInteractionDate']
        hourlyProductionByLevel = gameConfig['buildings']['resources'][resourceBuilding]['hourlyProductionByLevel'][resourceLevel]
        totalHoursOfProduction = (now-resourceLastInteractionDate).total_seconds() / 60 / 60
        totalCurrentResource = (totalHoursOfProduction * hourlyProductionByLevel) + resourceSum
        if totalCurrentResource >= gameConfig['buildings']['storage']['capacity'][village['buildings']['storage']['level']]:
            totalCurrentResource = gameConfig['buildings']['storage']['capacity'][village['buildings']['storage']['level']]
        return int(totalCurrentResource)

    def getVillageById(self, village_id):
        for village in self.myVillages:
            if(village['id'] == village_id):
                return village
        
        return False


    def getBuildingLevel(self, village_id, building_path):
        villageDict = db.collection('players').document(self.id).collection('villages').document(village_id).get().to_dict()
        if('.' in building_path):
            return villageDict['buildings']['resources'][building_path.split('.')[1]]['level']
        else:
            return villageDict['buildings'][building_path]['level']

    
    def getBuildingUpgradeTaskId(self, village_id, building_path):
        villageDict = db.collection('players').document(self.id).collection('villages').document(village_id).get().to_dict()
        if('.' in building_path):
            return villageDict['buildings']['resources'][building_path.split('.')[1]]['upgrading']['task_id']
        else:
            return villageDict['buildings'][building_path]['upgrading']['task_id']
