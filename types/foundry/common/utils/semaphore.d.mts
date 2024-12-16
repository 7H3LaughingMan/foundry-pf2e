/**
 * A simple Semaphore implementation which provides a limited queue for ensuring proper concurrency.
 * @param max The maximum number of tasks which are allowed concurrently.
 */
export default class Semaphore {
    constructor(max?: number);

    /**
     * The number of pending tasks remaining in the queue
     */
    get remaining(): number;

    /**
     * The number of actively executing tasks
     */
    get active(): number;

    /**
     * Add a new tasks to the managed queue
     * @param fn A callable function
     * @param args Function arguments
     * @returns A promise that resolves once the added function is executed
     */
    add<F extends AnyFunction>(fn: F, ...args: Parameters<F>): Promise<Awaited<ReturnType<F>>>;

    /**
     * Abandon any tasks which have not yet concluded
     */
    clear(): void;

    /**
     * Attempt to perform a task from the queue.
     * If all workers are busy, do nothing.
     * If successful, try again.
     */
    private _try(): Promise<false | void>;
}
