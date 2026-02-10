import { TextureTransitionType } from "#client/canvas/rendering/filters/transition.mjs";
import { HexColorString } from "#common/constants.mjs";
import { RuleElement } from "./base.ts";
import { ModelPropsFromRESchema, RuleElementSchema } from "./data.ts";
import fields = foundry.data.fields;
/**
 * Change the image representing an actor's token
 * @category RuleElement
 */
declare class TokenImageRuleElement extends RuleElement<TokenImageRuleSchema> {
    static defineSchema(): TokenImageRuleSchema;
    afterPrepareData(): void;
}
interface TokenImageRuleElement extends RuleElement<TokenImageRuleSchema>, ModelPropsFromRESchema<TokenImageRuleSchema> {}
type TokenImageRuleSchema = RuleElementSchema & {
    /** An image or video path */
    value: fields.StringField<string, string, true, false, false>;
    /** Dynamic token ring */
    ring: fields.SchemaField<
        {
            subject: fields.SchemaField<
                {
                    texture: fields.StringField<string, string, true, false, false>;
                    scale: fields.NumberField<number, number, true, false, true>;
                },
                {
                    texture: string;
                    scale: number;
                },
                {
                    texture: string;
                    scale: number;
                },
                true,
                false,
                false
            >;
            colors: fields.SchemaField<
                {
                    background: fields.ColorField<false, true, true>;
                    ring: fields.ColorField<false, true, true>;
                },
                {
                    background: HexColorString | null;
                    ring: HexColorString | null;
                },
                {
                    background: Color | null;
                    ring: Color | null;
                },
                true,
                false,
                true
            >;
            effects: fields.NumberField<number, number, false, false, true>;
        },
        {
            subject: {
                texture: string;
                scale: number;
            };
            colors: {
                background: HexColorString | null;
                ring: HexColorString | null;
            };
            effects: number;
        },
        {
            subject: {
                texture: string;
                scale: number;
            };
            colors: {
                background: Color | null;
                ring: Color | null;
            };
            effects: number;
        },
        false,
        false,
        false
    >;
    /** An optional scale adjustment */
    scale: fields.NumberField<number, number, false, true, true>;
    /** An optional tint adjustment */
    tint: fields.ColorField;
    /** An optional alpha adjustment */
    alpha: fields.AlphaField<false, true, true>;
    /** Animation options for when the image is applied */
    animation: fields.SchemaField<
        {
            duration: fields.NumberField<number, number, false, false, false>;
            transition: fields.StringField<TextureTransitionType, TextureTransitionType, false, false, false>;
            easing: fields.StringField<
                "easeInOutCosine" | "easeOutCircle" | "easeInCircle",
                "easeInOutCosine" | "easeOutCircle" | "easeInCircle",
                false,
                false,
                false
            >;
            name: fields.StringField<string, string, false, false, false>;
        },
        {
            duration: number | undefined;
            transition: TextureTransitionType | undefined;
            easing: "easeInOutCosine" | "easeOutCircle" | "easeInCircle" | undefined;
            name: string | undefined;
        },
        {
            duration: number | undefined;
            transition: TextureTransitionType | undefined;
            easing: "easeInOutCosine" | "easeOutCircle" | "easeInCircle" | undefined;
            name: string | undefined;
        },
        false,
        true,
        true
    >;
};
export { TokenImageRuleElement };
