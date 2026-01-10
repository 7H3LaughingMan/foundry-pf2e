import { RegionEventType } from "#client/data/region-behaviors/base.mjs";
import { ModelPropsFromSchema, SetField, SourceFromSchema, StringField } from "#common/data/fields.mjs";
import { RegionBehaviorPF2e } from "./document.ts";
import { RegionEventPF2e } from "./types.ts";
declare class EnvironmentBehaviorType extends foundry.data.regionBehaviors.RegionBehaviorType<
    EnvironmentTypeSchema,
    RegionBehaviorPF2e | null
> {
    events: Set<RegionEventType>;
    static defineSchema(): EnvironmentTypeSchema;
    protected _handleRegionEvent(event: RegionEventPF2e): Promise<void>;
}
interface EnvironmentBehaviorType
    extends
        foundry.data.regionBehaviors.RegionBehaviorType<EnvironmentTypeSchema, RegionBehaviorPF2e | null>,
        ModelPropsFromSchema<EnvironmentTypeSchema> {}
type EnvironmentTypeSchema = {
    environmentTypes: SetField<StringField<string, string, true>>;
    mode: StringField<"add" | "remove" | "override", "add" | "remove" | "override", true>;
};
type EnvironmentTypeData = ModelPropsFromSchema<EnvironmentTypeSchema>;
type EnvironmentTypeSource = SourceFromSchema<EnvironmentTypeSchema>;
export { EnvironmentBehaviorType };
export type { EnvironmentTypeData, EnvironmentTypeSource };
