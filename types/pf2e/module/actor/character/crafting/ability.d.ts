import { CharacterPF2e } from '../../index.ts';
import { ResourceData } from '../../creature/index.ts';
import { PhysicalItemPF2e } from '../../../item/index.ts';
import { Predicate, RawPredicate } from '../../../system/predication.ts';
import { CraftingFormula, PreparedFormula, PreparedFormulaData } from './types.ts';
declare class CraftingAbility implements CraftingAbilityData {
    #private;
    /** A label for this crafting entry to display on sheets */
    label: string;
    slug: string;
    resource: string | null;
    /** This crafting ability's parent actor */
    actor: CharacterPF2e;
    preparedFormulaData: PreparedFormulaData[];
    isAlchemical: boolean;
    isDailyPrep: boolean;
    isPrepared: boolean;
    maxSlots: number;
    fieldDiscovery: Predicate | null;
    fieldDiscoveryBatchSize: number;
    batchSize: number;
    maxItemLevel: number;
    /** All craftable item definitions, sorted from biggest batch to smallest batch size */
    craftableItems: CraftableItemDefinition[];
    constructor(actor: CharacterPF2e, data: CraftingAbilityData);
    getPreparedCraftingFormulas(): Promise<PreparedFormula[]>;
    getSheetData(): Promise<CraftingAbilitySheetData>;
    calculateResourceCost(): Promise<number>;
    prepareFormula(formula: CraftingFormula): Promise<void>;
    /** Returns true if the item can be created by this ability, which requires it to pass predication and be of sufficient level */
    canCraft(item: PhysicalItemPF2e, { warn }?: {
        warn?: boolean | undefined;
    }): boolean;
    unprepareFormula(index: number): Promise<void>;
    setFormulaQuantity(index: number, value: "increase" | "decrease" | number): Promise<void>;
    toggleFormulaExpended(index: number, value?: boolean): Promise<void>;
    toggleSignatureItem(itemUUID: string): Promise<void>;
    updateFormulas(formulas: PreparedFormulaData[]): Promise<void>;
    craft(itemOrUUIDOrIndex: PhysicalItemPF2e | ItemUUID | number, { consume }?: {
        consume?: boolean;
    }): Promise<PhysicalItemPF2e | null>;
}
interface CraftingAbilityData {
    slug: string;
    resource: string | null;
    label: string;
    isAlchemical: boolean;
    isDailyPrep: boolean;
    isPrepared: boolean;
    maxSlots: number | null;
    craftableItems: CraftableItemDefinition[];
    fieldDiscovery?: RawPredicate | null;
    batchSize: number;
    fieldDiscoveryBatchSize?: number;
    maxItemLevel: number;
    preparedFormulaData: PreparedFormulaData[];
}
interface CraftingAbilitySheetData {
    slug: string;
    label: string;
    isAlchemical: boolean;
    isPrepared: boolean;
    isDailyPrep: boolean;
    maxSlots: number;
    maxItemLevel: number;
    resource: ResourceData | null;
    resourceCost: number;
    remainingSlots: number;
    prepared: PreparedFormula[];
}
interface CraftableItemDefinition {
    predicate: Predicate;
    batchSize?: number;
}
export { CraftingAbility };
export type { CraftingAbilityData, CraftingAbilitySheetData, PreparedFormulaData };
