import { ActorPF2e } from "types/pf2e/module/actor/index.ts";
import { SingleCheckAction, SingleCheckActionVariant, SingleCheckActionVariantData } from "types/pf2e/module/actor/actions/index.ts";
import { ItemPF2e } from "types/pf2e/module/item/index.ts";
import { CheckContextData, CheckContextOptions, CheckMacroContext } from "types/pf2e/module/system/action-macros/types.ts";
import { SkillActionOptions } from "../index.ts";
declare function shove(options: SkillActionOptions): void;
declare class ShoveActionVariant extends SingleCheckActionVariant {
    protected checkContext<ItemType extends ItemPF2e<ActorPF2e>>(opts: CheckContextOptions<ItemType>, data: CheckContextData<ItemType>): CheckMacroContext<ItemType> | undefined;
}
declare class ShoveAction extends SingleCheckAction {
    constructor();
    protected toActionVariant(data?: SingleCheckActionVariantData): ShoveActionVariant;
}
declare const action: ShoveAction;
export { action, shove as legacy };
