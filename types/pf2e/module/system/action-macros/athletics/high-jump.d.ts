import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "types/pf2e/module/actor/actions/index.ts";
declare function highJump(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { highJump as legacy, action };
