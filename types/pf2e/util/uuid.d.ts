import {
    ActorUUID,
    CompendiumActorUUID,
    CompendiumItemUUID,
    EmbeddedItemUUID,
    ItemUUID,
    TokenDocumentUUID,
    WorldItemUUID,
} from "#client/documents/_module.mjs";
import { CompendiumUUID } from "#client/utils/_module.mjs";
import { default as Document } from "#common/abstract/document.mjs";
import { ActorPF2e } from "./../module/actor/index.ts";
import { ItemPF2e } from "./../module/item/index.ts";
declare class UUIDUtils {
    /** Retrieve multiple documents by UUID */
    static fromUUIDs(
        uuids: ActorUUID[],
        options?: {
            relative?: Maybe<Document>;
        },
    ): Promise<ActorPF2e[]>;
    static fromUUIDs(
        uuids: ItemUUID[],
        options?: {
            relative?: Maybe<Document>;
        },
    ): Promise<ItemPF2e[]>;
    static fromUUIDs(
        uuids: string[],
        options?: {
            relative?: Maybe<Document>;
        },
    ): Promise<Document[]>;
    static isItemUUID(
        uuid: unknown,
        options: {
            embedded: true;
        },
    ): uuid is EmbeddedItemUUID;
    static isItemUUID(
        uuid: unknown,
        options: {
            embedded: false;
        },
    ): uuid is WorldItemUUID | CompendiumItemUUID;
    static isItemUUID(
        uuid: unknown,
        options?: {
            embedded?: boolean;
        },
    ): uuid is ItemUUID;
    static isCompendiumUUID(uuid: unknown, docType: "Actor"): uuid is CompendiumActorUUID;
    static isCompendiumUUID(uuid: unknown, docType: "Item"): uuid is CompendiumItemUUID;
    static isCompendiumUUID<TDocType extends DocumentType>(uuid: unknown, docType?: TDocType): uuid is CompendiumUUID;
    static isTokenUUID(uuid: unknown): uuid is TokenDocumentUUID;
}
export { UUIDUtils };
