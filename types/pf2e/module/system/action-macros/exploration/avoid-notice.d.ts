import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "./../../../actor/actions/index.ts";
declare function avoidNotice(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, avoidNotice as legacy };
