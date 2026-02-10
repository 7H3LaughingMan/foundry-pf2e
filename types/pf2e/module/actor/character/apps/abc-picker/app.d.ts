import { ImageFilePath } from "#common/constants.mjs";
import { ItemUUID } from "#common/documents/_module.mjs";
import { Rarity } from "./../../../../data.ts";
import { ItemType } from "./../../../../item/types.ts";
import { SvelteApplicationMixin, SvelteApplicationRenderContext } from "./../../../../sheet/mixin.svelte.ts";
import { CharacterPF2e } from "./../../../index.ts";
type AhBCDType = Extract<ItemType, "ancestry" | "heritage" | "background" | "class" | "deity">;
interface ABCPickerConfiguration extends fa.ApplicationConfiguration {
    actor: CharacterPF2e;
    itemType: AhBCDType;
}
interface ABCItemRef {
    name: string;
    originalName?: string;
    img: ImageFilePath;
    uuid: ItemUUID;
    rarity?: {
        slug: Rarity;
        label: string;
    };
    source: {
        name: string;
        /** Whether the source comes from an item's publication data or is simply the providing module */
        publication: boolean;
    };
    hidden: boolean;
}
interface ABCPickerContext extends SvelteApplicationRenderContext {
    actor: CharacterPF2e;
    foundryApp: ABCPicker;
    state: {
        prompt: string;
        itemType: AhBCDType;
        items: ABCItemRef[];
    };
}
/** A `Compendium`-like application for presenting A(H)BCD options for a character */
declare class ABCPicker extends SvelteApplicationMixin<AbstractConstructorOf<fa.api.ApplicationV2> & { DEFAULT_OPTIONS: DeepPartial<ABCPickerConfiguration> }>(
    fa.api.ApplicationV2,
) {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<ABCPickerConfiguration>;
    options: ABCPickerConfiguration;
    root: import("svelte/legacy").LegacyComponentType;
    get title(): string;
    _initializeApplicationOptions(options: Partial<ABCPickerConfiguration>): ABCPickerConfiguration;
    _prepareContext(): Promise<ABCPickerContext>;
}
export { ABCPicker, type ABCPickerContext };
