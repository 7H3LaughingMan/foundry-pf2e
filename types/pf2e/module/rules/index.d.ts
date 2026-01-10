import { LaxSchemaField } from "./../system/schema-data-fields.ts";
import { RuleElement } from "./rule-element/base.ts";
import { RuleElementOptions, RuleElementSchema, RuleElementSource } from "./rule-element/index.ts";
export type { RuleElementSynthetics } from "./synthetics.ts";
/**
 * @category RuleElement
 */
declare class RuleElements {
    static readonly builtin: Record<string, RuleElementConstructor>;
    static custom: Record<string, RuleElementConstructor>;
    static get all(): Record<string, RuleElementConstructor>;
    static fromOwnedItem(options: RuleElementOptions): RuleElement[];
}
type RuleElementConstructor = {
    schema: LaxSchemaField<RuleElementSchema>;
    LOCALIZATION_PREFIXES: string[];
} & (new (data: RuleElementSource, options: RuleElementOptions) => RuleElement);
export { RuleElement, RuleElementOptions, RuleElements, RuleElementSource };
