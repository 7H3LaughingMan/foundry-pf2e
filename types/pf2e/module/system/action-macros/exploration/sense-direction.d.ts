import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "./../../../actor/actions/index.ts";
declare function senseDirection(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, senseDirection as legacy };
