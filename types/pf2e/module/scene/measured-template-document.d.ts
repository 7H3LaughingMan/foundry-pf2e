import { ActorPF2e } from "types/pf2e/module/actor/index.ts";
import { ItemPF2e } from "types/pf2e/module/item/index.ts";
import type { EffectAreaShape } from "types/pf2e/module/item/spell/types.ts";
import type { MeasuredTemplatePF2e } from "types/pf2e/module/canvas/measured-template.ts";
import { ItemOriginFlag } from "types/pf2e/module/chat-message/data.ts";
import type { ChatMessagePF2e } from "types/pf2e/module/chat-message/document.ts";
import type { ScenePF2e } from "./document.ts";
declare class MeasuredTemplateDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends MeasuredTemplateDocument<TParent> {
    get actor(): ActorPF2e | null;
    get item(): ItemPF2e<ActorPF2e> | null;
    /** The chat message from which this template was spawned */
    get message(): ChatMessagePF2e | null;
    get areaShape(): EffectAreaShape | null;
    /** Ensure the source has a `pf2e` flag along with an `areaShape` if directly inferable. */
    protected _initializeSource(data: object, options?: DataModelConstructionOptions<TParent>): this["_source"];
    /** If present, show the clear-template button on the message from which this template was spawned */
    protected _onCreate(data: this["_source"], operation: DatabaseCreateOperation<TParent>, userId: string): void;
    /** If present, hide the clear-template button on the message from which this template was spawned */
    protected _onDelete(operation: DatabaseDeleteOperation<TParent>, userId: string): void;
}
interface MeasuredTemplateDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends MeasuredTemplateDocument<TParent> {
    get object(): MeasuredTemplatePF2e<this> | null;
    flags: DocumentFlags & {
        pf2e: {
            messageId?: string;
            origin?: ItemOriginFlag;
            areaShape: EffectAreaShape | null;
        };
    };
}
export { MeasuredTemplateDocumentPF2e };
