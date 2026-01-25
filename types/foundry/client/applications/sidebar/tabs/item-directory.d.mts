import DocumentDirectory, { DocumentDirectoryConfiguration } from "../document-directory.mjs";
import { ContextMenuEntry } from "./../../../applications/ux/context-menu.mjs";
import Item from "./../../../documents/item.mjs";

/**
 * The World Item directory listing.
 */
export default class ItemDirectory<TDocument extends Item<null> = Item<null>> extends DocumentDirectory<TDocument> {
    static override DEFAULT_OPTIONS: DeepPartial<DocumentDirectoryConfiguration>;

    static override tabName: "item";

    /* -------------------------------------------- */
    /*  Rendering                                   */
    /* -------------------------------------------- */

    protected override _getEntryContextOptions(): ContextMenuEntry[];

    /* -------------------------------------------- */
    /*  Drag & Drop                                 */
    /* -------------------------------------------- */

    protected override _canDragStart(): boolean;
}
