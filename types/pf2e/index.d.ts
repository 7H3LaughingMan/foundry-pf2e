import "./global.d.ts";
import { ActorPF2e } from "./module/actor/index.js";
import { ChatMessagePF2e } from "./module/chat-message/index.js";
import { CombatantPF2e } from "./module/encounter/index.js";
import { ItemPF2e } from "./module/item/index.js";
import { MacroPF2e } from "./module/macro.js";
import { TokenDocumentPF2e } from "./module/scene/index.js";
import { UserPF2e } from "./module/user/index.js";

declare global {
    function getDocumentClass(name: "Actor"): typeof ActorPF2e;
    function getDocumentClass(name: "ChatMessage"): typeof ChatMessagePF2e;
    function getDocumentClass(name: "Combatant"): typeof CombatantPF2e;
    function getDocumentClass(name: "Folder"): typeof Folder;
    function getDocumentClass(name: "Item"): typeof ItemPF2e;
    function getDocumentClass(name: "JournalEntry"): typeof JournalEntry;
    function getDocumentClass(name: "Macro"): typeof MacroPF2e;
    function getDocumentClass(name: "Token"): typeof TokenDocumentPF2e;
    function getDocumentClass(name: "User"): typeof UserPF2e;
}

export {};
