from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

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
firebase_admin.initialize_app(cred)

db = firestore.client()
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
        

def villages(request):
    villages_ref = db.collection('players').document(auth.current_user['localId']).collection('villages')
    villages = villages_ref.get()
    villages_info = []

    for village in villages:
        village._data['id'] = village.reference.id
        villages_info.append(village._data)
    return render(request, 'villages.html', ***REMOVED***'villages_info' : villages_info***REMOVED***)

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