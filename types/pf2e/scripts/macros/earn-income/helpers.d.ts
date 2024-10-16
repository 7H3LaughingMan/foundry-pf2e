
import type { CharacterPF2e } from "types/pf2e/module/actor/index.ts";
import type { Statistic } from "types/pf2e/module/system/statistic/index.ts";
declare function runEarnIncome({ actor, event, skill, level, days }: RunEarnIncomeParams): void;
interface RunEarnIncomeParams {
    actor: CharacterPF2e;
    event: JQuery.TriggeredEvent | undefined;
    skill: Statistic;
    level: number;
    days: number;
}
declare function askSkillPopupTemplate(skills: Statistic[]): string;
export { askSkillPopupTemplate, runEarnIncome };
