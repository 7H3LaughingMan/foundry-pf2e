/**
 * A helper class providing utility methods for PIXI Canvas animation
 */
declare class CanvasAnimation {
    /**
     * The ticker used for animations.
     */
    static get ticker(): PIXI.Ticker;

    /**
     * Apply an animation from the current value of some attribute to a new value
     * Resolve a Promise once the animation has concluded and the attributes have reached their new target
     *
     * @param {CanvasAnimationAttribute[]} attributes   An array of attributes to animate
     * @param {CanvasAnimationOptions} options          Additional options which customize the animation
     *
     * @returns {Promise<boolean>}                      A Promise which resolves to true once the animation has concluded
     *                                                  or false if the animation was prematurely terminated
     *
     * @example Animate Token Position
     * ```js
     * let animation = [
     *   {
     *     parent: token,
     *     attribute: "x",
     *     to: 1000
     *   },
     *   {
     *     parent: token,
     *     attribute: "y",
     *     to: 2000
     *   }
     * ];
     * CanvasAnimation.animate(attributes, {duration:500});
     * ```
     */
    static animate(attributes: CanvasAnimationAttribute[], options?: CanvasAnimationOptions): Promise<boolean>;

    /**
     * Retrieve an animation currently in progress by its name
     * @param {string} name             The animation name to retrieve
     * @returns {CanvasAnimationData}   The animation data, or undefined
     */
    static getAnimation(name: string): CanvasAnimationData;

    /**
     * If an animation using a certain name already exists, terminate it
     * @param {string} name       The animation name to terminate
     */
    static terminateAnimation(name: string): void;

    /**
     * Cosine based easing with smooth in-out.
     * @param {number} pt     The proportional animation timing on [0,1]
     * @returns {number}      The eased animation progress on [0,1]
     */
    static easeInOutCosine(pt: number): number;

    /**
     * Shallow ease out.
     * @param {number} pt     The proportional animation timing on [0,1]
     * @returns {number}      The eased animation progress on [0,1]
     */
    static easeOutCircle(pt: number): number;

    /**
     * Shallow ease in.
     * @param {number} pt     The proportional animation timing on [0,1]
     * @returns {number}      The eased animation progress on [0,1]
     */
    static easeInCircle(pt: number): number;

    /**
     * Generic ticker function to implement the animation.
     * This animation wrapper executes once per frame for the duration of the animation event.
     * Once the animated attributes have converged to their targets, it resolves the original Promise.
     * The user-provided ontick function runs each frame update to apply additional behaviors.
     *
     * @param {number} deltaTime                The incremental time which has elapsed
     * @param {CanvasAnimationData} animation   The animation which is being performed
     */
    static #animateFrame(deltaTime: number, animation: CanvasAnimationData): void;

    /**
     * Update a single attribute according to its animation completion percentage
     * @param {CanvasAnimationAttribute} attribute    The attribute being animated
     * @param {number} percentage                     The animation completion percentage
     */
    static #updateAttribute(attribute: CanvasAnimationAttribute, percentage: number): void;
}

interface CanvasAnimationAttribute {
    /** The attribute name being animated */
    attribute: string;
    /** The object within which the attribute is stored */
    parent: Object;
    /** The destination value of the attribute */
    to: number;
    /** An initial value of the attribute, otherwise parent[attribute] is used */
    from?: number;
    /** The computed delta between to and from */
    delta?: number;
    /** The amount of the total delta which has been animated */
    done?: number;
}

interface CanvasAnimationOptions<TObject extends PIXI.DisplayObject = PIXI.DisplayObject> {
    /** A DisplayObject which defines context to the PIXI.Ticker function */
    context?: TObject;
    /** A unique name which can be used to reference the in-progress animation */
    name?: string | symbol | null;
    /** A duration in milliseconds over which the animation should occur */
    duration?: number;
    /**
     * A priority in PIXI.UPDATE_PRIORITY which defines when the animation
     * should be evaluated related to others
     */
    priority?: number;
    /**
     * An easing function used to translate animation time or the string name
     *of a static member of the CanvasAnimation class
     */
    easing?: Function | string;
    /** A callback function which fires after every frame */
    ontick?: string | ((frame: number, data: CanvasAnimationData) => void);
    /** The animation isn't started until this promise resolves */
    wait?: Promise<unknown>;
}

interface CanvasAnimationData extends CanvasAnimationOptions {
    /** The animation function being executed each frame */
    fn: Function;
    /** The current time of the animation, in milliseconds */
    time: number;
    /** The attributes being animated */
    attributes: CanvasAnimationAttribute[];
    /** [promise] A Promise which resolves once the animation is complete */
    promise?: Promise<unknown>;
    /** The resolution function, allowing animation to be ended early */
    resolve?: Function;
    /** The rejection function, allowing animation to be ended early */
    reject?: Function;
}
