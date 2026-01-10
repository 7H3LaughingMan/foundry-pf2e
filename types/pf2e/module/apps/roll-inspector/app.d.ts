import { RawDamageDice, RawModifier } from "./../../actor/modifiers.ts";
import { ApplicationConfiguration } from "#client/applications/_types.mjs";
import { ChatContextFlag } from "./../../chat-message/data.ts";
import { ChatMessagePF2e } from "./../../chat-message/document.ts";
import { SvelteApplicationMixin, SvelteApplicationRenderContext } from "./../../sheet/mixin.svelte.ts";
declare class RollInspector extends SvelteApplicationMixin(fa.api.ApplicationV2) {
    static DEFAULT_OPTIONS: {
        position: {
            width: number;
            height: number;
        };
        window: {
            icon: string;
            title: string;
            resizable: boolean;
        };
    };
    root: import("svelte/legacy").LegacyComponentType;
    message: ChatMessagePF2e;
    constructor(
        options: DeepPartial<ApplicationConfiguration> & {
            message: ChatMessagePF2e;
        },
    );
    _prepareContext(): Promise<RollInspectorContext>;
}
interface RollInspectorContext extends SvelteApplicationRenderContext {
    state: RollInspectorState;
}
interface RollInspectorState {
    context: ChatContextFlag;
    domains: string[];
    modifiers: RawModifier[];
    dice: RawDamageDice[];
    rollOptions: string[];
    contextualOptions: {
        header: string;
        options: string[];
    }[];
}
export { RollInspector };
export type { RollInspectorContext };
