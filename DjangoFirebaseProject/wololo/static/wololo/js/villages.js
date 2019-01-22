$(function()***REMOVED***
    initVillage()
***REMOVED***)

function initVillage()***REMOVED***
    let villageData = $("#villageDataJSON").attr("data")
    let gameConfigs = $("#gameConfigData").attr("data")
    let villageDataJSON = JSON.parse(villageData.replace(/'/g, '"'))
    let gameConfigsJSON = JSON.parse(gameConfigs.replace(/'/g, '"'))
    //console.log(villageDataJSON)
    incrementOfResorcesByTime(villageDataJSON, gameConfigsJSON)
***REMOVED***

function incrementOfResorcesByTime(villageDataJSON, gameConfigsJSON)***REMOVED***
    //console.log(gameConfigsJSON.buildings.resources, villageDataJSON.resources)

    let woodDate = moment(villageDataJSON.resources.wood.lastInteractionDate).format()
    let ironDate = moment(villageDataJSON.resources.iron.lastInteractionDate).format()
    let clayDate = moment(villageDataJSON.resources.clay.lastInteractionDate).format()

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
        let currentWood =( gameConfigsJSON.buildings.resources.hourlyProductionByLevel[villageDataJSON.resources.wood.level]*woodHours).toFixed()
        currentWood = parseInt(currentWood) + parseInt(villageDataJSON.resources.wood.sum)
        checkCapacityAndWrite('#wood', currentWood, gameConfigsJSON.buildings.storage[villageDataJSON.storage.level])

        let currentIron =( gameConfigsJSON.buildings.resources.hourlyProductionByLevel[villageDataJSON.resources.iron.level]*ironHours).toFixed()
        currentIron = parseInt(currentIron) + parseInt(villageDataJSON.resources.iron.sum)
        checkCapacityAndWrite('#iron', currentIron, gameConfigsJSON.buildings.storage[villageDataJSON.storage.level])

        let currentClay =( gameConfigsJSON.buildings.resources.hourlyProductionByLevel[villageDataJSON.resources.clay.level]*clayHours).toFixed()
        currentClay = parseInt(currentClay) + parseInt(villageDataJSON.resources.clay.sum)
        checkCapacityAndWrite('#clay', currentClay, gameConfigsJSON.buildings.storage[villageDataJSON.storage.level])
    ***REMOVED***

    $("#storage").html(gameConfigsJSON.buildings.storage[villageDataJSON.storage.level])
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