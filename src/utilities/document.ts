import { ClientDocument } from "#client/documents/abstract/client-document.mjs";
import { DocumentUUID } from "#client/utils/_module.mjs";
import { DocumentType } from "#common/constants.mjs";
import { MacroPF2e } from "#pf2e-module/macro.js";
import { MODULE } from "#utilities/module.ts";

import * as R from "remeda";

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
    return doc instanceof foundry.documents.abstract.ClientDocument && "collection" in doc;
}

export function isChatMacro(doc: unknown): doc is MacroPF2e {
    return doc instanceof foundry.documents.Macro && doc.type === "chat";
}

export function isScriptMacro(doc: unknown): doc is MacroPF2e {
    return doc instanceof foundry.documents.Macro && doc.type === "script";
}

export function isUuidOf(
    uuid: string,
    type: DocumentType | DocumentType[] | readonly DocumentType[],
): uuid is DocumentUUID {
    if (!uuid) return false;

    const types = R.isArray(type) ? type : [type];
    const result = foundry.utils.parseUuid(uuid);
    return (
        R.isNonNullish(result?.type) &&
        R.isNonNullish(result?.documentId) &&
        types.includes(result.type as DocumentType)
    );
}
