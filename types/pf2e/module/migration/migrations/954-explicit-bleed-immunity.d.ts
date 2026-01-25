import { MigrationBase } from "../base.ts";
import { ActorSourcePF2e } from "./../../actor/data/index.ts";
/** Add explicit bleed immunity to non-vampire undead. */
export declare class Migration954ExplicitBleedImmunity extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
