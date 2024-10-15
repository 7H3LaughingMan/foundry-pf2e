export { };

declare global {
    namespace Hooks {
        /**
         * A mapping of hook events which have functions registered to them.
         */
        var events: Record<string, HookedFunction[]>;

        /**
         * Register a callback handler which should be triggered when a hook is triggered.
         *
         * @param hook          The unique name of the hooked event
         * @param fn            The callback function which should be triggered when the hook event occurs
         * @param options       Options which customize hook registration
         * @param options.once  Only trigger the hooked function once
         * @returns             An ID number of the hooked function which can be used to turn off the hook later
         */
        function on(hook: string, fn: Function, options?: { once: boolean }): number;

        /**
         * Register a callback handler for an event which is only triggered once the first time the event occurs.
         * An alias for Hooks.on with {once: true}
         *
         * @param hook  The unique name of the hooked event
         * @param fn    The callback function which should be triggered when the hook event occurs
         * @returns     An ID number of the hooked function which can be used to turn off the hook later
         */
        function once(hook: string, fn: Function): number;

        /**
         * Unregister a callback handler for a particular hook event
         *
         * @param hook  The unique name of the hooked event
         * @param fn    The function that should be removed from the set of hooked callbacks
         */
        function off(hook: string, fn: number | Function): void;

        /**
         * Call all hook listeners in the order in which they were registered
         * Hooks called this way can not be handled by returning false and will always trigger every hook callback.
         *
         * @param {string} hook   The hook being triggered
         * @param {...*} args     Arguments passed to the hook callback functions
         * @returns {boolean}     Were all hooks called without execution being prevented?
         */
        function callAll(hook: string, ...args: any[]): boolean;

        /**
         * Call hook listeners in the order in which they were registered.
         * Continue calling hooks until either all have been called or one returns false.
         *
         * Hook listeners which return false denote that the original event has been adequately handled and no further
         * hooks should be called.
         *
         * @param {string} hook   The hook being triggered
         * @param {...*} args     Arguments passed to the hook callback functions
         * @returns {boolean}     Were all hooks called without execution being prevented?
         */
        function call(hook: string, ...args: any[]): boolean;

        /**
         * Notify subscribers that an error has occurred within foundry.
         *
         * @param {string} location                The method where the error was caught.
         * @param {Error} error                    The error.
         * @param {object} [options={}]            Additional options to configure behaviour.
         * @param {string} [options.msg=""]        A message which should prefix the resulting error or notification.
         * @param {?string} [options.log=null]     The level at which to log the error to console (if at all).
         * @param {?string} [options.notify=null]  The level at which to spawn a notification in the UI (if at all).
         * @param {object} [options.data={}]       Additional data to pass to the hook subscribers.
         */
        function onError(
            location: string,
            error: Error,
            options?: { msg: string; log: string; notify: string; data: object }
        ): void;
    }

    interface HookedFunction {
        hook: string;
        id: number;
        fn: Function;
        once: boolean;
    }

    interface DropCanvasData<T extends string = string, D extends object = object> {
        type?: T;
        data?: D extends foundry.abstract.Document ? D["_source"] : D;
        uuid?: DocumentUUID;
        id?: string;
        pack?: string;
        x: number;
        y: number;
        documentName?: string;
        actorId?: string;
        tokenId?: string;
    }
}
