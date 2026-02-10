import { DatabaseCreateCallbackOptions, DatabaseDeleteCallbackOptions, DataModelConstructionContext } from "#common/abstract/_types.mjs";
import { DocumentFlags } from "#common/data/_types.mjs";
import { ItemOriginFlag } from "../chat-message/data.ts";
import { ActorPF2e } from "./../actor/index.ts";
import { MeasuredTemplatePF2e } from "./../canvas/measured-template.ts";
import { ChatMessagePF2e } from "./../chat-message/document.ts";
import { ItemPF2e } from "./../item/index.ts";
import { EffectAreaShape } from "./../item/types.ts";
import { ScenePF2e } from "./document.ts";
declare class MeasuredTemplateDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends MeasuredTemplateDocument<TParent> {
    get actor(): ActorPF2e | null;
    get item(): ItemPF2e<ActorPF2e> | null;
    /** The chat message from which this template was spawned */
    get message(): ChatMessagePF2e | null;
    get areaShape(): EffectAreaShape | null;
    /** Ensure the source has a `pf2e` flag along with an `areaShape` if directly inferable. */
    protected _initializeSource(data: object, options?: DataModelConstructionContext<TParent>): this["_source"];
    /** If present, show the clear-template button on the message from which this template was spawned */
    protected _onCreate(data: this["_source"], options: DatabaseCreateCallbackOptions, userId: string): void;
    /** If present, hide the clear-template button on the message from which this template was spawned */
    protected _onDelete(options: DatabaseDeleteCallbackOptions, userId: string): void;
}
interface MeasuredTemplateDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends MeasuredTemplateDocument<TParent> {
    get object(): MeasuredTemplatePF2e<this> | null;
    flags: DocumentFlags & {
        [SYSTEM_ID]: {
            messageId?: string;
            origin?: ItemOriginFlag;
            areaShape: EffectAreaShape | null;
        };
    };
}
export { MeasuredTemplateDocumentPF2e };
