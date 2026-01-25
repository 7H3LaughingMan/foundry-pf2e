import DocumentDirectory from "../document-directory.mjs";
import { ApplicationConfiguration } from "./../../../applications/_types.mjs";
import { HandlebarsRenderOptions } from "./../../../applications/api/handlebars-application.mjs";
import { ContextMenuEntry } from "./../../../applications/ux/context-menu.mjs";
import Scene from "./../../../documents/scene.mjs";

/**
 * The World Scene directory listing.
 */
export default class SceneDirectory extends DocumentDirectory<Scene> {
    static override DEFAULT_OPTIONS: Partial<ApplicationConfiguration>;

    static override tabName: "scenes";

    protected static override _entryPartial: string;

    /* -------------------------------------------- */
    /*  Rendering                                   */
    /* -------------------------------------------- */

    protected override _canRender(options: HandlebarsRenderOptions): false | void;

    protected override _getEntryContextOptions(): ContextMenuEntry[];

    protected override _getFolderContextOptions(): ContextMenuEntry[];
}
