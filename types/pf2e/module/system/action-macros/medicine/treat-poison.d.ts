import { SingleCheckAction } from "./../../../actor/actions/index.ts";
import { SkillActionOptions } from "../index.ts";
declare function treatPoison(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, treatPoison as legacy };
