import { ActorPF2e } from "./../../actor/index.ts";
import { Size } from "./../../data.ts";
import { ClassTrait } from "./../class/types.ts";
import { ItemPF2e, PhysicalItemPF2e } from "./../index.ts";
import { Price } from "./../physical/data.ts";
import { KitEntryData, KitSource, KitSystemData } from "./data.ts";
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
}
interface KitPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: KitSource;
    system: KitSystemData;
}
export { KitPF2e };
