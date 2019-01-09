/**
 * @fileoverview This file only declares the public portions of the API.
 * It should not define internal pieces such as utils or modifier details.
 *
 * Original definitions by: edcarroll <https://github.com/edcarroll>, ggray <https://github.com/giladgray>, rhysd <https://rhysd.github.io>, joscha <https://github.com/joscha>, seckardt <https://github.com/seckardt>, marcfallows <https://github.com/marcfallows>
 */

/**
 * This kind of namespace declaration is not necessary, but is kept here for backwards-compatibility with
 * popper.js 1.x. It can be removed in 2.x so that the default export is simply the Popper class
 * and all the types / interfaces are top-level named exports.
 */
declare namespace Popper ***REMOVED***
  export type Position = 'top' | 'right' | 'bottom' | 'left';

  export type Placement = 'auto-start'
    | 'auto'
    | 'auto-end'
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-end'
    | 'bottom'
    | 'bottom-start'
    | 'left-end'
    | 'left'
    | 'left-start';

  export type Boundary = 'scrollParent' | 'viewport' | 'window';

  export type Behavior = 'flip' | 'clockwise' | 'counterclockwise';

  export type ModifierFn = (data: Data, options: Object) => Data;

  export interface BaseModifier ***REMOVED***
    order?: number;
    enabled?: boolean;
    fn?: ModifierFn;
  ***REMOVED***

  export interface Modifiers ***REMOVED***
    shift?: BaseModifier;
    offset?: BaseModifier & ***REMOVED***
      offset?: number | string,
    ***REMOVED***;
    preventOverflow?: BaseModifier & ***REMOVED***
      priority?: Position[],
      padding?: number,
      boundariesElement?: Boundary | Element,
      escapeWithReference?: boolean
    ***REMOVED***;
    keepTogether?: BaseModifier;
    arrow?: BaseModifier & ***REMOVED***
      element?: string | Element,
    ***REMOVED***;
    flip?: BaseModifier & ***REMOVED***
      behavior?: Behavior | Position[],
      padding?: number,
      boundariesElement?: Boundary | Element,
    ***REMOVED***;
    inner?: BaseModifier;
    hide?: BaseModifier;
    applyStyle?: BaseModifier & ***REMOVED***
      onLoad?: Function,
      gpuAcceleration?: boolean,
    ***REMOVED***;
    computeStyle?: BaseModifier & ***REMOVED***
      gpuAcceleration?: boolean;
      x?: 'bottom' | 'top',
      y?: 'left' | 'right'
    ***REMOVED***;

    [name: string]: (BaseModifier & Record<string, any>) | undefined;
  ***REMOVED***

  export interface Offset ***REMOVED***
    top: number;
    left: number;
    width: number;
    height: number;
  ***REMOVED***

  export interface Data ***REMOVED***
    instance: Popper;
    placement: Placement;
    originalPlacement: Placement;
    flipped: boolean;
    hide: boolean;
    arrowElement: Element;
    styles: CSSStyleDeclaration;
    arrowStyles: CSSStyleDeclaration;
    boundaries: Object;
    offsets: ***REMOVED***
      popper: Offset,
      reference: Offset,
      arrow: ***REMOVED***
        top: number,
        left: number,
      ***REMOVED***,
    ***REMOVED***;
  ***REMOVED***

  export interface PopperOptions ***REMOVED***
    placement?: Placement;
    positionFixed?: boolean;
    eventsEnabled?: boolean;
    modifiers?: Modifiers;
    removeOnDestroy?: boolean;

    onCreate?(data: Data): void;

    onUpdate?(data: Data): void;
  ***REMOVED***

  export interface ReferenceObject ***REMOVED***
    clientHeight: number;
    clientWidth: number;

    getBoundingClientRect(): ClientRect;
  ***REMOVED***
***REMOVED***

// Re-export types in the Popper namespace so that they can be accessed as top-level named exports.
// These re-exports should be removed in 2.x when the "declare namespace Popper" syntax is removed.
export type Position = Popper.Position;
export type Placement = Popper.Placement;
export type Boundary = Popper.Boundary;
export type Behavior = Popper.Behavior;
export type ModifierFn = Popper.ModifierFn;
export type BaseModifier = Popper.BaseModifier;
export type Modifiers = Popper.Modifiers;
export type Offset = Popper.Offset;
export type Data = Popper.Data;
export type PopperOptions = Popper.PopperOptions;
export type ReferenceObject = Popper.ReferenceObject;

declare class Popper ***REMOVED***
  static modifiers: (BaseModifier & ***REMOVED*** name: string ***REMOVED***)[];
  static placements: Placement[];
  static Defaults: PopperOptions;

  options: PopperOptions;

  constructor(reference: Element | ReferenceObject, popper: Element, options?: PopperOptions);

  destroy(): void;

  update(): void;

  scheduleUpdate(): void;

  enableEventListeners(): void;

  disableEventListeners(): void;
***REMOVED***

export default Popper;
