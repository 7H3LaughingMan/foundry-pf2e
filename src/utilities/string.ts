import * as R from "remeda";

export function joinString(seperator: string, ...values: unknown[]): string {
    return R.pipe(
        values,
        R.flat(),
        R.filter((x) => R.isNonNullish(x) && R.isString(x)),
        R.join(seperator),
    );
}
