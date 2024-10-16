import type { ActorPF2e } from "types/pf2e/module/actor/index.ts";
import type { ActorSourcePF2e } from "types/pf2e/module/actor/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration866LinkToActorSizeAgain extends MigrationBase {
    static version: number;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateToken(tokenSource: foundry.documents.TokenSource, actor: ActorPF2e | null): Promise<void>;
}
