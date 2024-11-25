import type { ClientBaseUser } from "./client-base-mixes.d.ts";

declare global {
    /**
     * The client-side User document which extends the common BaseUser model.
     * Each User document contains UserData which defines its data schema.
     *
     * @see {@link Users}       The world-level collection of User documents
     * @see {@link UserConfig} The User configuration application
     */
    class User<TCharacter extends Actor<null> = Actor<null>> extends ClientBaseUser<TCharacter> {
        constructor(data: PreCreate<foundry.documents.UserSource>, context?: DocumentConstructionContext<null>);

        /** Track whether the user is currently active in the game */
        active: boolean;

        /** Track references to the current set of Tokens which are targeted by the User */
        targets: UserTargets<Token>;

        /** Track the ID of the Scene that is currently being viewed by the User */
        viewedScene: string | null;

        /* ---------------------------------------- */
        /*  User Properties                         */
        /* ---------------------------------------- */

        /** A flag for whether the current User is a Trusted Player */
        get isTrusted(): boolean;

        /** A flag for whether this User is the connected client */
        get isSelf(): boolean;

        override prepareDerivedData(): void;

        /**
         * Assign a Macro to a numbered hotbar slot between 1 and 50
         * @param macro      The Macro entity to assign
         * @param [slot]     A specific numbered hotbar slot to fill
         * @param [fromSlot] An optional origin slot from which the Macro is being shifted
         * @return A Promise which resolves once the User update is complete
         */
        assignHotbarMacro(
            macro: Macro | null,
            slot?: number | string,
            { fromSlot }?: { fromSlot?: number | undefined }
        ): Promise<this>;

        /**
         * Assign a specific boolean permission to this user.
         * Modifies the user permissions to grant or restrict access to a feature.
         *
         * @param permission The permission name from USER_PERMISSIONS
         * @param allowed    Whether to allow or restrict the permission
         */
        assignPermission(permission: UserPermission, allowed: boolean): Promise<this | undefined>;

        /**
         * Submit User activity data to the server for broadcast to other players.
         * This type of data is transient, persisting only for the duration of the session and not saved to any database.
         * Activity data uses a volatile event to prevent unnecessary buffering if the client temporarily loses connection.
         * 
         * @param activityData          An object of User activity data to submit to the server for broadcast.
         * @param options
         * @param options.volatile      If undefined, volatile is inferred from the activity data.
         */
        broadcastActivity(activityData?: ActivityData, options?: { volatile?: boolean}): void;

        /**
         * Get an Array of Macro Entities on this User's Hotbar by page
         * @param page The hotbar page number
         */
        getHotbarMacros(page?: number): object[];

        /**
         * Update the set of Token targets for the user given an array of provided Token ids.
         * @param targetIds An array of Token ids which represents the new target set
         */
        updateTokenTargets(targetIds?: string[]): void;

        protected override _onUpdate(
            changed: DeepPartial<foundry.documents.UserSource>,
            options: DatabaseUpdateOperation<null>,
            userId: string
        ): void;

        protected override _onDelete(options: DatabaseDeleteOperation<null>, userId: string): void;
    }

    interface PingData {
        /** Pulls all connected clients' views to the pinged coordinates. */
        pull?: boolean;
        /** The ping style, see CONFIG.Canvas.pings. */
        style: string;
        /** The ID of the scene that was pinged. */
        scene: string;
        /** The zoom level at which the ping was made. */
        zoom: number;
    }

    interface ActivityData {
        /** The ID of the scene that the user is viewing. */
        sceneId?: string | null;
        /** The position of the user's cursor. */
        cursor?: { x: number; y: number };
        /** The state of the user's ruler, if they are currently using one  */
        ruler?: RulerMeasurementData | null;
        /**
         * The IDs of the tokens the user has targeted in the currently viewed
         * scene.
         */
        targets?: string[];
        /** Whether the user has an open WS connection to the server or not. */
        active?: boolean;
        /** Is the user emitting a ping at the cursor coordinates? */
        ping?: PingData;
        /** The state of the user's AV settings. */
        av?: AVSettingsData;
    }

    type Active<TUser extends User<Actor<null>>> = TUser & {
        color: HexColorString;
        border: HexColorString;
    };
}
