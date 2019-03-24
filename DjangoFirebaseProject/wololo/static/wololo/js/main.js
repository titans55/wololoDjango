$(function(){
    initWebsockets()
    $('.dropdown-menu a').click(function(){
        $('.dropdown-toggle').text($(this).text());
    });
})

function calculateTimeFromMinutes(mins){
    let mins_num = parseFloat(mins, 10); // don't forget the second param
    let hours   = Math.floor(mins_num / 60);
    let minutes = Math.floor((mins_num - ((hours * 3600)) / 60));
    let seconds = Math.floor((mins_num * 60) - (hours * 3600) - (minutes * 60));

    // Appends 0 when unit is less than 10
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function lowerByPercantage(value, percantage){
    return parseInt(value - (value * percantage / 100))
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

//Using django channels
function initWebsockets(){

    var socket = new WebSocket('ws://' + window.location.host +'/ws/game/');

    socket.onopen = function(e){
        console.log("websocket connected", e)
    }
    
    socket.onmessage = function(e) {
        console.log("message Arrived")
        const incomingJson = JSON.parse(e.data)
        incomingMessageEndpoints(incomingJson)
    };


    socket.onerror = function(e){
        console.log("errorrr", e)
    }

    socket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };

}

function incomingMessageEndpoints(incomingJson){
    console.log('message has arrived') 

    switch(incomingJson.messageType){
        case 'upgradeBuilding':
            listenUpgradeBuilding(incomingJson)
            break;
        default :
            alert("message arrived endpoint is not defined")
    }
}

function listenUpgradeBuilding(incomingJson){
    console.log(incomingJson)
    const htmlTarget = $("[id='"+incomingJson.target+"-level']")
    $("body").append("<div id='"+ incomingJson.target +"-popup', class='popup' style='display:none;'>+1</div>")
    const popperObj = $("[id='"+incomingJson.target+"-popup']")
    const popper = new Popper(htmlTarget, popperObj, {
        placement: 'right'
    }); 
    popperObj.show()
    setTimeout(function(){
        popperObj.remove() 
    } , 3000);

}
