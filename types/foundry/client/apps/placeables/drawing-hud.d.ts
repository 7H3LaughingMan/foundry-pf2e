/**
 * An implementation of the PlaceableHUD base class which renders a heads-up-display interface for Drawing objects.
 * The DrawingHUD implementation can be configured and replaced via {@link CONFIG.Drawing.hudClass}.
 */
declare class DrawingHUD extends BasePlaceableHUD<Drawing> {
    static override get defaultOptions(): ApplicationOptions;

    override getData(options?: ApplicationOptions): BasePlaceableHUDData<Drawing>;

    override setPosition(position?: {
        left: Maybe<number>;
        top: Maybe<number>;
        width: Maybe<number>;
        height: Maybe<number | "auto">;
        scale: Maybe<number>;
    }): void;
}
