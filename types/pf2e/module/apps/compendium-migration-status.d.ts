


import type { ActorPF2e } from "types/pf2e/module/actor/index.ts";
import type { ItemPF2e } from "types/pf2e/module/item/index.ts";
/** Dialog used to view compendium data and migrate them. */
declare class CompendiumMigrationStatus extends Application {
    compendium: CompendiumCollection<ActorPF2e<null> | ItemPF2e<null>>;
    static get defaultOptions(): ApplicationOptions;
    constructor(compendium: CompendiumCollection<ActorPF2e<null> | ItemPF2e<null>>);
    get id(): string;
    getData(options?: Partial<ApplicationOptions> | undefined): Promise<object>;
    activateListeners($html: JQuery<HTMLElement>): void;
}
export { CompendiumMigrationStatus };
