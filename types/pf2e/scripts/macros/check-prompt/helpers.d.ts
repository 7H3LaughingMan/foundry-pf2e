import type { ActorPF2e } from "types/pf2e/module/actor/index.ts";
declare function loreSkillsFromActors(actors: ActorPF2e | ActorPF2e[]): Record<string, string>;
declare function getActions(): Promise<Record<string, string>>;
export { getActions, loreSkillsFromActors };
