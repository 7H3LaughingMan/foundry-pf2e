import "./collection.d.ts";
export * from "./geometry.ts";
export * from "./helpers.ts";
// export * from "./logging.mjs";
export { default as BitMask } from "./bitmask.ts";
export { default as Color } from "./color.ts";
export { default as EventEmitterMixin } from "./event-emiiter.ts";

/**
 * The constructor of an async function.
 * @type {typeof AsyncFunction}
 */
export const AsyncFunction: {
    new <T>(...args: any[]): (...args: any[]) => Promise<T>;
};
