import { joinString } from "./modules/string";

export const SYSTEM = {
    get id(): SystemId {
        return game.system.id as SystemId;
    },
    get isPF2e(): boolean {
        return this.id === "pf2e";
    },
    get isSF2e(): boolean {
        return this.id === "sf2e";
    },
    path<T extends string>(tail: T): () => `systems/${SystemId}/${T}` {
        return () => this.getPath(tail);
    },
    uuid<P extends foundry.utils.CompendiumUUID, S extends foundry.utils.CompendiumUUID>(
        pf2e: P,
        sf2e: S,
    ): () => P | S {
        return () => this.getUuid(pf2e, sf2e);
    },
    getFlag<T>(obj: foundry.abstract.Document, ...path: string[]): T {
        return obj.getFlag(this.id, joinString(".", ...path)) as T;
    },
    getPack<T extends foundry.documents.CompendiumDocument>(
        name: string,
    ): foundry.documents.collections.CompendiumCollection<T> | undefined {
        return game.packs.get(`${this.id}.${name}`) as
            | foundry.documents.collections.CompendiumCollection<T>
            | undefined;
    },
    getPath<T extends string>(tail: T): `systems/${SystemId}/${T}` {
        return `systems/${this.id}/${tail}`;
    },
    getUuid<P extends foundry.utils.CompendiumUUID, S extends foundry.utils.CompendiumUUID>(pf2e: P, sf2e: S): P | S {
        return this.isPF2e ? pf2e : sf2e;
    },
};
