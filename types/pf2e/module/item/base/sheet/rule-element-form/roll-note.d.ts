import { NoteRESource, RollNoteRuleElement } from "./../../../../rules/rule-element/roll-note.ts";
import { RuleElementForm, RuleElementFormSheetData } from "./base.ts";
/** Form handler for the RollNote rule element */
export declare class RollNoteForm extends RuleElementForm<NoteRESource, RollNoteRuleElement> {
    getData(): Promise<RuleElementFormSheetData<NoteRESource, RollNoteRuleElement>>;
}
