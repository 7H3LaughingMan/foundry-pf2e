import { CreatureTrait } from '../../actor/creature/types.ts';
import { ActionTrait } from '../ability/types.ts';
import { KingmakerTrait } from '../campaign-feature/types.ts';
import { NPCAttackTrait } from '../melee/types.ts';
import { PhysicalItemTrait } from '../physical/types.ts';
type ItemTrait = ActionTrait | CreatureTrait | PhysicalItemTrait | NPCAttackTrait | KingmakerTrait;
export type { ItemTrait };
