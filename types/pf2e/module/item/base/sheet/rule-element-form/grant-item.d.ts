import { ClientDocument } from "#client/documents/abstract/_module.mjs";
import { GrantItemRuleElement, GrantItemSource } from "./../../../../rules/rule-element/grant-item/rule-element.ts";
import { RuleElementForm, RuleElementFormSheetData } from "./base.ts";
/** Form handler for the GrantItem rule element */
declare class GrantItemForm extends RuleElementForm<GrantItemSource, GrantItemRuleElement> {
    template: string;
    getData(): Promise<GrantItemFormSheetData>;
    updateObject(
        ruleData: {
            key: string;
        } & Partial<Record<string, JSONValue>>,
    ): void;
}
interface GrantItemFormSheetData extends RuleElementFormSheetData<GrantItemSource, GrantItemRuleElement> {
    granted: ClientDocument | null;
}
export { GrantItemForm };
