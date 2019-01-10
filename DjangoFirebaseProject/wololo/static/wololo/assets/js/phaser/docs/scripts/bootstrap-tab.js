/* ========================================================
 * bootstrap-tab.js v2.3.0
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) ***REMOVED***

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) ***REMOVED***
    this.element = $(element)
  ***REMOVED***

  Tab.prototype = ***REMOVED***

    constructor: Tab

  , show: function () ***REMOVED***
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) ***REMOVED***
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      ***REMOVED***

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active:last a')[0]

      e = $.Event('show', ***REMOVED***
        relatedTarget: previous
      ***REMOVED***)

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () ***REMOVED***
        $this.trigger(***REMOVED***
          type: 'shown'
        , relatedTarget: previous
        ***REMOVED***)
      ***REMOVED***)
    ***REMOVED***

  , activate: function ( element, container, callback) ***REMOVED***
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() ***REMOVED***
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) ***REMOVED***
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        ***REMOVED*** else ***REMOVED***
          element.removeClass('fade')
        ***REMOVED***

        if ( element.parent('.dropdown-menu') ) ***REMOVED***
          element.closest('li.dropdown').addClass('active')
        ***REMOVED***

        callback && callback()
      ***REMOVED***

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    ***REMOVED***
  ***REMOVED***


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = $.fn.tab

  $.fn.tab = function ( option ) ***REMOVED***
    return this.each(function () ***REMOVED***
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    ***REMOVED***)
  ***REMOVED***

  $.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  $.fn.tab.noConflict = function () ***REMOVED***
    $.fn.tab = old
    return this
  ***REMOVED***


 /* TAB DATA-API
  * ============ */

  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) ***REMOVED***
    e.preventDefault()
    $(this).tab('show')
  ***REMOVED***)

***REMOVED***(window.jQuery);