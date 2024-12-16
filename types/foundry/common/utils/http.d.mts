/**
 * A wrapper method around `fetch` that attaches an AbortController signal to the `fetch` call for clean timeouts
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal#aborting_a_fetch_with_timeout_or_explicit_abort
 * @param url The URL to make the Request to
 * @param data The data of the Request
 * @param timeoutMs How long to wait for a Response before cleanly aborting. If null, no timeout is applied
 * @param onTimeout A method to invoke if and when the timeout is reached
 */
export function fetchWithTimeout(
    url: string,
    data?: RequestInit,
    { timeoutMs, onTimeout }?: { timeoutMs?: number | null; onTimeout?: () => void },
): Promise<Response>;

/**
 * A small wrapper that automatically asks for JSON with a Timeout
 * @param url The URL to make the Request to
 * @param data The data of the Request
 * @param timeoutMs How long to wait for a Response before cleanly aborting
 * @param onTimeout A method to invoke if and when the timeout is reached
 */
export function fetchJsonWithTimeout(
    url: string,
    data?: RequestInit,
    { timeoutMs, onTimeout }?: { timeoutMs?: number | null; onTimeout?: () => void },
): Promise<unknown>;

/**
 * Represents an HTTP Error when a non-OK response is returned by Fetch
 */
export class HttpError extends Error {
    constructor(statusText: string, code: number, displayMessage?: string);
    code: number;
    displayMessage: string;
}
