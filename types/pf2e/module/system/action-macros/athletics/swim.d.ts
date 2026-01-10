import { SingleCheckAction } from "./../../../actor/actions/index.ts";
import { SkillActionOptions } from "../index.ts";
declare function swim(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, swim as legacy };
