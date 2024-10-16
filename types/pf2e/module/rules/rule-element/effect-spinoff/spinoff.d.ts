import type { ActorPF2e } from "types/pf2e/module/actor/index.ts";
import type { TraitViewData } from "types/pf2e/module/actor/data/base.ts";
import { type PhysicalItemPF2e } from "types/pf2e/module/item/index.ts";
import type { EffectSource } from "types/pf2e/module/item/effect/data.ts";
import type { EffectSpinoffRuleElement } from "./rule-element.ts";
declare class EffectSpinoff {
    item: PhysicalItemPF2e<ActorPF2e>;
    slug: string;
    label: string;
    img: ImageFilePath;
    activation: SpinoffActivationData | null;
    description: {
        value: string;
        markdown: boolean;
    };
    constructor(rule: EffectSpinoffRuleElement);
    createEffect(): EffectSource;
}
interface SpinoffActivationData {
    label: string | null;
    glyph: string;
    traits: TraitViewData[];
    details: string | null;
}
export { EffectSpinoff };
