import { ActorPF2e } from "../pf2e/module/actor/base.js";
import { CharacterPF2e } from "../pf2e/module/actor/character/document.js";
import { LootPF2e } from "../pf2e/module/actor/loot/document.js";
import { EquipmentFilters } from "../pf2e/module/apps/compendium-browser/tabs/data.js";
import { TokenPF2e } from "../pf2e/module/canvas/token/object.js";
import { ItemPF2e } from "../pf2e/module/item/base/document.js";
import { FeatPF2e } from "../pf2e/module/item/feat/document.js";
import { CoinsPF2e } from "../pf2e/module/item/physical/coins.js";
import { Coins } from "../pf2e/module/item/physical/data.js";
import { PhysicalItemPF2e } from "../pf2e/module/item/physical/document.js";
import { TokenDocumentPF2e } from "../pf2e/module/scene/token-document/document.js";

export { };

declare global {
    class pf2eToolbeltModule extends Module {
        api: {
            actionable: {
                getActionMacro: (item: Maybe<ItemPF2e>) => Promise<Macro | null>;
            };
            betterMerchant: {
                testItem: (actor: LootPF2e, item: PhysicalItemPF2e, type: pf2eToolbelt.betterMerchant.ItemFilterType, quantity?: number) => { price: CoinsPF2e; filter: pf2eToolbelt.betterMerchant.ExtractedFilter } | undefined;
                compareItemWithFilter: (item: PhysicalItemPF2e, filter: Partial<EquipmentFilters>) => boolean;
            }
            stances: {
                canUseStances: (actor: CharacterPF2e) => boolean;
                //getStances: (actor: CharacterPF2e) => toolbelt.stances.StanceData[];
                isValidStance: (stance: ItemPF2e) => stance is FeatPF2e<ActorPF2e>;
                toggleStance: (
                    actor: CharacterPF2e,
                    effectUUID: string,
                    force?: boolean
                ) => Promise<void>;
            };
            heroActions: {
                canTrade: () => boolean;
                discardHeroActions: (actor: CharacterPF2e, uuids: string[] | string) => void;
                drawHeroAction: () => Promise<
                    | {
                        uuid: string;
                        name: string | undefined;
                    }
                    | null
                    | undefined
                >;
                drawHeroActions: (actor: CharacterPF2e) => Promise<void>;
                getDeckTable: () => Promise<RollTable | undefined>;
                getHeroActionDetails: (uuid: string) => Promise<
                    | {
                        name: string;
                        description: string;
                    }
                    | undefined
                >;
                //getHeroActions: (actor: CharacterPF2e) => toolbelt.heroActions.HeroActionFlag[];
                giveHeroActions: (actor: CharacterPF2e) => Promise<null | undefined>;
                removeHeroActions: () => Promise<void>;
                sendActionToChat: (actor: CharacterPF2e, uuid: string) => Promise<void>;
                tradeHeroAction: (actor: CharacterPF2e, app?: Application) => Promise<void>;
                useHeroAction: (actor: CharacterPF2e, uuid: string) => Promise<void>;
                usesCountVariant: () => boolean;
            };
            identify: {
                openTracker: (item?: ItemPF2e) => void;
                requestIdentify: (item: ItemPF2e, skipNotify?: boolean) => void;
            };
        };
    }

    interface ClientSettings {
        get(module: "pf2e-toolbelt", setting: "actionable.enabled"): boolean;
        get(module: "pf2e-toolbelt", setting: "arp.enabled"): boolean;
        get(module: "pf2e-toolbelt", setting: "arp.forced"): boolean;
        get(module: "pf2e-toolbelt", setting: "betterBrowser.noDuplicates"): boolean;
        get(module: "pf2e-toolbelt", setting: "betterMerchant.enabled"): boolean;
        get(module: "pf2e-toolbelt", setting: "betterMerchant.servicesTop"): boolean;

        set(module: "pf2e-toolbelt", setting: "actionable.enabled", value: boolean): Promise<boolean>;
        set(module: "pf2e-toolbelt", setting: "arp.enabled", value: boolean): Promise<boolean>;
        set(module: "pf2e-toolbelt", setting: "arp.forced", value: boolean): Promise<boolean>;
        set(module: "pf2e-toolbelt", setting: "betterBrowser.noDuplicates", value: boolean): Promise<boolean>;
        get(module: "pf2e-toolbelt", setting: "betterMerchant.enabled", value: boolean): Promise<boolean>;
        get(module: "pf2e-toolbelt", setting: "betterMerchant.servicesTop", value: boolean): Promise<boolean>;
    }

    namespace pf2eToolbelt {
        namespace betterMerchant {
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

            type TraderData = {
                actor: ActorPF2e;
                token?: TokenPF2e;
            };

            type ServiceCardData = {
                actor: ActorPF2e;
                tokenId: string | undefined;
                service: ServiceData;
                tradeMsg?: string;
            };

            type ServiceExportData = {
                id: string;
                name: string;
                json: string;
            };

            type ServicesExportRenderData = {
                services: Iterable<ServiceExportData>;
                hasMany: boolean;
            };

            type ServiceMsgFlag = {
                buyerUUID: string;
                sellerUUID: string;
                serviceId: string;
                forceFree: boolean;
            };

            type ServiceMsgOptions = {
                token?: TokenPF2e | TokenDocumentPF2e | null;
                tradeMsg?: string;
                flags?: ServiceMsgFlag;
            };

            type ServiceData = Required<ServiceFlag> & {
                enrichedDescription: string;
                enrichedPrice: string;
                isInfinite: boolean;
                macro: Macro | null;
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

            type ServiceRenderOptions = ApplicationRenderOptions & {
                service: ServiceFlag | null;
            };

            type ServiceContext = {
                service: ServiceData | null;
            };

            type ServiceMacroData = {
                actor: ActorPF2e;
                service: {
                    seller: LootPF2e;
                    usedPrice: CoinsPF2e | null;
                    serviceRatio: number;
                    originalPrice: CoinsPF2e;
                    name: string;
                    level: number;
                    quantity: number;
                    forceFree: boolean;
                };
            };

        }
    }

    interface ActorFlagsPF2e {
        "pf2e-toolbelt"?: boolean;
    }
}

declare module "../pf2e/module/item/base/data/system.ts" {
    interface ItemFlagsPF2e {
        "pf2e-toolbelt"?: {
            actionable?: {
                macro?: string;
            }
        }
    }
}

declare module "../pf2e/module/actor/base.js" {
    interface ActorPF2e {
        getFlag(scope: "pf2e-toolbelt", key: string): boolean;
    }
}
/*declare module "../pf2e/module/actor/data/base.ts" {
    type ActorFlagsPF2e {

    }
}*/