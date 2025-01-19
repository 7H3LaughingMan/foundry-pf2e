export {};

declare global {
    namespace globalThis {
        const socketlib: Socketlib;
    }

    export class Socketlib {
        modules: Map<string, SocketlibSocket>;
        system?: SocketlibSocket;
        errors: {
            SocketlibError: Error;
            SocketlibInternalError: Error;
            SocketlibInvalidUserError: Error;
            SocketlibNoGMConnectedError: Error;
            socketlibRemoteException: Error;
            SocketlibUnregisteredHandlerError: Error;
        };

        registerModule(moduleName: string): SocketlibSocket | undefined;
        registerSystem(systemId: string): SocketlibSocket | undefined;
    }

    export class SocketlibSocket {
        functions: Map<string, Function>;
        socketName: string;
        pendingRequests: Map<
            string,
            {
                handlerName: string;
                resolve: (value: unknown) => void;
                reject: (value: unknown) => void;
                recipient: string;
            }
        >;

        register(name: string, func: Function): void;
        executeAsGM<T = unknown>(handler: string | Function, ...args: any[]): Promise<T>;
        executeAsUser<T = unknown>(handler: string | Function, userId: string, ...args: any[]): Promise<T>;
        executeForAllGMs<T = unknown>(handler: string | Function, ...args: any[]): Promise<T>;
        executeForOtherGMs<T = unknown>(handler: string | Function, ...args: any[]): Promise<T>;
        executeForEveryone<T = unknown>(handler: string | Function, ...args: any[]): Promise<T>;
        executeForOthers<T = unknown>(handler: string | Function, ...args: any[]): Promise<T>;
        executeForUsers<T = unknown>(handler: string | Function, recipients: string[], ...args: any[]): Promise<T>;
    }
}
