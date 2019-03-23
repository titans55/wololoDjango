(function() ***REMOVED***
    'use strict';
    var timeParsePatterns = [
        // 9
        ***REMOVED***
            re: /^\d***REMOVED***1,2***REMOVED***$/i,
            handler: function(bits) ***REMOVED***
                if (bits[0].length === 1) ***REMOVED***
                    return '0' + bits[0] + ':00';
                ***REMOVED*** else ***REMOVED***
                    return bits[0] + ':00';
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***,
        // 13:00
        ***REMOVED***
            re: /^\d***REMOVED***2***REMOVED***[:.]\d***REMOVED***2***REMOVED***$/i,
            handler: function(bits) ***REMOVED***
                return bits[0].replace('.', ':');
            ***REMOVED***
        ***REMOVED***,
        // 9:00
        ***REMOVED***
            re: /^\d[:.]\d***REMOVED***2***REMOVED***$/i,
            handler: function(bits) ***REMOVED***
                return '0' + bits[0].replace('.', ':');
            ***REMOVED***
        ***REMOVED***,
        // 3 am / 3 a.m. / 3am
        ***REMOVED***
            re: /^(\d+)\s*([ap])(?:.?m.?)?$/i,
            handler: function(bits) ***REMOVED***
                var hour = parseInt(bits[1]);
                if (hour === 12) ***REMOVED***
                    hour = 0;
                ***REMOVED***
                if (bits[2].toLowerCase() === 'p') ***REMOVED***
                    if (hour === 12) ***REMOVED***
                        hour = 0;
                    ***REMOVED***
                    return (hour + 12) + ':00';
                ***REMOVED*** else ***REMOVED***
                    if (hour < 10) ***REMOVED***
                        return '0' + hour + ':00';
                    ***REMOVED*** else ***REMOVED***
                        return hour + ':00';
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***,
        // 3.30 am / 3:15 a.m. / 3.00am
        ***REMOVED***
            re: /^(\d+)[.:](\d***REMOVED***2***REMOVED***)\s*([ap]).?m.?$/i,
            handler: function(bits) ***REMOVED***
                var hour = parseInt(bits[1]);
                var mins = parseInt(bits[2]);
                if (mins < 10) ***REMOVED***
                    mins = '0' + mins;
                ***REMOVED***
                if (hour === 12) ***REMOVED***
                    hour = 0;
                ***REMOVED***
                if (bits[3].toLowerCase() === 'p') ***REMOVED***
                    if (hour === 12) ***REMOVED***
                        hour = 0;
                    ***REMOVED***
                    return (hour + 12) + ':' + mins;
                ***REMOVED*** else ***REMOVED***
                    if (hour < 10) ***REMOVED***
                        return '0' + hour + ':' + mins;
                    ***REMOVED*** else ***REMOVED***
                        return hour + ':' + mins;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***,
        // noon
        ***REMOVED***
            re: /^no/i,
            handler: function(bits) ***REMOVED***
                return '12:00';
            ***REMOVED***
        ***REMOVED***,
        // midnight
        ***REMOVED***
            re: /^mid/i,
            handler: function(bits) ***REMOVED***
                return '00:00';
            ***REMOVED***
        ***REMOVED***
    ];

    function parseTimeString(s) ***REMOVED***
        for (var i = 0; i < timeParsePatterns.length; i++) ***REMOVED***
            var re = timeParsePatterns[i].re;
            var handler = timeParsePatterns[i].handler;
            var bits = re.exec(s);
            if (bits) ***REMOVED***
                return handler(bits);
            ***REMOVED***
        ***REMOVED***
        return s;
    ***REMOVED***

    window.parseTimeString = parseTimeString;
***REMOVED***)();
