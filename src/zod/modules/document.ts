import * as R from "remeda";
import * as z from "zod";

export function zDocument<T extends foundry.documents.abstract.ClientDocument>(
    type: CONST.DocumentType,
): z.ZodCustom<T, T> {
    if (!R.isIncludedIn(type, CONST.ALL_DOCUMENT_TYPES)) {
        throw new Error("The type of a zDocument must be keys in CONST.ALL_DOCUMENT_TYPES");
    }

    return z.custom((value) => R.isNonNullish(value) && value instanceof CONFIG[type].documentClass);
}

export function zDocumentUUID<T extends foundry.utils.DocumentUUID>(
    options: { embedded?: boolean; type?: CONST.DocumentType } | CONST.DocumentType,
): z.ZodCustom<T, T> {
    const { embedded, type } = R.isObjectType(options) ? options : { embedded: undefined, type: options };

    if (type && !R.isIncludedIn(type, CONST.ALL_DOCUMENT_TYPES)) {
        throw new Error("The type of a zDocumentUUID must be keys in CONST.ALL_DOCUMENT_TYPES");
    }

    return z.custom((value) => {
        const resolvedUUID = R.isString(value) ? foundry.utils.parseUuid(value) : null;

        if (!resolvedUUID) return false;
        if (type && resolvedUUID.type !== type) return false;
        if (resolvedUUID.type && !R.isIncludedIn(resolvedUUID.type, CONST.ALL_DOCUMENT_TYPES)) return false;
        if (embedded === true && !resolvedUUID.embedded.length) return false;
        if (embedded === false && resolvedUUID.embedded.length) return false;
        if (!resolvedUUID.documentId || !foundry.data.validators.isValidId(resolvedUUID.documentId)) return false;

        return true;
    });
}

export function zDocumentCodec<
    I extends foundry.utils.DocumentUUID,
    O extends foundry.documents.abstract.ClientDocument,
>(type: CONST.DocumentType): z.ZodCodec<z.ZodCustom<I, I>, z.ZodCustom<O, O>> {
    return z.codec(zDocumentUUID<I>(type), zDocument<O>(type), {
        decode: async (value) => (await fromUuid(value)) as O,
        encode: (value) => value.uuid as I,
    });
}
