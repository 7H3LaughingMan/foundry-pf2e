import { CreatureIdentificationData } from "./../../../recall-knowledge.ts";
declare class RecallKnowledgePopup extends fa.api.HandlebarsApplicationMixin(fa.api.ApplicationV2) {
    #private;
    constructor(options: Partial<RecallKnowledgePopupConfiguration> & Required<Pick<RecallKnowledgePopupConfiguration, "identificationData">>);
    static DEFAULT_OPTIONS: DeepPartial<RecallKnowledgePopupConfiguration>;
    static PARTS: Record<string, fa.api.HandlebarsTemplatePart>;
    protected _prepareContext(options: fa.ApplicationRenderOptions): Promise<RecallKnowledgePopupContext>;
}
interface RecallKnowledgePopupConfiguration extends fa.ApplicationConfiguration {
    identificationData: CreatureIdentificationData;
}
interface RecallKnowledgePopupContext extends fa.ApplicationRenderContext {
    standard: {
        label: string;
        attempts: string[];
    };
    loreEasy: string[];
    loreVeryEasy: string[];
}
export { RecallKnowledgePopup };
