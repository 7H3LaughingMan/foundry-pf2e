import { ActorPF2e } from "../../index.ts";
import { ConsumablePF2e, PhysicalItemPF2e } from "../../../item/index.ts";
import { CheckRoll } from "../../../system/check/index.ts";

export declare function craftItem(item: PhysicalItemPF2e, itemQuantity: number, actor: ActorPF2e, infused?: boolean): Promise<void>;
export declare function craftSpellConsumable(item: ConsumablePF2e, itemQuantity: number, actor: ActorPF2e): Promise<void>;
export declare function renderCraftingInline(item: PhysicalItemPF2e, roll: Rolled<CheckRoll>, quantity: number, actor: ActorPF2e, free: boolean): Promise<string | null>;
