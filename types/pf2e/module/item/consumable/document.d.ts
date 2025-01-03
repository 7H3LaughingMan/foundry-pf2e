import { ActorPF2e } from "../../actor/index.ts";
import { SpellPF2e, WeaponPF2e, PhysicalItemPF2e } from "../index.ts";
import { RawItemChatData } from "../base/data/index.ts";
import { TrickMagicItemEntry } from "../spellcasting-entry/trick.ts";
import { ValueAndMax } from "../../data.ts";
import { UserPF2e } from "../../user/document.ts";
import { ConsumableSource, ConsumableSystemData } from "./data.ts";
import { ConsumableCategory, ConsumableTrait, OtherConsumableTag } from "./types.ts";

declare class ConsumablePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    static get validTraits(): Record<ConsumableTrait, string>;
    get otherTags(): Set<OtherConsumableTag>;
    get category(): ConsumableCategory;
    get isAmmo(): boolean;
    get uses(): ValueAndMax;
    get embeddedSpell(): SpellPF2e<NonNullable<TParent>> | null;
    prepareBaseData(): void;
    getChatData(this: ConsumablePF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions, rollOptions?: Record<string, unknown>): Promise<RawItemChatData>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    getRollOptions(prefix?: string, options?: {
        includeGranter?: boolean;
    }): string[];
    isAmmoFor(weapon: WeaponPF2e): boolean;
    /** Use a consumable item, sending the result to chat */
    consume(thisMany?: number): Promise<void>;
    castEmbeddedSpell(trickMagicItemData?: TrickMagicItemEntry): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface ConsumablePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: ConsumableSource;
    system: ConsumableSystemData;
}
export { ConsumablePF2e };
