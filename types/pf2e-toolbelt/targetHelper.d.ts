import { SaveType } from "@actor/types.js";
import { RollNoteSource } from "@module/notes.js";
import { DegreeAdjustmentsRecord, DegreeOfSuccessString } from "@system/degree-of-success.js";


export {};

type MessageSaveFlag = {
    statistic: SaveType;
    basic: boolean;
    dc: number;
    author?: ActorUUID;
};

type MessageTargetSave = {
    private: boolean;
    value: number;
    die: number;
    success: DegreeOfSuccessString;
    roll: string;
    notes: RollNoteSource[];
    dosAdjustments: DegreeAdjustmentsRecord | undefined;
    unadjustedOutcome?: DegreeOfSuccessString | null;
    modifiers: { label: string; modifier: number }[];
};

type MessageFlagType = "damage" | "spell-damage" | "spell-save" | "action" | "check";

type MessageFlag = {
    type?: MessageFlagType;
    targets?: TokenDocumentUUID[];
    save?: MessageSaveFlag;
};

declare module "../foundry/common/documents/chat-message.js" {
    interface ChatMessageFlags {
        "pf2e-toolbelt"?: {
            targetHelper?: MessageFlag;
        };
    }
}
