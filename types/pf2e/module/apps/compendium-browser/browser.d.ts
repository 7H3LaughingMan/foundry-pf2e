import { AbilityTrait, ActionCategory } from "./../../item/ability/index.ts";
import { ActionType } from "./../../item/base/data/index.ts";
import { BaseSpellcastingEntry } from "./../../item/spellcasting-entry/index.ts";
import { SvelteApplicationMixin, SvelteApplicationRenderContext } from "./../../sheet/mixin.svelte.ts";
import { BrowserTab, BrowserTabs, ContentTabName, PackInfo, SourceInfo, TabData, TabName } from "./data.ts";
import { PackLoader } from "./loader.ts";
import { BrowserFilter } from "./tabs/data.ts";
declare class CompendiumBrowser extends SvelteApplicationMixin(fa.api.ApplicationV2) {
    #private;
    /** The amount of rendered result items for initial loading and per load operation */
    static RESULT_LIMIT: number;
    $state: CompendiumBrowserState;
    root: import("svelte/legacy").LegacyComponentType;
    activeTab: BrowserTab;
    dataTabsList: readonly ["action", "bestiary", "campaignFeature", "equipment", "feat", "hazard", "spell"];
    packLoader: PackLoader;
    settings: CompendiumBrowserSettings;
    tabs: BrowserTabs;
    tabsArray: BrowserTab[];
    constructor(options?: Partial<fa.ApplicationConfiguration>);
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    _onFirstRender(context: fa.ApplicationRenderContext, options: fa.ApplicationRenderOptions): Promise<void>;
    _onClose(options: fa.ApplicationClosingOptions): void;
    _getHeaderControls(): fa.ApplicationHeaderControlsEntry[];
    _prepareContext(_options: fa.ApplicationRenderOptions): Promise<CompendiumBrowserContext>;
    resetListElement(): void;
    openTab(tabName: TabName, options?: CompendiumBrowserOpenTabOptions): Promise<void>;
    openActionTab(options: {
        types?: ActionType[];
        categories?: ActionCategory[];
        traits?: AbilityTrait[];
    }): Promise<void>;
    openSpellTab(entry: BaseSpellcastingEntry, maxRank?: number, category?: string | null): Promise<void>;
    initCompendiumList(): void;
    loadedPacks(tab: TabName): string[];
    loadedPacksAll(): string[];
    resetInitializedTabs(): Promise<void>;
}
interface CompendiumBrowserContext extends SvelteApplicationRenderContext {
    state: CompendiumBrowserState;
}
interface CompendiumBrowserState {
    /** Changing this will trigger a tab rerender. An empty string will show the landing page */
    activeTabName: ContentTabName | "";
    /** The result list HTML element */
    resultList: HTMLUListElement;
}
type CompendiumBrowserSettings = TabData<Record<string, PackInfo | undefined>>;
type CompendiumBrowserSourcesList = Record<string, SourceInfo | undefined>;
interface CompendiumBrowserSources {
    ignoreAsGM: boolean;
    showEmptySources: boolean;
    showUnknownSources: boolean;
    sources: CompendiumBrowserSourcesList;
}
interface CompendiumBrowserOpenTabOptions {
    /** Optional filter data for the opened tab */
    filter?: BrowserFilter;
    /** Hide the navigation element */
    hideNavigation?: boolean;
    /** Only show the given tabs in the navigation element. This will always include the openend tab */
    showTabs?: ContentTabName[];
}
export { CompendiumBrowser };
export type {
    CompendiumBrowserContext,
    CompendiumBrowserOpenTabOptions,
    CompendiumBrowserSettings,
    CompendiumBrowserSources,
    CompendiumBrowserState,
};
