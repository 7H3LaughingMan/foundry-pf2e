import Color from "./utils/color.mjs";

declare global {
    type Builtin = Date | Function | Uint8Array | string | number | boolean | symbol | null | undefined;

    /** A recursively-partial object */
    type DeepPartial<T> = T extends Builtin
        ? T
        : T extends Array<infer U>
          ? Array<DeepPartial<U>>
          : T extends ReadonlyArray<infer U>
            ? ReadonlyArray<DeepPartial<U>>
            : T extends {}
              ? { [K in keyof T]?: DeepPartial<T[K]> }
              : Partial<T>;

    /** A 2D point, expressed as {x, y}. */
    type Point = {
        /** The x-coordinate */
        x: number;
        /** The y-coordinate */
        y: number;
    };

    /** A 2D point, expressed as an array [x, y]. */
    type PointArray = [x: number, y: number];

    /** A 3D point, expessed as {x, y, elevation}. */
    type ElevatedPoint = {
        /** The x-coordinate in pixels */
        x: number;
        /** The y-coordinate in pixels */
        y: number;
        /** The elevation in grid units */
        elevation: number;
    };

    /** A standard rectangle interface. */
    type Rectangle = {
        /** The x-coordinate of the top-left corner */
        x: number;
        /** The y-coordinate of the top-left corner */
        y: number;
        /** The width */
        width: number;
        /** The height */
        height: number;
    };

    type BuiltinTypes = typeof Number | typeof String | typeof Boolean;

    type ColorSource = number | [red: number, green: number, blue: number] | string | Color;
}
