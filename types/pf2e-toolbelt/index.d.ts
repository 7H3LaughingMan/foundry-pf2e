import { ActorPF2e, CharacterPF2e, LootPF2e } from "../pf2e/module/actor/index.js";
import { SaveType } from "../pf2e/module/actor/types.js";
import { EquipmentFilters } from "../pf2e/module/apps/compendium-browser/tabs/data.js";
import { ChatMessagePF2e, ChatMessageSourcePF2e } from "../pf2e/module/chat-message/index.js";
import { AbilityItemPF2e, FeatPF2e, ItemPF2e } from "../pf2e/module/item/index.js";
import { Coins, CoinsPF2e, PhysicalItemPF2e, PhysicalItemType } from "../pf2e/module/item/physical/index.js";
import { RollNoteSource } from "../pf2e/module/notes.js";
import { TokenDocumentPF2e } from "../pf2e/module/scene/index.js";
import { CheckRoll } from "../pf2e/module/system/check/roll.js";
import { DegreeAdjustmentsRecord, DegreeOfSuccessString } from "../pf2e/module/system/degree-of-success.js";

export {};

declare global {
    namespace PF2e_Toolbelt {
        namespace BetterMerchant {
            type BuyMaxSetting = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
            type SellMaxSetting = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
            type ServicesMaxSetting = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

            type ItemFilterType = "buy" | "sell";

            type ItemFilter = ItemFilterBuy | ItemFilterSell;

            type ItemFilterBase = {
                id: string;
                name: string;
                enabled: boolean;
                locked?: true;
                useDefault: boolean;
                ratio?: number;
                purse?: number | null;
                filter: Partial<EquipmentFilters>;
            };

            type ItemFilterBuy = ItemFilterBase & {};

            type ItemFilterSell = ItemFilterBase & {};

            type ExtractedFilter<F extends ItemFilter = ItemFilter> = Omit<F, "ratio" | "purse"> & {
                ratio: number;
                purse: number;
            };

            type ServiceFlag = {
                id: string;
                level?: number;
                name?: string;
                description?: string;
                price?: Coins;
                enabled?: boolean;
                img?: string;
                quantity?: number;
                macroUUID?: string;
            };
        }

        namespace Giveth {
            type EffectSetting = "disabled" | "ally" | "all";
        }

        namespace HeroActions {
            type CountSetting = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
            type HeroActionFlag = { uuid: string; name: string };
        }

        namespace Identify {
            type IdentifyFailedFlag = Record<string, string>;

            type IdenfifiedFlag = Partial<
                Record<
                    PhysicalItemType,
                    {
                        itemSlug: string;
                        itemName?: string;
                        partialSlug?: string;
                    }[]
                >
            >;
        }

        namespace MergeDamage {
            type MessageData = {
                source: PreCreate<ChatMessageSourcePF2e>;
                name: string;
                notes: string;
                outcome: DegreeOfSuccessString | null;
                options: string[];
                modifiers: string;
                tags: string;
            };
        }

        namespace Share {
            type ConfigFlags = {
                turn: boolean;
                armor: boolean;
                weapon: boolean;
                skills: boolean;
                health: boolean;
                hero: boolean;
                master: string;
            };
        }

        namespace TargetHelper {
            type MessageSaveFlag = {
                statistic: SaveType;
                basic: boolean;
                dc: number;
                author?: string;
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
                significantModifiers:
                    | {
                          appliedTo: "roll" | "dc";
                          name: string;
                          value: number;
                          significance: "ESSENTIAL" | "HELPFUL" | "HARMFUL" | "DETRIMENTAL";
                      }
                    | undefined;
                rerolled?: "hero" | "new" | "lower" | "higher";
            };

            type TargetMessageType = "damage" | "spell-damage" | "spell-save" | "action" | "check";

            type MessageFlag = {
                type?: TargetMessageType;
                targets?: string[];
                save?: MessageSaveFlag;
                saves?: Record<string, MessageTargetSave>;
                splashIndex?: number;
                isRegen?: boolean;
                applied?: Record<string, boolean[]>;
                options?: string[];
                traits?: string[];
                item?: ItemUUID;
                splashTargets?: string[];
            };

            type RollSaveHook = {
                roll: Rolled<CheckRoll>;
                message: ChatMessagePF2e;
                rollMessage: ChatMessagePF2e;
                target: TokenDocumentPF2e;
                data: MessageTargetSave;
            };

            type RerollSaveHook = {
                oldRoll: Rolled<CheckRoll>;
                newRoll: Rolled<CheckRoll>;
                keptRoll: Rolled<CheckRoll>;
                message: ChatMessagePF2e;
                target: TokenDocumentPF2e;
                data: MessageTargetSave;
            };
        }

        namespace TemplateHelper {
            type DismissSetting = "disabled" | "orphan" | "all";
        }

        namespace Underground {
            type ModeSetting = "normal" | "greyscale" | "sepia";
            type AlphaSetting = 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;
            type ContrastSetting = 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;
        }
    }

    class PF2e_Toolbelt_Module extends Module {
        api: {
            actionable: {
                getActionMacro(item: Maybe<ItemPF2e>): Promise<Macro | null>;
            };
            betterMerchant: {
                compareItemWithFilter(item: PhysicalItemPF2e, filter: Partial<EquipmentFilters>): boolean;
                testItem(
                    actor: LootPF2e,
                    item: PhysicalItemPF2e,
                    type: PF2e_Toolbelt.BetterMerchant.ItemFilterType,
                    quantity?: number,
                ): { price: CoinsPF2e; filter: PF2e_Toolbelt.BetterMerchant.ExtractedFilter } | undefined;
            };
            droppeth: {
                droppethRequest(
                    options: {
                        item: PhysicalItemPF2e | string;
                        x: number;
                        y: number;
                        quantity?: number;
                    },
                    userId?: string,
                ): void;
            };
            giveth: {
                canDropEffectOnActor(item: ItemPF2e, actor: ActorPF2e): boolean;
            };
            heroActions: {
                canTrade(): boolean;
                discardHeroActions(actor: CharacterPF2e, uuids: string[] | string): void;
                drawHeroAction(): Promise<{ uuid: string; name: string | undefined } | null | undefined>;
                drawHeroActions(actor: CharacterPF2e): Promise<void>;
                getDeckTable(): Promise<RollTable | undefined>;
                getHeroActionDetails(uuid: string): Promise<{ name: string; description: string } | undefined>;
                getHeroActions(actor: CharacterPF2e): { uuid: string; name?: string | undefined }[];
                giveHeroActions(actor: CharacterPF2e): Promise<null | undefined>;
                removeHeroActions(): Promise<void>;
                sendActionToChat(actor: CharacterPF2e, uuid: string): Promise<void>;
                tradeHeroAction(actor: CharacterPF2e): Promise<void>;
                usesCountVariant(): boolean;
                useHeroAction(actor: CharacterPF2e, uuid: string): Promise<void>;
            };
            identify: {
                openTracker(item?: ItemPF2e): void;
                requestIdentify(item: ItemPF2e, skipNotify?: boolean): void;
            };
            stances: {
                canUseStances(actor: CharacterPF2e): boolean;
                getStances(actor: CharacterPF2e): {
                    name: string;
                    itemName: string;
                    uuid: string;
                    img: string;
                    effectUUID: string;
                    effectID: string | undefined;
                    actionUUID: string;
                    actionID: string;
                }[];
                isValidStance(stance: ItemPF2e): stance is FeatPF2e | AbilityItemPF2e;
                toggleStance(actor: CharacterPF2e, effectUUID: string, force?: boolean): Promise<void>;
            };
        };
    }

    interface ClientSettings {
        // #region Actionable
        /** Actionable - Enabled */
        get(module: "pf2e-toolbelt", setting: "actionable.enabled"): boolean;
        /** Actionable - Enabled */
        set(module: "pf2e-toolbelt", setting: "actionable.enabled", value: boolean): Promise<boolean>;
        // #endregion

        // #region Automatic Rune Progression
        /** Automatic Rune Progression - Enabled */
        get(module: "pf2e-toolbelt", setting: "arp.enabled"): boolean;
        /** Automatic Rune Progression - Force Update */
        get(module: "pf2e-toolbelt", setting: "arp.force"): boolean;
        /** Automatic Rune Progression - Enabled */
        set(module: "pf2e-toolbelt", setting: "arp.enabled", value: boolean): Promise<boolean>;
        /** Automatic Rune Progression - Force Update */
        set(module: "pf2e-toolbelt", setting: "arp.force", value: boolean): Promise<boolean>;
        // #endregion

        // #region Better Merchant
        /** Better Merchant - Enabled */
        get(module: "pf2e-toolbelt", setting: "betterMerchant.enabled"): boolean;
        /** Better Merchant - Services Above Items */
        get(module: "pf2e-toolbelt", setting: "betterMerchant.servicesTop"): boolean;
        /** Better Merchant - Buy Max Ratio */
        get(module: "pf2e-toolbelt", setting: "betterMerchant.buyMax"): PF2e_Toolbelt.BetterMerchant.BuyMaxSetting;
        /** Better Merchant - Sell Max Ratio */
        get(module: "pf2e-toolbelt", setting: "betterMerchant.sellMax"): PF2e_Toolbelt.BetterMerchant.SellMaxSetting;
        /** Better Merchant - Service Max Ratio */
        get(
            module: "pf2e-toolbelt",
            setting: "betterMerchant.servicesMax",
        ): PF2e_Toolbelt.BetterMerchant.ServicesMaxSetting;
        /** Better Merchant - Enabled */
        set(module: "pf2e-toolbelt", setting: "betterMerchant.enabled", value: boolean): Promise<boolean>;
        /** Better Merchant - Services Above Items */
        set(module: "pf2e-toolbelt", setting: "betterMerchant.servicesTop", value: boolean): Promise<boolean>;
        /** Better Merchant - Buy Max Ratio */
        set(
            module: "pf2e-toolbelt",
            setting: "betterMerchant.buyMax",
            value: PF2e_Toolbelt.BetterMerchant.BuyMaxSetting,
        ): Promise<PF2e_Toolbelt.BetterMerchant.BuyMaxSetting>;
        /** Better Merchant - Sell Max Ratio */
        set(
            module: "pf2e-toolbelt",
            setting: "betterMerchant.sellMax",
            value: PF2e_Toolbelt.BetterMerchant.SellMaxSetting,
        ): Promise<PF2e_Toolbelt.BetterMerchant.SellMaxSetting>;
        /** Better Merchant - Service Max Ratio */
        set(
            module: "pf2e-toolbelt",
            setting: "betterMerchant.servicesMax",
            value: PF2e_Toolbelt.BetterMerchant.ServicesMaxSetting,
        ): Promise<PF2e_Toolbelt.BetterMerchant.ServicesMaxSetting>;
        // #endregion

        // #region Debug
        /** Debug - Enabled */
        get(module: "pf2e-toolbelt", setting: "debug.enabled"): boolean;
        /** Debug - Enabled */
        set(module: "pf2e-toolbelt", setting: "debug.enabled", value: boolean): Promise<boolean>;
        // #endregion

        // #region Droppeth
        /** Droppeth - Enabled */
        get(module: "pf2e-toolbelt", setting: "droppeth.enabled"): boolean;
        /** Droppeth - Remove on Empty */
        get(module: "pf2e-toolbelt", setting: "droppeth.removeOnEmpty"): boolean;
        /** Droppeth - Light Source */
        get(module: "pf2e-toolbelt", setting: "droppeth.light"): boolean;
        /** Droppeth - Send Message to Chat */
        get(module: "pf2e-toolbelt", setting: "droppeth.message"): boolean;
        /** Droppeth - Enabled */
        set(module: "pf2e-toolbelt", setting: "droppeth.enabled", value: boolean): Promise<boolean>;
        /** Droppeth - Remove on Empty */
        set(module: "pf2e-toolbelt", setting: "droppeth.removeOnEmpty", value: boolean): Promise<boolean>;
        /** Droppeth - Light Source */
        set(module: "pf2e-toolbelt", setting: "droppeth.light", value: boolean): Promise<boolean>;
        /** Droppeth - Send Message to Chat */
        set(module: "pf2e-toolbelt", setting: "droppeth.message", value: boolean): Promise<boolean>;
        // #endregion

        // #region Effects Panel
        /** Effects Panel - Remove Effect Shortcut */
        get(module: "pf2e-toolbelt", setting: "effectsPanel.remove"): boolean;
        /** Effects Panel - Remove Effect Shortcut */
        set(module: "pf2e-toolbelt", setting: "effectsPanel.remove", value: boolean): Promise<boolean>;
        // #endregion

        // #region Giveth
        /** Giveth - Enabled */
        get(module: "pf2e-toolbelt", setting: "giveth.enabled"): boolean;
        /** Giveth - Include Effects/Conditions */
        get(module: "pf2e-toolbelt", setting: "giveth.effect"): PF2e_Toolbelt.Giveth.EffectSetting;
        /** Giveth - Send Message to Chat */
        get(module: "pf2e-toolbelt", setting: "giveth.message"): boolean;
        /** Giveth - Enabled */
        set(module: "pf2e-toolbelt", setting: "giveth.enabled", value: boolean): Promise<boolean>;
        /** Giveth - Include Effects/Conditions */
        set(
            module: "pf2e-toolbelt",
            setting: "giveth.effect",
            value: PF2e_Toolbelt.Giveth.EffectSetting,
        ): Promise<PF2e_Toolbelt.Giveth.EffectSetting>;
        /** Giveth - Send Message to Chat */
        set(module: "pf2e-toolbelt", setting: "giveth.message", value: boolean): Promise<boolean>;
        // #endregion

        // #region Global
        /** Global - With Container Content */
        get(module: "pf2e-toolbelt", setting: "global.withContent"): boolean;
        /** Global - With Container Content */
        set(module: "pf2e-toolbelt", setting: "global.withContent", value: boolean): Promise<boolean>;
        // #endregion

        // #region Hero Actions
        /** Hero Actions - Enabled */
        get(module: "pf2e-toolbelt", setting: "heroActions.enabled"): boolean;
        /** Hero Actions - Table UUID */
        get(module: "pf2e-toolbelt", setting: "heroActions.table"): string;
        /** Hero Actions - Hero Set Variant */
        get(module: "pf2e-toolbelt", setting: "heroActions.count"): PF2e_Toolbelt.HeroActions.CountSetting;
        /** Hero Actions - Allow Trade */
        get(module: "pf2e-toolbelt", setting: "heroActions.trade"): boolean;
        /** Hero Actions - Private Draw */
        get(module: "pf2e-toolbelt", setting: "heroActions.private"): boolean;
        /** Hero Actions - Enabled */
        set(module: "pf2e-toolbelt", setting: "heroActions.enabled", value: boolean): Promise<boolean>;
        /** Hero Actions - Table UUID */
        set(module: "pf2e-toolbelt", setting: "heroActions.table", value: string): Promise<string>;
        /** Hero Actions - Hero Set Variant */
        set(
            module: "pf2e-toolbelt",
            setting: "heroActions.count",
            value: PF2e_Toolbelt.HeroActions.CountSetting,
        ): Promise<PF2e_Toolbelt.HeroActions.CountSetting>;
        /** Hero Actions - Allow Trade */
        set(module: "pf2e-toolbelt", setting: "heroActions.trade", value: boolean): Promise<boolean>;
        /** Hero Actions - Private Draw */
        set(module: "pf2e-toolbelt", setting: "heroActions.private", value: boolean): Promise<boolean>;
        // #endregion

        // #region Hide Damage
        /** Hide Damage - Enabled */
        get(module: "pf2e-toolbelt", setting: "hideDamage.enabled"): boolean;
        /** Hide Damage - Enabled */
        set(module: "pf2e-toolbelt", setting: "hideDamage.enabled", value: boolean): Promise<boolean>;
        // #endregion

        // #region Identify
        /** Identify - Enabled */
        get(module: "pf2e-toolbelt", setting: "identify.enabled"): boolean;
        /** Identify - Add Party Stash */
        get(module: "pf2e-toolbelt", setting: "identify.stash"): boolean;
        /** Identify - 24 Hours Delay */
        get(module: "pf2e-toolbelt", setting: "identify.delay"): boolean;
        /** Identify - Auto Identify Similiar Items */
        get(module: "pf2e-toolbelt", setting: "identify.identifyPartials"): boolean;
        /** Identify - Allow Player Request */
        get(module: "pf2e-toolbelt", setting: "identify.playerRequest"): boolean;
        /** Identify - Enabled */
        set(module: "pf2e-toolbelt", setting: "identify.enabled", value: boolean): Promise<boolean>;
        /** Identify - Add Party Stash */
        set(module: "pf2e-toolbelt", setting: "identify.stash", value: boolean): Promise<boolean>;
        /** Identify - 24 Hours Delay */
        set(module: "pf2e-toolbelt", setting: "identify.delay", value: boolean): Promise<boolean>;
        /** Identify - Auto Identify Similiar Items */
        set(module: "pf2e-toolbelt", setting: "identify.identifyPartials", value: boolean): Promise<boolean>;
        /** Identify - Allow Player Request */
        set(module: "pf2e-toolbelt", setting: "identify.playerRequest", value: boolean): Promise<boolean>;
        // #endregion

        // #region Merge Damages
        /** Merge Damages - Enabled */
        get(module: "pf2e-toolbelt", setting: "mergeDamage.enabled"): boolean;
        /** Merge Damages - Enabled */
        set(module: "pf2e-toolbelt", setting: "mergeDamage.enabled", value: boolean): Promise<boolean>;
        // #endregion

        // #region No Bulk
        /** No Bulk - No Dropped Bulk */
        get(module: "pf2e-toolbelt", setting: "noBulk.dropped"): boolean;
        /** No Bulk - Weightless Coins */
        get(module: "pf2e-toolbelt", setting: "noBulk.coins"): boolean;
        /** No Bulk - No Dropped Bulk */
        set(module: "pf2e-toolbelt", setting: "noBulk.dropped", value: boolean): Promise<boolean>;
        /** No Bulk - Weightless Coins */
        set(module: "pf2e-toolbelt", setting: "noBulk.coins", value: boolean): Promise<boolean>;
        // #endregion

        // #region Shared Data
        /** Shared Data - Enabled */
        get(module: "pf2e-toolbelt", setting: "share.enabled"): boolean;
        /** Shared Data - Enabled */
        set(module: "pf2e-toolbelt", setting: "share.enabled", value: boolean): Promise<boolean>;
        // #endregion

        // #region Spells Summary
        /** Spells Summary - Enabled */
        get(module: "pf2e-toolbelt", setting: "spellsSummary.enabled"): boolean;
        /** Spells Summary - Sort by Category */
        get(module: "pf2e-toolbelt", setting: "spellsSummary.sort"): boolean;
        /** Spells Summary - Enabled */
        set(module: "pf2e-toolbelt", setting: "spellsSummary.enabled", value: boolean): Promise<boolean>;
        /** Spells Summary - Sort by Category */
        set(module: "pf2e-toolbelt", setting: "spellsSummary.sort", value: boolean): Promise<boolean>;
        // #endregion

        // #region Stances
        /** Stances - Enabled */
        get(module: "pf2e-toolbelt", setting: "stances.enabled"): boolean;
        /** Stances - Enabled */
        set(module: "pf2e-toolbelt", setting: "stances.enabled", value: boolean): Promise<boolean>;
        // #endregion

        // #region Target Helper
        /** Target Helper - Enabled */
        get(module: "pf2e-toolbelt", setting: "targetHelper.enabled"): boolean;
        /** Target Helper - Add Targets to Messages */
        get(module: "pf2e-toolbelt", setting: "targetHelper.addTargets"): boolean;
        /** Target Helper - Small Buttons */
        get(module: "pf2e-toolbelt", setting: "targetHelper.smallButtons"): boolean;
        /** Target Helper - Enabled */
        set(module: "pf2e-toolbelt", setting: "targetHelper.enabled", value: boolean): Promise<boolean>;
        /** Target Helper - Add Targets to Messages */
        set(module: "pf2e-toolbelt", setting: "targetHelper.addTargets", value: boolean): Promise<boolean>;
        /** Target Helper - Small Buttons */
        set(module: "pf2e-toolbelt", setting: "targetHelper.smallButtons", value: boolean): Promise<boolean>;
        // #endregion

        // #region Template Helper
        /** Template Helper - Enabled */
        get(module: "pf2e-toolbelt", setting: "templateHelper.enabled"): boolean;
        /** Template Helper - Auto Dismiss */
        get(module: "pf2e-toolbelt", setting: "dismiss.enabled"): PF2e_Toolbelt.TemplateHelper.DismissSetting;
        /** Template Helper - Enabled */
        set(module: "pf2e-toolbelt", setting: "templateHelper.enabled", value: boolean): Promise<boolean>;
        /** Template Helper - Auto Dismiss */
        set(
            module: "pf2e-toolbelt",
            setting: "dismiss.enabled",
            value: PF2e_Toolbelt.TemplateHelper.DismissSetting,
        ): Promise<PF2e_Toolbelt.TemplateHelper.DismissSetting>;
        // #endregion

        // #region Underground
        /** Underground - Enabled */
        get(module: "pf2e-toolbelt", setting: "underground.enabled"): boolean;
        /** Underground - Applied Filter */
        get(module: "pf2e-toolbelt", setting: "underground.mode"): PF2e_Toolbelt.Underground.ModeSetting;
        /** Underground - Opacity */
        get(module: "pf2e-toolbelt", setting: "underground.alpha"): PF2e_Toolbelt.Underground.AlphaSetting;
        /** Underground - Contrast */
        get(module: "pf2e-toolbelt", setting: "underground.contrast"): PF2e_Toolbelt.Underground.ContrastSetting;
        /** Underground - Enabled */
        set(module: "pf2e-toolbelt", setting: "underground.enabled", value: boolean): Promise<boolean>;
        /** Underground - Applied Filter */
        set(
            module: "pf2e-toolbelt",
            setting: "underground.mode",
            value: PF2e_Toolbelt.Underground.ModeSetting,
        ): Promise<PF2e_Toolbelt.Underground.ModeSetting>;
        /** Underground - Opacity */
        set(
            module: "pf2e-toolbelt",
            setting: "underground.alpha",
            value: PF2e_Toolbelt.Underground.AlphaSetting,
        ): Promise<PF2e_Toolbelt.Underground.AlphaSetting>;
        /** Underground - Contrast */
        set(
            module: "pf2e-toolbelt",
            setting: "underground.contrast",
            value: PF2e_Toolbelt.Underground.ContrastSetting,
        ): Promise<PF2e_Toolbelt.Underground.ContrastSetting>;
        // #endregion

        // #region Set Un-Identified Image
        /** Set Un-Identified Image - On Item Creation */
        get(module: "pf2e-toolbelt", setting: "unided.create"): boolean;
        /** Set Un-Identified Image - On Item Update */
        get(module: "pf2e-toolbelt", setting: "unided.update"): boolean;
        /** Set Un-Identified Image - On Item Creation */
        set(module: "pf2e-toolbelt", setting: "unided.create", value: boolean): Promise<boolean>;
        /** Set Un-Identified Image - On Item Update */
        set(module: "pf2e-toolbelt", setting: "unided.update", value: boolean): Promise<boolean>;
        // #endregion

        // #region De-targeting
        /** De-targeting - Force De-targeting */
        get(module: "pf2e-toolbelt", setting: "untarget.force"): boolean;
        /** De-targeting - Enabled */
        get(module: "pf2e-toolbelt", setting: "untarget.enabled"): boolean;
        /** De-targeting - Force De-targeting */
        set(module: "pf2e-toolbelt", setting: "untarget.force", value: boolean): Promise<boolean>;
        /** De-targeting - Enabled */
        set(module: "pf2e-toolbelt", setting: "untarget.enabled", value: boolean): Promise<boolean>;
        // #endregion

        // #region Use Button
        /** Use Button - Add To Consumables */
        get(module: "pf2e-toolbelt", setting: "useButton.consumables"): boolean;
        /** Use Button - Auto Self-Applied */
        get(module: "pf2e-toolbelt", setting: "useButton.selfApplied"): boolean;
        /** Use Button - Add To Consumables */
        set(module: "pf2e-toolbelt", setting: "useButton.consumables", value: boolean): Promise<boolean>;
        /** Use Button - Auto Self-Applied */
        set(module: "pf2e-toolbelt", setting: "useButton.selfApplied", value: boolean): Promise<boolean>;
        // #endregion
    }

    namespace Hooks {
        function on(
            ...args: HookParameters<"pf2e-toolbelt.rollSave", [PF2e_Toolbelt.TargetHelper.RollSaveHook]>
        ): number;
        function on(
            ...args: HookParameters<"pf2e-toolbelt.rerollSave", [PF2e_Toolbelt.TargetHelper.RerollSaveHook]>
        ): number;
    }
}

declare module "../index.js" {
    interface GamePF2e {
        toolbelt?: {
            api: PF2e_Toolbelt_Module["api"];
            active: boolean;
            getToolSetting(name: string, setting: string): unknown;
        };
    }

    interface ItemFlagsPF2e {
        "pf2e-toolbelt"?: {
            actionable?: {
                macro?: string;
            };
            identify?: {
                failed?: PF2e_Toolbelt.Identify.IdentifyFailedFlag;
            };
        };
    }

    interface ChatMessageFlagsPF2e {
        "pf2e-toolbelt"?: {
            hideDamage?: {
                revealed?: boolean;
            };
            mergeDamage?: {
                data?: PF2e_Toolbelt.MergeDamage.MessageData[];
                injected?: boolean;
                merged?: boolean;
                splitted?: boolean;
                type?: string;
            };
            targetHelper?: PF2e_Toolbelt.TargetHelper.MessageFlag;
        };
    }

    interface ActorFlagsPF2e {
        "pf2e-toolbelt"?: {
            betterMerchant?: {
                default?: {
                    buy?: PF2e_Toolbelt.BetterMerchant.ItemFilter;
                    sell?: PF2e_Toolbelt.BetterMerchant.ItemFilter;
                };
                filters?: {
                    buy?: PF2e_Toolbelt.BetterMerchant.ItemFilter[];
                    sell?: PF2e_Toolbelt.BetterMerchant.ItemFilter[];
                };
                infiniteAll?: boolean;
                services?: PF2e_Toolbelt.BetterMerchant.ServiceFlag[];
                serviceRatio?: number;
            };
            droppeth?: {
                temporary?: boolean;
                tokenUuid?: string;
            };
            heroActions?: {
                actions?: PF2e_Toolbelt.HeroActions.HeroActionFlag[];
            };
            identify?: {
                identified: PF2e_Toolbelt.Identify.IdenfifiedFlag;
            };
            share?: {
                config?: PF2e_Toolbelt.Share.ConfigFlags;
            };
        };
    }
}
