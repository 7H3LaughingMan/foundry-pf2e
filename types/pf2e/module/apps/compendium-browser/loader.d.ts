import { CompendiumDocument } from "#client/documents/_module.mjs";
import {
    default as CompendiumCollection,
    CompendiumIndexData,
} from "#client/documents/collections/compendium-collection.mjs";
import { CompendiumBrowserSources } from "./browser.ts";
declare class PackLoader {
    #private;
    loadedSources: string[];
    sourcesSettings: CompendiumBrowserSources;
    constructor();
    loadPacks(
        documentType: "Actor" | "Item",
        packs: string[],
        indexFields: string[],
    ): AsyncGenerator<
        {
            pack: CompendiumCollection<CompendiumDocument>;
            index: Collection<string, CompendiumIndexData>;
        },
        void,
        unknown
    >;
    updateSources(packs: string[]): Promise<void>;
    reset(): void;
    hardReset(packs: string[]): Promise<void>;
}
export { PackLoader };
