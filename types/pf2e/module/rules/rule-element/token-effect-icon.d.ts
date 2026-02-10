import { RuleElement } from "./base.ts";
import { ModelPropsFromRESchema, RuleElementSchema } from "./data.ts";
import fields = foundry.data.fields;
/**
 * Add an effect icon to an actor's token
 * @category RuleElement
 */
declare class TokenEffectIconRuleElement extends RuleElement<TokenEffectIconSchema> {
    static defineSchema(): TokenEffectIconSchema;
    afterPrepareData(): void;
}
interface TokenEffectIconRuleElement extends RuleElement<TokenEffectIconSchema>, ModelPropsFromRESchema<TokenEffectIconSchema> {}
type TokenEffectIconSchema = RuleElementSchema & {
    value: fields.StringField<string, string, false, false, false>;
};
export { TokenEffectIconRuleElement };
