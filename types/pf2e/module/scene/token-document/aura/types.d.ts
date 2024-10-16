import { AuraAppearanceData } from "types/pf2e/module/actor/types.ts";
import { ItemTrait } from "types/pf2e/module/item/base/data/system.ts";
import type { TokenPF2e } from "types/pf2e/module/canvas/index.ts";
import type { TokenDocumentPF2e } from "../index.ts";
interface TokenAuraData {
    /** The radius of the aura, measured in feet from the boundary of a token's space */
    radius: number;
    /** The token from which this aura is emanating */
    token: TokenPF2e | TokenDocumentPF2e;
    /** The rectangle defining this aura's space */
    bounds: PIXI.Rectangle;
    /** The pixel-coordinate radius of this aura, measured from the center */
    radiusPixels: number;
    appearance: AuraAppearanceData;
    /** Traits (especially "visual" and "auditory") associated with this aura */
    traits: ItemTrait[];
}
export type { TokenAuraData };
