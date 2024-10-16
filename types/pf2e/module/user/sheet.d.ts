import { UserPF2e } from './document.ts';
/** Player-specific settings, stored as flags on each User */
export declare class UserConfigPF2e<TUser extends UserPF2e> extends foundry.applications.sheets.UserConfig<TUser> {
    #private;
    static PARTS: {
        tabs: {
            template: string;
        };
        main: {
            template: string;
        };
    };
    tabGroups: {
        primary: string;
    };
    _prepareContext(options: DocumentSheetRenderOptions): Promise<UserConfigDataPF2e<TUser>>;
}
interface UserConfigDataPF2e<TUser extends UserPF2e> extends UserConfigData<TUser> {
    tabs: Partial<ApplicationTab>[];
    tabGroups: Record<string, string>;
}
export {};
