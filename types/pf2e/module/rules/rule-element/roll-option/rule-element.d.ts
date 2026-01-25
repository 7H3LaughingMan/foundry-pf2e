import { RuleElement, RuleElementOptions } from "../base.ts";
import { ModelPropsFromRESchema, RuleElementSource } from "../data.ts";
import { RollOptionSchema, Suboption } from "./data.ts";
import fields = foundry.data.fields;
/**
 * Set a roll option at a specificed domain
 * @category RuleElement
 */
declare class RollOptionRuleElement extends RuleElement<RollOptionSchema> {
    #private;
    /** True if this roll option has a suboptions configuration */
    hasSubOptions: boolean;
    constructor(source: RollOptionSource, options: RuleElementOptions);
    static defineSchema(): RollOptionSchema;
    static validateJoint(source: fields.SourceFromSchema<RollOptionSchema>): void;
    /** Process this rule element during item pre-creation to inform subsequent choice sets. */
    preCreate(): Promise<void>;
    onApplyActiveEffects(): void;
    beforePrepareData(): void;
    afterPrepareData(): void;
    /** Force false totm toggleable roll options if the totmToggles setting is disabled */
    resolveValue(): boolean;
    /** Retrieves the self sub options without handling any merge families */
    getSelfSuboptions(): Suboption[];
    /**
     * Toggle the provided roll option (swapping it from true to false or vice versa).
     * @param value The new roll option value
     * @param [selection] The new suboption selection
     * @returns the new value if successful or otherwise `null`
     */
    toggle(value?: boolean, selection?: string | null): Promise<boolean | null>;
    /**
     * Add or remove directly from/to a provided set of roll options. All RollOption REs, regardless of phase, are
     * (re-)called here.
     */
    beforeRoll(domains: string[], rollOptions: Set<string>): void;
    /** Remove the parent effect if configured so */
    afterRoll({ domains, rollOptions }: RuleElement.AfterRollParams): Promise<void>;
}
interface RollOptionRuleElement extends RuleElement<RollOptionSchema>, ModelPropsFromRESchema<RollOptionSchema> {
    value: boolean | string;
}
interface RollOptionSource extends RuleElementSource {
    domain?: JSONValue;
    option?: JSONValue;
    toggleable?: JSONValue;
    suboptions?: JSONValue;
    value?: JSONValue;
    selection?: JSONValue;
    disabledIf?: JSONValue;
    disabledValue?: JSONValue;
    count?: JSONValue;
    removeAfterRoll?: JSONValue;
}
export { RollOptionRuleElement };
export type { RollOptionSource };
