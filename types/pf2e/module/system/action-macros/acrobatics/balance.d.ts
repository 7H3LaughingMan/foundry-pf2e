import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "./../../../actor/actions/index.ts";
declare function balance(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, balance as legacy };
