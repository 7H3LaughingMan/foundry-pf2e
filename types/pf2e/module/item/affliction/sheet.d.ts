import { ItemUUID } from "#client/documents/_module.mjs";
import { DamageCategoryUnique } from "./../../system/damage/types.ts";
import { ItemSheetDataPF2e, ItemSheetOptions, ItemSheetPF2e } from "./../base/sheet/sheet.ts";
import { AfflictionPF2e, ConditionPF2e } from "./../index.ts";
import { AfflictionConditionData, AfflictionStageData } from "./data.ts";
declare class AfflictionSheetPF2e extends ItemSheetPF2e<AfflictionPF2e> {
    #private;
    static get defaultOptions(): ItemSheetOptions;
    getData(options?: Partial<ItemSheetOptions>): Promise<AfflictionSheetData>;
    protected prepareStages(): Promise<AfflictionStageSheetData[]>;
    activateListeners($html: JQuery<HTMLElement>): void;
    /** Handle effects being dropped  */
    _onDrop(event: DragEvent): Promise<void>;
    /** Ensure stage updates during submit deep merge. We don't have to convert to arrays, data models handle that */
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface AfflictionSheetData extends ItemSheetDataPF2e<AfflictionPF2e> {
    conditionTypes: Omit<ConfigPF2e["PF2E"]["conditionTypes"], "persistent-damage">;
    damageTypes: ConfigPF2e["PF2E"]["damageTypes"];
    damageCategories: Pick<ConfigPF2e["PF2E"]["damageCategories"], DamageCategoryUnique>;
    durationUnits: Omit<ConfigPF2e["PF2E"]["timeUnits"], "encounter">;
    onsetUnits: Omit<ConfigPF2e["PF2E"]["timeUnits"], "unlimited" | "encounter">;
    saves: ConfigPF2e["PF2E"]["saves"];
    stages: AfflictionStageSheetData[];
    stageOptions: Record<string, string>;
}
interface AfflictionStageSheetData extends AfflictionStageData {
    stage: number;
    conditions: AfflictionConditionSheetData[];
    effects: {
        uuid: ItemUUID;
        img?: string;
        name?: string;
    }[];
}
interface AfflictionConditionSheetData extends AfflictionConditionData {
    document: ConditionPF2e | null;
}
export { AfflictionSheetPF2e };
