import { ActorPF2e } from "./../../../../actor/index.ts";
import { SpellPF2e } from "./../../../spell/document.ts";
import { SvelteApplicationMixin, SvelteApplicationRenderContext } from "./../../../../sheet/mixin.svelte.ts";
import fapi = foundry.applications.api;
/** An application to create a scroll or wand out of a spell */
declare class SpellcastingItemCreator extends SvelteApplicationMixin(fapi.ApplicationV2) {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<CreateSpellConsumableConfiguration>;
    root: import("svelte/legacy").LegacyComponentType;
    constructor(options: CreateSpellConsumableConfiguration);
    _prepareContext(options: fa.ApplicationRenderOptions): Promise<CreateSpellConsumableContext>;
}
interface CreateSpellConsumableConfiguration extends DeepPartial<fa.ApplicationConfiguration> {
    actor: ActorPF2e;
    /** The spell we're creating the scroll/wand for */
    spell: SpellPF2e;
    /** The initial setting for whether or not to hide the created item's identification */
    mystified?: boolean;
}
interface CreateSpellConsumableContext extends SvelteApplicationRenderContext {
    foundryApp: SpellcastingItemCreator;
    state: {
        name: string;
        isCantrip: boolean;
        minimumRank: number;
        initialMystified: boolean;
    };
}
export { SpellcastingItemCreator };
export type { CreateSpellConsumableContext };
