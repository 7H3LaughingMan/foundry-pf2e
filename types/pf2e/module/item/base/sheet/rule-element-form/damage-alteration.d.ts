import { DamageAlterationRuleElement, DamageAlterationSource } from "./../../../../rules/rule-element/damage-alteration/rule-element.ts";
import { RuleElementForm, RuleElementFormSheetData } from "./base.ts";
/** Form handler for the DamageAlteration rule element */
export declare class DamageAlterationForm extends RuleElementForm<DamageAlterationSource, DamageAlterationRuleElement> {
    getData(): Promise<RuleElementFormSheetData<DamageAlterationSource, DamageAlterationRuleElement>>;
}
