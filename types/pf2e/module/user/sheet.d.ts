import { UserPF2e } from "./document.ts";
/** Player-specific settings, stored as flags on each User */
declare class UserConfigPF2e extends fa.sheets.UserConfig<UserPF2e> {
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    static PARTS: {
        tabs: {
            template: string;
        };
        main: {
            template: string;
        };
    };
    static TABS: Record<string, fa.ApplicationTabsConfiguration>;
    _prepareContext(options: fa.api.DocumentSheetRenderOptions): Promise<UserConfigRenderContextPF2e>;
}
interface UserConfigRenderContextPF2e extends fa.sheets.UserConfigRenderContext<UserPF2e> {
    tabs: Record<string, fa.ApplicationTab>;
    activeTab: string;
}
export { UserConfigPF2e };
