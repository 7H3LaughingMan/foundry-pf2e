import { ApplicationConfiguration, FormFooterButton } from "#client/applications/_module.mjs";
import fields = foundry.data.fields;
interface SettingsContext extends fa.ApplicationRenderContext {
    rootId: string;
    fields: WorldClockSettingSchema;
    settings: WorldClockSettingData;
    dateThemes: Record<string, string>;
    timeConventions: Record<12 | 24, string>;
    buttons: FormFooterButton[];
}
type WorldClockSettingSchema = {
    dateTheme: fields.StringField<"AR" | "IC" | "AD" | "CE", "AR" | "IC" | "AD" | "CE", true, false, true>;
    playersCanView: fields.BooleanField;
    showClockButton: fields.BooleanField;
    syncDarkness: fields.BooleanField;
    timeConvention: fields.NumberField<12 | 24, 12 | 24, true, false, true>;
    worldCreatedOn: fields.StringField<string, string, true, true, true>;
};
export interface WorldClockSettingData extends fields.SourceFromSchema<WorldClockSettingSchema> {}
export declare class WorldClockSettings extends fa.api.HandlebarsApplicationMixin(fa.api.ApplicationV2) {
    #private;
    constructor(options?: DeepPartial<ApplicationConfiguration>);
    static DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration>;
    static PARTS: Record<string, fa.api.HandlebarsTemplatePart>;
    /** Register World Clock settings and this menu. */
    static register(): void;
    static localizeSchema(): void;
    _prepareContext(): Promise<SettingsContext>;
}
export {};
