/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function()***REMOVED***if(jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd)var e=jQuery.fn.select2.amd;return e.define("select2/i18n/hr",[],function()***REMOVED***function e(e)***REMOVED***var t=" "+e+" znak";return e%10<5&&e%10>0&&(e%100<5||e%100>19)?e%10>1&&(t+="a"):t+="ova",t***REMOVED***return***REMOVED***errorLoading:function()***REMOVED***return"Preuzimanje nije uspjelo."***REMOVED***,inputTooLong:function(t)***REMOVED***var n=t.input.length-t.maximum;return"Unesite "+e(n)***REMOVED***,inputTooShort:function(t)***REMOVED***var n=t.minimum-t.input.length;return"Unesite još "+e(n)***REMOVED***,loadingMore:function()***REMOVED***return"Učitavanje rezultata…"***REMOVED***,maximumSelected:function(e)***REMOVED***return"Maksimalan broj odabranih stavki je "+e.maximum***REMOVED***,noResults:function()***REMOVED***return"Nema rezultata"***REMOVED***,searching:function()***REMOVED***return"Pretraga…"***REMOVED******REMOVED******REMOVED***),***REMOVED***define:e.define,require:e.require***REMOVED******REMOVED***)();