import { localeCompare } from "#utilities/string.ts";

import * as R from "remeda";

export function sortByLocaleCompare<T extends Record<string, unknown>>(list: T[], key: keyof T): void {
    list.sort((a, b) => localeCompare(String(a[key]), String(b[key])));
}

export function mapToObjectByKey<T extends Record<string, unknown>, K extends ExtractKeys<T, string>>(data: T[], key: K): Record<string, T> {
    return R.indexBy(data, (value) => value[key] as string);
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
