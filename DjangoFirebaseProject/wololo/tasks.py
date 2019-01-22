from celery import Celery
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
cred = credentials.Certificate(***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***)

firebase_admin.initialize_app(cred)
db = firestore.client()

app = Celery('tasks', broker='pyamqp://guest@localhost//',backend='amqp://guest@localhost//')

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
def upgrade_building(user_id, village_id, building_name, upgrade_level):
    village = db.collection('players').document(user_id).collection('villages').document(village_id)
    village.update(***REMOVED***
        building_name:***REMOVED***
            "level": upgrade_level
        ***REMOVED***
    ***REMOVED***)
    return True

