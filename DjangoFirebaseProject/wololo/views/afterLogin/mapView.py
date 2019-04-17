from django.conf import settings
from django.shortcuts import render, redirect
from django.http import JsonResponse
from wololo.initFirestore import get_db, get_auth
from wololo.firebaseUser import firebaseUser
from wololo.commonFunctions import getGameConfig, getVillageIndex
import urllib.request
import urllib.error
import json

from wololo.views.auth import myuser_login_required


db = get_db()
auth = get_auth()
gameConfig = getGameConfig()

@myuser_login_required
def map(request, village_index=None):

    user_id = request.session['userID']
    user = firebaseUser(user_id)

    selected_village_index = getVillageIndex(request, user, village_index)
    if(selected_village_index == 'outOfList'):
        return redirect('map')

    public_villages_ref = db.collection('villages')
    publicVillages = public_villages_ref.get()
    publicVillagesInfo = []
    for village in publicVillages:
        if(village._data['user_id']!=''):
            village._data['village_id'] = village.reference.id
            if(village._data['user_id'] == user_id):
                village._data['owner'] = True
                for myVillage in user.myVillages:
                    if (village._data['village_id'] == myVillage['id']):
                        myVillage['coords'] = {
                            'x' : village._data['coords']['x'],
                            'y' : village._data['coords']['y']
                        }
            publicVillagesInfo.append(village._data)

    data = { 
        'selectedVillage': user.myVillages[selected_village_index],
        'gameConfig' : gameConfig,
        'unviewedReportExists' : user.unviewedReportExists,
        'page' : 'map'
    }

    return render(request, 'map.html', {'publicVillages' : json.dumps(publicVillagesInfo), 'myVillages':user.myVillages, 'data' : data })
