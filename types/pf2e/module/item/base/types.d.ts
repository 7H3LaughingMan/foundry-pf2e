import type { CreatureTrait } from "types/pf2e/module/actor/creature/types.ts";
import type { ActionTrait } from "types/pf2e/module/item/ability/types.ts";
import type { KingmakerTrait } from "types/pf2e/module/item/campaign-feature/types.ts";
import type { NPCAttackTrait } from "types/pf2e/module/item/melee/types.ts";
import type { PhysicalItemTrait } from "types/pf2e/module/item/physical/types.ts";
type ItemTrait = ActionTrait | CreatureTrait | PhysicalItemTrait | NPCAttackTrait | KingmakerTrait;
export type { ItemTrait };
