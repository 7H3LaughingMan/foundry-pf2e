import { ActorSheetPF2e, SheetClickActionHandlers } from "./../sheet/base.ts";
import { ActorSheetOptions } from "#client/appv1/sheets/actor-sheet.mjs";
import { HazardPF2e } from "./document.ts";
import { HazardSheetData } from "./types.ts";
export declare class HazardSheetPF2e extends ActorSheetPF2e<HazardPF2e> {
    #private;
    static get defaultOptions(): ActorSheetOptions;
    get title(): string;
    get editing(): boolean;
    getData(options?: ActorSheetOptions): Promise<HazardSheetData>;
    activateListeners($html: JQuery): void;
    protected activateClickListener(html: HTMLElement): SheetClickActionHandlers;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
