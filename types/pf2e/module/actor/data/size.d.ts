import { Size } from "./../../data.ts";
export declare class ActorSizePF2e {
    #private;
    /** The size category of this category */
    value: Size;
    /** The length dimension of this actor's space in feet: corresponds with token `height` */
    long: number;
    /** The width dimension of this actor's space in feet */
    wide: number;
    /** The actor dimensions as canvas square-grid values */
    get tokenDimensions(): {
        width: number;
        height: number;
    };
    /**
     * @param params
     * @param params.value A size category
     * @param params.long A length of a Pathfinder "space"
     * @param params.wide A width of a Pathfinder "space"
     * @param params.smallIsMedium Treat small as medium
     */
    constructor(params: { value?: Size; long?: number; wide?: number; smallIsMedium?: boolean });
    /**
     * Test for equality between this and another size, falling back to comparing areas in case of a category tie
     * @param size The size to which this size is being compared
     * @param [smallIsMedium] Treat small as medium for both sizes
     */
    equals(
        size: ActorSizePF2e | Size,
        {
            smallIsMedium,
        }?: {
            smallIsMedium?: boolean | undefined;
        },
    ): boolean;
    /**
     * Test whether this size is larger than another, falling back to comparing areas in case of a category tie
     * @param size The size to which this size is being compared
     * @param [smallIsMedium] Treat small as medium for both sizes
     */
    isLargerThan(
        size: ActorSizePF2e | Size,
        {
            smallIsMedium,
        }?: {
            smallIsMedium?: boolean | undefined;
        },
    ): boolean;
    /**
     * Test whether this size is smaller than another, falling back to comparing areas in case of a category tie
     * @param size The size to which this size is being compared
     * @param [smallIsMedium] Treat small as medium for both sizes
     */
    isSmallerThan(
        size: ActorSizePF2e | Size,
        {
            smallIsMedium,
        }?: {
            smallIsMedium?: boolean | undefined;
        },
    ): boolean;
    /**
     * Get the difference in number of size categories between this and another size
     * @param size The size to which this size is being compared
     * @param [smallIsMedium] Ignore the difference between small and medium
     */
    difference(
        size: ActorSizePF2e,
        {
            smallIsMedium,
        }?: {
            smallIsMedium?: boolean | undefined;
        },
    ): number;
    /**
     * Get the "effective" size of a size category in case the `smallIsMedium` option was passed
     * @param size The size used for comparison in the calling method
     * @param [smallIsMedium] Return this size if both this and `size` are small or medium
     */
    private getEffectiveSize;
    /**
     * Increase this size the next larger category
     * @param [skipSmall] Skip a size if the current size is tiny or small
     */
    increment({ skipSmall }?: { skipSmall?: boolean | undefined }): void;
    /**
     * Increase this size the next smaller category
     * @param [skipSmall] Skip a size if the current size is tiny or small
     */
    decrement({ skipSmall }?: { skipSmall?: boolean | undefined }): void;
    toString(): string;
}
