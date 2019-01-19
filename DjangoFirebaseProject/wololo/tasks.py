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

app = Celery('tasks', broker='pyamqp://guest@localhost//',backend='amqp://guest@localhost//')

@app.task(name='wololo.tasks.add_village')
def add_village(user_id, user_name, village_name):
    db = firestore.client()
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
