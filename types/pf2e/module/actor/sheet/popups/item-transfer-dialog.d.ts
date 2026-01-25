import { PhysicalItemPF2e } from "./../../../item/index.ts";
import { ActorPF2e } from "./../../index.ts";
declare class ItemTransferDialog extends fa.api.DialogV2<ItemTransferConfiguration> {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<ItemTransferConfiguration>;
    protected _initializeApplicationOptions(options: DeepPartial<ItemTransferConfiguration>): ItemTransferConfiguration;
    static wait(options: WaitParams): Promise<ResolutionData | null>;
    static confirm(): Promise<never>;
    static prompt(): Promise<never>;
    static query(): Promise<never>;
    protected _onRender(context: ItemTransferRenderContext, options: fa.api.HandlebarsRenderOptions): Promise<void>;
    /** If the price element exists, update it and listen for quantity changes  */
    protected _onChangeForm(formConfig: fa.ApplicationFormConfiguration, event: Event): void;
}
/**
 * A recognized transfer mode:
 * - move: a simple transfer between one actor to another, only prompting to set the quantity to be moved
 * - purchase: an exchange of coins for a quantity of an item
 * - gift: a transfer between creatures; declinable by the recipient
 * - credits: a credits transfer; transfers a number of credits
 */
type ItemTransferMode = "move" | "purchase" | "gift" | "credits";
interface ItemTransferConfiguration extends fa.api.DialogV2Configuration {
    item: PhysicalItemPF2e;
    recipient: ActorPF2e;
    mode: ItemTransferMode;
    newStack: boolean;
    lockStack: boolean;
}
interface WaitParams
    extends
        DeepPartial<Omit<ItemTransferConfiguration, "recipient" | "item">>,
        Pick<ItemTransferConfiguration, "recipient" | "item"> {}
interface ResolutionData {
    /** The quantity being transferred. If this is a cred stick, this is the quantity of credits instead */
    quantity: number;
    newStack: boolean;
    mode: ItemTransferMode;
}
interface ItemTransferRenderContext extends fa.ApplicationRenderContext {
    prompt: string;
    item: PhysicalItemPF2e;
    quantity: number;
    mode: ItemTransferMode;
    canGift: boolean;
    newStack: boolean;
    lockStack: boolean;
    rootId: string;
    buttons: fa.FormFooterButton[];
}
export { ItemTransferDialog };
