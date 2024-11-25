export {};

declare global {
    /** The directory, not displayed in the sidebar, which organizes and displays world-level Macro documents. */
    class MacroDirectory<TMacro extends Macro> extends DocumentDirectory<TMacro> {
        constructor(options?: SidebarDirectoryOptions);

        static override documentName: "Macro";
    }
}
