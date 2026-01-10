import { SingleCheckAction } from "./../../../actor/actions/index.ts";
import { SkillActionOptions } from "../index.ts";
declare function pickALock(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, pickALock as legacy };
