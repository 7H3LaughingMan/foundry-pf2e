import { ActorSourcePF2e } from "types/pf2e/module/actor/data/index.ts";
import { ItemSourcePF2e } from "types/pf2e/module/item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration711HeritageItems extends MigrationBase {
    #private;
    static version: number;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e, actorSource?: ActorSourcePF2e): Promise<void>;
}
