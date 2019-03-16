"use strict";
var village_id
var gameConfigs = JSON.parse(($("#gameConfigData").attr("data")).replace(/'/g, '"'))
var villageData = JSON.parse(($("#villageDataJSON").attr("data")).replace(/'/g, '"'))
$(function()***REMOVED***
    // data = JSON.parse(data.replace(/'/g, '"'))
    village_id = villageData.id
    initToggleVisualVillageSwitch()
    initVillage()
    console.log(villageData)
***REMOVED***)

function initVillage()***REMOVED***
    initUpgradeButtons()
    displayNeededResourcesAndTimeForUpgrading()
    
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
        if(buildingName!='townCenter') mins = lowerByPercantage(mins, speedPercantageOfTownCenter)
        let neededTime = calculateTimeFromMinutes(mins)
        $(this).find(".neededWood").html(neededResources.wood)
        $(this).find(".neededIron").html(neededResources.iron)
        $(this).find(".neededClay").html(neededResources.clay)
        $(this).find(".neededTime").html(neededTime)
    ***REMOVED***)
    $('.upgradeResources').each(function()***REMOVED***
        let resourceBuilding = $(this).attr('buildingName')
        // let resourceType = $(this).attr('resourceType')
        let buildingLevel = String(parseInt(villageData.resources[String(resourceBuilding)].level) + 1)
        let neededResources = gameConfigs.buildings.resources[String(resourceBuilding)].upgradingCosts[buildingLevel]
        let mins = gameConfigs.buildings.resources[String(resourceBuilding)].upgradeTime[buildingLevel]
        mins = lowerByPercantage(mins, speedPercantageOfTownCenter)
        let neededTime = calculateTimeFromMinutes(mins)
        $(this).find(".neededWood").html(neededResources.wood)
        $(this).find(".neededIron").html(neededResources.iron)
        $(this).find(".neededClay").html(neededResources.clay)
        $(this).find(".neededTime").html(neededTime)
    ***REMOVED***)

    //upgrading times

***REMOVED***


function initSwitchVillageDropdownButton()***REMOVED***
    // $("#switchVillage")
***REMOVED***

function initToggleVisualVillageSwitch()***REMOVED***
    let textBasedVillageContent = $(".village-content").html()
    $("#toggleVisualVillage").val('off')

    $(".toggleVisualVillage").on("change",function()***REMOVED***
        ($("#toggleVisualVillage").val() == 'on' ? $("#toggleVisualVillage").val('off')   : $("#toggleVisualVillage").val('on') )
        console.log($("#toggleVisualVillage").val())

        if($("#toggleVisualVillage").val() == 'on')***REMOVED***
            const string = '<div class="row mt-5 mb-5"><div class="col"></div><div class="col"><h5>COMING SOON!</h5></div><div class="col"></div></div>'
            $(".village-content").html(string)
        ***REMOVED***else***REMOVED***
            $(".village-content").html(textBasedVillageContent)
            initVillage()
        ***REMOVED***
    ***REMOVED***)
***REMOVED***