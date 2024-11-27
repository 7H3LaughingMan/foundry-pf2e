/** A data structure representing a tree of string nodes with arbitrary object leaves. */
declare class StringTree<EntryType> {
    /** The key symbol that stores the leaves of any given node. */
    static readonly leaves: unique symbol;

    static readonly #leaves: unique symbol;

    /** The tree's root. */
    #root: StringTree.StringTreeNode;

    /** Create a new node. */
    #createNode(): StringTree.StringTreeNode;

    /**
     * Insert an entry into the tree.
     * @param strings The string parents for the entry.
     * @param entry The entry to store.
     * @returns The node the entry was added to.
     */
    addLeaf(strings: string[], entry: EntryType): StringTree.StringTreeNode;

    /**
     * Traverse the tree along the given string path and return any entries reachable from the node.
     * @param strings The string path to the desired node.
     * @param options
     * @param options.limit The maximum number of items to retrieve.
     * @param options.filterEntries A filter function to apply to each candidate entry.
     */
    lookup(
        strings: string[],
        options?: { limit?: number; filterEntries?: StringTree.StringTreeEntryFilter },
    ): StringTree.StringTreeNode[];

    /**
     * Returns the node at the given path through the tree.
     * @param strings The string path to the desired node.
     * @param options
     * @param options.hasLeaves Only return the most recently visited node that has leaves, otherwise
     *                          return the exact node at the prefix, if it exists.
     */
    nodeAtPrefix(strings: string[], options?: { hasLeaves?: boolean }): StringTree.StringTreeNode | void;

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
        node: StringTree.StringTreeNode,
        entries: EntryType[],
        queue: StringTree.StringTreeNode[],
        options?: { limit?: number; filterEntries?: StringTree.StringTreeEntryFilter },
    ): void;
}

declare namespace StringTree {
    interface StringTreeNode {
        [StringTree.leaves]: Record<string, unknown>[];
        [key: string]: StringTreeNode;
    }

    type StringTreeEntryFilter = (entry: unknown) => boolean;
}

export default StringTree;
