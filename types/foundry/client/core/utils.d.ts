/**
 * Return a reference to the Document class implementation which is configured for use.
 * @param {string} documentName                 The canonical Document name, for example "Actor"
 * @returns {typeof foundry.abstract.Document}  The configured Document class implementation
 */
declare function getDocumentClass(documentName: string): foundry.abstract.Document;
