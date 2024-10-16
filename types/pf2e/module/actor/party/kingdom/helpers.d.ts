import type { ActorPF2e } from "types/pf2e/module/actor/index.ts";
import type { ItemPF2e } from "types/pf2e/module/item/index.ts";
import type { Kingdom } from "./model.ts";
import { KingdomAbility, KingdomCHG, KingdomCommodity } from "./types.ts";
/** Resolves boosts using kingmaker rules. Free boosts cannot be the granted ability nor the flaw */
declare function resolveKingdomBoosts(entry: KingdomCHG, choices: KingdomAbility[]): KingdomAbility[];
/** Assemble what will be collected during the kingdom's upkeep phase */
declare function calculateKingdomCollectionData(kingdom: Kingdom): {
    formula: string;
    commodities: Record<Exclude<KingdomCommodity, "food">, number>;
};
declare function importDocuments(actor: ActorPF2e, items: ItemPF2e[], skipDialog: boolean): Promise<void>;
export { calculateKingdomCollectionData, importDocuments, resolveKingdomBoosts };
