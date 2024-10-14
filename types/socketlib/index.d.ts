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
        executeAsGM(handler: string | Function, ...args: any[]): Promise<unknown>;
        executeAsUser(hander: string | Function, userId: string, ...args: any[]): Promise<unknown>;
        executeForAllGMs(handler: string | Function, ...args: any[]): Promise<unknown>;
        executeForOtherGMs(handler: string | Function, ...args: any[]): Promise<unknown>;
        executeForEveryone(handler: string | Function, ...args: any[]): Promise<unknown>;
        executeForOthers(handler: string | Function, ...args: any[]): Promise<unknown>;
        executeForUsers(handler: string | Function, recipients: string[], ...args: any[]): Promise<unknown>;
    }
}
