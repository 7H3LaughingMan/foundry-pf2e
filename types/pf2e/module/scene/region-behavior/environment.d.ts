import { RegionEventType } from "../../../../foundry/client-esm/data/region-behaviors/base.ts";
import { SetField, StringField } from "../../../../foundry/common/data/fields.ts";
import { RegionBehaviorPF2e } from "./document.ts";
import { RegionEventPF2e } from "./types.ts";
declare class EnvironmentBehaviorType extends foundry.data.regionBehaviors.RegionBehaviorType<EnvironmentTypeSchema, RegionBehaviorPF2e | null> {
    events: Set<RegionEventType>;
    static defineSchema(): EnvironmentTypeSchema;
    protected _handleRegionEvent(event: RegionEventPF2e): Promise<void>;
}
interface EnvironmentBehaviorType extends foundry.data.regionBehaviors.RegionBehaviorType<EnvironmentTypeSchema, RegionBehaviorPF2e | null>, ModelPropsFromSchema<EnvironmentTypeSchema> {
}
type EnvironmentTypeSchema = {
    environmentTypes: SetField<StringField>;
    mode: StringField<"add" | "remove" | "override">;
};
type EnvironmentTypeData = ModelPropsFromSchema<EnvironmentTypeSchema>;
type EnvironmentTypeSource = SourceFromSchema<EnvironmentTypeSchema>;
export { EnvironmentBehaviorType };
export type { EnvironmentTypeData, EnvironmentTypeSource };
