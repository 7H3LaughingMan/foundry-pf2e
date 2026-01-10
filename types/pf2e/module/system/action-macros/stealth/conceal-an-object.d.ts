import { SingleCheckAction } from "./../../../actor/actions/index.ts";
import { SkillActionOptions } from "../index.ts";
declare function concealAnObject(options: SkillActionOptions): Promise<void>;
declare const action: SingleCheckAction;
export { action, concealAnObject as legacy };
