import { DatabaseUpdateOperation } from "#common/abstract/_types.mjs";
import { MODULE } from "#utilities/module.ts";

export function flagPath(...path: string[]): string {
    return `flags.${MODULE.path(path)}`;
}

export function unsetFlagPath(...path: [string, ...string[]]): string {
    const lastKey = path.pop();
    return flagPath(...path, `-=${lastKey}`);
}

export function getFlag<T>(doc: foundry.abstract.Document, ...path: string[]): T | undefined {
    return doc.getFlag(MODULE.id, path.join(".")) as T | undefined;
}

export function setFlag<D extends foundry.abstract.Document, T>(doc: D, ...args: [...string[], T]): Promise<D> {
    const value = args.pop() as T;
    return doc.setFlag(MODULE.id, args.join("."), value);
}

export function unsetFlag<D extends foundry.abstract.Document>(doc: D, ...path: string[]): Promise<D | undefined> {
    return doc.unsetFlag(MODULE.id, path.join("."));
}

export function updateFlag<D extends foundry.abstract.Document, T extends Record<string, unknown>>(
    doc: D,
    updates: T,
    operation?: Partial<DatabaseUpdateOperation<D>>,
): Promise<D | undefined> {
    return doc.update({ flags: { [MODULE.id]: updates } }, operation);
}

export function getFlagProperty<T>(obj: object, ...path: string[]): T | undefined {
    return foundry.utils.getProperty(obj, flagPath(...path)) as T | undefined;
}

export function setFlagProperty<D extends object, T>(obj: D, ...args: [...string[], T]): D {
    const value = args.pop();
    foundry.utils.setProperty(obj, flagPath(...(args as string[])), value);
    return obj;
}

export function unsetFlagProperty<D extends object>(obj: D, ...path: [string, ...string[]]): D {
    foundry.utils.setProperty(obj, unsetFlagPath(...path), null);
    return obj;
}

export function deleteFlagProperty<D extends object>(obj: D, ...path: string[]): D {
    foundry.utils.deleteProperty(obj, flagPath(...path));
    return obj;
}
