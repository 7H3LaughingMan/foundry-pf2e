export {};

declare global {
    /**
     * A Custom DataField validator function.
     *
     * A boolean return value indicates that the value is valid (true) or invalid (false) with certainty. With an explicit
     * boolean return value no further validation functions will be evaluated.
     *
     * An undefined return indicates that the value may be valid but further validation functions should be performed,
     * if defined.
     *
     * An Error may be thrown which provides a custom error message explaining the reason the value is invalid.
     *
     * @param value The value provided for validation
     * @param options Validation options
     */
    type DataFieldValidator = (value: unknown, options: DataFieldValidationOptions) => boolean | void;

    /**
     * @typedef {Object} DataFieldOptions
     * @property {boolean} [required=false]   Is this field required to be populated?
     * @property {boolean} [nullable=false]   Can this field have null values?
     * @property {boolean} [gmOnly=false]     Can this field only be modified by a gamemaster or assistant gamemaster?
     * @property {Function|*} [initial]       The initial value of a field, or a function which assigns that initial value.
     * @property {string} [label]             A localizable label displayed on forms which render this field.
     * @property {string} [hint]              Localizable help text displayed on forms which render this field.
     * @property {DataFieldValidator} [validate] A custom data field validation function.
     * @property {string} [validationError]   A custom validation error string. When displayed will be prepended with the
     *                                        document name, field name, and candidate value. This error string is only
     *                                        used when the return type of the validate function is a boolean. If an Error
     *                                        is thrown in the validate function, the string message of that Error is used.
     */

    interface DataFieldContext {
        /** A field name to assign to the constructed field */
        name?: string;
        /** Another data field which is a hierarchical parent of this one */
        parent?: DataField;
    }

    interface DataFieldValidationOptions {
        /** Whether this is a partial schema validation, or a complete one. */
        partial?: boolean;
        /** Whether to allow replacing invalid values with valid fallbacks. */
        fallback?: boolean;
        /** The full source object being evaluated. */
        source?: object;
        /**
         * If true, invalid embedded documents will emit a warning and be placed in
         * the invalidDocuments collection rather than causing the parent to be
         * considered invalid.
         */
        dropInvalidEmbedded?: boolean;
    }

    interface FormGroupConfig {
        /** A text label to apply to the form group */
        label: string;
        /** An optional units string which is appended to the label */
        units?: string;
        /** An HTML element or collection of elements which provide the inputs for the group */
        input: HTMLElement | HTMLCollection;
        /** Hint text displayed as part of the form group */
        hint?: string;
        /**
         * Some parent CSS id within which field names are unique. If provided,
         * this root ID is used to automatically assign "id" attributes to
         * input elements and "for" attributes to corresponding labels.
         */
        rootId?: string;
        /**  An array of CSS classes applied to the form group element */
        classes?: string[];
        /** Is the "stacked" class applied to the form group */
        stacked?: boolean;
        /** Should labels or other elements within this form group be automatically localized? */
        localize?: boolean;
        /** The value of the form group's hidden attribute */
        hidden?: boolean | "until-found";
        /** A custom form group widget function which replaces the default group HTML generation */
        widget?: CustomFormGroup;
    }

    interface FormInputConfig<FormInputValue = unknown> {
        /** The name of the form element */
        name: string;
        /** The current value of the form element */
        value?: FormInputValue;
        /** An id to assign to the element */
        id?: string;
        /** Is the field required? */
        required?: boolean;
        /** Is the field disabled? */
        disabled?: boolean;
        /** Is the field readonly? */
        readonly?: boolean;
        /** Is the field autofocused? */
        autofocus?: boolean;
        /** Localize values of this field? */
        localize?: boolean;
        /** Additional dataset attributes to assign to the input */
        dataset?: Record<string, string>;
        /** A placeholder value, if supported by the element type */
        placeholder?: string;
        /** Space-delimited class names to apply to the input. */
        classes?: string;
        input?: CustomFormInput;
    }

    interface StringFieldInputConfig {
        /** The element to create for this form field */
        elementType?: "input" | "textarea" | "prose-mirror" | "code-mirror";
    }

    type CodeMirrorLanguage = "javascript" | "json" | "html" | "markdown" | "" | "plain";

    interface CodeMirrorInputConfig {
        /** The value's language */
        language?: CodeMirrorLanguage;
        /** The number of spaces per level of indentation */
        indent?: number;
    }
}
