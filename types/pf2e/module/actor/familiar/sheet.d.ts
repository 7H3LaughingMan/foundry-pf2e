import type { CharacterPF2e } from "types/pf2e/module/actor/index.ts";
import { CreatureSheetData } from "types/pf2e/module/actor/creature/index.ts";
import { CreatureSheetPF2e } from "types/pf2e/module/actor/creature/sheet.ts";
import { SheetClickActionHandlers } from "types/pf2e/module/actor/sheet/base.ts";
import { AbilityViewData } from "types/pf2e/module/actor/sheet/data-types.ts";
import { StatisticTraceData } from "types/pf2e/module/system/statistic/index.ts";
import type { FamiliarPF2e } from "./document.ts";
/**
 * @category Actor
 */
export declare class FamiliarSheetPF2e<TActor extends FamiliarPF2e> extends CreatureSheetPF2e<TActor> {
    /** There is currently no actor config for familiars */
    protected readonly actorConfigClass: null;
    static get defaultOptions(): ActorSheetOptions;
    getData(options?: ActorSheetOptions): Promise<FamiliarSheetData<TActor>>;
    protected activateClickListener(html: HTMLElement): SheetClickActionHandlers;
}
interface FamiliarSheetData<TActor extends FamiliarPF2e> extends CreatureSheetData<TActor> {
    attributes: typeof CONFIG.PF2E.abilities;
    familiarAbilities: {
        value: number;
        items: AbilityViewData[];
    };
    master: CharacterPF2e | null;
    masters: CharacterPF2e[];
    size: string;
    skills: StatisticTraceData[];
}
export {};
