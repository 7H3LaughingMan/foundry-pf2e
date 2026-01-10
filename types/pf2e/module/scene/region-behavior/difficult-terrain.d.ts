import { ModifyMovementCostBehaviorSchema } from "#client/data/region-behaviors/increase-movement-cost.mjs";
import regionBehaviors = foundry.data.regionBehaviors;
export declare class DifficultTerrainBehaviorType extends regionBehaviors.ModifyMovementCostRegionBehaviorType {
    /** Clamp values to between 1 (normal terrain) and 3 (greater difficult terrain). */
    static defineSchema(): ModifyMovementCostBehaviorSchema;
    /** Ensure difficulty values are among valid choices in case of creation before assumption of system ownership.  */
    static migrateData(source: Record<string, unknown>): Record<string, unknown>;
}
