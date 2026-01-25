import { ABCSheetData, ABCSheetPF2e } from "../abc/sheet.ts";
import { SheetOptions } from "./../../sheet/helpers.ts";
import { ItemSheetOptions } from "./../base/sheet/sheet.ts";
import { ClassPF2e } from "./../class/document.ts";
export declare class ClassSheetPF2e extends ABCSheetPF2e<ClassPF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<ClassSheetData>;
}
interface ClassSheetData extends ABCSheetData<ClassPF2e> {
    proficiencyChoices: Record<number, string>;
    selectedKeyAbility: Record<string, string>;
    trainedSkills: SheetOptions;
    ancestryFeatLevels: SheetOptions;
    classFeatLevels: SheetOptions;
    generalFeatLevels: SheetOptions;
    skillFeatLevels: SheetOptions;
    skillIncreaseLevels: SheetOptions;
}
export {};
