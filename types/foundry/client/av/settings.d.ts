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
}
