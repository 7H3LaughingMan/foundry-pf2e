import { ActorSourcePF2e } from "types/pf2e/module/actor/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Correct a misspelling in the character biography data. */
export declare class Migration863FixMisspelledOrganaizationsProperty extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
