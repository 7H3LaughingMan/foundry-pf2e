import { ActorPF2e } from "./../actor/index.ts";
import { default as Application } from "#client/appv1/api/application-v1.mjs";
import { TooltipDirection } from "#client/helpers/interaction/tooltip-manager.mjs";
import { RollMode } from "#common/constants.mjs";
import { ImageFilePath } from "#common/constants.mjs";
import { ItemUUID } from "#common/documents/_module.mjs";
import { ItemPF2e, MeleePF2e, PhysicalItemPF2e } from "./../item/index.ts";
import { ActionCost, TraitChatData } from "./../item/base/data/index.ts";
import { ItemType } from "./../item/types.ts";
import { Rarity } from "./../data.ts";
/** Prepare form options on an item or actor sheet */
declare function createSheetOptions(
    options: Record<
        string,
        | string
        | {
              label: string;
          }
    >,
    selections?: SheetSelections,
    {
        selected,
    }?: {
        selected?: boolean | undefined;
    },
): SheetOptions;
declare function createSheetTags(
    options: Record<
        string,
        | string
        | {
              label: string;
          }
    >,
    selections: SheetSelections,
): SheetOptions;
declare function createTagifyTraits(
    traits: Iterable<string>,
    { sourceTraits, record }: TagifyTraitOptions,
): TagifyEntry[];
/**
 * Get a CSS class for an adjusted value
 * @param value A value from prepared/derived data
 * @param base A value from base/source data
 * @param options.better Which value is "better" in the context of the data: default is "higher"
 **/
declare function getAdjustment(
    value: number,
    base: number,
    {
        better,
    }?: {
        better?: "higher" | "lower";
    },
): "adjusted-higher" | "adjusted-lower" | null;
declare function getAdjustedValue(
    value: number,
    reference: number,
    options?: {
        better?: "higher" | "lower";
    },
): AdjustedValue;
interface AdjustedValue {
    value: number;
    adjustedHigher: boolean;
    adjustedLower: boolean;
    adjustmentClass: "adjusted-higher" | "adjusted-lower" | null;
}
/** Override to refocus tagify elements in _render() to workaround handlebars full re-render */
declare function maintainFocusInRender(sheet: Application, renderLogic: () => Promise<void>): Promise<void>;
declare function getItemFromDragEvent(event: DragEvent): Promise<ItemPF2e | null>;
/** Returns statistic dialog roll parameters based on held keys */
type ParamsFromEvent = {
    skipDialog: boolean;
    rollMode?: RollMode | "roll";
};
/** Set roll mode and dialog skipping from a user's input */
declare function eventToRollParams(
    event: Maybe<Event>,
    rollType: {
        type: "check" | "damage";
    },
): ParamsFromEvent;
/** Set roll mode from a user's input: used for messages that are not actually rolls. */
declare function eventToRollMode(event: Maybe<Event>): RollMode | "roll";
/** Returns true if the control key is held down, handling mac */
declare function isControlDown(event: PointerEvent | KeyboardEvent | TouchEvent | WheelEvent): boolean;
/** Given a uuid, loads the item and sends it to chat, potentially recontextualizing it with a given actor */
declare function sendItemToChat(
    itemUuid: ItemUUID,
    options: {
        event?: Event;
        actor?: ActorPF2e;
    },
): Promise<void>;
declare function getBasePhysicalItemViewData(item: PhysicalItemPF2e): BasePhysicalItemViewData;
/** Creates a listener that can be used to create tooltips with dynamic content */
declare function createTooltipListener(
    element: HTMLElement,
    options: {
        /** Controls if the top edge of this tooltip aligns with the top edge of the target */
        align?: "top";
        /** If given, the tooltip will spawn on elements that match this selector */
        selector?: string;
        locked?: boolean;
        direction?: TooltipDirection;
        cssClass?: string;
        render: (element: HTMLElement) => Promise<HTMLElement | null>;
    },
): void;
declare function createNPCAttackTraitsAndTags(item: MeleePF2e): NPCAttackTraitOrTag[];
declare function getActionIcon(actionType: string | ActionCost | null, fallback: ImageFilePath): ImageFilePath;
declare function getActionIcon(
    actionType: string | ActionCost | null,
    fallback: ImageFilePath | null,
): ImageFilePath | null;
declare function getActionIcon(actionType: string | ActionCost | null): ImageFilePath;
interface SheetOption {
    value: string;
    label: string;
    selected: boolean;
}
type SheetOptions = Record<string, SheetOption>;
type SheetSelections =
    | {
          value: (string | number)[];
      }
    | (string[] & {
          custom?: never;
      });
interface TagifyTraitOptions {
    sourceTraits?: Iterable<string>;
    record?: Record<string, string>;
}
interface TagifyEntry {
    id: string;
    value: string;
    /** If true, the tag will exist in tagify but unremovable. */
    readonly: boolean;
    /**
     * If true, it will be hidden from tagify itself but exist in submit data.
     * Tagify treats any value as true, even false or null.
     */
    hidden?: true;
    "data-tooltip"?: string;
}
/**
 * An NPC trait or tag to show next to a strike (or area/auto fire in SF2e).
 * Sometimes Paizo will include a non-trait in the traits list.
 * "As Melee, but also lists range or range increment *with* traits" - Monster Core Pg 5
 */
interface NPCAttackTraitOrTag {
    name?: string;
    label: string;
    description?: string | null;
}
interface BasePhysicalItemViewData {
    id: string;
    uuid: ItemUUID;
    type: ItemType;
    img: string;
    name: string;
    traits: TraitChatData[];
    level: number | null;
    rarity: Rarity | null;
    isTemporary: boolean;
}
export {
    createNPCAttackTraitsAndTags,
    createSheetOptions,
    createSheetTags,
    createTagifyTraits,
    createTooltipListener,
    eventToRollMode,
    eventToRollParams,
    getActionIcon,
    getAdjustedValue,
    getAdjustment,
    getBasePhysicalItemViewData,
    getItemFromDragEvent,
    isControlDown,
    maintainFocusInRender,
    sendItemToChat,
};
export type { AdjustedValue, BasePhysicalItemViewData, NPCAttackTraitOrTag, SheetOption, SheetOptions, TagifyEntry };
