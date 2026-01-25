import { default as CompendiumCollection } from "#client/documents/collections/compendium-collection.mjs";
import { ActorPF2e } from "./../actor/index.ts";
import { ItemPF2e } from "./../item/index.ts";
import appv1 = foundry.appv1;
/** Dialog used to view compendium data and migrate them. */
declare class CompendiumMigrationStatus extends appv1.api.Application {
    compendium: CompendiumCollection<ActorPF2e<null> | ItemPF2e<null>>;
    static get defaultOptions(): appv1.api.ApplicationV1Options;
    constructor(compendium: CompendiumCollection<ActorPF2e<null> | ItemPF2e<null>>);
    get id(): string;
    getData(options?: Partial<appv1.api.ApplicationV1Options> | undefined): Promise<object>;
    activateListeners($html: JQuery<HTMLElement>): void;
}
export { CompendiumMigrationStatus };
