import { ActorPF2e } from "./../../actor/index.ts";
import { TokenSource } from "#common/documents/token.mjs";
import { MigrationBase } from "../base.ts";
/**
 * Token dimensions are read from source data as of V13, leaving some tokens that were resized in memory now at the
 * incorrect size.
 */
export declare class Migration939SetTokenDimensions extends MigrationBase {
    static version: number;
    updateToken(source: TokenSource, actor: Readonly<ActorPF2e | null>): Promise<void>;
}
