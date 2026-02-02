export function objectHasKey<O extends object>(obj: O, key: unknown): key is keyof O {
    return (typeof key === "string" || typeof key === "number") && key in obj;
}

export function tupleHasValue<const A extends readonly unknown[]>(array: A, value: unknown): value is A[number] {
    return array.includes(value);
}

export function setHasElement<T extends Set<unknown>>(set: T, value: unknown): value is SetElement<T> {
    return set.has(value);
}

export function waitTimeout(delay: number = 1): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
