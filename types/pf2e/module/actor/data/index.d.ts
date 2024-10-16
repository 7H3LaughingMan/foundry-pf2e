import { ArmySource } from "types/pf2e/module/actor/army/data.ts";
import { CharacterSource } from "types/pf2e/module/actor/character/data.ts";
import { FamiliarSource } from "types/pf2e/module/actor/familiar/data.ts";
import { HazardSource } from "types/pf2e/module/actor/hazard/data.ts";
import { LootSource } from "types/pf2e/module/actor/loot/data.ts";
import { NPCSource } from "types/pf2e/module/actor/npc/data.ts";
import { PartySource } from "types/pf2e/module/actor/party/data.ts";
import { VehicleSource } from "types/pf2e/module/actor/vehicle/data.ts";
import { StatisticRollParameters } from "types/pf2e/module/system/statistic/index.ts";
type CreatureSource = CharacterSource | NPCSource | FamiliarSource;
type ActorSourcePF2e = ArmySource | CreatureSource | HazardSource | LootSource | PartySource | VehicleSource;
interface RollInitiativeOptionsPF2e extends RollInitiativeOptions, StatisticRollParameters {
    secret?: boolean;
}
export type { ActorSourcePF2e, ArmySource, CharacterSource, CreatureSource, FamiliarSource, HazardSource, LootSource, NPCSource, PartySource, RollInitiativeOptionsPF2e, VehicleSource, };
