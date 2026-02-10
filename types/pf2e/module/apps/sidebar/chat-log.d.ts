import { ApplicationConfiguration, ApplicationRenderContext, ApplicationRenderOptions } from "#client/applications/_types.mjs";
import { default as ChatPopout } from "#client/applications/sidebar/apps/chat-popout.mjs";
import { ContextMenuEntry } from "#client/applications/ux/context-menu.mjs";
import { ChatSpeakerData } from "#common/documents/chat-message.mjs";
import { ChatMessagePF2e } from "./../../chat-message/index.ts";
declare class ChatLogPF2e extends fa.sidebar.tabs.ChatLog {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration>;
    _onRender(context: ApplicationRenderContext, options: fa.api.HandlebarsRenderOptions): Promise<void>;
    /** Replace parent method in order to use DamageRoll class as needed */
    processMessage(
        message: string,
        options?: {
            speaker?: ChatSpeakerData;
        },
    ): Promise<ChatMessagePF2e | undefined>;
    static onRenderChatPopout(popout: ChatPopout, options: ApplicationRenderOptions): Promise<void>;
    protected _getEntryContextOptions(): ContextMenuEntry[];
}
export { ChatLogPF2e };
