import { BasePhysicalItemSource, EquippedData, PhysicalItemTraits, PhysicalSystemData, PhysicalSystemSource } from "../physical/data.ts";
import { CarriedUsage } from "../physical/usage.ts";
type TreasureSource = BasePhysicalItemSource<"treasure", TreasureSystemSource>;
interface TreasureSystemSource extends PhysicalSystemSource {
    traits: PhysicalItemTraits<never>;
    stackGroup: "coins" | "gems" | null;
    apex?: never;
    subitems?: never;
    usage?: never;
}
interface TreasureSystemData extends PhysicalSystemData {
    traits: PhysicalItemTraits<never>;
    equipped: TreasureEquippedData;
    /** Treasure need only be on one's person. */
    usage: CarriedUsage;
    stackGroup: "coins" | "gems" | null;
    apex?: never;
    subitems?: never;
}
interface TreasureEquippedData extends EquippedData {
    invested?: never;
}
export type { TreasureSource, TreasureSystemData, TreasureSystemSource };
