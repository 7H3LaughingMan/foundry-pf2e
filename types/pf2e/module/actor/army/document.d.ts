import { FeatGroup } from '../character/feats/index.ts';
import { Kingdom } from '../party/kingdom/model.ts';
import { CampaignFeaturePF2e } from '../../item/index.ts';
import { ItemSourcePF2e, ItemType } from '../../item/base/data/index.ts';
import { UserPF2e } from '../../user/index.ts';
import { TokenDocumentPF2e } from '../../scene/index.ts';
import { ArmorStatistic, Statistic, StatisticDifficultyClass } from '../../system/statistic/index.ts';
import { ActorPF2e, ActorUpdateOperation, HitPointsSummary } from '../base.ts';
import { ArmySource, ArmySystemData } from './data.ts';
import { ArmyStrike } from './types.ts';
declare class ArmyPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    scouting: Statistic;
    maneuver: Statistic;
    morale: Statistic;
    tactics: FeatGroup<ArmyPF2e, CampaignFeaturePF2e>;
    bonusTactics: FeatGroup<ArmyPF2e, CampaignFeaturePF2e>;
    strikes: Record<string, ArmyStrike | null>;
    get allowedItemTypes(): (ItemType | "physical")[];
    get underRoutThreshold(): boolean;
    /** Gets the active kingdom. Later this should be configurable based on alliance */
    get kingdom(): Kingdom | null;
    get maxTactics(): number;
    get strongSave(): "maneuver" | "morale";
    prepareData(): void;
    prepareBaseData(): void;
    /** Run rule elements */
    prepareEmbeddedDocuments(): void;
    prepareDerivedData(): void;
    usePotion(): Promise<void>;
    prepareArmyStrike(type: "melee" | "ranged"): ArmyStrike | null;
    /** Updates the army's level, scaling all attributes that are intended to scale as the army levels up */
    updateLevel(newLevel: number): Promise<this | undefined>;
    /** Prevent addition of invalid tactic types */
    checkItemValidity(source: PreCreate<ItemSourcePF2e>): boolean;
    getStatistic(slug: string): Statistic<this> | null;
    _preUpdate(changed: DeepPartial<this["_source"]>, operation: ActorUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    _onDelete(operation: DatabaseDeleteOperation<TParent>, userId: string): void;
}
interface ArmyPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    readonly _source: ArmySource;
    armorClass: StatisticDifficultyClass<ArmorStatistic>;
    system: ArmySystemData;
    get hitPoints(): HitPointsSummary;
}
export { ArmyPF2e };
