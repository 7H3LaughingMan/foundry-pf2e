import * as R from "remeda";

export function isActorPack<T extends foundry.documents.Actor<null>>(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<T> {
    return R.isNonNullish(pack) && pack.documentName === "Actor";
}

export function isAdventurePack<T extends foundry.documents.Adventure>(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<T> {
    return R.isNonNullish(pack) && pack.documentName === "Adventure";
}

export function isCardsPack<T extends foundry.documents.Cards>(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<T> {
    return R.isNonNullish(pack) && pack.documentName === "Cards";
}

export function isItemPack<T extends foundry.documents.Item<null>>(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<T> {
    return R.isNonNullish(pack) && pack.documentName === "Item";
}

export function isJournalEntryPack<T extends foundry.documents.JournalEntry>(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<T> {
    return R.isNonNullish(pack) && pack.documentName === "JournalEntry";
}

export function isMacroPack<T extends foundry.documents.Macro>(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<T> {
    return R.isNonNullish(pack) && pack.documentName === "Macro";
}

export function isPlaylistPack<T extends foundry.documents.Playlist>(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<T> {
    return R.isNonNullish(pack) && pack.documentName === "Playlist";
}

export function isRollTablePack<T extends foundry.documents.RollTable>(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<T> {
    return R.isNonNullish(pack) && pack.documentName === "RollTable";
}

export function isScenePack<T extends foundry.documents.Scene>(
    pack: Maybe<foundry.documents.collections.CompendiumCollection>,
): pack is foundry.documents.collections.CompendiumCollection<T> {
    return R.isNonNullish(pack) && pack.documentName === "Scene";
}
