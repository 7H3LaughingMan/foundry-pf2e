import { PhysicalItemPF2e } from "./../../../item/index.ts";
import { SvelteApplicationMixin, SvelteApplicationRenderContext } from "./../../../sheet/mixin.svelte.ts";
type ItemAction = "craft" | "repair";
interface SelectItemConfiguration extends fa.ApplicationConfiguration {
    action: ItemAction;
}
declare class SelectItemDialog extends SvelteApplicationMixin(fa.api.ApplicationV2) {
    #private;
    selection: PhysicalItemPF2e | null;
    constructor(options: Partial<SelectItemConfiguration> & Required<Pick<SelectItemConfiguration, "action">>);
    static DEFAULT_OPTIONS: DeepPartial<SelectItemConfiguration>;
    root: import("svelte/legacy").LegacyComponentType;
    $state: SelectItemState;
    get title(): string;
    _prepareContext(options: fa.ApplicationRenderOptions): Promise<SelectItemRenderContext>;
    resolveSelection(): Promise<PhysicalItemPF2e | null>;
    _onClose(options: fa.ApplicationClosingOptions): void;
    static getItem(action: ItemAction): Promise<PhysicalItemPF2e | null>;
}
interface SelectItemState {
    action: ItemAction;
}
interface SelectItemRenderContext extends SvelteApplicationRenderContext {
    foundryApp: SelectItemDialog;
    state: SelectItemState;
    resolve: (item: PhysicalItemPF2e | null) => void;
}
export { SelectItemDialog };
export type { ItemAction, SelectItemRenderContext };
