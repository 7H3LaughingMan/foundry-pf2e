/**
 * A reusable storage concept which blends the functionality of an Array with the efficient key-based lookup of a Map.
 * This concept is reused throughout Foundry VTT where a collection of uniquely identified elements is required.
 * @template {string} K
 * @template {*} V
 * @extends {Map<K, V>}
 */
export default class Collection<V> extends Map<string, V> {
    constructor(entries?: readonly (readonly [string, V])[] | null);

    /* -------------------------------------------- */

    /**
     * Then iterating over a Collection, we should iterate over its values instead of over its entries
     */
    // @ts-expect-error 2416: Override of Collection[Symbol.iterator] does not match Map[Symbol.iterator]
    [Symbol.iterator](): IterableIterator<V>;

    /* -------------------------------------------- */

    /**
     * Return an Array of all the entry values in the Collection
     */
    get contents(): V[];

    /* -------------------------------------------- */

    /**
     * Find an entry in the Map using a functional condition.
     * @param condition The functional condition to test. Positional
     * arguments are the value, the index of iteration, and the collection being searched.
     * @return The value, if found, otherwise undefined
     */
    find<T extends V = V>(condition: (element: T, index: number, collection: Collection<T>) => boolean): T | undefined;

    /* -------------------------------------------- */

    /**
     * Filter the Collection, returning an Array of entries which match a functional condition.
     * @param condition  The functional condition to test. Positional
     * arguments are the value, the index of iteration, and the collection being filtered.
     * @return An Array of matched values
     */
    filter<T extends V = V>(condition: (element: T, index: number, collection: Collection<T>) => boolean): T[];
    filter<T extends V = V>(condition: (element: T, index: number, collection: Collection<T>) => element is T): T[];

    /* -------------------------------------------- */

    /**
     * Apply a function to each element of the collection
     * @param fn A function to apply to each element
     */
    // @ts-expect-error 2416: Override of Collection.forEach does not match Map.forEach
    forEach(fn: (element: V) => void): void;

    /* -------------------------------------------- */

    /**
     * Get an element from the Collection by its key.
     * @param key The key of the entry to retrieve
     * @param strict Throw an Error if the requested key does not exist. Default false.
     * @return The retrieved entry value, if the key exists, otherwise undefined
     */
    get<T extends V = V>(key: string, { strict }: { strict: true }): T;
    get<T extends V = V>(key: string, { strict }?: { strict?: boolean }): T | undefined;

    /* -------------------------------------------- */

    /**
     * Get an entry from the Collection by name.
     * Use of this method assumes that the objects stored in the collection have a "name" attribute.
     * @param name The name of the entry to retrieve
     * @param strict Throw an Error if the requested name does not exist. Default false.
     * @return The retrieved entry value, if one was found, otherwise undefined
     */
    getName(name: string, { strict }: { strict: true }): V;
    getName(name: string, { strict }?: { strict?: boolean }): V | undefined;

    /* -------------------------------------------- */

    /**
     * Transform each element of the Collection into a new form, returning an Array of transformed values
     * @param transformer A transformation function applied to each entry value.
     * Positional arguments are the value, the index of iteration, and the collection being mapped.
     * @return An Array of transformed values
     */
    map<T>(transformer: (element: V, index: number, collection: Collection<V>) => T): T[];

    /* -------------------------------------------- */

    /**
     * Reduce the Collection by applying an evaluator function and accumulating entries
     * @param reducer A reducer function applied to each entry value. Positional
     * arguments are the accumulator, the value, the index of iteration, and the collection being reduced.
     * @param initial An initial value which accumulates with each iteration
     * @return The accumulated result
     */
    reduce<T>(
        reducer: (accumulator: T, currentValue: V, currentIndex: number, collection: Collection<V>) => T,
        initial: T,
    ): T;

    /* -------------------------------------------- */

    /**
     * Test whether a condition is met by some entry in the Collection.
     * @param condition The functional condition to test. Positional
     * arguments are the value, the index of iteration, and the collection being tested.
     * @return Was the test condition passed by at least one entry?
     */
    some(condition: (element: V, index: number, collection: Collection<V>) => boolean): boolean;

    /* -------------------------------------------- */

    /**
     * Convert the Collection to a primitive array of its contents.
     * @returns An array of contained values
     */
    toJSON(): object[];
}
