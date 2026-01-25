import { UserAction } from "#common/constants.mjs";
import { MeleePF2e } from "./../../item/index.ts";
import { ItemType } from "./../../item/types.ts";
import { RollNotePF2e } from "./../../notes.ts";
import { CreatureIdentificationData } from "./../../recall-knowledge.ts";
import { TokenDocumentPF2e } from "./../../scene/index.ts";
import { Abilities } from "./../creature/data.ts";
import { CreatureUpdateCallbackOptions } from "./../creature/index.ts";
import { CreaturePF2e } from "./../index.ts";
import { ActorInitiative } from "./../initiative.ts";
import { NPCFlags, NPCSource, NPCSystemData } from "./data.ts";
import { VariantCloneParams } from "./types.ts";
declare class NPCPF2e<
    TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null,
> extends CreaturePF2e<TParent> {
    #private;
    initiative: ActorInitiative;
    get allowedItemTypes(): (ItemType | "physical")[];
    /** The level of this creature without elite/weak adjustments */
    get baseLevel(): number;
    /** This NPC's attribute modifiers */
    get abilities(): Abilities;
    get description(): string;
    /** Does this NPC have the Elite adjustment? */
    get isElite(): boolean;
    /** Does this NPC have the Weak adjustment? */
    get isWeak(): boolean;
    get identificationDCs(): CreatureIdentificationData;
    /** A user can see an unlinked NPC in the actor directory only if they have at least Observer permission */
    get visible(): boolean;
    /** Non-owning users may be able to loot a dead NPC. */
    canUserModify(user: fd.BaseUser, action: UserAction): boolean;
    /** Setup base ephemeral data to be modified by active effects and derived-data preparation */
    prepareBaseData(): void;
    prepareDerivedData(): void;
    private prepareSaves;
    private prepareSkills;
    getAttackEffects(attack: MeleePF2e): Promise<RollNotePF2e[]>;
    private getHpAdjustment;
    /** Make the NPC elite, weak, or normal */
    applyAdjustment(adjustment: "elite" | "weak" | null): Promise<void>;
    /** Create a variant clone of this NPC, adjusting any of name, description, and images */
    variantClone(
        params: VariantCloneParams & {
            save?: false;
        },
    ): this;
    variantClone(
        params: VariantCloneParams & {
            save: true;
        },
    ): Promise<this>;
    variantClone(params: VariantCloneParams): this | Promise<this>;
    protected _preUpdate(
        changed: DeepPartial<this["_source"]>,
        options: CreatureUpdateCallbackOptions,
        user: fd.BaseUser,
    ): Promise<boolean | void>;
}
interface NPCPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    flags: NPCFlags;
    readonly _source: NPCSource;
    system: NPCSystemData;
}
export { NPCPF2e };
