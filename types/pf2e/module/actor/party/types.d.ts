import { ActorUpdateOperation } from '../base.ts';
import { ItemType } from '../../item/base/data/index.ts';
import { TokenDocumentPF2e } from '../../scene/index.ts';
import { Statistic } from '../../system/statistic/index.ts';
import { default as DataModel } from '../../../../foundry/common/abstract/data.ts';
import { PartyPF2e } from './document.ts';
interface PartyUpdateOperation<TParent extends TokenDocumentPF2e | null> extends ActorUpdateOperation<TParent> {
    removedMembers?: string[];
}
/** Interface for a party campaign implementation, alternative data preparation used by parties for special campaigns */
interface PartyCampaign extends DataModel<PartyPF2e, {}> {
    type: string;
    level?: number;
    /** Any additional item types supported by the campaign */
    extraItemTypes?: ItemType[];
    /** Sidebar buttons to inject into the party header */
    createSidebarButtons?(): HTMLElement[];
    /** Returns any additional statistics that should be returned by the party */
    getStatistic?(slug: string): Statistic | null;
    /** Additional campaign specific roll options for rule elements */
    getRollOptions?(): string[];
    /** Additional data for inline rolls */
    getRollData?(): Record<string, unknown>;
    /** Renders the sheet associateed with this campaign, if available */
    renderSheet?(options?: {
        tab?: string;
        type?: string | null;
    }): void;
    /** Executed during the actor's prepareBaseData phase */
    prepareBaseData?(): void;
    /** Executed during the actor's prepareDerivedData phase */
    prepareDerivedData?(): void;
    _preUpdate?(changed: Record<string, unknown>): void;
}
export type { PartyCampaign, PartyUpdateOperation };
