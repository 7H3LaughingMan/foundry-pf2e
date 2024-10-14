import { ItemPF2e } from '../../item/index.ts';
/** Extend ItemDirectory to show more information */
export declare class ItemDirectoryPF2e<TItem extends ItemPF2e<null>> extends ItemDirectory<TItem> {
    #private;
    static entryPartial: string;
    static get defaultOptions(): SidebarDirectoryOptions;
    activateListeners($html: JQuery<HTMLElement>): void;
    /** Add `EntryContextOption` to attach physical items */
    protected _getEntryContextOptions(): EntryContextOption[];
}
