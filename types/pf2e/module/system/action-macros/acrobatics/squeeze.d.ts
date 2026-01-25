import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "./../../../actor/actions/index.ts";
declare function squeeze(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, squeeze as legacy };
