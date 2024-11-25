import Document from "../../common/abstract/document.js";

/**
 * Export data content to be saved to a local file
 *
 * @param data      Data content converted to a string
 * @param type      The type of
 * @param filename  The filename of the resulting download
 */
declare function saveDataToFile(data: string, type: string, filename: string): void;

/**
 * Read text data from a user provided File object
 *
 * @param file  A File object
 * @returns     A Promise which resolves to the loaded text data
 */
declare function readTextFromFile(file: File): Promise<string>;

/**
 * Retrieve a Document by its Universally Unique Identifier (uuid).
 *
 * @param uuid              The uuid of the Document to retrieve
 * @param options           Options to configure how a UUID is resolved.
 * @param options.relative  A Document to resolve relative UUIDs against.
 * @param options.invalid   Allow retrieving an invalid Document.
 * @returns                 Returns the Document if it could be found, otherwise null.
 */
declare function fromUuid(uuid: string, options?: { relative?: Document; invalid?: boolean }): Promise<Document | null>;

/**
 * Retrieve a Document by its Universally Unique Identifier (uuid) synchronously. If the uuid resolves to a compendium
 *  document, that document's index entry will be returned instead.
 *
 * @param uuid              The uuid of the Document to retrieve
 * @param options           Options to configure how a UUID is resolved.
 * @param options.relative  A Document to resolve relative UUIDs against.
 * @param options.invalid   Allow retrieving an invalid Document.
 * @param options.strict    Throw an error if the UUID cannot be resolved synchronously.
 * @returns                 The Document or its index entry if it resides in a Compendium, otherwise
 *                          null.
 * @throws If the uuid resolves to a Document that cannot be retrieved synchronously, and the strict option is true.
 */
declare function fromUuidSync(
    uuid: string,
    options?: { relative?: Document; invalid?: boolean; strict?: boolean }
): Document | object | null;

/**
 * Resolve a series of embedded document UUID parts against a parent Document.
 *
 * @param parent            The parent Document.
 * @param parts             A series of Embedded Document UUID parts.
 * @param options           Additional options to configure Embedded Document resolution.
 * @param options.invalid   Allow retrieving an invalid Embedded Document.
 * @returns                 The resolved Embedded Document.
 */
declare function _resolveEmbedded(parent: Document, parts: string[], options?: { invalid?: boolean }): Document;

/**
 * Return a reference to the Document class implementation which is configured for use.
 *
 * @param documentName  The canonical Document name, for example "Actor"
 * @returns             The configured Document class implementation
 */
declare function getDocumentClass(documentName: string): typeof foundry.abstract.Document;
