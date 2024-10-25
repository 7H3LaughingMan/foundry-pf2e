import { CharacterPF2e } from '../../index.ts';
import { FeatPF2e, ItemPF2e } from '../../../item/index.ts';
import { FeatGroup } from './group.ts';
import { FeatGroupData } from './types.ts';
declare class CharacterFeats<TActor extends CharacterPF2e> extends Collection<FeatGroup<TActor>> {
    #private;
    private actor;
    /** Feats belonging no actual group ("bonus feats" in rules text) */
    bonus: FeatGroup<TActor>;
    constructor(actor: TActor);
    createGroup(data: FeatGroupData): this;
    /** Inserts a feat into the character. If groupId is empty string, it's a bonus feat. */
    insertFeat(feat: FeatPF2e, slotData: {
        groupId: string;
        slotId: string | null;
    } | null): Promise<ItemPF2e<TActor>[]>;
    /** Assigns existing feats to their correct spots during data preparation */
    assignToSlots(): void;
}
interface CharacterFeats<TActor extends CharacterPF2e> extends Collection<FeatGroup<TActor>> {
    get(key: "ancestry" | "ancestryfeature" | "class" | "classfeature" | "general" | "skill"): FeatGroup<TActor>;
    get(key: string): FeatGroup<TActor> | undefined;
}
export { CharacterFeats };
