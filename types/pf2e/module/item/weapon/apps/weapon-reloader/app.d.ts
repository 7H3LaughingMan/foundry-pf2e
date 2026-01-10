import { CharacterPF2e } from "./../../../../actor/character/document.ts";
import { ApplicationConfiguration } from "#client/applications/_module.mjs";
import { ApplicationV2 } from "#client/applications/api/_module.mjs";
import { WeaponPF2e } from "./../../../index.ts";
import { ValueAndMax } from "./../../../../data.ts";
import { BasePhysicalItemViewData } from "./../../../../sheet/helpers.ts";
import { SvelteApplicationMixin, SvelteApplicationRenderContext } from "./../../../../sheet/mixin.svelte.ts";
interface ReloadWeaponConfiguration extends ApplicationConfiguration {
    weapon: WeaponPF2e<CharacterPF2e>;
}
declare class WeaponReloader extends SvelteApplicationMixin<
    AbstractConstructorOf<ApplicationV2> & { DEFAULT_OPTIONS: DeepPartial<ReloadWeaponConfiguration> }
>(foundry.applications.api.ApplicationV2) {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<ReloadWeaponConfiguration>;
    root: import("svelte/legacy").LegacyComponentType;
    options: ReloadWeaponConfiguration;
    get glyph(): string | null;
    activate(element: HTMLElement): Promise<this>;
    _prepareContext(): Promise<ReloadWeaponContext>;
    _onRender(context: object, options: fa.ApplicationRenderOptions): Promise<void>;
    reloadWeapon(ammoId: string, all?: boolean): Promise<void>;
    _onFirstRender(context: ReloadWeaponConfiguration, options: fa.ApplicationRenderOptions): Promise<void>;
    _onClose(options: fa.ApplicationClosingOptions): void;
}
interface ReloadWeaponContext extends SvelteApplicationRenderContext {
    foundryApp: WeaponReloader;
    state: {
        loaded: ValueAndMax;
        weapon: BasePhysicalItemViewData;
        compatible: AmmoChoiceViewData[];
    };
}
interface AmmoChoiceViewData extends BasePhysicalItemViewData {
    quantity: number;
    uses: ValueAndMax | null;
    depleted: boolean;
}
export { WeaponReloader };
export type { ReloadWeaponContext };
