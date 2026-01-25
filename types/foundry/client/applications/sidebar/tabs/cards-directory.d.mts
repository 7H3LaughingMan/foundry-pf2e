import DocumentDirectory from "../document-directory.mjs";
import { ApplicationConfiguration } from "./../../../applications/_types.mjs";
import { ContextMenuEntry } from "./../../../applications/ux/context-menu.mjs";
import Cards from "./../../../documents/cards.mjs";

/**
 * The World Cards directory listing.
 */
export default class CardsDirectory extends DocumentDirectory<Cards> {
    static override DEFAULT_OPTIONS: Partial<ApplicationConfiguration>;

    static override tabName: "cards";

    /* -------------------------------------------- */
    /*  Rendering                                   */
    /* -------------------------------------------- */

    protected override _getEntryContextOptions(): ContextMenuEntry[];
}
