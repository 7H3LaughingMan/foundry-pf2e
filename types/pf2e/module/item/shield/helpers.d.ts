import { ActorPF2e } from "../../actor/index.ts";
import { ShieldPF2e } from "./document.ts";

declare function setActorShieldData(shield: ShieldPF2e<ActorPF2e>): void;
export { setActorShieldData };
