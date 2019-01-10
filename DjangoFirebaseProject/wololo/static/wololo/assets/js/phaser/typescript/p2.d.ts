// Type definitions for p2.js v0.6.0
// Project: https://github.com/schteppe/p2.js/

declare module p2 ***REMOVED***

    export class AABB ***REMOVED***

        constructor(options?: ***REMOVED***
            upperBound?: number[];
            lowerBound?: number[];
        ***REMOVED***);

        setFromPoints(points: number[][], position: number[], angle: number, skinSize: number): void;
        copy(aabb: AABB): void;
        extend(aabb: AABB): void;
        overlaps(aabb: AABB): boolean;

    ***REMOVED***

    export class Broadphase ***REMOVED***

        static AABB: number;
        static BOUNDING_CIRCLE: number;

        static NAIVE: number;
        static SAP: number;

        static boundingRadiusCheck(bodyA: Body, bodyB: Body): boolean;
        static aabbCheck(bodyA: Body, bodyB: Body): boolean;
        static canCollide(bodyA: Body, bodyB: Body): boolean;

        constructor(type: number);

        type: number;
        result: Body[];
        world: World;
        boundingVolumeType: number;

        setWorld(world: World): void;
        getCollisionPairs(world: World): Body[];
        boundingVolumeCheck(bodyA: Body, bodyB: Body): boolean;

    ***REMOVED***

    export class GridBroadphase extends Broadphase ***REMOVED***

        constructor(options?: ***REMOVED***
            xmin?: number;
            xmax?: number;
            ymin?: number;
            ymax?: number;
            nx?: number;
            ny?: number;
        ***REMOVED***);

        xmin: number;
        xmax: number;
        ymin: number;
        ymax: number;
        nx: number;
        ny: number;
        binsizeX: number;
        binsizeY: number;

    ***REMOVED***

    export class NativeBroadphase extends Broadphase ***REMOVED***

    ***REMOVED***

    export class Narrowphase ***REMOVED***

        contactEquations: ContactEquation[];
        frictionEquations: FrictionEquation[];
        enableFriction: boolean;
        slipForce: number;
        frictionCoefficient: number;
        surfaceVelocity: number;
        reuseObjects: boolean;
        resuableContactEquations: any[];
        reusableFrictionEquations: any[];
        restitution: number;
        stiffness: number;
        relaxation: number;
        frictionStiffness: number;
        frictionRelaxation: number;
        enableFrictionReduction: boolean;
        contactSkinSize: number;

        collidedLastStep(bodyA: Body, bodyB: Body): boolean;
        reset(): void;
        createContactEquation(bodyA: Body, bodyB: Body, shapeA: Shape, shapeB: Shape): ContactEquation;
        createFrictionFromContact(c: ContactEquation): FrictionEquation;

    ***REMOVED***

    export class SAPBroadphase extends Broadphase ***REMOVED***

        axisList: Body[];
        axisIndex: number;

    ***REMOVED***

    export class Constraint ***REMOVED***

        static DISTANCE: number;
        static GEAR: number;
        static LOCK: number;
        static PRISMATIC: number;
        static REVOLUTE: number;

        constructor(bodyA: Body, bodyB: Body, type: number, options?: ***REMOVED***
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
        ***REMOVED***);

        type: number;
        equeations: Equation[];
        bodyA: Body;
        bodyB: Body;
        collideConnected: boolean;

        update(): void;
        setStiffness(stiffness: number): void;
        setRelaxation(relaxation: number): void;

    ***REMOVED***

    export class DistanceConstraint extends Constraint ***REMOVED***

        constructor(bodyA: Body, bodyB: Body, type: number, options?: ***REMOVED***
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
            distance?: number;
            localAnchorA?: number[];
            localAnchorB?: number[];
            maxForce?: number;
        ***REMOVED***);

        localAnchorA: number[];
        localAnchorB: number[];
        distance: number;
        maxForce: number;
        upperLimitEnabled: boolean;
        upperLimit: number;
        lowerLimitEnabled: boolean;
        lowerLimit: number;
        position: number;

        setMaxForce(f: number): void;
        getMaxForce(): number;

    ***REMOVED***

    export class GearConstraint extends Constraint ***REMOVED***

        constructor(bodyA: Body, bodyB: Body, type: number, options?: ***REMOVED***
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
            angle?: number;
            ratio?: number;
            maxTorque?: number;
        ***REMOVED***);

        ratio: number;
        angle: number;

        setMaxTorque(torque: number): void;
        getMaxTorque(): number;

    ***REMOVED***

    export class LockConstraint extends Constraint ***REMOVED***

        constructor(bodyA: Body, bodyB: Body, type: number, options?: ***REMOVED***
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
            localOffsetB?: number[];
            localAngleB?: number;
            maxForce?: number;
        ***REMOVED***);

        setMaxForce(force: number): void;
        getMaxForce(): number;

    ***REMOVED***

    export class PrismaticConstraint extends Constraint ***REMOVED***

        constructor(bodyA: Body, bodyB: Body, type: number, options?: ***REMOVED***
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
            maxForce?: number;
            localAnchorA?: number[];
            localAnchorB?: number[];
            localAxisA?: number[];
            disableRotationalLock?: boolean;
            upperLimit?: number;
            lowerLimit?: number;
        ***REMOVED***);

        localAnchorA: number[];
        localAnchorB: number[];
        localAxisA: number[];
        position: number;
        velocity: number;
        lowerLimitEnabled: boolean;
        upperLimitEnabled: boolean;
        lowerLimit: number;
        upperLimit: number;
        upperLimitEquation: ContactEquation;
        lowerLimitEquation: ContactEquation;
        motorEquation: Equation;
        motorEnabled: boolean;
        motorSpeed: number;

        enableMotor(): void;
        disableMotor(): void;
        setLimits(lower: number, upper: number): void;

    ***REMOVED***

    export class RevoluteConstraint extends Constraint ***REMOVED***

        constructor(bodyA: Body, bodyB: Body, type: number, options?: ***REMOVED***
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
            worldPivot?: number[];
            localPivotA?: number[];
            localPivotB?: number[];
            maxForce?: number;
        ***REMOVED***);

        pivotA: number[];
        pivotB: number[];
        motorEquation: RotationalVelocityEquation;
        motorEnabled: boolean;
        angle: number;
        lowerLimitEnabled: boolean;
        upperLimitEnabled: boolean;
        lowerLimit: number;
        upperLimit: number;
        upperLimitEquation: ContactEquation;
        lowerLimitEquation: ContactEquation;

        enableMotor(): void;
        disableMotor(): void;
        motorIsEnabled(): boolean;
        setLimits(lower: number, upper: number): void;
        setMotorSpeed(speed: number): void;
        getMotorSpeed(): number;

    ***REMOVED***

    export class AngleLockEquation extends Equation ***REMOVED***

        constructor(bodyA: Body, bodyB: Body, options?: ***REMOVED***
            angle?: number;
            ratio?: number;
        ***REMOVED***);

        computeGq(): number;
        setRatio(ratio: number): number;
        setMaxTorque(torque: number): number;

    ***REMOVED***

    export class ContactEquation extends Equation ***REMOVED***

        constructor(bodyA: Body, bodyB: Body);

        contactPointA: number[];
        penetrationVec: number[];
        contactPointB: number[];
        normalA: number[];
        restitution: number;
        firstImpact: boolean;
        shapeA: Shape;
        shapeB: Shape;

        computeB(a: number, b: number, h: number): number;

    ***REMOVED***

    export class Equation ***REMOVED***

        static DEFAULT_STIFFNESS: number;
        static DEFAULT_RELAXATION: number;

        constructor(bodyA: Body, bodyB: Body, minForce?: number, maxForce?: number);

        minForce: number;
        maxForce: number;
        bodyA: Body;
        bodyB: Body;
        stiffness: number;
        relaxation: number;
        G: number[];
        offset: number;
        a: number;
        b: number;
        epsilon: number;
        timeStep: number;
        needsUpdate: boolean;
        multiplier: number;
        relativeVelocity: number;
        enabled: boolean;

        gmult(G: number[], vi: number[], wi: number[], vj: number[], wj: number[]): number;
        computeB(a: number, b: number, h: number): number;
        computeGq(): number;
        computeGW(): number;
        computeGWlambda(): number;
        computeGiMf(): number;
        computeGiMGt(): number;
        addToWlambda(deltalambda: number): number;
        computeInvC(eps: number): number;

    ***REMOVED***

    export class FrictionEquation extends Equation ***REMOVED***

        constructor(bodyA: Body, bodyB: Body, slipForce: number);

        contactPointA: number[];
        contactPointB: number[];
        t: number[];
        shapeA: Shape;
        shapeB: Shape;
        frictionCoefficient: number;

        setSlipForce(slipForce: number): number;
        getSlipForce(): number;
        computeB(a: number, b: number, h: number): number;

    ***REMOVED***

    export class RotationalLockEquation extends Equation ***REMOVED***

        constructor(bodyA: Body, bodyB: Body, options?: ***REMOVED***
            angle?: number;
        ***REMOVED***);

        angle: number;

        computeGq(): number;

    ***REMOVED***

    export class RotationalVelocityEquation extends Equation ***REMOVED***

        constructor(bodyA: Body, bodyB: Body);

        computeB(a: number, b: number, h: number): number;

    ***REMOVED***

    export class EventEmitter ***REMOVED***

        on(type: string, listener: Function, context: any): EventEmitter;
        has(type: string, listener: Function): boolean;
        off(type: string, listener: Function): EventEmitter;
        emit(event: any): EventEmitter;

    ***REMOVED***

    export class ContactMaterialOptions ***REMOVED***

        friction: number;
        restitution: number;
        stiffness: number;
        relaxation: number;
        frictionStiffness: number;
        frictionRelaxation: number;
        surfaceVelocity: number;

    ***REMOVED***

    export class ContactMaterial ***REMOVED***

        static idCounter: number;

        constructor(materialA: Material, materialB: Material, options?: ContactMaterialOptions);

        id: number;
        materialA: Material;
        materialB: Material;
        friction: number;
        restitution: number;
        stiffness: number;
        relaxation: number;
        frictionStuffness: number;
        frictionRelaxation: number;
        surfaceVelocity: number;
        contactSkinSize: number;

    ***REMOVED***

    export class Material ***REMOVED***

        static idCounter: number;

        constructor(id: number);

        id: number;

    ***REMOVED***

    export class vec2 ***REMOVED***

        static crossLength(a: number[], b: number[]): number;
        static crossVZ(out: number[], vec: number[], zcomp: number): number;
        static crossZV(out: number[], zcomp: number, vec: number[]): number;
        static rotate(out: number[], a: number[], angle: number): void;
        static rotate90cw(out: number[], a: number[]): number;
        static centroid(out: number[], a: number[], b: number[], c: number[]): number[];
        static create(): number[];
        static clone(a: number[]): number[];
        static fromValues(x: number, y: number): number[];
        static copy(out: number[], a: number[]): number[];
        static set(out: number[], x: number, y: number): number[];
        static toLocalFrame(out: number[], worldPoint: number[], framePosition: number[], frameAngle: number): void;
        static toGlobalFrame(out: number[], localPoint: number[], framePosition: number[], frameAngle: number): void;
        static add(out: number[], a: number[], b: number[]): number[];
        static subtract(out: number[], a: number[], b: number[]): number[];
        static sub(out: number[], a: number[], b: number[]): number[];
        static multiply(out: number[], a: number[], b: number[]): number[];
        static mul(out: number[], a: number[], b: number[]): number[];
        static divide(out: number[], a: number[], b: number[]): number[];
        static div(out: number[], a: number[], b: number[]): number[];
        static scale(out: number[], a: number[], b: number): number[];
        static distance(a: number[], b: number[]): number;
        static dist(a: number[], b: number[]): number;
        static squaredDistance(a: number[], b: number[]): number;
        static sqrDist(a: number[], b: number[]): number;
        static length(a: number[]): number;
        static len(a: number[]): number;
        static squaredLength(a: number[]): number;
        static sqrLen(a: number[]): number;
        static negate(out: number[], a: number[]): number[];
        static normalize(out: number[], a: number[]): number[];
        static dot(a: number[], b: number[]): number;
        static str(a: number[]): string;

    ***REMOVED***

    export class BodyOptions ***REMOVED***

        mass: number;
        position: number[];
        velocity: number[];
        angle: number;
        angularVelocity: number;
        force: number[];
        angularForce: number;
        fixedRotation: number;

    ***REMOVED***

    export class Body extends EventEmitter ***REMOVED***

        sleepyEvent: ***REMOVED***
            type: string;
        ***REMOVED***;

        sleepEvent: ***REMOVED***
            type: string;
        ***REMOVED***;

        wakeUpEvent: ***REMOVED***
            type: string;
        ***REMOVED***;

        static DYNAMIC: number;
        static STATIC: number;
        static KINEMATIC: number;
        static AWAKE: number;
        static SLEEPY: number;
        static SLEEPING: number;

        constructor(options?: BodyOptions);

        id: number;
        world: World;
        shapes: Shape[];
        shapeOffsets: number[][];
        shapeAngles: number[];
        mass: number;
        invMass: number;
        inertia: number;
        invInertia: number;
        invMassSolve: number;
        invInertiaSolve: number;
        fixedRotation: number;
        position: number[];
        interpolatedPosition: number[];
        interpolatedAngle: number;
        previousPosition: number[];
        previousAngle: number;
        velocity: number[];
        vlambda: number[];
        wlambda: number[];
        angle: number;
        angularVelocity: number;
        force: number[];
        angularForce: number;
        damping: number;
        angularDamping: number;
        type: number;
        boundingRadius: number;
        aabb: AABB;
        aabbNeedsUpdate: boolean;
        allowSleep: boolean;
        wantsToSleep: boolean;
        sleepState: number;
        sleepSpeedLimit: number;
        sleepTimeLimit: number;
        gravityScale: number;

        updateSolveMassProperties(): void;
        setDensity(density: number): void;
        getArea(): number;
        getAABB(): AABB;
        updateAABB(): void;
        updateBoundingRadius(): void;
        addShape(shape: Shape, offset?: number[], angle?: number): void;
        removeShape(shape: Shape): boolean;
        updateMassProperties(): void;
        applyForce(force: number[], worldPoint: number[]): void;
        toLocalFrame(out: number[], worldPoint: number[]): void;
        toWorldFrame(out: number[], localPoint: number[]): void;
        fromPolygon(path: number[][], options?: ***REMOVED***
            optimalDecomp?: boolean;
            skipSimpleCheck?: boolean;
            removeCollinearPoints?: any; //boolean | number
        ***REMOVED***): boolean;
        adjustCenterOfMass(): void;
        setZeroForce(): void;
        resetConstraintVelocity(): void;
        applyDamping(dy: number): void;
        wakeUp(): void;
        sleep(): void;
        sleepTick(time: number, dontSleep: boolean, dt: number): void;
        getVelocityFromPosition(story: number[], dt: number): number[];
        getAngularVelocityFromPosition(timeStep: number): number;
        overlaps(body: Body): boolean;

    ***REMOVED***

    export class Spring ***REMOVED***

        constructor(bodyA: Body, bodyB: Body, options?: ***REMOVED***

            stiffness?: number;
            damping?: number;
            localAnchorA?: number[];
            localAnchorB?: number[];
            worldAnchorA?: number[];
            worldAnchorB?: number[];

        ***REMOVED***);

        stiffness: number;
        damping: number;
        bodyA: Body;
        bodyB: Body;

        applyForce(): void;

    ***REMOVED***

    export class LinearSpring extends Spring ***REMOVED***

        localAnchorA: number[];
        localAnchorB: number[];
        restLength: number;

        setWorldAnchorA(worldAnchorA: number[]): void;
        setWorldAnchorB(worldAnchorB: number[]): void;
        getWorldAnchorA(result: number[]): number[];
        getWorldAnchorB(result: number[]): number[];
        applyForce(): void;

    ***REMOVED***

    export class RotationalSpring extends Spring ***REMOVED***

        constructor(bodyA: Body, bodyB: Body, options?: ***REMOVED***
            restAngle?: number;
            stiffness?: number;
            damping?: number;
        ***REMOVED***);

        restAngle: number;

    ***REMOVED***

    export class Capsule extends Shape ***REMOVED***

        constructor(length?: number, radius?: number);

        length: number;
        radius: number;

    ***REMOVED***

    export class Circle extends Shape ***REMOVED***

        constructor(radius: number);

        radius: number;

    ***REMOVED***

    export class Convex extends Shape ***REMOVED***

        static triangleArea(a: number[], b: number[], c: number[]): number;

        constructor(vertices: number[][], axes: number[]);

        vertices: number[][];
        axes: number[];
        centerOfMass: number[];
        triangles: number[];
        boundingRadius: number;

        projectOntoLocalAxis(localAxis: number[], result: number[]): void;
        projectOntoWorldAxis(localAxis: number[], shapeOffset: number[], shapeAngle: number, result: number[]): void;

        updateCenterOfMass(): void;

    ***REMOVED***

    export class Heightfield extends Shape ***REMOVED***

        constructor(data: number[], options?: ***REMOVED***
            minValue?: number;
            maxValue?: number;
            elementWidth: number;
        ***REMOVED***);

        data: number[];
        maxValue: number;
        minValue: number;
        elementWidth: number;

    ***REMOVED***

    export class Shape ***REMOVED***

        static idCounter: number;
        static CIRCLE: number;
        static PARTICLE: number;
        static PLANE: number;
        static CONVEX: number;
        static LINE: number;
        static RECTANGLE: number;
        static CAPSULE: number;
        static HEIGHTFIELD: number;

        constructor(type: number);

        type: number;
        id: number;
        boundingRadius: number;
        collisionGroup: number;
        collisionMask: number;
        material: Material;
        area: number;
        sensor: boolean;

        computeMomentOfInertia(mass: number): number;
        updateBoundingRadius(): number;
        updateArea(): void;
        computeAABB(out: AABB, position: number[], angle: number): void;

    ***REMOVED***

    export class Line extends Shape ***REMOVED***

        constructor(length?: number);

        length: number;

    ***REMOVED***

    export class Particle extends Shape ***REMOVED***

    ***REMOVED***

    export class Plane extends Shape ***REMOVED***

    ***REMOVED***

    export class Rectangle extends Shape ***REMOVED***

        static sameDimensions(a: Rectangle, b: Rectangle): boolean;

        constructor(width?: number, height?: number);

        width: number;
        height: number;

    ***REMOVED***

    export class Solver extends EventEmitter ***REMOVED***

        static GS: number;
        static ISLAND: number;

        constructor(options?: ***REMOVED******REMOVED***, type?: number);

        type: number;
        equations: Equation[];
        equationSortFunction: Equation; //Equation | boolean

        solve(dy: number, world: World): void;
        solveIsland(dy: number, island: Island): void;
        sortEquations(): void;
        addEquation(eq: Equation): void;
        addEquations(eqs: Equation[]): void;
        removeEquation(eq: Equation): void;
        removeAllEquations(): void;

    ***REMOVED***

    export class GSSolver extends Solver ***REMOVED***

        constructor(options?: ***REMOVED***
            iterations?: number;
            tolerance?: number;
        ***REMOVED***);

        iterations: number;
        tolerance: number;
        useZeroRHS: boolean;
        frictionIterations: number;
        usedIterations: number;

        solve(h: number, world: World): void;

    ***REMOVED***

    export class OverlapKeeper ***REMOVED***

        constructor(bodyA: Body, shapeA: Shape, bodyB: Body, shapeB: Shape);

        shapeA: Shape;
        shapeB: Shape;
        bodyA: Body;
        bodyB: Body;

        tick(): void;
        setOverlapping(bodyA: Body, shapeA: Shape, bodyB: Body, shapeB: Body): void;
        bodiesAreOverlapping(bodyA: Body, bodyB: Body): boolean;
        set(bodyA: Body, shapeA: Shape, bodyB: Body, shapeB: Shape): void;

    ***REMOVED***

    export class TupleDictionary ***REMOVED***

        data: number[];
        keys: number[];

        getKey(id1: number, id2: number): string;
        getByKey(key: number): number;
        get(i: number, j: number): number;
        set(i: number, j: number, value: number): number;
        reset(): void;
        copy(dict: TupleDictionary): void;

    ***REMOVED***

    export class Utils ***REMOVED***

        static appendArray<T>(a: Array<T>, b: Array<T>): Array<T>;
        static chanceRoll(chance: number): boolean;
        static defaults(options: any, defaults: any): any;
        static extend(a: any, b: any): void;
        static randomChoice(choice1: any, choice2: any): any;
        static rotateArray(matrix: any[], direction: any): any[];
        static splice<T>(array: Array<T>, index: number, howMany: number): void;
        static shuffle<T>(array: T[]): T[];
        static transposeArray<T>(array: T[]): T[];

    ***REMOVED***

    export class Island ***REMOVED***

        equations: Equation[];
        bodies: Body[];

        reset(): void;
        getBodies(result: any): Body[];
        wantsToSleep(): boolean;
        sleep(): boolean;

    ***REMOVED***

    export class IslandManager extends Solver ***REMOVED***

        static getUnvisitedNode(nodes: Node[]): IslandNode; // IslandNode | boolean

        equations: Equation[];
        islands: Island[];
        nodes: IslandNode[];

        visit(node: IslandNode, bds: Body[], eqs: Equation[]): void;
        bfs(root: IslandNode, bds: Body[], eqs: Equation[]): void;
        split(world: World): Island[];

    ***REMOVED***

    export class IslandNode ***REMOVED***

        constructor(body: Body);

        body: Body;
        neighbors: IslandNode[];
        equations: Equation[];
        visited: boolean;

        reset(): void;

    ***REMOVED***

    export class World extends EventEmitter ***REMOVED***

        postStepEvent: ***REMOVED***
            type: string;
        ***REMOVED***;

        addBodyEvent: ***REMOVED***
            type: string;
        ***REMOVED***;

        removeBodyEvent: ***REMOVED***
            type: string;
        ***REMOVED***;

        addSpringEvent: ***REMOVED***
            type: string;
        ***REMOVED***;

        impactEvent: ***REMOVED***
            type: string;
            bodyA: Body;
            bodyB: Body;
            shapeA: Shape;
            shapeB: Shape;
            contactEquation: ContactEquation;
        ***REMOVED***;

        postBroadphaseEvent: ***REMOVED***
            type: string;
            pairs: Body[];
        ***REMOVED***;

        beginContactEvent: ***REMOVED***
            type: string;
            shapeA: Shape;
            shapeB: Shape;
            bodyA: Body;
            bodyB: Body;
            contactEquations: ContactEquation[];
        ***REMOVED***;

        endContactEvent: ***REMOVED***
            type: string;
            shapeA: Shape;
            shapeB: Shape;
            bodyA: Body;
            bodyB: Body;
        ***REMOVED***;

        preSolveEvent: ***REMOVED***
            type: string;
            contactEquations: ContactEquation[];
            frictionEquations: FrictionEquation[];
        ***REMOVED***;

        static NO_SLEEPING: number;
        static BODY_SLEEPING: number;
        static ISLAND_SLEEPING: number;

        static integrateBody(body: Body, dy: number): void;

        constructor(options?: ***REMOVED***
            solver?: Solver;
            gravity?: number[];
            broadphase?: Broadphase;
            islandSplit?: boolean;
            doProfiling?: boolean;
        ***REMOVED***);

        springs: Spring[];
        bodies: Body[];
        solver: Solver;
        narrowphase: Narrowphase;
        islandManager: IslandManager;
        gravity: number[];
        frictionGravity: number;
        useWorldGravityAsFrictionGravity: boolean;
        useFrictionGravityOnZeroGravity: boolean;
        doProfiling: boolean;
        lastStepTime: number;
        broadphase: Broadphase;
        constraints: Constraint[];
        defaultMaterial: Material;
        defaultContactMaterial: ContactMaterial;
        lastTimeStep: number;
        applySpringForces: boolean;
        applyDamping: boolean;
        applyGravity: boolean;
        solveConstraints: boolean;
        contactMaterials: ContactMaterial[];
        time: number;
        stepping: boolean;
        islandSplit: boolean;
        emitImpactEvent: boolean;
        sleepMode: number;

        addConstraint(c: Constraint): void;
        addContactMaterial(contactMaterial: ContactMaterial): void;
        removeContactMaterial(cm: ContactMaterial): void;
        getContactMaterial(materialA: Material, materialB: Material): ContactMaterial; // ContactMaterial | boolean
        removeConstraint(c: Constraint): void;
        step(dy: number, timeSinceLastCalled?: number, maxSubSteps?: number): void;
        runNarrowphase(np: Narrowphase, bi: Body, si: Shape, xi: any[], ai: number, bj: Body, sj: Shape, xj: any[], aj: number, cm: number, glen: number): void;
        addSpring(s: Spring): void;
        removeSpring(s: Spring): void;
        addBody(body: Body): void;
        removeBody(body: Body): void;
        getBodyByID(id: number): Body; //Body | boolean
        disableBodyCollision(bodyA: Body, bodyB: Body): void;
        enableBodyCollision(bodyA: Body, bodyB: Body): void;
        clear(): void;
        clone(): World;
        hitTest(worldPoint: number[], bodies: Body[], precision: number): Body[];
        setGlobalEquationParameters(parameters: ***REMOVED***
            relaxation?: number;
            stiffness?: number;
        ***REMOVED***): void;
        setGlobalStiffness(stiffness: number): void;
        setGlobalRelaxation(relaxation: number): void;
    ***REMOVED***

***REMOVED***
