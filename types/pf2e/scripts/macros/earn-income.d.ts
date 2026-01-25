import { ActorPF2e, CharacterPF2e } from "./../../module/actor/index.ts";
import { OneToFour } from "./../../module/data.ts";
import { Coins } from "./../../module/item/physical/coins.ts";
interface ConstructorParams extends DeepPartial<fa.ApplicationConfiguration> {
    actor: CharacterPF2e;
}
declare class EarnIncomeDialog extends fa.api.HandlebarsApplicationMixin(fa.api.ApplicationV2) {
    #private;
    constructor(config: ConstructorParams);
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    static PARTS: {
        prompt: {
            template: string;
            templates: string[];
            root: boolean;
        };
        footer: {
            template: string;
        };
    };
    static REWARDS_BY_LEVEL: {
        0: {
            failure: {
                cp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        1: {
            failure: {
                cp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        2: {
            failure: {
                cp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        3: {
            failure: {
                cp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        4: {
            failure: {
                sp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        5: {
            failure: {
                sp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        6: {
            failure: {
                sp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        7: {
            failure: {
                sp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        8: {
            failure: {
                sp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        9: {
            failure: {
                sp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        10: {
            failure: {
                sp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        11: {
            failure: {
                sp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        12: {
            failure: {
                sp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        13: {
            failure: {
                gp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        14: {
            failure: {
                gp: number;
                sp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        15: {
            failure: {
                gp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        16: {
            failure: {
                gp: number;
                sp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        17: {
            failure: {
                gp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        18: {
            failure: {
                gp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        19: {
            failure: {
                gp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        20: {
            failure: {
                gp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
        21: {
            failure: {
                cp: number;
            };
            rewards: Record<OneToFour, Coins>;
        };
    };
    static create(actor?: Maybe<ActorPF2e>): Promise<EarnIncomeDialog> | null;
    protected _prepareContext(options: fa.ApplicationRenderOptions): Promise<fa.ApplicationRenderContext>;
}
export { EarnIncomeDialog };
