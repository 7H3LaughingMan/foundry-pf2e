import { default as FormDataExtended } from "#client/applications/ux/form-data-extended.mjs";
import { DatabaseCreateOperation, DatabaseUpdateOperation } from "#common/abstract/_types.mjs";
import { TokenConfigMixinPF2e } from "./mixin.ts";
declare class TokenConfigPF2e extends TokenConfigMixinPF2e(fa.sheets.TokenConfig) {
    get linkToActorSize(): boolean;
    get autoscale(): boolean;
    protected _processFormData(
        event: SubmitEvent | null,
        form: HTMLFormElement,
        formData: FormDataExtended,
    ): Record<string, unknown>;
    protected _processSubmitData(
        event: SubmitEvent,
        form: HTMLFormElement,
        submitData: Record<string, unknown>,
        options?: Partial<DatabaseCreateOperation<Scene | null>> | Partial<DatabaseUpdateOperation<Scene | null>>,
    ): Promise<void>;
}
export { TokenConfigPF2e };
