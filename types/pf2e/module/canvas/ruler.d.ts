import { ElevatedPoint } from "#common/_types.mjs";
export declare class RulerPF2e extends fc.interaction.Ruler {
    get path(): readonly Readonly<ElevatedPoint>[];
    set path(value: ElevatedPoint[]);
}
