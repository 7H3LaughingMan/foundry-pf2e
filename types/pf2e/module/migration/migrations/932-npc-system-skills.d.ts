import { ActorSourcePF2e } from "types/pf2e/module/actor/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration932NPCSystemSkills extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
