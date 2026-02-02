import * as R from "remeda";

export function isIterable(object: unknown): object is IterableIterator<unknown> {
    return R.isObjectType(object) && Symbol.iterator in object && typeof object[Symbol.iterator] === "function";
}
