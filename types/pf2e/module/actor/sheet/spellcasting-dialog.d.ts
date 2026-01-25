import { SpellcastingEntryPF2e } from "./../../item/index.ts";
import { SpellcastingEntrySystemSource } from "./../../item/spellcasting-entry/data.ts";
import { CreaturePF2e } from "./../index.ts";
import { AttributeString } from "./../types.ts";
import appv1 = foundry.appv1;
/** Dialog to create or edit spellcasting entries. It works on a clone of spellcasting entry, but will not persist unless the changes are accepted */
declare class SpellcastingCreateAndEditDialog extends appv1.api.FormApplication<SpellcastingEntryPF2e<CreaturePF2e>> {
    #private;
    constructor(object: SpellcastingEntryPF2e<CreaturePF2e>, options?: Partial<appv1.api.FormApplicationOptions>);
    static get defaultOptions(): appv1.api.FormApplicationOptions;
    getData(): Promise<SpellcastingCreateAndEditDialogSheetData>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
    private updateAndClose;
}
interface SpellcastingCreateAndEditDialogSheetData extends appv1.api.FormApplicationData<
    SpellcastingEntryPF2e<CreaturePF2e>
> {
    actor: CreaturePF2e;
    system: SpellcastingEntrySystemSource;
    magicTraditions: typeof CONFIG.PF2E.magicTraditions;
    statistics: {
        slug: string;
        label: string;
    }[];
    spellcastingTypes: Partial<typeof CONFIG.PF2E.preparationType>;
    attributes: typeof CONFIG.PF2E.abilities;
    isAttributeConfigurable: boolean;
    selectedAttribute: AttributeString;
    autoHeightenLevels: Record<string, string>;
    validItemTypes: Record<string, string>;
}
declare function createSpellcastingDialog(
    object: CreaturePF2e | SpellcastingEntryPF2e<CreaturePF2e>,
): Promise<SpellcastingCreateAndEditDialog>;
export { createSpellcastingDialog };
