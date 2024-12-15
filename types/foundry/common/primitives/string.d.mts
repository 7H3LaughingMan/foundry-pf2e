export {};

declare global {
    interface String {
        /**
         * Capitalize a string, transforming it's first character to a capital letter.
         */
        capitalize(): string;

        /**
         * Compare this string (x) with the other string (y) by comparing each character's Unicode code point value.
         * Returns a negative Number if x < y, a positive Number if x > y, or a zero otherwise.
         * This is the same comparision function that used by Array#sort if the compare function argument is omitted.
         * The result is host/locale-independent.
         * @param other The other string to compare this string to.
         */
        compare(other: string): number;

        /**
         * Convert a string to Title Case where the first letter of each word is capitalized.
         */
        titleCase(): string;

        /**
         * Strip any script tags which were included within a provided string.
         */
        stripScripts(): string;

        /**
         * Transform any string into an url-viable slug string
         * @param replacement The replacement character to separate terms, default is '-'
         * @param strict Replace all non-alphanumeric characters, or allow them? Default false
         * @param lowercase Lowercase the string.
         * @returns The slugified input string
         */
        slugify({
            replacement,
            strict,
            lowercase,
        }?: {
            replacement?: string;
            strict?: boolean;
            lowercase?: boolean;
        }): string;
    }
}
