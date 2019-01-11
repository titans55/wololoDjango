from django.shortcuts import render
from django.http import HttpResponse
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
# Create your views here.

def landingPage(request):

    return render(request, 'beforeLogin/landingPage.html')

def register(request):
    if request.method == "POST":
        email=request.POST.get("email")
        password = request.POST.get("pass")

        user_add = auth.create_user_with_email_and_password(email, password)
        return render(request, 'game.html',***REMOVED***'email':email***REMOVED***)
    return render(request, 'beforeLogin/register.html')

def index(request):
    # now = datetime.datetime.now()
    # html = "<html><body>It is now %s.</body></html>" % now
    return render(request, 'layout.html')

def village(request):
    return render(request, 'village.html')

def map(request):
    # now = datetime.datetime.now()
    # html = "<html><body>It is now %s.</body></html>" % now

    return render(request, 'map.html')

def clans(request):

    return render(request, 'clans.html')