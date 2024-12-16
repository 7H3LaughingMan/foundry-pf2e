import { Color } from "../common/utils/module.mjs";

export * from "../common/types.mjs";

declare global {
    interface TokenFindMovementPathWaypoint {
        /**
         * The top-left x-coordinate in pixels (integer).
         * Default: the previous or source x-coordinate.
         */
        x?: number;
        /**
         * The top-left y-coordinate in pixels (integer).
         * Default: the previous or source y-coordinate.
         */
        y?: number;
        /**
         * The elevation in grid units.
         * Default: the previous or source elevation.
         */
        elevation?: number;
        /**
         * The width in grid spaces (positive multiple of 0.5).
         * Default: the previous or source width.
         */
        width?: number;
        /**
         * The height in grid spaces (positive multiple of 0.5).
         * Default: the previous or source height.
         */
        height?: number;
        /**
         * The shape type (see {@link CONST.TOKEN_SHAPES}).
         * Default: the previous or source shape.
         */
        shape?: TokenShape;
        /** The movement action from the previous to this waypoint. */
        action?: string;
        /** Teleport from the previous to this waypoint? */
        teleport?: boolean;
        /** Is the movement from the previous to this waypoint forced? */
        forced?: boolean;
        /** Was this waypoint snapped to the grid? Default: `false`. */
        snapped?: boolean;
        /** Was this waypoint explicitly placed by the user? Default: `false`. */
        explicit?: boolean;
        /** Is this waypoint a checkpoint? Default: `false`. */
        checkpoint?: boolean;
    }

    interface TokenConstrainMovementPathWaypoint {
        /**
         * The top-left x-coordinate in pixels (integer).
         * Default: the previous or source x-coordinate.
         */
        x?: number;
        /**
         * The top-left y-coordinate in pixels (integer).
         * Default: the previous or source y-coordinate.
         */
        y?: number;
        /**
         * The elevation in grid units.
         * Default: the previous or source elevation.
         */
        elevation?: number;
        /**
         * The width in grid spaces (positive multiple of 0.5).
         * Default: the previous or source width.
         */
        width?: number;
        /**
         * The height in grid spaces (positive multiple of 0.5).
         * Default: the previous or source height.
         */
        height?: number;
        /**
         * The shape type (see {@link CONST.TOKEN_SHAPES}).
         * Default: the previous or source shape.
         */
        shape?: TokenShape;
        /**
         * The movement action from the previous to this waypoint.
         * Default: `CONFIG.Token.movement.defaultAction`.
         */
        action?: string;
        /** Teleport from the previous to this waypoint? Default: `false`. */
        teleport?: boolean;
        /** Is the movement from the previous to this waypoint forced? Default: `false`. */
        forced?: boolean;
        /** Was this waypoint snapped to the grid? Default: `false`. */
        snapped?: boolean;
        /** Was this waypoint explicitly placed by the user? Default: `false`. */
        explicit?: boolean;
        /** Is this waypoint a checkpoint? Default: `false`. */
        checkpoint?: boolean;
    }

    interface TokenSegmentizeMovementWaypoint {
        /**
         * The x-coordinate in pixels (integer).
         * Default: the previous or source x-coordinate.
         */
        x?: number;
        /**
         * The y-coordinate in pixels (integer).
         * Default: the previous or source y-coordinate.
         */
        y?: number;
        /**
         * The elevation in grid units.
         * Default: the previous or source elevation.
         */
        elevation?: number;
        /**
         * The width in grid spaces (positive multiple of 0.5).
         * Default: the previous or source width.
         */
        width?: number;
        /**
         * The height in grid spaces (positive multiple of 0.5).
         * Default: the previous or source height.
         */
        height?: number;
        /**
         * The shape type (see {@link CONST.TOKEN_SHAPES}).
         * Default: the previous or source shape.
         */
        shape?: TokenShape;
        /**
         * The movement action from the previous to this waypoint.
         * Default: `CONFIG.Token.movement.defaultAction`.
         */
        action?: string;
        /** Teleport from the previous to this waypoint? Default: `false`. */
        teleport?: boolean;
        /** Is the movement from the previous to this waypoint forced? Default: `false`. */
        forced?: boolean;
        /** Was this waypoint snapped to the grid? Default: `false`. */
        snapped?: boolean;
    }

    interface TokenRegionMovementWaypoint {
        /** The x-coordinate in pixels (integer). */
        x: number;
        /** The y-coordinate in pixels (integer). */
        y: number;
        /** The elevation in grid units. */
        elevation: number;
        /** The width in grid spaces (positive multiple of 0.5). */
        width: number;
        /** The height in grid spaces (positive multiple of 0.5). */
        height: number;
        /** The shape type (see {@link CONST.TOKEN_SHAPES}). */
        shape: TokenShape;
    }

    interface TokenRegionMovementSegment {
        /** The type of this segment (see {@link CONST.REGION_MOVEMENT_SEGMENTS}). */
        type: RegionMovementSegments;
        /** The waypoint that this segment starts from. */
        from: TokenRegionMovementWaypoint;
        /** The waypoint that this segment goes to. */
        to: TokenRegionMovementWaypoint;
        /** The movement action between the waypoints. */
        action: string;
        /** Teleport between the waypoints? */
        teleport: boolean;
        /** Is the movement on this segment forced? */
        forced: boolean;
        /** Is the destination snapped to the grid? */
        snapped: boolean;
    }

    interface TokenMeasureMovementPathOptions {
        /** Measure a preview path? Default: `false`. */
        preview?: boolean;
    }

    interface TokenConstrainMovementPathOptions {
        /** Constrain a preview path? Default: `false`. */
        preview?: boolean;
        /** Ignore walls? Default: `false`. */
        ignoreWalls?: boolean;
    }

    interface TokenConstrainMovementPathResult {
        /** The number of waypoints that can be reached */
        reached: number;
        /** The final points on the segment from the last reached waypoint to the first unreachable waypoint */
        terminalPath: ElevatedPoint[];
    }

    interface TokenFindMovementPathOptions {
        /** Find a preview path? Default: `false`. */
        preview?: boolean;
        /** Ignore walls? Default: `false`. */
        ignoreWalls?: boolean;
        /** Consider movement history? Default: `false`. */
        history?: boolean;
        /** Unless the path can be found instantly, delay the start of the pathfinding computation by this number of milliseconds. Default: `0`. */
        delay?: number;
    }

    interface TokenFindMovementPathJob {
        /** The result of the pathfinding job. Undefined while the search is in progress, null if the job was cancelled, and the (partial) path if the job completed. */
        result: TokenMovementWaypoint[] | null | undefined;
        /** The promise returning the (partial) path that as found or null if cancelled. */
        promise: Promise<TokenMovementWaypoint[] | null>;
        /** If this function is called and the job hasn't completed yet, the job is cancelled. */
        cancel: () => void;
    }

    interface TokenRulerState {
        /** The waypoints that were already passed by the Token */
        passedWaypoints: TokenMeasuredMovementWaypoint[];
        /** The waypoints that the Token will try move to next */
        pendingWaypoints: TokenMeasuredMovementWaypoint[];
        /** Movement planned by Users */
        plannedMovement: { [userId: string]: TokenRulerPlannedMovement };
    }

    interface TokenRulerState {
        /** The found path, which goes through all but the unreachable waypoints */
        foundPath: TokenMeasuredMovementWaypoint[];
        /** The unreachable waypoints, which are those that are not reached by the found path */
        unreachableWaypoints: TokenMeasuredMovementWaypoint[];
        /** The movement history */
        history: TokenMeasuredMovementWaypoint[];
        /** Is the pathfinding still in progress? */
        searching: boolean;
    }

    interface TokenRulerWaypoint {
        /** The top-left x-coordinate in pixels (integer). */
        x: number;
        /** The top-left y-coordinate in pixels (integer). */
        y: number;
        /** The elevation in grid units. */
        elevation: number;
        /** The width in grid spaces (positive multiple of 0.5). */
        width: number;
        /** The height in grid spaces (positive multiple of 0.5). */
        height: number;
        /** The shape type (see {@link CONST.TOKEN_SHAPES}). */
        shape: TokenShape;
        /** The movement action from the previous to this waypoint. */
        action: string;
        /** Teleport from the previous to this waypoint? */
        teleport: boolean;
        /** Is the movement from the previous to this waypoint forced? */
        forced: boolean;
        /** Was this waypoint snapped to the grid? */
        snapped: boolean;
        /** Was this waypoint explicitly placed by the user? */
        explicit: boolean;
        /** Is this waypoint a checkpoint? */
        checkpoint: boolean;
        /** Is this an intermediate waypoint? */
        intermediate: boolean;
        /** The ID of the User that moves/moved the Token to this waypoint. */
        userId: string;
        /** The movement cost to this waypoint (nonnegative). */
        cost: number;
        /** The stage this waypoint belongs to. */
        stage: "passed" | "pending" | "planned";
        /** Is this waypoint unreachable? */
        unreachable: boolean;
        /** The center point of the Token at this waypoint. */
        center: Point;
        /** The size of the Token in pixels at this waypoint. */
        size: { width: number; height: number };
        /** The ray from the center point of previous to the center point of this waypoint, or null if there is no previous waypoint. */
        ray: Ray | null;
        /** The measurements at this waypoint. */
        measurement: GridMeasurePathResult;
        /** The previous waypoint, if any. */
        previous: TokenRulerWaypoint | null;
        /** The next waypoint, if any. */
        next: TokenRulerWaypoint | null;
    }

    interface TokenDragContext {
        token: Token;
        clonedToken: Token;
        destination: Omit<TokenFindMovementPathWaypoint, "width" | "height" | "shape">;
        waypoints: Omit<TokenFindMovementPathWaypoint, "width" | "height" | "shape">[];
        foundPath: TokenMovementWaypoint[];
        unreachableWaypoints: TokenMovementWaypoint[];
        updating: boolean;
        search: TokenFindMovementPathJob;
        searching: boolean;
        searchId: number;
        searchOptions: TokenFindMovementPathOptions;
    }

    interface TokenAnimationData {
        /** The x position in pixels */
        x: number;
        /** The y position in pixels */
        y: number;
        /** The elevation in grid units */
        elevation: number;
        /** The width in grid spaces */
        width: number;
        /** The height in grid spaces */
        height: number;
        /** The alpha value */
        alpha: number;
        /** The rotation in degrees */
        rotation: number;
        /** The texture data */
        texture: {
            /** The texture file path */
            src: string;
            /** The texture anchor X */
            anchorX: number;
            /** The texture anchor Y */
            anchorY: number;
            /** The texture scale X */
            scaleX: number;
            /** The texture scale Y */
            scaleY: number;
            /** The texture tint */
            tint: Color;
        };
        /** The ring data */
        ring: {
            /** The ring subject data */
            subject: {
                /** The ring subject texture */
                texture: string;
                /** The ring subject scale */
                scale: number;
            };
        };
    }

    interface TokenAnimationContext {
        /** The name of the animation */
        name: string | symbol;
        /** The animation chain */
        chain: {
            to: Partial<TokenAnimationData>;
            options: Omit<TokenAnimationOptions, "duration"> & { duration: number };
            promise: Promise<void>;
            resolve: () => void;
            reject: (error: Error) => void;
        }[];
        /** The final animation state */
        to: Partial<TokenAnimationData>;
        /** The duration of the animation */
        duration: number;
        /** The current time of the animation */
        time: number;
        /** Asynchronous functions that are executed before the animation starts */
        preAnimate: ((context: TokenAnimationContext) => Promise<void>)[];
        /**
         * Synchronous functions that are executed after the animation ended.
         * They may be executed before the preAnimate functions have finished if the animation is terminated.
         */
        postAnimate: ((context: TokenAnimationContext) => void)[];
        /**
         * Synchronous functions that are executed each frame after `ontick` and before
         * {@link foundry.canvas.placeables.Token#_onAnimationUpdate | Token#_onAnimationUpdate}.
         */
        onAnimate: ((context: TokenAnimationContext) => void)[];
        /** The promise of the animation that resolves once it completes or is terminated */
        promise: Promise<void>;
    }

    interface TokenAnimationOptions {
        /**
         * The name of the animation, or null if nameless.
         * Default: {@link foundry.canvas.placeables.Token#animationName | Token#animationName}.
         */
        name?: string | symbol | null;
        /** Chain the animation to the existing one of the same name? Default: `false`. */
        chain?: boolean;
        /**
         * The duration of the animation in milliseconds (nonnegative).
         * Default: automatic (determined by {@link foundry.canvas.placeables.Token#_getAnimationDuration | Token#_getAnimationDuration},
         * which returns 1000 by default unless it's a movement animation).
         */
        duration?: number;
        /**
         * A desired movement speed in grid size per second (positive),
         * which determines the `duration` if the given `duration` is undefined and
         * either `x`, `y`, `width`, `height`, or `rotation` is animated. Default: automatic (determined by
         * {@link foundry.canvas.placeables.Token#_getAnimationMovementSpeed | Token#_getAnimationMovementSpeed}, which returns `CONFIG.Token.movement.defaultSpeed` by default).
         */
        movementSpeed?: number;
        /** Teleportation instead of animating the movement? Default: `false`. */
        teleport?: boolean;
        /**
         * The desired texture transition type. Default: automatic (determined by
         * {@link foundry.canvas.placeables.Token#_getAnimationTransition | Token#_getAnimationTransition}, which returns `"fade"` by default).
         */
        transition?: TokenAnimationTransition;
        /** The easing function of the animation. Default: `undefined` (linear). */
        easing?: CanvasAnimationEasingFunction;
        /** A on-tick callback. */
        ontick?: (deltaTime: number, animation: CanvasAnimationData, data: TokenAnimationData) => void;
    }

    type TokenAnimationTransition =
        | "crosshatch"
        | "dots"
        | "fade"
        | "glitch"
        | "hole"
        | "holeSwirl"
        | "hologram"
        | "morph"
        | "swirl"
        | "waterDrop"
        | "waves"
        | "wind"
        | "whiteNoise";

    interface RegionSegmentizeMovementPathWaypoint {
        /** The x-coordinate in pixels (integer). */
        x: number;
        /** The y-coordinate in pixels (integer). */
        y: number;
        /** The elevation in grid units. */
        elevation: number;
        /** Teleport from the previous to this waypoint? Default: `false`. */
        teleport?: boolean;
    }

    interface RegionMovementWaypoint {
        /** The x-coordinate in pixels (integer). */
        x: number;
        /** The y-coordinate in pixels (integer). */
        y: number;
        /** The elevation in grid units. */
        elevation: number;
    }

    interface RegionMovementSegment {
        /** The type of this segment (see {@link CONST.REGION_MOVEMENT_SEGMENTS}). */
        type: RegionMovementSegments;
        /** The waypoint that this segment starts from. */
        from: RegionMovementWaypoint;
        /** The waypoint that this segment goes to. */
        to: RegionMovementWaypoint;
        /** The movement action between the waypoints. */
        action: string;
        /** Teleport between the waypoints? */
        teleport: boolean;
        /** Is the movement on this segment forced? */
        forced: boolean;
        /** Is the destination snapped to the grid? */
        snapped: boolean;
    }

    interface CanvasVisibilityTest {
        point: ElevatedPoint;
        los: Map<PointVisionSource, boolean>;
    }

    interface CanvasVisibilityTestConfiguration {
        /** The target object */
        object: object | null;
        /** An array of visibility tests */
        tests: CanvasVisibilityTest[];
    }

    interface CanvasVisibilityTextureConfiguration {
        resolution: number;
        width: number;
        height: number;
        mipmap: number;
        scaleMode: number;
        alphaMode: number;
        multisample: number;
        format: number;
    }
}
