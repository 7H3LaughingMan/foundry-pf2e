// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function EventEmitterMixin<TBase extends AbstractConstructorOf<any>>(BaseClass: TBase) {
    abstract class EventEmitter extends BaseClass {
        /**
         * An array of event types which are valid for this class.
         */
        static emittedEvents: readonly string[];

        /**
         * Add a new event listener for a certain type of event.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
         * @param type              The type of event being registered for
         * @param listener          The listener function called when the event occurs
         * @param options           Options which configure the event listener
         * @param options.once      Should the event only be responded to once and then removed
         */
        addEventListener(type: string, listener: EmittedEventListener, options?: { once?: boolean }) {
            type;
            listener;
            options;
        }

        /**
         * Remove an event listener for a certain type of event.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
         * @param type          The type of event being removed
         * @param listener      The listener function being removed
         */
        removeEventListener(type: string, listener: EmittedEventListener) {
            type;
            listener;
        }

        /**
         * Dispatch an event on this target.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
         * @param event     The Event to dispatch
         * @returns         Was default behavior for the event prevented?
         */
        dispatchEvent(event: Event): boolean {
            event;
            return false;
        }
    }

    return EventEmitter;
}

/**
 * @param event The emitted event
 */
export type EmittedEventListener = (event: Event) => any;
