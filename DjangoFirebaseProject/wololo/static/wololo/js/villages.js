"use strict";
var village_id
var gameConfigsJSON = JSON.parse(($("#gameConfigData").attr("data")).replace(/'/g, '"'))
var villageDataJSON = JSON.parse(($("#villageDataJSON").attr("data")).replace(/'/g, '"'))

$(function()***REMOVED***

    village_id = villageDataJSON.id
    initVillage()
    initUpgradeButtons()

***REMOVED***)

function initVillage()***REMOVED***

    //console.log(villageDataJSON)
    //console.log(village_id)

    incrementOfResorcesByTime()
***REMOVED***

function incrementOfResorcesByTime()***REMOVED***
    //console.log(gameConfigsJSON.buildings.resources, villageDataJSON.resources)

    let woodDate = moment(villageDataJSON.resources.wood.lastInteractionDate).format()
    let ironDate = moment(villageDataJSON.resources.iron.lastInteractionDate).format()
    let clayDate = moment(villageDataJSON.resources.clay.lastInteractionDate).format()

    let storageCapacity = gameConfigsJSON.buildings.storage.capacity[villageDataJSON.storage.level]
    // console.log(woodDate)
    tick()
    setInterval(() => ***REMOVED***
        tick()
    ***REMOVED***,1000)

    function tick()***REMOVED***
        let now = moment(new Date())
        let woodHours = (now.diff(woodDate) / (1000 * 60 * 60))
        let ironHours = (now.diff(ironDate) / (1000 * 60 * 60))
        let clayHours = (now.diff(clayDate) / (1000 * 60 * 60))
        let currentWood =( gameConfigsJSON.buildings.resources.woodCamp.hourlyProductionByLevel[villageDataJSON.resources.wood.level]*woodHours).toFixed()
        currentWood = parseInt(currentWood) + parseInt(villageDataJSON.resources.wood.sum)
        checkCapacityAndWrite('#wood', currentWood, storageCapacity)

        let currentIron =( gameConfigsJSON.buildings.resources.ironMine.hourlyProductionByLevel[villageDataJSON.resources.iron.level]*ironHours).toFixed()
        currentIron = parseInt(currentIron) + parseInt(villageDataJSON.resources.iron.sum)
        checkCapacityAndWrite('#iron', currentIron, storageCapacity)

        let currentClay =( gameConfigsJSON.buildings.resources.clayPit.hourlyProductionByLevel[villageDataJSON.resources.clay.level]*clayHours).toFixed()
        currentClay = parseInt(currentClay) + parseInt(villageDataJSON.resources.clay.sum)
        checkCapacityAndWrite('#clay', currentClay, storageCapacity)
    ***REMOVED***

    $("#storage").html(gameConfigsJSON.buildings.storage.capacity[villageDataJSON.storage.level])
***REMOVED***

function checkCapacityAndWrite(resourceHtmlID, currentAmount, storageLimit)***REMOVED***

    if(currentAmount > storageLimit)***REMOVED***
        $(resourceHtmlID).html(storageLimit)
        if (!$(resourceHtmlID).hasClass("text-danger")) ***REMOVED***
            $(resourceHtmlID).addClass("text-danger");
        ***REMOVED***
    ***REMOVED***else***REMOVED***
        $(resourceHtmlID).html(currentAmount)
        if($(resourceHtmlID).hasClass("text-danger"))***REMOVED***
            $(resourceHtmlID).removeClass("text-danger")
        ***REMOVED***
    ***REMOVED***
***REMOVED***

function initUpgradeButtons()***REMOVED***

    $('.upgradeBuildings').each(function()***REMOVED***
        let buildingName = $(this).attr('id')
        let buildingLevel = String(parseInt(villageDataJSON[String(buildingName)].level) + 1)
        let neededResources = gameConfigsJSON.buildings[String(buildingName)].upgradingCosts[buildingLevel]
        $(this).find(".neededWood").html(neededResources.wood)
        $(this).find(".neededIron").html(neededResources.iron)
        $(this).find(".neededClay").html(neededResources.clay)
    ***REMOVED***)
    $('.upgradeResources').each(function()***REMOVED***
        let upgradingCostPerResource = $(this).attr('id')
        let buildingLevel = String(parseInt(villageDataJSON[String(buildingName)].level) + 1)
        let neededResources = gameConfigsJSON.resources[String(upgradingCostPerResource)][buildingLevel]
        $(this).find(".neededWood").html(neededResources.wood)
        $(this).find(".neededIron").html(neededResources.iron)
        $(this).find(".neededClay").html(neededResources.clay)
    ***REMOVED***)


    let csrftoken = getCookie('csrftoken');
    
    $(".upgrade").on('click', function()***REMOVED***
        let now = new Date()
        let building_path = $(this).attr('id')
        $.ajax(***REMOVED***
            type: 'POST',
            url: '/game/upgrade',
            data: ***REMOVED***
                building_path: building_path,
                village_id: village_id,
                firingTime: now,
                csrfmiddlewaretoken: csrftoken 
            ***REMOVED***,
            success:function(data)***REMOVED***

                if(data == 'Success')***REMOVED***
                    
                ***REMOVED***else if(data == 'Fail')***REMOVED***
                    // alert("Fail")
                    console.log("WOLOLO")
                    $('#insufficentResources').modal('show')
                ***REMOVED***
    
            ***REMOVED***
        ***REMOVED***)
    ***REMOVED***);
***REMOVED***

function getCookie(name) ***REMOVED***
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') ***REMOVED***
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) ***REMOVED***
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) ***REMOVED***
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
    return cookieValue;
***REMOVED***