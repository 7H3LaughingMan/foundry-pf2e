export {};

declare global {
    /** A subclass of Set which manages the Token ids which the User has targeted. */
    class UserTargets<TToken extends Token> extends Set<TToken> {
        constructor(user: User);

        /** Return the Token IDs which are user targets */
        get ids(): string[];

        override add(token: TToken): this;

        override clear(): void;

        override delete(token: TToken): boolean;

        /**
         * Dispatch the targetToken hook whenever the user's target set changes.
         *
         * @param token         The targeted Token
         * @param targeted      Whether the Token has been targeted or untargeted
         */
        #hook(token: TToken, targeted: boolean): void;
    }
}
