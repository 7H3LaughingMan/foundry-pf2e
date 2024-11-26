import { TokenPF2e } from "../../module/canvas/index.ts";
import { ScenePF2e, TokenDocumentPF2e } from "../../module/scene/index.ts";
export declare class RenderTokenHUD {
    static listen(): void;
    /** Replace the token HUD's status effects button with one for depositing/retrieving party-member tokens.  */
    static addClownCarButton(html: HTMLElement, token: TokenPF2e<TokenDocumentPF2e<ScenePF2e>> | null | undefined): void;
}
