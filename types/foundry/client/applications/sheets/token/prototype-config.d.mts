import {
    ApplicationClosingOptions,
    ApplicationConfiguration,
    ApplicationRenderContext,
    ApplicationRenderOptions,
    FormFooterButton,
} from "./../../../applications/_types.mjs";
import { DocumentSheetRenderContext } from "./../../../applications/api/_module.mjs";
import { HandlebarsRenderOptions } from "./../../../applications/api/handlebars-application.mjs";
import FormDataExtended from "./../../../applications/ux/form-data-extended.mjs";
import { Actor } from "./../../../documents/_module.mjs";
import { PrototypeToken, PrototypeTokenSchema } from "./../../../../common/data/data.mjs";
import ApplicationV2 from "../../api/application.mjs";
import TokenApplicationMixin from "./mixin.mjs";

/**
 * @import {ApplicationClickAction, ApplicationFormSubmission} from "../../_types.mjs";
 * @import DocumentSheetV2 from "../../api/document-sheet.mjs";
 */

/**
 * The Application responsible for configuring an actor's PrototypeToken
 * @extends ApplicationV2
 * @mixes TokenApplication
 */
export default class PrototypeTokenConfig extends TokenApplicationMixin(ApplicationV2) {
    constructor(options?: DeepPartial<ApplicationConfiguration>);

    static override DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration>;

    override isPrototype: true;

    override get title(): string;

    override get token(): PrototypeToken<Actor>;

    override get actor(): Actor | null;

    protected override get _fields(): PrototypeTokenSchema;

    /**
     * Is this sheet visible to the user?
     */
    get isVisible(): boolean;

    protected override _canRender(options: ApplicationRenderOptions): boolean;

    protected override _initializeApplicationOptions(
        options: DeepPartial<ApplicationConfiguration>,
    ): ApplicationConfiguration;

    protected override _initializeTokenPreview(): Promise<void>;

    protected override _prepareContext(options: HandlebarsRenderOptions): Promise<DocumentSheetRenderContext>;

    protected override _configureRenderOptions(options: HandlebarsRenderOptions): void;

    protected override _prepareButtons(): FormFooterButton[];

    protected override _onFirstRender(
        context: ApplicationRenderContext,
        options: HandlebarsRenderOptions,
    ): Promise<void>;

    /* -------------------------------------------- */
    /*  Form Submission                             */
    /* -------------------------------------------- */

    /**
     * Customize how form data is extracted into an expanded object.
     * @param event    The originating form submission event
     * @param form     The form element that was submitted
     * @param formData Processed data for the submitted form
     * @returns An expanded object of processed form data
     * @throws Subclasses may throw validation errors here to prevent form submission
     */
    protected _processFormData(
        event: SubmitEvent | null,
        form: HTMLFormElement,
        formData: FormDataExtended,
    ): Record<string, unknown>;

    protected override _tearDown(options: ApplicationClosingOptions): void;
}
