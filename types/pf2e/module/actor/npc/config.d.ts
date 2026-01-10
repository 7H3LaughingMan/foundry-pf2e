import { CreatureConfig, CreatureConfigData } from "./../creature/config.ts";
import { DocumentSheetV1Options } from "#client/appv1/api/document-sheet-v1.mjs";
import { SheetOptions } from "./../../sheet/helpers.ts";
import { NPCPF2e } from "./document.ts";
export declare class NPCConfig extends CreatureConfig<NPCPF2e> {
    getData(options?: Partial<DocumentSheetV1Options>): Promise<NPCConfigData>;
    /** Remove stored properties if they're consistent with defaults; otherwise, store changes */
    _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface NPCConfigData extends CreatureConfigData<NPCPF2e> {
    lootable: SheetOptions;
}
export {};
