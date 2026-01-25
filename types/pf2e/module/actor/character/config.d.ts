import { DocumentSheetV1Options } from "#client/appv1/api/document-sheet-v1.mjs";
import { CreatureConfig, CreatureConfigData } from "./../creature/config.ts";
import { CharacterPF2e } from "./document.ts";
export declare class CharacterConfig extends CreatureConfig<CharacterPF2e> {
    getData(options?: Partial<DocumentSheetV1Options>): Promise<PCConfigData>;
}
interface PCConfigData extends CreatureConfigData<CharacterPF2e> {
    showBasicUnarmed: boolean;
}
export {};
