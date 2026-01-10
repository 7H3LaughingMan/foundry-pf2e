import { ActorPF2e } from "./../actor/index.ts";
import { MeasuredTemplatePF2e } from "./../canvas/measured-template.ts";
import { ChatMessagePF2e } from "./../chat-message/document.ts";
import { ItemSourcePF2e } from "./base/data/index.ts";
import { ItemTraits, ItemTraitsNoRarity } from "./base/data/system.ts";
import { ItemPF2e } from "./base/document.ts";
import { ItemTrait } from "./base/types.ts";
import { PhysicalItemPF2e } from "./physical/document.ts";
import { EffectAreaShape, ItemInstances, ItemType } from "./types.ts";
type ItemOrSource = PreCreate<ItemSourcePF2e> | ItemPF2e;
/** Determine in a type-safe way whether an `ItemPF2e` or `ItemSourcePF2e` is among certain types */
declare function itemIsOfType<TParent extends ActorPF2e | null, TType extends ItemType>(
    item: ItemOrSource,
    ...types: TType[]
): item is ItemInstances<TParent>[TType] | ItemInstances<TParent>[TType]["_source"];
declare function itemIsOfType<TParent extends ActorPF2e | null, TType extends "physical" | ItemType>(
    item: ItemOrSource,
    ...types: TType[]
): item is TType extends "physical"
    ? PhysicalItemPF2e<TParent> | PhysicalItemPF2e<TParent>["_source"]
    : TType extends ItemType
      ? ItemInstances<TParent>[TType] | ItemInstances<TParent>[TType]["_source"]
      : never;
declare function itemIsOfType<TParent extends ActorPF2e | null>(
    item: ItemOrSource,
    type: "physical",
): item is PhysicalItemPF2e<TParent> | PhysicalItemPF2e["_source"];
/** Create a "reduced" item name; that is, one without an "Effect:" or similar prefix */
declare function reduceItemName(label: string): string;
/**
 * Performs late prep tasks on an item that doesn't exist in the actor, such as a cloned one.
 * If the item isn't embedded, nothing happens.
 */
declare function performLatePreparation(item: ItemPF2e): void;
declare function markdownToHTML(markdown: string): string;
/**
 * Add a trait to an array of traits--unless it matches an existing trait except by annotation. Replace the trait if
 * the new trait is an upgrade, or otherwise do nothing. Note: the array is mutated as part of this process.
 */
declare function addOrUpgradeTrait<TTrait extends ItemTrait>(
    traits: ItemTraits<TTrait> | ItemTraitsNoRarity<TTrait> | TTrait[],
    newTrait: TTrait,
    {
        mode,
    }?: {
        mode?: "upgrade" | "override";
    },
): void;
/**
 * Removes the trait from the traits object, and also updates the annotation if relevant
 * @param traits the traits object to update
 * @param trait the trait being removed
 */
declare function removeTrait<TTrait extends ItemTrait>(
    traits: Pick<ItemTraits<TTrait>, "value" | "config">,
    trait: string,
): void;
declare function createEffectAreaLabel(areaData: { type: EffectAreaShape; value: number }): string;
declare function placeItemTemplate(
    area: {
        type: EffectAreaShape;
        value: number;
    },
    {
        message,
        item,
    }: {
        message?: ChatMessagePF2e;
        item: ItemPF2e;
    },
): Promise<MeasuredTemplatePF2e>;
export {
    addOrUpgradeTrait,
    createEffectAreaLabel,
    itemIsOfType,
    markdownToHTML,
    performLatePreparation,
    placeItemTemplate,
    reduceItemName,
    removeTrait,
};
