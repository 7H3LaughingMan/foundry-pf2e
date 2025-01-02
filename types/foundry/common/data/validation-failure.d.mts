/**
 * A class responsible for recording information about a validation failure.
 */
export class DataModelValidationFailure {
    /**
     * @param invalidValue The value that failed validation for this field.
     * @param fallback The value it was replaced by, if any.
     * @param dropped Whether the value was dropped from some parent collection.
     * @param message The validation error message.
     * @param unresolved Whether this failure was unresolved
     */
    constructor({
        invalidValue,
        fallback,
        dropped,
        message,
        unresolved,
    }?: {
        invalidValue?: unknown;
        fallback?: unknown;
        dropped?: boolean;
        message?: string;
        unresolved?: boolean;
    });

    /**
     * The value that failed validation for this field.
     */
    invalidValue: unknown;

    /**
     * The value it was replaced by, if any.
     */
    fallback: unknown;

    /**
     * Whether the value was dropped from some parent collection.
     */
    dropped: boolean;

    /**
     * The validation error message.
     */
    message: string | undefined;

    /**
     * If this field contains other fields that are validated as part of its validation, their results are recorded here.
     */
    fields: Record<string, DataModelValidationFailure>;

    /**
     * If this field contains a list of elements that are validated as part of its validation, their results are recorded
     * here.
     */
    elements: ElementValidationFailure[];

    /**
     * Record whether a validation failure is unresolved.
     * This reports as true if validation for this field or any hierarchically contained field is unresolved.
     * A failure is unresolved if the value was invalid and there was no valid fallback value available.
     */
    unresolved: boolean;

    /**
     * Return this validation failure as an Error object.
     */
    asError(): DataModelValidationError;

    /**
     * Whether this failure contains other sub-failures.
     * @returns {boolean}
     */
    isEmpty(): boolean;

    /**
     * Return the base properties of this failure, omitting any nested failures.
     */
    toObject(): { invalidValue: unknown; fallback: unknown; dropped: boolean; message: string | undefined };

    /**
     * Represent the DataModelValidationFailure as a string.
     * @returns {string}
     */
    toString(): string;

    /**
     * Format a DataModelValidationFailure instance as a string message.
     * @param failure The failure instance
     * @param _d An internal depth tracker
     * @returns The formatted failure string
     */
    static #formatString(failure: DataModelValidationFailure, _d?: number): string;
}

/**
 * A specialised Error to indicate a model validation failure.
 */
export class DataModelValidationError extends Error {
    /**
     * @param failure The failure that triggered this error or an error message
     * @param options Additional Error constructor parameters
     */
    constructor(failure?: DataModelValidationFailure | string, options?: ErrorOptions);

    /**
     * The root validation failure that triggered this error.
     */
    #failure: DataModelValidationFailure;

    /**
     * Retrieve the root failure that caused this error, or a specific sub-failure via a path.
     * @param path The property path to the failure.
     */
    getFailure(path?: string): DataModelValidationFailure;

    /**
     * Retrieve a flattened object of all the properties that failed validation as part of this error.
     */
    getAllFailures(): Record<string, DataModelValidationFailure>;

    /**
     * Log the validation error as a table.
     */
    logAsTable(): void;

    /**
     * Generate a nested tree view of the error as an HTML string.
     */
    asHTML(): string;

    /**
     * Collect nested failures into an aggregate object.
     * @param failure The failure.
     * @returns Returns the failure at the leaf of the tree, otherwise an object of sub-failures.
     */
    static #aggregateFailures(
        failure: DataModelValidationFailure,
    ): DataModelValidationFailure | Record<string, DataModelValidationFailure>;
}

declare global {
    interface ElementValidationFailure {
        /** Either the element's index or some other identifier for it. */
        id: string | number;
        /** Optionally a user-friendly name for the element */
        name?: string;
        /** The element's validation failure. */
        failure: DataModelValidationFailure;
    }
}
