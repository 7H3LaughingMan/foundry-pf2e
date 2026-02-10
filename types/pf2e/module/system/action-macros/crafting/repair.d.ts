import { SkillActionOptions } from "../types.ts";
import { ChatMessagePF2e } from "./../../../chat-message/index.ts";
import { PhysicalItemPF2e } from "./../../../item/index.ts";
import { CheckDC } from "./../../degree-of-success.ts";
declare function repair(options: RepairActionOptions): Promise<void>;
declare function onRepairChatCardEvent(event: PointerEvent, message: ChatMessagePF2e | undefined, card: HTMLElement): Promise<void>;
interface RepairActionOptions extends SkillActionOptions {
    difficultyClass?: CheckDC;
    item?: PhysicalItemPF2e;
    uuid?: string;
}
export { onRepairChatCardEvent, repair };
