import { ActorPF2e, CharacterPF2e, NPCPF2e } from "./../../actor/index.ts";
import { ActorUUID, UserUUID } from "#common/documents/_module.mjs";
import { ItemPF2e, PhysicalItemPF2e } from "./../../item/index.ts";
import { SvelteApplicationMixin, SvelteApplicationRenderContext } from "./../../sheet/mixin.svelte.ts";
import { UserPF2e } from "./../../user/document.ts";
import { localizer } from "./../../../util/index.ts";
import { default as MiniSearch } from "minisearch";
/** An application to facilitate trading between two creature actors */
declare class TradeDialog extends SvelteApplicationMixin(fa.api.ApplicationV2) {
    #private;
    constructor({ self, trader, ...options }: ConstructorParams);
    static DEFAULT_OPTIONS: {
        tag: string;
        id: string;
        window: {
            icon: string;
        };
        position: {
            width: number;
        };
    };
    /** Reusable localization shorthand function */
    static localize: (stringId: string, data?: Record<string, Maybe<string | number | boolean>> | undefined) => string;
    root: import("svelte/legacy").LegacyComponentType;
    $state: TradeDialogState;
    get title(): string;
    /** Can the current user trade utilizing the provided trade-initiation data? */
    static canTrade(
        args: MaybeTradeInitiationData,
        {
            checkReach,
        }?: {
            checkReach?: boolean | undefined;
        },
    ): args is TradeRequestData;
    /** Request a trade via user query. */
    static requestTrade({ self, trader }: TradeRequestData): Promise<void>;
    _prepareContext(options: fa.ApplicationRenderOptions): Promise<TradeDialogRenderContext>;
    abortTrade(message: string): Promise<this>;
    close(options?: TradeDialogClosingOptions): Promise<this>;
    static handleQuery: (data: TradeQueryData) => Promise<TradeQueryResponse>;
}
type TradeActor = CharacterPF2e | NPCPF2e;
interface MaybeValidConstructorParams extends DeepPartial<fa.ApplicationConfiguration> {
    self: {
        actor: ActorPF2e | null;
        item?: PhysicalItemPF2e | null;
        gift?: number;
    };
    trader: {
        user: User | null;
        actor: ActorPF2e | null;
        item?: PhysicalItemPF2e | null;
        gift?: number;
    };
}
interface ConstructorParams extends MaybeValidConstructorParams {
    self: {
        actor: TradeActor;
        initiator?: boolean;
        item?: PhysicalItemPF2e<TradeActor> | null;
        gift?: number;
    };
    trader: {
        user: UserPF2e;
        actor: TradeActor;
        item?: PhysicalItemPF2e<TradeActor> | null;
        gift?: number;
    };
}
interface TradeItemData extends Pick<PhysicalItemPF2e, "id" | "name" | "img" | "quantity"> {
    readonly visible: boolean;
    marked: number;
    matchScore: number;
}
interface MaybeTradeInitiationData {
    self: {
        actor?: ActorPF2e | null;
        item?: ItemPF2e | null;
        gift?: boolean;
    };
    trader: {
        actor?: ActorPF2e | null;
        user?: UserPF2e;
    };
}
interface TradeRequestData extends MaybeTradeInitiationData {
    self: {
        actor: TradeActor;
        item?: PhysicalItemPF2e<TradeActor>;
        gift?: boolean;
    };
    trader: {
        actor: TradeActor;
        user: UserPF2e;
    };
}
interface TradeDialogState {
    self: {
        actor: Pick<ActorPF2e, "id" | "name" | "img">;
        items: TradeItemData[];
        accepted: boolean;
    };
    trader: {
        actor: Pick<ActorPF2e, "id" | "name" | "img">;
        items: TradeItemData[];
        accepted: boolean;
    };
}
interface TradeDialogRenderContext extends SvelteApplicationRenderContext {
    foundryApp: TradeDialog;
    state: TradeDialogState;
    traderUser: UserPF2e;
    searchEngine: MiniSearch;
    localize: ReturnType<typeof localizer>;
}
interface QueryResponseOK {
    ok: true;
}
interface QueryResponseNotOK {
    ok: false;
    message: string;
}
type TradeQueryResponse = QueryResponseOK | QueryResponseNotOK;
interface RequestQueryData {
    action: "request";
    initiator: {
        user: UserUUID;
        actor: ActorUUID;
        item?: string | null;
        gift?: number;
    };
    target: {
        actor: ActorUUID;
    };
}
interface UpdateQueryData {
    action: "update";
    marked?: Record<string, number>;
    accepted?: boolean;
}
interface AbortQueryData {
    action: "abort";
    message?: string;
}
type TradeQueryData = RequestQueryData | UpdateQueryData | AbortQueryData;
interface TradeDialogClosingOptions extends fa.ApplicationClosingOptions {
    aborted?: boolean;
    success?: boolean;
}
export { TradeDialog };
export type { TradeDialogRenderContext, TradeItemData, TradeQueryData, TradeQueryResponse, TradeRequestData };
