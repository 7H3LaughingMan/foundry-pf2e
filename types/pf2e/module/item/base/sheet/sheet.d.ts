import { FormSelectOption } from "#client/applications/forms/fields.mjs";
import { ProseMirrorEditor } from "#client/applications/ux/_module.mjs";
import { ApplicationV1HeaderButton, AppV1RenderOptions } from "#client/appv1/api/application-v1.mjs";
import { DataField } from "#common/data/fields.mjs";
import { ItemPF2e } from "./../../index.ts";
import { Rarity } from "./../../../data.ts";
import { RuleElementSource } from "./../../../rules/index.ts";
import { SheetOptions, TagifyEntry } from "./../../../sheet/helpers.ts";
import { Plugin } from "prosemirror-state";
declare class ItemSheetPF2e<TItem extends ItemPF2e> extends fav1.sheets.ItemSheet<TItem, ItemSheetOptions> {
    #private;
    constructor(item: TItem, options?: Partial<fav1.sheets.ItemSheetData<TItem>>);
    /** Ignore deprecation warning */
    protected static _warnedAppV1: boolean;
    static get defaultOptions(): ItemSheetOptions;
    get editingRuleElement(): RuleElementSource | null;
    protected get validTraits(): Record<string, string>;
    /** An alternative to super.getData() for subclasses that don't need this class's `getData` */
    getData(options?: Partial<ItemSheetOptions>): Promise<ItemSheetDataPF2e<TItem>>;
    protected onTagSelector(anchor: HTMLAnchorElement): void;
    /** Get NPC attack effect options */
    protected getAttackEffectOptions(): Record<string, string>;
    activateEditor(
        name: string,
        options?: {
            engine?: "prosemirror" | "tinymce";
        },
        initialContent?: string,
    ): Promise<TinyMCE.Editor | ProseMirrorEditor>;
    close(options?: { force?: boolean }): Promise<void>;
    protected _configureProseMirrorPlugins(
        name: string,
        options: {
            remove?: boolean;
        },
    ): Record<string, Plugin>;
    activateListeners($html: JQuery): void;
    /** Add button to refresh from compendium if setting is enabled. */
    protected _getHeaderButtons(): ApplicationV1HeaderButton[];
    /** Actor sheets have this upstream, but items do not. Verify if this is a foundry bug */
    protected _canDragDrop(): boolean;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
    /** Overriden _render to maintain focus on tagify elements */
    protected _render(force?: boolean, options?: AppV1RenderOptions): Promise<void>;
}
interface ItemSheetDataPF2e<TItem extends ItemPF2e> extends fav1.sheets.ItemSheetData<TItem> {
    /** The item type label that shows at the top right (for example, "Feat" for "Feat 6") */
    itemType: string | null;
    showTraits: boolean;
    /** The sidebar's current title */
    sidebarTitle: string;
    sidebarTemplate: string | null;
    detailsTemplate: string;
    item: TItem;
    data: TItem["system"];
    systemFields: Record<string, DataField>;
    /** The leading part of IDs used for label-input/select matching */
    fieldRootId: string;
    /** Legacy value of the above */
    fieldIdPrefix: string;
    enrichedContent: Record<string, string>;
    isPhysical: boolean;
    user: {
        isGM: boolean;
    };
    enabledRulesUI: boolean;
    ruleEditing: boolean;
    rarity: Rarity | null;
    rarities: typeof CONFIG.PF2E.rarityTraits;
    traits: SheetOptions | null;
    traitTagifyData: TagifyEntry[] | null;
    otherTagsTagifyData: TagifyEntry[] | null;
    rules: {
        selection: {
            selected: string | null;
            types: Record<string, string>;
        };
        elements: {
            template: string;
        }[];
    };
    publicationLicenses: FormSelectOption[];
    /** Lore only, will be removed later */
    proficiencyRanks: typeof CONFIG.PF2E.proficiencyLevels;
    /** A prefix for label and form elements ids */
    rootId: string;
}
interface ItemSheetOptions extends fav1.api.DocumentSheetV1Options {
    hasSidebar: boolean;
}
export { ItemSheetPF2e };
export type { ItemSheetDataPF2e, ItemSheetOptions };
