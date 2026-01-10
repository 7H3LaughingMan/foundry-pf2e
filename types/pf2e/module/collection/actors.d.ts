import { ActorPF2e, PartyPF2e } from "./../actor/index.ts";
export declare class ActorsPF2e<TActor extends ActorPF2e<null>> extends fd.collections.Actors<TActor> {
    /** The world's active party, if one exists */
    get party(): PartyPF2e<null> | null;
    /** Ensure familiars and then parties are initialized after all other subtypes. */
    protected _initialize(): void;
    /** Overrwriten to omit actors in parties, which are rendered separately */
    _getVisibleTreeContents(): TActor[];
}
