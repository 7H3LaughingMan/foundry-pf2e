import { ClientDocument } from "#client/documents/abstract/client-document.mjs";
import { MacroPF2e } from "foundry-pf2e";
import * as R from "remeda";
import { MODULE } from "./module.ts";

export function getInMemory<T>(
    obj: foundry.documents.abstract.ClientDocument | foundry.canvas.placeables.Token,
    ...path: string[]
): T | undefined {
    return foundry.utils.getProperty(obj, `modules.${module.id}.${path.join(".")}`) as T | undefined;
}

export function setInMemory<T>(
    obj: foundry.documents.abstract.ClientDocument | foundry.canvas.placeables.Token,
    ...args: [...string[], T]
): boolean {
    const value = args.pop() as T;
    return foundry.utils.setProperty(obj, `modules.${MODULE.id}.${args.join(".")}`, value);
}

export function getOrSetInMemory<T>(
    obj: foundry.documents.abstract.ClientDocument | foundry.canvas.placeables.Token,
    ...args: [...string[], () => T]
): T {
    const path = args.slice(0, -1) as string[];
    const exist = getInMemory<T>(obj, ...path);

    if (R.isNonNullish(exist)) return exist;

    const fallback = args.at(-1) as () => T;
    const value = fallback();

    setInMemory(obj, ...path, value);
    return value;
}

export function deleteInMemory(
    obj: foundry.documents.abstract.ClientDocument | foundry.canvas.placeables.Token,
    ...path: string[]
): boolean {
    return foundry.utils.deleteProperty(obj, `modules.${MODULE.id}.${path.join(",")}`);
}

export function isClientDocument<T>(doc: T): doc is Extract<T, ClientDocument> {
    return doc instanceof foundry.abstract.Document && "collection" in doc;
}

export function isScriptMactor(doc: unknown): doc is MacroPF2e {
    return doc instanceof foundry.documents.Macro && doc.type === "script";
}
