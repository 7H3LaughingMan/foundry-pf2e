import { SingleCheckAction } from "./../../../actor/actions/index.ts";
import { SkillActionOptions } from "../index.ts";
declare function disableDevice(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, disableDevice as legacy };
