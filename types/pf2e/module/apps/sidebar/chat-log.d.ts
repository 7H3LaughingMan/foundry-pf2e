import { ChatMessagePF2e } from "../../chat-message/index.ts";
import { ChatMessageSource } from "../../../../foundry/common/documents/chat-message.ts";

declare class ChatLogPF2e extends ChatLog<ChatMessagePF2e> {
    #private;
    activateListeners($html: JQuery<HTMLElement>): void;
    /** Separate public method so as to be accessible from renderChatPopout hook */
    activateClickListener(html: HTMLElement): void;
    /** Handle clicks of "Set as initiative" buttons */
    protected _onDiceRollClick(event: JQuery.ClickEvent): void;
    /** Replace parent method in order to use DamageRoll class as needed */
    protected _processDiceCommand(command: string, matches: RegExpMatchArray[], chatData: DeepPartial<Omit<ChatMessageSource, "rolls">> & {
        rolls: (string | RollJSON)[];
    }, createOptions: ChatMessageCreateOperation): Promise<void>;
    protected _getEntryContextOptions(): EntryContextOption[];
}
export { ChatLogPF2e };
