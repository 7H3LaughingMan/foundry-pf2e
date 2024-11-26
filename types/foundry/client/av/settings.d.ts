export {};

declare global {
    interface AVSettingsData {
        /** Whether this user has muted themselves. */
        muted?: boolean;
        /** Whether this user has hidden their video. */
        hidden?: boolean;
        /** Whether the user is broadcasting audio. */
        speaking?: boolean;
    }

    class AVSettings {
        constructor();

        _set: <T>(key: string, value: T) => void;

        _change: () => void;

        client: typeof AVSettings.DEFAULT_CLIENT_SETTINGS;

        world: typeof AVSettings.DEFAULT_WORLD_SETTINGS;

        _original: {
            client: typeof AVSettings.DEFAULT_CLIENT_SETTINGS;
            world: typeof AVSettings.DEFAULT_WORLD_SETTINGS;
        };

        /** WebRTC Mode, Disabled, Audio only, Video only, Audio & Video */
        static AV_MODES: {
            DISABLED: 0;
            AUDIO: 1;
            VIDEO: 2;
            AUDIO_VIDEO: 3;
        };

        /** Voice modes: Always-broadcasting, voice-level triggered, push-to-talk. */
        static VOICE_MODES: {
            ALWAYS: "always";
            ACTIVITY: "activity";
            PTT: "ptt";
        };

        /** Displayed nameplate options: Off entirely, animate between player and character name, player name only, character name only. */
        static NAMEPLATE_MODES: {
            OFF: 0;
            BOTH: 1;
            PLAYER_ONLY: 2;
            CHAR_ONLY: 3;
        };

        /** AV dock positions. */
        static DOCK_POSITIONS: {
            TOP: "top";
            RIGHT: "right";
            BOTTOM: "bottom";
            LEFT: "left";
        };

        /** Default client AV settings. */
        static DEFAULT_CLIENT_SETTINGS: {
            /** @defaultValue `"default"` */
            videoSrc: string;
            /** @defaultValue `"default"` */
            audioSrc: string;
            /** @defaultValue `"default"` */
            audioSink: string;
            /** @defaultValue `"bottom"` */
            dockPosition: typeof AVSettings.DOCK_POSITIONS;
            /** @defaultValue `false` */
            hidePlayerList: boolean;
            /** @defaultValue `false` */
            hideDock: boolean;
            /** @defaultValue `false` */
            muteAll: boolean;
            /** @defaultValue `false` */
            disableVideo: boolean;
            /** @defaultValue `false` */
            borderColors: boolean;
            /** @defaultValue `240` */
            dockWidth: number;
            /** @defaultValue `1` */
            nameplates: typeof AVSettings.NAMEPLATE_MODES;
            voice: {
                /** @defaultValue `"AVSettings.VOICE_MODES.PTT"` */
                mode: typeof AVSettings.VOICE_MODES;
                /** @defaultValue ``"`"`` */
                pttName: string;
                /** @defaultValue `100` */
                pttDelay: number;
                /** @defaultValue `-45` */
                activityThreshold: number;
            };
            /** @defaultValue `{}` */
            users: Record<string, typeof AVSettings.DEFAULT_USER_SETTINGS>;
        };

        /** Default world-level AV settings. */
        static DEFAULT_WORLD_SETTINGS: {
            /** @defaultValue `AVSettings.AV_MODES.DISABLED` */
            mode: typeof AVSettings.AV_MODES;
            turn: {
                /** @defaultValue `"server"` */
                type: string;
                /** @defaultValue `""` */
                url: string;
                /** @defaultValue `""` */
                username: string;
                /** @defaultValue `""` */
                password: string;
            };
        };

        /** Default client settings for each connected user. */
        static DEFAULT_USER_SETTINGS: {
            /** @defaultValue `false` */
            popout: boolean;
            /** @defaultValue `100` */
            x: number;
            /** @defaultValue `100` */
            y: number;
            /** @defaultValue `0` */
            z: number;
            /** @defaultValue `320` */
            width: number;
            /** @defaultValue `1.0` */
            volume: number;
            /** @defaultValue `false` */
            muted: boolean;
            /** @defaultValue `false` */
            hidden: boolean;
            /** @defaultValue `false` */
            blocked: boolean;
            /** @defaultValue `240` */
            dockWidth: number;
        };

        /** Stores the transient AV activity data received from other users. */
        activity: Record<string, AVSettingsData>;

        initialize(): void;

        changed(): void;

        // TODO: Improve once we have proper typing for dot notation
        get(scope: "client" | "world", setting: string): unknown;

        getUser(
            userId: string,
        ):
            | (typeof AVSettings.DEFAULT_CLIENT_SETTINGS & { canBroadcastAudio: boolean; canBroadcastVideo: boolean })
            | null;

        // TODO: Improve once we have proper typing for dot notation
        set(scope: "client" | "world", setting: string, value: unknown): void;

        /** Return a mapping of AV settings for each game User. */
        get users(): Record<
            string,
            typeof AVSettings.DEFAULT_CLIENT_SETTINGS & { canBroadcastAudio: boolean; canBroadcastVideo: boolean }
        >;

        /** A helper to determine if the dock is configured in a vertical position. */
        get verticalDock(): boolean;

        /** Prepare a standardized object of user settings data for a single User */
        private _getUserSettings(
            user: User,
        ): typeof AVSettings.DEFAULT_CLIENT_SETTINGS & { canBroadcastAudio: boolean; canBroadcastVideo: boolean };

        /** Handle setting changes to either rctClientSettings or rtcWorldSettings. */
        private _onSettingsChanged(): void;

        /** Handle another connected user changing their AV settings. */
        handleUserActivity(userId: string, settings: AVSettingsData): void;
    }
}
