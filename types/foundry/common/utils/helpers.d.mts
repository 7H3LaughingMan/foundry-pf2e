/**
 * Benchmark the performance of a function, calling it a requested number of iterations.
 * @param func The function to benchmark
 * @param iterations The number of iterations to test
 * @param  args Additional arguments passed to the benchmarked function
 */
export function benchmark<F extends AnyFunction>(func: F, iterations: number, ...args: Parameters<F>): Promise<void>;

/**
 * A debugging function to test latency or timeouts by forcibly locking the thread for an amount of time.
 * @param ms A number of milliseconds to lock
 * @param debug Log debugging information?
 */
export function threadLock(ms: number, debug?: boolean): Promise<void>;

/**
 * Wrap a callback in a debounced timeout.
 * Delay execution of the callback function until the function has not been called for delay milliseconds
 * @param callback A function to execute once the debounced threshold has been passed
 * @param delay An amount of time in milliseconds to delay
 * @return A wrapped function which can be called to debounce execution
 */
export function debounce<F extends AnyFunction>(callback: F, delay: number): (...args: Parameters<F>) => void;

/**
 * Wrap a callback in a throttled timeout.
 * Delay execution of the callback function when the last time the function was called was delay milliseconds ago
 * @param callback A function to execute once the throttled threshold has been passed
 * @param delay A maximum amount of time in milliseconds between to execution
 * @return A wrapped function which can be called to throttle execution
 */
export function throttle<F extends AnyFunction>(callback: F, delay: number): F;

/**
 * A utility function to reload the page with a debounce.
 */
export const debouncedReload: VoidFunction;

/**
 * Recursively freezes (`Object.freeze`) the object (or value).
 * This method DOES NOT support cyclical data structures.
 * This method DOES NOT support advanced object types like Set, Map, or other specialized classes.
 * @param obj The object (or value)
 * @param strict Throw an Error if deepFreeze is unable to seal something instead of returning the original
 * @returns The same object (or value) that was passed in
 */
export function deepFreeze<T extends object>(obj: T, { strict }?: { strict?: boolean }): DeepReadonly<T>;

/**
 * Recursively seals (`Object.seal`) the object (or value).
 * This method DOES NOT support cyclical data structures.
 * This method DOES NOT support advanced object types like Set, Map, or other specialized classes.
 * @param obj The object (or value)
 * @param strict hrow an Error if deepSeal is unable to seal something
 * @returns The same object (or value) that was passed in
 */
export function deepSeal<T extends object>(obj: T, { strict }?: { strict?: boolean }): T;

/**
 * Quickly clone a simple piece of data, returning a copy which can be mutated safely.
 * This method DOES support recursive data structures containing inner objects or arrays.
 * This method DOES NOT support cyclical data structures.
 * This method DOES NOT support advanced object types like Set, Map, or other specialized classes.
 * @param original Some sort of data
 * @param strict Throw an Error if deepClone is unable to clone something instead of returning the original
 * @return The clone of that data
 */
export function deepClone<T extends object>(original: T, { strict }?: { strict?: boolean }): T;

/**
 * Deeply difference an object against some other, returning the update keys and values.
 * @param original An object comparing data against which to compare
 * @param other An object containing potentially different data
 * @param inner Only recognize differences in other for keys which also exist in original
 * @param deletionKeys Apply special logic to deletion keys. They will only be kept if the original object has a corresponding key that could be deleted.
 * @param _d An internal depth tracker
 * @return An object of the data in other which differs from that in original
 */
export function diffObject(
    original: object,
    other: object,
    { inner, deletionKeys, _d }?: { inner?: boolean; deletionKeys?: boolean; _d?: number },
): object;

/**
 * Test if two objects contain the same enumerable keys and values.
 * @param a The first object.
 * @param b The second object.
 */
export function objectsEqual(a: object, b: object): boolean;

/**
 * A cheap data duplication trick which is relatively robust.
 * For a subset of cases the deepClone function will offer better performance.
 * @param original Some sort of data
 */
export function duplicate<T extends object>(original: T): T;

/**
 * Test whether some class is a subclass of a parent.
 * Returns true if the classes are identical.
 * @param cls The class to test
 * @param parent Some other class which may be a parent
 * @returns Is the class a subclass of the parent?
 */
export function isSubclass<Parent extends AnyConstructor>(cls: AnyConstructor, parent: Parent): cls is Parent;

/**
 * Search up the prototype chain and return the class that defines the given property.
 * @param obj A class instance or class definition which contains a property.
 *            If a class instance is passed the property is treated as an instance attribute.
 *            If a class constructor is passed the property is treated as a static attribute.
 * @param property The property name
 * @returns The class that defines the property
 */
export function getDefiningClass(obj: AnyConstructor, property: string): AnyConstructor;

/**
 * Encode a url-like string by replacing any characters which need encoding
 * To reverse this encoding, the native decodeURIComponent can be used on the whole encoded string, without adjustment.
 * @param path A fully-qualified URL or url component (like a relative path)
 * @return An encoded URL string
 */
export function encodeURL(path: string): string;

/**
 * Expand a flattened object to be a standard nested Object by converting all dot-notation keys to inner objects.
 * Only simple objects will be expanded. Other Object types like class instances will be retained as-is.
 * @param obj The object to expand
 * @return An expanded object
 */
export function expandObject(obj: object): object;

/**
 * Filter the contents of some source object using the structure of a template object.
 * Only keys which exist in the template are preserved in the source object.
 * @param source An object which contains the data you wish to filter
 * @param template An object which contains the structure you wish to preserve
 * @param deletionKeys Whether to keep deletion keys
 * @param templateValues Instead of keeping values from the source, instead draw values from the template
 */
export function filterObject(
    source: object,
    template: object,
    { deletionKeys, templateValues }?: { deletionKeys?: boolean; templateValues?: boolean },
): object;

/**
 * Flatten a possibly multidimensional object to a one-dimensional one by converting all nested keys to dot notation
 * @param obj The object to flatten
 * @param _d Track the recursion depth to prevent overflow
 * @return A flattened object
 */
export function flattenObject(obj: object, _d?: number): object;

/**
 * Obtain references to the parent classes of a certain class.
 * @param cls An class definition
 * @return An array of parent classes which the provided class extends
 */
export function getParentClasses(cls: AnyConstructor): Array<AnyConstructor>;

/**
 * Get the URL route for a certain path which includes a path prefix, if one is set
 * @param path The Foundry URL path
 * @param prefix A path prefix to apply
 * @returns The absolute URL path
 */
export function getRoute(path: string, { prefix }?: { prefix?: string | null }): string;

/**
 * Learn the underlying data type of some variable. Supported identifiable types include:
 * undefined, null, number, string, boolean, function, Array, Set, Map, Promise, Error,
 * HTMLElement (client side only), Object (catchall for other object types)
 * @param variable A provided variable
 * @return The named type of the token
 */
export function getType(
    variable: unknown,
):
    | "Array"
    | "Error"
    | "HTMLElement"
    | "Map"
    | "Object"
    | "Promise"
    | "Set"
    | "bigint"
    | "boolean"
    | "function"
    | "null"
    | "number"
    | "string"
    | "symbol"
    | "undefined";

/**
 * A helper function which tests whether an object has a property or nested property given a string key.
 * The method also supports arrays if the provided key is an integer index of the array.
 * The string key supports the notation a.b.c which would return true if object[a][b][c] exists
 * @param object The object to traverse
 * @param key An object property with notation a.b.c
 * @returns An indicator for whether the property exists
 */
export function hasProperty(object: object, key: string): boolean;

/**
 * A helper function which searches through an object to retrieve a value by a string key.
 * The method also supports arrays if the provided key is an integer index of the array.
 * The string key supports the notation a.b.c which would return object[a][b][c]
 * @param object The object to traverse
 * @param key An object property with notation a.b.c
 * @return The value of the found property
 */
export function getProperty(object: object, key: string): unknown;

/**
 * A helper function which searches through an object to assign a value using a string key
 * This string key supports the notation a.b.c which would target object[a][b][c]
 * @param object The object to update
 * @param key The string key
 * @param value The value to be assigned
 * @return Whether the value was changed from its previous value
 */
export function setProperty(object: object, key: string, value: unknown): boolean;

/**
 * Invert an object by assigning its values as keys and its keys as values.
 * @param obj The original object to invert
 * @returns The inverted object with keys and values swapped
 */
export function invertObject(obj: object): object;

/**
 * Return whether a target version (v1) is more advanced than some other reference version (v0).
 * Supports either numeric or string version comparison with version parts separated by periods.
 * @param v1 The target version
 * @param v0 The reference version
 * @return Is v1 a more advanced version than v0?
 */
export function isNewerVersion(v1: number | string, v0: number | string): boolean;

/**
 * Test whether a value is empty-like; either undefined or a content-less object.
 * @param value The value to test
 * @returns Is the value empty-like?
 */
export function isEmpty(value: unknown): boolean;

/**
 * Update a source object by replacing its keys and values with those from a target object.
 * @param original The initial object which should be updated with values from the target
 * @param other A new object whose values should replace those in the source
 * @param insertKeys Control whether to insert new top-level objects into the resulting structure which do not previously exist in the original object.
 * @param insertValues Control whether to insert new nested values into child objects in the resulting structure which did not previously exist in the original object.
 * @param overwrite Control whether to replace existing values in the source, or only merge values which do not already exist in the original object.
 * @param recursive Control whether to merge inner-objects recursively (if true), or whether to simply replace inner objects with a provided new value.
 * @param inplace Control whether to apply updates to the original object in-place (if true), otherwise the original object is duplicated and the copy is merged.
 * @param enforceTypes Control whether strict type checking requires that the value of a key in the other object must match the data type in the original data to be merged.
 * @param performDeletions Control whether to perform deletions on the original object if deletion keys are present in the other object.
 * @param _d A privately used parameter to track recursion depth.
 * @returns The original source object including updated, inserted, or overwritten records.
 */
export function mergeObject<T extends object, U extends object = T>(
    original: T,
    other?: U,
    {
        insertKeys,
        insertValues,
        overwrite,
        recursive,
        inplace,
        enforceTypes,
        performDeletions,
    }?: {
        insertKeys?: boolean;
        insertValues?: boolean;
        overwrite?: boolean;
        recursive?: boolean;
        inplace?: boolean;
        enforceTypes?: boolean;
        performDeletions?: boolean;
    },
    _d?: number,
): T & U;

/**
 * Parse an S3 key to learn the bucket and the key prefix used for the request.
 * @param key A fully qualified key name or prefix path.
 */
export function parseS3URL(key: string): { bucket: string | null; keyPrefix: string };

/**
 * Generate a random alphanumeric string ID of a given requested length using `crypto.getRandomValues()`.
 * @param length The length of the random string to generate, which must be at most 16384.
 * @return A string containing random letters (A-Z, a-z) and numbers (0-9).
 */
export function randomID(length?: number): string;

/**
 * Express a timestamp as a relative string
 * @param timeStamp A timestamp string or Date object to be formatted as a relative time
 * @return A string expression for the relative time
 */
export function timeSince(timeStamp: Date | string): string;

/**
 * Format a file size to an appropriate order of magnitude.
 * @param size The size in bytes.
 * @param decimalPlaces The number of decimal places to round to.
 * @param base The base to use. In base 10 a kilobyte is 1000 bytes. In base 2 it is 1024 bytes.
 */
export function formatFileSize(
    size: number,
    { decimalPlaces, base }?: { decimalPlaces?: number; base?: 2 | 10 },
): string;

export type ResolvedUUID = {
    /** The original UUID. */
    uuid: string;
    /** The type of Document referenced. Legacy compendium UUIDs will not populate this field if the compendium is not active in the World. */
    type?: string;
    /** The ID of the Document referenced. */
    id: string;
    /** The primary Document type of this UUID. Only present if the Document is embedded. */
    primaryType?: string;
    /** The primary Document ID of this UUID. Only present if the Document is embedded. */
    primaryId?: string;
    /** The collection that the primary Document belongs to. */
    collection?: DocumentCollection;
    /** Additional Embedded Document parts. */
    embedded: string[];
    /** An already-resolved parent Document. */
    doc?: Document;
    /** Either the document type or the parent type. Retained for backwards compatibility. */
    documentType?: string;
    /** Either the document id or the parent id. Retained for backwards compatibility. */
    documentId?: string;
};

/**
 * Parse a UUID into its constituent parts, identifying the type and ID of the referenced document.
 * The ResolvedUUID result also identifies a "primary" document which is a root-level document either in the game
 * World or in a Compendium pack which is a parent of the referenced document.
 * @param uuid The UUID to parse.
 * @param relative A document to resolve relative UUIDs against.
 * @returns Returns the Collection, Document Type, and Document ID to resolve the parent document, as well as the remaining Embedded Document parts, if any.
 * @throws An error if the provided uuid string is incorrectly structured
 */
export function parseUuid(uuid: string, { relative }?: { relative?: foundry.abstract.Document }): ResolvedUUID;
