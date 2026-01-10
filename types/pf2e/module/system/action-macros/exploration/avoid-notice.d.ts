import { SingleCheckAction } from "./../../../actor/actions/index.ts";
import { SkillActionOptions } from "../index.ts";
declare function avoidNotice(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, avoidNotice as legacy };
