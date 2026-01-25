import { ClientDocument } from "#client/documents/abstract/client-document.mjs";
import { ActorPF2e } from "./../module/actor/index.ts";
import { ChatMessagePF2e } from "./../module/chat-message/document.ts";
import { ItemPF2e } from "./../module/item/index.ts";
/** Given an HTML element, resolves the sheet and its document */
declare function resolveSheetDocument(html: HTMLElement): ClientDocument | null;
/** Given an html element, attempt to retrieve the origin item and the relevant actor */
declare function resolveActorAndItemFromHTML(html: HTMLElement): {
    /**
     * The containing sheet's primary document, if an actor.
     * Generally used to test if something was dragged from an actor sheet specifically.
     */
    sheetActor: ActorPF2e | null;
    actor: ActorPF2e | null;
    item: ItemPF2e | null;
    /** The message the actor and item are from */
    message: ChatMessagePF2e | null;
    /** The message, sheet document, or journal for this element. */
    appDocument: ClientDocument | null;
};
export { resolveActorAndItemFromHTML, resolveSheetDocument };
