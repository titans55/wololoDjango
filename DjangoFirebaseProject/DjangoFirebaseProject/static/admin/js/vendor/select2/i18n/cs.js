/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function()***REMOVED***if(jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd)var e=jQuery.fn.select2.amd;return e.define("select2/i18n/cs",[],function()***REMOVED***function e(e,t)***REMOVED***switch(e)***REMOVED***case 2:return t?"dva":"dvě";case 3:return"tři";case 4:return"čtyři"***REMOVED***return""***REMOVED***return***REMOVED***errorLoading:function()***REMOVED***return"Výsledky nemohly být načteny."***REMOVED***,inputTooLong:function(t)***REMOVED***var n=t.input.length-t.maximum;return n==1?"Prosím zadejte o jeden znak méně":n<=4?"Prosím zadejte o "+e(n,!0)+" znaky méně":"Prosím zadejte o "+n+" znaků méně"***REMOVED***,inputTooShort:function(t)***REMOVED***var n=t.minimum-t.input.length;return n==1?"Prosím zadejte ještě jeden znak":n<=4?"Prosím zadejte ještě další "+e(n,!0)+" znaky":"Prosím zadejte ještě dalších "+n+" znaků"***REMOVED***,loadingMore:function()***REMOVED***return"Načítají se další výsledky…"***REMOVED***,maximumSelected:function(t)***REMOVED***var n=t.maximum;return n==1?"Můžete zvolit jen jednu položku":n<=4?"Můžete zvolit maximálně "+e(n,!1)+" položky":"Můžete zvolit maximálně "+n+" položek"***REMOVED***,noResults:function()***REMOVED***return"Nenalezeny žádné položky"***REMOVED***,searching:function()***REMOVED***return"Vyhledávání…"***REMOVED******REMOVED******REMOVED***),***REMOVED***define:e.define,require:e.require***REMOVED******REMOVED***)();