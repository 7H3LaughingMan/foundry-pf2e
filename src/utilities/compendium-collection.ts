import { CompendiumDocument } from "#client/documents/_module.mjs";
import { CompendiumDocumentType } from "#client/utils/helpers.mjs";

import * as R from "remeda";

import CompendiumCollection = foundry.documents.collections.CompendiumCollection;

export function isCompendiumPack<T extends Actor<null>>(pack: unknown, type: "Actor"): pack is CompendiumCollection<T>;
export function isCompendiumPack<T extends Adventure>(pack: unknown, type: "Adventure"): pack is CompendiumCollection<T>;
export function isCompendiumPack<T extends Cards>(pack: unknown, type: "Cards"): pack is CompendiumCollection<T>;
export function isCompendiumPack<T extends Item<null>>(pack: unknown, type: "Item"): pack is CompendiumCollection<T>;
export function isCompendiumPack<T extends JournalEntry>(pack: unknown, type: "Item"): pack is CompendiumCollection<T>;
export function isCompendiumPack<T extends Macro>(pack: unknown, type: "Macro"): pack is CompendiumCollection<T>;
export function isCompendiumPack<T extends Playlist>(pack: unknown, type: "Playlist"): pack is CompendiumCollection<T>;
export function isCompendiumPack<T extends RollTable>(pack: unknown, type: "RollTable"): pack is CompendiumCollection<T>;
export function isCompendiumPack<T extends Scene>(pack: unknown, type: "Scene"): pack is CompendiumCollection<T>;
export function isCompendiumPack<T extends CompendiumDocument>(pack: unknown, type: CompendiumDocumentType): pack is CompendiumCollection<T> {
    return R.isNonNullish(pack) && pack instanceof CompendiumCollection && pack.documentName === type;
}
