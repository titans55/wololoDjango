"use strict";
var selectedRegion = null

$(function()***REMOVED***
    listenHoverAndClickToRegions()
***REMOVED***)

function listenHoverAndClickToRegions()***REMOVED***

    $(".italy").hover(function() ***REMOVED***
        (selectedRegion!='italy' ? $(".italy").addClass("hoverRegion") : '')
    ***REMOVED***,function() ***REMOVED***
        (selectedRegion!='italy' ? $(".italy").removeClass("hoverRegion") : '')
    ***REMOVED***)
    $(".italy").on("click",function()***REMOVED***
        if(selectedRegion!='italy')***REMOVED***
            selectRegion('italy')
        ***REMOVED***else***REMOVED***
            unselectRegion('italy')
        ***REMOVED***  
    ***REMOVED***)
    $(".thraceAndIllyria").hover(function() ***REMOVED***
        (selectedRegion!='thraceAndIllyria' ? $(".thraceAndIllyria").addClass("hoverRegion") : '')
    ***REMOVED***,function() ***REMOVED***
        (selectedRegion!='thraceAndIllyria' ? $(".thraceAndIllyria").removeClass("hoverRegion") : '')
    ***REMOVED***)
    $(".thraceAndIllyria").on("click",function()***REMOVED***
        if(selectedRegion!='thraceAndIllyria')***REMOVED***
            selectRegion('thraceAndIllyria')
        ***REMOVED***else***REMOVED***
            unselectRegion('thraceAndIllyria')
        ***REMOVED***  
    ***REMOVED***)

    $(".greece").hover(function() ***REMOVED***
        (selectedRegion!='greece' ? $(".greece").addClass("hoverRegion") : '')
    ***REMOVED***,function() ***REMOVED***
        (selectedRegion!='greece' ? $(".greece").removeClass("hoverRegion") : '')
    ***REMOVED***)
    $(".greece").on("click",function()***REMOVED***
        if(selectedRegion!='greece')***REMOVED***
            selectRegion('greece')
        ***REMOVED***else***REMOVED***
            unselectRegion('greece')
        ***REMOVED***  
    ***REMOVED***)

    $(".anatolia").hover(function() ***REMOVED***
        (selectedRegion!='anatolia' ? $(".anatolia").addClass("hoverRegion") : '')
    ***REMOVED***,function() ***REMOVED***
        (selectedRegion!='anatolia' ? $(".anatolia").removeClass("hoverRegion") : '')
    ***REMOVED***)
    $(".anatolia").on("click",function()***REMOVED***
        if(selectedRegion!='anatolia')***REMOVED***
            selectRegion('anatolia')
        ***REMOVED***else***REMOVED***
            unselectRegion('anatolia')
        ***REMOVED***  
    ***REMOVED***)

    $(".levant").hover(function() ***REMOVED***
        (selectedRegion!='levant' ? $(".levant").addClass("hoverRegion") : '')
    ***REMOVED***,function() ***REMOVED***
        (selectedRegion!='levant' ? $(".levant").removeClass("hoverRegion") : '')
    ***REMOVED***)
    $(".levant").on("click",function()***REMOVED***
        if(selectedRegion!='levant')***REMOVED***
            selectRegion('levant')
        ***REMOVED***else***REMOVED***
            unselectRegion('levant')
        ***REMOVED***  
    ***REMOVED***)
***REMOVED***
function selectRegion(regionClassName)***REMOVED***
    $("."+regionClassName).removeClass("hoverRegion")
    $("path").removeClass('selectedRegion')
    $("."+regionClassName).addClass('selectedRegion')
    selectedRegion = regionClassName
    console.log(regionClassName, "selected")
    if(regionClassName=='italy')***REMOVED***
        $(".selectingRegionText").html("Your first village will be located at <b><i>Italy</i></b>.")
    ***REMOVED***else if(regionClassName=='thraceAndIllyria')***REMOVED***
        $(".selectingRegionText").html("Your first village will be located at <b><i>Thrace & Illyria</i></b>.")
    ***REMOVED***else if(regionClassName=='greece')***REMOVED***
        $(".selectingRegionText").html("Your first village will be located at <b><i>Greece</i></b>.")
    ***REMOVED***else if(regionClassName=='anatolia')***REMOVED***
        $(".selectingRegionText").html("Your first village will be located at <b><i>Anatolia</i></b>.")
    ***REMOVED***else if(regionClassName=='levant')***REMOVED***
        $(".selectingRegionText").html("Your first village will be located at <b><i>Levant</i></b>.")
    ***REMOVED***
    $("#confirmRegion").removeClass("disabled")
    $("#selectedRegionInput").attr("value", regionClassName)
***REMOVED***
function unselectRegion(regionClassName)***REMOVED***
    selectedRegion = null
    $("#selectedRegionInput").attr("value", "")
    $("."+regionClassName).removeClass('selectedRegion')
    $(".selectingRegionText").html("Choose the region of your first village.")
    $("#confirmRegion").addClass("disabled")
***REMOVED***