import { ActorUUID, TokenDocumentUUID } from "#client/documents/_module.mjs";
import { DocumentUUID } from "#client/utils/_module.mjs";
import { RollMode } from "#common/constants.mjs";
import { ChatMessageFlags } from "#common/documents/chat-message.mjs";
import { RawDamageDice, RawModifier } from "../actor/modifiers.ts";
import { SpellSource } from "../item/base/data/index.ts";
import { MagicTradition } from "../item/spell/types.ts";
import { ZeroToTwo } from "./../data.ts";
import { EffectAreaShape, ItemType } from "./../item/types.ts";
import { RollNoteSource } from "./../notes.ts";
import { CheckCheckContext } from "./../system/check/index.ts";
import { DamageDamageContext } from "./../system/damage/types.ts";
import { CheckDC, DegreeAdjustmentsRecord, DegreeOfSuccessString } from "./../system/degree-of-success.ts";
type ChatMessageSourcePF2e = foundry.documents.ChatMessageSource & {
    flags: ChatMessageFlagsPF2e;
};
export interface ItemOriginFlag {
    actor?: ActorUUID;
    type: ItemType;
    uuid: string;
    castRank?: number;
    messageId?: string;
    variant?: {
        overlays: string[];
    } | null;
    rollOptions?: string[];
}
type ChatMessageFlagsPF2e = ChatMessageFlags & {
    [SYSTEM_ID]: {
        damageRoll?: DamageRollFlag;
        context?: ChatContextFlag;
        origin?: ItemOriginFlag | null;
        casting?: { id: string; tradition: MagicTradition; embeddedSpell?: SpellSource } | null;
        modifiers?: RawModifier[];
        dice?: RawDamageDice[];
        journalEntry?: DocumentUUID | null;
        appliedDamage?: AppliedDamageFlag | null;
        treatWoundsMacroFlag?: { bonus: number };
    };
};
type ChatContextFlag =
    | CheckContextChatFlag
    | DamageDamageContextFlag
    | SpellCastContextFlag
    | SelfEffectContextFlag
    | DamageTakenContextFlag
    | AreaAttackContextFlag;
interface DamageRollFlag {
    outcome: DegreeOfSuccessString;
    total: number;
    traits: string[];
    types: Record<string, Record<string, number>>;
    diceResults: Record<string, Record<string, DieResult[]>>;
    baseDamageDice: number;
}
interface DieResult {
    faces: number;
    result: number;
}
interface ActorTokenFlag {
    actor: ActorUUID | TokenDocumentUUID;
    token?: TokenDocumentUUID;
}
type ContextFlagOmission =
    | "actor"
    | "action"
    | "altUsage"
    | "createMessage"
    | "damaging"
    | "dc"
    | "dosAdjustments"
    | "item"
    | "mapIncreases"
    | "notes"
    | "options"
    | "origin"
    | "range"
    | "target"
    | "token";
interface ContextualRollOptions {
    postRoll?: string[];
}
interface CheckContextChatFlag extends Required<Omit<CheckCheckContext, ContextFlagOmission>> {
    actor: string | null;
    token: string | null;
    item?: string;
    dc?: Omit<CheckDC, "statistic"> | null;
    dosAdjustments?: DegreeAdjustmentsRecord;
    roller?: "origin" | "target";
    origin: ActorTokenFlag | null;
    target: ActorTokenFlag | null;
    altUsage?: "thrown" | "melee" | null;
    notes: RollNoteSource[];
    options: string[];
    contextualOptions?: ContextualRollOptions;
}
interface DamageDamageContextFlag extends Required<Omit<DamageDamageContext, ContextFlagOmission | "self">> {
    actor: string | null;
    token: string | null;
    item?: string;
    mapIncreases?: ZeroToTwo;
    target: ActorTokenFlag | null;
    notes: RollNoteSource[];
    options: string[];
    contextualOptions?: ContextualRollOptions;
}
interface SpellCastContextFlag {
    type: "spell-cast";
    domains: string[];
    options: string[];
    outcome?: DegreeOfSuccessString;
    /** The roll mode (i.e., 'roll', 'blindroll', etc) to use when rendering this roll. */
    rollMode?: RollMode;
}
interface AreaAttackContextFlag {
    type: "area-fire" | "auto-fire";
    area: {
        type: EffectAreaShape;
        value: number;
    };
    identifier: string;
    domains: string[];
    options: string[];
    outcome?: never;
}
interface SelfEffectContextFlag {
    type: "self-effect";
    item: string;
    domains?: never;
    options?: never;
    outcome?: never;
}
interface DamageTakenContextFlag {
    type: "damage-taken";
    domains?: string[];
    options?: string[];
    outcome?: never;
}
interface AppliedDamageFlag {
    uuid: ActorUUID;
    isHealing: boolean;
    isReverted?: boolean;
    persistent: string[];
    shield: {
        id: string;
        damage: number;
    } | null;
    updates: {
        path: string;
        value: number;
    }[];
}
export type {
    ActorTokenFlag,
    AppliedDamageFlag,
    AreaAttackContextFlag,
    ChatContextFlag,
    ChatMessageFlagsPF2e,
    ChatMessageSourcePF2e,
    CheckContextChatFlag,
    DamageDamageContextFlag,
    DamageRollFlag,
};
