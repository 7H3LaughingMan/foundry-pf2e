import { DatabaseUpdateCallbackOptions } from "#common/abstract/_types.mjs";
import { ActorPF2e } from "./../../actor/index.ts";
import { ValueAndMax } from "./../../data.ts";
import { EnrichmentOptionsPF2e } from "./../../system/text-editor.ts";
import { RawItemChatData } from "./../base/data/index.ts";
import { PhysicalItemPF2e, SpellPF2e } from "./../index.ts";
import { TrickMagicItemEntry } from "./../spellcasting-entry/trick.ts";
import { ConsumableSource, ConsumableSystemData } from "./data.ts";
import { ConsumableCategory, ConsumableTrait, OtherConsumableTag } from "./types.ts";
declare class ConsumablePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    /** A cached copy of embeddedSpell, lazily regenerated every data preparation cycle */
    private _embeddedSpell;
    static get validTraits(): Record<ConsumableTrait, string>;
    get otherTags(): Set<OtherConsumableTag>;
    get category(): ConsumableCategory;
    get uses(): ValueAndMax;
    get embeddedSpell(): SpellPF2e<NonNullable<TParent>> | null;
    prepareBaseData(): void;
    getChatData(this: ConsumablePF2e<ActorPF2e>, htmlOptions?: EnrichmentOptionsPF2e, rollOptions?: Record<string, unknown>): Promise<RawItemChatData>;
    generateUnidentifiedName({ typeOnly }?: { typeOnly?: boolean }): string;
    getRollOptions(
        prefix?: string,
        options?: {
            includeGranter?: boolean;
        },
    ): string[];
    /** Use a consumable item, sending the result to chat */
    consume(thisMany?: number): Promise<void>;
    castEmbeddedSpell(trickMagicItemData?: TrickMagicItemEntry): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DatabaseUpdateCallbackOptions, user: fd.BaseUser): Promise<boolean | void>;
}
interface ConsumablePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: ConsumableSource;
    system: ConsumableSystemData;
}
export { ConsumablePF2e };
