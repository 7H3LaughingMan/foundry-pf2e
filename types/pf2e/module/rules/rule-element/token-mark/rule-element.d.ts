import { RuleElement } from "../base.ts";
import { ModelPropsFromRESchema, RuleElementSchema } from "../data.ts";
import { SlugField } from "./../../../system/schema-data-fields.ts";
import fields = foundry.data.fields;
/** Remember a token for later referencing */
declare class TokenMarkRuleElement extends RuleElement<TokenMarkSchema> {
    #private;
    static autogenForms: boolean;
    static defineSchema(): TokenMarkSchema;
    static LOCALIZATION_PREFIXES: string[];
    preCreate({ ruleSource, itemSource, pendingItems }: RuleElement.PreCreateParams): Promise<void>;
    beforePrepareData(): void;
}
type TokenMarkSchema = Omit<RuleElementSchema, "slug"> & {
    slug: SlugField<true, false, false>;
    uuid: fields.StringField<string, string, false, true, true>;
};
interface TokenMarkRuleElement extends RuleElement<TokenMarkSchema>, ModelPropsFromRESchema<TokenMarkSchema> {
    slug: string;
}
export { TokenMarkRuleElement };
