import { MigrationBase } from "../base.ts";
import { ActorSourcePF2e } from "./../../actor/data/index.ts";
/** Move tracking of roll-option toggles to the rules themselves */
export declare class Migration743FixWeaknessStructure extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
