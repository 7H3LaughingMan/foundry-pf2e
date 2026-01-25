import DocumentDirectory from "../document-directory.mjs";
import { ApplicationConfiguration } from "./../../../applications/_types.mjs";
import { ContextMenuEntry } from "./../../../applications/ux/context-menu.mjs";
import RollTable from "./../../../documents/roll-table.mjs";

/**
 * The World RollTable directory listing.
 */
export default class RollTableDirectory extends DocumentDirectory<RollTable> {
    static override DEFAULT_OPTIONS: Partial<ApplicationConfiguration>;

    static override tabName: "tables";

    /* -------------------------------------------- */
    /*  Rendering                                   */
    /* -------------------------------------------- */

    protected override _getEntryContextOptions(): ContextMenuEntry[];
}
