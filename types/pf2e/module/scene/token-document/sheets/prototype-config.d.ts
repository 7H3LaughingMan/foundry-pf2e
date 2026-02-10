import { FormDataExtended } from "#client/applications/ux/_module.mjs";
import { TokenConfigMixinPF2e } from "./mixin.ts";
declare class PrototypeTokenConfigPF2e extends TokenConfigMixinPF2e(fa.sheets.PrototypeTokenConfig) {
    get linkToActorSize(): boolean;
    get autoscale(): boolean;
    _processFormData(event: SubmitEvent | null, form: HTMLFormElement, formData: FormDataExtended): Record<string, unknown>;
    _processChanges(submitData: Record<string, unknown>): Promise<void>;
}
export { PrototypeTokenConfigPF2e };
