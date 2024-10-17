import { ActorPF2e } from "../pf2e/module/actor/base.js";
import { RawModifier } from "../pf2e/module/actor/modifiers.js";
import { ChatMessagePF2e } from "../pf2e/module/chat-message/document.js";
import { ItemPF2e } from "../pf2e/module/item/index.js";
import { TokenDocumentPF2e } from "../pf2e/module/scene/index.js";

export {};

declare global {
    namespace pf2eModifiersMatter {
        export type Degree = "CRIT_SUCC" | "SUCCESS" | "FAILURE" | "CRIT_FAIL";

        export type SignificantModifier = {
            appliedTo: "roll" | "dc";
            name: string;
            value: number;
            significance: "ESSENTIAL" | "HELPFUL" | "HARMFUL" | "DETRIMENTAL";
        };

        export type InsignificantModifier = {
            appliedTo: "roll" | "dc";
            name: string;
            value: number;
            significance: "NONE";
        };
    }

    interface Window {
        pf2eMm?: {
            getSignificantModifiersOfMessage(chatMessage: ChatMessagePF2e): pf2eModifiersMatter.SignificantModifier[];

            checkIfChatMessageShouldHaveHighlights(chatMessage: ChatMessagePF2e): boolean;

            exampleHookCourageousAnthem(): Function;

            DEGREES: {
                ESSENTIAL: "ESSENTIAL";
                HELPFUL: "HELPFUL";
                NONE: "NONE";
                HARMFUL: "HARMFUL";
                DETRIMENTAL: "DETRIMENTAL";
            };

            IGNORED_MODIFIER_LABELS: Set<string>;

            IGNORED_MODIFIER_SLUGS: Set<string>;

            IGNORED_MODIFIER_LABELS_FOR_AC_ONLY: Set<string>;

            parsePf2eChatMessageWithRoll(chatMessage: ChatMessagePF2e): {
                rollingActor: ActorPF2e;
                deltaFromDc: number;
                dieRoll: number;
                currentDegreeOfSuccess: pf2eModifiersMatter.Degree;
                dcSlug: string;
                isStrike: boolean;
                isSpell: boolean;
                targetedToken?: TokenDocumentPF2e;
                targetedActor?: ActorPF2e;
                originItem?: ItemPF2e;
                allModifiersInChatMessage: RawModifier[];
            };

            filterRollModsFromChatMessage({
                allModifiersInChatMessage,
                rollingActor,
                isStrike,
            }: {
                allModifiersInChatMessage: RawModifier[];
                rollingActor: ActorPF2e;
                isStrike: boolean;
            }): RawModifier[];

            getDcModsAndDcActor({
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
            }): {
                dcMods: RawModifier[];
                actorWithDc?: ActorPF2e;
            };

            calcSignificantModifiers({
                rollMods,
                dcMods,
                originalDeltaFromDc,
                dieRoll,
                currentDegreeOfSuccess,
                isStrike,
            }: {
                rollMods: RawModifier[];
                dcMods: RawModifier[];
                originalDeltaFromDc: number;
                dieRoll: number;
                currentDegreeOfSuccess: pf2eModifiersMatter.Degree;
                isStrike: boolean;
            }): {
                significantRollModifiers: pf2eModifiersMatter.SignificantModifier[];
                significantDcModifiers: pf2eModifiersMatter.SignificantModifier[];
                insignificantDcModifiers: pf2eModifiersMatter.InsignificantModifier[];
            };

            checkHighlightPotentials({
                rollMods,
                dcMods,
                originalDeltaFromDc,
                dieRoll,
                currentDegreeOfSuccess,
                isStrike,
            }: {
                rollMods: RawModifier[];
                dcMods: RawModifier[];
                originalDeltaFromDc: number;
                dieRoll: number;
                currentDegreeOfSuccess: pf2eModifiersMatter.Degree;
                isStrike: boolean;
            }): {
                plus1StatusHasPotential: boolean;
                plus2StatusHasPotential: boolean;
                plus2CircumstanceAcHasPotential: boolean;
            };
        };
    }

    interface ClientSettings {
        get(module: "pf2e-modifiers-matter", setting: "always-show-highlights-to-everyone"): boolean;
        get(module: "pf2e-modifiers-matter", setting: "additional-ignored-labels"): string;
        get(module: "pf2e-modifiers-matter", setting: "always-show-defense-conditions"): boolean;
        get(module: "pf2e-modifiers-matter", setting: "ignore-crit-fail-over-fail-on-attacks"): boolean;
        get(
            module: "pf2e-modifiers-matter",
            setting: "highlight-potentials-preset"
        ): "disabled" | "1_status" | "2_status" | "2_circumstance_ac";

        set(
            module: "pf2e-modifiers-matter",
            setting: "always-show-highlights-to-everyone",
            value: boolean
        ): Promise<boolean>;
        set(module: "pf2e-modifiers-matter", setting: "additional-ignored-labels", value: string): Promise<string>;
        set(
            module: "pf2e-modifiers-matter",
            setting: "always-show-defense-conditions",
            value: boolean
        ): Promise<boolean>;
        set(
            module: "pf2e-modifiers-matter",
            setting: "ignore-crit-fail-over-fail-on-attacks",
            value: boolean
        ): Promise<boolean>;
        set(
            module: "pf2e-modifiers-matter",
            setting: "highlight-potentials-preset",
            value: "disabled" | "1_status" | "2_status" | "2_circumstance_ac"
        ): Promise<"disabled" | "1_status" | "2_status" | "2_circumstance_ac">;
    }

    /*namespace Hooks {
        function on(
            ...args: HookParameters<
                "modifiersMatter",
                [
                    {
                        rollingActor: ActorPF2e;
                        actorWithDc?: ActorPF2e;
                        targetedToken?: TokenDocumentPF2e;
                        significantModifiers: pf2eModifiersMatter.SignificantModifier[];
                        chatMessage: ChatMessagePF2e;
                    }
                ]
            >
        ): number;

        function callAll(
            hook: "modifiersMatter",
            {
                rollingActor,
                actorWithDc,
                targetedToken,
                significantModifiers,
                chatMessage,
            }: {
                rollingActor: ActorPF2e;
                actorWithDc?: ActorPF2e;
                targetedToken?: TokenDocumentPF2e;
                significantModifiers: pf2eModifiersMatter.SignificantModifier[];
                chatMessage: ChatMessagePF2e;
            }
        ): boolean;

        function call(
            hook: "modifiersMatter",
            {
                rollingActor,
                actorWithDc,
                targetedToken,
                significantModifiers,
                chatMessage,
            }: {
                rollingActor: ActorPF2e;
                actorWithDc?: ActorPF2e;
                targetedToken?: TokenDocumentPF2e;
                significantModifiers: pf2eModifiersMatter.SignificantModifier[];
                chatMessage: ChatMessagePF2e;
            }
        ): boolean;

        namespace pf2eModifiersMatter {
            export type Degree = "CRIT_SUCC" | "SUCCESS" | "FAILURE" | "CRIT_FAIL";

            export type SignificantModifier = {
                appliedTo: "roll" | "dc";
                name: string;
                value: number;
                significance: "ESSENTIAL" | "HELPFUL" | "HARMFUL" | "DETRIMENTAL";
            };

            export type InsignificantModifier = {
                appliedTo: "roll" | "dc";
                name: string;
                value: number;
                significance: "NONE";
            };
        }
    }*/
}
