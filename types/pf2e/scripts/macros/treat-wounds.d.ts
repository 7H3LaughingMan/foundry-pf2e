import type { ActorPF2e } from "types/pf2e/module/actor/index.ts";
import { ChatMessagePF2e } from "types/pf2e/module/chat-message/index.ts";
import type { ActionDefaultOptions } from "types/pf2e/module/system/action-macros/index.ts";
import { type DegreeOfSuccessString } from "types/pf2e/module/system/degree-of-success.ts";
declare function treatWounds(options: ActionDefaultOptions): Promise<void>;
declare function treatWoundsMacroCallback({ actor, bonus, message, originalMessageId, outcome, }: {
    actor: ActorPF2e;
    bonus: number;
    message: ChatMessagePF2e;
    originalMessageId?: string;
    outcome?: DegreeOfSuccessString | null;
}): Promise<void>;
export { treatWounds, treatWoundsMacroCallback };
