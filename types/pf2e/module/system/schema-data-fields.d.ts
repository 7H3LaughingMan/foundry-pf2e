import { DataSchema } from "#common/abstract/_types.mjs";
import { default as DataModel } from "#common/abstract/data.mjs";
import { ArrayFieldOptions, DataFieldOptions, DataFieldValidationOptions, ObjectFieldOptions, StringFieldOptions } from "#common/data/_types.mjs";
import { CleanFieldOptions, MaybeSchemaProp, ModelPropFromDataField, SourceFromDataField, SourceFromSchema } from "#common/data/fields.mjs";
import { SlugCamel } from "./../../util/index.ts";
import { Predicate, PredicateStatement, RawPredicate } from ".//predication.ts";
import fields = foundry.data.fields;
import validation = foundry.data.validation;
/** A SchemaField that prunes undefined values */
declare class PrunedSchemaField<
    TDataSchema extends DataSchema = DataSchema,
    TSourceProp extends fields.SourceFromSchema<TDataSchema> = fields.SourceFromSchema<TDataSchema>,
    TModelProp extends NonNullable<JSONValue> = fields.ModelPropsFromSchema<TDataSchema>,
    TRequired extends boolean = true,
    TNullable extends boolean = false,
    THasInitial extends boolean = true,
> extends fields.SchemaField<TDataSchema, TSourceProp, TModelProp, TRequired, TNullable, THasInitial> {
    initialize(
        value: fields.MaybeSchemaProp<TSourceProp, TRequired, TNullable, THasInitial>,
        model?: foundry.abstract.DataModel,
        options?: Record<string, unknown>,
    ): MaybeSchemaProp<TModelProp, TRequired, TNullable, THasInitial>;
}
/** A `SchemaField` that preserves fields not declared in its `DataSchema` */
declare class LaxSchemaField<TDataSchema extends DataSchema> extends fields.SchemaField<TDataSchema> {
    protected _cleanType(data: Record<string, unknown>, options?: CleanFieldOptions): SourceFromSchema<TDataSchema>;
}
/** A `SchemaField` that does not cast the source value to an object */
declare class StrictSchemaField<TDataSchema extends DataSchema> extends fields.SchemaField<TDataSchema> {
    protected _cast(value: unknown): SourceFromSchema<TDataSchema>;
    protected _cleanType(data: object, options?: CleanFieldOptions): SourceFromSchema<TDataSchema>;
}
/** A `StringField` that does not cast the source value */
declare class StrictStringField<
    TSourceProp extends string,
    TModelProp extends NonNullable<JSONValue> = TSourceProp,
    TRequired extends boolean = false,
    TNullable extends boolean = false,
    THasInitial extends boolean = boolean,
> extends fields.StringField<TSourceProp, TModelProp, TRequired, TNullable, THasInitial> {
    protected _cast(value: unknown): unknown;
}
/** A `NumberField` that does not cast the source value */
declare class StrictNumberField<
    TSourceProp extends number,
    TModelProp extends NonNullable<JSONValue> = TSourceProp,
    TRequired extends boolean = false,
    TNullable extends boolean = true,
    THasInitial extends boolean = true,
> extends fields.NumberField<TSourceProp, TModelProp, TRequired, TNullable, THasInitial> {
    protected _cast(value: unknown): unknown;
}
/** A `BooleanField` when genuine nullability support */
declare class NullableBooleanField<
    TRequired extends boolean = true,
    TNullable extends boolean = false,
    THasInitial extends boolean = true,
> extends fields.BooleanField<boolean, boolean, TRequired, TNullable, THasInitial> {
    protected _cast(value: unknown): boolean | null;
    /** Create a select element for nullable fields. */
    protected _toInput(config: foundry.data.FormInputConfig<boolean>): HTMLElement;
}
/** A `BooleanField` that does not cast the source value */
declare class StrictBooleanField<
    TRequired extends boolean = true,
    TNullable extends boolean = false,
    THasInitial extends boolean = true,
> extends fields.BooleanField<boolean, boolean, TRequired, TNullable, THasInitial> {
    protected _cast(value: unknown): unknown;
}
declare class StrictArrayField<
    TElementField extends fields.DataField,
    TSourceProp extends Partial<SourceFromDataField<TElementField>>[] = SourceFromDataField<TElementField>[],
    TModelProp extends object = ModelPropFromDataField<TElementField>[],
    TRequired extends boolean = true,
    TNullable extends boolean = false,
    THasInitial extends boolean = true,
> extends fields.ArrayField<TElementField, TSourceProp, TModelProp, TRequired, TNullable, THasInitial> {
    /** Don't wrap a non-array in an array */
    protected _cast(value: unknown): unknown;
    /** Parent method assumes array-wrapping: pass through unchanged */
    protected _cleanType(value: unknown): unknown;
    initialize(
        value: MaybeSchemaProp<TSourceProp, TRequired, TNullable, THasInitial>,
        model: DataModel,
        options: ArrayFieldOptions<TSourceProp, TRequired, TNullable, THasInitial>,
    ): MaybeSchemaProp<TModelProp, TRequired, TNullable, THasInitial>;
}
/** An array field that will prune invalid elements without complaint */
declare class LaxArrayField<
    TElementField extends fields.DataField,
    TSourceProp extends SourceFromDataField<TElementField>[] = SourceFromDataField<TElementField>[],
    TModelProp extends object = ModelPropFromDataField<TElementField>[],
    TRequired extends boolean = true,
    TNullable extends boolean = false,
    THasInitial extends boolean = true,
> extends fields.ArrayField<TElementField, TSourceProp, TModelProp, TRequired, TNullable, THasInitial> {
    protected _validateElements(value: unknown[], options?: DataFieldValidationOptions): void | validation.DataModelValidationFailure;
}
declare class StrictObjectField<
    TSourceProp extends object,
    TModelProp extends object = TSourceProp,
    TRequired extends boolean = true,
    TNullable extends boolean = false,
    THasInitial extends boolean = true,
> extends fields.ObjectField<TSourceProp, TModelProp, TRequired, TNullable, THasInitial> {
    protected _cast(value: unknown): unknown;
}
type JSONPrimitive = Exclude<JSONValue, "object">;
/** A field that allows nothing except for the provided choices */
declare class AnyChoiceField<
    TChoices extends JSONPrimitive,
    TRequired extends boolean = true,
    TNullable extends boolean = false,
    THasInitial extends boolean = true,
> extends fields.DataField<TChoices, TChoices, TRequired, TNullable, THasInitial> {
    static get _defaults(): AnyChoiceFieldOptions<JSONPrimitive, boolean, boolean, boolean>;
    constructor(options?: AnyChoiceFieldOptions<TChoices, TRequired, TNullable, THasInitial>, context?: foundry.data.DataFieldContext);
    /** Converts invalid string representations to valid non-string choices if they exist */
    protected _cleanType(value: unknown): unknown;
    protected _cast(value: unknown): unknown;
    protected _validateType(value: unknown): void;
    _toInput(config: foundry.applications.fields.SelectInputConfig & Partial<foundry.data.ChoiceInputConfig>): HTMLElement | HTMLCollection;
}
interface AnyChoiceField<
    TChoices extends JSONPrimitive,
    TRequired extends boolean = true,
    TNullable extends boolean = false,
    THasInitial extends boolean = true,
> extends fields.DataField<TChoices, TChoices, TRequired, TNullable, THasInitial> {
    choices: JSONPrimitive[];
    options: AnyChoiceFieldOptions<TChoices, TRequired, TNullable, THasInitial>;
}
interface AnyChoiceFieldOptions<
    TChoices extends JSONPrimitive,
    TRequired extends boolean,
    TNullable extends boolean,
    THasInitial extends boolean,
> extends DataFieldOptions<TChoices, TRequired, TNullable, THasInitial> {
    choices: JSONPrimitive[];
}
declare class DataUnionField<
    TField extends fields.DataField,
    TRequired extends boolean = boolean,
    TNullable extends boolean = boolean,
    THasInitial extends boolean = boolean,
> extends fields.DataField<
    TField extends fields.DataField<infer TSourceProp> ? TSourceProp : never,
    TField extends fields.DataField<infer _TSourceProp, infer TModelProp> ? TModelProp : never,
    TRequired,
    TNullable,
    THasInitial
> {
    fields: TField[];
    constructor(
        fields: TField[],
        options: DataFieldOptions<TField extends fields.DataField<infer TSourceProp> ? TSourceProp : never, TRequired, TNullable, THasInitial>,
    );
    protected _cast(value?: unknown): unknown;
    /**
     * Perform some cleaning while first checking that an upstream `_cast` won't convert a dog into a cat (or a number
     * into an array).
     */
    clean(value: unknown, options?: CleanFieldOptions | undefined): MaybeUnionSchemaProp<TField, TRequired, TNullable, THasInitial>;
    protected _validateType(value: unknown, options?: DataFieldValidationOptions | undefined): boolean | void | validation.DataModelValidationFailure;
    initialize(value: unknown, model?: DataModel, options?: object | undefined): MaybeUnionSchemaProp<TField, TRequired, TNullable, THasInitial>;
}
type MaybeUnionSchemaProp<TField extends fields.DataField, TRequired extends boolean, TNullable extends boolean, THasInitial extends boolean> = MaybeSchemaProp<
    TField extends fields.DataField<infer _TSourceProp, infer TModelProp, boolean, boolean, boolean> ? TModelProp : never,
    TRequired,
    TNullable,
    THasInitial
>;
/** A sluggified string field */
declare class SlugField<TRequired extends boolean = true, TNullable extends boolean = boolean, THasInitial extends boolean = boolean> extends StrictStringField<
    string,
    string,
    TRequired,
    TNullable,
    THasInitial
> {
    constructor(options?: SlugFieldOptions<TRequired, TNullable, THasInitial>);
    protected static get _defaults(): SlugFieldOptions<boolean, boolean, boolean>;
    protected _cleanType(value: Maybe<string>, options?: CleanFieldOptions): MaybeSchemaProp<string, TRequired, TNullable, THasInitial>;
}
interface SlugField<TRequired extends boolean = true, TNullable extends boolean = boolean, THasInitial extends boolean = boolean> extends StrictStringField<
    string,
    string,
    TRequired,
    TNullable,
    THasInitial
> {
    options: SlugFieldOptions<TRequired, TNullable, THasInitial>;
}
interface SlugFieldOptions<TRequired extends boolean, TNullable extends boolean, THasInitial extends boolean> extends StringFieldOptions<
    string,
    TRequired,
    TNullable,
    THasInitial
> {
    camel?: SlugCamel;
}
declare class PredicateStatementField extends fields.DataField<PredicateStatement, PredicateStatement, true, false, false> {
    /** A `PredicateStatement` is always required (not `undefined`) and never nullable */
    constructor(options?: DataFieldOptions<PredicateStatement, true, false, false>);
    protected _validateType(value: unknown): boolean;
    /** No casting is available for a predicate statement */
    protected _cast(value: unknown): unknown;
    protected _cleanType(value: PredicateStatement): PredicateStatement;
}
declare class PredicateField<TRequired extends boolean = true, TNullable extends boolean = false, THasInitial extends boolean = true> extends StrictArrayField<
    PredicateStatementField,
    RawPredicate,
    Predicate,
    TRequired,
    TNullable,
    THasInitial
> {
    constructor(options?: ArrayFieldOptions<RawPredicate, TRequired, TNullable, THasInitial>);
    /** Construct a `PredicatePF2e` from the initialized `PredicateStatement[]` */
    initialize(
        value: RawPredicate,
        model: foundry.abstract.DataModel,
        options?: ArrayFieldOptions<RawPredicate, TRequired, TNullable, THasInitial>,
    ): MaybeSchemaProp<Predicate, TRequired, TNullable, THasInitial>;
    protected _toInput(config: foundry.data.FormInputConfig): HTMLInputElement;
}
type RecordFieldModelProp<
    TKeyField extends fields.StringField<string, string, true, false, false> | fields.NumberField<number, number, true, false, false>,
    TValueField extends fields.DataField,
    TDense extends boolean = false,
> = TDense extends true
    ? Record<ModelPropFromDataField<TKeyField>, ModelPropFromDataField<TValueField>>
    : TDense extends false
      ? Partial<Record<ModelPropFromDataField<TKeyField>, ModelPropFromDataField<TValueField>>>
      :
            | Record<ModelPropFromDataField<TKeyField>, ModelPropFromDataField<TValueField>>
            | Partial<Record<ModelPropFromDataField<TKeyField>, ModelPropFromDataField<TValueField>>>;
type RecordFieldSourceProp<
    TKeyField extends fields.StringField<string, string, true, false, false> | fields.NumberField<number, number, true, false, false>,
    TValueField extends fields.DataField,
    /** Whether this is to be treated as a "dense" record; i.e., any valid key should return a value */
    TDense extends boolean = false,
> = TDense extends true
    ? Record<SourceFromDataField<TKeyField>, SourceFromDataField<TValueField>>
    : TDense extends false
      ? Partial<Record<SourceFromDataField<TKeyField>, SourceFromDataField<TValueField>>>
      :
            | Record<SourceFromDataField<TKeyField>, SourceFromDataField<TValueField>>
            | Partial<Record<SourceFromDataField<TKeyField>, SourceFromDataField<TValueField>>>;
declare class RecordField<
    TKeyField extends fields.StringField<string, string, true, false, false> | fields.NumberField<number, number, true, false, false>,
    TValueField extends fields.DataField,
    TRequired extends boolean = true,
    TNullable extends boolean = false,
    THasInitial extends boolean = true,
    TDense extends boolean = false,
> extends fields.ObjectField<
    RecordFieldSourceProp<TKeyField, TValueField, TDense>,
    RecordFieldModelProp<TKeyField, TValueField, TDense>,
    TRequired,
    TNullable,
    THasInitial
> {
    static recursive: boolean;
    keyField: TKeyField;
    valueField: TValueField;
    constructor(
        keyField: TKeyField,
        valueField: TValueField,
        options?: ObjectFieldOptions<RecordFieldSourceProp<TKeyField, TValueField, TDense>, TRequired, TNullable, THasInitial>,
    );
    protected _isValidKeyFieldType(
        keyField: unknown,
    ): keyField is fields.StringField<string, string, true, false, false> | fields.NumberField<number, number, true, false, false>;
    protected _validateValues(values: Record<string, unknown>, options?: DataFieldValidationOptions): validation.DataModelValidationFailure | void;
    protected _cleanType(values: Record<string, unknown>, options?: CleanFieldOptions | undefined): Record<string, unknown>;
    protected _validateType(values: unknown, options?: DataFieldValidationOptions): boolean | validation.DataModelValidationFailure | void;
    initialize(
        values: object | null | undefined,
        model: foundry.abstract.DataModel,
        options?: ObjectFieldOptions<RecordFieldSourceProp<TKeyField, TValueField>, TRequired, TNullable, THasInitial>,
    ): MaybeSchemaProp<RecordFieldModelProp<TKeyField, TValueField, TDense>, TRequired, TNullable, THasInitial>;
}
/** A field that always results in a value of `null` */
declare class NullField extends fields.DataField<null, null, true, true, true> {
    constructor();
    protected _cast(): null;
}
export {
    AnyChoiceField,
    DataUnionField,
    LaxArrayField,
    LaxSchemaField,
    NullableBooleanField,
    NullField,
    PredicateField,
    PrunedSchemaField,
    RecordField,
    SlugField,
    StrictArrayField,
    StrictBooleanField,
    StrictNumberField,
    StrictObjectField,
    StrictSchemaField,
    StrictStringField,
};
