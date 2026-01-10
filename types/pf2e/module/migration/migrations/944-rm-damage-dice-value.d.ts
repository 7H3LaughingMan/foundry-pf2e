import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Remove the `value` field of DamageDice REs. Bracketed values are handled in migration 945. */
export declare class Migration944RmDamageDiceValue extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
