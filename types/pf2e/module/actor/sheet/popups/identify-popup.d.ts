


import { GenericIdentifyDCs, IdentifyAlchemyDCs, IdentifyMagicDCs } from "types/pf2e/module/item/identification.ts";
import type { PhysicalItemPF2e } from "types/pf2e/module/item/physical/index.ts";
export declare class IdentifyItemPopup extends FormApplication<PhysicalItemPF2e> {
    static get defaultOptions(): FormApplicationOptions;
    dcs: IdentifyMagicDCs | IdentifyAlchemyDCs | GenericIdentifyDCs;
    getData(): Promise<IdentifyPopupData>;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface IdentifyPopupData extends FormApplicationData {
    isMagic: boolean;
    isAlchemical: boolean;
    dcs: GenericIdentifyDCs | IdentifyMagicDCs | IdentifyAlchemyDCs;
}
export {};
