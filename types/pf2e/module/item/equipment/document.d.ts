import { ActorPF2e } from "./../../actor/index.ts";
import { EnrichmentOptionsPF2e } from "./../../system/text-editor.ts";
import { RawItemChatData } from "./../base/data/index.ts";
import { PhysicalItemPF2e } from "./../physical/index.ts";
import { EquipmentSource, EquipmentSystemData, EquipmentTrait } from "./data.ts";
declare class EquipmentPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    static get validTraits(): Record<EquipmentTrait, string>;
    /** Whether the item has an attached (or affixed, applied, etc.) usage */
    get isAttachable(): boolean;
    getChatData(this: EquipmentPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptionsPF2e): Promise<RawItemChatData>;
    generateUnidentifiedName({ typeOnly }?: { typeOnly?: boolean }): string;
}
interface EquipmentPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: EquipmentSource;
    system: EquipmentSystemData;
    get traits(): Set<EquipmentTrait>;
}
export { EquipmentPF2e };
