import { AttributeString, SaveType, SkillSlug } from "types/pf2e/module/actor/types.ts";
import { ABCSystemData, ABCSystemSource } from "types/pf2e/module/item/abc/data.ts";
import { BaseItemSourcePF2e, RarityTraitAndOtherTags } from "types/pf2e/module/item/base/data/system.ts";
import { ZeroToFour } from "types/pf2e/module/data.ts";
type ClassSource = BaseItemSourcePF2e<"class", ClassSystemSource>;
interface ClassSystemSource extends ABCSystemSource {
    traits: RarityTraitAndOtherTags;
    keyAbility: {
        value: AttributeString[];
        selected: AttributeString | null;
    };
    hp: number;
    perception: ZeroToFour;
    savingThrows: Record<SaveType, ZeroToFour>;
    attacks: ClassAttackProficiencies;
    defenses: ClassDefenseProficiencies;
    /** Starting proficiency in "spell attack rolls and DCs" */
    spellcasting: ZeroToFour;
    trainedSkills: {
        value: SkillSlug[];
        additional: number;
    };
    ancestryFeatLevels: {
        value: number[];
    };
    classFeatLevels: {
        value: number[];
    };
    generalFeatLevels: {
        value: number[];
    };
    skillFeatLevels: {
        value: number[];
    };
    skillIncreaseLevels: {
        value: number[];
    };
    level?: never;
}
interface ClassSystemData extends Omit<ClassSystemSource, "description">, Omit<ABCSystemData, "level" | "traits"> {
}
interface ClassAttackProficiencies {
    simple: ZeroToFour;
    martial: ZeroToFour;
    advanced: ZeroToFour;
    unarmed: ZeroToFour;
    other: {
        name: string;
        rank: ZeroToFour;
    };
}
interface ClassDefenseProficiencies {
    unarmored: ZeroToFour;
    light: ZeroToFour;
    medium: ZeroToFour;
    heavy: ZeroToFour;
}
export type { ClassAttackProficiencies, ClassDefenseProficiencies, ClassSource, ClassSystemData, ClassSystemSource };
