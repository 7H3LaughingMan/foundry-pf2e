import { ActorType, CharacterPF2e, NPCPF2e } from "./../../actor/index.ts";
import { RuleElement } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema } from "./data.ts";
/**
 * @category RuleElement
 */
declare class DexterityModifierCapRuleElement extends RuleElement<DexterityModifierCapRuleSchema> {
    protected static validActorTypes: ActorType[];
    static autogenForms: boolean;
    static defineSchema(): DexterityModifierCapRuleSchema;
    beforePrepareData(): void;
}
interface DexterityModifierCapRuleElement extends RuleElement<DexterityModifierCapRuleSchema>, ModelPropsFromRESchema<DexterityModifierCapRuleSchema> {
    get actor(): CharacterPF2e | NPCPF2e;
}
type DexterityModifierCapRuleSchema = RuleElementSchema & {
    value: ResolvableValueField<true, false, false>;
};
export { DexterityModifierCapRuleElement };
