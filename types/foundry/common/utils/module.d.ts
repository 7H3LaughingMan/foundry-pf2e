import "./collection";
export * from "./geometry";
export * from "./helpers";
// export * from "./logging.mjs";
export { default as BitMask } from "./bitmask";
export { default as Color } from "./color";
export { default as EventEmitterMixin } from "./event-emiiter.ts";
export { default as StringTree } from "./string-tree.ts";

/** The constructor of an async function. */
export const AsyncFunction: {
    new <T>(...args: any[]): (...args: any[]) => Promise<T>;
};
