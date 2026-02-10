import { AELikeChangeMode } from "../ae-like.ts";
import { RuleElement } from "../base.ts";
import { ResolvableValueField } from "../data.ts";
import { ActorPF2e } from "./../../../actor/index.ts";
import { ItemSourcePF2e } from "./../../../item/base/data/index.ts";
import { ItemPF2e } from "./../../../item/index.ts";
import { ITEM_ALTERATION_HANDLERS } from "./handlers.ts";
import fields = foundry.data.fields;
declare class ItemAlteration extends foundry.abstract.DataModel<RuleElement, ItemAlterationSchema> {
    static defineSchema(): ItemAlterationSchema;
    get rule(): RuleElement;
    get actor(): ActorPF2e;
    /**
     * Apply this alteration to an item (or source)
     * @param item The item to be altered
     */
    applyTo(item: ItemPF2e<ActorPF2e> | ItemSourcePF2e): void;
}
interface ItemAlteration extends foundry.abstract.DataModel<RuleElement, ItemAlterationSchema>, fields.ModelPropsFromSchema<ItemAlterationSchema> {}
type ItemAlterationSchema = {
    mode: fields.StringField<AELikeChangeMode, AELikeChangeMode, true, false, false>;
    property: fields.StringField<ItemAlterationProperty, ItemAlterationProperty, true, false, false>;
    value: ResolvableValueField<true, true, false>;
    /** Whether this alteration comes from equipment or an equipment effect */
    fromEquipment: fields.BooleanField;
};
type ItemAlterationProperty = keyof typeof ITEM_ALTERATION_HANDLERS;
export { ItemAlteration };
export type { ItemAlterationProperty, ItemAlterationSchema };
