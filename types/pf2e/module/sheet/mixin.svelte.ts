import * as svelte from "svelte";
import type { ApplicationConfiguration, ApplicationRenderContext, ApplicationRenderOptions } from "../../../foundry/client-esm/applications/_types.ts";
import type ApplicationV2 from "../../../foundry/client-esm/applications/api/application.ts";

interface SvelteApplicationRenderContext {
    /** State data tracked by the root component: objects herein must be plain object. */
    state: object;
    /** This application instance */
    foundryApp: SvelteApplication;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function SvelteApplicationMixin<
    TBase extends AbstractConstructorOf<ApplicationV2> & { DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration> },
>(Base: TBase) {
    abstract class SvelteApplication extends Base {
        static override DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration> = {
            classes: ["pf2e"],
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        protected abstract root: svelte.Component<any>;

        /** State data tracked by the root component */
        protected $state: object = $state({});

        /** The mounted root component, saved to be unmounted on application close */
        #mount: object = {};

        protected override async _renderHTML(
            context: SvelteApplicationRenderContext,
        ): Promise<ApplicationRenderContext> {
            return context;
        }

        protected override _replaceHTML(
            result: SvelteApplicationRenderContext,
            content: HTMLElement,
            options: ApplicationRenderOptions,
        ): void {
            Object.assign(this.$state, result.state);
            if (options.isFirstRender) {
                this.#mount = svelte.mount(this.root, { target: content, props: { ...result, state: this.$state } });
            }
        }

        // @ts-expect-error
        protected override _onClose(options: ApplicationRenderOptions): void {
            // @ts-expect-error
            super._onClose(options);
            svelte.unmount(this.#mount);
        }
    }

    return SvelteApplication;
}

type SvelteApplication = InstanceType<ReturnType<typeof SvelteApplicationMixin>>;

export { SvelteApplicationMixin, type SvelteApplicationRenderContext };
