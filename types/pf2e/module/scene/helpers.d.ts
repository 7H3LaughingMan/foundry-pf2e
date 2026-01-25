import { PrototypeTokenPF2e } from "./../actor/data/base.ts";
import { ActorPF2e } from "./../actor/index.ts";
import { TokenDocumentPF2e } from "./index.ts";
/** Check for auras containing newly-placed or moved tokens */
declare const checkAuras: () => void;
/** Returns true if this token has the default actor image or the default image for its actor type */
declare function isDefaultTokenImage(token: TokenDocumentPF2e | PrototypeTokenPF2e<ActorPF2e>): boolean;
export { checkAuras, isDefaultTokenImage };
