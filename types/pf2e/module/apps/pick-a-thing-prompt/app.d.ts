import { ApplicationV2 } from "#client/applications/api/_module.mjs";
import { ItemPF2e } from "./../../item/index.ts";
import { SvelteApplicationMixin, SvelteApplicationRenderContext } from "./../../sheet/mixin.svelte.ts";
import { Predicate } from "./../../system/predication.ts";
declare class PickAThingPrompt<TThing extends string | number | object> extends SvelteApplicationMixin<
    AbstractConstructorOf<ApplicationV2> & { DEFAULT_OPTIONS: DeepPartial<PickAThingPromptConfiguration> }
>(fa.api.ApplicationV2) {
    #private;
    constructor(data: PickAThingPromptConfiguration<TThing>);
    static DEFAULT_OPTIONS: {
        window: {
            icon: string;
        };
    };
    root: import("svelte/legacy").LegacyComponentType;
    item: ItemPF2e;
    /** The prompt statement to present the user in this application's window */
    prompt: string;
    choices: PickableThing<TThing>[];
    /** Does this choice set contain items? If true, an item-drop zone may be added */
    containsItems: boolean;
    /** A predicate validating a dragged & dropped item selection */
    allowedDrops: {
        label: string | null;
        predicate: Predicate;
    } | null;
    allowNoSelection: boolean;
    /** The current value, which is used in the resolve when it closes */
    selection: PickableThing<TThing> | null;
    _prepareContext(): Promise<PickAThingRenderContext<TThing>>;
    /** Return early if there is only one choice */
    resolveSelection(): Promise<PickableThing<TThing> | null>;
    _onClose(options: fa.ApplicationClosingOptions): void;
}
interface PickAThingPromptConfiguration<TThing extends string | number | object = string | number | object> extends DeepPartial<fa.ApplicationConfiguration> {
    prompt: string;
    item: ItemPF2e;
    title: string;
    containsItems?: boolean;
    choices: PickableThing<TThing>[];
    allowedDrops?: {
        label: string | null;
        predicate: Predicate;
    } | null;
    allowNoSelection?: boolean;
}
interface PickableThing<T extends string | number | object = string | number | object> {
    value: T;
    label: string;
    img?: string;
    predicate?: Predicate;
    /** The select option group to put this under if the control used is a select */
    group?: string;
}
interface PickAThingRenderContext<T extends string | number | object = string | number | object> extends SvelteApplicationRenderContext {
    updateSelection: (option: PickableThing<T> | null) => void;
    resolve: (option: PickableThing<T> | null) => void;
    testAllowedDrop: (option: ItemPF2e) => boolean;
    state: {
        prompt: string;
        includeDropZone: boolean;
        allowNoSelection: boolean;
        selectMenu: boolean;
        containsItems: boolean;
        choices: PickableThing<T>[];
    };
}
export { PickAThingPrompt };
export type { PickableThing, PickAThingRenderContext };
