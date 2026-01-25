import { ActorSheetOptions } from "#client/appv1/sheets/actor-sheet.mjs";
import { DropCanvasData } from "#client/helpers/hooks.mjs";
import { DropCanvasItemData } from "./../../canvas/drop-canvas-data.ts";
import { ZeroToFour } from "./../../data.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
import { ItemPF2e } from "./../../item/index.ts";
import { Bulk } from "./../../item/physical/index.ts";
import { SheetOptions } from "./../../sheet/helpers.ts";
import { HitPointsSummary } from "./../base.ts";
import { ResourceData } from "./../creature/index.ts";
import { ActorPF2e } from "./../index.ts";
import { ActorSheetPF2e } from "./../sheet/base.ts";
import { ActorSheetDataPF2e, ActorSheetRenderOptionsPF2e } from "./../sheet/data-types.ts";
import { PartyPF2e } from "./document.ts";
import appv1 = foundry.appv1;
interface PartySheetRenderOptions extends ActorSheetRenderOptionsPF2e {
    actors?: boolean;
}
declare class PartySheetPF2e extends ActorSheetPF2e<PartyPF2e> {
    #private;
    currentSummaryView: string;
    static get defaultOptions(): ActorSheetOptions;
    regionTemplates: Record<string, string>;
    protected _getHeaderButtons(): appv1.api.ApplicationV1HeaderButton[];
    getData(options?: ActorSheetOptions): Promise<PartySheetData>;
    protected setSummaryView(view: string): void;
    activateListeners($html: JQuery<HTMLElement>): void;
    /** Overriden to prevent inclusion of campaign-only item types. Those should get added to their own sheet */
    protected _onDropItemCreate(itemData: ItemSourcePF2e | ItemSourcePF2e[]): Promise<Item<PartyPF2e>[]>;
    /** Override to allow divvying/outward transfer of items via party member blocks in inventory members sidebar. */
    protected _onDropItem(
        event: DragEvent,
        data: DropCanvasItemData & {
            fromInventory?: boolean;
        },
    ): Promise<ItemPF2e[]>;
    /** Override to not auto-disable fields on a thing meant to be used by players */
    protected _disableFields(_form: HTMLElement): void;
    render(force?: boolean, options?: PartySheetRenderOptions): this;
    protected _renderInner(
        data: Record<string, unknown>,
        options: appv1.api.AppV1RenderOptions,
    ): Promise<JQuery<HTMLElement>>;
    protected _onDropActor(event: DragEvent, data: DropCanvasData<"Actor", PartyPF2e>): Promise<false | void>;
}
interface PartySheetData extends ActorSheetDataPF2e<PartyPF2e> {
    /** Is the sheet restricted to players? */
    playerRestricted: boolean;
    /** Is the sheet restricted to the current user? */
    restricted: boolean;
    members: MemberBreakdown[];
    overviewSummary: {
        languages: LanguageSheetData[];
        skills: SkillData[];
        knowledge: {
            regular: SkillData[];
            lore: SkillData[];
        };
    } | null;
    inventorySummary: {
        totalCurrency: string;
        totalWealth: string;
        totalBulk: Bulk;
    };
    explorationSummary: {
        speed: number;
        feetPerMinute: number;
        milesPerHour: number;
        milesPerDay: number;
        activities: number;
    };
    /** Unsupported items on the sheet, may occur due to disabled campaign data */
    orphaned: ItemPF2e[];
}
interface SkillData {
    slug: string;
    label: string;
    mod: number;
    rank?: ZeroToFour | null;
}
interface MemberBreakdown {
    actor: ActorPF2e;
    genderPronouns: string | null;
    blurb: string | null;
    resource: ResourceData | null;
    hasBulk: boolean;
    bestSkills: SkillData[];
    /** If the actor is owned by the current user */
    owner: boolean;
    /** If the actor has observer or greater permission */
    observer: boolean;
    /** If the actor has limited or greater permission */
    limited: boolean;
    speeds: {
        label: string;
        value: number;
    }[];
    senses: {
        label: string | null;
        labelFull: string;
        acuity?: string;
    }[];
    hp: HitPointsSummary;
    activities: {
        uuid: string;
        name: string;
        img: string;
        traits: SheetOptions;
    }[];
    currency: string;
    wealth: string;
    /** If true, the current user is restricted from seeing meta details */
    restricted: boolean;
}
interface LanguageSheetData {
    slug: string;
    label: string;
    actors: ActorPF2e[];
}
export { PartySheetPF2e, type PartySheetRenderOptions };
