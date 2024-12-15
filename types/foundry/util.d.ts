export {};

declare global {
    type AnyFunction = (arg0: never, ...args: never[]) => unknown;

    type AnyConstructor = abstract new (arg0: never, ...args: never[]) => unknown;

    type AnyConcreteConstructor = new (arg0: never, ...args: never[]) => unknown;

    type Mixin<MixinClass extends AnyConcreteConstructor, BaseClass extends AnyConstructor> = MixinClass & BaseClass;

    type Maybe<T> = T | null | undefined;

    // type CollectionValue<T> = T extends Collection<infer U> ? U : never;

    type AbstractConstructorOf<T> = abstract new (...args: any[]) => T;

    type ConstructorOf<T> = new (...args: any[]) => T;

    /* type DocumentConstructorOf<T extends foundry.abstract.Document> = {
        new (...args: any[]): T;
        updateDocuments(updates?: object[], operation?: Partial<DatabaseUpdateOperation<T["parent"]>>): Promise<T[]>;
    }; */

    // type ParentOf<TDataModel> = TDataModel extends DataModel<infer P extends DataModel | null> ? P : never;

    // type SchemaOf<TDataModel> = TDataModel extends DataModel<infer _P, infer S extends DataSchema> ? S : never;

    type SetElement<TSet extends Set<unknown>> = TSet extends Set<infer TElement> ? TElement : never;

    type DropFirst<T extends unknown[]> = T extends [unknown, ...infer U] ? U : never;

    type ValueOf<T extends object> = T[keyof T];

    /** A JSON-compatible value, plus `undefined` */
    type JSONValue = string | number | boolean | object | null | undefined;
}
