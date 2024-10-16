import { ActorPF2e, LootPF2e } from "types/pf2e/module/actor/index.ts";
import { ItemPF2e, PhysicalItemPF2e } from "types/pf2e/module/item/index.ts";
import { CoinsPF2e } from "types/pf2e/module/item/physical/coins.ts";
import { Coins } from "types/pf2e/module/item/physical/index.ts";
import { EquipmentFilters } from "types/pf2e/module/apps/compendium-browser/tabs/data.ts";
import { TokenPF2e } from "types/pf2e/module/canvas/index.ts";

export {};

declare global {
    namespace pf2eToolbelt {
        namespace actionable {}

        namespace arp {}

        namespace betterBrowser {}

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

            type ServiceMsgFlag = {
                buyerUUID: string;
                sellerUUID: string;
                serviceId: string;
                forceFree: boolean;
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
        }
    }

    class pf2eToolbeltModule extends Module {
        api: {
            actionable: {
                getActionMacro(item: Maybe<ItemPF2e>): Promise<Macro | null>;
            };
            betterMerchant: {
                compareItemWithFilter(item: PhysicalItemPF2e, filter: Partial<EquipmentFilters>): boolean;
                testItem(
                    actor: LootPF2e,
                    item: PhysicalItemPF2e,
                    type: pf2eToolbelt.betterMerchant.ItemFilter,
                    quantity?: number
                ): { price: CoinsPF2e; filter: pf2eToolbelt.betterMerchant.ExtractedFilter } | undefined;
            };
        };
    }

    interface ClientSettings {
        get(module: "pf2e-toolbelt", setting: "actionable.enabled"): boolean;
        get(module: "pf2e-toolbelt", setting: "arp.enabled"): boolean;
        get(module: "pf2e-toolbelt", setting: "arp.force"): boolean;
        get(module: "pf2e-toolbelt", setting: "betterBrowser.noDuplicates"): boolean;
        get(module: "pf2e-toolbelt", setting: "betterMerchant.enabled"): boolean;
        get(module: "pf2e-toolbelt", setting: "betterMerchant.servicesTop"): boolean;

        set(module: "pf2e-toolbelt", setting: "actionable.enabled", value: boolean): Promise<boolean>;
        set(module: "pf2e-toolbelt", setting: "arp.enabled", value: boolean): Promise<boolean>;
        set(module: "pf2e-toolbelt", setting: "arp.force", value: boolean): Promise<boolean>;
        set(module: "pf2e-toolbelt", setting: "betterBrowser.noDuplicates", value: boolean): Promise<boolean>;
        set(module: "pf2e-toolbelt", setting: "betterMerchant.enabled", value: boolean): Promise<boolean>;
        set(module: "pf2e-toolbelt", setting: "betterMerchant.servicesTop", value: boolean): Promise<boolean>;
    }
}

declare module "@item/base/data/system.js" {
    interface ItemFlagsPF2e {
        "pf2e-toolbelt"?: {
            actionable?: {
                macro?: string;
            };
        };
    }
}

declare module "@module/chat-message/data.js" {
    interface ChatMessageFlagsPF2e {
        "pf2e-toolbelt"?: {
            betterMerchant?: {
                service?: pf2eToolbelt.betterMerchant.ServiceMsgFlag;
            };
        };
    }
}

declare module "@actor/data/base.js" {
    interface ActorFlagsPF2e {
        "pf2e-toolbelt"?: {
            betterMerchant?: {
                default?: {
                    buy?: pf2eToolbelt.betterMerchant.ItemFilter;
                    sell?: pf2eToolbelt.betterMerchant.ItemFilter;
                };
                filters?: {
                    buy?: pf2eToolbelt.betterMerchant.ItemFilter[];
                    sell?: pf2eToolbelt.betterMerchant.ItemFilter[];
                };
                infiniteAll?: boolean;
                services?: pf2eToolbelt.betterMerchant.ServiceFlag[];
                serviceRatio?: number;
            };
        };
    }
}
