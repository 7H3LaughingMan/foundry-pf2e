import { RuleElement } from "../base.ts";
import { ModelPropsFromRESchema } from "../data.ts";
import { ActorType, CharacterPF2e } from "./../../../actor/index.ts";
import { DamageDicePF2e, Modifier } from "./../../../actor/modifiers.ts";
import { WeaponPF2e } from "./../../../item/index.ts";
import { BattleFormRuleSchema } from "./schema.ts";
declare class BattleFormRuleElement extends RuleElement<BattleFormRuleSchema> {
    #private;
    protected static validActorTypes: ActorType[];
    /** The label given to modifiers of AC, skills, and strikes */
    modifierLabel: string;
    static defineSchema(): BattleFormRuleSchema;
    preCreate({ itemSource, ruleSource }: RuleElement.PreCreateParams): Promise<void>;
    /** Set temporary hit points */
    onCreate(actorUpdates: Record<string, unknown>): void;
    beforePrepareData(): void;
    afterPrepareData(): void;
    /** Remove temporary hit points */
    onDelete(actorUpdates: Record<string, unknown>): void;
    /** Disable ineligible damage adjustments (modifiers, bonuses, additional damage) */
    applyDamageExclusion(weapon: WeaponPF2e, modifiers: (DamageDicePF2e | Modifier)[]): void;
}
interface BattleFormRuleElement extends RuleElement<BattleFormRuleSchema>, ModelPropsFromRESchema<BattleFormRuleSchema> {
    get actor(): CharacterPF2e;
}
export { BattleFormRuleElement };
