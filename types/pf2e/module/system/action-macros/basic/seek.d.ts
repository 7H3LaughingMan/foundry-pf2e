import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "./../../../actor/actions/index.ts";
declare function seek(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, seek as legacy };
