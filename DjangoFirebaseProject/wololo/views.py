from django.shortcuts import render
from django.http import HttpResponse
import datetime

# Create your views here.
def index(request):
    # now = datetime.datetime.now()
    # html = "<html><body>It is now %s.</body></html>" % now
    return render(request, 'layout.html')
def game(request):
    # now = datetime.datetime.now()
    # html = "<html><body>It is now %s.</body></html>" % now
    return render(request, 'game.html')