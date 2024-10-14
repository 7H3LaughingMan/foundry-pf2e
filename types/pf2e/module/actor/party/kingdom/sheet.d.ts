import { ActorPF2e, ArmyPF2e, PartyPF2e } from '../../index.ts';
import { FeatGroup } from '../../character/feats.ts';
import { ActorSheetPF2e, SheetClickActionHandlers } from '../../sheet/base.ts';
import { ActorSheetDataPF2e } from '../../sheet/data-types.ts';
import { ItemPF2e, CampaignFeaturePF2e } from '../../../item/index.ts';
import { ItemSourcePF2e } from '../../../item/base/data/index.ts';
import { DropCanvasItemDataPF2e } from '../../../canvas/drop-canvas-data.ts';
import { ValueAndMax } from '../../../data.ts';
import { AdjustedValue, SheetOption, SheetOptions } from '../../../sheet/helpers.ts';
import { Statistic } from '../../../system/statistic/index.ts';
import { Kingdom } from './model.ts';
import { KingdomAbilityData, KingdomData, KingdomLeadershipData, KingdomSettlementData } from './types.ts';
declare class KingdomSheetPF2e extends ActorSheetPF2e<PartyPF2e> {
    #private;
    /** The current selected activity filter, which doubles as an active kingdom phase */
    protected selectedFilter: string | null;
    /** HTML element to focus on a re-render, such as when new elements are added */
    protected focusElement: string | null;
    constructor(actor: PartyPF2e, options?: Partial<ActorSheetOptions>);
    get kingdom(): Kingdom;
    get title(): string;
    static get defaultOptions(): ActorSheetOptions;
    protected _getHeaderButtons(): ApplicationHeaderButton[];
    getData(options?: ActorSheetOptions): Promise<KingdomSheetData>;
    protected _configureProseMirrorPlugins(name: string, options: {
        remove?: boolean;
    }): Record<string, ProseMirror.Plugin>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected activateClickListener(html: HTMLElement): SheetClickActionHandlers;
    protected filterActions(trait: string | null, options?: {
        instant?: boolean;
    }): void;
    protected _onDropItem(event: DragEvent, data: DropCanvasItemDataPF2e): Promise<ItemPF2e[]>;
    /** Handle a drop event for an existing Owned Item to sort that item */
    protected _onSortItem(event: DragEvent, itemData: ItemSourcePF2e): Promise<ItemPF2e[]>;
    protected _onDropActor(event: DragEvent, data: DropCanvasData<"Actor", PartyPF2e>): Promise<false | void>;
    /** Override to not auto-disable fields on a thing meant to be used by players */
    protected _disableFields(form: HTMLElement): void;
    protected _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface KingdomSheetData extends ActorSheetDataPF2e<PartyPF2e> {
    kingdom: Kingdom;
    nationTypeLabel: string;
    abilities: (KingdomAbilityData & {
        slug: string;
        label: string;
        ruinLabel: string;
    })[];
    commodities: CommoditySheetData[];
    resourceDice: KingdomData["resources"]["dice"] & {
        icon: string;
        bonusAdjustment: string | null;
        penaltyAdjustment: string | null;
    };
    leadership: LeaderSheetData[];
    actions: {
        item: CampaignFeaturePF2e;
        traits: SheetOptions;
    }[];
    skills: Statistic[];
    feats: FeatGroup<PartyPF2e, CampaignFeaturePF2e>[];
    actionFilterChoices: SheetOption[];
    armies: ArmySheetData[];
    settlements: SettlementSheetData[];
    eventText: string;
    settlementTypes: Record<string, string>;
    abilityLabels: Record<string, string>;
    skillLabels: Record<string, string>;
    proficiencyOptions: FormSelectOption[];
}
interface ArmySheetData {
    link: string;
    document: ArmyPF2e;
    consumption: AdjustedValue;
}
interface LeaderSheetData extends KingdomLeadershipData {
    actor: ActorPF2e | null;
    img: string;
    slug: string;
    label: string;
    abilityLabel: string;
    penaltyLabel: string;
}
interface CommoditySheetData extends ValueAndMax {
    type: string;
    label: string;
    /** Worksite data (if it exists for the commodity type) */
    workSites: {
        label: string;
        description: string;
        hasResource: boolean;
        value: number;
        resource?: number;
    };
}
type SettlementSheetData = Omit<KingdomSettlementData, "storage"> & {
    id: string;
    editing: boolean;
    blocks: number | string;
    levelRange: string;
    populationRange: string;
    typeLabel: string;
    storage: {
        type: string;
        label: string;
        value: number;
    }[];
};
export { KingdomSheetPF2e };
