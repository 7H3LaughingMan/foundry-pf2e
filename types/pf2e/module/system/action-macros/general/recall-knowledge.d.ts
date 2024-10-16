import { SingleCheckAction, SingleCheckActionUseOptions, SingleCheckActionVariant, SingleCheckActionVariantData } from "types/pf2e/module/actor/actions/index.ts";
import { CheckResultCallback } from "types/pf2e/module/system/action-macros/types.ts";
interface RecallKnowledgeActionUseOptions extends Partial<SingleCheckActionUseOptions> {
    statistic: string;
}
declare class RecallKnowledgeActionVariant extends SingleCheckActionVariant {
    use(options: RecallKnowledgeActionUseOptions): Promise<CheckResultCallback[]>;
}
declare class RecallKnowledgeAction extends SingleCheckAction {
    constructor();
    protected toActionVariant(data?: SingleCheckActionVariantData): RecallKnowledgeActionVariant;
}
declare const recallKnowledge: RecallKnowledgeAction;
export { recallKnowledge };
