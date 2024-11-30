/**
 * Stores a map of objects with weak references to the keys, allowing them to be garbage collected. Both keys and values
 * can be iterated over, unlike a WeakMap.
 */
export default class IterableWeakMap<K extends WeakKey, V> extends WeakMap<K, V> {
    /**
     * A set of weak refs to the map's keys, allowing enumeration.
     */
    #refs: Set<WeakRef<K>>;

    /**
     * A FinalizationRegistry instance to clean up the ref set when objects are garbage collected.
     */
    #finalizer: FinalizationRegistry<IterableWeakMapHeldValue<K>>;

    /**
     * @param entries he initial entries.
     */
    constructor(entries?: Iterable<[K, V]>);

    /* -------------------------------------------- */

    /**
     * Clean up the corresponding ref in the set when its value is garbage collected.
     * @param heldValue The value held by the finalizer.
     */
    static #cleanup<K extends WeakKey>(heldValue: IterableWeakMapHeldValue<K>): void;

    /**
     * Remove a key from the map.
     * @param key The key to remove.
     */
    delete(key: K): boolean;

    /**
     * Retrieve a value from the map.
     * @param key The value's key.
     */
    get(key: K): V | undefined;

    /**
     * Place a value in the map.
     * @param key The key.
     * @param value The value.
     */
    set(key: K, value: V): this;

    /**
     * Clear all values from the map.
     */
    clear(): void;

    /**
     * Enumerate the entries.
     */
    [Symbol.iterator](): Generator<[K, V], void, any>;

    /**
     * Enumerate the entries.
     */
    entries(): Generator<[K, V], void, any>;

    /**
     * Enumerate the keys.
     */
    keys(): Generator<K, void, any>;

    /**
     * Enumerate the values.
     */
    values(): Generator<V, void, any>;
}

declare global {
    type IterableWeakMapHeldValue<K extends WeakKey> = {
        /** The set to be cleaned. */
        set: Set<WeakRef<K>>;
        /** The ref to remove. */
        ref: WeakRef<K>;
    };

    type IterableWeakMapValue<K extends WeakKey, V> = {
        /** The value. */
        value: V;
        /** The weak ref of the key. */
        reg: WeakRef<K>;
    };
}
