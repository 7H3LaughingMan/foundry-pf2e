import { DataModelConstructionContext } from "./../../common/abstract/_types.mjs";
import BaseSystem, { SystemSource } from "./../../common/packages/base-system.mjs";
import ClientPackageMixin from "./../packages/client-package.mjs";

export default class System extends ClientPackageMixin(BaseSystem) {
    constructor(data: DeepPartial<SystemSource>, options?: DataModelConstructionContext<null>);

    protected override _configure(options?: Record<string, unknown>): void;
}
