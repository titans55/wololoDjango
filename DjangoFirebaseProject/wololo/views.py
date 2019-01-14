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

def myuser_login_required(f):
    def wrap(request, *args, **kwargs):
        #this check the session if userid key exist, if not it will redirect to login page
        if(auth.current_user):
            print("ababa")
        else:
            message="invalid credentials"
            messages.error(request,'Email or password is not correct.')
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

        user_add = auth.create_user_with_email_and_password(email, password)
        return render(request, 'beforeLogin/landingPage.html')

def verifyLogin(request):
    if request.method == 'POST':
        email=request.POST.get("email")
        password = request.POST.get("password")
        try:
            user = auth.sign_in_with_email_and_password(email, password)
            print (user)
        except:
            message="invalid credentials"
            messages.error(request,'Email or password is not correct.')
            return render(request, 'beforeLogin/landingPage.html')
        return redirect(settings.LOGIN_REDIRECT_URL)
    return HttpResponse("why y r here")

def logout(request):
    # print(auth)
    print(vars(auth))
    auth.signOut()
    return redirect(settings.LANDING_PAGE_REDIRECT_URL)

def village(request):

    return render(request, 'village.html')
    
@myuser_login_required
def map(request):
    print(auth.current_user['localId'])
    users_ref = db.collection(u'villages')
    villages = users_ref.get()
    village_info = []
    for village in villages:
        village_info.append(village._data)

    return render(request, 'map.html', ***REMOVED***'village_info' : json.dumps(village_info)***REMOVED***)
def clans(request):

    return render(request, 'clans.html')