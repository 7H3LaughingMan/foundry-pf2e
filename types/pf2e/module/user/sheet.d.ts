import { ApplicationTab } from "../../../foundry/client-esm/applications/_types.js";
import { DocumentSheetRenderOptions } from "../../../foundry/client-esm/applications/api/document-sheet.ts";
import { UserConfigData } from "../../../foundry/client-esm/applications/sheets/user-config.js";
import { UserPF2e } from "./document.ts";

/** Player-specific settings, stored as flags on each User */
declare class UserConfigPF2e extends foundry.applications.sheets.UserConfig<UserPF2e> {
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
    _prepareContext(options: DocumentSheetRenderOptions): Promise<UserConfigDataPF2e>;
}
interface UserConfigDataPF2e extends UserConfigData<UserPF2e> {
    tabs: Partial<ApplicationTab>[];
    tabGroups: Record<string, string>;
}
export { UserConfigPF2e };
