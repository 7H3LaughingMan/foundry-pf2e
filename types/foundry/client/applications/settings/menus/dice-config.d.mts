import { ApplicationConfiguration, ApplicationRenderContext } from "./../../../applications/_types.mjs";
import ApplicationV2 from "./../../../applications/api/application.mjs";
import HandlebarsApplicationMixin, { HandlebarsTemplatePart } from "./../../../applications/api/handlebars-application.mjs";

/**
 * The application responsible for configuring methods of DiceTerm resolution.
 */
export default class DiceConfig extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration>;

    static override PARTS: Record<string, HandlebarsTemplatePart>;

    /**
     * Register setting and menu.
     */
    static registerSetting(): void;

    /* -------------------------------------------- */
    /*  Application                                 */
    /* -------------------------------------------- */

    override _prepareContext(): Promise<ApplicationRenderContext>;
}
