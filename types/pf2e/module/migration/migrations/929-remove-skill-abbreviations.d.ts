import { SkillSlug } from "types/pf2e/module/actor/types.ts";
import { ItemSourcePF2e } from "types/pf2e/module/item/base/data/index.ts";
import { ChoiceSetSource } from "types/pf2e/module/rules/rule-element/choice-set/data.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration929RemoveSkillAbbreviations extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
export declare function isSizeChoice(rule: ChoiceSetSource): boolean;
export declare function resolveLongForm<T>(value: T): T | SkillSlug;
