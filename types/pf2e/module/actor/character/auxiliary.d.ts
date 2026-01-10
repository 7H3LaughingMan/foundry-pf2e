import { WeaponPF2e } from "./../../item/index.ts";
import { ItemCarryType } from "./../../item/physical/index.ts";
import { ZeroToThree, ZeroToTwo } from "./../../data.ts";
import { SheetOptions } from "./../../sheet/helpers.ts";
import { CharacterPF2e } from "./document.ts";
interface AuxiliaryInteractParams {
    weapon: WeaponPF2e<CharacterPF2e>;
    action: "interact";
    annotation: "draw" | "grip" | "modular" | "pick-up" | "retrieve" | "sheathe";
    hands?: ZeroToTwo;
}
interface AuxiliaryWeaponParryParams {
    weapon: WeaponPF2e<CharacterPF2e>;
    action: "parry";
    annotation?: never;
    hands?: never;
}
interface AuxiliaryShieldParams {
    weapon: WeaponPF2e<CharacterPF2e>;
    action: "end-cover" | "raise-a-shield" | "take-cover";
    annotation?: "tower-shield";
    hands?: never;
}
interface AuxiliaryReleaseParams {
    weapon: WeaponPF2e<CharacterPF2e>;
    action: "release";
    annotation: "grip" | "drop";
    hands: 0 | 1;
}
type AuxiliaryActionParams =
    | AuxiliaryInteractParams
    | AuxiliaryWeaponParryParams
    | AuxiliaryShieldParams
    | AuxiliaryReleaseParams;
type AuxiliaryActionType = AuxiliaryActionParams["action"];
type AuxiliaryActionPurpose = AuxiliaryActionParams["annotation"];
/** Create an "auxiliary" action, an Interact or Release action using a weapon */
declare class WeaponAuxiliaryAction {
    readonly weapon: WeaponPF2e<CharacterPF2e>;
    readonly action: AuxiliaryActionType;
    readonly actions: ZeroToThree;
    readonly carryType: ItemCarryType | null;
    readonly hands: ZeroToTwo | null;
    readonly annotation: NonNullable<AuxiliaryActionPurpose> | null;
    /** A "full purpose" reflects the options to draw, sheathe, etc. a weapon */
    readonly fullAnnotation: string | null;
    constructor({ weapon, action, annotation, hands }: AuxiliaryActionParams);
    get actor(): CharacterPF2e;
    get label(): string;
    get glyph(): string;
    get options(): SheetOptions | null;
    /**
     * Execute an auxiliary action.
     * [options.selection] A choice of some kind: currently only has meaning for modular trait toggling
     */
    execute({ selection }?: { selection?: string | null }): Promise<void>;
}
export { WeaponAuxiliaryAction };
