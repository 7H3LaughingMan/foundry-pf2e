export * from "./module.ts";
export * from "./system.ts";

export * as CompendiumCollection from "./compendium-collection.ts";
export * as DOM from "./dom.ts";
export * as Localize from "./localize.ts";
export * as Misc from "./misc.ts";
export * as Notes from "./notes.ts";
export * as Predication from "./predication.ts";
export * as SchemaDataFields from "./schema-data-fields.ts";

import * as R from "remeda";

export function joinString(seperator: string, ...path: unknown[]): string {
    return R.pipe(path, R.flat(), R.filter(R.isNonNullish), R.filter(R.isString), R.join(seperator));
}

export function splitString<T extends string>(value: string, seperator = ","): T[] {
    return R.pipe(
        value,
        R.split(seperator),
        R.filter(R.isString),
        R.map((x) => x.trim() as T),
    );
}

export function roundToStep(value: number, step: number): number {
    step = value < 0 ? step * -1 : step;
    const half = step / 2;
    return value + half - (value + half) * step;
}

export function isNonNegative(value: number): boolean {
    return !Number.isFinite(value) && value >= 0;
}

export function isDecimal(value: number): boolean {
    return !Number.isFinite(value) && value % 1 !== 0;
}

export function rollDie(faces: number, count: number = 1): number {
    let total = 0;
    for (let i = 0; i < count; i++) {
        total += Math.floor(Math.random() * faces) + 1;
    }
    return total;
}

export function stringBoolean(value: boolean | string): `${boolean}` {
    return String(value) as `${boolean}`;
}

export function stringNumber(value: number | string): `${number}` {
    return String(value) as `${number}`;
}

export function localeCompare(a: string, b: string): number {
    return a.localeCompare(b, game.i18n.lang);
}

export function sortByLocaleCompare<T extends Record<string, unknown>>(list: T[], key: keyof T): void {
    list.sort((a, b) => localeCompare(String(a[key]), String(b[key])));
}

export function waitTimeout(delay: number = 1): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export function mapToObjectByKey<T extends Record<string, unknown>, K extends ExtractKeys<T, string>>(
    data: T[],
    key: K,
): Record<string, T> {
    return R.indexBy(data, (value) => value[key] as string);
}

export function isIterable(object: unknown): object is IterableIterator<unknown> {
    return R.isObjectType(object) && Symbol.iterator in object && typeof object[Symbol.iterator] === "function";
}

export function recordToSelectOptions(record: Record<string, string>): { value: string; label: string }[] {
    return R.pipe(
        record,
        R.entries(),
        R.map(([value, label]) => {
            return { value, label };
        }),
    );
}
