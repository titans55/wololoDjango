"use strict";
var village_id
var gameConfigs = JSON.parse(($("#gameConfigData").attr("data")).replace(/'/g, '"'))
var villageData = JSON.parse(($("#villageDataJSON").attr("data")).replace(/'/g, '"'))
$(function(){
    // data = JSON.parse(data.replace(/'/g, '"'))
    village_id = villageData.id
    initToggleVisualVillageSwitch()
    initVillage()
})

function initVillage(){
    initUpgradeButtons()
    displayNeededResourcesAndTimeForUpgrading()
}



function initUpgradeButtons(){

    let csrftoken = getCookie('csrftoken');
    
    $(".upgrade").on('click', function(){
        let now = new Date()
        let building_path = $(this).attr('id')
        $.ajax({
            type: 'POST',
            url: '/game/upgrade',
            data: {
                building_path: building_path,
                village_id: village_id,
                firingTime: now,
                csrfmiddlewaretoken: csrftoken 
            },
            success:function(data){

                if(data == 'Success'){
                    
                }else if(data == 'Fail'){
                    // alert("Fail")
                    console.log("WOLOLO")
                    $('#insufficentResources').modal('show')
                }
    
            }
        })
    });
}

function displayNeededResourcesAndTimeForUpgrading(){
    let speedPercantageOfTownCenter = gameConfigs.buildings.townCenter.buildingSpeed[villageData.buildings.townCenter.level]
    //upgrading costs
    $('.upgradeBuildings').each(function(){
        let buildingName = $(this).attr('buildingName')

        if(villageData.buildings[String(buildingName)].upgrading.state == 'true'){
            let now = moment(new Date())
            let buildingUpgrading = villageData.buildings[String(buildingName)].upgrading
            let startedUpgradingAt = moment(buildingUpgrading.time.startedUpgradingAt).format()
            let willBeUpgradedAt =  moment(buildingUpgrading.time.willBeUpgradedAt).format()
            let totalUpgradingSeconds =  moment(willBeUpgradedAt).diff(moment(startedUpgradingAt))/1000 //seconds
            let timeDone = moment(now).diff(moment(startedUpgradingAt).format())/1000 //seconds
            let period = totalUpgradingSeconds / 100
            let current_progress = (parseInt(timeDone / period) >= 100 ? 100 : parseInt(timeDone / period))
            console.log(totalUpgradingSeconds)
            console.log(period)

            console.log(willBeUpgradedAt)
            console.log(startedUpgradingAt, typeof(startedUpgradingAt))
            
            $("#"+buildingName+"-progressBar")
            .css("width", current_progress + "%")
            .attr("aria-valuenow", current_progress)
            .text(current_progress + "% Complete");
            if(current_progress!=100){
                let interval = setInterval(function() {
                    current_progress += 1;
                    $("#"+buildingName+"-progressBar")
                    .css("width", current_progress + "%")
                    .attr("aria-valuenow", current_progress)
                    .text(current_progress + "% Complete");
                    if (current_progress >= 100)
                        clearInterval(interval);
                }, period*1000);
            }
        }else{
            let buildingLevel = String(parseInt(villageData.buildings[String(buildingName)].level) + 1)
            let neededResources = gameConfigs.buildings[String(buildingName)].upgradingCosts[buildingLevel]
            let mins = gameConfigs.buildings[String(buildingName)].upgradeTime[buildingLevel]
            if(buildingName!='townCenter') mins = lowerByPercantage(mins, speedPercantageOfTownCenter)
            let neededTime = calculateTimeFromMinutes(mins)

            $(this).find(".neededWood").html(neededResources.wood)
            $(this).find(".neededIron").html(neededResources.iron)
            $(this).find(".neededClay").html(neededResources.clay)
            $(this).find(".neededTime").html(neededTime)
        }
    })
    $('.upgradeResources').each(function(){
        let resourceBuilding = $(this).attr('buildingName')
        // let resourceType = $(this).attr('resourceType')
        let buildingLevel = String(parseInt(villageData.buildings.resources[String(resourceBuilding)].level) + 1)
        let neededResources = gameConfigs.buildings.resources[String(resourceBuilding)].upgradingCosts[buildingLevel]
        let mins = gameConfigs.buildings.resources[String(resourceBuilding)].upgradeTime[buildingLevel]
        mins = lowerByPercantage(mins, speedPercantageOfTownCenter)
        let neededTime = calculateTimeFromMinutes(mins)
        $(this).find(".neededWood").html(neededResources.wood)
        $(this).find(".neededIron").html(neededResources.iron)
        $(this).find(".neededClay").html(neededResources.clay)
        $(this).find(".neededTime").html(neededTime)
    })

    //upgrading times

}


function initSwitchVillageDropdownButton(){
    // $("#switchVillage")
}

function initToggleVisualVillageSwitch(){
    let textBasedVillageContent = $(".village-content").html()
    $("#toggleVisualVillage").val('off')

    $(".toggleVisualVillage").on("change",function(){
        ($("#toggleVisualVillage").val() == 'on' ? $("#toggleVisualVillage").val('off')   : $("#toggleVisualVillage").val('on') )
        console.log($("#toggleVisualVillage").val())

        if($("#toggleVisualVillage").val() == 'on'){
            const string = '<div class="row mt-5 mb-5"><div class="col"></div><div class="col"><h5>COMING SOON!</h5></div><div class="col"></div></div>'
            $(".village-content").html(string)
        }else{
            $(".village-content").html(textBasedVillageContent)
            initVillage()
        }
    })
}