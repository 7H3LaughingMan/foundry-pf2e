import { ActorPF2e } from "../pf2e/module/actor/index.js";
import { RawModifier } from "../pf2e/module/actor/modifiers.js";
import { ChatMessagePF2e } from "../pf2e/module/chat-message/index.js";
import { ItemPF2e } from "../pf2e/module/item/index.js";
import { TokenDocumentPF2e } from "../pf2e/module/scene/index.js";

export {};

declare global {
    namespace PF2e_Modifiers_Matter {
        interface HookParameters {
            rollingActor: ActorPF2e;
            actorWithDc?: ActorPF2e;
            targetedToken?: TokenDocumentPF2e;
            significantModifiers: SignificantModifier[];
            chatMessage: ChatMessagePF2e;
        }

        type HighlightPotentialsSetting = "disabled" | "1_status" | "2_status" | "2_circumstance_ac";

        type Degree = "CRIT_SUCC" | "SUCCESS" | "FAILURE" | "CRIT_FAIL";

        type SignificantModifier = {
            appliedTo: "roll" | "dc";
            name: string;
            value: number;
            significance: "ESSENTIAL" | "HELPFUL" | "HARMFUL" | "DETRIMENTAL";
        };

        type InsignificantModifier = {
            appliedTo: "roll" | "dc";
            name: string;
            value: number;
            significance: "NONE";
        };
    }

    interface Window {
        pf2eMm?: {
            getSignificantModifiersOfMessage(chatMessage: ChatMessagePF2e): PF2e_Modifiers_Matter.SignificantModifier[];

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
                currentDegreeOfSuccess: PF2e_Modifiers_Matter.Degree;
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
                currentDegreeOfSuccess: PF2e_Modifiers_Matter.Degree;
                isStrike: boolean;
            }): {
                significantRollModifiers: PF2e_Modifiers_Matter.SignificantModifier[];
                significantDcModifiers: PF2e_Modifiers_Matter.SignificantModifier[];
                insignificantDcModifiers: PF2e_Modifiers_Matter.InsignificantModifier[];
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
                currentDegreeOfSuccess: PF2e_Modifiers_Matter.Degree;
                isStrike: boolean;
            }): {
                plus1StatusHasPotential: boolean;
                plus2StatusHasPotential: boolean;
                plus2CircumstanceAcHasPotential: boolean;
            };
        };
    }

    interface ClientSettings {
        /** Always Show Highlights To Everyone */
        get(module: "pf2e-modifiers-matter", setting: "always-show-highlights-to-everyone"): boolean;
        /** Always Show Highlights To Everyone */
        set(
            module: "pf2e-modifiers-matter",
            setting: "always-show-highlights-to-everyone",
            value: boolean,
        ): Promise<boolean>;

        /** Additional Ignored Labels */
        get(module: "pf2e-modifiers-matter", setting: "additional-ignored-labels"): string;
        /** Additional Ignored Labels */
        set(module: "pf2e-modifiers-matter", setting: "additional-ignored-labels", value: string): Promise<string>;

        /** Always Show Defense Conditions */
        get(module: "pf2e-modifiers-matter", setting: "always-show-defense-conditions"): boolean;
        /** Always Show Defense Conditions */
        set(
            module: "pf2e-modifiers-matter",
            setting: "always-show-defense-conditions",
            value: boolean,
        ): Promise<boolean>;

        /** Ignore Crit Fail Over Fail On Attacks */
        get(module: "pf2e-modifiers-matter", setting: "ignore-crit-fail-over-fail-on-attacks"): boolean;
        /** Ignore Crit Fail Over Fail On Attacks */
        set(
            module: "pf2e-modifiers-matter",
            setting: "ignore-crit-fail-over-fail-on-attacks",
            value: boolean,
        ): Promise<boolean>;

        /** Highlight Potentials */
        get(
            module: "pf2e-modifiers-matter",
            setting: "highlight-potentials-preset",
        ): PF2e_Modifiers_Matter.HighlightPotentialsSetting;
        /** Highlight Potentials */
        set(
            module: "pf2e-modifiers-matter",
            setting: "highlight-potentials-preset",
            value: PF2e_Modifiers_Matter.HighlightPotentialsSetting,
        ): Promise<PF2e_Modifiers_Matter.HighlightPotentialsSetting>;
    }

    namespace Hooks {
        function on(...args: HookParameters<"modifiersMatter", [PF2e_Modifiers_Matter.HookParameters]>): number;

        function callAll(hook: "modifiersMatter", arg: PF2e_Modifiers_Matter.HookParameters): boolean;

        function call(hook: "modifiersMatter", arg: PF2e_Modifiers_Matter.HookParameters): boolean;
    }
}
