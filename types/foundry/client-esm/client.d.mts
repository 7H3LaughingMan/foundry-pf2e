import "../common/primitives/module.mjs";

import * as _CONST from "../common/constants.mjs";
import * as _utils from "../common/utils/module.mjs";
import * as _grid from "../common/grid/_module.mjs";

export * as CONST from "../common/constants.mjs";
export * as utils from "../common/utils/module.mjs";
export * as grid from "../common/grid/_module.mjs";
export * as types from "./types.mjs";

declare global {
    namespace foundry {
        export import CONST = _CONST;
        export import utils = _utils;
        export import grid = _grid;
    }

    export import CONST = _CONST;
}
