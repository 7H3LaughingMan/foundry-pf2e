import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "./../../../actor/actions/index.ts";
declare function disableDevice(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, disableDevice as legacy };
