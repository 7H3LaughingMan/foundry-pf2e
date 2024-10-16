import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "types/pf2e/module/actor/actions/index.ts";
declare function lie(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { lie as legacy, action };
