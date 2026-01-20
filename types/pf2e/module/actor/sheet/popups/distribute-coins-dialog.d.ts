import { ActorPF2e } from "./../../index.ts";
/** Allows the distribution and split of coins to multiple players */
export class DistributeCoinsDialog extends fa.api.HandlebarsApplicationMixin(fa.api.ApplicationV2) {
    #private;
    constructor(options: Partial<DistributeCoinsConfiguration> & Required<Pick<DistributeCoinsConfiguration, "actor">>);
    static DEFAULT_OPTIONS: DeepPartial<DistributeCoinsConfiguration>;
    static PARTS: {
        base: {
            template: string;
            root: boolean;
        };
    };
    actor: ActorPF2e;
    options: DistributeCoinsConfiguration;
    _prepareContext(options: fa.ApplicationRenderOptions): Promise<DistributeCoinsContext>;
}
interface DistributeCoinsConfiguration extends fa.api.DialogV2Configuration {
    actor: ActorPF2e;
    /** An optional initial list of recipients to receive coins */
    recipients?: ActorPF2e[];
}
interface DistributeCoinsContext extends fa.ApplicationRenderContext {
    rootId: string;
    canBreakCoins: boolean;
    actorInfo: {
        id: string;
        name: string;
        checked: boolean;
    }[];
}
export {};
