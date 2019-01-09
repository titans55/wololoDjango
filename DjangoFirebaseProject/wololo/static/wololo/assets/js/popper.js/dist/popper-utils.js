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
  const css = getComputedStyle(element, null);
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
  const ***REMOVED*** overflow, overflowX, overflowY ***REMOVED*** = getStyleComputedProperty(element);
  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) ***REMOVED***
    return element;
  ***REMOVED***

  return getScrollParent(getParentNode(element));
***REMOVED***

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

const isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
const isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

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

  const noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  let offsetParent = element.offsetParent;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) ***REMOVED***
    offsetParent = (element = element.nextElementSibling).offsetParent;
  ***REMOVED***

  const nodeName = offsetParent && offsetParent.nodeName;

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
  const ***REMOVED*** nodeName ***REMOVED*** = element;
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
  const order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  const start = order ? element1 : element2;
  const end = order ? element2 : element1;

  // Get common ancestor container
  const range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  const ***REMOVED*** commonAncestorContainer ***REMOVED*** = range;

  // Both nodes are inside #document
  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) ***REMOVED***
    if (isOffsetContainer(commonAncestorContainer)) ***REMOVED***
      return commonAncestorContainer;
    ***REMOVED***

    return getOffsetParent(commonAncestorContainer);
  ***REMOVED***

  // one of the nodes is inside shadowDOM, find which one
  const element1root = getRoot(element1);
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
function getScroll(element, side = 'top') ***REMOVED***
  const upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  const nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') ***REMOVED***
    const html = element.ownerDocument.documentElement;
    const scrollingElement = element.ownerDocument.scrollingElement || html;
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
function includeScroll(rect, element, subtract = false) ***REMOVED***
  const scrollTop = getScroll(element, 'top');
  const scrollLeft = getScroll(element, 'left');
  const modifier = subtract ? -1 : 1;
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
  const sideA = axis === 'x' ? 'Left' : 'Top';
  const sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles[`border$***REMOVED***sideA***REMOVED***Width`], 10) + parseFloat(styles[`border$***REMOVED***sideB***REMOVED***Width`], 10);
***REMOVED***

function getSize(axis, body, html, computedStyle) ***REMOVED***
  return Math.max(body[`offset$***REMOVED***axis***REMOVED***`], body[`scroll$***REMOVED***axis***REMOVED***`], html[`client$***REMOVED***axis***REMOVED***`], html[`offset$***REMOVED***axis***REMOVED***`], html[`scroll$***REMOVED***axis***REMOVED***`], isIE(10) ? parseInt(html[`offset$***REMOVED***axis***REMOVED***`]) + parseInt(computedStyle[`margin$***REMOVED***axis === 'Height' ? 'Top' : 'Left'***REMOVED***`]) + parseInt(computedStyle[`margin$***REMOVED***axis === 'Height' ? 'Bottom' : 'Right'***REMOVED***`]) : 0);
***REMOVED***

function getWindowSizes(document) ***REMOVED***
  const body = document.body;
  const html = document.documentElement;
  const computedStyle = isIE(10) && getComputedStyle(html);

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
  let rect = ***REMOVED******REMOVED***;

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try ***REMOVED***
    if (isIE(10)) ***REMOVED***
      rect = element.getBoundingClientRect();
      const scrollTop = getScroll(element, 'top');
      const scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    ***REMOVED*** else ***REMOVED***
      rect = element.getBoundingClientRect();
    ***REMOVED***
  ***REMOVED*** catch (e) ***REMOVED******REMOVED***

  const result = ***REMOVED***
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  ***REMOVED***;

  // subtract scrollbar size from sizes
  const sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : ***REMOVED******REMOVED***;
  const width = sizes.width || element.clientWidth || result.right - result.left;
  const height = sizes.height || element.clientHeight || result.bottom - result.top;

  let horizScrollbar = element.offsetWidth - width;
  let vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) ***REMOVED***
    const styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  ***REMOVED***

  return getClientRect(result);
***REMOVED***

function getOffsetRectRelativeToArbitraryNode(children, parent, fixedPosition = false) ***REMOVED***
  const isIE10 = isIE(10);
  const isHTML = parent.nodeName === 'HTML';
  const childrenRect = getBoundingClientRect(children);
  const parentRect = getBoundingClientRect(parent);
  const scrollParent = getScrollParent(children);

  const styles = getStyleComputedProperty(parent);
  const borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  const borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) ***REMOVED***
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  ***REMOVED***
  let offsets = getClientRect(***REMOVED***
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
    const marginTop = parseFloat(styles.marginTop, 10);
    const marginLeft = parseFloat(styles.marginLeft, 10);

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

function getViewportOffsetRectRelativeToArtbitraryNode(element, excludeScroll = false) ***REMOVED***
  const html = element.ownerDocument.documentElement;
  const relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  const width = Math.max(html.clientWidth, window.innerWidth || 0);
  const height = Math.max(html.clientHeight, window.innerHeight || 0);

  const scrollTop = !excludeScroll ? getScroll(html) : 0;
  const scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  const offset = ***REMOVED***
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width,
    height
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
  const nodeName = element.nodeName;
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
  let el = element.parentElement;
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
function getBoundaries(popper, reference, padding, boundariesElement, fixedPosition = false) ***REMOVED***
  // NOTE: 1 DOM access here

  let boundaries = ***REMOVED*** top: 0, left: 0 ***REMOVED***;
  const offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') ***REMOVED***
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  ***REMOVED*** else ***REMOVED***
    // Handle other cases based on DOM element used as boundaries
    let boundariesNode;
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

    const offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) ***REMOVED***
      const ***REMOVED*** height, width ***REMOVED*** = getWindowSizes(popper.ownerDocument);
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
  const isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
***REMOVED***

function getArea(***REMOVED*** width, height ***REMOVED***) ***REMOVED***
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
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement, padding = 0) ***REMOVED***
  if (placement.indexOf('auto') === -1) ***REMOVED***
    return placement;
  ***REMOVED***

  const boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  const rects = ***REMOVED***
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

  const sortedAreas = Object.keys(rects).map(key => _extends(***REMOVED***
    key
  ***REMOVED***, rects[key], ***REMOVED***
    area: getArea(rects[key])
  ***REMOVED***)).sort((a, b) => b.area - a.area);

  const filteredAreas = sortedAreas.filter((***REMOVED*** width, height ***REMOVED***) => width >= popper.clientWidth && height >= popper.clientHeight);

  const computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  const variation = placement.split('-')[1];

  return computedPlacement + (variation ? `-$***REMOVED***variation***REMOVED***` : '');
***REMOVED***

const longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
let timeoutDuration = 0;
for (let i = 0; i < longerTimeoutBrowsers.length; i += 1) ***REMOVED***
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) ***REMOVED***
    timeoutDuration = 1;
    break;
  ***REMOVED***
***REMOVED***

function microtaskDebounce(fn) ***REMOVED***
  let called = false;
  return () => ***REMOVED***
    if (called) ***REMOVED***
      return;
    ***REMOVED***
    called = true;
    window.Promise.resolve().then(() => ***REMOVED***
      called = false;
      fn();
    ***REMOVED***);
  ***REMOVED***;
***REMOVED***

function taskDebounce(fn) ***REMOVED***
  let scheduled = false;
  return () => ***REMOVED***
    if (!scheduled) ***REMOVED***
      scheduled = true;
      setTimeout(() => ***REMOVED***
        scheduled = false;
        fn();
      ***REMOVED***, timeoutDuration);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***

const supportsMicroTasks = isBrowser && window.Promise;

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
    return arr.findIndex(cur => cur[prop] === value);
  ***REMOVED***

  // use `find` + `indexOf` if `findIndex` isn't supported
  const match = find(arr, obj => obj[prop] === value);
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
  let elementRect;
  if (element.nodeName === 'HTML') ***REMOVED***
    const ***REMOVED*** width, height ***REMOVED*** = getWindowSizes(element.ownerDocument);
    elementRect = ***REMOVED***
      width,
      height,
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
  const styles = getComputedStyle(element);
  const x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  const y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  const result = ***REMOVED***
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
  const hash = ***REMOVED*** left: 'right', right: 'left', bottom: 'top', top: 'bottom' ***REMOVED***;
  return placement.replace(/left|right|bottom|top/g, matched => hash[matched]);
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
  const popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  const popperOffsets = ***REMOVED***
    width: popperRect.width,
    height: popperRect.height
  ***REMOVED***;

  // depending by the popper placement we have to compute its offsets slightly differently
  const isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  const mainSide = isHoriz ? 'top' : 'left';
  const secondarySide = isHoriz ? 'left' : 'top';
  const measurement = isHoriz ? 'height' : 'width';
  const secondaryMeasurement = !isHoriz ? 'height' : 'width';

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
function getReferenceOffsets(state, popper, reference, fixedPosition = null) ***REMOVED***
  const commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
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
  const prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  const upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (let i = 0; i < prefixes.length; i++) ***REMOVED***
    const prefix = prefixes[i];
    const toCheck = prefix ? `$***REMOVED***prefix***REMOVED***$***REMOVED***upperProp***REMOVED***` : property;
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
  const getType = ***REMOVED******REMOVED***;
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
***REMOVED***

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns ***REMOVED***Boolean***REMOVED***
 */
function isModifierEnabled(modifiers, modifierName) ***REMOVED***
  return modifiers.some((***REMOVED*** name, enabled ***REMOVED***) => enabled && name === modifierName);
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
  const requesting = find(modifiers, (***REMOVED*** name ***REMOVED***) => name === requestingName);

  const isRequired = !!requesting && modifiers.some(modifier => ***REMOVED***
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  ***REMOVED***);

  if (!isRequired) ***REMOVED***
    const requesting = `\`$***REMOVED***requestingName***REMOVED***\``;
    const requested = `\`$***REMOVED***requestedName***REMOVED***\``;
    console.warn(`$***REMOVED***requested***REMOVED*** modifier is required by $***REMOVED***requesting***REMOVED*** modifier in order to work, be sure to include it before $***REMOVED***requesting***REMOVED***!`);
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
  const ownerDocument = element.ownerDocument;
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
  state.scrollParents.forEach(target => ***REMOVED***
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
  const modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(modifier => ***REMOVED***
    if (modifier['function']) ***REMOVED***
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    ***REMOVED***
    const fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
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
    const value = attributes[prop];
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
  Object.keys(styles).forEach(prop => ***REMOVED***
    let unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) ***REMOVED***
      unit = 'px';
    ***REMOVED***
    element.style[prop] = styles[prop] + unit;
  ***REMOVED***);
***REMOVED***

function attachToScrollParents(scrollParent, event, callback, scrollParents) ***REMOVED***
  const isBody = scrollParent.nodeName === 'BODY';
  const target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
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
  const scrollElement = getScrollParent(reference);
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
  computeAutoPlacement,
  debounce,
  findIndex,
  getBordersSize,
  getBoundaries,
  getBoundingClientRect,
  getClientRect,
  getOffsetParent,
  getOffsetRect,
  getOffsetRectRelativeToArbitraryNode,
  getOuterSizes,
  getParentNode,
  getPopperOffsets,
  getReferenceOffsets,
  getScroll,
  getScrollParent,
  getStyleComputedProperty,
  getSupportedPropertyName,
  getWindowSizes,
  isFixed,
  isFunction,
  isModifierEnabled,
  isModifierRequired,
  isNumeric,
  removeEventListeners,
  runModifiers,
  setAttributes,
  setStyles,
  setupEventListeners
***REMOVED***;

export ***REMOVED*** computeAutoPlacement, debounce, findIndex, getBordersSize, getBoundaries, getBoundingClientRect, getClientRect, getOffsetParent, getOffsetRect, getOffsetRectRelativeToArbitraryNode, getOuterSizes, getParentNode, getPopperOffsets, getReferenceOffsets, getScroll, getScrollParent, getStyleComputedProperty, getSupportedPropertyName, getWindowSizes, isFixed, isFunction, isModifierEnabled, isModifierRequired, isNumeric, removeEventListeners, runModifiers, setAttributes, setStyles, setupEventListeners ***REMOVED***;
export default index;
//# sourceMappingURL=popper-utils.js.map
