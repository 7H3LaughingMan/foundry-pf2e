import { EquippedData } from "./data.ts";
interface HeldUsage {
    value: string;
    type: "held";
    where?: never;
    hands: 1 | 2;
}
interface WornUsage {
    value: string;
    type: "worn";
    where?: string | null;
    hands?: 0;
}
interface AttachedUsage {
    value: string;
    type: "attached";
    where: string;
    hands?: 0;
}
interface InstalledUsage {
    value: string;
    type: "installed";
    where: string;
    hands?: 0;
}
interface CarriedUsage {
    value: "carried";
    type: "carried";
    where?: never;
    hands?: 0;
}
interface ImplantedUsage {
    value: string;
    type: "implanted";
    where?: never;
    hands?: 0;
}
type UsageDetails = HeldUsage | WornUsage | AttachedUsage | InstalledUsage | CarriedUsage | ImplantedUsage;
type UsageType = UsageDetails["type"];
declare function isEquipped(usage: UsageDetails, equipped: EquippedData): boolean;
declare function getUsageDetails(usage: string): UsageDetails;
export { getUsageDetails, isEquipped };
export type { CarriedUsage, HeldUsage, UsageDetails, UsageType, WornUsage };
