import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const AMMO_STACK_GROUPS: Set<"arrows" | "bolts" | "rounds5" | "rounds10" | "slingBullets" | "blowgunDarts" | "woodenTaws" | "sprayPellets">;
/** Limit `stackGroup` property to consumables and treasure */
export declare class Migration906LimitStackGroup extends MigrationBase {
    static version: number;
    updateItem(source: MaybeWithToBeDeletedStackGroup): Promise<void>;
}
type MaybeWithToBeDeletedStackGroup = ItemSourcePF2e & {
    system: {
        stackGroup?: SetElement<typeof AMMO_STACK_GROUPS> | "coins" | "gems" | null;
        "-=stackGroup"?: null;
    };
};
export {};
