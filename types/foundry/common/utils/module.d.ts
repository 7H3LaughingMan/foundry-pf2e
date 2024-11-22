import "./collection.d.ts";
export * from "./geometry.ts";
export * from "./helpers.ts";
// export * from "./logging.mjs";
export { default as Color } from "./color.ts";

/**
 * The constructor of an async function.
 * @type {typeof AsyncFunction}
 */
export const AsyncFunction: {
    new <T>(...args: any[]): (...args: any[]) => Promise<T>;
};
