import StringTree, { StringTreeEntryFilter, StringTreeNode } from "./string-tree.mjs";

/** A leaf entry in the tree. */
export type WordTreeEntry = {
    /** An object that this entry represents. */
    entry: Document | object;
    /** The document type. */
    documentName: string;
    /** The document's UUID. */
    uuid: string;
    /** The pack ID. */
    pack?: string;
};

/**
 * A data structure for quickly retrieving objects by a string prefix.
 * Note that this works well for languages with alphabets (latin, cyrillic, korean, etc.), but may need more nuanced
 * handling for languages that compose characters and letters.
 */
export default class WordTree extends StringTree<WordTreeEntry> {
    /**
     * Insert an entry into the tree.
     * @param string The string key for the entry.
     * @param entry The entry to store.
     * @returns The node the entry was added to.
     */
    addLeaf(string: string, entry: WordTreeEntry): StringTreeNode;
    addLeaf(strings: string[], entry: WordTreeEntry): StringTreeNode;

    /* -------------------------------------------- */

    /**
     * Return entries that match the given string prefix.
     * @param prefix The prefix.
     * @param limit he maximum number of items to retrieve. It is important to set this value as very short prefixes will naturally match large numbers of entries.
     * @param filterEntries A filter function to apply to each candidate entry.
     * @returns A number of entries that have the given prefix.
     */
    lookup(
        prefix: string,
        { limit, filterEntries }?: { limit?: number; filterEntries?: StringTreeEntryFilter },
    ): WordTreeEntry[];
    lookup(
        strings: string[],
        { limit, filterEntries }?: { limit?: number; filterEntries?: StringTreeEntryFilter },
    ): StringTreeNode[];

    /* -------------------------------------------- */

    /**
     * Returns the node at the given prefix.
     * @param prefix The prefix.
     */
    nodeAtPrefix(prefix: string): StringTreeNode;
    nodeAtPrefix(strings: string[], { hasLeaves }?: { hasLeaves?: boolean }): StringTreeNode | void;
}
