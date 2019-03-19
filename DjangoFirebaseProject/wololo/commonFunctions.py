import os
import json
from django.shortcuts import redirect

def getGameConfig():
    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, 'gameConfig.json')
    with open(file_path, 'r') as f:
        gameConfig = json.load(f)
    return gameConfig

def getVillageIndex(request, user, village_index):
    if village_index is not None and user.numberOfVillages>=village_index:
        selected_village_index = int(village_index)
        request.session['selected_village_index'] = selected_village_index
    elif 'selected_village_index' in request.session and user.numberOfVillages>request.session['selected_village_index']:
        selected_village_index = request.session['selected_village_index']
    else: 
        selected_village_index = 0
        request.session['selected_village_index'] = 0

    if village_index is not None and user.numberOfVillages <= village_index:
        request.session['selected_village_index'] = 0
        selected_village_index = 'outOfList'
    
    return selected_village_index