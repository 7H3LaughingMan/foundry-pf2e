import { SingleCheckAction, SingleCheckActionVariant, SingleCheckActionVariantData } from "types/pf2e/module/actor/actions/index.ts";
declare class IdentifyMagicAction extends SingleCheckAction {
    constructor();
    protected toActionVariant(data?: SingleCheckActionVariantData): SingleCheckActionVariant;
}
declare const identifyMagic: IdentifyMagicAction;
export { identifyMagic };
