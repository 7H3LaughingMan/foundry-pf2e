import { ActorPF2e } from "./../../actor/index.ts";
import { RawItemChatData } from "./../base/data/index.ts";
import { ConsumableTrait } from "./../consumable/types.ts";
import { PhysicalItemPF2e } from "./../physical/index.ts";
import { WeaponPF2e } from "./../weapon/document.ts";
import { ValueAndMax } from "./../../data.ts";
import { EnrichmentOptionsPF2e } from "./../../system/text-editor.ts";
import { AmmoSource, AmmoSystemData } from "./data.ts";
declare class AmmoPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    static get validTraits(): Record<ConsumableTrait, string>;
    get isMagazine(): boolean;
    get uses(): ValueAndMax;
    prepareBaseData(): void;
    isAmmoFor(weapon: WeaponPF2e): boolean;
    /** Use a consumable item, sending the result to chat */
    consume(thisMany?: number): Promise<void>;
    getChatData(htmlOptions?: EnrichmentOptionsPF2e): Promise<RawItemChatData>;
    protected _preCreate(
        data: DeepPartial<this["_source"]>,
        options: foundry.abstract.DatabaseCreateCallbackOptions,
        user: fd.BaseUser,
    ): Promise<boolean | void>;
    protected _preUpdate(
        changed: DeepPartial<this["_source"]>,
        operation: foundry.abstract.DatabaseUpdateCallbackOptions & {
            checkHP?: boolean;
        },
        user: fd.BaseUser,
    ): Promise<boolean | void>;
}
interface AmmoPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: AmmoSource;
    system: AmmoSystemData;
}
export { AmmoPF2e };
