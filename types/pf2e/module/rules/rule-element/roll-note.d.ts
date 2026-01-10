import { StringField } from "#common/data/fields.mjs";
import { UserVisibility } from "./../../../scripts/ui/user-visibility.ts";
import { DegreeOfSuccessString } from "./../../system/degree-of-success.ts";
import { RuleElement } from "./base.ts";
import { ModelPropsFromRESchema, RuleElementSchema, RuleElementSource } from "./data.ts";
import fields = foundry.data.fields;
declare class RollNoteRuleElement extends RuleElement<RollNoteSchema> {
    static autogenForms: boolean;
    static LOCALIZATION_PREFIXES: string[];
    static defineSchema(): RollNoteSchema;
    beforePrepareData(): void;
}
interface RollNoteRuleElement extends RuleElement<RollNoteSchema>, ModelPropsFromRESchema<RollNoteSchema> {}
type RollNoteSchema = RuleElementSchema & {
    /** The statistic(s) slugs of the rolls for which this note will be appended */
    selector: fields.SetField<StringField<string, string, true, false, false>>;
    /** An optional title prepended to the note */
    title: fields.StringField<string, string, false, true, true>;
    /** An optional limitation of the notes visibility to GMs */
    visibility: fields.StringField<UserVisibility, UserVisibility, true, true, true>;
    /** Applicable degree-of-success outcomes for the note */
    outcome: fields.SetField<StringField<DegreeOfSuccessString, DegreeOfSuccessString, true, false, false>>;
    /** The main text of the note */
    text: fields.HTMLField<string, string, true, false, false>;
    /** Whether this rule element is for use with battle forms */
    battleForm: fields.BooleanField<boolean, boolean, false, false, true>;
};
interface NoteRESource extends RuleElementSource {
    selector?: unknown;
    outcome?: unknown;
    title?: unknown;
    text?: unknown;
    visibility?: unknown;
}
export { RollNoteRuleElement, type NoteRESource };
