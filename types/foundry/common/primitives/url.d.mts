export {};

declare global {
    interface URLConstructor {
        /**
         * Attempt to parse a URL without throwing an error.
         * @param url The string to parse.
         * @returns he parsed URL if successful, otherwise null.
         */
        parseSafe(url: string): URL | null;
    }
}
