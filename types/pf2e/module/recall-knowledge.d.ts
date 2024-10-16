import { NPCPF2e } from "types/pf2e/module/actor/index.ts";
import { SkillSlug } from "types/pf2e/module/actor/types.ts";
import { DCAdjustment, DCOptions } from "./dc.ts";
declare function creatureIdentificationDCs(creature: NPCPF2e, { pwol }?: DCOptions): CreatureIdentificationData;
interface RecallKnowledgeDC {
    dc: number;
    progression: number[];
    start: DCAdjustment;
}
interface CreatureIdentificationData {
    skills: SkillSlug[];
    standard: RecallKnowledgeDC;
    lore: [RecallKnowledgeDC, RecallKnowledgeDC];
}
export { creatureIdentificationDCs, type CreatureIdentificationData };
