import { SheetOptions } from "./../../sheet/helpers.ts";
import { ActorFlagsPF2e } from "./../data/base.ts";
import { CreaturePF2e } from "./document.ts";
/** A DocumentSheet presenting additional, per-actor settings */
declare abstract class CreatureConfig<TActor extends CreaturePF2e> extends fav1.api.DocumentSheet<TActor> {
    get title(): string;
    get template(): string;
    get actor(): TActor;
    static get defaultOptions(): fav1.api.DocumentSheetV1Options;
    getData(options?: Partial<fav1.api.DocumentSheetV1Options>): Promise<CreatureConfigData<TActor>>;
    /** Remove stored property if it's set to default; otherwise, update */
    _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface CreatureConfigData<TActor extends CreaturePF2e> extends fav1.api.DocumentSheetData<TActor> {
    alliances: SheetOptions;
    systemId: SystemId;
    systemFlags: ActorFlagsPF2e[SystemId];
}
export { CreatureConfig, type CreatureConfigData };
