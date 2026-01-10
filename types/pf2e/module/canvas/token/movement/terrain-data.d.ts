import { TokenMeasureMovementPathOptions } from "#client/_types.mjs";
import { TokenMovementCostFunction } from "#client/documents/_types.mjs";
import { TokenDocumentPF2e } from "./../../../scene/index.ts";
export declare class TerrainDataPF2e extends foundry.data.TerrainData {
    #private;
    /** Make terrain difficulty additive instead of multiplicative. */
    static getMovementCostFunction(
        token: TokenDocumentPF2e,
        options?: TokenMeasureMovementPathOptions,
    ): TokenMovementCostFunction;
}
