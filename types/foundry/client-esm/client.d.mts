import * as _dice from "./dice/_module.mjs";

declare global {
    type Roll = _dice.Roll;
    var Roll: typeof _dice.Roll; // eslint-disable-line no-var
}
