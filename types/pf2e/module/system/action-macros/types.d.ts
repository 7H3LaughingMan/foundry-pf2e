import { ActorPF2e } from '../../actor/index.ts';
import { StrikeData } from '../../actor/data/base.ts';
import { ModifierPF2e } from '../../actor/modifiers.ts';
import { DCSlug } from '../../actor/types.ts';
import { ItemPF2e } from '../../item/index.ts';
import { WeaponTrait } from '../../item/weapon/types.ts';
import { RollNotePF2e } from '../../notes.ts';
import { TokenDocumentPF2e } from '../../scene/index.ts';
import { CheckRoll, CheckType } from '../check/index.ts';
import { CheckDC, DegreeOfSuccessString } from '../degree-of-success.ts';
import { Statistic } from '../statistic/index.ts';
type ActionGlyph = "A" | "D" | "T" | "R" | "F" | "a" | "d" | "t" | "r" | "f" | 1 | 2 | 3 | "1" | "2" | "3";
interface BuildCheckContextOptions<TItem extends ItemPF2e<ActorPF2e>> {
    actor: ActorPF2e;
    item?: TItem;
    rollOptions: string[];
    target?: ActorPF2e | null;
}
interface BuildCheckContextResult<TItem extends ItemPF2e<ActorPF2e>> {
    item?: TItem;
    rollOptions: string[];
    target?: ActorPF2e | null;
}
interface CheckContextOptions<TItem extends ItemPF2e<ActorPF2e>> {
    actor: ActorPF2e;
    buildContext: (options: BuildCheckContextOptions<TItem>) => BuildCheckContextResult<TItem>;
    target?: ActorPF2e | null;
}
interface CheckContextData<TItem extends ItemPF2e<ActorPF2e>> {
    item?: TItem;
    modifiers?: ModifierPF2e[];
    rollOptions: string[];
    slug: string;
    target?: ActorPF2e | null;
}
interface CheckMacroContext<TItem extends ItemPF2e<ActorPF2e>> {
    type: CheckType;
    item?: TItem;
    modifiers?: ModifierPF2e[];
    rollOptions: string[];
    slug: string;
    statistic: Statistic | (StrikeData & {
        rank?: number;
    });
    subtitle: string;
}
interface CheckResultCallback {
    actor: ActorPF2e;
    message?: ChatMessage;
    outcome: DegreeOfSuccessString | null | undefined;
    roll: Rolled<CheckRoll>;
}
interface SimpleRollActionCheckOptions<TItem extends ItemPF2e<ActorPF2e>> {
    actors: ActorPF2e | ActorPF2e[] | undefined;
    actionGlyph: ActionGlyph | undefined;
    title: string;
    checkContext: (context: CheckContextOptions<TItem>) => Promise<CheckMacroContext<TItem>> | CheckMacroContext<TItem> | undefined;
    content?: (title: string) => Promise<string | null | undefined | void> | string | null | undefined | void;
    item?: (actor: ActorPF2e) => TItem | undefined;
    traits: string[];
    event?: JQuery.TriggeredEvent | Event | null;
    /**
     * A DC can be represented as a preassembled `CheckDC` object, a slug referencing a `Statistic`, or a function that
     * returns a `CheckDC` or `null`.
     */
    difficultyClass?: UnresolvedCheckDC;
    extraNotes?: (selector: string) => RollNotePF2e[];
    callback?: (result: CheckResultCallback) => void;
    createMessage?: boolean;
    weaponTrait?: WeaponTrait;
    weaponTraitWithPenalty?: WeaponTrait;
    target?: () => {
        token: TokenDocumentPF2e | null;
        actor: ActorPF2e;
    } | null;
}
type UnresolvedCheckDC = CheckDC | DCSlug | ((actor: ActorPF2e | null) => CheckDC | null);
interface ActionDefaultOptions {
    event?: JQuery.TriggeredEvent | Event | null;
    actors?: ActorPF2e | ActorPF2e[];
    glyph?: ActionGlyph;
    modifiers?: ModifierPF2e[];
    callback?: (result: CheckResultCallback) => void;
}
interface SkillActionOptions extends ActionDefaultOptions {
    skill?: string;
    difficultyClass?: CheckDC;
}
export type { ActionDefaultOptions, ActionGlyph, CheckContextData, CheckContextOptions, CheckMacroContext, CheckResultCallback, SimpleRollActionCheckOptions, SkillActionOptions, UnresolvedCheckDC, };
