/** A data structure representing a tree of string nodes with arbitrary object leaves. */
export default class StringTree<EntryType> {
    /** The key symbol that stores the leaves of any given node. */
    static readonly leaves: unique symbol;

    static readonly #leaves: unique symbol;

    /** The tree's root. */
    #root: StringTreeNode<EntryType>;

    /** Create a new node. */
    #createNode(): StringTreeNode<EntryType>;

    /**
     * Insert an entry into the tree.
     * @param strings The string parents for the entry.
     * @param entry The entry to store.
     * @returns The node the entry was added to.
     */
    addLeaf(strings: string[], entry: EntryType): StringTreeNode<EntryType>;

    /**
     * Traverse the tree along the given string path and return any entries reachable from the node.
     * @param strings The string path to the desired node.
     * @param options
     * @param options.limit The maximum number of items to retrieve.
     * @param options.filterEntries A filter function to apply to each candidate entry.
     */
    lookup(
        strings: string[],
        options?: { limit?: number; filterEntries?: StringTreeEntryFilter<EntryType> },
    ): StringTreeNode<EntryType>[];

    /**
     * Returns the node at the given path through the tree.
     * @param strings The string path to the desired node.
     * @param options
     * @param options.hasLeaves Only return the most recently visited node that has leaves, otherwise
     *                          return the exact node at the prefix, if it exists.
     */
    nodeAtPrefix(strings: string[], options?: { hasLeaves?: boolean }): StringTreeNode<EntryType> | void;

    /* -------------------------------------------- */

    /**
     * Perform a breadth-first search starting from the given node and retrieving any entries reachable from that node,
     * until we reach the limit.
     * @param node The starting node.
     * @param entries The accumulated entries.
     * @param queue The working queue of nodes to search.
     * @param options
     * @param options.limit The maximum number of entries to retrieve before stopping.
     * @param options.filterEntries A filter function to apply to each candidate entry.
     */
    protected _breadthFirstSearch(
        node: StringTreeNode<EntryType>,
        entries: EntryType[],
        queue: StringTreeNode<EntryType>[],
        options?: { limit?: number; filterEntries?: StringTreeEntryFilter<EntryType> },
    ): void;
}

declare global {
    interface StringTreeNode<EntryType> {
        [StringTree.leaves]: Record<string, EntryType>[];
        [key: string]: StringTreeNode<EntryType>;
    }

    type StringTreeEntryFilter<EntryType> = (entry: EntryType) => boolean;
}
