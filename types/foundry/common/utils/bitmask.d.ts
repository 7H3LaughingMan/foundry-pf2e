export default class BitMask extends Number {
    /**
     * Create a new BitMask instance.
     * @param states An object containing valid states and their corresponding initial boolean values (default is null).
     */
    constructor(states?: Record<string, boolean>);

    /** The real value behind the bitmask instance. */
    #value: number;

    /** The structure of valid states and their associated values. */
    #validStates: Map<string, number>;

    /** The enum associated with this structure. */
    readonly states: Record<string, string>;

    /**
     * Generates the valid states and their associated values.
     * @param states The structure defining the valid states and their associated values (default is null).
     */
    #generateValidStates(states?: Record<string, boolean>): void;

    /** Generates an enum based on the provided valid states. */
    #generateEnum(): void;

    /**
     * Calculate the default value of the bitmask based on the initial states
     * @param initialStates The structure defining the valid states and their associated values.
     */
    #computeValue(initialStates?: Record<string, boolean>): number;

    /**
     * Checks a state and throws an error if it doesn't exist.
     * @param state Name of the state to check.
     */
    #checkState(state: string): void;

    /** True if this bitmask is empty (no active states). */
    get isEmpty(): boolean;

    /**
     * Check if a specific state is active.
     * @param state The state to check.
     * @returns True if the state is active, false otherwise.
     */
    hasState(state: string): boolean;

    /**
     * Add a state to the bitmask.
     * @param state The state to add.
     * @throws Throws an error if the provided state is not valid.
     */
    addState(state: string): void;

    /**
     * Remove a state from the bitmask.
     * @param state The state to remove.
     * @throws Throws an error if the provided state is not valid.
     */
    removeState(state: string): void;

    /**
     * Toggle the state of a specific state in the bitmask.
     * @param state The state to toggle.
     * @param enabled Toggle on (true) or off (false)? If undefined, the state is switched automatically.
     * @throws Throws an error if the provided state is not valid.
     */
    toggleState(state: string, enabled?: boolean): void;

    /** Clear the bitmask, setting all states to inactive. */
    clear(): void;

    /**
     * Get the current value of the bitmask.
     * @returns The current value of the bitmask.
     */
    valueOf(): number;

    /**
     * Get a string representation of the bitmask in binary format.
     * @returns The string representation of the bitmask.
     */
    toString(): string;

    /**
     * Checks if two bitmasks structures are compatible (the same valid states).
     * @param otherBitMask The bitmask structure to compare with.
     * @returns True if the two bitmasks have the same structure, false otherwise.
     */
    isCompatible(otherBitMask: BitMask): boolean;

    /**
     * Serializes the bitmask to a JSON string.
     * @returns The JSON string representing the bitmask.
     */
    toJSON(): string;

    /**
     * Creates a new BitMask instance from a JSON string.
     * @param jsonString The JSON string representing the bitmask.
     * @returns A new BitMask instance created from the JSON string.
     */
    static fromJSON(jsonString: string): BitMask;

    /**
     * Convert value of this BitMask to object representation according to structure.
     * @returns The data represented by the bitmask.
     */
    toObject(): object;

    /**
     * Creates a clone of this BitMask instance.
     * @returns A new BitMask instance with the same value and valid states as this instance.
     */
    clone(): BitMask;

    /**
     * Generates shader constants based on the provided states.
     * @param states An array containing valid states.
     * @returns Shader bit mask constants generated from the states.
     */
    static generateShaderBitMaskConstants(states: string[]): string;
}
