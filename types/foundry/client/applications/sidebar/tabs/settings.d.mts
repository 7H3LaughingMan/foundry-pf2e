import HandlebarsApplicationMixin, {
    HandlebarsRenderOptions,
    HandlebarsTemplatePart,
} from "../../api/handlebars-application.mjs";
import AbstractSidebarTab from "../sidebar-tab.mjs";
import { ApplicationConfiguration, ApplicationRenderContext } from "./../../../applications/_types.mjs";

/**
 * The sidebar settings tab.
 */
export default class Settings extends HandlebarsApplicationMixin(AbstractSidebarTab) {
    static override DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration>;

    static override tabName: "settings";

    static override PARTS: Record<string, HandlebarsTemplatePart>;

    protected override _prepareContext(options: HandlebarsRenderOptions): Promise<ApplicationRenderContext>;
}
