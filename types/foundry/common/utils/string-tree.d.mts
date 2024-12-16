/**
 * A string tree node consists of zero-or-more string keys, and a leaves property that contains any objects that
 * terminate at the current node.
 */
export type StringTreeNode = {
    [StringTree.leaves]: Record<string, unknown>[];
    [key: string]: StringTreeNode;
};

/**
 * @param entry The entry to filter.
 * @returns Whether the entry should be included in the result set.
 */
export type StringTreeEntryFilter = (entry: unknown) => boolean;

/**
 * A data structure representing a tree of string nodes with arbitrary object leaves.
 */
export default class StringTree<EntryType> {
    /**
     * The key symbol that stores the leaves of any given node.
     * @type {symbol}
     */
    static readonly leaves: unique symbol;

    static readonly #leaves: unique symbol;

    /* -------------------------------------------- */

    /**
     * The tree's root.
     */
    #root: StringTreeNode;

    /* -------------------------------------------- */

    /**
     * Create a new node.
     */
    #createNode(): StringTreeNode;

    /* -------------------------------------------- */

    /**
     * Insert an entry into the tree.
     * @param strings The string parents for the entry.
     * @param entry The entry to store.
     * @returns The node the entry was added to.
     */
    addLeaf(strings: string[], entry: EntryType): StringTreeNode;

    /* -------------------------------------------- */

    /**
     * Traverse the tree along the given string path and return any entries reachable from the node.
     * @param strings The string path to the desired node.
     * @param limit The maximum number of items to retrieve.
     * @param filterEntries A filter function to apply to each candidate entry.
     */
    lookup(
        strings: string[],
        { limit, filterEntries }?: { limit?: number; filterEntries?: StringTreeEntryFilter },
    ): StringTreeNode[];

    /* -------------------------------------------- */

    /**
     * Returns the node at the given path through the tree.
     * @param strings The string path to the desired node.
     * @param hasLeaves Only return the most recently visited node that has leaves, otherwise return the exact node at the prefix, if it exists.
     */
    nodeAtPrefix(strings: string[], { hasLeaves }?: { hasLeaves?: boolean }): StringTreeNode | void;

    /* -------------------------------------------- */

    /**
     * Perform a breadth-first search starting from the given node and retrieving any entries reachable from that node,
     * until we reach the limit.
     * @param node The starting node.
     * @param entries The accumulated entries.
     * @param queue The working queue of nodes to search.
     * @param limit The maximum number of entries to retrieve before stopping.
     * @param filterEntries A filter function to apply to each candidate entry.
     */
    protected _breadthFirstSearch(
        node: StringTreeNode,
        entries: EntryType[],
        queue: StringTreeNode[],
        { limit, filterEntries }?: { limit?: number; filterEntries?: StringTreeEntryFilter },
    ): void;
}
