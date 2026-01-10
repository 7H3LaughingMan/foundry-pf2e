import { CharacterPF2e } from "./../../character/document.ts";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare function add(actor: CharacterPF2e): Promise<void>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare function remove(actor: CharacterPF2e, event: PointerEvent): void;
export declare const ManageAttackProficiencies: {
    add: typeof add;
    remove: typeof remove;
};
export {};
