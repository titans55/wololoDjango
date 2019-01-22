from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from .tasks import add_village
from .tasks import upgrade_building
import time

import datetime
import pyrebase
import json

config = ***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
  ***REMOVED***
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
# Use a service account
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
firebase_admin.initialize_app(cred, name='wololo')

db = firestore.client()

def myuser_login_required(f):
    def wrap(request, *args, **kwargs):
        #this check the session if userid key exist, if not it will redirect to login page
        if(not auth.current_user):
            messages.error(request,'Log in in order to continue.')
            return render(request, 'beforeLogin/landingPage.html')
             
        return f(request, *args, **kwargs)
    wrap.__doc__=f.__doc__
    wrap.__name__=f.__name__
    return wrap
# Create your views here.

def landingPage(request):
    return render(request, 'beforeLogin/landingPage.html')

def registerPage(request):
    
    return render(request, 'beforeLogin/register.html')

def createAccount(request):
    if request.method == "POST":
        email=request.POST.get("email")
        password = request.POST.get("password")

        auth.create_user_with_email_and_password(email, password)
        return render(request, 'beforeLogin/landingPage.html')

def verifyLogin(request):
    if request.method == 'POST':
        email=request.POST.get("email")
        password = request.POST.get("password")
        try:
            auth.sign_in_with_email_and_password(email, password)
        except:
            messages.error(request,'Email or password is not correct.')
            return render(request, 'beforeLogin/landingPage.html')
        return redirect(settings.LOGIN_REDIRECT_URL)
    return HttpResponse("why y r here")

def logout(request):
    auth.current_user = None
    return redirect(settings.LANDING_PAGE_REDIRECT_URL)

@myuser_login_required
def villages(request):
    user_id = auth.current_user['localId']
    villages_ref = db.collection('players').document(user_id).collection('villages')
    villages = villages_ref.get()
    villages_info = []

    #add_village.apply_async((user_id,'6thSense', 'Murat Kekili'),countdown = 5)

    for village in villages:
        village._data['id'] = village.reference.id
        villages_info.append(village._data)
    return render(request, 'villages.html', ***REMOVED***'villages_info' : villages_info***REMOVED***)
@myuser_login_required
def map(request):
    villages_ref = db.collection('villages')
    villages = villages_ref.get()
    village_info = []
    for village in villages:
        if(village._data['user_id'] == auth.current_user['localId']):
            village._data['owner'] = True
        village_info.append(village._data)
    return render(request, 'map.html', ***REMOVED***'village_info' : json.dumps(village_info)***REMOVED***)
def clans(request):
    return render(request, 'clans.html')

@myuser_login_required
def upgrade(request):
    user_id = auth.current_user['localId']
    village_id = 'UVQQm7Xg6Zh6NMMfrxkB' #this should come from request
    building_name = 'townCenter' #this should also come from request

    village = db.collection('players').document(user_id).collection('villages').document(village_id).get().to_dict()
    upgrade_level = village[building_name]['level'] + 1
    #retrieve required resources from gameConfig.json with upgrade_level
    required_clay = 25
    required_iron = 25
    required_wood = 30
    reqiured_time = 5
    wood_sum = village['resources']['wood']['sum']
    iron_sum = village['resources']['iron']['sum']
    clay_sum = village['resources']['clay']['sum']
    if(wood_sum >= required_wood and iron_sum >= required_iron and clay_sum >= required_clay):
        upgrade_building.apply_async((user_id, village_id, building_name, upgrade_level),countdown = reqiured_time)
    else:
        messages.error(request,'Insufficent resources.')

    return render(request, 'villages.html')