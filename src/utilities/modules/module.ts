import { joinString } from "./string";

const _MODULE = {
    id: "",
    groupLog: false,
    current: undefined as foundry.packages.Module | undefined,
};

export const MODULE = {
    get id(): string {
        if (!_MODULE.id) throw new Error("Module needs to be registered.");
        return _MODULE.id;
    },
    get name(): string {
        if (!_MODULE.id) throw new Error("Module needsto be registered.");
        return this.current.title;
    },
    get current(): foundry.packages.Module {
        return (_MODULE.current ??= game.modules.get(this.id) as foundry.packages.Module);
    },
    get isDebug(): boolean {
        return foundry.utils.getProperty(CONFIG, `debug.${this.id}`) === true;
    },
    Error(value: string): Error {
        return new Error(`\n[${this.name}] ${value}`);
    },
    error(value: string, error?: Error): void {
        let message = `[${this.name}] ${value}`;

        if (error instanceof Error) message += `\n${error.message}`;
        else if (typeof error === "string") message += `\n${error}`;

        console.error(message);
    },
    assert(condition: boolean, error: string): void {
        if (!condition) {
            throw this.Error(error);
        }
    },
    log(...args: unknown[]): void {
        if (_MODULE.groupLog) console.log(...args);
        else console.log(`[${this.name}]`, ...args);
    },
    group(label: string): void {
        this.groupEnd();
        _MODULE.groupLog = true;
        console.group(`[${this.name}] ${label}`);
    },
    groupEnd(): void {
        console.groupEnd();
        _MODULE.groupLog = false;
    },
    debug(...args: unknown[]): void {
        if (this.isDebug) this.log(...args);
    },
    enableDebugMode(): void {
        if (this.isDebug) return;

        foundry.utils.setProperty(CONFIG, `debug.${this.id}`, true);
    },
    path(...path: (string | string[])[]): string {
        const joined = joinString(".", ...path);
        return joined ? `${this.id}.${joined}` : `${this.id}`;
    },
    register(id: string): void {
        if (_MODULE.id) throw new Error("Module was already registered.");

        _MODULE.id = id;
    },
};
