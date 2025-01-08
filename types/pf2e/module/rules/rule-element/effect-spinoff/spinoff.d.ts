import { ActorPF2e } from "../../../actor/index.ts";
import { TraitViewData } from "../../../actor/data/base.ts";
import { PhysicalItemPF2e } from "../../../item/index.ts";
import { EffectSource } from "../../../item/effect/data.ts";
import { EffectSpinoffRuleElement } from "./rule-element.ts";

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
