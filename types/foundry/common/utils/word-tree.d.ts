/**
 * A data structure for quickly retrieving objects by a string prefix.
 * Note that this works well for languages with alphabets (latin, cyrillic, korean, etc.), but may need more nuanced
 * handling for languages that compose characters and letters.
 */
declare class WordTree extends foundry.utils.StringTree<WordTree.WordTreeEntry> {
    /**
     * Insert an entry into the tree.
     * @param string The string key for the entry.
     * @param entry The entry to store.
     * @returns The node the entry was added to.
     */
    addLeaf(string: string, entry: WordTree.WordTreeEntry): foundry.utils.StringTree.StringTreeNode;
    addLeaf(string: string[], entry: WordTree.WordTreeEntry): foundry.utils.StringTree.StringTreeNode;

    /* -------------------------------------------- */

    /**
     * Return entries that match the given string prefix.
     * @paramprefix The prefix.
     * @param options Additional options to configure behaviour.
     * @param options.limit The maximum number of items to retrieve. It is important to set this value as
     *                      very short prefixes will naturally match large numbers of entries.
     * @param options.filterEntries A filter function to apply to each candidate entry.
     * @returns A number of entries that have the given prefix.
     */
    lookup(
        prefix: string,
        options?: {
            limit?: number;
            filterEntries?: foundry.utils.StringTree.StringTreeEntryFilter;
        },
    ): WordTree.WordTreeEntry[];
    lookup(
        strings: string[],
        options?: {
            limit?: number;
            filterEntries?: foundry.utils.StringTree.StringTreeEntryFilter;
        },
    ): foundry.utils.StringTree.StringTreeNode[];

    /**
     * Returns the node at the given prefix.
     * @param {string} prefix  The prefix.
     * @returns {StringTreeNode}
     */
    nodeAtPrefix(prefix: string): WordTree.WordTreeEntry;
    nodeAtPrefix(strings: string[]): foundry.utils.StringTree.StringTreeNode | void;
}

declare namespace WordTree {
    interface WordTreeEntry {
        entry: foundry.abstract.Document;
        documentNAme: string;
        uuid: string;
        pack?: string;
    }
}

export default WordTree;
