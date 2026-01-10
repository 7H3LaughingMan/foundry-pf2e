import { SingleCheckAction } from "./../../../actor/actions/index.ts";
import { SkillActionOptions } from "../index.ts";
declare function senseDirection(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, senseDirection as legacy };
