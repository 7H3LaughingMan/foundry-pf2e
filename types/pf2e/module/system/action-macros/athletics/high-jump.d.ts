import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "./../../../actor/actions/index.ts";
declare function highJump(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, highJump as legacy };
