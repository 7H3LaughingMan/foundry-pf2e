import { RuleElementSource } from "../../../../rules/index.ts";
import { TokenImageRuleElement } from "../../../../rules/rule-element/token-image.ts";
import { RuleElementForm, RuleElementFormSheetData, RuleElementFormTabData } from "./base.ts";
declare class TokenImageForm extends RuleElementForm<RuleElementSource, TokenImageRuleElement> {
    template: string;
    protected tabs: RuleElementFormTabData;
    getData(): Promise<TokenImageFormSheetData>;
    activateListeners(html: HTMLElement): void;
    updateObject(source: RuleElementSource & Partial<Record<string, JSONValue>>): void;
}
interface TokenImageFormSheetData extends RuleElementFormSheetData<RuleElementSource, TokenImageRuleElement> {
    alphaEnabled: boolean;
    scaleEnabled: boolean;
}
export { TokenImageForm };
