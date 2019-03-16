/*global gettext, pgettext, get_format, quickElement, removeChildren*/
/*
calendar.js - Calendar functions by Adrian Holovaty
depends on core.js for utility functions like removeChildren or quickElement
*/

(function() ***REMOVED***
    'use strict';
    // CalendarNamespace -- Provides a collection of HTML calendar-related helper functions
    var CalendarNamespace = ***REMOVED***
        monthsOfYear: [
            gettext('January'),
            gettext('February'),
            gettext('March'),
            gettext('April'),
            gettext('May'),
            gettext('June'),
            gettext('July'),
            gettext('August'),
            gettext('September'),
            gettext('October'),
            gettext('November'),
            gettext('December')
        ],
        daysOfWeek: [
            pgettext('one letter Sunday', 'S'),
            pgettext('one letter Monday', 'M'),
            pgettext('one letter Tuesday', 'T'),
            pgettext('one letter Wednesday', 'W'),
            pgettext('one letter Thursday', 'T'),
            pgettext('one letter Friday', 'F'),
            pgettext('one letter Saturday', 'S')
        ],
        firstDayOfWeek: parseInt(get_format('FIRST_DAY_OF_WEEK')),
        isLeapYear: function(year) ***REMOVED***
            return (((year % 4) === 0) && ((year % 100) !== 0 ) || ((year % 400) === 0));
        ***REMOVED***,
        getDaysInMonth: function(month, year) ***REMOVED***
            var days;
            if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) ***REMOVED***
                days = 31;
            ***REMOVED***
            else if (month === 4 || month === 6 || month === 9 || month === 11) ***REMOVED***
                days = 30;
            ***REMOVED***
            else if (month === 2 && CalendarNamespace.isLeapYear(year)) ***REMOVED***
                days = 29;
            ***REMOVED***
            else ***REMOVED***
                days = 28;
            ***REMOVED***
            return days;
        ***REMOVED***,
        draw: function(month, year, div_id, callback, selected) ***REMOVED*** // month = 1-12, year = 1-9999
            var today = new Date();
            var todayDay = today.getDate();
            var todayMonth = today.getMonth() + 1;
            var todayYear = today.getFullYear();
            var todayClass = '';

            // Use UTC functions here because the date field does not contain time
            // and using the UTC function variants prevent the local time offset
            // from altering the date, specifically the day field.  For example:
            //
            // ```
            // var x = new Date('2013-10-02');
            // var day = x.getDate();
            // ```
            //
            // The day variable above will be 1 instead of 2 in, say, US Pacific time
            // zone.
            var isSelectedMonth = false;
            if (typeof selected !== 'undefined') ***REMOVED***
                isSelectedMonth = (selected.getUTCFullYear() === year && (selected.getUTCMonth() + 1) === month);
            ***REMOVED***

            month = parseInt(month);
            year = parseInt(year);
            var calDiv = document.getElementById(div_id);
            removeChildren(calDiv);
            var calTable = document.createElement('table');
            quickElement('caption', calTable, CalendarNamespace.monthsOfYear[month - 1] + ' ' + year);
            var tableBody = quickElement('tbody', calTable);

            // Draw days-of-week header
            var tableRow = quickElement('tr', tableBody);
            for (var i = 0; i < 7; i++) ***REMOVED***
                quickElement('th', tableRow, CalendarNamespace.daysOfWeek[(i + CalendarNamespace.firstDayOfWeek) % 7]);
            ***REMOVED***

            var startingPos = new Date(year, month - 1, 1 - CalendarNamespace.firstDayOfWeek).getDay();
            var days = CalendarNamespace.getDaysInMonth(month, year);

            var nonDayCell;

            // Draw blanks before first of month
            tableRow = quickElement('tr', tableBody);
            for (i = 0; i < startingPos; i++) ***REMOVED***
                nonDayCell = quickElement('td', tableRow, ' ');
                nonDayCell.className = "nonday";
            ***REMOVED***

            function calendarMonth(y, m) ***REMOVED***
                function onClick(e) ***REMOVED***
                    e.preventDefault();
                    callback(y, m, this.textContent);
                ***REMOVED***
                return onClick;
            ***REMOVED***

            // Draw days of month
            var currentDay = 1;
            for (i = startingPos; currentDay <= days; i++) ***REMOVED***
                if (i % 7 === 0 && currentDay !== 1) ***REMOVED***
                    tableRow = quickElement('tr', tableBody);
                ***REMOVED***
                if ((currentDay === todayDay) && (month === todayMonth) && (year === todayYear)) ***REMOVED***
                    todayClass = 'today';
                ***REMOVED*** else ***REMOVED***
                    todayClass = '';
                ***REMOVED***

                // use UTC function; see above for explanation.
                if (isSelectedMonth && currentDay === selected.getUTCDate()) ***REMOVED***
                    if (todayClass !== '') ***REMOVED***
                        todayClass += " ";
                    ***REMOVED***
                    todayClass += "selected";
                ***REMOVED***

                var cell = quickElement('td', tableRow, '', 'class', todayClass);
                var link = quickElement('a', cell, currentDay, 'href', '#');
                link.addEventListener('click', calendarMonth(year, month));
                currentDay++;
            ***REMOVED***

            // Draw blanks after end of month (optional, but makes for valid code)
            while (tableRow.childNodes.length < 7) ***REMOVED***
                nonDayCell = quickElement('td', tableRow, ' ');
                nonDayCell.className = "nonday";
            ***REMOVED***

            calDiv.appendChild(calTable);
        ***REMOVED***
    ***REMOVED***;

    // Calendar -- A calendar instance
    function Calendar(div_id, callback, selected) ***REMOVED***
        // div_id (string) is the ID of the element in which the calendar will
        //     be displayed
        // callback (string) is the name of a JavaScript function that will be
        //     called with the parameters (year, month, day) when a day in the
        //     calendar is clicked
        this.div_id = div_id;
        this.callback = callback;
        this.today = new Date();
        this.currentMonth = this.today.getMonth() + 1;
        this.currentYear = this.today.getFullYear();
        if (typeof selected !== 'undefined') ***REMOVED***
            this.selected = selected;
        ***REMOVED***
    ***REMOVED***
    Calendar.prototype = ***REMOVED***
        drawCurrent: function() ***REMOVED***
            CalendarNamespace.draw(this.currentMonth, this.currentYear, this.div_id, this.callback, this.selected);
        ***REMOVED***,
        drawDate: function(month, year, selected) ***REMOVED***
            this.currentMonth = month;
            this.currentYear = year;

            if(selected) ***REMOVED***
                this.selected = selected;
            ***REMOVED***

            this.drawCurrent();
        ***REMOVED***,
        drawPreviousMonth: function() ***REMOVED***
            if (this.currentMonth === 1) ***REMOVED***
                this.currentMonth = 12;
                this.currentYear--;
            ***REMOVED***
            else ***REMOVED***
                this.currentMonth--;
            ***REMOVED***
            this.drawCurrent();
        ***REMOVED***,
        drawNextMonth: function() ***REMOVED***
            if (this.currentMonth === 12) ***REMOVED***
                this.currentMonth = 1;
                this.currentYear++;
            ***REMOVED***
            else ***REMOVED***
                this.currentMonth++;
            ***REMOVED***
            this.drawCurrent();
        ***REMOVED***,
        drawPreviousYear: function() ***REMOVED***
            this.currentYear--;
            this.drawCurrent();
        ***REMOVED***,
        drawNextYear: function() ***REMOVED***
            this.currentYear++;
            this.drawCurrent();
        ***REMOVED***
    ***REMOVED***;
    window.Calendar = Calendar;
    window.CalendarNamespace = CalendarNamespace;
***REMOVED***)();
