import type { TokenDocumentPF2e } from "types/pf2e/module/scene/index.ts";
import { CombatantPF2e } from "./encounter/index.ts";
/** Ensure that the import JSON is actually importable and that the data is fully migrated */
declare function preImportJSON(json: string): Promise<string | null>;
declare function combatantAndTokenDoc(document: CombatantPF2e | TokenDocumentPF2e): {
    combatant: CombatantPF2e | null;
    tokenDoc: TokenDocumentPF2e | null;
};
export { combatantAndTokenDoc, preImportJSON };
