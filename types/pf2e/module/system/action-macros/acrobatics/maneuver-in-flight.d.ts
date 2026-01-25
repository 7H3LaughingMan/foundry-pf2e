import { SkillActionOptions } from "../index.ts";
import { SingleCheckAction } from "./../../../actor/actions/index.ts";
declare function maneuverInFlight(options: SkillActionOptions): Promise<void>;
declare const action: SingleCheckAction;
export { action, maneuverInFlight as legacy };
