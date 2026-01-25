import { ItemSheetPF2e } from "../index.ts";
import { RuleElement, RuleElementSource } from "./../../../../rules/index.ts";
import { RuleElementSchema } from "./../../../../rules/rule-element/data.ts";
import { LaxSchemaField } from "./../../../../system/schema-data-fields.ts";
import { ItemPF2e } from "./../../../index.ts";
interface RuleElementFormOptions<TSource extends RuleElementSource, TObject extends RuleElement | null> {
    sheet: ItemSheetPF2e<ItemPF2e>;
    index: number;
    rule: TSource;
    object: TObject;
}
/** Base Rule Element form handler. Form handlers intercept sheet events to support new UI */
declare class RuleElementForm<
    TSource extends RuleElementSource = RuleElementSource,
    TObject extends RuleElement | null = RuleElement | null,
> {
    #private;
    template: string;
    sheet: ItemSheetPF2e<ItemPF2e>;
    index: number;
    rule: TSource;
    object: TObject;
    schema: LaxSchemaField<RuleElementSchema> | null;
    element: HTMLElement;
    /** Tab configuration data */
    protected tabs: RuleElementFormTabData | null;
    /** Base proprety path for the contained rule */
    get basePath(): string;
    constructor(options: RuleElementFormOptions<TSource, TObject>);
    initialize(options: RuleElementFormOptions<TSource, TObject>): void;
    get item(): ItemPF2e;
    get fieldIdPrefix(): string;
    /** Returns the initial value of the schema. Arrays are stripped due to how they're handled in forms */
    protected getInitialValue({ autogenerate }?: { autogenerate?: boolean | undefined }): object;
    getData(): Promise<RuleElementFormSheetData<TSource, TObject>>;
    render(): Promise<string>;
    /**
     * Helper to update the item with the new rule data.
     * This function exists because array updates in foundry are currently clunky
     */
    updateItem(updates: Partial<TSource> | Record<string, JSONValue>): Promise<void>;
    activateListeners(html: HTMLElement): void;
    protected onDrop(event: DragEvent, _element: HTMLElement): Promise<ItemPF2e | null>;
    protected activateTab(html: HTMLElement, tabName: Maybe<string>): void;
    updateObject(source: TSource & Partial<Record<string, JSONValue>>): void;
}
interface RuleElementFormSheetData<TSource extends RuleElementSource, TObject extends RuleElement | null> extends Omit<
    RuleElementFormOptions<TSource, TObject>,
    "sheet"
> {
    item: ItemPF2e;
    label: string;
    /** A prefix for use in label-input/select pairs */
    fieldIdPrefix: string;
    recognized: boolean;
    basePath: string;
    fields: RuleElementSchema | undefined;
    /** A collection of additional handlebars functions */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    form: Record<string, Function>;
    validationFailures: string[];
    hiddenFields: string[];
    omittedFields: string[];
}
interface RuleElementFormTabData {
    /** Valid tab names for this form */
    names: string[];
    /** The display style applied to active tabs */
    displayStyle: "block" | "flex" | "grid";
}
export { RuleElementForm };
export type { RuleElementFormOptions, RuleElementFormSheetData, RuleElementFormTabData };
