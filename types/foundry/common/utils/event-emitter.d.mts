/**
 * A mixin class which implements the behavior of EventTarget.
 * This is useful in cases where a class wants EventTarget-like behavior but needs to extend some other class.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
 */
declare class EventEmitter {
    /**
     * An array of event types which are valid for this class.
     */
    static emittedEvents: string[];

    /**
     * A mapping of registered events.
     */
    #events: Record<string, Map<EmittedEventListener, { fn: EmittedEventListener; once: boolean }>>;

    /* -------------------------------------------- */

    /**
     * Add a new event listener for a certain type of event.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
     * @param type The type of event being registered for
     * @param listener The listener function called when the event occurs
     * @param once Should the event only be responded to once and then removed
     */
    addEventListener(type: string, listener: EmittedEventListener, { once }?: { once?: boolean }): void;

    /* -------------------------------------------- */

    /**
     * Remove an event listener for a certain type of event.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
     * @param type The type of event being removed
     * @param listener The listener function being removed
     */
    removeEventListener(type: string, listener: EmittedEventListener): void;

    /* -------------------------------------------- */

    /**
     * Dispatch an event on this target.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
     * @param event The Event to dispatch
     * @returns Was default behavior for the event prevented?
     */
    dispatchEvent(event: Event): boolean;
}

/**
 * @param event The emitted event
 */
export type EmittedEventListener = (event: Event) => void;

/**
 * Augment a base class with EventEmitter behavior.
 * @template {Constructor<ApplicationV2>} BaseClass
 * @param BaseClass Some base class augmented with event emitter functionality
 */
export default function EventEmitterMixin<ExtendedClass extends AbstractConstructorOf<any>>(
    BaseClass: ExtendedClass,
): Mixin<typeof EventEmitter, ExtendedClass>;
