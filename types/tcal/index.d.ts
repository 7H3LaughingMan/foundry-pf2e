import { CompendiumActorUUID } from "#common/documents/_module.mjs";
import { ActorPF2e, ActorSourcePF2e } from "foundry-pf2e";

export {};

declare module "foundry-pf2e" {
    interface ClientSettingsPF2e {
        get(module: "tcal", settings: "transientFolder"): string;
        get(module: "tcal", settings: "showFolder"): boolean;

        set(module: "tcal", settings: "transientFolder", value: string): Promise<string>;
        set(module: "tcal", settings: "showFolder", value: boolean): Promise<boolean>;
    }

    interface GamePF2e {
        tcal?: {
            importTransientActor(
                uuid: CompendiumActorUUID,
                options?: { preferExisting: boolean },
                updateData?: PreCreate<ActorSourcePF2e>,
            ): Promise<Maybe<ActorPF2e>>;
            isTransientActor(actor: Maybe<ActorPF2e>): boolean;
        };
    }
}
