import { MacroSource } from "../../../../foundry/common/documents/macro.ts";
import { MigrationBase } from "../base.ts";

/** Migrate rollActionMacro function parameters to an object */
export declare class Migration871MigrateRollActionMacroParams extends MigrationBase {
    static version: number;
    updateMacro(source: MacroSource): Promise<void>;
}
