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
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

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
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() ***REMOVED***
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) ***REMOVED***
    return;
  ***REMOVED***

  let data = ***REMOVED***
    instance: this,
    styles: ***REMOVED******REMOVED***,
    arrowStyles: ***REMOVED******REMOVED***,
    attributes: ***REMOVED******REMOVED***,
    flipped: false,
    offsets: ***REMOVED******REMOVED***
  ***REMOVED***;

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) ***REMOVED***
    this.state.isCreated = true;
    this.options.onCreate(data);
  ***REMOVED*** else ***REMOVED***
    this.options.onUpdate(data);
  ***REMOVED***
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
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() ***REMOVED***
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) ***REMOVED***
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  ***REMOVED***

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) ***REMOVED***
    this.popper.parentNode.removeChild(this.popper);
  ***REMOVED***
  return this;
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

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() ***REMOVED***
  if (!this.state.eventsEnabled) ***REMOVED***
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  ***REMOVED***
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
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() ***REMOVED***
  if (this.state.eventsEnabled) ***REMOVED***
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  ***REMOVED***
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
 * @function
 * @memberof Modifiers
 * @argument ***REMOVED***Object***REMOVED*** data - The data object generated by `update` method
 * @argument ***REMOVED***Object***REMOVED*** data.styles - List of style properties - values to apply to popper element
 * @argument ***REMOVED***Object***REMOVED*** data.attributes - List of attribute properties - values to apply to popper element
 * @argument ***REMOVED***Object***REMOVED*** options - Modifiers configuration and options
 * @returns ***REMOVED***Object***REMOVED*** The same data object
 */
function applyStyle(data) ***REMOVED***
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) ***REMOVED***
    setStyles(data.arrowElement, data.arrowStyles);
  ***REMOVED***

  return data;
***REMOVED***

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param ***REMOVED***HTMLElement***REMOVED*** reference - The reference element used to position the popper
 * @param ***REMOVED***HTMLElement***REMOVED*** popper - The HTML element used as popper
 * @param ***REMOVED***Object***REMOVED*** options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) ***REMOVED***
  // compute reference element offsets
  const referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  const placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, ***REMOVED*** position: options.positionFixed ? 'fixed' : 'absolute' ***REMOVED***);

  return options;
***REMOVED***

/**
 * @function
 * @memberof Modifiers
 * @argument ***REMOVED***Object***REMOVED*** data - The data object generated by `update` method
 * @argument ***REMOVED***Object***REMOVED*** options - Modifiers configuration and options
 * @returns ***REMOVED***Object***REMOVED*** The data object, properly modified
 */
function computeStyle(data, options) ***REMOVED***
  const ***REMOVED*** x, y ***REMOVED*** = options;
  const ***REMOVED*** popper ***REMOVED*** = data.offsets;

  // Remove this legacy support in Popper.js v2
  const legacyGpuAccelerationOption = find(data.instance.modifiers, modifier => modifier.name === 'applyStyle').gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) ***REMOVED***
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  ***REMOVED***
  const gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  const offsetParent = getOffsetParent(data.instance.popper);
  const offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  const styles = ***REMOVED***
    position: popper.position
  ***REMOVED***;

  // Avoid blurry text by using full pixel integers.
  // For pixel-perfect positioning, top/bottom prefers rounded
  // values, while left/right prefers floored values.
  const offsets = ***REMOVED***
    left: Math.floor(popper.left),
    top: Math.round(popper.top),
    bottom: Math.round(popper.bottom),
    right: Math.floor(popper.right)
  ***REMOVED***;

  const sideA = x === 'bottom' ? 'top' : 'bottom';
  const sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  const prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  let left, top;
  if (sideA === 'bottom') ***REMOVED***
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') ***REMOVED***
      top = -offsetParent.clientHeight + offsets.bottom;
    ***REMOVED*** else ***REMOVED***
      top = -offsetParentRect.height + offsets.bottom;
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
    top = offsets.top;
  ***REMOVED***
  if (sideB === 'right') ***REMOVED***
    if (offsetParent.nodeName === 'HTML') ***REMOVED***
      left = -offsetParent.clientWidth + offsets.right;
    ***REMOVED*** else ***REMOVED***
      left = -offsetParentRect.width + offsets.right;
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
    left = offsets.left;
  ***REMOVED***
  if (gpuAcceleration && prefixedProperty) ***REMOVED***
    styles[prefixedProperty] = `translate3d($***REMOVED***left***REMOVED***px, $***REMOVED***top***REMOVED***px, 0)`;
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  ***REMOVED*** else ***REMOVED***
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    const invertTop = sideA === 'bottom' ? -1 : 1;
    const invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = `$***REMOVED***sideA***REMOVED***, $***REMOVED***sideB***REMOVED***`;
  ***REMOVED***

  // Attributes
  const attributes = ***REMOVED***
    'x-placement': data.placement
  ***REMOVED***;

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends(***REMOVED******REMOVED***, attributes, data.attributes);
  data.styles = _extends(***REMOVED******REMOVED***, styles, data.styles);
  data.arrowStyles = _extends(***REMOVED******REMOVED***, data.offsets.arrow, data.arrowStyles);

  return data;
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
 * @function
 * @memberof Modifiers
 * @argument ***REMOVED***Object***REMOVED*** data - The data object generated by update method
 * @argument ***REMOVED***Object***REMOVED*** options - Modifiers configuration and options
 * @returns ***REMOVED***Object***REMOVED*** The data object, properly modified
 */
function arrow(data, options) ***REMOVED***
  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) ***REMOVED***
    return data;
  ***REMOVED***

  let arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') ***REMOVED***
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) ***REMOVED***
      return data;
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) ***REMOVED***
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    ***REMOVED***
  ***REMOVED***

  const placement = data.placement.split('-')[0];
  const ***REMOVED*** popper, reference ***REMOVED*** = data.offsets;
  const isVertical = ['left', 'right'].indexOf(placement) !== -1;

  const len = isVertical ? 'height' : 'width';
  const sideCapitalized = isVertical ? 'Top' : 'Left';
  const side = sideCapitalized.toLowerCase();
  const altSide = isVertical ? 'left' : 'top';
  const opSide = isVertical ? 'bottom' : 'right';
  const arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) ***REMOVED***
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  ***REMOVED***
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) ***REMOVED***
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  ***REMOVED***
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  const center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  const css = getStyleComputedProperty(data.instance.popper);
  const popperMarginSide = parseFloat(css[`margin$***REMOVED***sideCapitalized***REMOVED***`], 10);
  const popperBorderSide = parseFloat(css[`border$***REMOVED***sideCapitalized***REMOVED***Width`], 10);
  let sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = ***REMOVED***
    [side]: Math.round(sideValue),
    [altSide]: '' // make sure to unset any eventual altSide value from the DOM node
  ***REMOVED***;

  return data;
***REMOVED***

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***String***REMOVED*** placement variation
 * @returns ***REMOVED***String***REMOVED*** flipped placement variation
 */
function getOppositeVariation(variation) ***REMOVED***
  if (variation === 'end') ***REMOVED***
    return 'start';
  ***REMOVED*** else if (variation === 'start') ***REMOVED***
    return 'end';
  ***REMOVED***
  return variation;
***REMOVED***

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type ***REMOVED***Array***REMOVED***
 * @enum ***REMOVED***String***REMOVED***
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
const validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument ***REMOVED***String***REMOVED*** placement - A valid placement (it accepts variations)
 * @argument ***REMOVED***Boolean***REMOVED*** counter - Set to true to walk the placements counterclockwise
 * @returns ***REMOVED***Array***REMOVED*** placements including their variations
 */
function clockwise(placement, counter = false) ***REMOVED***
  const index = validPlacements.indexOf(placement);
  const arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
***REMOVED***

const BEHAVIORS = ***REMOVED***
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
***REMOVED***;

/**
 * @function
 * @memberof Modifiers
 * @argument ***REMOVED***Object***REMOVED*** data - The data object generated by update method
 * @argument ***REMOVED***Object***REMOVED*** options - Modifiers configuration and options
 * @returns ***REMOVED***Object***REMOVED*** The data object, properly modified
 */
function flip(data, options) ***REMOVED***
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) ***REMOVED***
    return data;
  ***REMOVED***

  if (data.flipped && data.placement === data.originalPlacement) ***REMOVED***
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  ***REMOVED***

  const boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  let placement = data.placement.split('-')[0];
  let placementOpposite = getOppositePlacement(placement);
  let variation = data.placement.split('-')[1] || '';

  let flipOrder = [];

  switch (options.behavior) ***REMOVED***
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  ***REMOVED***

  flipOrder.forEach((step, index) => ***REMOVED***
    if (placement !== step || flipOrder.length === index + 1) ***REMOVED***
      return data;
    ***REMOVED***

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    const popperOffsets = data.offsets.popper;
    const refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    const floor = Math.floor;
    const overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    const overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    const overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    const overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    const overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    const overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    const isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    const flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    if (overlapsRef || overflowsBoundaries || flippedVariation) ***REMOVED***
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) ***REMOVED***
        placement = flipOrder[index + 1];
      ***REMOVED***

      if (flippedVariation) ***REMOVED***
        variation = getOppositeVariation(variation);
      ***REMOVED***

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends(***REMOVED******REMOVED***, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    ***REMOVED***
  ***REMOVED***);
  return data;
***REMOVED***

/**
 * @function
 * @memberof Modifiers
 * @argument ***REMOVED***Object***REMOVED*** data - The data object generated by update method
 * @argument ***REMOVED***Object***REMOVED*** options - Modifiers configuration and options
 * @returns ***REMOVED***Object***REMOVED*** The data object, properly modified
 */
function keepTogether(data) ***REMOVED***
  const ***REMOVED*** popper, reference ***REMOVED*** = data.offsets;
  const placement = data.placement.split('-')[0];
  const floor = Math.floor;
  const isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  const side = isVertical ? 'right' : 'bottom';
  const opSide = isVertical ? 'left' : 'top';
  const measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) ***REMOVED***
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  ***REMOVED***
  if (popper[opSide] > floor(reference[side])) ***REMOVED***
    data.offsets.popper[opSide] = floor(reference[side]);
  ***REMOVED***

  return data;
***REMOVED***

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof ***REMOVED***modifiers~offset***REMOVED***
 * @private
 * @argument ***REMOVED***String***REMOVED*** str - Value + unit string
 * @argument ***REMOVED***String***REMOVED*** measurement - `height` or `width`
 * @argument ***REMOVED***Object***REMOVED*** popperOffsets
 * @argument ***REMOVED***Object***REMOVED*** referenceOffsets
 * @returns ***REMOVED***Number|String***REMOVED***
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) ***REMOVED***
  // separate value from unit
  const split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  const value = +split[1];
  const unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) ***REMOVED***
    return str;
  ***REMOVED***

  if (unit.indexOf('%') === 0) ***REMOVED***
    let element;
    switch (unit) ***REMOVED***
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    ***REMOVED***

    const rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  ***REMOVED*** else if (unit === 'vh' || unit === 'vw') ***REMOVED***
    // if is a vh or vw, we calculate the size based on the viewport
    let size;
    if (unit === 'vh') ***REMOVED***
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    ***REMOVED*** else ***REMOVED***
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    ***REMOVED***
    return size / 100 * value;
  ***REMOVED*** else ***REMOVED***
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  ***REMOVED***
***REMOVED***

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof ***REMOVED***modifiers~offset***REMOVED***
 * @private
 * @argument ***REMOVED***String***REMOVED*** offset
 * @argument ***REMOVED***Object***REMOVED*** popperOffsets
 * @argument ***REMOVED***Object***REMOVED*** referenceOffsets
 * @argument ***REMOVED***String***REMOVED*** basePlacement
 * @returns ***REMOVED***Array***REMOVED*** a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) ***REMOVED***
  const offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  const useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  const fragments = offset.split(/(\+|\-)/).map(frag => frag.trim());

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  const divider = fragments.indexOf(find(fragments, frag => frag.search(/,|\s/) !== -1));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) ***REMOVED***
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  ***REMOVED***

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  const splitRegex = /\s*,\s*|\s+/;
  let ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map((op, index) => ***REMOVED***
    // Most of the units rely on the orientation of the popper
    const measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    let mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce((a, b) => ***REMOVED***
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) ***REMOVED***
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      ***REMOVED*** else if (mergeWithPrevious) ***REMOVED***
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      ***REMOVED*** else ***REMOVED***
        return a.concat(b);
      ***REMOVED***
    ***REMOVED***, [])
    // Here we convert the string values into number values (in px)
    .map(str => toValue(str, measurement, popperOffsets, referenceOffsets));
  ***REMOVED***);

  // Loop trough the offsets arrays and execute the operations
  ops.forEach((op, index) => ***REMOVED***
    op.forEach((frag, index2) => ***REMOVED***
      if (isNumeric(frag)) ***REMOVED***
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***);
  return offsets;
***REMOVED***

/**
 * @function
 * @memberof Modifiers
 * @argument ***REMOVED***Object***REMOVED*** data - The data object generated by update method
 * @argument ***REMOVED***Object***REMOVED*** options - Modifiers configuration and options
 * @argument ***REMOVED***Number|String***REMOVED*** options.offset=0
 * The offset value as described in the modifier description
 * @returns ***REMOVED***Object***REMOVED*** The data object, properly modified
 */
function offset(data, ***REMOVED*** offset ***REMOVED***) ***REMOVED***
  const ***REMOVED*** placement, offsets: ***REMOVED*** popper, reference ***REMOVED*** ***REMOVED*** = data;
  const basePlacement = placement.split('-')[0];

  let offsets;
  if (isNumeric(+offset)) ***REMOVED***
    offsets = [+offset, 0];
  ***REMOVED*** else ***REMOVED***
    offsets = parseOffset(offset, popper, reference, basePlacement);
  ***REMOVED***

  if (basePlacement === 'left') ***REMOVED***
    popper.top += offsets[0];
    popper.left -= offsets[1];
  ***REMOVED*** else if (basePlacement === 'right') ***REMOVED***
    popper.top += offsets[0];
    popper.left += offsets[1];
  ***REMOVED*** else if (basePlacement === 'top') ***REMOVED***
    popper.left += offsets[0];
    popper.top -= offsets[1];
  ***REMOVED*** else if (basePlacement === 'bottom') ***REMOVED***
    popper.left += offsets[0];
    popper.top += offsets[1];
  ***REMOVED***

  data.popper = popper;
  return data;
***REMOVED***

/**
 * @function
 * @memberof Modifiers
 * @argument ***REMOVED***Object***REMOVED*** data - The data object generated by `update` method
 * @argument ***REMOVED***Object***REMOVED*** options - Modifiers configuration and options
 * @returns ***REMOVED***Object***REMOVED*** The data object, properly modified
 */
function preventOverflow(data, options) ***REMOVED***
  let boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) ***REMOVED***
    boundariesElement = getOffsetParent(boundariesElement);
  ***REMOVED***

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  const transformProp = getSupportedPropertyName('transform');
  const popperStyles = data.instance.popper.style; // assignment to help minification
  const ***REMOVED*** top, left, [transformProp]: transform ***REMOVED*** = popperStyles;
  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  const boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  const order = options.priority;
  let popper = data.offsets.popper;

  const check = ***REMOVED***
    primary(placement) ***REMOVED***
      let value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) ***REMOVED***
        value = Math.max(popper[placement], boundaries[placement]);
      ***REMOVED***
      return ***REMOVED*** [placement]: value ***REMOVED***;
    ***REMOVED***,
    secondary(placement) ***REMOVED***
      const mainSide = placement === 'right' ? 'left' : 'top';
      let value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) ***REMOVED***
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      ***REMOVED***
      return ***REMOVED*** [mainSide]: value ***REMOVED***;
    ***REMOVED***
  ***REMOVED***;

  order.forEach(placement => ***REMOVED***
    const side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends(***REMOVED******REMOVED***, popper, check[side](placement));
  ***REMOVED***);

  data.offsets.popper = popper;

  return data;
***REMOVED***

/**
 * @function
 * @memberof Modifiers
 * @argument ***REMOVED***Object***REMOVED*** data - The data object generated by `update` method
 * @argument ***REMOVED***Object***REMOVED*** options - Modifiers configuration and options
 * @returns ***REMOVED***Object***REMOVED*** The data object, properly modified
 */
function shift(data) ***REMOVED***
  const placement = data.placement;
  const basePlacement = placement.split('-')[0];
  const shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) ***REMOVED***
    const ***REMOVED*** reference, popper ***REMOVED*** = data.offsets;
    const isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    const side = isVertical ? 'left' : 'top';
    const measurement = isVertical ? 'width' : 'height';

    const shiftOffsets = ***REMOVED***
      start: ***REMOVED*** [side]: reference[side] ***REMOVED***,
      end: ***REMOVED***
        [side]: reference[side] + reference[measurement] - popper[measurement]
      ***REMOVED***
    ***REMOVED***;

    data.offsets.popper = _extends(***REMOVED******REMOVED***, popper, shiftOffsets[shiftvariation]);
  ***REMOVED***

  return data;
***REMOVED***

/**
 * @function
 * @memberof Modifiers
 * @argument ***REMOVED***Object***REMOVED*** data - The data object generated by update method
 * @argument ***REMOVED***Object***REMOVED*** options - Modifiers configuration and options
 * @returns ***REMOVED***Object***REMOVED*** The data object, properly modified
 */
function hide(data) ***REMOVED***
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) ***REMOVED***
    return data;
  ***REMOVED***

  const refRect = data.offsets.reference;
  const bound = find(data.instance.modifiers, modifier => modifier.name === 'preventOverflow').boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) ***REMOVED***
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) ***REMOVED***
      return data;
    ***REMOVED***

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  ***REMOVED*** else ***REMOVED***
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) ***REMOVED***
      return data;
    ***REMOVED***

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  ***REMOVED***

  return data;
***REMOVED***

/**
 * @function
 * @memberof Modifiers
 * @argument ***REMOVED***Object***REMOVED*** data - The data object generated by `update` method
 * @argument ***REMOVED***Object***REMOVED*** options - Modifiers configuration and options
 * @returns ***REMOVED***Object***REMOVED*** The data object, properly modified
 */
function inner(data) ***REMOVED***
  const placement = data.placement;
  const basePlacement = placement.split('-')[0];
  const ***REMOVED*** popper, reference ***REMOVED*** = data.offsets;
  const isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  const subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
***REMOVED***

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument ***REMOVED***dataObject***REMOVED*** data - The data object generated by `update` method
 * @argument ***REMOVED***Object***REMOVED*** options - Modifiers configuration and options
 * @returns ***REMOVED***dataObject***REMOVED*** The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = ***REMOVED***
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: ***REMOVED***
    /** @prop ***REMOVED***number***REMOVED*** order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop ***REMOVED***Boolean***REMOVED*** enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop ***REMOVED***ModifierFn***REMOVED*** */
    fn: shift
  ***REMOVED***,

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: ***REMOVED***
    /** @prop ***REMOVED***number***REMOVED*** order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop ***REMOVED***Boolean***REMOVED*** enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop ***REMOVED***ModifierFn***REMOVED*** */
    fn: offset,
    /** @prop ***REMOVED***Number|String***REMOVED*** offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  ***REMOVED***,

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: ***REMOVED***
    /** @prop ***REMOVED***number***REMOVED*** order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop ***REMOVED***Boolean***REMOVED*** enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop ***REMOVED***ModifierFn***REMOVED*** */
    fn: preventOverflow,
    /**
     * @prop ***REMOVED***Array***REMOVED*** [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop ***REMOVED***number***REMOVED*** padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop ***REMOVED***String|HTMLElement***REMOVED*** boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  ***REMOVED***,

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: ***REMOVED***
    /** @prop ***REMOVED***number***REMOVED*** order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop ***REMOVED***Boolean***REMOVED*** enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop ***REMOVED***ModifierFn***REMOVED*** */
    fn: keepTogether
  ***REMOVED***,

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: ***REMOVED***
    /** @prop ***REMOVED***number***REMOVED*** order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop ***REMOVED***Boolean***REMOVED*** enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop ***REMOVED***ModifierFn***REMOVED*** */
    fn: arrow,
    /** @prop ***REMOVED***String|HTMLElement***REMOVED*** element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  ***REMOVED***,

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: ***REMOVED***
    /** @prop ***REMOVED***number***REMOVED*** order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop ***REMOVED***Boolean***REMOVED*** enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop ***REMOVED***ModifierFn***REMOVED*** */
    fn: flip,
    /**
     * @prop ***REMOVED***String|Array***REMOVED*** behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop ***REMOVED***number***REMOVED*** padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop ***REMOVED***String|HTMLElement***REMOVED*** boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport'
  ***REMOVED***,

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: ***REMOVED***
    /** @prop ***REMOVED***number***REMOVED*** order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop ***REMOVED***Boolean***REMOVED*** enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop ***REMOVED***ModifierFn***REMOVED*** */
    fn: inner
  ***REMOVED***,

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: ***REMOVED***
    /** @prop ***REMOVED***number***REMOVED*** order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop ***REMOVED***Boolean***REMOVED*** enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop ***REMOVED***ModifierFn***REMOVED*** */
    fn: hide
  ***REMOVED***,

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: ***REMOVED***
    /** @prop ***REMOVED***number***REMOVED*** order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop ***REMOVED***Boolean***REMOVED*** enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop ***REMOVED***ModifierFn***REMOVED*** */
    fn: computeStyle,
    /**
     * @prop ***REMOVED***Boolean***REMOVED*** gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop ***REMOVED***string***REMOVED*** [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop ***REMOVED***string***REMOVED*** [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  ***REMOVED***,

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: ***REMOVED***
    /** @prop ***REMOVED***number***REMOVED*** order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop ***REMOVED***Boolean***REMOVED*** enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop ***REMOVED***ModifierFn***REMOVED*** */
    fn: applyStyle,
    /** @prop ***REMOVED***Function***REMOVED*** */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop ***REMOVED***Boolean***REMOVED*** gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  ***REMOVED***
***REMOVED***;

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property ***REMOVED***Object***REMOVED*** data.instance The Popper.js instance
 * @property ***REMOVED***String***REMOVED*** data.placement Placement applied to popper
 * @property ***REMOVED***String***REMOVED*** data.originalPlacement Placement originally defined on init
 * @property ***REMOVED***Boolean***REMOVED*** data.flipped True if popper has been flipped by flip modifier
 * @property ***REMOVED***Boolean***REMOVED*** data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property ***REMOVED***HTMLElement***REMOVED*** data.arrowElement Node used as arrow by arrow modifier
 * @property ***REMOVED***Object***REMOVED*** data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property ***REMOVED***Object***REMOVED*** data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property ***REMOVED***Object***REMOVED*** data.boundaries Offsets of the popper boundaries
 * @property ***REMOVED***Object***REMOVED*** data.offsets The measurements of popper, reference and arrow elements
 * @property ***REMOVED***Object***REMOVED*** data.offsets.popper `top`, `left`, `width`, `height` values
 * @property ***REMOVED***Object***REMOVED*** data.offsets.reference `top`, `left`, `width`, `height` values
 * @property ***REMOVED***Object***REMOVED*** data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, ***REMOVED***
 *   modifiers: ***REMOVED***
 *     preventOverflow: ***REMOVED*** enabled: false ***REMOVED***
 *   ***REMOVED***
 * ***REMOVED***)
 * ```
 * @type ***REMOVED***Object***REMOVED***
 * @static
 * @memberof Popper
 */
var Defaults = ***REMOVED***
  /**
   * Popper's placement.
   * @prop ***REMOVED***Popper.placements***REMOVED*** placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop ***REMOVED***Boolean***REMOVED*** positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop ***REMOVED***Boolean***REMOVED*** eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop ***REMOVED***Boolean***REMOVED*** removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop ***REMOVED***onCreate***REMOVED***
   */
  onCreate: () => ***REMOVED******REMOVED***,

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop ***REMOVED***onUpdate***REMOVED***
   */
  onUpdate: () => ***REMOVED******REMOVED***,

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop ***REMOVED***modifiers***REMOVED***
   */
  modifiers
***REMOVED***;

/**
 * @callback onCreate
 * @param ***REMOVED***dataObject***REMOVED*** data
 */

/**
 * @callback onUpdate
 * @param ***REMOVED***dataObject***REMOVED*** data
 */

// Utils
// Methods
class Popper ***REMOVED***
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param ***REMOVED***HTMLElement|referenceObject***REMOVED*** reference - The reference element used to position the popper
   * @param ***REMOVED***HTMLElement***REMOVED*** popper - The HTML element used as the popper
   * @param ***REMOVED***Object***REMOVED*** options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return ***REMOVED***Object***REMOVED*** instance - The generated Popper.js instance
   */
  constructor(reference, popper, options = ***REMOVED******REMOVED***) ***REMOVED***
    this.scheduleUpdate = () => requestAnimationFrame(this.update);

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with ***REMOVED******REMOVED*** we create a new object with the options inside it
    this.options = _extends(***REMOVED******REMOVED***, Popper.Defaults, options);

    // init state
    this.state = ***REMOVED***
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    ***REMOVED***;

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = ***REMOVED******REMOVED***;
    Object.keys(_extends(***REMOVED******REMOVED***, Popper.Defaults.modifiers, options.modifiers)).forEach(name => ***REMOVED***
      this.options.modifiers[name] = _extends(***REMOVED******REMOVED***, Popper.Defaults.modifiers[name] || ***REMOVED******REMOVED***, options.modifiers ? options.modifiers[name] : ***REMOVED******REMOVED***);
    ***REMOVED***);

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(name => _extends(***REMOVED***
      name
    ***REMOVED***, this.options.modifiers[name]))
    // sort the modifiers by order
    .sort((a, b) => a.order - b.order);

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(modifierOptions => ***REMOVED***
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) ***REMOVED***
        modifierOptions.onLoad(this.reference, this.popper, this.options, modifierOptions, this.state);
      ***REMOVED***
    ***REMOVED***);

    // fire the first update to position the popper in the right place
    this.update();

    const eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) ***REMOVED***
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    ***REMOVED***

    this.state.eventsEnabled = eventsEnabled;
  ***REMOVED***

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs
  update() ***REMOVED***
    return update.call(this);
  ***REMOVED***
  destroy() ***REMOVED***
    return destroy.call(this);
  ***REMOVED***
  enableEventListeners() ***REMOVED***
    return enableEventListeners.call(this);
  ***REMOVED***
  disableEventListeners() ***REMOVED***
    return disableEventListeners.call(this);
  ***REMOVED***

  /**
   * Schedules an update. It will run on the next UI update available.
   * @method scheduleUpdate
   * @memberof Popper
   */


  /**
   * Collection of utilities useful when writing custom modifiers.
   * Starting from version 1.7, this method is available only if you
   * include `popper-utils.js` before `popper.js`.
   *
   * **DEPRECATION**: This way to access PopperUtils is deprecated
   * and will be removed in v2! Use the PopperUtils module directly instead.
   * Due to the high instability of the methods contained in Utils, we can't
   * guarantee them to follow semver. Use them at your own risk!
   * @static
   * @private
   * @type ***REMOVED***Object***REMOVED***
   * @deprecated since version 1.8
   * @member Utils
   * @memberof Popper
   */
***REMOVED***

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property ***REMOVED***Function***REMOVED*** data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property ***REMOVED***number***REMOVED*** data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property ***REMOVED***number***REMOVED*** data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */

Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

export default Popper;
//# sourceMappingURL=popper.js.map
