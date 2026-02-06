import { joinString } from "#utilities/string.ts";
import { isErrorWithMessage } from "#utilities/type-guards.ts";

import * as R from "remeda";

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
        if (!_MODULE.id) throw new Error("Module needs to be registered.");
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
    output(type: "log" | "info" | "warn" | "error" | "debug", ...args: unknown[]): void {
        if (_MODULE.groupLog) console[type](...args);
        else console[type](`[${this.name}]`, ...args);
    },
    assert(condition: boolean, error: string): void {
        if (!condition) {
            throw this.Error(error);
        }
    },
    debug(...args: unknown[]): void {
        if (this.isDebug) this.output("debug", ...args);
    },
    enableDebugMode(): void {
        if (this.isDebug) return;

        foundry.utils.setProperty(CONFIG, `debug.${this.id}`, true);
    },
    error(value: string, error?: unknown): void {
        let message = `${value}`;

        if (isErrorWithMessage(error)) message += `\n${error.message}`;
        else if (R.isString(error)) message += `\n${error}`;

        this.output("error", message);
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
    info(...args: unknown[]): void {
        this.output("info", ...args);
    },
    log(...args: unknown[]): void {
        this.output("log", ...args);
    },
    path(...path: (string | string[])[]): string {
        const joined = joinString(".", ...path);
        return joined ? `${this.id}.${joined}` : `${this.id}`;
    },
    register(id: string): void {
        if (_MODULE.id) throw new Error("Module was already registered.");

        _MODULE.id = id;
    },
    warn(...args: unknown[]): void {
        this.output("warn", ...args);
    },
};
