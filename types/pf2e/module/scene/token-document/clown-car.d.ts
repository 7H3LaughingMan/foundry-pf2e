import { PartyPF2e } from "../../actor/index.ts";
import { ScenePF2e, TokenDocumentPF2e } from "../index.ts";

/** A helper class to manage a party token's loaded/unloaded state */
declare class PartyClownCar {
    #private;
    party: PartyPF2e;
    token: TokenDocumentPF2e<ScenePF2e>;
    constructor(token: TokenDocumentPF2e<ScenePF2e>);
    get scene(): ScenePF2e;
    get memberTokens(): TokenDocumentPF2e<ScenePF2e>[];
    toggleState(): Promise<void>;
}
export { PartyClownCar };
