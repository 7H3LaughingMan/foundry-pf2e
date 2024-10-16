import type { TokenPF2e } from "types/pf2e/module/canvas/index.ts";
import type { ScenePF2e, TokenDocumentPF2e } from "types/pf2e/module/scene/index.ts";
export declare class RenderTokenHUD {
    static listen(): void;
    /** Replace the token HUD's status effects button with one for depositing/retrieving party-member tokens.  */
    static addClownCarButton(html: HTMLElement, token: TokenPF2e<TokenDocumentPF2e<ScenePF2e>> | null | undefined): void;
}
