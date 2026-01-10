declare class MystifiedTraits {
    private static mystifiedTraits;
    static compile(): void;
    /** Exclude any mystified traits from the provided trait list */
    static has(trait: string): boolean;
}
declare const ITEM_CARRY_TYPES: readonly ["attached", "dropped", "held", "implanted", "installed", "stowed", "worn"];
export { ITEM_CARRY_TYPES, MystifiedTraits };
