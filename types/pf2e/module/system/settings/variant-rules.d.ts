import { ApplicationConfiguration } from "#client/applications/_types.mjs";
import { SettingRegistration } from "#client/helpers/client-settings.mjs";
import fields = foundry.data.fields;
export class VariantRulesSettings extends fa.api.HandlebarsApplicationMixin(fa.api.ApplicationV2) {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration>;
    static PARTS: {
        settings: {
            template: string;
        };
        footer: {
            template: string;
        };
    };
    static register(): void;
    protected _prepareContext(options: fa.ApplicationRenderOptions): Promise<VariantRulesSettingsContext>;
    protected _onChangeForm(_formConfig: fa.ApplicationFormConfiguration, event: Event): void;
}
interface VariantRulesSettingsContext extends fa.ApplicationRenderContext {
    settings: Record<string, SettingRenderData>;
    buttons: fa.FormFooterButton[];
    rootId: string;
}
interface SettingRenderData extends Omit<SettingRegistration, "name" | "type"> {
    type: fields.DataField;
    value: unknown;
    pwolModifier: boolean;
}
export {};
