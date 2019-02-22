"use strict";
var village_id
var gameConfigs = JSON.parse(($("#gameConfigData").attr("data")).replace(/'/g, '"'))
var villageData = JSON.parse(($("#villageDataJSON").attr("data")).replace(/'/g, '"'))
$(function()***REMOVED***
    // data = JSON.parse(data.replace(/'/g, '"'))
    village_id = villageData.id
    initVillage()
    console.log(villageData)
***REMOVED***)

function initVillage()***REMOVED***
    incrementOfResorcesByTime()
    initUpgradeButtons()
    displayNeededResourcesAndTimeForUpgrading()
***REMOVED***

function incrementOfResorcesByTime()***REMOVED***
    //console.log(gameConfigs.buildings.resources, villageData.resources)

    let woodDate = moment(villageData.resources.wood.lastInteractionDate).format()
    let ironDate = moment(villageData.resources.iron.lastInteractionDate).format()
    let clayDate = moment(villageData.resources.clay.lastInteractionDate).format()

    let storageCapacity = gameConfigs.buildings.storage.capacity[villageData.storage.level]
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
        let currentWood =( gameConfigs.buildings.resources.woodCamp.hourlyProductionByLevel[villageData.resources.wood.level]*woodHours).toFixed()
        currentWood = parseInt(currentWood) + parseInt(villageData.resources.wood.sum)
        checkCapacityAndWrite('#wood', currentWood, storageCapacity)

        let currentIron =( gameConfigs.buildings.resources.ironMine.hourlyProductionByLevel[villageData.resources.iron.level]*ironHours).toFixed()
        currentIron = parseInt(currentIron) + parseInt(villageData.resources.iron.sum)
        checkCapacityAndWrite('#iron', currentIron, storageCapacity)

        let currentClay =( gameConfigs.buildings.resources.clayPit.hourlyProductionByLevel[villageData.resources.clay.level]*clayHours).toFixed()
        currentClay = parseInt(currentClay) + parseInt(villageData.resources.clay.sum)
        checkCapacityAndWrite('#clay', currentClay, storageCapacity)
    ***REMOVED***

    $("#storage").html(gameConfigs.buildings.storage.capacity[villageData.storage.level])
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

function displayNeededResourcesAndTimeForUpgrading()***REMOVED***
    let speedPercantageOfTownCenter = gameConfigs.buildings.townCenter.buildingSpeed[villageData.townCenter.level]
    //upgrading costs
    $('.upgradeBuildings').each(function()***REMOVED***
        let buildingName = $(this).attr('buildingName')
        let buildingLevel = String(parseInt(villageData[String(buildingName)].level) + 1)
        let neededResources = gameConfigs.buildings[String(buildingName)].upgradingCosts[buildingLevel]
        let mins = gameConfigs.buildings[String(buildingName)].upgradeTime[buildingLevel]
        if(buildingName!='townCenter') mins = parseInt(mins - (mins * speedPercantageOfTownCenter / 100))
        let neededTime = calculateTimeFromMinutes(mins)
        $(this).find(".neededWood").html(neededResources.wood)
        $(this).find(".neededIron").html(neededResources.iron)
        $(this).find(".neededClay").html(neededResources.clay)
        $(this).find(".neededTime").html(neededTime)
    ***REMOVED***)
    $('.upgradeResources').each(function()***REMOVED***
        let resourceBuilding = $(this).attr('buildingName')
        let resourceType = $(this).attr('resourceType')
        let buildingLevel = String(parseInt(villageData.resources[String(resourceType)].level) + 1)
        let neededResources = gameConfigs.buildings.resources[String(resourceBuilding)].upgradingCosts[buildingLevel]
        let mins = gameConfigs.buildings.resources[String(resourceBuilding)].upgradeTime[buildingLevel]
        mins = parseInt(mins - (mins * speedPercantageOfTownCenter / 100))
        let neededTime = calculateTimeFromMinutes(mins)
        $(this).find(".neededWood").html(neededResources.wood)
        $(this).find(".neededIron").html(neededResources.iron)
        $(this).find(".neededClay").html(neededResources.clay)
        $(this).find(".neededTime").html(neededTime)
    ***REMOVED***)

    //upgrading times

***REMOVED***

function calculateTimeFromMinutes(mins)***REMOVED***
    let mins_num = parseFloat(mins, 10); // don't forget the second param
    let hours   = Math.floor(mins_num / 60);
    let minutes = Math.floor((mins_num - ((hours * 3600)) / 60));
    let seconds = Math.floor((mins_num * 60) - (hours * 3600) - (minutes * 60));

    // Appends 0 when unit is less than 10
    if (hours   < 10) ***REMOVED***hours   = "0"+hours;***REMOVED***
    if (minutes < 10) ***REMOVED***minutes = "0"+minutes;***REMOVED***
    if (seconds < 10) ***REMOVED***seconds = "0"+seconds;***REMOVED***
    return hours+':'+minutes+':'+seconds;
***REMOVED***

function initSwitchVillageDropdownButton()***REMOVED***
    // $("#switchVillage")
***REMOVED***