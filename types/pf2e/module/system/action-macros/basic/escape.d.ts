import { type ActorPF2e } from "types/pf2e/module/actor/index.ts";
import { ActionCheckPreview, SingleCheckAction, SingleCheckActionVariant, SingleCheckActionVariantData } from "types/pf2e/module/actor/actions/index.ts";
import type { ItemPF2e } from "types/pf2e/module/item/index.ts";
import type { CheckContextData, CheckContextOptions, CheckMacroContext } from "types/pf2e/module/system/action-macros/types.ts";
import { SkillActionOptions } from "../index.ts";
declare function escape(options: SkillActionOptions): void;
declare class EscapeActionVariant extends SingleCheckActionVariant {
    #private;
    get statistic(): string;
    protected checkContext<ItemType extends ItemPF2e<ActorPF2e>>(opts: CheckContextOptions<ItemType>, data: CheckContextData<ItemType>): CheckMacroContext<ItemType> | undefined;
    protected toActionCheckPreview(options: {
        actor?: ActorPF2e;
        rollOptions: string[];
        slug: string;
    }): ActionCheckPreview | null;
}
declare class EscapeAction extends SingleCheckAction {
    constructor();
    protected toActionVariant(data?: SingleCheckActionVariantData): EscapeActionVariant;
}
declare const action: EscapeAction;
export { action, escape as legacy };
