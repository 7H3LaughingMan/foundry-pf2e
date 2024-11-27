import "./collection";
export * from "./geometry.ts";
export * from "./helpers.ts";
export * from "./http.ts";
export * from "./logging.ts";
export { default as BitMask } from "./bitmask";
export { default as Color } from "./color";
export { default as EventEmitterMixin } from "./event-emiiter.ts";
export { default as IterableWeakMap } from "./iterable-weak-map.ts";
export { default as IterableWeakSet } from "./iterable-weak-set.ts";
export { default as StringTree } from "./string-tree.ts";
export { default as WordTree } from "./word-tree.ts";

/** The constructor of an async function. */
export const AsyncFunction: {
    new <T>(...args: any[]): (...args: any[]) => Promise<T>;
};
