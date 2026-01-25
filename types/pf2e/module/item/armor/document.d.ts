import { DatabaseUpdateCallbackOptions } from "#common/abstract/_module.mjs";
import { ActorPF2e } from "./../../actor/index.ts";
import { EnrichmentOptionsPF2e } from "./../../system/text-editor.ts";
import { RawItemChatData } from "./../base/data/index.ts";
import { PhysicalItemPF2e } from "./../physical/index.ts";
import { ArmorSource, ArmorSystemData } from "./data.ts";
import { ArmorCategory, ArmorGroup, ArmorTrait, BaseArmorType } from "./types.ts";
declare class ArmorPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    static get validTraits(): Record<ArmorTrait, string>;
    get isBarding(): boolean;
    get baseType(): BaseArmorType | null;
    get group(): ArmorGroup | null;
    get category(): ArmorCategory;
    get dexCap(): number;
    get strength(): number | null;
    get checkPenalty(): number;
    get speedPenalty(): number;
    get acBonus(): number;
    get isSpecific(): boolean;
    /** Generate a list of strings for use in predication */
    getRollOptions(
        prefix?: string,
        options?: {
            includeGranter?: boolean;
        },
    ): string[];
    acceptsSubitem(candidate: PhysicalItemPF2e): boolean;
    isStackableWith(item: PhysicalItemPF2e<TParent>): boolean;
    prepareBaseData(): void;
    prepareDerivedData(): void;
    prepareActorData(this: ArmorPF2e<ActorPF2e>): void;
    onPrepareSynthetics(): void;
    getChatData(this: ArmorPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptionsPF2e): Promise<RawItemChatData>;
    generateUnidentifiedName({ typeOnly }?: { typeOnly?: boolean }): string;
    /** Ensure correct shield/actual-armor usage */
    protected _preUpdate(
        changed: DeepPartial<this["_source"]>,
        options: DatabaseUpdateCallbackOptions,
        user: fd.BaseUser,
    ): Promise<boolean | void>;
}
interface ArmorPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: ArmorSource;
    system: ArmorSystemData;
}
export { ArmorPF2e };
