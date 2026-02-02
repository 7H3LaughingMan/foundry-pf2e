import { CompendiumDocument } from "#client/documents/_module.mjs";
import { CompendiumDocumentType } from "#client/utils/helpers.mjs";
import { ActorPF2e } from "#pf2e-module/actor/base.js";
import { ItemPF2e } from "#pf2e-module/item/base/document.js";
import { MacroPF2e } from "#pf2e-module/macro.js";
import { ScenePF2e } from "#pf2e-module/scene/document.js";

import * as R from "remeda";

export function isCompendiumPack(
    pack: unknown,
    type: "Actor",
): pack is foundry.documents.collections.CompendiumCollection<ActorPF2e<null>>;
export function isCompendiumPack(
    pack: unknown,
    type: "Adventure",
): pack is foundry.documents.collections.CompendiumCollection<foundry.documents.Adventure>;
export function isCompendiumPack(
    pack: unknown,
    type: "Cards",
): pack is foundry.documents.collections.CompendiumCollection<foundry.documents.Cards>;
export function isCompendiumPack(
    pack: unknown,
    type: "Item",
): pack is foundry.documents.collections.CompendiumCollection<ItemPF2e<null>>;
export function isCompendiumPack(
    pack: unknown,
    type: "Item",
): pack is foundry.documents.collections.CompendiumCollection<foundry.documents.JournalEntry>;
export function isCompendiumPack(
    pack: unknown,
    type: "Macro",
): pack is foundry.documents.collections.CompendiumCollection<MacroPF2e>;
export function isCompendiumPack(
    pack: unknown,
    type: "Playlist",
): pack is foundry.documents.collections.CompendiumCollection<foundry.documents.Playlist>;
export function isCompendiumPack(
    pack: unknown,
    type: "RollTable",
): pack is foundry.documents.collections.CompendiumCollection<foundry.documents.RollTable>;
export function isCompendiumPack(
    pack: unknown,
    type: "Scene",
): pack is foundry.documents.collections.CompendiumCollection<ScenePF2e>;
export function isCompendiumPack<T extends CompendiumDocument>(
    pack: unknown,
    type: CompendiumDocumentType,
): pack is foundry.documents.collections.CompendiumCollection<T> {
    return (
        R.isNonNullish(pack) &&
        pack instanceof foundry.documents.collections.CompendiumCollection &&
        pack.documentName === type
    );
}
