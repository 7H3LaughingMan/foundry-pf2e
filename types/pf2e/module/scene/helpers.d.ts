import { ActorPF2e } from "types/pf2e/module/actor/index.ts";
import type { CreaturePF2e } from "types/pf2e/module/actor/creature/document.ts";
import { PrototypeTokenPF2e } from "types/pf2e/module/actor/data/base.ts";
import type { TokenDocumentPF2e } from "types/pf2e/module/scene/index.ts";
/** Check for auras containing newly-placed or moved tokens */
declare const checkAuras: () => void;
/** Assigns detection modes and sight settings for either a token or prototype token assuming RBV is enabled. */
declare function computeSightAndDetectionForRBV(token: TokenDocumentPF2e | PrototypeTokenPF2e<CreaturePF2e>): void;
/** Returns true if this token has the default actor image or the default image for its actor type */
declare function isDefaultTokenImage(token: TokenDocumentPF2e | PrototypeTokenPF2e<ActorPF2e>): boolean;
export { checkAuras, computeSightAndDetectionForRBV, isDefaultTokenImage };
