import { EnrichmentOptions } from "#client/applications/ux/text-editor.mjs";
import { ActorPF2e } from "./../../actor/index.ts";
import { RawItemChatData } from "./../base/data/index.ts";
import { PhysicalItemPF2e } from "./../physical/index.ts";
import { Currency } from "./../physical/types.ts";
import { TreasureSource, TreasureSystemData } from "./data.ts";
declare class TreasurePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    /** Returns true if this is a PF2e coin type */
    get isCoinage(): boolean;
    /** Returns true if this is anything usable as money, including coins and credsticks */
    get isCurrency(): boolean;
    /** Returns the unit of money if there is one, otherwise null.  */
    get unit(): Currency | null;
    prepareBaseData(): void;
    getChatData(this: TreasurePF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions): Promise<RawItemChatData>;
    protected _preUpdate(
        changed: DeepPartial<this["_source"]>,
        operation: foundry.abstract.DatabaseUpdateCallbackOptions & {
            checkHP?: boolean;
        },
        user: fd.BaseUser,
    ): Promise<boolean | void>;
}
interface TreasurePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: TreasureSource;
    system: TreasureSystemData;
}
export { TreasurePF2e };
