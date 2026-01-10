import { default as Tagify } from "@yaireo/tagify";
import { default as Sortable } from "sortablejs";
declare class DestroyableManager {
    #private;
    static instance: DestroyableManager;
    /** Start observing the document body. */
    static initialize(): void;
    constructor();
    observe(destroyable: Destroyable): void;
}
type Destroyable =
    | Tagify<{
          id: string;
          value: string;
      }>
    | Tagify<Tagify.TagData>
    | Sortable
    | JQueryTooltipster.ITooltipsterInstance;
declare function createSortable(list: HTMLElement, options: Sortable.Options): Sortable;
declare class NoJQueryPlugin {
    static pluginName: string;
    setupClone(): void;
    clone(): void;
}
declare function createTooltipster(target: HTMLElement, options: JQueryTooltipster.ITooltipsterOptions): JQuery;
export { createSortable, createTooltipster, DestroyableManager, NoJQueryPlugin };
