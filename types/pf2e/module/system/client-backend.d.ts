import { CompendiumIndexData } from "#client/documents/collections/compendium-collection.mjs";
import { DocumentConstructionContext } from "#common/_types.mjs";
import { DatabaseGetOperation, Document } from "#common/abstract/_module.mjs";
declare class ClientDatabaseBackendPF2e extends foundry.data.ClientDatabaseBackend {
    protected _getDocuments<TDocument extends Document>(
        documentClass: AbstractConstructorOf<TDocument> & {
            documentName: string;
            fromSource(data: object, options: DocumentConstructionContext<Document | null>): Document;
        },
        operation: DatabaseGetOperation<TDocument["parent"]>,
        user?: User,
    ): Promise<(DeepPartial<Document["_source"]> & CompendiumIndexData)[] | Document[]>;
}
export { ClientDatabaseBackendPF2e };
