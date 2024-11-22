import type { ApplicationConfiguration, ApplicationRenderContext, ApplicationRenderOptions } from "../_types.d.ts";
import type ApplicationV2 from "./application.d.ts";

/**
 * A lightweight Application that renders a dialog containing a form with arbitrary content, and some buttons.
 * @extends {ApplicationV2<ApplicationConfiguration & DialogV2Configuration>}
 *
 * @example Prompt the user to confirm an action.
 * ```js
 * const proceed = await foundry.applications.api.DialogV2.confirm({
 *   content: "Are you sure?",
 *   rejectClose: false,
 *   modal: true
 * });
 * if ( proceed ) console.log("Proceed.");
 * else console.log("Do not proceed.");
 * ```
 *
 * @example Prompt the user for some input.
 * ```js
 * let guess;
 * try {
 *   guess = await foundry.applications.api.DialogV2.prompt({
 *     window: { title: "Guess a number between 1 and 10" },
 *     content: '<input name="guess" type="number" min="1" max="10" step="1" autofocus>',
 *     ok: {
 *       label: "Submit Guess",
 *       callback: (event, button, dialog) => button.form.elements.guess.valueAsNumber
 *     }
 *   });
 * } catch {
 *   console.log("User did not make a guess.");
 *   return;
 * }
 * const n = Math.ceil(CONFIG.Dice.randomUniform() * 10);
 * if ( n === guess ) console.log("User guessed correctly.");
 * else console.log("User guessed incorrectly.");
 * ```
 *
 * @example A custom dialog.
 * ```js
 * new foundry.applications.api.DialogV2({
 *   window: { title: "Choose an option" },
 *   content: `
 *     <label><input type="radio" name="choice" value="one" checked> Option 1</label>
 *     <label><input type="radio" name="choice" value="two"> Option 2</label>
 *     <label><input type="radio" name="choice" value="three"> Options 3</label>
 *   `,
 *   buttons: [{
 *     action: "choice",
 *     label: "Make Choice",
 *     default: true,
 *     callback: (event, button, dialog) => button.form.elements.choice.value
 *   }, {
 *     action: "all",
 *     label: "Take All"
 *   }],
 *   submit: result => {
 *     if ( result === "all" ) console.log("User picked all options.");
 *     else console.log(`User picked option: ${result}`);
 *   }
 * }).render({ force: true });
 * ```
 */
export default class DialogV2 extends ApplicationV2<ApplicationConfiguration & DialogV2Configuration> {
    /**
     * Render an HTMLElement for the Application.
     * An Application subclass must implement this method in order for the Application to be renderable.
     * @param context      Context data for the render operation
     * @param options      Options which configure application rendering behavior
     * @returns            The result of HTML rendering may be implementation specific.
     *                     Whatever value is returned here is passed to _replaceHTML
     */
    protected _renderHTML(context: ApplicationRenderContext, options: ApplicationRenderOptions): Promise<unknown>;

    /**
     * Render configured buttons.
     */
    protected _renderButtons(): string;

    /**
     * Handle submitting the dialog.
     * @param target    The button that was clicked or the default button.
     * @param event     The triggering event.
     */
    protected _onSubmit(target: HTMLButtonElement, event: PointerEvent | SubmitEvent): Promise<DialogV2>;

    /**
     * Replace the HTML of the application with the result provided by the rendering backend.
     * An Application subclass should implement this method in order for the Application to be renderable.
     * @param result                  The result returned by the application rendering backend
     * @param content                 The content element into which the rendered result must be inserted
     * @param options                 Options which configure application rendering behavior
     */
    protected _replaceHTML(result: unknown, content: HTMLElement, options: ApplicationRenderOptions): void;

    /**
     * Handle keypresses within the dialog.
     * @param event     The triggering event.
     */
    protected _onKeyDown(event: KeyboardEvent): void;

    /**
     * @param event     The originating click event.
     * @param target    The button element that was clicked.
     */
    protected static _onClickButton(event: PointerEvent, target: HTMLButtonElement): void;

    /**
     * A utility helper to generate a dialog with yes and no buttons.
     * @param options.yes   Options to overwrite the default yes button configuration.
     * @param options.no    Options to overwrite the default no button configuration.
     * @returns             Resolves to true if the yes button was pressed, or false if the no button
     *                      was pressed. If additional buttons were provided, the Promise resolves to
     *                      the identifier of the one that was pressed, or the value returned by its
     *                      callback. If the dialog was dismissed, and rejectClose is false, the
     *                      Promise resolves to null.
     */
    static confirm(
        options?: Partial<ApplicationConfiguration & DialogV2Configuration & DialogV2WaitOptions> & {
            yes?: DialogV2Button;
            no?: DialogV2Button;
        }
    ): Promise<any>;

    /**
     * A utility helper to generate a dialog with a single confirmation button.
     * @param options.ok    Options to overwrite the default confirmation button configuration.
     * @returns             Resolves to the identifier of the button used to submit the dialog,
     *                      or the value returned by that button's callback. If the dialog was
     *                      dismissed, and rejectClose is false, the Promise resolves to null.
     */
    static prompt(
        options?: Partial<ApplicationConfiguration & DialogV2Configuration & DialogV2WaitOptions> & {
            ok?: DialogV2Button;
        }
    ): Promise<any>;

    /**
     * Spawn a dialog and wait for it to be dismissed or submitted.
     * @param options.render        A function to invoke whenever the dialog is rendered.
     * @param options.close         A function to invoke when the dialog is closed under any
     *                              circumstances.
     * @param options.rejectClose   Throw a Promise rejection if the dialog is dismissed.
     * @returns                     Resolves to the identifier of the button used to submit the
     *                              dialog, or the value returned by that button's callback. If the
     *                              dialog was dismissed, and rejectClose is false, the Promise
     *                              resolves to null.
     */
    static wait(
        options?: Partial<ApplicationConfiguration & DialogV2Configuration> & {
            rejectClose?: boolean;
            render?: DialogV2RenderCallback;
            close?: DialogV2CloseCallback;
        }
    ): Promise<any>;
}

export interface DialogV2Button {
    /** The button action identifier. */
    action: string;
    /** The button label. Will be localized. */
    label: string;
    /** FontAwesome icon classes. */
    icon?: string;
    /** CSS classes to apply to the button. */
    class?: string;
    /**
     * Whether this button represents the default action to take if the user
     * submits the form without pressing a button, i.e. with an Enter
     * keypress.
     */
    default?: boolean;
    /**
     * A function to invoke when the button is clicked. The value returned
     * from this function will be used as the dialog's submitted value.
     * Otherwise, the button's identifier is used.
     */
    callback?: DialogV2ButtonCallback;
}

/**
 * @param event The button click event, or a form submission event if the dialog was submitted via keyboard.
 * @param button If the form was submitted via keyboard, this will be the default button, otherwise the button that was clicked.
 * @param dialog The dialog element.
 */
export type DialogV2ButtonCallback = (
    event: PointerEvent | SubmitEvent,
    button: HTMLButtonElement,
    dialog: HTMLDialogElement
) => Promise<any>;

export interface DialogV2Configuration {
    /**
     * Modal dialogs prevent interaction with the rest of the UI until they
     * are dismissed or submitted.
     */
    modal?: boolean;
    /** Button configuration. */
    buttons: DialogV2Button[];
    /** The dialog content. */
    content?: string;
    /**
     * A function to invoke when the dialog is submitted. This will not be
     * called if the dialog is dismissed.
     */
    submit?: DialogV2SubmitCallback;
}

/**
 * @param event The render event.
 * @param dialog The dialog element.
 */
export type DialogV2RenderCallback = (event: Event, dialog: HTMLDialogElement) => void;

/**
 * @param event The close event.
 * @param  dialog The dialog instance.
 */
export type DialogV2CloseCallback = (event: Event, dialog: DialogV2) => void;

/**
 * @param result Either the identifier of the button that was clicked to submit the dialog, or the result returned by that button's callback.
 */
export type DialogV2SubmitCallback = (result: any) => Promise<void>;

export interface DialogV2WaitOptions {
    /** A synchronous function to invoke whenever the dialog is rendered. */
    render?: DialogV2RenderCallback;
    /** A synchronous function to invoke when the dialog is closed under any circumstances. */
    close?: DialogV2CloseCallback;
    /** Throw a Promise rejection if the dialog is dismissed. */
    rejectClose?: boolean;
}
