import { Size } from "./../../data.ts";
import { PartialPrice, RawCoins } from "./data.ts";
import { Currency } from "./types.ts";
/**
 * Money helper class that exposes methods to perform operations on coins without side effects.
 * @todo rename later
 */
declare class Coins implements RawCoins {
    #private;
    cp: number;
    sp: number;
    gp: number;
    pp: number;
    credits: number;
    upb: number;
    constructor(data?: Partial<Record<Currency, number>> | number | null);
    /** The total value of this coins in copper */
    get copperValue(): number;
    get goldValue(): number;
    plus(coins: Partial<Record<Currency, number>>): Coins;
    /** Multiply by a number and clean up result */
    scale(factor: number): Coins;
    /** Increase a price for larger physical-item sizes */
    adjustForSize(size: Size): Coins;
    /**
     * Returns a coins data object with all zero value denominations omitted.
     * This is used for persistence, so credits and upb are converted to silver pieces.
     */
    toObject(): RawCoins;
    /** Parses a price string such as "5 gp" and returns a new CoinsPF2e object */
    static fromString(coinString: string, quantity?: number): Coins;
    static fromPrice(price: PartialPrice, factor: number): Coins;
    /** Creates a new price string such as "5 gp" from this object */
    toString({ short, unit, decimal }?: CoinStringParams): string;
}
interface CoinStringParams {
    /** If true, indicates that space is limited. This omits displaying "credits" in sf2e */
    short?: boolean;
    /**
     * Shows the value in a specific unit, or a special type. The special types are:
     * - raw: shows the exact contained values without conversion
     * - primary: normalizes to gp in pf2e or credits in sf2e.
     *   If the system is pf2e and decimals is false, then 5 sp will be shown as 5 sp, but 50 sp will be shown as 5 gp.
     */
    unit?: Currency | "primary" | "raw";
    /** If enabled, the result is shown with decimals regardless of value, unless its credits */
    decimal?: boolean;
}
export { Coins, type RawCoins };
