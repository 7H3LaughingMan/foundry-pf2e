export {};

declare global {
    namespace Hooks {
        function on(
            hook: "diceSoNiceMessageProcessed",
            callback: (
                messageId: string,
                interceptions: { willTrigger3DRoll: boolean },
            ) => boolean | void | Promise<boolean | void>,
        ): number;
        function once(
            hook: "diceSoNiceMessageProcessed",
            callback: (
                messageId: string,
                interceptions: { willTrigger3DRoll: boolean },
            ) => boolean | void | Promise<boolean | void>,
        ): number;

        function on(
            hook: "diceSoNiceRollStart",
            callback: (
                messageId: string,
                context: { roll: Roll; user: User; users: User[] | null; blind: boolean },
            ) => boolean | void | Promise<boolean | void>,
        ): number;
        function once(
            hook: "diceSoNiceRollStart",
            callback: (
                messageId: string,
                context: { roll: Roll; user: User; users: User[] | null; blind: boolean },
            ) => boolean | void | Promise<boolean | void>,
        ): number;

        function on(
            hook: "diceSoNiceRollComplete",
            callback: (messageId: string) => boolean | void | Promise<boolean | void>,
        ): number;
        function once(
            hook: "diceSoNiceRollComplete",
            callback: (messageId: string) => boolean | void | Promise<boolean | void>,
        ): number;
    }
}
