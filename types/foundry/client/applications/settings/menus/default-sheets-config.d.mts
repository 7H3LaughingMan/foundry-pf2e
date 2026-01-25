import { SchemaField } from "./../../../../common/data/fields.mjs";
import CategoryBrowser, { CategoryBrowserConfiguration } from "./../../../applications/api/category-browser.mjs";

export default class DefaultSheetsConfig extends CategoryBrowser {
    static override DEFAULT_OPTIONS: DeepPartial<CategoryBrowserConfiguration>;

    /**
     * The Default Sheets setting name
     */
    static SETTING: "sheetClasses";

    /**
     * The "sheetClasses" Setting field
     */
    static get SCHEMA(): SchemaField;

    /**
     * Register the "sheetClasses" Setting and this menu application.
     */
    static registerSetting(): void;

    protected override _prepareCategoryData(): Promise<
        Record<string, { id: string; label: string; entries: object[] }>
    >;
}
