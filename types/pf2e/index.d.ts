import { DocumentType } from "#common/constants.mjs";
import { ActiveEffectPF2e } from "#pf2e-module/active-effect.js";
import { ActorPF2e } from "#pf2e-module/actor/base.js";
import { MeasuredTemplatePF2e } from "#pf2e-module/canvas/measured-template.js";
import { ChatMessagePF2e } from "#pf2e-module/chat-message/document.js";
import { CombatantPF2e } from "#pf2e-module/encounter/combatant.js";
import { EncounterPF2e } from "#pf2e-module/encounter/document.js";
import { ItemPF2e } from "#pf2e-module/item/base/document.js";
import { MacroPF2e } from "#pf2e-module/macro.js";
import { AmbientLightDocumentPF2e } from "#pf2e-module/scene/ambient-light-document.js";
import { ScenePF2e } from "#pf2e-module/scene/document.js";
import { RegionBehaviorPF2e } from "#pf2e-module/scene/region-behavior/document.js";
import { RegionDocumentPF2e } from "#pf2e-module/scene/region-document/document.js";
import { TileDocumentPF2e } from "#pf2e-module/scene/tile-document.js";
import { TokenDocumentPF2e } from "#pf2e-module/scene/token-document/document.js";
import { UserPF2e } from "#pf2e-module/user/document.js";

import "./global.d.ts";

declare global {
    function getDocumentClass(name: "ActiveEffect"): typeof ActiveEffectPF2e;
    function getDocumentClass(name: "Actor"): typeof ActorPF2e;
    function getDocumentClass(name: "ActorDelta"): typeof foundry.documents.ActorDelta;
    function getDocumentClass(name: "Adventure"): typeof foundry.documents.Adventure;
    function getDocumentClass(name: "AmbientLight"): typeof AmbientLightDocumentPF2e;
    function getDocumentClass(name: "AmbientSound"): typeof foundry.documents.AmbientSoundDocument;
    function getDocumentClass(name: "Card"): typeof foundry.documents.Card;
    function getDocumentClass(name: "Cards"): typeof foundry.documents.Cards;
    function getDocumentClass(name: "ChatMessage"): typeof ChatMessagePF2e;
    function getDocumentClass(name: "Combat"): typeof EncounterPF2e;
    function getDocumentClass(name: "Combatant"): typeof CombatantPF2e;
    function getDocumentClass(name: "CombatantGroup"): typeof foundry.documents.CombatantGroup;
    function getDocumentClass(name: "Drawing"): typeof foundry.documents.DrawingDocument;
    function getDocumentClass(name: "FogExploration"): typeof foundry.documents.FogExploration;
    function getDocumentClass(name: "Folder"): typeof foundry.documents.Folder;
    function getDocumentClass(name: "Item"): typeof ItemPF2e;
    function getDocumentClass(name: "JournalEntry"): typeof foundry.documents.JournalEntry;
    function getDocumentClass(name: "JournalEntryCategory"): typeof foundry.documents.JournalEntryCategory;
    function getDocumentClass(name: "JournalEntryPage"): typeof foundry.documents.JournalEntryPage;
    function getDocumentClass(name: "Macro"): typeof MacroPF2e;
    function getDocumentClass(name: "MeasuredTemplate"): typeof MeasuredTemplatePF2e;
    function getDocumentClass(name: "Note"): typeof foundry.documents.NoteDocument;
    function getDocumentClass(name: "Playlist"): typeof foundry.documents.Playlist;
    function getDocumentClass(name: "PlaylistSound"): typeof foundry.documents.PlaylistSound;
    function getDocumentClass(name: "Region"): typeof RegionDocumentPF2e;
    function getDocumentClass(name: "RegionBehavior"): typeof RegionBehaviorPF2e;
    function getDocumentClass(name: "RollTable"): typeof foundry.documents.RollTable;
    function getDocumentClass(name: "Scene"): typeof ScenePF2e;
    function getDocumentClass(name: "Setting"): typeof foundry.documents.Setting;
    function getDocumentClass(name: "TableResult"): typeof foundry.documents.TableResult;
    function getDocumentClass(name: "Tile"): typeof TileDocumentPF2e;
    function getDocumentClass(name: "Token"): typeof TokenDocumentPF2e;
    function getDocumentClass(name: "User"): typeof UserPF2e;
    function getDocumentClass(name: "Wall"): typeof foundry.documents.WallDocument;
    function getDocumentClass<T extends foundry.abstract.Document>(name: DocumentType): ConstructorOf<T>;
}

export {};
