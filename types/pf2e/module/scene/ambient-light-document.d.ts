import { AmbientLightPF2e } from "../canvas/index.ts";
import { ScenePF2e } from "./index.ts";

declare class AmbientLightDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends AmbientLightDocument<TParent> {
}
interface AmbientLightDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends AmbientLightDocument<TParent> {
    get object(): AmbientLightPF2e<this> | null;
}
export { AmbientLightDocumentPF2e };
