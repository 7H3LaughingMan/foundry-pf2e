import { ActorSourcePF2e } from "types/pf2e/module/actor/data/index.ts";
import { ItemSourcePF2e } from "types/pf2e/module/item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Record the level each feat is taken by PCs. */
export declare class Migration876FeatLevelTaken extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e, actorSource?: ActorSourcePF2e): Promise<void>;
}
