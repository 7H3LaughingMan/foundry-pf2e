import { ApplicationRenderContext } from "#client/applications/_module.mjs";
import { ItemPF2e, PhysicalItemPF2e } from "./../item/index.ts";
import { UserPF2e } from "./../user/document.ts";
/** A prompt for the user to select an item to receive an attachment */
declare class ItemAttacher extends fa.api.HandlebarsApplicationMixin(fa.api.ApplicationV2) {
    #private;
    constructor({ item }: { item: PhysicalItemPF2e });
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    static PARTS: Record<string, fa.api.HandlebarsTemplatePart>;
    item: PhysicalItemPF2e;
    choices: PhysicalItemPF2e[];
    get title(): string;
    protected _canRender(options: fa.ApplicationRenderOptions): boolean | void;
    _prepareContext(): Promise<ItemAttacherContext>;
}
interface ItemAttacherContext extends ApplicationRenderContext {
    choices: {
        label: string;
        value: number;
    }[];
    /** An item pertinent to the selection being made */
    item: ItemPF2e;
    user: UserPF2e;
    requiresCrafting: boolean;
}
export { ItemAttacher };
