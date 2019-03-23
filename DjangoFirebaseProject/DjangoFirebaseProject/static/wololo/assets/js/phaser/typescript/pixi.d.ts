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

    export class AbstractFilter ***REMOVED***

        constructor(fragmentSrc: string | string[], uniforms: any);

        dirty: boolean;
        padding: number;
        uniforms: any;
        fragmentSrc: string | string[];

        apply(frameBuffer: WebGLFramebuffer): void;
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

    export class BaseTexture implements Mixin ***REMOVED***

        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: scaleModes): BaseTexture;

        constructor(source: HTMLImageElement, scaleMode: scaleModes);
        constructor(source: HTMLCanvasElement, scaleMode: scaleModes);

        height: number;
        hasLoaded: boolean;
        mipmap: boolean;
        premultipliedAlpha: boolean;
        resolution: number;
        scaleMode: scaleModes;
        skipRender: boolean;
        source: HTMLImageElement;
        width: number;

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;
        forceLoaded(width: number, height: number): void;
        destroy(): void;
        dirty(): void;
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

    export class CanvasBuffer ***REMOVED***

        constructor(width: number, height: number);

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        height: number;
        width: number;

        destroy(): void;
        clear(): void;
        resize(width: number, height: number): void;

    ***REMOVED***

    export class CanvasPool ***REMOVED***

        static create(parent: HTMLElement, width?: number, height?: number): HTMLCanvasElement;
        static getFirst(): HTMLCanvasElement;
        static remove(parent: HTMLElement): void;
        static removeByCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement;
        static getTotal(): number;
        static getFree(): number;

    ***REMOVED***

    export class CanvasMaskManager ***REMOVED***

        pushMask(maskData: MaskData, renderSession: RenderSession): void;
        popMask(renderSession: RenderSession): void;

    ***REMOVED***

    export class CanvasRenderer implements PixiRenderer ***REMOVED***

        constructor(game: Phaser.Game);

        game: Phaser.Game;
        type: number;
        resolution: number;
        clearBeforeRender: boolean;
        transparent: boolean;
        autoResize: boolean;
        width: number;
        height: number;
        view: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        refresh: boolean;
        count: number;
        maskManager: CanvasMaskManager;
        renderSession: RenderSession;

        render(stage: DisplayObjectContainer): void;
        resize(width: number, height: number): void;
        destroy(removeView?: boolean): void;

    ***REMOVED***

    export class CanvasTinter ***REMOVED***

        static getTintedTexture(sprite: Sprite, color: number): HTMLCanvasElement;
        static tintWithMultiply(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static tintWithOverlay(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static tintWithPerPixel(texture: Texture, color: number, canvas: HTMLCanvasElement): void;

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

    export class DisplayObjectContainer extends DisplayObject ***REMOVED***

        constructor();

        children: DisplayObject[];
        height: number;
        width: number;
        ignoreChildInput: boolean;

        addChild(child: DisplayObject): DisplayObject;
        addChildAt(child: DisplayObject, index: number): DisplayObject;
        getBounds(targetCoordinateSpace?: DisplayObject | Matrix): Rectangle;
        getChildAt(index: number): DisplayObject;
        getChildIndex(child: DisplayObject): number;
        getLocalBounds(): Rectangle;
        removeChild(child: DisplayObject): DisplayObject;
        removeChildAt(index: number): DisplayObject;
        removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[];
        removeStageReference(): void;
        setChildIndex(child: DisplayObject, index: number): void;
        swapChildren(child: DisplayObject, child2: DisplayObject): void;
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

    export class Event ***REMOVED***

        constructor(target: any, name: string, data: any);

        target: any;
        type: string;
        data: any;
        timeStamp: number;

        stopPropagation(): void;
        preventDefault(): void;
        stopImmediatePropagation(): void;

    ***REMOVED***

    export class EventTarget ***REMOVED***

        static mixin(obj: any): void;

    ***REMOVED***

    export class FilterTexture ***REMOVED***

        constructor(gl: WebGLRenderingContext, width: number, height: number, scaleMode: scaleModes);

        fragmentSrc: string[];
        frameBuffer: WebGLFramebuffer;
        gl: WebGLRenderingContext;
        program: WebGLProgram;
        scaleMode: number;
        texture: WebGLTexture;

        clear(): void;
        resize(width: number, height: number): void;
        destroy(): void;

    ***REMOVED***

    export class GraphicsData ***REMOVED***

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

    export class Graphics extends DisplayObjectContainer ***REMOVED***

        static POLY: number;
        static RECT: number;
        static CIRC: number;
        static ELIP: number;
        static RREC: number;

        blendMode: number;
        boundsPadding: number;
        fillAlpha: number;
        isMask: boolean;
        lineWidth: number;
        lineColor: number;
        tint: number;
        worldAlpha: number;

        arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): Graphics;
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
        beginFill(color?: number, alpha?: number): Graphics;
        bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): Graphics;
        clear(): Graphics;
        destroyCachedSprite(): void;
        drawCircle(x: number, y: number, diameter: number): Graphics;
        drawEllipse(x: number, y: number, width: number, height: number): Graphics;
        drawPolygon(...path: any[]): Graphics;
        drawRect(x: number, y: number, width: number, height: number): Graphics;
        drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): Graphics;
        drawShape(shape: Circle): GraphicsData;
        drawShape(shape: Rectangle): GraphicsData;
        drawShape(shape: Ellipse): GraphicsData;
        drawShape(shape: Polygon): GraphicsData;
        endFill(): Graphics;
        generateTexture(resolution?: number, scaleMode?: number, padding?: number): RenderTexture;
        lineStyle(lineWidth?: number, color?: number, alpha?: number): Graphics;
        lineTo(x: number, y: number): Graphics;
        moveTo(x: number, y: number): Graphics;
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

        constructor(gl: WebGLRenderingContext);

        attributes: ShaderAttribute[];
        defaultVertexSrc: string[];
        dirty: boolean;
        firstRun: boolean;
        textureCount: number;
        fragmentSrc: string[];
        gl: WebGLRenderingContext;
        program: WebGLProgram;
        vertexSrc: string[];

        initSampler2D(): void;
        initUniforms(): void;
        syncUniforms(): void;

        destroy(): void;
        init(): void;

    ***REMOVED***

    export class PixiFastShader implements IPixiShader ***REMOVED***

        constructor(gl: WebGLRenderingContext);

        textureCount: number;
        fragmentSrc: string[];
        gl: WebGLRenderingContext;
        program: WebGLProgram;
        vertexSrc: string[];

        destroy(): void;
        init(): void;

    ***REMOVED***

    export class PrimitiveShader implements IPixiShader ***REMOVED***

        constructor(gl: WebGLRenderingContext);
        fragmentSrc: string[];
        gl: WebGLRenderingContext;
        program: WebGLProgram;
        vertexSrc: string[];

        destroy(): void;
        init(): void;

    ***REMOVED***

    export class ComplexPrimitiveShader implements IPixiShader ***REMOVED***

        constructor(gl: WebGLRenderingContext);
        fragmentSrc: string[];
        gl: WebGLRenderingContext;
        program: WebGLProgram;
        vertexSrc: string[];

        destroy(): void;
        init(): void;

    ***REMOVED***

    export class StripShader implements IPixiShader ***REMOVED***

        constructor(gl: WebGLRenderingContext);
        fragmentSrc: string[];
        gl: WebGLRenderingContext;
        program: WebGLProgram;
        vertexSrc: string[];

        destroy(): void;
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

    export class Sprite extends DisplayObjectContainer ***REMOVED***

        constructor(texture: Texture);

        anchor: Point;
        blendMode: blendModes;
        exists: boolean;
        shader: IPixiShader;
        texture: Texture;
        tint: number;

        setTexture(texture: Texture, destroyBase?: boolean): void;

    ***REMOVED***

    export class SpriteBatch extends DisplayObjectContainer ***REMOVED***

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

        constructor(texture: Texture);

        blendMode: number;
        colors: number[];
        dirty: boolean;
        indices: number[];
        canvasPadding: number;
        texture: Texture;
        uvs: number[];
        vertices: number[];

        getBounds(matrix?: Matrix): Rectangle;

    ***REMOVED***

    export class Texture implements Mixin ***REMOVED***

        static emptyTexture: Texture;

        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: scaleModes): Texture;

        constructor(baseTexture: BaseTexture, frame?: Rectangle, crop?: Rectangle, trim?: Rectangle);

        baseTexture: BaseTexture;
        crop: Rectangle;
        frame: Rectangle;
        height: number;
        noFrame: boolean;
        requiresUpdate: boolean;
        trim: Point;
        width: number;
        scope: any;
        valid: boolean;

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        destroy(destroyBase: boolean): void;
        setFrame(frame: Rectangle): void;

    ***REMOVED***

    export class TilingSprite extends Sprite ***REMOVED***

        constructor(texture: Texture, width: number, height: number);

        canvasBuffer: PIXI.CanvasBuffer;
        blendMode: number;
        refreshTexture: boolean;
        texture: Texture;
        textureDebug: boolean;
        tint: number;
        tilePosition: Point;
        tilePattern: PIXI.Texture;
        tileScale: Point;
        tileScaleOffset: Point;

        destroy(): void;
        generateTilingTexture(forcePowerOfTwo?: boolean): void;
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

        destroy(): void;
        setBlendMode(blendMode: number): boolean;
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
        indices: number[];
        lastIndexCount: number;
        matrix: Matrix;
        maxSize: number;
        shader: IPixiShader;
        size: number;
        vertexBuffer: any;
        vertices: number[];
        vertSize: number;

        end(): void;
        begin(spriteBatch: SpriteBatch, renderSession: RenderSession): void;
        destroy(removeView?: boolean): void;
        flush(): void;
        render(spriteBatch: SpriteBatch): void;
        renderSprite(sprite: Sprite): void;
        setContext(gl: WebGLRenderingContext): void;
        start(): void;
        stop(): void;

    ***REMOVED***

    export class WebGLFilterManager ***REMOVED***

        filterStack: AbstractFilter[];
        transparent: boolean;
        offsetX: number;
        offsetY: number;

        applyFilterPass(filter: AbstractFilter, filterArea: Texture, width: number, height: number): void;
        begin(renderSession: RenderSession, buffer: ArrayBuffer): void;
        destroy(): void;
        initShaderBuffers(): void;
        popFilter(): void;
        pushFilter(filterBlock: FilterBlock): void;
        setContext(gl: WebGLRenderingContext): void;

    ***REMOVED***

    export class WebGLGraphics ***REMOVED***

        static graphicsDataPool: any[];

        static renderGraphics(graphics: Graphics, renderRession: RenderSession): void;
        static updateGraphics(graphics: Graphics, gl: WebGLRenderingContext): void;
        static switchMode(webGL: WebGLRenderingContext, type: number): any;
        static buildRectangle(graphicsData: GraphicsData, webGLData: any): void;
        static buildRoundedRectangle(graphicsData: GraphicsData, webGLData: any): void;
        static quadraticBezierCurve(fromX: number, fromY: number, cpX: number, cpY: number, toX: number, toY: number): number[];
        static buildCircle(graphicsData: GraphicsData, webGLData: any): void;
        static buildLine(graphicsData: GraphicsData, webGLData: any): void;
        static buildComplexPoly(graphicsData: GraphicsData, webGLData: any): void;
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

        destroy(): void;
        popMask(renderSession: RenderSession): void;
        pushMask(maskData: any[], renderSession: RenderSession): void;
        setContext(gl: WebGLRenderingContext): void;

    ***REMOVED***

    export class WebGLRenderer implements PixiRenderer ***REMOVED***

        static createWebGLTexture(texture: Texture, gl: WebGLRenderingContext): void;

        constructor(game: Phaser.Game);

        game: Phaser.Game;
        type: number;
        resolution: number;
        transparent: boolean;
        autoResize: boolean;
        preserveDrawingBuffer: boolean;
        clearBeforeRender: boolean;
        width: number;
        height: number;
        view: HTMLCanvasElement;
        projection: Point;
        offset: Point;
        shaderManager: WebGLShaderManager;
        spriteBatch: WebGLSpriteBatch;
        maskManager: WebGLMaskManager;
        filterManager: WebGLFilterManager;
        stencilManager: WebGLStencilManager;
        blendModeManager: WebGLBlendModeManager;
        renderSession: RenderSession;

        initContext(): void;
        render(stage: DisplayObjectContainer): void;
        renderDisplayObject(displayObject: DisplayObject, projection: Point, buffer: WebGLBuffer): void;
        resize(width: number, height: number): void;
        updateTexture(texture: Texture): void;
        destroy(): void;
        mapBlendModes(): void;

    ***REMOVED***

    export class WebGLShaderManager ***REMOVED***

        maxAttibs: number;
        attribState: any[];
        stack: any[];
        tempAttribState: any[];

        destroy(): void;
        setAttribs(attribs: ShaderAttribute[]): void;
        setContext(gl: WebGLRenderingContext): void;
        setShader(shader: IPixiShader): boolean;

    ***REMOVED***

    export class WebGLStencilManager ***REMOVED***

        stencilStack: any[];
        reverse: boolean;
        count: number;

        bindGraphics(graphics: Graphics, webGLData: any[], renderSession: RenderSession): void;
        destroy(): void;
        popStencil(graphics: Graphics, webGLData: any[], renderSession: RenderSession): void;
        pushStencil(graphics: Graphics, webGLData: any[], renderSession: RenderSession): void;
        setContext(gl: WebGLRenderingContext): void;

    ***REMOVED***

    export class WebGLSpriteBatch ***REMOVED***

        blendModes: number[];
        colors: number[];
        currentBatchSize: number;
        currentBaseTexture: Texture;
        defaultShader: AbstractFilter;
        dirty: boolean;
        drawing: boolean;
        indices: number[];
        lastIndexCount: number;
        positions: number[];
        textures: Texture[];
        shaders: IPixiShader[];
        size: number;
        sprites: any[];
        vertices: number[];
        vertSize: number;

        begin(renderSession: RenderSession): void;
        destroy(): void;
        end(): void;
        flush(shader?: IPixiShader): void;
        render(sprite: Sprite): void;
        renderBatch(texture: Texture, size: number, startIndex: number): void;
        renderTilingSprite(sprite: TilingSprite): void;
        setBlendMode(blendMode: blendModes): void;
        setContext(gl: WebGLRenderingContext): void;
        start(): void;
        stop(): void;

    ***REMOVED***

    export class RenderTexture extends Texture ***REMOVED***

        constructor(width?: number, height?: number, renderer?: PixiRenderer, scaleMode?: scaleModes, resolution?: number);

        frame: Rectangle;
        baseTexture: BaseTexture;
        renderer: PixiRenderer;
        resolution: number;
        valid: boolean;

        clear(): void;
        getBase64(): string;
        getCanvas(): HTMLCanvasElement;
        getImage(): HTMLImageElement;
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
