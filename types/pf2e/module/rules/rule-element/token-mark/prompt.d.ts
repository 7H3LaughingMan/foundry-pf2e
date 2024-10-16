import type { TokenDocumentPF2e } from "types/pf2e/module/scene/index.ts";
import { Predicate } from "types/pf2e/module/system/predication.ts";
/** Prompt the user to target a token */
declare class MarkTargetPrompt {
    #private;
    prompt: string;
    requirements: TargetRequirements | null;
    constructor(params: PromptParameters);
    resolveTarget(): Promise<Maybe<TokenDocumentPF2e | null>>;
    activateListeners(): void;
}
interface PromptParameters {
    prompt: string | null;
    requirements: TargetRequirements | null;
}
interface TargetRequirements {
    label: string;
    predicate: Predicate;
}
export { MarkTargetPrompt };
