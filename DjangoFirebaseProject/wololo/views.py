from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from .tasks import add_village
import time
import urllib.request
import urllib.error
import json

import datetime
import pyrebase

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
firebase_admin.initialize_app(cred, name='rroro')

db = firestore.client()

def myuser_login_required(f):
    def wrap(request, *args, **kwargs):
        #this check the session if userid key exist, if not it will redirect to login page
        if(auth.current_user):
            print("ababa")
        else:
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

    with open(r"C:\Users\3III's\Desktop\django-wololo\wololoDjango\DjangoFirebaseProject\wololo\gameConfig.json") as f:
        gameConfig = json.load(f)
    #print(gameConfig)

    #add_village.apply_async((user_id,'6thSense', 'Murat Kekili'),countdown = 5)

    for village in villages:
        village._data['id'] = village.reference.id
        village._data['resources']['wood']['lastInteractionDate'] = str(village._data['resources']['wood']['lastInteractionDate'])
        village._data['resources']['iron']['lastInteractionDate'] = str(village._data['resources']['iron']['lastInteractionDate'])
        village._data['resources']['clay']['lastInteractionDate'] = str(village._data['resources']['clay']['lastInteractionDate'])
        villages_info.append(village._data)
    #villages_info['gameConfig'] = gameConfig
    print(villages_info)
    data = ***REMOVED*** 
        'villages_info' : villages_info,
        'gameConfig' : gameConfig
    ***REMOVED***
    return render(request, 'villages.html', ***REMOVED***'data' : data***REMOVED***)
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