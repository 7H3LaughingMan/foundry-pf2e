import { SceneUpdateOptions } from "#client/documents/scene.mjs";
import { DatabaseDeleteOperation, DatabaseUpdateOperation, Document, EmbeddedCollection } from "#common/abstract/_module.mjs";
import { SceneFlagsPF2e } from "./data.ts";
import { AmbientLightDocumentPF2e, MeasuredTemplateDocumentPF2e, RegionDocumentPF2e, TileDocumentPF2e, TokenDocumentPF2e } from "./index.ts";
import { SceneConfigPF2e } from "./sheet.ts";
declare class ScenePF2e extends Scene {
    #private;
    /** Is the rules-based vision setting enabled? */
    get rulesBasedVision(): boolean;
    /** Are auras supported on this scene? */
    get canHaveAuras(): boolean;
    get hearingRange(): number | null;
    /** Is this scene's darkness value synced to the world time? */
    get darknessSyncedToTime(): boolean;
    get lightLevel(): number;
    get isBright(): boolean;
    get isDimlyLit(): boolean;
    get isDark(): boolean;
    /** Whether this scene is "in focus": the active scene, or the viewed scene if only a single GM is logged in */
    get isInFocus(): boolean;
    prepareData(): void;
    /** Toggle Unrestricted Global Vision according to scene darkness level */
    prepareBaseData(): void;
    /** Synchronize a token's dimensions with its actor's size category. */
    syncTokenDimensions(
        tokenDoc: TokenDocumentPF2e,
        dimensions: {
            width: number;
            height: number;
        },
    ): void;
    _onUpdate(changed: DeepPartial<this["_source"]>, options: SceneUpdateOptions, userId: string): void;
    protected _onUpdateDescendantDocuments<P extends Document>(
        parent: P,
        collection: string,
        documents: Document<P>[],
        changes: Record<string, unknown>[],
        options: DatabaseUpdateOperation<P>,
        userId: string,
    ): void;
    protected _onDeleteDescendantDocuments<P extends Document>(
        parent: P,
        collection: string,
        documents: Document<P>[],
        ids: string[],
        options: DatabaseDeleteOperation<P>,
        userId: string,
    ): void;
}
interface ScenePF2e extends Scene {
    flags: SceneFlagsPF2e;
    /** Check for auras containing newly-placed or moved tokens (added as a debounced method) */
    checkAuras(): void;
    readonly lights: EmbeddedCollection<AmbientLightDocumentPF2e<this>>;
    readonly regions: EmbeddedCollection<RegionDocumentPF2e<this>>;
    readonly templates: EmbeddedCollection<MeasuredTemplateDocumentPF2e<this>>;
    readonly tiles: EmbeddedCollection<TileDocumentPF2e<this>>;
    readonly tokens: EmbeddedCollection<TokenDocumentPF2e<this>>;
    get sheet(): SceneConfigPF2e<this>;
}
export { ScenePF2e };
