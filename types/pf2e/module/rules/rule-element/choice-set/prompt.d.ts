


import type { ActorPF2e } from "types/pf2e/module/actor/index.ts";
import { ItemPF2e } from "types/pf2e/module/item/index.ts";
import { PickableThing, PickAThingConstructorArgs, PickAThingPrompt, PromptTemplateData } from "types/pf2e/module/apps/pick-a-thing-prompt.ts";
import type { Predicate } from "types/pf2e/module/system/predication.ts";
/** Prompt the user for a selection among a set of options */
declare class ChoiceSetPrompt extends PickAThingPrompt<ItemPF2e<ActorPF2e>, string | number | object> {
    /** The prompt statement to present the user in this application's window */
    prompt: string;
    /** Does this choice set contain items? If true, an item-drop zone may be added */
    containsItems: boolean;
    /** A predicate validating a dragged & dropped item selection */
    allowedDrops: {
        label: string | null;
        predicate: Predicate;
    } | null;
    constructor(data: ChoiceSetPromptData);
    static get defaultOptions(): ApplicationOptions;
    getData(): Promise<ChoiceSetTemplateData>;
    activateListeners($html: JQuery): void;
    /** Return early if there is only one choice */
    resolveSelection(): Promise<PickableThing<string | number | object> | null>;
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    /** Handle a dropped homebrew item */
    protected _onDrop(event: DragEvent): Promise<void>;
    protected _canDragDrop(): boolean;
}
interface ChoiceSetPrompt extends PickAThingPrompt<ItemPF2e<ActorPF2e>, string | number | object> {
    getSelection(event: MouseEvent): ChoiceSetChoice | null;
}
interface ChoiceSetPromptData extends PickAThingConstructorArgs<ItemPF2e<ActorPF2e>, string | number | object> {
    prompt: string;
    containsItems: boolean;
    allowedDrops: {
        label: string | null;
        predicate: Predicate;
    } | null;
}
interface ChoiceSetChoice extends PickableThing {
    hasUUID: boolean;
}
interface ChoiceSetTemplateData extends PromptTemplateData {
    prompt: string;
    choices: ChoiceSetChoice[];
    /** Whether to use a select menu instead of a column of buttons */
    selectMenu: boolean;
    includeDropZone: boolean;
    allowNoSelection: boolean;
    containsItems: boolean;
}
export { ChoiceSetPrompt };
