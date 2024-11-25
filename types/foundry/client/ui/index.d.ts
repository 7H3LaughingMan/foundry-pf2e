import "./context.d.ts";
import "./dialog.d.ts";
import "./dragdrop.d.ts";
import "./editor.d.ts";
import "./filepicker.d.ts";
import "./notifications.d.ts";
import "./prosemirror.d.ts";
import "./secrets.d.ts";
import "./tabs.d.ts";
import "./tooltip.d.ts";
import "./tour.d.ts";

declare global {
    interface FoundryUI<
        TActorDirectory extends ActorDirectory<Actor<null>>,
        TItemDirectory extends ItemDirectory<Item<null>>,
        TChatLog extends ChatLog,
        TCompendiumDirectory extends CompendiumDirectory,
        TCombatTracker extends CombatTracker<Combat | null>,
        THotbar extends Hotbar,
    > {
        menu: MainMenu;
        sidebar: Sidebar;
        pause: Pause;
        nav: SceneNavigation;
        notifications: Notifications;
        actors: TActorDirectory;
        chat: TChatLog;
        combat: TCombatTracker;
        compendium: TCompendiumDirectory;
        controls: SceneControls;
        hotbar: THotbar;
        items: TItemDirectory;
        // journal: JournalDirectory;
        macros: MacroDirectory<Macro>;
        players: PlayerList;
        // playlists: PlaylistDirectory;
        // scenes: SceneDirectory;
        settings: Settings;
        tables: RollTableDirectory;
        windows: Record<number, Application>;
        // webrtc: CameraViews;
    }
}
