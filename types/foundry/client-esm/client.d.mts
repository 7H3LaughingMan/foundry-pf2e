import "../common/primitives/module.mjs";
import * as _utils from "../common/utils/module.mjs";

export * as utils from "../common/utils/module.mjs";

declare global {
    namespace foundry {
        export import utils = _utils;
    }
}
