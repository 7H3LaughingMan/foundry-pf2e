import { SingleCheckAction } from "./../../../actor/actions/index.ts";
import { SkillActionOptions } from "../index.ts";
declare function treatDisease(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, treatDisease as legacy };
