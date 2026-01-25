import { FrequencyInterval, ItemSourcePF2e, PhysicalItemSource } from "./../../../item/base/data/index.ts";
import { ItemPF2e, PhysicalItemPF2e } from "./../../../item/index.ts";
import validation = foundry.data.validation;
declare const itemHasCounterBadge: (item: ItemPF2e | ItemSourcePF2e) => validation.DataModelValidationFailure | void;
/** Adjust creature shield data due it being set before item alterations occur */
declare function adjustCreatureShieldData(item: PhysicalItemPF2e | PhysicalItemSource): void;
/** Handle alterations for frequency intervals, which are luxon durations */
declare function getNewInterval(
    mode: "upgrade" | "downgrade" | "override" | string,
    current: FrequencyInterval,
    newValue: string,
): FrequencyInterval | validation.DataModelValidationFailure;
export { adjustCreatureShieldData, getNewInterval, itemHasCounterBadge };
