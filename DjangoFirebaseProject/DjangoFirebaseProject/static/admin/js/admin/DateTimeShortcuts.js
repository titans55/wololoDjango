/*global Calendar, findPosX, findPosY, getStyle, get_format, gettext, gettext_noop, interpolate, ngettext, quickElement*/
// Inserts shortcut buttons after all of the following:
//     <input type="text" class="vDateField">
//     <input type="text" class="vTimeField">
(function() ***REMOVED***
    'use strict';
    var DateTimeShortcuts = ***REMOVED***
        calendars: [],
        calendarInputs: [],
        clockInputs: [],
        clockHours: ***REMOVED***
            default_: [
                [gettext_noop('Now'), -1],
                [gettext_noop('Midnight'), 0],
                [gettext_noop('6 a.m.'), 6],
                [gettext_noop('Noon'), 12],
                [gettext_noop('6 p.m.'), 18]
            ]
        ***REMOVED***,
        dismissClockFunc: [],
        dismissCalendarFunc: [],
        calendarDivName1: 'calendarbox', // name of calendar <div> that gets toggled
        calendarDivName2: 'calendarin',  // name of <div> that contains calendar
        calendarLinkName: 'calendarlink',// name of the link that is used to toggle
        clockDivName: 'clockbox',        // name of clock <div> that gets toggled
        clockLinkName: 'clocklink',      // name of the link that is used to toggle
        shortCutsClass: 'datetimeshortcuts', // class of the clock and cal shortcuts
        timezoneWarningClass: 'timezonewarning', // class of the warning for timezone mismatch
        timezoneOffset: 0,
        init: function() ***REMOVED***
            var body = document.getElementsByTagName('body')[0];
            var serverOffset = body.getAttribute('data-admin-utc-offset');
            if (serverOffset) ***REMOVED***
                var localOffset = new Date().getTimezoneOffset() * -60;
                DateTimeShortcuts.timezoneOffset = localOffset - serverOffset;
            ***REMOVED***

            var inputs = document.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) ***REMOVED***
                var inp = inputs[i];
                if (inp.getAttribute('type') === 'text' && inp.className.match(/vTimeField/)) ***REMOVED***
                    DateTimeShortcuts.addClock(inp);
                    DateTimeShortcuts.addTimezoneWarning(inp);
                ***REMOVED***
                else if (inp.getAttribute('type') === 'text' && inp.className.match(/vDateField/)) ***REMOVED***
                    DateTimeShortcuts.addCalendar(inp);
                    DateTimeShortcuts.addTimezoneWarning(inp);
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***,
        // Return the current time while accounting for the server timezone.
        now: function() ***REMOVED***
            var body = document.getElementsByTagName('body')[0];
            var serverOffset = body.getAttribute('data-admin-utc-offset');
            if (serverOffset) ***REMOVED***
                var localNow = new Date();
                var localOffset = localNow.getTimezoneOffset() * -60;
                localNow.setTime(localNow.getTime() + 1000 * (serverOffset - localOffset));
                return localNow;
            ***REMOVED*** else ***REMOVED***
                return new Date();
            ***REMOVED***
        ***REMOVED***,
        // Add a warning when the time zone in the browser and backend do not match.
        addTimezoneWarning: function(inp) ***REMOVED***
            var $ = django.jQuery;
            var warningClass = DateTimeShortcuts.timezoneWarningClass;
            var timezoneOffset = DateTimeShortcuts.timezoneOffset / 3600;

            // Only warn if there is a time zone mismatch.
            if (!timezoneOffset) ***REMOVED***
                return;
            ***REMOVED***

            // Check if warning is already there.
            if ($(inp).siblings('.' + warningClass).length) ***REMOVED***
                return;
            ***REMOVED***

            var message;
            if (timezoneOffset > 0) ***REMOVED***
                message = ngettext(
                    'Note: You are %s hour ahead of server time.',
                    'Note: You are %s hours ahead of server time.',
                    timezoneOffset
                );
            ***REMOVED***
            else ***REMOVED***
                timezoneOffset *= -1;
                message = ngettext(
                    'Note: You are %s hour behind server time.',
                    'Note: You are %s hours behind server time.',
                    timezoneOffset
                );
            ***REMOVED***
            message = interpolate(message, [timezoneOffset]);

            var $warning = $('<span>');
            $warning.attr('class', warningClass);
            $warning.text(message);

            $(inp).parent()
                .append($('<br>'))
                .append($warning);
        ***REMOVED***,
        // Add clock widget to a given field
        addClock: function(inp) ***REMOVED***
            var num = DateTimeShortcuts.clockInputs.length;
            DateTimeShortcuts.clockInputs[num] = inp;
            DateTimeShortcuts.dismissClockFunc[num] = function() ***REMOVED*** DateTimeShortcuts.dismissClock(num); return true; ***REMOVED***;

            // Shortcut links (clock icon and "Now" link)
            var shortcuts_span = document.createElement('span');
            shortcuts_span.className = DateTimeShortcuts.shortCutsClass;
            inp.parentNode.insertBefore(shortcuts_span, inp.nextSibling);
            var now_link = document.createElement('a');
            now_link.setAttribute('href', "#");
            now_link.appendChild(document.createTextNode(gettext('Now')));
            now_link.addEventListener('click', function(e) ***REMOVED***
                e.preventDefault();
                DateTimeShortcuts.handleClockQuicklink(num, -1);
            ***REMOVED***);
            var clock_link = document.createElement('a');
            clock_link.setAttribute('href', '#');
            clock_link.id = DateTimeShortcuts.clockLinkName + num;
            clock_link.addEventListener('click', function(e) ***REMOVED***
                e.preventDefault();
                // avoid triggering the document click handler to dismiss the clock
                e.stopPropagation();
                DateTimeShortcuts.openClock(num);
            ***REMOVED***);

            quickElement(
                'span', clock_link, '',
                'class', 'clock-icon',
                'title', gettext('Choose a Time')
            );
            shortcuts_span.appendChild(document.createTextNode('\u00A0'));
            shortcuts_span.appendChild(now_link);
            shortcuts_span.appendChild(document.createTextNode('\u00A0|\u00A0'));
            shortcuts_span.appendChild(clock_link);

            // Create clock link div
            //
            // Markup looks like:
            // <div id="clockbox1" class="clockbox module">
            //     <h2>Choose a time</h2>
            //     <ul class="timelist">
            //         <li><a href="#">Now</a></li>
            //         <li><a href="#">Midnight</a></li>
            //         <li><a href="#">6 a.m.</a></li>
            //         <li><a href="#">Noon</a></li>
            //         <li><a href="#">6 p.m.</a></li>
            //     </ul>
            //     <p class="calendar-cancel"><a href="#">Cancel</a></p>
            // </div>

            var clock_box = document.createElement('div');
            clock_box.style.display = 'none';
            clock_box.style.position = 'absolute';
            clock_box.className = 'clockbox module';
            clock_box.setAttribute('id', DateTimeShortcuts.clockDivName + num);
            document.body.appendChild(clock_box);
            clock_box.addEventListener('click', function(e) ***REMOVED*** e.stopPropagation(); ***REMOVED***);

            quickElement('h2', clock_box, gettext('Choose a time'));
            var time_list = quickElement('ul', clock_box);
            time_list.className = 'timelist';
            // The list of choices can be overridden in JavaScript like this:
            // DateTimeShortcuts.clockHours.name = [['3 a.m.', 3]];
            // where name is the name attribute of the <input>.
            var name = typeof DateTimeShortcuts.clockHours[inp.name] === 'undefined' ? 'default_' : inp.name;
            DateTimeShortcuts.clockHours[name].forEach(function(element) ***REMOVED***
                var time_link = quickElement('a', quickElement('li', time_list), gettext(element[0]), 'href', '#');
                time_link.addEventListener('click', function(e) ***REMOVED***
                    e.preventDefault();
                    DateTimeShortcuts.handleClockQuicklink(num, element[1]);
                ***REMOVED***);
            ***REMOVED***);

            var cancel_p = quickElement('p', clock_box);
            cancel_p.className = 'calendar-cancel';
            var cancel_link = quickElement('a', cancel_p, gettext('Cancel'), 'href', '#');
            cancel_link.addEventListener('click', function(e) ***REMOVED***
                e.preventDefault();
                DateTimeShortcuts.dismissClock(num);
            ***REMOVED***);

            document.addEventListener('keyup', function(event) ***REMOVED***
                if (event.which === 27) ***REMOVED***
                    // ESC key closes popup
                    DateTimeShortcuts.dismissClock(num);
                    event.preventDefault();
                ***REMOVED***
            ***REMOVED***);
        ***REMOVED***,
        openClock: function(num) ***REMOVED***
            var clock_box = document.getElementById(DateTimeShortcuts.clockDivName + num);
            var clock_link = document.getElementById(DateTimeShortcuts.clockLinkName + num);

            // Recalculate the clockbox position
            // is it left-to-right or right-to-left layout ?
            if (getStyle(document.body, 'direction') !== 'rtl') ***REMOVED***
                clock_box.style.left = findPosX(clock_link) + 17 + 'px';
            ***REMOVED***
            else ***REMOVED***
                // since style's width is in em, it'd be tough to calculate
                // px value of it. let's use an estimated px for now
                // TODO: IE returns wrong value for findPosX when in rtl mode
                //       (it returns as it was left aligned), needs to be fixed.
                clock_box.style.left = findPosX(clock_link) - 110 + 'px';
            ***REMOVED***
            clock_box.style.top = Math.max(0, findPosY(clock_link) - 30) + 'px';

            // Show the clock box
            clock_box.style.display = 'block';
            document.addEventListener('click', DateTimeShortcuts.dismissClockFunc[num]);
        ***REMOVED***,
        dismissClock: function(num) ***REMOVED***
            document.getElementById(DateTimeShortcuts.clockDivName + num).style.display = 'none';
            document.removeEventListener('click', DateTimeShortcuts.dismissClockFunc[num]);
        ***REMOVED***,
        handleClockQuicklink: function(num, val) ***REMOVED***
            var d;
            if (val === -1) ***REMOVED***
                d = DateTimeShortcuts.now();
            ***REMOVED***
            else ***REMOVED***
                d = new Date(1970, 1, 1, val, 0, 0, 0);
            ***REMOVED***
            DateTimeShortcuts.clockInputs[num].value = d.strftime(get_format('TIME_INPUT_FORMATS')[0]);
            DateTimeShortcuts.clockInputs[num].focus();
            DateTimeShortcuts.dismissClock(num);
        ***REMOVED***,
        // Add calendar widget to a given field.
        addCalendar: function(inp) ***REMOVED***
            var num = DateTimeShortcuts.calendars.length;

            DateTimeShortcuts.calendarInputs[num] = inp;
            DateTimeShortcuts.dismissCalendarFunc[num] = function() ***REMOVED*** DateTimeShortcuts.dismissCalendar(num); return true; ***REMOVED***;

            // Shortcut links (calendar icon and "Today" link)
            var shortcuts_span = document.createElement('span');
            shortcuts_span.className = DateTimeShortcuts.shortCutsClass;
            inp.parentNode.insertBefore(shortcuts_span, inp.nextSibling);
            var today_link = document.createElement('a');
            today_link.setAttribute('href', '#');
            today_link.appendChild(document.createTextNode(gettext('Today')));
            today_link.addEventListener('click', function(e) ***REMOVED***
                e.preventDefault();
                DateTimeShortcuts.handleCalendarQuickLink(num, 0);
            ***REMOVED***);
            var cal_link = document.createElement('a');
            cal_link.setAttribute('href', '#');
            cal_link.id = DateTimeShortcuts.calendarLinkName + num;
            cal_link.addEventListener('click', function(e) ***REMOVED***
                e.preventDefault();
                // avoid triggering the document click handler to dismiss the calendar
                e.stopPropagation();
                DateTimeShortcuts.openCalendar(num);
            ***REMOVED***);
            quickElement(
                'span', cal_link, '',
                'class', 'date-icon',
                'title', gettext('Choose a Date')
            );
            shortcuts_span.appendChild(document.createTextNode('\u00A0'));
            shortcuts_span.appendChild(today_link);
            shortcuts_span.appendChild(document.createTextNode('\u00A0|\u00A0'));
            shortcuts_span.appendChild(cal_link);

            // Create calendarbox div.
            //
            // Markup looks like:
            //
            // <div id="calendarbox3" class="calendarbox module">
            //     <h2>
            //           <a href="#" class="link-previous">&lsaquo;</a>
            //           <a href="#" class="link-next">&rsaquo;</a> February 2003
            //     </h2>
            //     <div class="calendar" id="calendarin3">
            //         <!-- (cal) -->
            //     </div>
            //     <div class="calendar-shortcuts">
            //          <a href="#">Yesterday</a> | <a href="#">Today</a> | <a href="#">Tomorrow</a>
            //     </div>
            //     <p class="calendar-cancel"><a href="#">Cancel</a></p>
            // </div>
            var cal_box = document.createElement('div');
            cal_box.style.display = 'none';
            cal_box.style.position = 'absolute';
            cal_box.className = 'calendarbox module';
            cal_box.setAttribute('id', DateTimeShortcuts.calendarDivName1 + num);
            document.body.appendChild(cal_box);
            cal_box.addEventListener('click', function(e) ***REMOVED*** e.stopPropagation(); ***REMOVED***);

            // next-prev links
            var cal_nav = quickElement('div', cal_box);
            var cal_nav_prev = quickElement('a', cal_nav, '<', 'href', '#');
            cal_nav_prev.className = 'calendarnav-previous';
            cal_nav_prev.addEventListener('click', function(e) ***REMOVED***
                e.preventDefault();
                DateTimeShortcuts.drawPrev(num);
            ***REMOVED***);

            var cal_nav_next = quickElement('a', cal_nav, '>', 'href', '#');
            cal_nav_next.className = 'calendarnav-next';
            cal_nav_next.addEventListener('click', function(e) ***REMOVED***
                e.preventDefault();
                DateTimeShortcuts.drawNext(num);
            ***REMOVED***);

            // main box
            var cal_main = quickElement('div', cal_box, '', 'id', DateTimeShortcuts.calendarDivName2 + num);
            cal_main.className = 'calendar';
            DateTimeShortcuts.calendars[num] = new Calendar(DateTimeShortcuts.calendarDivName2 + num, DateTimeShortcuts.handleCalendarCallback(num));
            DateTimeShortcuts.calendars[num].drawCurrent();

            // calendar shortcuts
            var shortcuts = quickElement('div', cal_box);
            shortcuts.className = 'calendar-shortcuts';
            var day_link = quickElement('a', shortcuts, gettext('Yesterday'), 'href', '#');
            day_link.addEventListener('click', function(e) ***REMOVED***
                e.preventDefault();
                DateTimeShortcuts.handleCalendarQuickLink(num, -1);
            ***REMOVED***);
            shortcuts.appendChild(document.createTextNode('\u00A0|\u00A0'));
            day_link = quickElement('a', shortcuts, gettext('Today'), 'href', '#');
            day_link.addEventListener('click', function(e) ***REMOVED***
                e.preventDefault();
                DateTimeShortcuts.handleCalendarQuickLink(num, 0);
            ***REMOVED***);
            shortcuts.appendChild(document.createTextNode('\u00A0|\u00A0'));
            day_link = quickElement('a', shortcuts, gettext('Tomorrow'), 'href', '#');
            day_link.addEventListener('click', function(e) ***REMOVED***
                e.preventDefault();
                DateTimeShortcuts.handleCalendarQuickLink(num, +1);
            ***REMOVED***);

            // cancel bar
            var cancel_p = quickElement('p', cal_box);
            cancel_p.className = 'calendar-cancel';
            var cancel_link = quickElement('a', cancel_p, gettext('Cancel'), 'href', '#');
            cancel_link.addEventListener('click', function(e) ***REMOVED***
                e.preventDefault();
                DateTimeShortcuts.dismissCalendar(num);
            ***REMOVED***);
            django.jQuery(document).on('keyup', function(event) ***REMOVED***
                if (event.which === 27) ***REMOVED***
                    // ESC key closes popup
                    DateTimeShortcuts.dismissCalendar(num);
                    event.preventDefault();
                ***REMOVED***
            ***REMOVED***);
        ***REMOVED***,
        openCalendar: function(num) ***REMOVED***
            var cal_box = document.getElementById(DateTimeShortcuts.calendarDivName1 + num);
            var cal_link = document.getElementById(DateTimeShortcuts.calendarLinkName + num);
            var inp = DateTimeShortcuts.calendarInputs[num];

            // Determine if the current value in the input has a valid date.
            // If so, draw the calendar with that date's year and month.
            if (inp.value) ***REMOVED***
                var format = get_format('DATE_INPUT_FORMATS')[0];
                var selected = inp.value.strptime(format);
                var year = selected.getUTCFullYear();
                var month = selected.getUTCMonth() + 1;
                var re = /\d***REMOVED***4***REMOVED***/;
                if (re.test(year.toString()) && month >= 1 && month <= 12) ***REMOVED***
                    DateTimeShortcuts.calendars[num].drawDate(month, year, selected);
                ***REMOVED***
            ***REMOVED***

            // Recalculate the clockbox position
            // is it left-to-right or right-to-left layout ?
            if (getStyle(document.body, 'direction') !== 'rtl') ***REMOVED***
                cal_box.style.left = findPosX(cal_link) + 17 + 'px';
            ***REMOVED***
            else ***REMOVED***
                // since style's width is in em, it'd be tough to calculate
                // px value of it. let's use an estimated px for now
                // TODO: IE returns wrong value for findPosX when in rtl mode
                //       (it returns as it was left aligned), needs to be fixed.
                cal_box.style.left = findPosX(cal_link) - 180 + 'px';
            ***REMOVED***
            cal_box.style.top = Math.max(0, findPosY(cal_link) - 75) + 'px';

            cal_box.style.display = 'block';
            document.addEventListener('click', DateTimeShortcuts.dismissCalendarFunc[num]);
        ***REMOVED***,
        dismissCalendar: function(num) ***REMOVED***
            document.getElementById(DateTimeShortcuts.calendarDivName1 + num).style.display = 'none';
            document.removeEventListener('click', DateTimeShortcuts.dismissCalendarFunc[num]);
        ***REMOVED***,
        drawPrev: function(num) ***REMOVED***
            DateTimeShortcuts.calendars[num].drawPreviousMonth();
        ***REMOVED***,
        drawNext: function(num) ***REMOVED***
            DateTimeShortcuts.calendars[num].drawNextMonth();
        ***REMOVED***,
        handleCalendarCallback: function(num) ***REMOVED***
            var format = get_format('DATE_INPUT_FORMATS')[0];
            // the format needs to be escaped a little
            format = format.replace('\\', '\\\\');
            format = format.replace('\r', '\\r');
            format = format.replace('\n', '\\n');
            format = format.replace('\t', '\\t');
            format = format.replace("'", "\\'");
            return function(y, m, d) ***REMOVED***
                DateTimeShortcuts.calendarInputs[num].value = new Date(y, m - 1, d).strftime(format);
                DateTimeShortcuts.calendarInputs[num].focus();
                document.getElementById(DateTimeShortcuts.calendarDivName1 + num).style.display = 'none';
            ***REMOVED***;
        ***REMOVED***,
        handleCalendarQuickLink: function(num, offset) ***REMOVED***
            var d = DateTimeShortcuts.now();
            d.setDate(d.getDate() + offset);
            DateTimeShortcuts.calendarInputs[num].value = d.strftime(get_format('DATE_INPUT_FORMATS')[0]);
            DateTimeShortcuts.calendarInputs[num].focus();
            DateTimeShortcuts.dismissCalendar(num);
        ***REMOVED***
    ***REMOVED***;

    window.addEventListener('load', DateTimeShortcuts.init);
    window.DateTimeShortcuts = DateTimeShortcuts;
***REMOVED***)();
