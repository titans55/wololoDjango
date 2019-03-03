"use strict";
var village_id
var gameConfigs = JSON.parse(($("#gameConfigData").attr("data")).replace(/'/g, '"'))
var villageData = JSON.parse(($("#villageDataJSON").attr("data")).replace(/'/g, '"'))

$(function()***REMOVED***
    // data = JSON.parse(data.replace(/'/g, '"'))
    village_id = villageData.id
    incrementOfResorcesByTime()
    calculatePopulationAndWrite()
***REMOVED***)

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
function calculatePopulationAndWrite()***REMOVED***
    let farmLimit = gameConfigs.buildings.farm.populationLimit[villageData.farm.level]
    let usedPopulation = 0
    $(".building").each(function()***REMOVED***
        let buildingName = $(this).attr("buildingName")
        if(buildingName!='farm')***REMOVED***
            let neededPopForEachBuilding = gameConfigs.buildings[buildingName].neededPopulation[villageData[buildingName].level]
            usedPopulation += neededPopForEachBuilding
        ***REMOVED***
    ***REMOVED***)
    $(".resources").each(function()***REMOVED***
        let resourceBuildingName = $(this).attr("resourceBuildingName")
        let reseourceType = $(this).attr("reseourceType")
        let neededPopForEachBuilding = gameConfigs.buildings.resources[resourceBuildingName].neededPopulation[villageData.resources[reseourceType].level]
        usedPopulation += neededPopForEachBuilding
    ***REMOVED***)
   
    for(let [unitType, units] of Object.entries(villageData.troops.total))***REMOVED***
        for(let [unit, unitSize] of Object.entries(units))***REMOVED***
            usedPopulation += unitSize*gameConfigs.units[unitType][unit].neededPopulation
        ***REMOVED***
    ***REMOVED***
    
    console.log(usedPopulation,"wololo")
    $("#population").html(usedPopulation + " / " + farmLimit)
***REMOVED***