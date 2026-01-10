import { Rolled } from "#client/dice/roll.mjs";
import { ImageFilePath } from "#common/constants.mjs";
import { AbilityItemPF2e } from "./../../item/index.ts";
import { EffectTrait } from "./../../item/abstract-effect/types.ts";
import { RangeData } from "./../../item/types.ts";
import { WeaponTrait } from "./../../item/weapon/types.ts";
import { CheckRoll } from "./../../system/check/index.ts";
import { DamageRoll } from "./../../system/damage/roll.ts";
import { DamageType } from "./../../system/damage/types.ts";
import { AttackRollParams, DamageRollParams } from "./../../system/rolls.ts";
import { Statistic } from "./../../system/statistic/index.ts";
import { CharacterPF2e } from "./document.ts";
import fields = foundry.data.fields;
declare class ElementalBlast {
    #private;
    actor: CharacterPF2e;
    /** The actor's impulse statistic */
    statistic: Statistic | null;
    /** The actor's Elemental Blast item */
    item: AbilityItemPF2e<CharacterPF2e> | null;
    /** Blast element/damage-type configurations available to the character */
    configs: ElementalBlastConfig[];
    /** Modifications of the blast from infusions */
    infusion: BlastInfusionData | null;
    constructor(actor: CharacterPF2e);
    get actionCost(): 1 | 2;
    /** Make an impulse attack roll as part of an elemental blast. */
    attack(params: BlastAttackParams): Promise<Rolled<CheckRoll> | null>;
    /** Make a damage roll as part of an elemental blast. */
    damage(
        params: BlastDamageParams & {
            getFormula: true;
        },
    ): Promise<string | null>;
    damage(params: BlastDamageParams): Promise<Rolled<DamageRoll> | string | null>;
    /** Set damage type according to the user's selection on the PC sheet */
    setDamageType({ element, damageType }: { element: EffectTrait; damageType: DamageType }): Promise<void>;
}
interface BlastAttackParams extends AttackRollParams {
    mapIncreases: number;
    element: EffectTrait;
    damageType: DamageType;
    melee: boolean;
}
interface BlastDamageParams extends DamageRollParams {
    element: EffectTrait;
    damageType: DamageType;
    melee: boolean;
    actionCost?: number;
    outcome?: "success" | "criticalSuccess";
}
type BlastConfigSchema = {
    element: fields.StringField<EffectTrait, EffectTrait, true, false, false>;
    label: fields.StringField<string, string, true, false, false>;
    img: fields.FilePathField<ImageFilePath, ImageFilePath, true, false, true>;
    damageTypes: fields.ArrayField<fields.StringField<DamageType, DamageType, true, false, false>>;
    range: fields.NumberField<number, number, true, false, false>;
    dieFaces: fields.NumberField<6 | 8, 6 | 8, true, false, false>;
};
type BlastInfusionSchema = {
    damageTypes: fields.ArrayField<fields.StringField<DamageType, DamageType, true, false, false>>;
    range: fields.SchemaField<
        {
            increment: fields.NumberField<number, number, true, false, false>;
            max: fields.NumberField<number, number, true, false, false>;
        },
        {
            increment: number;
            max: number;
        },
        {
            increment: number;
            max: number;
        },
        false,
        true,
        true
    >;
    traits: fields.SchemaField<{
        melee: fields.ArrayField<fields.StringField<WeaponTrait, WeaponTrait, true, false, false>>;
        ranged: fields.ArrayField<fields.StringField<WeaponTrait, WeaponTrait, true, false, false>>;
    }>;
};
type BlastInfusionData = fields.ModelPropsFromSchema<BlastInfusionSchema>;
interface ElementalBlastConfig extends Omit<fields.ModelPropsFromSchema<BlastConfigSchema>, "damageTypes" | "range"> {
    damageTypes: BlastConfigDamageType[];
    range: RangeData & {
        label: string;
    };
    statistic: Statistic;
    item: AbilityItemPF2e<CharacterPF2e>;
    actionCost: 1 | 2;
    ready: boolean;
    maps: {
        melee: {
            map0: string;
            map1: string;
            map2: string;
        };
        ranged: {
            map0: string;
            map1: string;
            map2: string;
        };
    };
}
interface BlastConfigDamageType {
    value: DamageType;
    label: string;
    icon: string;
    selected: boolean;
}
export { ElementalBlast, type ElementalBlastConfig };
