import { ActorPF2e } from "./../actor/index.ts";
import { default as UserTargets } from "#client/canvas/placeables/tokens/targets.mjs";
import { DatabaseUpdateCallbackOptions } from "#common/abstract/_types.mjs";
import { TradeQueryData, TradeQueryResponse } from "./../apps/trade-dialog/app.ts";
import { TokenPF2e } from "./../canvas/index.ts";
import { ScenePF2e, TokenDocumentPF2e } from "./../scene/index.ts";
import { UserFlagsPF2e, UserSettingsPF2e, UserSourcePF2e } from "./data.ts";
declare class UserPF2e extends User {
    prepareData(): void;
    /** Set user settings defaults */
    prepareBaseData(): void;
    get settings(): Readonly<UserSettingsPF2e>;
    /** Get tokens controlled by this user or, failing that, a token of the assigned character. */
    getActiveTokens(): TokenDocumentPF2e[];
    /** Alternative to calling `updateTokenTargets` with no argument or an empty array */
    clearTargets(): void;
    protected _onUpdate(
        changed: DeepPartial<this["_source"]>,
        options: DatabaseUpdateCallbackOptions,
        userId: string,
    ): void;
}
interface UserPF2e extends User {
    character: ActorPF2e<null> | null;
    targets: UserTargets<TokenPF2e<TokenDocumentPF2e<ScenePF2e>>>;
    flags: UserFlagsPF2e;
    readonly _source: UserSourcePF2e;
    query(
        name: "pf2e.trade",
        data: TradeQueryData,
        options?: {
            timeout?: number;
        },
    ): Promise<TradeQueryResponse>;
    query(
        name: string,
        data: object,
        options?: {
            timeout?: number;
        },
    ): Promise<unknown>;
}
export { UserPF2e };
