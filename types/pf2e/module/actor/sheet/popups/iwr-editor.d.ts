import { ActorPF2e } from "../../index.ts";
import { Immunity, IWRSource, Resistance, Weakness } from "../../data/iwr.ts";
import { ImmunityType, ResistanceType, WeaknessType } from "../../types.ts";

declare class IWREditor<TActor extends ActorPF2e> extends DocumentSheet<TActor, IWREditorOptions> {
    #private;
    category: ListCategory;
    types: Record<string, string>;
    constructor(actor: TActor, options: IWREditorConstructorOptions);
    static get defaultOptions(): DocumentSheetOptions;
    get id(): string;
    get title(): string;
    get actor(): TActor;
    get categoryLabel(): string;
    getData(options?: Partial<IWREditorOptions>): Promise<IWREditorData<TActor>>;
    /** Reconstruct the entire IWR array from form inputs */
    getUpdatedData({ includeNew }?: {
        includeNew?: boolean | undefined;
    }): ProbablyIWRData[];
    /** Exclude sheet selection and compendium import */
    protected _getHeaderButtons(): ApplicationHeaderButton[];
    activateListeners($html: JQuery): void;
}
interface IWREditorOptions extends DocumentSheetOptions {
    category: ListCategory;
}
interface IWREditorConstructorOptions extends Partial<DocumentSheetOptions> {
    category: ListCategory;
}
interface IWREditorData<TActor extends ActorPF2e> extends DocumentSheetData<TActor> {
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
