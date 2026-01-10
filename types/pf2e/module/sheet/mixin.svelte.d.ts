import * as svelte from "svelte";
interface SvelteApplicationRenderContext extends fa.ApplicationRenderContext {
    /** State data tracked by the root component: objects herein must be plain object. */
    state: object;
    /** This application instance */
    foundryApp?: SvelteApplication;
}
declare function SvelteApplicationMixin<
    TBase extends AbstractConstructorOf<fa.api.ApplicationV2> & {
        DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    },
>(
    Base: TBase,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ((abstract new (...args: any[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    root: svelte.Component<any>;
    /** State data tracked by the root component */
    $state: object;
    /** The mounted root component, saved to be unmounted on application close */
    "__#private@#mount": object;
    _prepareContext(options: fa.ApplicationRenderOptions): Promise<SvelteApplicationRenderContext>;
    _renderHTML(context: SvelteApplicationRenderContext): Promise<SvelteApplicationRenderContext>;
    _replaceHTML(
        result: SvelteApplicationRenderContext,
        content: HTMLElement,
        options: fa.ApplicationRenderOptions,
    ): void;
    _onClose(options: fa.ApplicationClosingOptions): void;
    options: fa.ApplicationConfiguration;
    get window(): {
        header: HTMLElement;
        title: HTMLHeadingElement;
        icon: HTMLElement;
        close: HTMLButtonElement;
        controls: HTMLButtonElement;
        controlsDropdown: HTMLDivElement;
        onDrag: (event: DragEvent) => void;
        onResize: (event: DragEvent) => void;
        pointerStartPosition: fa.ApplicationPosition;
        pointerMoveThrottle: boolean;
    };
    tabGroups: Record<string, string>;
    get classList(): DOMTokenList;
    get id(): string;
    get title(): string;
    get element(): HTMLElement;
    get form(): HTMLFormElement | null;
    get minimized(): boolean;
    position: fa.ApplicationPosition;
    get rendered(): boolean;
    get state(): number;
    get hasFrame(): boolean;
    _initializeApplicationOptions(options: {
        id?: string | undefined;
        uniqueId?: string | undefined;
        classes?: string[] | undefined;
        tag?: string | undefined;
        window?:
            | {
                  frame?: boolean | undefined;
                  positioned?: boolean | undefined;
                  title?: string | undefined;
                  icon?: string | false | undefined;
                  controls?:
                      | {
                            icon?: string | undefined;
                            label?: string | undefined;
                            action?: string | undefined;
                            visible?: boolean | undefined;
                        }[]
                      | undefined;
                  minimizable?: boolean | undefined;
                  resizable?: boolean | undefined;
                  contentTag?: string | undefined;
                  contentClasses?: string[] | undefined;
              }
            | undefined;
        actions?:
            | {
                  [x: string]: // eslint-disable-next-line @typescript-eslint/no-empty-object-type
                      | {}
                      | {
                            // eslint-disable-next-line @typescript-eslint/no-empty-object-type
                            handler?: {} | undefined;
                            buttons?: number[] | undefined;
                        }
                      | undefined;
              }
            | undefined;
        form?:
            | {
                  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
                  handler?: {} | undefined;
                  submitOnChange?: boolean | undefined;
                  closeOnSubmit?: boolean | undefined;
              }
            | undefined;
        position?:
            | {
                  top?: number | undefined;
                  left?: number | undefined;
                  width?: number | "auto" | undefined;
                  height?: number | "auto" | undefined;
                  scale?: number | undefined;
                  zIndex?: number | undefined;
              }
            | undefined;
    }): fa.ApplicationConfiguration;
    render(
        options?:
            | boolean
            | {
                  force?: boolean | undefined;
                  position?:
                      | {
                            top?: number | undefined;
                            left?: number | undefined;
                            width?: number | "auto" | undefined;
                            height?: number | "auto" | undefined;
                            scale?: number | undefined;
                            zIndex?: number | undefined;
                        }
                      | undefined;
                  window?:
                      | {
                            title?: string | undefined;
                            icon?: string | false | undefined;
                            controls?: boolean | undefined;
                        }
                      | undefined;
                  isFirstRender?: boolean | undefined;
              }
            | undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Promise</* elided*/ any>;
    _configureRenderOptions(options: {
        force?: boolean | undefined;
        position?:
            | {
                  top?: number | undefined;
                  left?: number | undefined;
                  width?: number | "auto" | undefined;
                  height?: number | "auto" | undefined;
                  scale?: number | undefined;
                  zIndex?: number | undefined;
              }
            | undefined;
        window?:
            | {
                  title?: string | undefined;
                  icon?: string | false | undefined;
                  controls?: boolean | undefined;
              }
            | undefined;
        isFirstRender?: boolean | undefined;
    }): void;
    _prepareTabs(group: string): Record<string, fa.ApplicationTab>;
    _getTabsConfig(group: string): fa.ApplicationTabsConfiguration | null;
    _getHeaderControls(): fa.ApplicationHeaderControlsEntry[];
    _headerControlButtons(): Generator<fa.ApplicationHeaderControlsEntry>;
    _renderFrame(options: fa.ApplicationRenderOptions): Promise<HTMLElement>;
    _renderHeaderControl(control: fa.ApplicationHeaderControlsEntry): HTMLLIElement;
    _updateFrame(options: fa.ApplicationRenderOptions): void;
    _insertElement(element: HTMLElement): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    close(options?: fa.ApplicationClosingOptions): Promise</* elided*/ any>;
    _removeElement(element: HTMLElement): void;
    _tearDown(options: fa.ApplicationClosingOptions): void;
    setPosition(position?: Partial<fa.ApplicationPosition>): fa.ApplicationPosition;
    _updatePosition(position: fa.ApplicationPosition): fa.ApplicationPosition;
    toggleControls(expanded?: boolean): void;
    minimize(): Promise<void>;
    maximize(): Promise<void>;
    bringToFront(): void;
    changeTab(
        tab: string,
        group: string,
        options?: {
            event?: Event;
            navElement?: HTMLElement;
            force?: boolean;
            updatePosition?: boolean;
        },
    ): void;
    submit(submitOptions?: object): Promise<unknown>;
    _canRender(options: fa.ApplicationRenderOptions): boolean | void;
    _preFirstRender(context: Record<string, unknown>, options: fa.ApplicationRenderOptions): Promise<void>;
    _onFirstRender(context: object, options: fa.ApplicationRenderOptions): Promise<void>;
    _preRender(context: object, options: fa.ApplicationRenderOptions): Promise<void>;
    _onRender(context: object, options: fa.ApplicationRenderOptions): Promise<void>;
    _preClose(options: fa.ApplicationClosingOptions): Promise<void>;
    _prePosition(position: fa.ApplicationPosition): void;
    _onPosition(position: fa.ApplicationPosition): void;
    _attachFrameListeners(): void;
    _onClickTab(event: PointerEvent): void;
    _onClickAction(event: PointerEvent, target: HTMLElement): void;
    _onSubmitForm(formConfig: fa.ApplicationFormConfiguration, event: Event | SubmitEvent): Promise<void>;
    _onChangeForm(formConfig: fa.ApplicationFormConfiguration, event: Event): void;
    _awaitTransition(element: HTMLElement, timeout: number): Promise<void>;
    _createContextMenu(
        handler: () => import("#client/applications/ux/context-menu.mjs").ContextMenuEntry[],
        selector: string,
        options?: Record<string, unknown> & {
            container?: HTMLElement;
            hookName?: string;
            parentClassHooks?: boolean;
        },
    ): fa.ux.ContextMenu | null;
    addEventListener(
        type: string,
        listener: import("#common/utils/_types.mjs").EmittedEventListener,
        options?: {
            once?: boolean;
        },
    ): void;
    removeEventListener(type: string, listener: import("#common/utils/_types.mjs").EmittedEventListener): void;
    dispatchEvent(event: Event): boolean;
}) & {
    DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
}) &
    TBase;
type SvelteApplication = InstanceType<ReturnType<typeof SvelteApplicationMixin>>;
export { SvelteApplicationMixin, type SvelteApplicationRenderContext };
