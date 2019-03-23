// Type definitions for PIXI with Phaser Deviations. 

declare module PIXI ***REMOVED***

    export var game: Phaser.Game;
    export var WEBGL_RENDERER: number;
    export var CANVAS_RENDERER: number;
    export var VERSION: string;

    export enum blendModes ***REMOVED***

        NORMAL,
        ADD,
        MULTIPLY,
        SCREEN,
        OVERLAY,
        DARKEN,
        LIGHTEN,
        COLOR_DODGE,
        COLOR_BURN,
        HARD_LIGHT,
        SOFT_LIGHT,
        DIFFERENCE,
        EXCLUSION,
        HUE,
        SATURATION,
        COLOR,
        LUMINOSITY

    ***REMOVED***

    export enum scaleModes ***REMOVED***

        DEFAULT,
        LINEAR,
        NEAREST

    ***REMOVED***

    export var defaultRenderOptions: PixiRendererOptions;

    export var INTERACTION_REQUENCY: number;
    export var AUTO_PREVENT_DEFAULT: boolean;

    export var PI_2: number;
    export var RAD_TO_DEG: number;
    export var DEG_TO_RAD: number;

    export var RETINA_PREFIX: string;
    export var identityMatrix: Matrix;
    export var glContexts: WebGLRenderingContext[];
    export var instances: any[];

    export var TextureSilentFail: boolean;
    export var BitmapText: ***REMOVED*** fonts: ***REMOVED******REMOVED*** ***REMOVED***;

    export function isPowerOfTwo(width: number, height: number): boolean;

    export function rgb2hex(rgb: number[]): string;
    export function hex2rgb(hex: string): number[];

    export function autoDetectRenderer(width?: number, height?: number, options?: PixiRendererOptions): PixiRenderer;
    export function autoDetectRecommendedRenderer(width?: number, height?: number, options?: PixiRendererOptions): PixiRenderer;

    export function canUseNewCanvasBlendModes(): boolean;
    export function getNextPowerOfTwo(value: number): number;

    export function AjaxRequest(): XMLHttpRequest;

    export function CompileFragmentShader(gl: WebGLRenderingContext, shaderSrc: string[]): any;
    export function CompileProgram(gl: WebGLRenderingContext, vertexSrc: string[], fragmentSrc: string[]): any;


    export interface IEventCallback ***REMOVED***
        (e?: IEvent): void;
    ***REMOVED***

    export interface IEvent ***REMOVED***
        type: string;
        content: any;
    ***REMOVED***

    export interface HitArea ***REMOVED***
        contains(x: number, y: number): boolean;
    ***REMOVED***

    export interface IInteractionDataCallback ***REMOVED***
        (interactionData: InteractionData): void;
    ***REMOVED***

    export interface PixiRenderer ***REMOVED***

        autoResize: boolean;
        clearBeforeRender: boolean;
        height: number;
        resolution: number;
        transparent: boolean;
        type: number;
        view: HTMLCanvasElement;
        width: number;

        destroy(): void;
        render(stage: DisplayObjectContainer): void;
        resize(width: number, height: number): void;

    ***REMOVED***

    export interface PixiRendererOptions ***REMOVED***

        autoResize?: boolean;
        antialias?: boolean;
        clearBeforeRender?: boolean;
        preserveDrawingBuffer?: boolean;
        resolution?: number;
        transparent?: boolean;
        view?: HTMLCanvasElement;

    ***REMOVED***

    export interface BitmapTextStyle ***REMOVED***

        font?: string;
        align?: string;
        tint?: string;

    ***REMOVED***

    export interface TextStyle ***REMOVED***

        align?: string;
        dropShadow?: boolean;
        dropShadowColor?: string;
        dropShadowAngle?: number;
        dropShadowDistance?: number;
        fill?: string;
        font?: string;
        lineJoin?: string;
        stroke?: string;
        strokeThickness?: number;
        wordWrap?: boolean;
        wordWrapWidth?: number;

    ***REMOVED***

    export interface Loader ***REMOVED***

        load(): void;

    ***REMOVED***

    export interface MaskData ***REMOVED***

        alpha: number;
        worldTransform: number[];

    ***REMOVED***

    export interface RenderSession ***REMOVED***

        context: CanvasRenderingContext2D;
        maskManager: CanvasMaskManager;
        scaleMode: scaleModes;
        smoothProperty: string;
        roundPixels: boolean;

    ***REMOVED***

    export interface ShaderAttribute ***REMOVED***
        // TODO: Find signature of shader attributes
    ***REMOVED***

    export interface FilterBlock ***REMOVED***

        visible: boolean;
        renderable: boolean;

    ***REMOVED***


    /**
    * This is the base class for creating a PIXI filter. Currently only webGL supports filters.
    * If you want to make a custom filter this should be your base class.
    */
    export class AbstractFilter ***REMOVED***


        /**
        * This is the base class for creating a PIXI filter. Currently only webGL supports filters.
        * If you want to make a custom filter this should be your base class.
        * 
        * @param fragmentSrc The fragment source in an array of strings.
        * @param uniforms An object containing the uniforms for this filter.
        */
        constructor(fragmentSrc: string | string[], uniforms: any);

        dirty: boolean;
        padding: number;
        uniforms: any;
        fragmentSrc: string | string[];

        apply(frameBuffer: WebGLFramebuffer): void;

        /**
        * Syncs the uniforms between the class object and the shaders.
        */
        syncUniforms(): void;

    ***REMOVED***

    export class AlphaMaskFilter extends AbstractFilter ***REMOVED***

        constructor(texture: Texture);

        map: Texture;

        onTextureLoaded(): void;

    ***REMOVED***

    export class AsciiFilter extends AbstractFilter ***REMOVED***

        size: number;

    ***REMOVED***

    export class AssetLoader implements Mixin ***REMOVED***

        assetURLs: string[];
        crossorigin: boolean;
        loadersByType: ***REMOVED*** [key: string]: Loader ***REMOVED***;

        constructor(assetURLs: string[], crossorigin: boolean);

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        load(): void;


    ***REMOVED***

    export class AtlasLoader implements Mixin ***REMOVED***

        url: string;
        baseUrl: string;
        crossorigin: boolean;
        loaded: boolean;

        constructor(url: string, crossorigin: boolean);

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        load(): void;

    ***REMOVED***


    /**
    * A texture stores the information that represents an image. All textures have a base texture.
    */
    export class BaseTexture implements Mixin ***REMOVED***


        /**
        * Helper function that creates a base texture from the given canvas element.
        * 
        * @param canvas The canvas element source of the texture
        * @param scaleMode See ***REMOVED******REMOVED***#crossLink "PIXI/scaleModes:property"***REMOVED******REMOVED***PIXI.scaleModes***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** for possible values
        */
        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: scaleModes): BaseTexture;


        /**
        * A texture stores the information that represents an image. All textures have a base texture.
        * 
        * @param source the source object (image or canvas)
        * @param scaleMode See ***REMOVED******REMOVED***#crossLink "PIXI/scaleModes:property"***REMOVED******REMOVED***PIXI.scaleModes***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** for possible values
        */
        constructor(source: HTMLImageElement, scaleMode: scaleModes);

        /**
        * A texture stores the information that represents an image. All textures have a base texture.
        * 
        * @param source the source object (image or canvas)
        * @param scaleMode See ***REMOVED******REMOVED***#crossLink "PIXI/scaleModes:property"***REMOVED******REMOVED***PIXI.scaleModes***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** for possible values
        */
        constructor(source: HTMLCanvasElement, scaleMode: scaleModes);


        /**
        * [read-only] The height of the base texture set when the image has loaded
        */
        height: number;

        /**
        * [read-only] Set to true once the base texture has loaded
        */
        hasLoaded: boolean;

        /**
        * Set this to true if a mipmap of this texture needs to be generated. This value needs to be set before the texture is used
        * Also the texture must be a power of two size to work
        */
        mipmap: boolean;

        /**
        * Controls if RGB channels should be pre-multiplied by Alpha  (WebGL only)
        * Default: true
        */
        premultipliedAlpha: boolean;

        /**
        * The Resolution of the texture.
        */
        resolution: number;

        /**
        * The scale mode to apply when scaling this texture
        * Default: PIXI.scaleModes.LINEAR
        */
        scaleMode: scaleModes;

        /**
        * A BaseTexture can be set to skip the rendering phase in the WebGL Sprite Batch.
        * 
        * You may want to do this if you have a parent Sprite with no visible texture (i.e. uses the internal `__default` texture)
        * that has children that you do want to render, without causing a batch flush in the process.
        */
        skipRender: boolean;

        /**
        * The image source that is used to create the texture.
        */
        source: HTMLImageElement;

        /**
        * [read-only] The width of the base texture set when the image has loaded
        */
        width: number;

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        /**
        * Forces this BaseTexture to be set as loaded, with the given width and height.
        * Then calls BaseTexture.dirty.
        * Important for when you don't want to modify the source object by forcing in `complete` or dimension properties it may not have.
        * 
        * @param width - The new width to force the BaseTexture to be.
        * @param height - The new height to force the BaseTexture to be.
        */
        forceLoaded(width: number, height: number): void;

        /**
        * Destroys this base texture
        */
        destroy(): void;

        /**
        * Sets all glTextures to be dirty.
        */
        dirty(): void;

        /**
        * Removes the base texture from the GPU, useful for managing resources on the GPU.
        * Atexture is still 100% usable and will simply be reuploaded if there is a sprite on screen that is using it.
        */
        unloadFromGPU(): void;

    ***REMOVED***

    export class BitmapFontLoader implements Mixin ***REMOVED***

        constructor(url: string, crossorigin: boolean);

        baseUrl: string;
        crossorigin: boolean;
        texture: Texture;
        url: string;

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        load(): void;

    ***REMOVED***

    export class BlurFilter extends AbstractFilter ***REMOVED***

        blur: number;
        blurX: number;
        blurY: number;

    ***REMOVED***

    export class BlurXFilter extends AbstractFilter ***REMOVED***

        blur: number;

    ***REMOVED***

    export class BlurYFilter extends AbstractFilter ***REMOVED***

        blur: number;

    ***REMOVED***


    /**
    * Creates a Canvas element of the given size.
    */
    export class CanvasBuffer ***REMOVED***


        /**
        * Creates a Canvas element of the given size.
        * 
        * @param width the width for the newly created canvas
        * @param height the height for the newly created canvas
        */
        constructor(width: number, height: number);


        /**
        * The Canvas object that belongs to this CanvasBuffer.
        */
        canvas: HTMLCanvasElement;

        /**
        * A CanvasRenderingContext2D object representing a two-dimensional rendering context.
        */
        context: CanvasRenderingContext2D;

        /**
        * The height of the Canvas in pixels.
        */
        height: number;

        /**
        * The width of the Canvas in pixels.
        */
        width: number;


        /**
        * Frees the canvas up for use again.
        */
        destroy(): void;

        /**
        * Clears the canvas that was created by the CanvasBuffer class.
        */
        clear(): void;

        /**
        * Resizes the canvas to the specified width and height.
        * 
        * @param width the new width of the canvas
        * @param height the new height of the canvas
        */
        resize(width: number, height: number): void;

    ***REMOVED***


    /**
    * The CanvasPool is a global static object that allows Pixi and Phaser to pool canvas DOM elements.
    */
    export class CanvasPool ***REMOVED***


        /**
        * Creates a new Canvas DOM element, or pulls one from the pool if free.
        * 
        * @param parent The parent of the canvas element.
        * @param width The width of the canvas element.
        * @param height The height of the canvas element.
        * @return The canvas element.
        */
        static create(parent: HTMLElement, width?: number, height?: number): HTMLCanvasElement;

        /**
        * Gets the first free canvas index from the pool.
        */
        static getFirst(): HTMLCanvasElement;

        /**
        * Removes the parent from a canvas element from the pool, freeing it up for re-use.
        * 
        * @param parent The parent of the canvas element.
        */
        static remove(parent: HTMLElement): void;

        /**
        * Removes the parent from a canvas element from the pool, freeing it up for re-use.
        * 
        * @param canvas The canvas element to remove
        */
        static removeByCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement;

        /**
        * Gets the total number of used canvas elements in the pool.
        * @return The number of in-use (parented) canvas elements in the pool.
        */
        static getTotal(): number;

        /**
        * Gets the total number of free canvas elements in the pool.
        * @return The number of free (un-parented) canvas elements in the pool.
        */
        static getFree(): number;

    ***REMOVED***


    /**
    * A set of functions used to handle masking.
    */
    export class CanvasMaskManager ***REMOVED***


        /**
        * This method adds it to the current stack of masks.
        * 
        * @param maskData the maskData that will be pushed
        * @param renderSession The renderSession whose context will be used for this mask manager.
        */
        pushMask(maskData: MaskData, renderSession: RenderSession): void;

        /**
        * Restores the current drawing context to the state it was before the mask was applied.
        * 
        * @param renderSession The renderSession whose context will be used for this mask manager.
        */
        popMask(renderSession: RenderSession): void;

    ***REMOVED***


    /**
    * The CanvasRenderer draws the Stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.
    * Don't forget to add the CanvasRenderer.view to your DOM or you will not see anything :)
    */
    export class CanvasRenderer implements PixiRenderer ***REMOVED***


        /**
        * The CanvasRenderer draws the Stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.
        * Don't forget to add the CanvasRenderer.view to your DOM or you will not see anything :)
        * 
        * @param game A reference to the Phaser Game instance
        */
        constructor(game: Phaser.Game);

        game: Phaser.Game;

        /**
        * The renderer type.
        */
        type: number;

        /**
        * The resolution of the canvas.
        */
        resolution: number;

        /**
        * This sets if the CanvasRenderer will clear the canvas or not before the new render pass.
        * If the Stage is NOT transparent Pixi will use a canvas sized fillRect operation every frame to set the canvas background color.
        * If the Stage is transparent Pixi will use clearRect to clear the canvas every frame.
        * Disable this by setting this to false. For example if your game has a canvas filling background image you often don't need this set.
        */
        clearBeforeRender: boolean;

        /**
        * Whether the render view is transparent
        */
        transparent: boolean;

        /**
        * Whether the render view should be resized automatically
        */
        autoResize: boolean;

        /**
        * The width of the canvas view
        * Default: 800
        */
        width: number;

        /**
        * The height of the canvas view
        * Default: 600
        */
        height: number;

        /**
        * The canvas element that everything is drawn to.
        */
        view: HTMLCanvasElement;

        /**
        * The canvas 2d context that everything is drawn with
        */
        context: CanvasRenderingContext2D;

        /**
        * Boolean flag controlling canvas refresh.
        */
        refresh: boolean;

        /**
        * Internal var.
        */
        count: number;
        maskManager: CanvasMaskManager;

        /**
        * The render session is just a bunch of parameter used for rendering
        */
        renderSession: RenderSession;


        /**
        * Renders the DisplayObjectContainer, usually the Phaser.Stage, to this canvas view.
        * 
        * @param root The root element to be rendered.
        */
        render(stage: DisplayObjectContainer): void;

        /**
        * Resizes the canvas view to the specified width and height
        * 
        * @param width the new width of the canvas view
        * @param height the new height of the canvas view
        */
        resize(width: number, height: number): void;

        /**
        * Removes everything from the renderer and optionally removes the Canvas DOM element.
        * 
        * @param removeView Removes the Canvas element from the DOM. - Default: true
        */
        destroy(removeView?: boolean): void;

    ***REMOVED***


    /**
    * Utility methods for Sprite/Texture tinting.
    */
    export class CanvasTinter ***REMOVED***


        /**
        * Basically this method just needs a sprite and a color and tints the sprite with the given color.
        * 
        * @param sprite the sprite to tint
        * @param color the color to use to tint the sprite with
        * @return The tinted canvas
        */
        static getTintedTexture(sprite: Sprite, color: number): HTMLCanvasElement;

        /**
        * Tint a texture using the "multiply" operation.
        * 
        * @param texture the texture to tint
        * @param color the color to use to tint the sprite with
        * @param canvas the current canvas
        */
        static tintWithMultiply(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static tintWithOverlay(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static tintWithPerPixel(texture: Texture, color: number, canvas: HTMLCanvasElement): void;


        /**
        * Whether or not the Canvas BlendModes are supported, consequently the ability to tint using the multiply method.
        */
        static canUseMultiply: boolean;
        static tintMethod: any;

    ***REMOVED***

    export class Circle implements HitArea ***REMOVED***

        constructor(x: number, y: number, radius: number);

        x: number;
        y: number;
        radius: number;

        clone(): Circle;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    ***REMOVED***

    export class ColorMatrixFilter extends AbstractFilter ***REMOVED***

        constructor();

        matrix: number[];

    ***REMOVED***

    export class ColorStepFilter extends AbstractFilter ***REMOVED***

        step: number;

    ***REMOVED***

    export class ConvolutionFilter extends AbstractFilter ***REMOVED***

        constructor(matrix: number[], width: number, height: number);

        matrix: Matrix;
        width: number;
        height: number;

    ***REMOVED***

    export class CrossHatchFilter extends AbstractFilter ***REMOVED***

        blur: number;

    ***REMOVED***

    export class DisplacementFilter extends AbstractFilter ***REMOVED***

        constructor(texture: Texture);

        map: Texture;
        offset: Point;
        scale: Point;

    ***REMOVED***

    export class DotScreenFilter extends AbstractFilter ***REMOVED***

        angle: number;
        scale: Point;

    ***REMOVED***

    export class DisplayObject ***REMOVED***

        alpha: number;
        buttonMode: boolean;
        cacheAsBitmap: boolean;
        defaultCursor: string;
        filterArea: Rectangle;
        filters: AbstractFilter[];
        hitArea: HitArea;
        interactive: boolean;
        mask: Graphics;
        parent: DisplayObjectContainer;
        pivot: Point;
        position: Point;
        renderable: boolean;
        rotation: number;
        scale: Point;
        stage: DisplayObjectContainer;
        visible: boolean;
        worldAlpha: number;
        worldPosition: Point;
        worldScale: Point;
        worldTransform: Matrix;
        worldRotation: number;
        worldVisible: boolean;
        x: number;
        y: number;

        click(e: InteractionData): void;
        displayObjectUpdateTransform(parent?: DisplayObjectContainer): void;
        generateTexture(resolution?: number, scaleMode?: number, renderer?: PixiRenderer | number): RenderTexture;
        mousedown(e: InteractionData): void;
        mouseout(e: InteractionData): void;
        mouseover(e: InteractionData): void;
        mouseup(e: InteractionData): void;
        mousemove(e: InteractionData): void;
        mouseupoutside(e: InteractionData): void;
        rightclick(e: InteractionData): void;
        rightdown(e: InteractionData): void;
        rightup(e: InteractionData): void;
        rightupoutside(e: InteractionData): void;
        setStageReference(stage: DisplayObjectContainer): void;
        tap(e: InteractionData): void;
        toGlobal(position: Point): Point;
        toLocal(position: Point, from: DisplayObject): Point;
        touchend(e: InteractionData): void;
        touchendoutside(e: InteractionData): void;
        touchstart(e: InteractionData): void;
        touchmove(e: InteractionData): void;
        updateTransform(parent?: DisplayObjectContainer): void;

    ***REMOVED***


    /**
    * A DisplayObjectContainer represents a collection of display objects.
    * It is the base class of all display objects that act as a container for other objects.
    */
    export class DisplayObjectContainer extends DisplayObject ***REMOVED***


        /**
        * A DisplayObjectContainer represents a collection of display objects.
        * It is the base class of all display objects that act as a container for other objects.
        */
        constructor();


        /**
        * [read-only] The array of children of this container.
        */
        children: DisplayObject[];

        /**
        * The height of the displayObjectContainer, setting this will actually modify the scale to achieve the value set
        */
        height: number;

        /**
        * The width of the displayObjectContainer, setting this will actually modify the scale to achieve the value set
        */
        width: number;

        /**
        * If `ignoreChildInput`  is `false` it will allow this objects _children_ to be considered as valid for Input events.
        * 
        * If this property is `true` then the children will _not_ be considered as valid for Input events.
        * 
        * Note that this property isn't recursive: only immediate children are influenced, it doesn't scan further down.
        */
        ignoreChildInput: boolean;


        /**
        * Adds a child to the container.
        * 
        * @param child The DisplayObject to add to the container
        * @return The child that was added.
        */
        addChild(child: DisplayObject): DisplayObject;

        /**
        * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown
        * 
        * @param child The child to add
        * @param index The index to place the child in
        * @return The child that was added.
        */
        addChildAt(child: DisplayObject, index: number): DisplayObject;

        /**
        * Retrieves the global bounds of the displayObjectContainer as a rectangle. The bounds calculation takes all visible children into consideration.
        * 
        * @param targetCoordinateSpace Returns a rectangle that defines the area of the display object relative to the coordinate system of the targetCoordinateSpace object.
        * @return The rectangular bounding area
        */
        getBounds(targetCoordinateSpace?: DisplayObject | Matrix): Rectangle;

        /**
        * Returns the child at the specified index
        * 
        * @param index The index to get the child from
        * @return The child at the given index, if any.
        */
        getChildAt(index: number): DisplayObject;

        /**
        * Returns the index position of a child DisplayObject instance
        * 
        * @param child The DisplayObject instance to identify
        * @return The index position of the child display object to identify
        */
        getChildIndex(child: DisplayObject): number;

        /**
        * Retrieves the non-global local bounds of the displayObjectContainer as a rectangle without any transformations. The calculation takes all visible children into consideration.
        * @return The rectangular bounding area
        */
        getLocalBounds(): Rectangle;

        /**
        * Removes a child from the container.
        * 
        * @param child The DisplayObject to remove
        * @return The child that was removed.
        */
        removeChild(child: DisplayObject): DisplayObject;

        /**
        * Removes a child from the specified index position.
        * 
        * @param index The index to get the child from
        * @return The child that was removed.
        */
        removeChildAt(index: number): DisplayObject;

        /**
        * Removes all children from this container that are within the begin and end indexes.
        * 
        * @param beginIndex The beginning position. Default value is 0.
        * @param endIndex The ending position. Default value is size of the container.
        */
        removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[];
        removeStageReference(): void;

        /**
        * Changes the position of an existing child in the display object container
        * 
        * @param child The child DisplayObject instance for which you want to change the index number
        * @param index The resulting index number for the child display object
        */
        setChildIndex(child: DisplayObject, index: number): void;

        /**
        * Swaps the position of 2 Display Objects within this container.
        * 
        * @param child -
        * @param child2 -
        */
        swapChildren(child: DisplayObject, child2: DisplayObject): void;

        /**
        * Determines whether the specified display object is a child of the DisplayObjectContainer instance or the instance itself.
        * 
        * @param child -
        */
        contains(child: DisplayObject): boolean;

    ***REMOVED***

    export class Ellipse implements HitArea ***REMOVED***

        constructor(x: number, y: number, width: number, height: number);

        x: number;
        y: number;
        width: number;
        height: number;

        clone(): Ellipse;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    ***REMOVED***


    /**
    * Creates an homogenous object for tracking events so users can know what to expect.
    */
    export class Event ***REMOVED***


        /**
        * Creates an homogenous object for tracking events so users can know what to expect.
        * 
        * @param target The target object that the event is called on
        * @param name The string name of the event that was triggered
        * @param data Arbitrary event data to pass along
        */
        constructor(target: any, name: string, data: any);


        /**
        * The original target the event triggered on.
        */
        target: any;

        /**
        * The string name of the event that this represents.
        */
        type: string;

        /**
        * The data that was passed in with this event.
        */
        data: any;

        /**
        * The timestamp when the event occurred.
        */
        timeStamp: number;


        /**
        * Stops the propagation of events up the scene graph (prevents bubbling).
        */
        stopPropagation(): void;
        preventDefault(): void;

        /**
        * Stops the propagation of events to sibling listeners (no longer calls any listeners).
        */
        stopImmediatePropagation(): void;

    ***REMOVED***


    /**
    * Mixins event emitter functionality to a class
    */
    export class EventTarget ***REMOVED***


        /**
        * Mixes in the properties of the EventTarget prototype onto another object
        * 
        * @param object The obj to mix into
        */
        static mixin(obj: any): void;

    ***REMOVED***

    export class FilterTexture ***REMOVED***


        /**
        * 
        * 
        * @param gl the current WebGL drawing context
        * @param width the horizontal range of the filter
        * @param height the vertical range of the filter
        * @param scaleMode See ***REMOVED******REMOVED***#crossLink "PIXI/scaleModes:property"***REMOVED******REMOVED***PIXI.scaleModes***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** for possible values
        */
        constructor(gl: WebGLRenderingContext, width: number, height: number, scaleMode: scaleModes);

        fragmentSrc: string[];
        frameBuffer: WebGLFramebuffer;
        gl: WebGLRenderingContext;
        program: WebGLProgram;
        scaleMode: number;
        texture: WebGLTexture;


        /**
        * Clears the filter texture.
        */
        clear(): void;

        /**
        * Resizes the texture to the specified width and height
        * 
        * @param width the new width of the texture
        * @param height the new height of the texture
        */
        resize(width: number, height: number): void;

        /**
        * Destroys the filter texture.
        */
        destroy(): void;

    ***REMOVED***


    /**
    * A GraphicsData object.
    */
    export class GraphicsData ***REMOVED***


        /**
        * A GraphicsData object.
        */
        constructor(lineWidth?: number, lineColor?: number, lineAlpha?: number, fillColor?: number, fillAlpha?: number, fill?: boolean, shape?: any);

        lineWidth: number;
        lineColor: number;
        lineAlpha: number;
        fillColor: number;
        fillAlpha: number;
        fill: boolean;
        shape: any;
        type: number;

    ***REMOVED***


    /**
    * The Graphics class contains methods used to draw primitive shapes such as lines, circles and rectangles to the display, and color and fill them.
    */
    export class Graphics extends DisplayObjectContainer ***REMOVED***

        static POLY: number;
        static RECT: number;
        static CIRC: number;
        static ELIP: number;
        static RREC: number;


        /**
        * The blend mode to be applied to the graphic shape. Apply a value of PIXI.blendModes.NORMAL to reset the blend mode.
        * Default: PIXI.blendModes.NORMAL;
        */
        blendMode: number;

        /**
        * The bounds' padding used for bounds calculation.
        */
        boundsPadding: number;

        /**
        * The alpha value used when filling the Graphics object.
        */
        fillAlpha: number;

        /**
        * Whether this shape is being used as a mask.
        */
        isMask: boolean;

        /**
        * The width (thickness) of any lines drawn.
        */
        lineWidth: number;

        /**
        * The color of any lines drawn.
        * Default: 0
        */
        lineColor: number;

        /**
        * The tint applied to the graphic shape. This is a hex value. Apply a value of 0xFFFFFF to reset the tint.
        * Default: 0xFFFFFF
        */
        tint: number;
        worldAlpha: number;


        /**
        * The arc method creates an arc/curve (used to create circles, or parts of circles).
        * 
        * @param cx The x-coordinate of the center of the circle
        * @param cy The y-coordinate of the center of the circle
        * @param radius The radius of the circle
        * @param startAngle The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
        * @param endAngle The ending angle, in radians
        * @param anticlockwise Optional. Specifies whether the drawing should be counterclockwise or clockwise. False is default, and indicates clockwise, while true indicates counter-clockwise.
        * @param segments Optional. The number of segments to use when calculating the arc. The default is 40. If you need more fidelity use a higher number.
        */
        arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): Graphics;
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;

        /**
        * Specifies a simple one-color fill that subsequent calls to other Graphics methods
        * (such as lineTo() or drawCircle()) use when drawing.
        * 
        * @param color the color of the fill
        * @param alpha the alpha of the fill
        */
        beginFill(color?: number, alpha?: number): Graphics;

        /**
        * Calculate the points for a bezier curve and then draws it.
        * 
        * @param cpX Control point x
        * @param cpY Control point y
        * @param cpX2 Second Control point x
        * @param cpY2 Second Control point y
        * @param toX Destination point x
        * @param toY Destination point y
        */
        bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): Graphics;

        /**
        * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
        */
        clear(): Graphics;

        /**
        * Destroys a previous cached sprite.
        */
        destroyCachedSprite(): void;

        /**
        * Draws a circle.
        * 
        * @param x The X coordinate of the center of the circle
        * @param y The Y coordinate of the center of the circle
        * @param diameter The diameter of the circle
        */
        drawCircle(x: number, y: number, diameter: number): Graphics;

        /**
        * Draws an ellipse.
        * 
        * @param x The X coordinate of the center of the ellipse
        * @param y The Y coordinate of the center of the ellipse
        * @param width The half width of the ellipse
        * @param height The half height of the ellipse
        */
        drawEllipse(x: number, y: number, width: number, height: number): Graphics;

        /**
        * Draws a polygon using the given path.
        * 
        * @param path The path data used to construct the polygon. Can either be an array of points or a Phaser.Polygon object.
        */
        drawPolygon(...path: any[]): Graphics;

        /**
        * 
        * 
        * @param x The X coord of the top-left of the rectangle
        * @param y The Y coord of the top-left of the rectangle
        * @param width The width of the rectangle
        * @param height The height of the rectangle
        */
        drawRect(x: number, y: number, width: number, height: number): Graphics;

        /**
        * 
        * 
        * @param x The X coord of the top-left of the rectangle
        * @param y The Y coord of the top-left of the rectangle
        * @param width The width of the rectangle
        * @param height The height of the rectangle
        * @param radius Radius of the rectangle corners. In WebGL this must be a value between 0 and 9.
        */
        drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): Graphics;

        /**
        * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
        * 
        * @param shape The Shape object to draw.
        * @return The generated GraphicsData object.
        */
        drawShape(shape: Circle): GraphicsData;

        /**
        * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
        * 
        * @param shape The Shape object to draw.
        * @return The generated GraphicsData object.
        */
        drawShape(shape: Rectangle): GraphicsData;

        /**
        * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
        * 
        * @param shape The Shape object to draw.
        * @return The generated GraphicsData object.
        */
        drawShape(shape: Ellipse): GraphicsData;

        /**
        * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
        * 
        * @param shape The Shape object to draw.
        * @return The generated GraphicsData object.
        */
        drawShape(shape: Polygon): GraphicsData;

        /**
        * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
        */
        endFill(): Graphics;

        /**
        * Useful function that returns a texture of the graphics object that can then be used to create sprites
        * This can be quite useful if your geometry is complicated and needs to be reused multiple times.
        * 
        * @param resolution The resolution of the texture being generated - Default: 1
        * @param scaleMode Should be one of the PIXI.scaleMode consts
        * @param padding Add optional extra padding to the generated texture (default 0)
        * @return a texture of the graphics object
        */
        generateTexture(resolution?: number, scaleMode?: number, padding?: number): RenderTexture;

        /**
        * Specifies the line style used for subsequent calls to Graphics methods such as the lineTo() method or the drawCircle() method.
        * 
        * @param lineWidth width of the line to draw, will update the objects stored style
        * @param color color of the line to draw, will update the objects stored style
        * @param alpha alpha of the line to draw, will update the objects stored style
        */
        lineStyle(lineWidth?: number, color?: number, alpha?: number): Graphics;

        /**
        * Draws a line using the current line style from the current drawing position to (x, y);
        * The current drawing position is then set to (x, y).
        * 
        * @param x the X coordinate to draw to
        * @param y the Y coordinate to draw to
        */
        lineTo(x: number, y: number): Graphics;

        /**
        * Moves the current drawing position to x, y.
        * 
        * @param x the X coordinate to move to
        * @param y the Y coordinate to move to
        */
        moveTo(x: number, y: number): Graphics;

        /**
        * Calculate the points for a quadratic bezier curve and then draws it.
        * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
        * 
        * @param cpX Control point x
        * @param cpY Control point y
        * @param toX Destination point x
        * @param toY Destination point y
        */
        quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): Graphics;

    ***REMOVED***

    export class GrayFilter extends AbstractFilter ***REMOVED***

        gray: number;

    ***REMOVED***

    export class ImageLoader implements Mixin ***REMOVED***

        constructor(url: string, crossorigin?: boolean);

        texture: Texture;

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        load(): void;
        loadFramedSpriteSheet(frameWidth: number, frameHeight: number, textureName: string): void;

    ***REMOVED***

    export class InteractionData ***REMOVED***

        global: Point;
        target: Sprite;
        originalEvent: Event;

        getLocalPosition(displayObject: DisplayObject, point?: Point, globalPos?: Point): Point;

    ***REMOVED***

    export class InteractionManager ***REMOVED***

        currentCursorStyle: string;
        last: number;
        mouse: InteractionData;
        mouseOut: boolean;
        mouseoverEnabled: boolean;
        onMouseMove: Function;
        onMouseDown: Function;
        onMouseOut: Function;
        onMouseUp: Function;
        onTouchStart: Function;
        onTouchEnd: Function;
        onTouchMove: Function;
        pool: InteractionData[];
        resolution: number;
        stage: DisplayObjectContainer;
        touches: ***REMOVED*** [id: string]: InteractionData ***REMOVED***;

        constructor(stage: DisplayObjectContainer);
    ***REMOVED***

    export class InvertFilter extends AbstractFilter ***REMOVED***

        invert: number;

    ***REMOVED***

    export class JsonLoader implements Mixin ***REMOVED***

        constructor(url: string, crossorigin?: boolean);

        baseUrl: string;
        crossorigin: boolean;
        loaded: boolean;
        url: string;

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        load(): void;

    ***REMOVED***

    export class Matrix ***REMOVED***

        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;

        append(matrix: Matrix): Matrix;
        apply(pos: Point, newPos: Point): Point;
        applyInverse(pos: Point, newPos: Point): Point;
        determineMatrixArrayType(): number[];
        identity(): Matrix;
        rotate(angle: number): Matrix;
        fromArray(array: number[]): void;
        translate(x: number, y: number): Matrix;
        toArray(transpose: boolean): number[];
        scale(x: number, y: number): Matrix;

    ***REMOVED***

    export interface Mixin ***REMOVED***

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

    ***REMOVED***

    export class NoiseFilter extends AbstractFilter ***REMOVED***

        noise: number;

    ***REMOVED***

    export class NormalMapFilter extends AbstractFilter ***REMOVED***

        map: Texture;
        offset: Point;
        scale: Point;

    ***REMOVED***

    export class PixelateFilter extends AbstractFilter ***REMOVED***

        size: number;

    ***REMOVED***

    export interface IPixiShader ***REMOVED***

        fragmentSrc: string[];
        gl: WebGLRenderingContext;
        program: WebGLProgram;
        vertexSrc: string[];

        destroy(): void;
        init(): void;

    ***REMOVED***

    export class PixiShader implements IPixiShader ***REMOVED***


        /**
        * 
        * 
        * @param gl the current WebGL drawing context
        */
        constructor(gl: WebGLRenderingContext);


        /**
        * Uniform attributes cache.
        */
        attributes: ShaderAttribute[];

        /**
        * The Default Vertex shader source.
        */
        defaultVertexSrc: string[];

        /**
        * A dirty flag
        */
        dirty: boolean;

        /**
        * A local flag
        */
        firstRun: boolean;

        /**
        * A local texture counter for multi-texture shaders.
        */
        textureCount: number;

        /**
        * The fragment shader.
        */
        fragmentSrc: string[];
        gl: WebGLRenderingContext;

        /**
        * The WebGL program.
        */
        program: WebGLProgram;
        vertexSrc: string[];


        /**
        * Initialises a Sampler2D uniform (which may only be available later on after initUniforms once the texture has loaded)
        */
        initSampler2D(): void;

        /**
        * Initialises the shader uniform values.
        * 
        * Uniforms are specified in the GLSL_ES Specification: http://www.khronos.org/registry/webgl/specs/latest/1.0/
        * http://www.khronos.org/registry/gles/specs/2.0/GLSL_ES_Specification_1.0.17.pdf
        */
        initUniforms(): void;

        /**
        * Updates the shader uniform values.
        */
        syncUniforms(): void;


        /**
        * Destroys the shader.
        */
        destroy(): void;

        /**
        * Initialises the shader.
        */
        init(): void;

    ***REMOVED***

    export class PixiFastShader implements IPixiShader ***REMOVED***


        /**
        * 
        * 
        * @param gl the current WebGL drawing context
        */
        constructor(gl: WebGLRenderingContext);


        /**
        * A local texture counter for multi-texture shaders.
        */
        textureCount: number;

        /**
        * The fragment shader.
        */
        fragmentSrc: string[];
        gl: WebGLRenderingContext;

        /**
        * The WebGL program.
        */
        program: WebGLProgram;

        /**
        * The vertex shader.
        */
        vertexSrc: string[];


        /**
        * Destroys the shader.
        */
        destroy(): void;

        /**
        * Initialises the shader.
        */
        init(): void;

    ***REMOVED***

    export class PrimitiveShader implements IPixiShader ***REMOVED***


        /**
        * 
        * 
        * @param gl the current WebGL drawing context
        */
        constructor(gl: WebGLRenderingContext);

        /**
        * The fragment shader.
        */
        fragmentSrc: string[];
        gl: WebGLRenderingContext;

        /**
        * The WebGL program.
        */
        program: WebGLProgram;

        /**
        * The vertex shader.
        */
        vertexSrc: string[];


        /**
        * Destroys the shader.
        */
        destroy(): void;

        /**
        * Initialises the shader.
        */
        init(): void;

    ***REMOVED***

    export class ComplexPrimitiveShader implements IPixiShader ***REMOVED***


        /**
        * 
        * 
        * @param gl the current WebGL drawing context
        */
        constructor(gl: WebGLRenderingContext);

        /**
        * The fragment shader.
        */
        fragmentSrc: string[];
        gl: WebGLRenderingContext;

        /**
        * The WebGL program.
        */
        program: WebGLProgram;

        /**
        * The vertex shader.
        */
        vertexSrc: string[];


        /**
        * Destroys the shader.
        */
        destroy(): void;

        /**
        * Initialises the shader.
        */
        init(): void;

    ***REMOVED***

    export class StripShader implements IPixiShader ***REMOVED***


        /**
        * 
        * 
        * @param gl the current WebGL drawing context
        */
        constructor(gl: WebGLRenderingContext);

        /**
        * The fragment shader.
        */
        fragmentSrc: string[];
        gl: WebGLRenderingContext;

        /**
        * The WebGL program.
        */
        program: WebGLProgram;

        /**
        * The vertex shader.
        */
        vertexSrc: string[];


        /**
        * Destroys the shader.
        */
        destroy(): void;

        /**
        * Initialises the shader.
        */
        init(): void;

    ***REMOVED***

    export class Point ***REMOVED***

        constructor(x?: number, y?: number);

        x: number;
        y: number;

        clone(): Point;
        set(x: number, y: number): void;

    ***REMOVED***

    export class Polygon implements HitArea ***REMOVED***

        constructor(points: Point[]);
        constructor(points: number[]);
        constructor(...points: Point[]);
        constructor(...points: number[]);

        points: any[];

        clone(): Polygon;
        contains(x: number, y: number): boolean;

    ***REMOVED***

    export class Rectangle implements HitArea ***REMOVED***

        constructor(x?: number, y?: number, width?: number, height?: number);

        x: number;
        y: number;
        width: number;
        height: number;

        clone(): Rectangle;
        contains(x: number, y: number): boolean;

    ***REMOVED***

    export class RGBSplitFilter extends AbstractFilter ***REMOVED***

        red: Point;
        green: Point;
        blue: Point;

    ***REMOVED***

    export class Rope extends Strip ***REMOVED***

        points: Point[];
        vertices: number[];


        /**
        * 
        * 
        * @param texture - The texture to use on the rope.
        * @param points - An array of ***REMOVED***PIXI.Point***REMOVED***.
        */
        constructor(texture: Texture, points: Point[]);

        refresh(): void;
        setTexture(texture: Texture): void;

    ***REMOVED***

    export class RoundedRectangle implements HitArea ***REMOVED***

        constructor(x?: number, y?: number, width?: number, height?: number, radius?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        radius: number;

        clone(): RoundedRectangle;
        contains(x: number, y: number): boolean;

    ***REMOVED***

    export class SepiaFilter extends AbstractFilter ***REMOVED***

        sepia: number;

    ***REMOVED***

    export class SmartBlurFilter extends AbstractFilter ***REMOVED***

        blur: number;

    ***REMOVED***

    export class SpineLoader implements Mixin ***REMOVED***

        url: string;
        crossorigin: boolean;
        loaded: boolean;

        constructor(url: string, crossOrigin: boolean);

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        load(): void;

    ***REMOVED***

    export class SpineTextureLoader ***REMOVED***

        constructor(basePath: string, crossorigin: boolean);

        load(page: AtlasPage, file: string): void;
        unload(texture: BaseTexture): void;

    ***REMOVED***


    /**
    * The Sprite object is the base for all textured objects that are rendered to the screen
    */
    export class Sprite extends DisplayObjectContainer ***REMOVED***


        /**
        * The Sprite object is the base for all textured objects that are rendered to the screen
        * 
        * @param texture The texture for this sprite
        */
        constructor(texture: Texture);


        /**
        * The anchor sets the origin point of the texture.
        * The default is 0,0 this means the texture's origin is the top left
        * Setting than anchor to 0.5,0.5 means the textures origin is centered
        * Setting the anchor to 1,1 would mean the textures origin points will be the bottom right corner
        */
        anchor: Point;

        /**
        * The blend mode to be applied to the sprite. Set to PIXI.blendModes.NORMAL to remove any blend mode.
        * 
        * Warning: You cannot have a blend mode and a filter active on the same Sprite. Doing so will render the sprite invisible.
        * Default: PIXI.blendModes.NORMAL;
        */
        blendMode: blendModes;

        /**
        * Controls if this Sprite is processed by the core Phaser game loops and Group loops.
        * Default: true
        */
        exists: boolean;

        /**
        * The shader that will be used to render this Sprite.
        * Set to null to remove a current shader.
        * Default: null
        */
        shader: IPixiShader;

        /**
        * The texture that the sprite is using
        */
        texture: Texture;

        /**
        * The tint applied to the sprite. This is a hex value. A value of 0xFFFFFF will remove any tint effect.
        * Default: 0xFFFFFF
        */
        tint: number;


        /**
        * Sets the texture of the sprite. Be warned that this doesn't remove or destroy the previous
        * texture this Sprite was using.
        * 
        * @param texture The PIXI texture that is displayed by the sprite
        * @param destroy Call Texture.destroy on the current texture before replacing it with the new one?
        */
        setTexture(texture: Texture, destroyBase?: boolean): void;

    ***REMOVED***


    /**
    * The SpriteBatch class is a really fast version of the DisplayObjectContainer
    * built solely for speed, so use when you need a lot of sprites or particles.
    * And it's extremely easy to use :
    * 
    *    var container = new PIXI.SpriteBatch();
    * 
    *    for(var i  = 0; i < 100; i++)
    *    ***REMOVED***
    *        var sprite = new PIXI.Sprite.fromImage("myImage.png");
    *        container.addChild(sprite);
    *    ***REMOVED***
    * And here you have a hundred sprites that will be renderer at the speed of light
    */
    export class SpriteBatch extends DisplayObjectContainer ***REMOVED***


        /**
        * The SpriteBatch class is a really fast version of the DisplayObjectContainer
        * built solely for speed, so use when you need a lot of sprites or particles.
        * And it's extremely easy to use :
        * 
        *    var container = new PIXI.SpriteBatch();
        * 
        *    for(var i  = 0; i < 100; i++)
        *    ***REMOVED***
        *        var sprite = new PIXI.Sprite.fromImage("myImage.png");
        *        container.addChild(sprite);
        *    ***REMOVED***
        * And here you have a hundred sprites that will be renderer at the speed of light
        * 
        * @param texture -
        */
        constructor(texture?: Texture);

        ready: boolean;
        textureThing: Texture;

        initWebGL(gl: WebGLRenderingContext): void;

    ***REMOVED***

    export class SpriteSheetLoader implements Mixin ***REMOVED***

        constructor(url: string, crossorigin?: boolean);

        baseUrl: string;
        crossorigin: boolean;
        frames: any;
        texture: Texture;
        url: string;

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        load(): void;

    ***REMOVED***

    export class Strip extends DisplayObjectContainer ***REMOVED***

        static DrawModes: ***REMOVED***

            TRIANGLE_STRIP: number;
            TRIANGLES: number;

        ***REMOVED***;


        /**
        * 
        * 
        * @param texture The texture to use
        * @param width the width
        * @param height the height
        */
        constructor(texture: Texture);


        /**
        * The blend mode to be applied to the sprite. Set to PIXI.blendModes.NORMAL to remove any blend mode.
        * Default: PIXI.blendModes.NORMAL;
        */
        blendMode: number;
        colors: number[];

        /**
        * Whether the strip is dirty or not
        */
        dirty: boolean;
        indices: number[];

        /**
        * Triangles in canvas mode are automatically antialiased, use this value to force triangles to overlap a bit with each other.
        */
        canvasPadding: number;

        /**
        * The texture of the strip
        */
        texture: Texture;
        uvs: number[];
        vertices: number[];


        /**
        * Returns the bounds of the mesh as a rectangle. The bounds calculation takes the worldTransform into account.
        * 
        * @param matrix the transformation matrix of the sprite
        * @return the framing rectangle
        */
        getBounds(matrix?: Matrix): Rectangle;

    ***REMOVED***


    /**
    * A texture stores the information that represents an image or part of an image. It cannot be added
    * to the display list directly. Instead use it as the texture for a PIXI.Sprite. If no frame is provided then the whole image is used.
    */
    export class Texture implements Mixin ***REMOVED***

        static emptyTexture: Texture;


        /**
        * Helper function that creates a new a Texture based on the given canvas element.
        * 
        * @param canvas The canvas element source of the texture
        * @param scaleMode See ***REMOVED******REMOVED***#crossLink "PIXI/scaleModes:property"***REMOVED******REMOVED***PIXI.scaleModes***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** for possible values
        */
        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: scaleModes): Texture;


        /**
        * A texture stores the information that represents an image or part of an image. It cannot be added
        * to the display list directly. Instead use it as the texture for a PIXI.Sprite. If no frame is provided then the whole image is used.
        * 
        * @param baseTexture The base texture source to create the texture from
        * @param frame The rectangle frame of the texture to show
        * @param crop The area of original texture
        * @param trim Trimmed texture rectangle
        */
        constructor(baseTexture: BaseTexture, frame?: Rectangle, crop?: Rectangle, trim?: Rectangle);


        /**
        * The base texture that this texture uses.
        */
        baseTexture: BaseTexture;

        /**
        * This is the area of the BaseTexture image to actually copy to the Canvas / WebGL when rendering,
        * irrespective of the actual frame size or placement (which can be influenced by trimmed texture atlases)
        */
        crop: Rectangle;

        /**
        * The frame specifies the region of the base texture that this texture uses
        */
        frame: Rectangle;

        /**
        * The height of the Texture in pixels.
        */
        height: number;

        /**
        * Does this Texture have any frame data assigned to it?
        */
        noFrame: boolean;

        /**
        * This will let a renderer know that a texture has been updated (used mainly for webGL uv updates)
        */
        requiresUpdate: boolean;

        /**
        * The texture trim data.
        */
        trim: Point;

        /**
        * The width of the Texture in pixels.
        */
        width: number;
        scope: any;

        /**
        * This will let the renderer know if the texture is valid. If it's not then it cannot be rendered.
        */
        valid: boolean;

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;


        /**
        * Destroys this texture
        * 
        * @param destroyBase Whether to destroy the base texture as well
        */
        destroy(destroyBase: boolean): void;

        /**
        * Specifies the region of the baseTexture that this texture will use.
        * 
        * @param frame The frame of the texture to set it to
        */
        setFrame(frame: Rectangle): void;

    ***REMOVED***


    /**
    * A tiling sprite is a fast way of rendering a tiling image
    */
    export class TilingSprite extends Sprite ***REMOVED***


        /**
        * A tiling sprite is a fast way of rendering a tiling image
        * 
        * @param texture the texture of the tiling sprite
        * @param width the width of the tiling sprite
        * @param height the height of the tiling sprite
        */
        constructor(texture: Texture, width: number, height: number);


        /**
        * The CanvasBuffer object that the tiled texture is drawn to.
        */
        canvasBuffer: PIXI.CanvasBuffer;

        /**
        * The blend mode to be applied to the sprite
        * Default: PIXI.blendModes.NORMAL;
        */
        blendMode: number;

        /**
        * If true the TilingSprite will run generateTexture on its **next** render pass.
        * This is set by the likes of Phaser.LoadTexture.setFrame.
        * Default: true
        */
        refreshTexture: boolean;

        /**
        * The texture that the sprite is using
        */
        texture: Texture;

        /**
        * If enabled a green rectangle will be drawn behind the generated tiling texture, allowing you to visually
        * debug the texture being used.
        */
        textureDebug: boolean;

        /**
        * The tint applied to the sprite. This is a hex value
        * Default: 0xFFFFFF
        */
        tint: number;

        /**
        * The offset position of the image that is being tiled
        */
        tilePosition: Point;

        /**
        * The Context fill pattern that is used to draw the TilingSprite in Canvas mode only (will be null in WebGL).
        */
        tilePattern: PIXI.Texture;

        /**
        * The scaling of the image that is being tiled
        */
        tileScale: Point;

        /**
        * A point that represents the scale of the texture object
        */
        tileScaleOffset: Point;

        destroy(): void;

        /**
        * 
        * 
        * @param forcePowerOfTwo Whether we want to force the texture to be a power of two
        * @param renderSession -
        */
        generateTilingTexture(forcePowerOfTwo?: boolean): void;

        /**
        * Sets the texture of the sprite. Be warned that this doesn't remove or destroy the previous
        * texture this Sprite was using.
        * 
        * @param texture The PIXI texture that is displayed by the sprite
        * @param destroy Call Texture.destroy on the current texture before replacing it with the new one?
        */
        setTexture(texture: Texture): void;

    ***REMOVED***

    export class TiltShiftFilter extends AbstractFilter ***REMOVED***

        blur: number;
        gradientBlur: number;
        start: number;
        end: number;

    ***REMOVED***

    export class TiltShiftXFilter extends AbstractFilter ***REMOVED***

        blur: number;
        gradientBlur: number;
        start: number;
        end: number;

        updateDelta(): void;

    ***REMOVED***

    export class TiltShiftYFilter extends AbstractFilter ***REMOVED***

        blur: number;
        gradientBlur: number;
        start: number;
        end: number;

        updateDelta(): void;

    ***REMOVED***

    export class TwistFilter extends AbstractFilter ***REMOVED***

        angle: number;
        offset: Point;
        radius: number;

    ***REMOVED***

    export class VideoTexture extends BaseTexture ***REMOVED***

        static baseTextureFromVideo(video: HTMLVideoElement, scaleMode: number): BaseTexture;
        static textureFromVideo(video: HTMLVideoElement, scaleMode: number): Texture;
        static fromUrl(videoSrc: string, scaleMode?: number, autoPlay?: boolean, type?: string, loop?: boolean): Texture;

        controls: boolean;
        autoUpdate: boolean;
        type: string;

        changeSource(src: string, type: string, loop: boolean): void;
        play(): void;
        stop(): void;

        destroy(): void;
        updateBound(): void;
        onPlayStart: () => void;
        onPlayStop: () => void;
        onCanPlay: (event: any) => void;

    ***REMOVED***

    export class WebGLBlendModeManager ***REMOVED***

        currentBlendMode: number;


        /**
        * Destroys this object.
        */
        destroy(): void;

        /**
        * Sets-up the given blendMode from WebGL's point of view.
        * 
        * @param blendMode the blendMode, should be a Pixi const, such as PIXI.BlendModes.ADD
        */
        setBlendMode(blendMode: number): boolean;

        /**
        * Sets the WebGL Context.
        * 
        * @param gl the current WebGL drawing context
        */
        setContext(gl: WebGLRenderingContext): void;

    ***REMOVED***

    export class WebGLFastSpriteBatch ***REMOVED***

        constructor(gl: CanvasRenderingContext2D);

        currentBatchSize: number;
        currentBaseTexture: BaseTexture;
        currentBlendMode: number;
        renderSession: RenderSession;
        drawing: boolean;
        indexBuffer: any;

        /**
        * Index data
        */
        indices: number[];
        lastIndexCount: number;
        matrix: Matrix;
        maxSize: number;
        shader: IPixiShader;
        size: number;
        vertexBuffer: any;

        /**
        * Vertex data
        */
        vertices: number[];
        vertSize: number;

        end(): void;

        /**
        * 
        * 
        * @param spriteBatch -
        * @param renderSession -
        */
        begin(spriteBatch: SpriteBatch, renderSession: RenderSession): void;
        destroy(removeView?: boolean): void;
        flush(): void;

        /**
        * 
        * 
        * @param spriteBatch -
        */
        render(spriteBatch: SpriteBatch): void;

        /**
        * 
        * 
        * @param sprite -
        */
        renderSprite(sprite: Sprite): void;

        /**
        * Sets the WebGL Context.
        * 
        * @param gl the current WebGL drawing context
        */
        setContext(gl: WebGLRenderingContext): void;
        start(): void;
        stop(): void;

    ***REMOVED***

    export class WebGLFilterManager ***REMOVED***

        filterStack: AbstractFilter[];
        transparent: boolean;
        offsetX: number;
        offsetY: number;


        /**
        * Applies the filter to the specified area.
        * 
        * @param filter the filter that needs to be applied
        * @param filterArea TODO - might need an update
        * @param width the horizontal range of the filter
        * @param height the vertical range of the filter
        */
        applyFilterPass(filter: AbstractFilter, filterArea: Texture, width: number, height: number): void;

        /**
        * 
        * 
        * @param renderSession -
        * @param buffer -
        */
        begin(renderSession: RenderSession, buffer: ArrayBuffer): void;

        /**
        * Destroys the filter and removes it from the filter stack.
        */
        destroy(): void;

        /**
        * Initialises the shader buffers.
        */
        initShaderBuffers(): void;

        /**
        * Removes the last filter from the filter stack and doesn't return it.
        */
        popFilter(): void;

        /**
        * Applies the filter and adds it to the current filter stack.
        * 
        * @param filterBlock the filter that will be pushed to the current filter stack
        */
        pushFilter(filterBlock: FilterBlock): void;

        /**
        * Initialises the context and the properties.
        * 
        * @param gl the current WebGL drawing context
        */
        setContext(gl: WebGLRenderingContext): void;

    ***REMOVED***


    /**
    * A set of functions used by the webGL renderer to draw the primitive graphics data
    */
    export class WebGLGraphics ***REMOVED***

        static graphicsDataPool: any[];


        /**
        * Renders the graphics object
        * 
        * @param graphics -
        * @param renderSession -
        */
        static renderGraphics(graphics: Graphics, renderRession: RenderSession): void;

        /**
        * Updates the graphics object
        * 
        * @param graphicsData The graphics object to update
        * @param gl the current WebGL drawing context
        */
        static updateGraphics(graphics: Graphics, gl: WebGLRenderingContext): void;

        /**
        * 
        * 
        * @param webGL -
        * @param type -
        */
        static switchMode(webGL: WebGLRenderingContext, type: number): any;

        /**
        * Builds a rectangle to draw
        * 
        * @param graphicsData The graphics object containing all the necessary properties
        * @param webGLData -
        */
        static buildRectangle(graphicsData: GraphicsData, webGLData: any): void;

        /**
        * Builds a rounded rectangle to draw
        * 
        * @param graphicsData The graphics object containing all the necessary properties
        * @param webGLData -
        */
        static buildRoundedRectangle(graphicsData: GraphicsData, webGLData: any): void;

        /**
        * Calculate the points for a quadratic bezier curve. (helper function..)
        * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
        * 
        * @param fromX Origin point x
        * @param fromY Origin point x
        * @param cpX Control point x
        * @param cpY Control point y
        * @param toX Destination point x
        * @param toY Destination point y
        */
        static quadraticBezierCurve(fromX: number, fromY: number, cpX: number, cpY: number, toX: number, toY: number): number[];

        /**
        * Builds a circle to draw
        * 
        * @param graphicsData The graphics object to draw
        * @param webGLData -
        */
        static buildCircle(graphicsData: GraphicsData, webGLData: any): void;

        /**
        * Builds a line to draw
        * 
        * @param graphicsData The graphics object containing all the necessary properties
        * @param webGLData -
        */
        static buildLine(graphicsData: GraphicsData, webGLData: any): void;

        /**
        * Builds a complex polygon to draw
        * 
        * @param graphicsData The graphics object containing all the necessary properties
        * @param webGLData -
        */
        static buildComplexPoly(graphicsData: GraphicsData, webGLData: any): void;

        /**
        * Builds a polygon to draw
        * 
        * @param graphicsData The graphics object containing all the necessary properties
        * @param webGLData -
        */
        static buildPoly(graphicsData: GraphicsData, webGLData: any): boolean;

        reset(): void;
        upload(): void;

    ***REMOVED***

    export class WebGLGraphicsData ***REMOVED***

        constructor(gl: WebGLRenderingContext);

        gl: WebGLRenderingContext;
        glPoints: any[];
        color: number[];
        points: any[];
        indices: any[];
        buffer: WebGLBuffer;
        indexBuffer: WebGLBuffer;
        mode: number;
        alpha: number;
        dirty: boolean;

        reset(): void;
        upload(): void;

    ***REMOVED***

    export class WebGLMaskManager ***REMOVED***


        /**
        * Destroys the mask stack.
        */
        destroy(): void;

        /**
        * Removes the last filter from the filter stack and doesn't return it.
        * 
        * @param maskData -
        * @param renderSession an object containing all the useful parameters
        */
        popMask(renderSession: RenderSession): void;

        /**
        * Applies the Mask and adds it to the current filter stack.
        * 
        * @param maskData -
        * @param renderSession -
        */
        pushMask(maskData: any[], renderSession: RenderSession): void;

        /**
        * Sets the drawing context to the one given in parameter.
        * 
        * @param gl the current WebGL drawing context
        */
        setContext(gl: WebGLRenderingContext): void;

    ***REMOVED***


    /**
    * The WebGLRenderer draws the stage and all its content onto a webGL enabled canvas. This renderer
    * should be used for browsers that support webGL. This Render works by automatically managing webGLBatchs.
    * So no need for Sprite Batches or Sprite Clouds.
    * Don't forget to add the view to your DOM or you will not see anything :)
    */
    export class WebGLRenderer implements PixiRenderer ***REMOVED***

        static createWebGLTexture(texture: Texture, gl: WebGLRenderingContext): void;


        /**
        * The WebGLRenderer draws the stage and all its content onto a webGL enabled canvas. This renderer
        * should be used for browsers that support webGL. This Render works by automatically managing webGLBatchs.
        * So no need for Sprite Batches or Sprite Clouds.
        * Don't forget to add the view to your DOM or you will not see anything :)
        * 
        * @param game A reference to the Phaser Game instance
        */
        constructor(game: Phaser.Game);

        game: Phaser.Game;
        type: number;

        /**
        * The resolution of the renderer
        * Default: 1
        */
        resolution: number;

        /**
        * Whether the render view is transparent
        */
        transparent: boolean;

        /**
        * Whether the render view should be resized automatically
        */
        autoResize: boolean;

        /**
        * The value of the preserveDrawingBuffer flag affects whether or not the contents of the stencil buffer is retained after rendering.
        */
        preserveDrawingBuffer: boolean;

        /**
        * This sets if the WebGLRenderer will clear the context texture or not before the new render pass. If true:
        * If the Stage is NOT transparent, Pixi will clear to alpha (0, 0, 0, 0).
        * If the Stage is transparent, Pixi will clear to the target Stage's background color.
        * Disable this by setting this to false. For example: if your game has a canvas filling background image, you often don't need this set.
        */
        clearBeforeRender: boolean;

        /**
        * The width of the canvas view
        */
        width: number;

        /**
        * The height of the canvas view
        */
        height: number;

        /**
        * The canvas element that everything is drawn to
        */
        view: HTMLCanvasElement;
        projection: Point;
        offset: Point;

        /**
        * Deals with managing the shader programs and their attribs
        */
        shaderManager: WebGLShaderManager;

        /**
        * Manages the rendering of sprites
        */
        spriteBatch: WebGLSpriteBatch;

        /**
        * Manages the masks using the stencil buffer
        */
        maskManager: WebGLMaskManager;

        /**
        * Manages the filters
        */
        filterManager: WebGLFilterManager;

        /**
        * Manages the stencil buffer
        */
        stencilManager: WebGLStencilManager;

        /**
        * Manages the blendModes
        */
        blendModeManager: WebGLBlendModeManager;
        renderSession: RenderSession;

        initContext(): void;

        /**
        * Renders the stage to its webGL view
        * 
        * @param stage the Stage element to be rendered
        */
        render(stage: DisplayObjectContainer): void;

        /**
        * Renders a Display Object.
        * 
        * @param displayObject The DisplayObject to render
        * @param projection The projection
        * @param buffer a standard WebGL buffer
        */
        renderDisplayObject(displayObject: DisplayObject, projection: Point, buffer: WebGLBuffer): void;

        /**
        * Resizes the webGL view to the specified width and height.
        * 
        * @param width the new width of the webGL view
        * @param height the new height of the webGL view
        */
        resize(width: number, height: number): void;

        /**
        * Updates and Creates a WebGL texture for the renderers context.
        * 
        * @param texture the texture to update
        * @return True if the texture was successfully bound, otherwise false.
        */
        updateTexture(texture: Texture): void;

        /**
        * Removes everything from the renderer (event listeners, spritebatch, etc...)
        */
        destroy(): void;

        /**
        * Maps Pixi blend modes to WebGL blend modes.
        */
        mapBlendModes(): void;

    ***REMOVED***

    export class WebGLShaderManager ***REMOVED***

        maxAttibs: number;
        attribState: any[];
        stack: any[];
        tempAttribState: any[];


        /**
        * Destroys this object.
        */
        destroy(): void;

        /**
        * Takes the attributes given in parameters.
        * 
        * @param attribs attribs
        */
        setAttribs(attribs: ShaderAttribute[]): void;

        /**
        * Initialises the context and the properties.
        * 
        * @param gl the current WebGL drawing context
        */
        setContext(gl: WebGLRenderingContext): void;

        /**
        * Sets the current shader.
        * 
        * @param shader -
        */
        setShader(shader: IPixiShader): boolean;

    ***REMOVED***

    export class WebGLStencilManager ***REMOVED***

        stencilStack: any[];
        reverse: boolean;
        count: number;


        /**
        * TODO this does not belong here!
        * 
        * @param graphics -
        * @param webGLData -
        * @param renderSession -
        */
        bindGraphics(graphics: Graphics, webGLData: any[], renderSession: RenderSession): void;

        /**
        * Destroys the mask stack.
        */
        destroy(): void;

        /**
        * 
        * 
        * @param graphics -
        * @param webGLData -
        * @param renderSession -
        */
        popStencil(graphics: Graphics, webGLData: any[], renderSession: RenderSession): void;
        pushStencil(graphics: Graphics, webGLData: any[], renderSession: RenderSession): void;

        /**
        * Sets the drawing context to the one given in parameter.
        * 
        * @param gl the current WebGL drawing context
        */
        setContext(gl: WebGLRenderingContext): void;

    ***REMOVED***

    export class WebGLSpriteBatch ***REMOVED***

        blendModes: number[];

        /**
        * View on the vertices as a Uint32Array
        */
        colors: number[];
        currentBatchSize: number;
        currentBaseTexture: Texture;
        defaultShader: AbstractFilter;
        dirty: boolean;
        drawing: boolean;

        /**
        * Holds the indices
        */
        indices: number[];
        lastIndexCount: number;

        /**
        * View on the vertices as a Float32Array
        */
        positions: number[];
        textures: Texture[];
        shaders: IPixiShader[];

        /**
        * The number of images in the SpriteBatch before it flushes
        */
        size: number;
        sprites: any[];

        /**
        * Holds the vertices
        */
        vertices: number[];
        vertSize: number;


        /**
        * 
        * 
        * @param renderSession The RenderSession object
        */
        begin(renderSession: RenderSession): void;

        /**
        * Destroys the SpriteBatch.
        */
        destroy(): void;
        end(): void;

        /**
        * Renders the content and empties the current batch.
        */
        flush(shader?: IPixiShader): void;

        /**
        * 
        * 
        * @param sprite the sprite to render when using this spritebatch
        * @param matrix - Optional matrix. If provided the Display Object will be rendered using this matrix, otherwise it will use its worldTransform.
        */
        render(sprite: Sprite): void;

        /**
        * 
        * 
        * @param texture -
        * @param size -
        * @param startIndex -
        */
        renderBatch(texture: Texture, size: number, startIndex: number): void;

        /**
        * Renders a TilingSprite using the spriteBatch.
        * 
        * @param sprite the sprite to render
        */
        renderTilingSprite(sprite: TilingSprite): void;
        setBlendMode(blendMode: blendModes): void;

        /**
        * 
        * 
        * @param gl the current WebGL drawing context
        */
        setContext(gl: WebGLRenderingContext): void;
        start(): void;
        stop(): void;

    ***REMOVED***


    /**
    * A RenderTexture is a special texture that allows any Pixi display object to be rendered to it.
    * 
    * __Hint__: All DisplayObjects (i.e. Sprites) that render to a RenderTexture should be preloaded otherwise black rectangles will be drawn instead.
    * 
    * A RenderTexture takes a snapshot of any Display Object given to its render method. The position and rotation of the given Display Objects is ignored. For example:
    * 
    *    var renderTexture = new PIXI.RenderTexture(800, 600);
    *    var sprite = PIXI.Sprite.fromImage("spinObj_01.png");
    *    sprite.position.x = 800/2;
    *    sprite.position.y = 600/2;
    *    sprite.anchor.x = 0.5;
    *    sprite.anchor.y = 0.5;
    *    renderTexture.render(sprite);
    * 
    * The Sprite in this case will be rendered to a position of 0,0. To render this sprite at its actual position a DisplayObjectContainer should be used:
    * 
    *    var doc = new PIXI.DisplayObjectContainer();
    *    doc.addChild(sprite);
    *    renderTexture.render(doc);  // Renders to center of renderTexture
    */
    export class RenderTexture extends Texture ***REMOVED***


        /**
        * A RenderTexture is a special texture that allows any Pixi display object to be rendered to it.
        * 
        * __Hint__: All DisplayObjects (i.e. Sprites) that render to a RenderTexture should be preloaded otherwise black rectangles will be drawn instead.
        * 
        * A RenderTexture takes a snapshot of any Display Object given to its render method. The position and rotation of the given Display Objects is ignored. For example:
        * 
        *    var renderTexture = new PIXI.RenderTexture(800, 600);
        *    var sprite = PIXI.Sprite.fromImage("spinObj_01.png");
        *    sprite.position.x = 800/2;
        *    sprite.position.y = 600/2;
        *    sprite.anchor.x = 0.5;
        *    sprite.anchor.y = 0.5;
        *    renderTexture.render(sprite);
        * 
        * The Sprite in this case will be rendered to a position of 0,0. To render this sprite at its actual position a DisplayObjectContainer should be used:
        * 
        *    var doc = new PIXI.DisplayObjectContainer();
        *    doc.addChild(sprite);
        *    renderTexture.render(doc);  // Renders to center of renderTexture
        * 
        * @param width The width of the render texture
        * @param height The height of the render texture
        * @param renderer The renderer used for this RenderTexture
        * @param scaleMode See ***REMOVED******REMOVED***#crossLink "PIXI/scaleModes:property"***REMOVED******REMOVED***PIXI.scaleModes***REMOVED******REMOVED***/crossLink***REMOVED******REMOVED*** for possible values
        * @param resolution The resolution of the texture being generated
        */
        constructor(width?: number, height?: number, renderer?: PixiRenderer, scaleMode?: scaleModes, resolution?: number);


        /**
        * The framing rectangle of the render texture
        */
        frame: Rectangle;

        /**
        * The base texture object that this texture uses
        */
        baseTexture: BaseTexture;

        /**
        * The renderer this RenderTexture uses. A RenderTexture can only belong to one renderer at the moment if its webGL.
        */
        renderer: PixiRenderer;

        /**
        * The Resolution of the texture.
        */
        resolution: number;
        valid: boolean;


        /**
        * Clears the RenderTexture.
        */
        clear(): void;

        /**
        * Will return a base64 encoded string of this texture. It works by calling RenderTexture.getCanvas and then running toDataURL on that.
        * @return A base64 encoded string of the texture.
        */
        getBase64(): string;

        /**
        * Creates a Canvas element, renders this RenderTexture to it and then returns it.
        * @return A Canvas element with the texture rendered on.
        */
        getCanvas(): HTMLCanvasElement;

        /**
        * Will return a HTML Image of the texture
        */
        getImage(): HTMLImageElement;

        /**
        * Resizes the RenderTexture.
        * 
        * @param width The width to resize to.
        * @param height The height to resize to.
        * @param updateBase Should the baseTexture.width and height values be resized as well?
        */
        resize(width: number, height: number, updateBase: boolean): void;
        render(displayObject: DisplayObject, matrix?: Matrix, clear?: boolean): void;

    ***REMOVED***

    // SPINE

    export class BoneData ***REMOVED***

        constructor(name: string, parent?: any);

        name: string;
        parent: any;
        length: number;
        x: number;
        y: number;
        rotation: number;
        scaleX: number;
        scaleY: number;

    ***REMOVED***

    export class SlotData ***REMOVED***

        constructor(name: string, boneData: BoneData);

        name: string;
        boneData: BoneData;
        r: number;
        g: number;
        b: number;
        a: number;
        attachmentName: string;

    ***REMOVED***

    export class Bone ***REMOVED***

        constructor(boneData: BoneData, parent?: any);

        data: BoneData;
        parent: any;
        yDown: boolean;
        x: number;
        y: number;
        rotation: number;
        scaleX: number;
        scaleY: number;
        worldRotation: number;
        worldScaleX: number;
        worldScaleY: number;

        updateWorldTransform(flipX: boolean, flip: boolean): void;
        setToSetupPose(): void;

    ***REMOVED***

    export class Slot ***REMOVED***

        constructor(slotData: SlotData, skeleton: Skeleton, bone: Bone);

        data: SlotData;
        skeleton: Skeleton;
        bone: Bone;
        r: number;
        g: number;
        b: number;
        a: number;
        attachment: RegionAttachment;
        setAttachment(attachment: RegionAttachment): void;
        setAttachmentTime(time: number): void;
        getAttachmentTime(): number;
        setToSetupPose(): void;

    ***REMOVED***

    export class Skin ***REMOVED***

        constructor(name: string);

        name: string;
        attachments: any;

        addAttachment(slotIndex: number, name: string, attachment: RegionAttachment): void;
        getAttachment(slotIndex: number, name: string): void;

    ***REMOVED***

    export class Animation ***REMOVED***

        constructor(name: string, timelines: ISpineTimeline[], duration: number);

        name: string;
        timelines: ISpineTimeline[];
        duration: number;
        apply(skeleton: Skeleton, time: number, loop: boolean): void;
        min(skeleton: Skeleton, time: number, loop: boolean, alpha: number): void;

    ***REMOVED***

    export class Curves ***REMOVED***

        constructor(frameCount: number);

        curves: number[];

        setLinear(frameIndex: number): void;
        setStepped(frameIndex: number): void;
        setCurve(frameIndex: number, cx1: number, cy1: number, cx2: number, cy2: number): void;
        getCurvePercent(frameIndex: number, percent: number): number;

    ***REMOVED***

    export interface ISpineTimeline ***REMOVED***

        curves: Curves;
        frames: number[];

        getFrameCount(): number;
        apply(skeleton: Skeleton, time: number, alpha: number): void;

    ***REMOVED***

    export class RotateTimeline implements ISpineTimeline ***REMOVED***

        constructor(frameCount: number);

        curves: Curves;
        frames: number[];
        boneIndex: number;

        getFrameCount(): number;
        setFrame(frameIndex: number, time: number, angle: number): void;
        apply(skeleton: Skeleton, time: number, alpha: number): void;

    ***REMOVED***

    export class TranslateTimeline implements ISpineTimeline ***REMOVED***

        constructor(frameCount: number);

        curves: Curves;
        frames: number[];
        boneIndex: number;

        getFrameCount(): number;
        setFrame(frameIndex: number, time: number, x: number, y: number): void;
        apply(skeleton: Skeleton, time: number, alpha: number): void;

    ***REMOVED***

    export class ScaleTimeline implements ISpineTimeline ***REMOVED***

        constructor(frameCount: number);

        curves: Curves;
        frames: number[];
        boneIndex: number;

        getFrameCount(): number;
        setFrame(frameIndex: number, time: number, x: number, y: number): void;
        apply(skeleton: Skeleton, time: number, alpha: number): void;

    ***REMOVED***

    export class ColorTimeline implements ISpineTimeline ***REMOVED***

        constructor(frameCount: number);

        curves: Curves;
        frames: number[];
        boneIndex: number;

        getFrameCount(): number;
        setFrame(frameIndex: number, time: number, r: number, g: number, b: number, a: number): void;
        apply(skeleton: Skeleton, time: number, alpha: number): void;

    ***REMOVED***

    export class AttachmentTimeline implements ISpineTimeline ***REMOVED***

        constructor(frameCount: number);

        curves: Curves;
        frames: number[];
        attachmentNames: string[];
        slotIndex: number;

        getFrameCount(): number;
        setFrame(frameIndex: number, time: number, attachmentName: string): void;
        apply(skeleton: Skeleton, time: number, alpha: number): void;

    ***REMOVED***

    export class SkeletonData ***REMOVED***

        bones: Bone[];
        slots: Slot[];
        skins: Skin[];
        animations: Animation[];
        defaultSkin: Skin;

        findBone(boneName: string): Bone;
        findBoneIndex(boneName: string): number;
        findSlot(slotName: string): Slot;
        findSlotIndex(slotName: string): number;
        findSkin(skinName: string): Skin;
        findAnimation(animationName: string): Animation;

    ***REMOVED***

    export class Skeleton ***REMOVED***

        constructor(skeletonData: SkeletonData);

        data: SkeletonData;
        bones: Bone[];
        slots: Slot[];
        drawOrder: any[];
        x: number;
        y: number;
        skin: Skin;
        r: number;
        g: number;
        b: number;
        a: number;
        time: number;
        flipX: boolean;
        flipY: boolean;

        updateWorldTransform(): void;
        setToSetupPose(): void;
        setBonesToSetupPose(): void;
        setSlotsToSetupPose(): void;
        getRootBone(): Bone;
        findBone(boneName: string): Bone;
        fineBoneIndex(boneName: string): number;
        findSlot(slotName: string): Slot;
        findSlotIndex(slotName: string): number;
        setSkinByName(skinName: string): void;
        setSkin(newSkin: Skin): void;
        getAttachmentBySlotName(slotName: string, attachmentName: string): RegionAttachment;
        getAttachmentBySlotIndex(slotIndex: number, attachmentName: string): RegionAttachment;
        setAttachment(slotName: string, attachmentName: string): void;
        update(data: number): void;

    ***REMOVED***

    export class RegionAttachment ***REMOVED***

        offset: number[];
        uvs: number[];
        x: number;
        y: number;
        rotation: number;
        scaleX: number;
        scaleY: number;
        width: number;
        height: number;
        rendererObject: any;
        regionOffsetX: number;
        regionOffsetY: number;
        regionWidth: number;
        regionHeight: number;
        regionOriginalWidth: number;
        regionOriginalHeight: number;

        setUVs(u: number, v: number, u2: number, v2: number, rotate: number): void;
        updateOffset(): void;
        computeVertices(x: number, y: number, bone: Bone, vertices: number[]): void;

    ***REMOVED***

    export class AnimationStateData ***REMOVED***

        constructor(skeletonData: SkeletonData);

        skeletonData: SkeletonData;
        animationToMixTime: any;
        defaultMix: number;

        setMixByName(fromName: string, toName: string, duration: number): void;
        setMix(from: string, to: string): number;

    ***REMOVED***

    export class AnimationState ***REMOVED***

        constructor(stateData: any);

        animationSpeed: number;
        current: any;
        previous: any;
        currentTime: number;
        previousTime: number;
        currentLoop: boolean;
        previousLoop: boolean;
        mixTime: number;
        mixDuration: number;
        queue: Animation[];

        update(delta: number): void;
        apply(skeleton: any): void;
        clearAnimation(): void;
        setAnimation(animation: any, loop: boolean): void;
        setAnimationByName(animationName: string, loop: boolean): void;
        addAnimationByName(animationName: string, loop: boolean, delay: number): void;
        addAnimation(animation: any, loop: boolean, delay: number): void;
        isComplete(): number;

    ***REMOVED***

    export class SkeletonJson ***REMOVED***

        constructor(attachmentLoader: AtlasAttachmentLoader);

        attachmentLoader: AtlasAttachmentLoader;
        scale: number;

        readSkeletonData(root: any): SkeletonData;
        readAttachment(skin: Skin, name: string, map: any): RegionAttachment;
        readAnimation(name: string, map: any, skeletonData: SkeletonData): void;
        readCurve(timeline: ISpineTimeline, frameIndex: number, valueMap: any): void;
        toColor(hexString: string, colorIndex: number): number;

    ***REMOVED***

    export class Atlas ***REMOVED***

        static FORMAT: ***REMOVED***

            alpha: number;
            intensity: number;
            luminanceAlpha: number;
            rgb565: number;
            rgba4444: number;
            rgb888: number;
            rgba8888: number;

        ***REMOVED***;

        static TextureFilter: ***REMOVED***

            nearest: number;
            linear: number;
            mipMap: number;
            mipMapNearestNearest: number;
            mipMapLinearNearest: number;
            mipMapNearestLinear: number;
            mipMapLinearLinear: number;

        ***REMOVED***;

        static textureWrap: ***REMOVED***

            mirroredRepeat: number;
            clampToEdge: number;
            repeat: number;

        ***REMOVED***;

        constructor(atlasText: string, textureLoader: AtlasLoader);

        textureLoader: AtlasLoader;
        pages: AtlasPage[];
        regions: AtlasRegion[];

        findRegion(name: string): AtlasRegion;
        dispose(): void;
        updateUVs(page: AtlasPage): void;

    ***REMOVED***

    export class AtlasPage ***REMOVED***

        name: string;
        format: number;
        minFilter: number;
        magFilter: number;
        uWrap: number;
        vWrap: number;
        rendererObject: any;
        width: number;
        height: number;

    ***REMOVED***

    export class AtlasRegion ***REMOVED***

        page: AtlasPage;
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
        u: number;
        v: number;
        u2: number;
        v2: number;
        offsetX: number;
        offsetY: number;
        originalWidth: number;
        originalHeight: number;
        index: number;
        rotate: boolean;
        splits: any[];
        pads: any[];

    ***REMOVED***

    export class AtlasReader ***REMOVED***

        constructor(text: string);

        lines: string[];
        index: number;

        trim(value: string): string;
        readLine(): string;
        readValue(): string;
        readTuple(tuple: number): number;

    ***REMOVED***

    export class AtlasAttachmentLoader ***REMOVED***

        constructor(atlas: Atlas);

        atlas: Atlas;

        newAttachment(skin: Skin, type: number, name: string): RegionAttachment;

    ***REMOVED***

    export class Spine extends DisplayObjectContainer ***REMOVED***

        constructor(url: string);

        autoUpdate: boolean;
        spineData: any;
        skeleton: Skeleton;
        stateData: AnimationStateData;
        state: AnimationState;
        slotContainers: DisplayObjectContainer[];

        createSprite(slot: Slot, descriptor: ***REMOVED*** name: string ***REMOVED***): Sprite[];
        update(dt: number): void;

    ***REMOVED***

***REMOVED***

declare function requestAnimFrame(callback: Function): void;

declare module PIXI.PolyK ***REMOVED***
    export function Triangulate(p: number[]): number[];
***REMOVED***