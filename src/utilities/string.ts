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

export function stringBoolean(value: boolean | string): `${boolean}` {
    return String(value) as `${boolean}`;
}

export function stringNumber(value: number | string): `${number}` {
    return String(value) as `${number}`;
}

export function localeCompare(a: string, b: string): number {
    return a.localeCompare(b, game.i18n.lang);
}
