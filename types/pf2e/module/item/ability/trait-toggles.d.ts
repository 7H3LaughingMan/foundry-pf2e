import { ModelPropsFromSchema } from "#common/data/fields.mjs";
import { DamageAlteration } from "./../../rules/rule-element/damage-alteration/alteration.ts";
import { FeatSystemData } from "./../feat/data.ts";
import { AbilityItemPF2e, FeatPF2e } from "./../index.ts";
import { AbilitySystemData } from "./data.ts";
import fields = foundry.data.fields;
/** A helper class to handle toggleable ability traits */
declare class AbilityTraitToggles extends foundry.abstract.DataModel<
    AbilitySystemData | FeatSystemData,
    TraitToggleSchema
> {
    static defineSchema(): TraitToggleSchema;
    /** The grandparent item */
    get item(): AbilityItemPF2e | FeatPF2e;
    /** Get all traits in the grandparent item that can be toggled. */
    get operableTraits(): "mindshift"[];
    prepareData(): void;
    getDamageAlterations(): DamageAlteration[];
    getSheetData(): TraitToggleViewData[];
    update({ trait, selected }: { trait: "mindshift"; selected: boolean }): Promise<boolean>;
}
interface AbilityTraitToggles
    extends
        foundry.abstract.DataModel<AbilitySystemData | FeatSystemData, TraitToggleSchema>,
        ModelPropsFromSchema<TraitToggleSchema> {}
type TraitToggleSchema = {
    mindshift: fields.SchemaField<
        {
            selected: fields.BooleanField;
        },
        {
            selected: boolean;
        },
        {
            selected: boolean;
        },
        false,
        true,
        false
    >;
};
interface TraitToggleViewData {
    trait: string;
    selected: boolean;
    icon: string;
    classes: string;
    tooltip: string;
}
export { AbilityTraitToggles, type TraitToggleViewData };
