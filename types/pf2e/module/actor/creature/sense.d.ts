import { DataModelConstructionContext } from "#common/abstract/_module.mjs";
import { ActorPF2e } from "./../index.ts";
import { SenseData } from "./data.ts";
import { SenseAcuity, SenseType } from "./index.ts";
import fields = foundry.data.fields;
declare class Sense extends foundry.abstract.DataModel<ActorPF2e, SenseSchema> {
    constructor(data: SenseConstructorParams, options: DataModelConstructionContext<ActorPF2e>);
    static defineSchema(): SenseSchema;
    /** The localized label of the sense */
    get label(): string | null;
    /** Whether to emphasize the label when displayed on actor sheets */
    get emphasizeLabel(): boolean;
    isMoreAcuteThan(sense: { acuity: SenseAcuity }): boolean;
    toObject(source?: true): this["_source"];
    toObject(source: false): LabeledSenseData<this>;
    toObject(source?: boolean): this["_source"] | LabeledSenseData;
}
interface Sense extends foundry.abstract.DataModel<ActorPF2e, SenseSchema>, fields.ModelPropsFromSchema<SenseSchema> {
    range: number;
}
type SenseConstructorParams = Partial<Omit<SenseData, "range" | "type">> & {
    type: SenseType;
    range?: number | null;
};
type SenseSchema = {
    type: fields.StringField<SenseType, SenseType, true, false, false>;
    acuity: fields.StringField<SenseAcuity, SenseAcuity, true, false, true>;
    range: fields.NumberField<number, number, true, true, true>;
    source: fields.StringField<string, string, false, true, true>;
};
type LabeledSenseData<TModel extends Sense = Sense> = TModel["_source"] & {
    range: number;
    label: string | null;
    emphasizeLabel: boolean;
};
export { Sense, type LabeledSenseData };
