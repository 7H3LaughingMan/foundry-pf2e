import { ApplicationV1HeaderButton } from "#client/appv1/api/application-v1.mjs";
import { Immunity, IWRSource, Resistance, Weakness } from "./../../data/iwr.ts";
import { ActorPF2e } from "./../../index.ts";
import { ImmunityType, ResistanceType, WeaknessType } from "./../../types.ts";
import appv1 = foundry.appv1;
declare class IWREditor<TActor extends ActorPF2e> extends appv1.api.DocumentSheet<TActor, IWREditorOptions> {
    #private;
    category: ListCategory;
    types: Record<string, string>;
    constructor(actor: TActor, options: IWREditorConstructorOptions);
    static get defaultOptions(): appv1.api.DocumentSheetV1Options;
    get id(): string;
    get title(): string;
    get actor(): TActor;
    get categoryLabel(): string;
    getData(options?: Partial<IWREditorOptions>): Promise<IWREditorData<TActor>>;
    /** Reconstruct the entire IWR array from form inputs */
    getUpdatedData({ includeNew }?: { includeNew?: boolean | undefined }): ProbablyIWRData[];
    /** Exclude sheet selection and compendium import */
    protected _getHeaderButtons(): ApplicationV1HeaderButton[];
    activateListeners($html: JQuery): void;
}
interface IWREditorOptions extends appv1.api.DocumentSheetV1Options {
    category: ListCategory;
}
interface IWREditorConstructorOptions extends Partial<appv1.api.DocumentSheetV1Options> {
    category: ListCategory;
}
interface IWREditorData<TActor extends ActorPF2e> extends appv1.api.DocumentSheetData<TActor> {
    header: string;
    category: ListCategory;
    list: Immunity[] | Weakness[] | Resistance[];
    sourceData: IWRSource<ImmunityType | WeaknessType | ResistanceType>[];
    types: Record<string, string>;
}
type ListCategory = "immunities" | "weaknesses" | "resistances";
interface ProbablyIWRData {
    type: string;
    exceptions: string[];
    value?: number;
    doubleVs?: string[];
}
export { IWREditor };
