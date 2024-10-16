import { ActorPF2e } from "types/pf2e/module/actor/index.ts";
import { SaveType } from "types/pf2e/module/actor/types.ts";
import { ConditionPF2e } from "types/pf2e/module/item/index.ts";
import { ItemType } from "types/pf2e/module/item/base/data/index.ts";
import { Rarity } from "types/pf2e/module/data.ts";
import { TokenDocumentPF2e } from "types/pf2e/module/scene/index.ts";
import { DamageType } from "types/pf2e/module/system/damage/index.ts";
import { Statistic } from "types/pf2e/module/system/statistic/index.ts";
import { HazardSource, HazardSystemData } from "./data.ts";
declare class HazardPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    skills: Record<"stealth", Statistic<this>>;
    get allowedItemTypes(): (ItemType | "physical")[];
    get rarity(): Rarity;
    get isComplex(): boolean;
    get hardness(): number;
    get hasDefenses(): boolean;
    /** Minimal check since the disabled status of a hazard isn't logged */
    get canAttack(): boolean;
    get emitsSound(): boolean;
    isAffectedBy(effect: DamageType | ConditionPF2e): boolean;
    prepareBaseData(): void;
    prepareDerivedData(): void;
    /**
     * Some hazards have an implicit immunity exception to certain damage types despite having object immunities: use a
     * weakness or resistance as indication.
     */
    prepareData(): void;
    private prepareSaves;
}
interface HazardPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    readonly _source: HazardSource;
    system: HazardSystemData;
    saves: {
        [K in SaveType]?: Statistic;
    };
}
export { HazardPF2e };
