import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "./../../../actor/actions/index.ts";
declare function tumbleThrough(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, tumbleThrough as legacy };
