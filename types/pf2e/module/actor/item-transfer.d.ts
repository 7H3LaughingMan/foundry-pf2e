import { UserPF2e } from "./../user/document.ts";
export interface ItemTransferData {
    source: {
        tokenId?: string;
        actorId: string;
        itemId: string;
    };
    target: {
        tokenId?: string;
        actorId: string;
    };
    quantity: number;
    containerId?: string;
    /** Whether this is a merchant transaction. If null, presume yes if merchant */
    mode?: "move" | "purchase" | "credits" | null;
}
export declare class ItemTransfer implements ItemTransferData {
    #private;
    source: ItemTransferData["source"];
    target: ItemTransferData["target"];
    quantity: number;
    containerId?: string;
    mode: "move" | "purchase" | "credits" | null;
    constructor(data: ItemTransferData);
    request(): Promise<void>;
    enact(requester: UserPF2e): Promise<void>;
}
