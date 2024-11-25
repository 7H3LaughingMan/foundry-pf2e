export {};

declare global {
    /**
     * The global action bar displayed at the bottom of the game view.
     * The Hotbar is a UI element at the bottom of the screen which contains Macros as interactive buttons.
     * The Hotbar supports 5 pages of global macros which can be dragged and dropped to organize as you wish.
     *
     * Left clicking a Macro button triggers its effect.
     * Right clicking the button displays a context menu of Macro options.
     * The number keys 1 through 0 activate numbered hotbar slots.
     * Pressing the delete key while hovering over a Macro will remove it from the bar.
     */
    class Hotbar<TMacro extends Macro = Macro> extends Application {
        constructor(options: ApplicationOptions);

        /** The currently viewed macro page */
        page: number;

        /** The currently displayed set of macros */
        macros: TMacro[];

        /** Track collapsed state */
        protected _collapsed: false;

        /** Track which hotbar slot is the current hover target, if any */
        protected _hover: number | null;

        static override get defaultOptions(): ApplicationOptions;

        /** Whether the hotbar is locked. */
        get locked(): boolean;

        override getData(options?: Record<string, unknown>): {
            page: number;
            macros: TMacro[];
            barClass: string;
        };

        /**
         * Get the Array of Macro (or null) values that should be displayed on a numbered page of the bar
         *
         * @param page
         */
        protected _getMacrosByPage(page: number): TMacro[];

        /**
         * Collapse the Hotbar, minimizing its display.
         *
         * @return A promise which resolves once the collapse animation completes
         */
        collapse(): Promise<void>;

        /**
         * Expand the Hotbar, displaying it normally.
         *
         * @return A promise which resolves once the expand animation completes
         */
        expand(): Promise<void>;

        /**
         * Change to a specific numbered page from 1 to 5
         *
         * @param page      The page number to change to.
         */
        changePage(page: number): void;

        /**
         * Change the page of the hotbar by cycling up (positive) or down (negative)
         *
         * @param direction     The direction to cycle
         */
        cyclePage(direction: number): void;

        override activateListeners(html: JQuery): void;

        protected _contextMenu(html: JQuery): void;

        /**
         * Get the Macro entry context options
         *
         * @returns The Macro entry context options
         * */
        protected _getEntryContextOptions(): EntryContextOption[];

        /**
         * Handle left-click events to
         *
         * @param event     The originating click event
         * */
        protected _onClickMacro(event: MouseEvent): Promise<void>;

        /**
         * Handle pagination controls
         *
         * @param event     The originating click event
         */
        protected _onClickPageControl(event: MouseEvent): void;

        protected override _canDragStart(selector: string): boolean;

        protected override _onDragStart(event: DragEvent): void;

        protected override _canDragDrop(selector: string): boolean;

        protected override _onDrop(event: DragEvent): Promise<void>;

        /**
         * Create a Macro which rolls a RollTable when executed
         *
         * @param table     The RollTable document
         * @returns         A created Macro document to add to the bar
         */
        _createRollTableRollMacro(table: RollTable): Promise<TMacro>;

        /**
         * Create a Macro document which can be used to toggle display of a Journal Entry.
         *
         * @param doc       A Document which should be toggled
         * @returns         A created Macro document to add to the bar
         */
        protected _createDocumentSheetToggle(doc: Document): Promise<TMacro>;

        /** Handle click events to toggle display of the macro bar */
        _onToggleBar(event: Event): void;

        /** Toggle the hotbar's lock state. */
        protected _toggleHotbarLock(): Promise<void>;

        /**
         * Handle toggling a document sheet.
         *
         * @param uuid      The Document UUID to display
         */
        toggleDocumentSheet(uuid: string): Promise<Application | number | void>;
    }
}
