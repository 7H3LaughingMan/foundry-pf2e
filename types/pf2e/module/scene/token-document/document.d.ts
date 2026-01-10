import { ActorPF2e } from "./../../actor/index.ts";
import { PrototypeTokenPF2e } from "./../../actor/data/base.ts";
import { TrackedAttributesDescription } from "#client/_types.mjs";
import { TokenResourceData } from "#client/canvas/placeables/token.mjs";
import { TokenUpdateCallbackOptions } from "#client/documents/token.mjs";
import { Point } from "#common/_types.mjs";
import {
    DatabaseCreateCallbackOptions,
    DatabaseDeleteCallbackOptions,
    DatabaseOperation,
} from "#common/abstract/_types.mjs";
import { default as Document } from "#common/abstract/document.mjs";
import { GridMeasurePathResult } from "#common/grid/_types.mjs";
import { TokenPF2e } from "./../../canvas/index.ts";
import { CombatantPF2e, EncounterPF2e } from "./../../encounter/index.ts";
import { DifficultTerrainGrade, RegionDocumentPF2e } from "./../index.ts";
import { ScenePF2e } from "../document.ts";
import { TokenAura } from "./aura/index.ts";
import { TokenFlagsPF2e } from "./data.ts";
import { TokenConfigPF2e } from "./sheets/token-config.ts";
declare class TokenDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends TokenDocument<TParent> {
    #private;
    auras: Map<string, TokenAura>;
    /** Returns if the token is in combat, though some actors have different conditions */
    get inCombat(): boolean;
    /** This should be in Foundry core, but ... */
    get scene(): TParent;
    /** Is this token emitting light with a negative value */
    get emitsDarkness(): boolean;
    get rulesBasedVision(): boolean;
    /** Is rules-based vision enabled, and does this token's actor have low-light vision (inclusive of darkvision)? */
    get hasLowLightVision(): boolean;
    /** Is rules-based vision enabled, and does this token's actor have darkvision vision? */
    get hasDarkvision(): boolean;
    /** Is this token's dimensions linked to its actor's size category? */
    get linkToActorSize(): boolean;
    /** Is this token's scale locked at 1 or (for small creatures) 0.8? */
    get autoscale(): boolean;
    get playersCanSeeName(): boolean;
    /** The pixel-coordinate definition of this token's space */
    get bounds(): PIXI.Rectangle;
    /** Bounds used for mechanics, such as flanking and drawing auras */
    get mechanicalBounds(): PIXI.Rectangle;
    get isTiny(): boolean;
    /** The pixel-coordinate pair constituting this token's center */
    get center(): Point;
    /** The grade of difficult terrain at this token's position */
    get difficultTerrain(): DifficultTerrainGrade;
    /** Check actor for effects found in `CONFIG.specialStatusEffects` */
    hasStatusEffect(statusId: string): boolean;
    /** Filter trackable attributes for relevance and avoidance of circular references */
    static getTrackedAttributes(data?: Record<string, unknown>, _path?: string[]): TrackedAttributesDescription;
    static getTrackedAttributeChoices(attributes?: TrackedAttributesDescription): TrackedAttributesDescription;
    /** Synchronize the token image with the actor image if the token does not currently have an image */
    static assignDefaultImage(token: TokenDocumentPF2e | PrototypeTokenPF2e<ActorPF2e>): void;
    /** Set a TokenData instance's dimensions from actor data. Static so actors can use for their prototypes */
    static prepareScale(token: TokenDocumentPF2e | PrototypeTokenPF2e<ActorPF2e>): void;
    /** Make stamina, resolve, and shield HP editable despite not being present in template.json */
    getBarAttribute(
        barName: string,
        options?: {
            alternative?: string;
        },
    ): TokenResourceData | null;
    /** Recalculate measurements of tiny-token movement to avoid upstream's partial square calculations. */
    measureMovementPath(
        waypoints: fd.TokenMeasureMovementPathWaypoint[],
        options?: {
            cost?: fd.TokenMovementCostFunction;
        },
    ): GridMeasurePathResult;
    protected _initialize(options?: Record<string, unknown>): void;
    /** If rules-based vision is enabled, disable manually configured vision radii */
    prepareBaseData(): void;
    /** Set vision and detection modes based on actor data */
    protected _prepareDetectionModes(): void;
    protected _inferMovementAction(): string;
    /** Set a token's initiative on the current encounter, creating a combatant if necessary */
    setInitiative({ initiative, sendMessage }: { initiative: number; sendMessage?: boolean }): Promise<void>;
    /**
     * Use actor updates (real or otherwise) that propagate down to ephemeral token changes  to provoke canvas object
     * re-rendering.
     */
    simulateUpdate(updates?: Record<string, unknown>): void;
    /** Ensure that actors that don't allow synthetics are linked. */
    protected _preCreate(
        data: DeepPartial<this["_source"]>,
        options: DatabaseCreateCallbackOptions,
        user: fd.BaseUser,
    ): Promise<boolean | void>;
    /** Ensure that actors that don't allow synthetics stay linked. */
    protected _preUpdate(
        data: Record<string, unknown>,
        options: TokenUpdateCallbackOptions,
        user: fd.BaseUser,
    ): Promise<boolean | void>;
    /** Toggle token hiding if this token's actor is a loot actor */
    protected _onCreate(data: this["_source"], options: DatabaseCreateCallbackOptions, userId: string): void;
    protected _onUpdate(
        changed: DeepPartial<this["_source"]>,
        options: TokenUpdateCallbackOptions,
        userId: string,
    ): void;
    protected _onRelatedUpdate(
        update?:
            | {
                  _id?: string;
                  [key: string]: unknown;
              }
            | {
                  _id?: string;
                  [key: string]: unknown;
              }[],
        operation?: Partial<DatabaseOperation<Document | null>>,
    ): void;
    protected _onDelete(options: DatabaseDeleteCallbackOptions, userId: string): void;
}
interface TokenDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends TokenDocument<TParent> {
    flags: TokenFlagsPF2e;
    regions: Set<RegionDocumentPF2e<NonNullable<TParent>>>;
    get actor(): ActorPF2e<this | null> | null;
    get combatant(): CombatantPF2e<EncounterPF2e, this> | null;
    get object(): TokenPF2e<this> | null;
    get sheet(): TokenConfigPF2e;
}
export { TokenDocumentPF2e };
