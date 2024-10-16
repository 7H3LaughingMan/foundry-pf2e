import type { ActorPF2e } from "types/pf2e/module/actor/index.ts";
import { ItemPF2e, type PhysicalItemPF2e } from "types/pf2e/module/item/index.ts";
import type { ClassTrait } from "types/pf2e/module/item/class/types.ts";
import { Price } from "types/pf2e/module/item/physical/data.ts";
import { Size } from "types/pf2e/module/data.ts";
import type { UserPF2e } from "types/pf2e/module/user/index.ts";
import { KitSource, KitSystemData, type KitEntryData } from "./data.ts";
declare class KitPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    static get validTraits(): Record<ClassTrait, string>;
    get entries(): KitEntryData[];
    get price(): Price;
    /** Expand a tree of kit entry data into a list of physical items */
    createGrantedItems(options?: {
        entries?: KitEntryData[];
        containerId?: string;
        size?: Size;
    }): Promise<PhysicalItemPF2e<null>[]>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface KitPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: KitSource;
    system: KitSystemData;
}
export { KitPF2e };
