import { BaseCreatureSource, CreatureAttributes, CreatureDetails, CreatureLanguagesData, CreaturePerceptionData, CreatureResources, CreatureSaves, CreatureTraitsData, SkillData } from '../creature/data.ts';
import { ActorSystemModel, ActorSystemSchema } from '../data/model.ts';
import { ModifierPF2e } from '../modifiers.ts';
import { AttributeString } from '../types.ts';
import { StatisticTraceData } from '../../system/statistic/data.ts';
import { ModelPropFromDataField, SourcePropFromDataField } from '../../../../foundry/common/data/fields.ts';
import { FamiliarPF2e } from './document.ts';
import fields = foundry.data.fields;
type FamiliarSource = BaseCreatureSource<"familiar", FamiliarSystemSource>;
declare class FamiliarSystemData extends ActorSystemModel<FamiliarPF2e, FamiliarSystemSchema> {
    traits: CreatureTraitsData;
    perception: CreaturePerceptionData;
    saves: CreatureSaves;
    skills: Record<string, SkillData>;
    attack: StatisticTraceData;
    resources: CreatureResources;
    static defineSchema(): FamiliarSystemSchema;
}
interface FamiliarSystemData extends foundry.abstract.TypeDataModel<FamiliarPF2e, FamiliarSystemSchema>, ModelPropsFromSchema<FamiliarSystemSchema> {
    attributes: CreatureAttributes;
    details: FamiliarDetails;
    customModifiers: Record<string, ModifierPF2e[]>;
}
type FamiliarSystemSchema = ActorSystemSchema & {
    master: fields.SchemaField<{
        id: fields.ForeignDocumentField<string, true, true, true>;
        ability: fields.StringField<AttributeString, AttributeString, true, true, true>;
    }>;
    attributes: fields.SchemaField<{
        hp: fields.SchemaField<{
            value: fields.NumberField<number, number, true, false, true>;
            temp: fields.NumberField<number, number, true, false, true>;
        }>;
    }>;
    details: fields.SchemaField<{
        creature: fields.SchemaField<{
            value: fields.StringField<string, string, true, false, true>;
        }>;
    }>;
};
interface FamiliarSystemSource extends SourceFromSchema<FamiliarSystemSchema> {
    attributes: FamiliarAttributesSource;
    details: FamiliarDetailsSource;
    customModifiers?: never;
    perception?: never;
    resources?: never;
    saves?: never;
    skills?: never;
    traits?: never;
    /** Legacy location of `MigrationRecord` */
    schema?: object;
}
interface FamiliarAttributesSource extends SourcePropFromDataField<FamiliarSystemSchema["attributes"]> {
    immunities?: never;
    weaknesses?: never;
    resistances?: never;
}
interface FamiliarDetailsSource extends SourcePropFromDataField<FamiliarSystemSchema["details"]> {
    alliance?: never;
    languages?: never;
    level?: never;
}
interface FamiliarDetails extends ModelPropFromDataField<FamiliarSystemSchema["details"]>, CreatureDetails {
    languages: CreatureLanguagesData;
}
export { FamiliarSystemData };
export type { FamiliarSource, FamiliarSystemSource };
