import { ActorPF2e, ItemPF2e, MacroPF2e, ScenePF2e } from "#foundry-pf2e";
import * as R from "remeda";

export function isActorPack(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<ActorPF2e<null>> {
    return R.isNonNullish(pack) && pack.documentName === "Actor";
}

export function isAdventurePack(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<foundry.documents.Adventure> {
    return R.isNonNullish(pack) && pack.documentName === "Adventure";
}

export function isCardsPack(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<foundry.documents.Cards> {
    return R.isNonNullish(pack) && pack.documentName === "Cards";
}

export function isItemPack(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<ItemPF2e<null>> {
    return R.isNonNullish(pack) && pack.documentName === "Item";
}

export function isJournalEntryPack(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<foundry.documents.JournalEntry> {
    return R.isNonNullish(pack) && pack.documentName === "JournalEntry";
}

export function isMacroPack(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<MacroPF2e> {
    return R.isNonNullish(pack) && pack.documentName === "Macro";
}

export function isPlaylistPack(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<foundry.documents.Playlist> {
    return R.isNonNullish(pack) && pack.documentName === "Playlist";
}

export function isRollTablePack(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<foundry.documents.RollTable> {
    return R.isNonNullish(pack) && pack.documentName === "RollTable";
}

export function isScenePack(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<ScenePF2e> {
    return R.isNonNullish(pack) && pack.documentName === "Scene";
}
