import { ActorPF2e } from "../pf2e/module/actor";
import { ChatMessagePF2e } from "../pf2e/module/chat-message";
import { ItemPF2e } from "../pf2e/module/item";
import { TokenDocumentPF2e } from "../pf2e/module/scene";

export {};

declare global {
    namespace PF2eModifiersMatter {
        interface InsignificantModifier {
            appliedTo: "dc" | "roll";
            name: string;
            sourceUuid: string;
            value: number;
            significance: "None";
        }

        interface SignificantModifier {
            appliedTo: "roll" | "dc";
            name: string;
            sourceUuid: string;
            value: number;
            significance: "ESSENTIAL" | "HELPFUL" | "HARMFUL" | "DETRIMENTAL";
        }

        type Degree = "CRIT_SUCC" | "SUCCESS" | "FAILURE" | "CRIT_FAIL";

        interface Modifier {
            label: string;
            modifier: number;
            type: string;
            slug: string;
            enabled: boolean;
            ignored: boolean;
        }
    }

    namespace globalThis {
        let pf2eMm: Maybe<{
            getSignificantModifiersOfMessage(chatMessage: ChatMessagePF2e): PF2eModifiersMatter.SignificantModifier[];
            checkIfChatMessageShouldHaveHighlights(chatMessage: ChatMessagePF2e): boolean;
            DEGREES: Readonly<{
                CRIT_SUCC: "CRIT_SUCC";
                SUCCESS: "SUCCESS";
                FAILURE: "FAILURE";
                CRIT_FAIL: "CRIT_FAIL";
            }>;
            IGNORED_MODIFIER_LABELS: Set<string>;
            IGNORED_MODIFIER_LABELS_HARDCODED: string[];
            IGNORED_MODIFIER_SLUGS: Set<string>;
            IGNORED_MODIFIER_SLUGS_FOR_AC_ONLY: Set<string>;
            parsePf2eChatMessageWithRoll: (chatMessage: ChatMessagePF2e) => {
                rollingActor: ActorPF2e;
                deltaFromDc: number;
                dieRoll: number;
                currentDegreeOfSuccess: PF2eModifiersMatter.Degree;
                dcSlug: string;
                isStrike: boolean;
                isSpell: boolean;
                targetedToken?: TokenDocumentPF2e;
                targetedActor?: ActorPF2e;
                originItem?: ItemPF2e;
                allModifiersInChatMessage: PF2eModifiersMatter.Modifier[];
            };
            filterOutIgnoredModifiers: (allModifiersInChatMessage: PF2eModifiersMatter.Modifier[]) => PF2eModifiersMatter.Modifier[];
            getDcModsAndDcActor: ({
                targetedActor,
                originItem,
                dcSlug,
                isStrike,
                isSpell,
                contextOptionsInFlags,
                chatMessageFlavor,
            }: {
                targetedActor?: TokenDocumentPF2e;
                originItem?: ItemPF2e;
                dcSlug: string;
                isStrike: boolean;
                isSpell: boolean;
                contextOptionsInFlags: string[];
                chatMessageFlavor: string;
            }) => {
                dcMods: PF2eModifiersMatter.Modifier[];
                actorWithDc?: ActorPF2e;
            };
            calcSignificantModifiers: ({
                rollMods,
                dcMods,
                originalDeltaFromDc,
                dieRoll,
                currentDegreeOfSuccess,
                isStrike,
            }: {
                rollMods: PF2eModifiersMatter.Modifier[];
                dcMods: PF2eModifiersMatter.Modifier[];
                originalDeltaFromDc: number;
                dieRoll: number;
                currentDegreeOfSuccess: PF2eModifiersMatter.Degree;
                isStrike: boolean;
            }) => {
                significantRollModifiers: PF2eModifiersMatter.SignificantModifier[];
                significantDcModifiers: PF2eModifiersMatter.SignificantModifier[];
                insignificantDcModifiers: PF2eModifiersMatter.InsignificantModifier[];
            };
            checkHighlightPotentials: ({
                rollMods,
                dcMods,
                originalDeltaFromDc,
                dieRoll,
                currentDegreeOfSuccess,
                isStrike,
            }: {
                rollMods: PF2eModifiersMatter.Modifier[];
                dcMods: PF2eModifiersMatter.Modifier[];
                originalDeltaFromDc: number;
                dieRoll: number;
                currentDegreeOfSuccess: PF2eModifiersMatter.Degree;
                isStrike: boolean;
            }) => {
                plus1StatusHasPotential: boolean;
                plus2StatusHasPotential: boolean;
                plus2CircumstanceAcHasPotential: boolean;
            };
        }>;
    }
}
