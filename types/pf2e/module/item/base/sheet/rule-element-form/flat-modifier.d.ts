import { ModifierType } from "./../../../../actor/modifiers.ts";
import { FormSelectOption } from "#client/applications/forms/fields.mjs";
import { FlatModifierRuleElement, FlatModifierSource } from "./../../../../rules/rule-element/flat-modifier.ts";
import { DamageCategoryUnique } from "./../../../../system/damage/types.ts";
import { RuleElementForm, RuleElementFormSheetData } from "./base.ts";
/** Form handler for the flat modifier rule element */
declare class FlatModifierForm extends RuleElementForm<FlatModifierSource, FlatModifierRuleElement> {
    template: string;
    get isDamage(): boolean;
    activateListeners(html: HTMLElement): void;
    getData(): Promise<FlatModifierFormSheetData>;
    updateObject(
        formData: {
            key: string;
        } & Partial<FlatModifierSource> &
            Partial<Record<string, JSONValue>>,
    ): void;
}
interface FlatModifierFormSheetData extends RuleElementFormSheetData<FlatModifierSource, FlatModifierRuleElement> {
    abilities: typeof CONFIG.PF2E.abilities;
    types: Record<ModifierType, string>;
    damageCategories: Record<DamageCategoryUnique, string>;
    isDamage: boolean;
    criticalOptions: FormSelectOption[];
}
export { FlatModifierForm };
