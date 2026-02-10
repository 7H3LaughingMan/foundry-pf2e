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
>(Base: TBase): ConstructorOf<SvelteApplication> & TBase;

declare abstract class SvelteApplication extends fa.api.ApplicationV2 {
    static override DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected abstract root: svelte.Component<any>;

    /** State data tracked by the root component */
    protected $state: object;

    /** The mounted root component, saved to be unmounted on application close */
    #mount: object;

    protected abstract override _prepareContext(options: fa.ApplicationRenderOptions): Promise<SvelteApplicationRenderContext>;

    protected override _renderHTML(context: SvelteApplicationRenderContext): Promise<SvelteApplicationRenderContext>;

    protected override _replaceHTML(result: SvelteApplicationRenderContext, content: HTMLElement, options: fa.ApplicationRenderOptions): void;

    protected override _onClose(options: fa.ApplicationClosingOptions): void;
}

export { SvelteApplicationMixin, type SvelteApplicationRenderContext };
