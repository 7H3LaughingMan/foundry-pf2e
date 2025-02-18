import { MacroSource } from "../../../../foundry/common/documents/macro.ts";
import { MigrationBase } from "../base.ts";

/** Migrate "Take a Breather" macro to use function exposed at `game.pf2e.actions` */
export declare class Migration878TakeABreather extends MigrationBase {
    static version: number;
    updateMacro(source: MacroSource): Promise<void>;
}
