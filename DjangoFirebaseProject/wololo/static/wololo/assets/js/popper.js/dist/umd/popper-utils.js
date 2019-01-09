/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.14.4
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function (global, factory) ***REMOVED***
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.PopperUtils = ***REMOVED******REMOVED***)));
***REMOVED***(this, (function (exports) ***REMOVED*** 'use strict';

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Eement***REMOVED*** element
 * @argument ***REMOVED***String***REMOVED*** property
 */
function getStyleComputedProperty(element, property) ***REMOVED***
  if (element.nodeType !== 1) ***REMOVED***
    return [];
  ***REMOVED***
  // NOTE: 1 DOM access here
  var css = getComputedStyle(element, null);
  return property ? css[property] : css;
***REMOVED***

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Element***REMOVED*** element
 * @returns ***REMOVED***Element***REMOVED*** parent
 */
function getParentNode(element) ***REMOVED***
  if (element.nodeName === 'HTML') ***REMOVED***
    return element;
  ***REMOVED***
  return element.parentNode || element.host;
***REMOVED***

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Element***REMOVED*** element
 * @returns ***REMOVED***Element***REMOVED*** scroll parent
 */
function getScrollParent(element) ***REMOVED***
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) ***REMOVED***
    return document.body;
  ***REMOVED***

  switch (element.nodeName) ***REMOVED***
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  ***REMOVED***

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) ***REMOVED***
    return element;
  ***REMOVED***

  return getScrollParent(getParentNode(element));
***REMOVED***

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param ***REMOVED***Number***REMOVED*** version to check
 * @returns ***REMOVED***Boolean***REMOVED*** isIE
 */
function isIE(version) ***REMOVED***
  if (version === 11) ***REMOVED***
    return isIE11;
  ***REMOVED***
  if (version === 10) ***REMOVED***
    return isIE10;
  ***REMOVED***
  return isIE11 || isIE10;
***REMOVED***

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Element***REMOVED*** element
 * @returns ***REMOVED***Element***REMOVED*** offset parent
 */
function getOffsetParent(element) ***REMOVED***
  if (!element) ***REMOVED***
    return document.documentElement;
  ***REMOVED***

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) ***REMOVED***
    offsetParent = (element = element.nextElementSibling).offsetParent;
  ***REMOVED***

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') ***REMOVED***
    return element ? element.ownerDocument.documentElement : document.documentElement;
  ***REMOVED***

  // .offsetParent will return the closest TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') ***REMOVED***
    return getOffsetParent(offsetParent);
  ***REMOVED***

  return offsetParent;
***REMOVED***

function isOffsetContainer(element) ***REMOVED***
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') ***REMOVED***
    return false;
  ***REMOVED***
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
***REMOVED***

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Element***REMOVED*** node
 * @returns ***REMOVED***Element***REMOVED*** root node
 */
function getRoot(node) ***REMOVED***
  if (node.parentNode !== null) ***REMOVED***
    return getRoot(node.parentNode);
  ***REMOVED***

  return node;
***REMOVED***

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Element***REMOVED*** element1
 * @argument ***REMOVED***Element***REMOVED*** element2
 * @returns ***REMOVED***Element***REMOVED*** common offset parent
 */
function findCommonOffsetParent(element1, element2) ***REMOVED***
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) ***REMOVED***
    return document.documentElement;
  ***REMOVED***

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) ***REMOVED***
    if (isOffsetContainer(commonAncestorContainer)) ***REMOVED***
      return commonAncestorContainer;
    ***REMOVED***

    return getOffsetParent(commonAncestorContainer);
  ***REMOVED***

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) ***REMOVED***
    return findCommonOffsetParent(element1root.host, element2);
  ***REMOVED*** else ***REMOVED***
    return findCommonOffsetParent(element1, getRoot(element2).host);
  ***REMOVED***
***REMOVED***

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Element***REMOVED*** element
 * @argument ***REMOVED***String***REMOVED*** side `top` or `left`
 * @returns ***REMOVED***number***REMOVED*** amount of scrolled pixels
 */
function getScroll(element) ***REMOVED***
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') ***REMOVED***
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  ***REMOVED***

  return element[upperSide];
***REMOVED***

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param ***REMOVED***Object***REMOVED*** rect - Rect object you want to change
 * @param ***REMOVED***HTMLElement***REMOVED*** element - The element from the function reads the scroll values
 * @param ***REMOVED***Boolean***REMOVED*** subtract - set to true if you want to subtract the scroll values
 * @return ***REMOVED***Object***REMOVED*** rect - The modifier rect object
 */
function includeScroll(rect, element) ***REMOVED***
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
***REMOVED***

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param ***REMOVED***CSSStyleDeclaration***REMOVED*** styles
 * Result of `getStyleComputedProperty` on the given element
 * @param ***REMOVED***String***REMOVED*** axis - `x` or `y`
 * @return ***REMOVED***number***REMOVED*** borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) ***REMOVED***
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
***REMOVED***

function getSize(axis, body, html, computedStyle) ***REMOVED***
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
***REMOVED***

function getWindowSizes(document) ***REMOVED***
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return ***REMOVED***
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  ***REMOVED***;
***REMOVED***

var _extends = Object.assign || function (target) ***REMOVED***
  for (var i = 1; i < arguments.length; i++) ***REMOVED***
    var source = arguments[i];

    for (var key in source) ***REMOVED***
      if (Object.prototype.hasOwnProperty.call(source, key)) ***REMOVED***
        target[key] = source[key];
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

  return target;
***REMOVED***;

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Object***REMOVED*** offsets
 * @returns ***REMOVED***Object***REMOVED*** ClientRect like output
 */
function getClientRect(offsets) ***REMOVED***
  return _extends(***REMOVED******REMOVED***, offsets, ***REMOVED***
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  ***REMOVED***);
***REMOVED***

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param ***REMOVED***HTMLElement***REMOVED*** element
 * @return ***REMOVED***Object***REMOVED*** client rect
 */
function getBoundingClientRect(element) ***REMOVED***
  var rect = ***REMOVED******REMOVED***;

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try ***REMOVED***
    if (isIE(10)) ***REMOVED***
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    ***REMOVED*** else ***REMOVED***
      rect = element.getBoundingClientRect();
    ***REMOVED***
  ***REMOVED*** catch (e) ***REMOVED******REMOVED***

  var result = ***REMOVED***
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  ***REMOVED***;

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : ***REMOVED******REMOVED***;
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) ***REMOVED***
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  ***REMOVED***

  return getClientRect(result);
***REMOVED***

function getOffsetRectRelativeToArbitraryNode(children, parent) ***REMOVED***
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) ***REMOVED***
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  ***REMOVED***
  var offsets = getClientRect(***REMOVED***
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  ***REMOVED***);
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) ***REMOVED***
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  ***REMOVED***

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') ***REMOVED***
    offsets = includeScroll(offsets, parent);
  ***REMOVED***

  return offsets;
***REMOVED***

function getViewportOffsetRectRelativeToArtbitraryNode(element) ***REMOVED***
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = ***REMOVED***
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  ***REMOVED***;

  return getClientRect(offset);
***REMOVED***

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Element***REMOVED*** element
 * @argument ***REMOVED***Element***REMOVED*** customContainer
 * @returns ***REMOVED***Boolean***REMOVED*** answer to "isFixed?"
 */
function isFixed(element) ***REMOVED***
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') ***REMOVED***
    return false;
  ***REMOVED***
  if (getStyleComputedProperty(element, 'position') === 'fixed') ***REMOVED***
    return true;
  ***REMOVED***
  return isFixed(getParentNode(element));
***REMOVED***

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Element***REMOVED*** element
 * @returns ***REMOVED***Element***REMOVED*** first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) ***REMOVED***
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) ***REMOVED***
    return document.documentElement;
  ***REMOVED***
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') ***REMOVED***
    el = el.parentElement;
  ***REMOVED***
  return el || document.documentElement;
***REMOVED***

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param ***REMOVED***HTMLElement***REMOVED*** popper
 * @param ***REMOVED***HTMLElement***REMOVED*** reference
 * @param ***REMOVED***number***REMOVED*** padding
 * @param ***REMOVED***HTMLElement***REMOVED*** boundariesElement - Element used to define the boundaries
 * @param ***REMOVED***Boolean***REMOVED*** fixedPosition - Is in fixed position mode
 * @returns ***REMOVED***Object***REMOVED*** Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) ***REMOVED***
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = ***REMOVED*** top: 0, left: 0 ***REMOVED***;
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') ***REMOVED***
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  ***REMOVED*** else ***REMOVED***
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') ***REMOVED***
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') ***REMOVED***
        boundariesNode = popper.ownerDocument.documentElement;
      ***REMOVED***
    ***REMOVED*** else if (boundariesElement === 'window') ***REMOVED***
      boundariesNode = popper.ownerDocument.documentElement;
    ***REMOVED*** else ***REMOVED***
      boundariesNode = boundariesElement;
    ***REMOVED***

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) ***REMOVED***
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    ***REMOVED*** else ***REMOVED***
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    ***REMOVED***
  ***REMOVED***

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
***REMOVED***

function getArea(_ref) ***REMOVED***
  var width = _ref.width,
      height = _ref.height;

  return width * height;
***REMOVED***

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Object***REMOVED*** data - The data object generated by update method
 * @argument ***REMOVED***Object***REMOVED*** options - Modifiers configuration and options
 * @returns ***REMOVED***Object***REMOVED*** The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) ***REMOVED***
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) ***REMOVED***
    return placement;
  ***REMOVED***

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = ***REMOVED***
    top: ***REMOVED***
      width: boundaries.width,
      height: refRect.top - boundaries.top
    ***REMOVED***,
    right: ***REMOVED***
      width: boundaries.right - refRect.right,
      height: boundaries.height
    ***REMOVED***,
    bottom: ***REMOVED***
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    ***REMOVED***,
    left: ***REMOVED***
      width: refRect.left - boundaries.left,
      height: boundaries.height
    ***REMOVED***
  ***REMOVED***;

  var sortedAreas = Object.keys(rects).map(function (key) ***REMOVED***
    return _extends(***REMOVED***
      key: key
    ***REMOVED***, rects[key], ***REMOVED***
      area: getArea(rects[key])
    ***REMOVED***);
  ***REMOVED***).sort(function (a, b) ***REMOVED***
    return b.area - a.area;
  ***REMOVED***);

  var filteredAreas = sortedAreas.filter(function (_ref2) ***REMOVED***
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  ***REMOVED***);

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
***REMOVED***

var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) ***REMOVED***
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) ***REMOVED***
    timeoutDuration = 1;
    break;
  ***REMOVED***
***REMOVED***

function microtaskDebounce(fn) ***REMOVED***
  var called = false;
  return function () ***REMOVED***
    if (called) ***REMOVED***
      return;
    ***REMOVED***
    called = true;
    window.Promise.resolve().then(function () ***REMOVED***
      called = false;
      fn();
    ***REMOVED***);
  ***REMOVED***;
***REMOVED***

function taskDebounce(fn) ***REMOVED***
  var scheduled = false;
  return function () ***REMOVED***
    if (!scheduled) ***REMOVED***
      scheduled = true;
      setTimeout(function () ***REMOVED***
        scheduled = false;
        fn();
      ***REMOVED***, timeoutDuration);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument ***REMOVED***Function***REMOVED*** fn
* @returns ***REMOVED***Function***REMOVED***
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Array***REMOVED*** arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) ***REMOVED***
  // use native find if supported
  if (Array.prototype.find) ***REMOVED***
    return arr.find(check);
  ***REMOVED***

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
***REMOVED***

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Array***REMOVED*** arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) ***REMOVED***
  // use native findIndex if supported
  if (Array.prototype.findIndex) ***REMOVED***
    return arr.findIndex(function (cur) ***REMOVED***
      return cur[prop] === value;
    ***REMOVED***);
  ***REMOVED***

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) ***REMOVED***
    return obj[prop] === value;
  ***REMOVED***);
  return arr.indexOf(match);
***REMOVED***

/**
 * Get the position of the given element, relative to its offset parent
 * @method
 * @memberof Popper.Utils
 * @param ***REMOVED***Element***REMOVED*** element
 * @return ***REMOVED***Object***REMOVED*** position - Coordinates of the element and its `scrollTop`
 */
function getOffsetRect(element) ***REMOVED***
  var elementRect = void 0;
  if (element.nodeName === 'HTML') ***REMOVED***
    var _getWindowSizes = getWindowSizes(element.ownerDocument),
        width = _getWindowSizes.width,
        height = _getWindowSizes.height;

    elementRect = ***REMOVED***
      width: width,
      height: height,
      left: 0,
      top: 0
    ***REMOVED***;
  ***REMOVED*** else ***REMOVED***
    elementRect = ***REMOVED***
      width: element.offsetWidth,
      height: element.offsetHeight,
      left: element.offsetLeft,
      top: element.offsetTop
    ***REMOVED***;
  ***REMOVED***

  // position
  return getClientRect(elementRect);
***REMOVED***

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Element***REMOVED*** element
 * @returns ***REMOVED***Object***REMOVED*** object containing width and height properties
 */
function getOuterSizes(element) ***REMOVED***
  var styles = getComputedStyle(element);
  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  var result = ***REMOVED***
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  ***REMOVED***;
  return result;
***REMOVED***

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***String***REMOVED*** placement
 * @returns ***REMOVED***String***REMOVED*** flipped placement
 */
function getOppositePlacement(placement) ***REMOVED***
  var hash = ***REMOVED*** left: 'right', right: 'left', bottom: 'top', top: 'bottom' ***REMOVED***;
  return placement.replace(/left|right|bottom|top/g, function (matched) ***REMOVED***
    return hash[matched];
  ***REMOVED***);
***REMOVED***

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param ***REMOVED***Object***REMOVED*** position - CSS position the Popper will get applied
 * @param ***REMOVED***HTMLElement***REMOVED*** popper - the popper element
 * @param ***REMOVED***Object***REMOVED*** referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param ***REMOVED***String***REMOVED*** placement - one of the valid placement options
 * @returns ***REMOVED***Object***REMOVED*** popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) ***REMOVED***
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = ***REMOVED***
    width: popperRect.width,
    height: popperRect.height
  ***REMOVED***;

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) ***REMOVED***
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  ***REMOVED*** else ***REMOVED***
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  ***REMOVED***

  return popperOffsets;
***REMOVED***

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param ***REMOVED***Object***REMOVED*** state
 * @param ***REMOVED***Element***REMOVED*** popper - the popper element
 * @param ***REMOVED***Element***REMOVED*** reference - the reference element (the popper will be relative to this)
 * @param ***REMOVED***Element***REMOVED*** fixedPosition - is in fixed position mode
 * @returns ***REMOVED***Object***REMOVED*** An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) ***REMOVED***
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
***REMOVED***

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***String***REMOVED*** property (camelCase)
 * @returns ***REMOVED***String***REMOVED*** prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) ***REMOVED***
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) ***REMOVED***
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') ***REMOVED***
      return toCheck;
    ***REMOVED***
  ***REMOVED***
  return null;
***REMOVED***

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Any***REMOVED*** functionToCheck - variable to check
 * @returns ***REMOVED***Boolean***REMOVED*** answer to: is a function?
 */
function isFunction(functionToCheck) ***REMOVED***
  var getType = ***REMOVED******REMOVED***;
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
***REMOVED***

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns ***REMOVED***Boolean***REMOVED***
 */
function isModifierEnabled(modifiers, modifierName) ***REMOVED***
  return modifiers.some(function (_ref) ***REMOVED***
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  ***REMOVED***);
***REMOVED***

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param ***REMOVED***Array***REMOVED*** modifiers - list of modifiers
 * @param ***REMOVED***String***REMOVED*** requestingName - name of requesting modifier
 * @param ***REMOVED***String***REMOVED*** requestedName - name of requested modifier
 * @returns ***REMOVED***Boolean***REMOVED***
 */
function isModifierRequired(modifiers, requestingName, requestedName) ***REMOVED***
  var requesting = find(modifiers, function (_ref) ***REMOVED***
    var name = _ref.name;
    return name === requestingName;
  ***REMOVED***);

  var isRequired = !!requesting && modifiers.some(function (modifier) ***REMOVED***
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  ***REMOVED***);

  if (!isRequired) ***REMOVED***
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  ***REMOVED***
  return isRequired;
***REMOVED***

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param ***REMOVED*******REMOVED*** input to check
 * @return ***REMOVED***Boolean***REMOVED***
 */
function isNumeric(n) ***REMOVED***
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
***REMOVED***

/**
 * Get the window associated with the element
 * @argument ***REMOVED***Element***REMOVED*** element
 * @returns ***REMOVED***Window***REMOVED***
 */
function getWindow(element) ***REMOVED***
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
***REMOVED***

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) ***REMOVED***
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) ***REMOVED***
    target.removeEventListener('scroll', state.updateBound);
  ***REMOVED***);

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
***REMOVED***

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param ***REMOVED***dataObject***REMOVED*** data
 * @param ***REMOVED***Array***REMOVED*** modifiers
 * @param ***REMOVED***String***REMOVED*** ends - Optional modifier name used as stopper
 * @returns ***REMOVED***dataObject***REMOVED***
 */
function runModifiers(modifiers, data, ends) ***REMOVED***
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) ***REMOVED***
    if (modifier['function']) ***REMOVED***
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    ***REMOVED***
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) ***REMOVED***
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    ***REMOVED***
  ***REMOVED***);

  return data;
***REMOVED***

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Element***REMOVED*** element - Element to apply the attributes to
 * @argument ***REMOVED***Object***REMOVED*** styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) ***REMOVED***
  Object.keys(attributes).forEach(function (prop) ***REMOVED***
    var value = attributes[prop];
    if (value !== false) ***REMOVED***
      element.setAttribute(prop, attributes[prop]);
    ***REMOVED*** else ***REMOVED***
      element.removeAttribute(prop);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***Element***REMOVED*** element - Element to apply the style to
 * @argument ***REMOVED***Object***REMOVED*** styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) ***REMOVED***
  Object.keys(styles).forEach(function (prop) ***REMOVED***
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) ***REMOVED***
      unit = 'px';
    ***REMOVED***
    element.style[prop] = styles[prop] + unit;
  ***REMOVED***);
***REMOVED***

function attachToScrollParents(scrollParent, event, callback, scrollParents) ***REMOVED***
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, ***REMOVED*** passive: true ***REMOVED***);

  if (!isBody) ***REMOVED***
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  ***REMOVED***
  scrollParents.push(target);
***REMOVED***

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) ***REMOVED***
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, ***REMOVED*** passive: true ***REMOVED***);

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
***REMOVED***

// This is here just for backward compatibility with versions lower than v1.10.3
// you should import the utilities using named exports, if you want them all use:
// ```
// import * as PopperUtils from 'popper-utils';
// ```
// The default export will be removed in the next major version.
var index = ***REMOVED***
  computeAutoPlacement: computeAutoPlacement,
  debounce: debounce,
  findIndex: findIndex,
  getBordersSize: getBordersSize,
  getBoundaries: getBoundaries,
  getBoundingClientRect: getBoundingClientRect,
  getClientRect: getClientRect,
  getOffsetParent: getOffsetParent,
  getOffsetRect: getOffsetRect,
  getOffsetRectRelativeToArbitraryNode: getOffsetRectRelativeToArbitraryNode,
  getOuterSizes: getOuterSizes,
  getParentNode: getParentNode,
  getPopperOffsets: getPopperOffsets,
  getReferenceOffsets: getReferenceOffsets,
  getScroll: getScroll,
  getScrollParent: getScrollParent,
  getStyleComputedProperty: getStyleComputedProperty,
  getSupportedPropertyName: getSupportedPropertyName,
  getWindowSizes: getWindowSizes,
  isFixed: isFixed,
  isFunction: isFunction,
  isModifierEnabled: isModifierEnabled,
  isModifierRequired: isModifierRequired,
  isNumeric: isNumeric,
  removeEventListeners: removeEventListeners,
  runModifiers: runModifiers,
  setAttributes: setAttributes,
  setStyles: setStyles,
  setupEventListeners: setupEventListeners
***REMOVED***;

exports.computeAutoPlacement = computeAutoPlacement;
exports.debounce = debounce;
exports.findIndex = findIndex;
exports.getBordersSize = getBordersSize;
exports.getBoundaries = getBoundaries;
exports.getBoundingClientRect = getBoundingClientRect;
exports.getClientRect = getClientRect;
exports.getOffsetParent = getOffsetParent;
exports.getOffsetRect = getOffsetRect;
exports.getOffsetRectRelativeToArbitraryNode = getOffsetRectRelativeToArbitraryNode;
exports.getOuterSizes = getOuterSizes;
exports.getParentNode = getParentNode;
exports.getPopperOffsets = getPopperOffsets;
exports.getReferenceOffsets = getReferenceOffsets;
exports.getScroll = getScroll;
exports.getScrollParent = getScrollParent;
exports.getStyleComputedProperty = getStyleComputedProperty;
exports.getSupportedPropertyName = getSupportedPropertyName;
exports.getWindowSizes = getWindowSizes;
exports.isFixed = isFixed;
exports.isFunction = isFunction;
exports.isModifierEnabled = isModifierEnabled;
exports.isModifierRequired = isModifierRequired;
exports.isNumeric = isNumeric;
exports.removeEventListeners = removeEventListeners;
exports.runModifiers = runModifiers;
exports.setAttributes = setAttributes;
exports.setStyles = setStyles;
exports.setupEventListeners = setupEventListeners;
exports['default'] = index;

Object.defineProperty(exports, '__esModule', ***REMOVED*** value: true ***REMOVED***);

***REMOVED***)));
//# sourceMappingURL=popper-utils.js.map
