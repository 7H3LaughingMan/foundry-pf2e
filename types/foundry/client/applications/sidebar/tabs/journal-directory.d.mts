import DocumentDirectory from "../document-directory.mjs";
import { ApplicationConfiguration } from "./../../../applications/_types.mjs";
import { ContextMenuEntry } from "./../../../applications/ux/context-menu.mjs";
import JournalEntry from "./../../../documents/cards.mjs";

/**
 * The World Journal.
 */
export default class JournalDirectory extends DocumentDirectory<JournalEntry> {
    static override DEFAULT_OPTIONS: Partial<ApplicationConfiguration>;

    static override tabName: "journal";

    /* -------------------------------------------- */
    /*  Rendering                                   */
    /* -------------------------------------------- */

    protected override _getEntryContextOptions(): ContextMenuEntry[];
}
