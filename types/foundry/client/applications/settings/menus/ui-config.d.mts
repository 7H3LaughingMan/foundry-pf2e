import { SchemaField } from "./../../../../common/data/fields.mjs";
import {
    ApplicationClosingOptions,
    ApplicationConfiguration,
    ApplicationRenderContext,
} from "./../../../applications/_types.mjs";
import ApplicationV2 from "./../../../applications/api/application.mjs";
import HandlebarsApplicationMixin, {
    HandlebarsRenderOptions,
    HandlebarsTemplatePart,
} from "./../../../applications/api/handlebars-application.mjs";

export interface GameUIConfiguration {
    uiScale: number;
    fontScale: number;
    colorScheme: {
        applications: "" | "dark" | "light";
        interface: "" | "dark" | "light";
    };
    chatNotifications: "cards" | "pip";
    fade: {
        opacity: number;
        speed: number;
    };
}

/**
 * A submenu that provides UI configuration settings.
 */
export default class UIConfig extends HandlebarsApplicationMixin(ApplicationV2) {
    static override DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration>;

    static override PARTS: Record<string, HandlebarsTemplatePart>;

    /**
     * The data schema for the core.uiConfig setting.
     */
    static get schema(): SchemaField;

    protected override _preFirstRender(): Promise<void>;

    protected override _prepareContext(options: HandlebarsRenderOptions): Promise<ApplicationRenderContext>;

    protected override _onClose(options: ApplicationClosingOptions): void;

    protected override _onChangeForm(): void;
}
