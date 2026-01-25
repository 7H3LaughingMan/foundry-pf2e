import { ActorPF2e, CreaturePF2e, ScenePF2e, TokenDocumentPF2e, TokenPF2e, UserPF2e } from "foundry-pf2e";
import * as R from "remeda";

export function getCurrentUser(): UserPF2e {
    return game.user ?? game.data.users.find((value) => value._id === game.userId);
}

export function userIsGM(user: UserPF2e = getCurrentUser()): boolean {
    return R.isNonNullish(user) && user.role >= CONST.USER_ROLES.ASSISTANT;
}

export function isPrimaryUpdater(actor: ActorPF2e): boolean {
    return actor.primaryUpdater === getCurrentUser();
}

export function primaryPlayerOwner(actor: ActorPF2e): UserPF2e | null {
    return game.users.getDesignatedUser((user) => user.active && !user.isGM && actor.testUserPermission(user, "OWNER"));
}

export function isPrimaryOwner(actor: ActorPF2e, user = getCurrentUser()): boolean {
    return user.isGM || primaryPlayerOwner(actor) === user;
}

export function canObserveActor(actor: Maybe<ActorPF2e>, withParty: boolean = true): actor is ActorPF2e {
    if (R.isNullish(actor)) return false;

    const user = getCurrentUser();
    if (actor.testUserPermission(user, "OBSERVER")) return true;

    return (
        !!withParty &&
        game.pf2e.settings.metagame.partyStats &&
        (actor as CreaturePF2e).parties?.some((party) => party.testUserPermission(user, "LIMITED"))
    );
}

export function getSelectedActor(fn = (_actor: ActorPF2e) => true): ActorPF2e | null {
    const selected = R.only(canvas.tokens.controlled)?.actor;
    if (R.isNonNullish(selected) && fn(selected)) return selected;

    const assigned = getCurrentUser().character;
    return R.isNonNullish(assigned) && fn(assigned) ? assigned : null;
}

export function getTargets(user: UserPF2e = getCurrentUser()): TokenPF2e<TokenDocumentPF2e<ScenePF2e>>[] {
    return Array.from(user?.targets ?? []);
}
