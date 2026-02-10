import { MigrationDataField } from "./../../data.ts";
import { AutoChangeEntry } from "./../../rules/rule-element/ae-like.ts";
import { ActorPF2e } from "./../index.ts";
import fields = foundry.data.fields;
declare abstract class ActorSystemModel<TParent extends ActorPF2e, TSchema extends ActorSystemSchema> extends foundry.abstract.TypeDataModel<TParent, TSchema> {
    autoChanges: Record<string, AutoChangeEntry[] | undefined>;
    static defineSchema(): ActorSystemSchema;
}
type ActorSystemSchema = {
    _migration: MigrationDataField;
};
/** Schema definition for actor hit points, though not all actors have hit points */
type ActorHitPointsSchema = {
    value: fields.NumberField<number, number, true, false, true>;
    max: fields.NumberField<number, number, true, false, true>;
    temp: fields.NumberField<number, number, true, false, true>;
    details: fields.StringField<string, string, true, false, true>;
};
export { ActorSystemModel };
export type { ActorHitPointsSchema, ActorSystemSchema };
