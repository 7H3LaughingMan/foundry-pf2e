import {
    SingleCheckAction,
    SingleCheckActionVariant,
    SingleCheckActionVariantData,
} from "./../../../actor/actions/index.ts";
import { SkillActionOptions } from "../index.ts";
declare function createForgery(options: SkillActionOptions): Promise<void>;
declare class CreateForgeryAction extends SingleCheckAction {
    constructor();
    protected toActionVariant(data?: SingleCheckActionVariantData): SingleCheckActionVariant;
}
declare const action: CreateForgeryAction;
export { action, createForgery as legacy };
