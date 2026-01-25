import { SkillActionOptions } from "../index.ts";
import {
    SingleCheckAction,
    SingleCheckActionVariant,
    SingleCheckActionVariantData,
} from "./../../../actor/actions/index.ts";
import { ActorPF2e } from "./../../../actor/index.ts";
import { ItemPF2e } from "./../../../item/index.ts";
import { CheckContextData, CheckContextOptions, CheckMacroContext } from "./../../action-macros/types.ts";
declare function shove(options: SkillActionOptions): void;
declare class ShoveActionVariant extends SingleCheckActionVariant {
    protected checkContext<ItemType extends ItemPF2e<ActorPF2e>>(
        opts: CheckContextOptions<ItemType>,
        data: CheckContextData<ItemType>,
    ): CheckMacroContext<ItemType> | undefined;
}
declare class ShoveAction extends SingleCheckAction {
    constructor();
    protected toActionVariant(data?: SingleCheckActionVariantData): ShoveActionVariant;
}
declare const action: ShoveAction;
export { action, shove as legacy };
