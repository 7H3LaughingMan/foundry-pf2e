import { SingleCheckAction } from "./../../../actor/actions/index.ts";
import { SkillActionOptions } from "../index.ts";
declare function climb(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, climb as legacy };
