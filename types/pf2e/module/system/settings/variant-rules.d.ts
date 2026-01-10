import { SettingRegistration } from "#client/helpers/client-settings.mjs";
import fields = foundry.data.fields;
export declare class VariantRulesSettings extends fa.api.HandlebarsApplicationMixin(fa.api.ApplicationV2) {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    static PARTS: Record<string, fa.api.HandlebarsTemplatePart>;
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
