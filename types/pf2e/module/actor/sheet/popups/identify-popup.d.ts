import { IdentifyAlchemyDCs, IdentifyMagicDCs } from "../../../item/identification.ts";
import { PhysicalItemPF2e } from "../../../item/physical/index.ts";
export declare class IdentifyItemPopup extends FormApplication<PhysicalItemPF2e> {
    static get defaultOptions(): FormApplicationOptions;
    dcs: IdentifyMagicDCs | IdentifyAlchemyDCs;
    getData(): Promise<IdentifyPopupData>;
    activateListeners($html: JQuery): void;
    protected _updateObject(_event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface IdentifyPopupData extends FormApplicationData {
    isMagic: boolean;
    isAlchemical: boolean;
    dcs: IdentifyMagicDCs | IdentifyAlchemyDCs;
}
export {};
