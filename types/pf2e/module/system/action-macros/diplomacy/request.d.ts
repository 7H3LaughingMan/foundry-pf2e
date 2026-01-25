import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "./../../../actor/actions/index.ts";
declare function request(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, request as legacy };
