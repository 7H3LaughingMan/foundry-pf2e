import { RuleElement, RuleElementOptions } from "../base.ts";
import { ModelPropsFromRESchema, RuleElementSchema, RuleElementSource } from "../data.ts";
import { ActorPF2e } from "./../../../actor/index.ts";
import { ItemPF2e } from "./../../../item/index.ts";
import { ItemType } from "./../../../item/types.ts";
import { ItemAlterationSchema } from "./alteration.ts";
import fields = foundry.data.fields;
declare class ItemAlterationRuleElement extends RuleElement<ItemAlterationRuleSchema> {
    #private;
    constructor(data: RuleElementSource, options: RuleElementOptions);
    static defineSchema(): ItemAlterationRuleSchema;
    static validateJoint(data: fields.SourceFromSchema<ItemAlterationRuleSchema>): void;
    /** If this item alteration is lazy and should be applied only when requested */
    get isLazy(): boolean;
    preCreate({ tempItems }: RuleElement.PreCreateParams): Promise<void>;
    onApplyActiveEffects(): void;
    afterPrepareData(): void;
    applyAlteration({ singleItem, additionalItems }?: ApplyAlterationOptions): void;
}
interface ItemAlterationRuleElement
    extends RuleElement<ItemAlterationRuleSchema>, ModelPropsFromRESchema<ItemAlterationRuleSchema> {
    constructor: typeof ItemAlterationRuleElement;
}
type ItemAlterationRuleSchema = RuleElementSchema &
    ItemAlterationSchema & {
        /** The type of items to alter */
        itemType: fields.StringField<ItemType, ItemType, false, false, false>;
        /** As an alternative to specifying item types, an exact item ID can be provided */
        itemId: fields.StringField<string, string, false, false, false>;
        /** Whether this rule element is compatible with battle forms */
        battleForm: fields.BooleanField;
    };
interface ApplyAlterationOptions {
    /** A single item to on which to run alterations instead of all qualifying items owned by the actor */
    singleItem?: ItemPF2e<ActorPF2e> | null;
    additionalItems?: ItemPF2e<ActorPF2e>[];
}
export { ItemAlterationRuleElement };
