import { ActorPF2e } from '../actor/index.ts';
import { ItemPF2e } from '../item/index.ts';
import { EffectAreaShape } from '../item/spell/types.ts';
import { MeasuredTemplatePF2e } from '../canvas/measured-template.ts';
import { ItemOriginFlag } from '../chat-message/data.ts';
import { ChatMessagePF2e } from '../chat-message/document.ts';
import { ScenePF2e } from './document.ts';
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
