export {};

declare global {
    /** 2D offset coordinates of a grid space. */
    interface GridOffset2D {
        /** The row coordinate (an integer) */
        i: number;
        /** The column coordinate (an integer) */
        j: number;
    }

    /** 3D offset coordinates of a grid space. */
    interface GridOffset3D {
        /** The row coordinate (an integer) */
        i: number;
        /** The column coordinate (an integer) */
        j: number;
        /** The vertical coordinate (an integer) */
        k: number;
    }

    /** 2D cube coordinates in a hexagonal grid. q + r + s = 0. */
    interface HexagonalGridCube2D {
        /**
         * The coordinate along the E-W (columns) or SW-NE (rows) axis.
         * Equal to the offset column coordinate if column orientation.
         */
        q: number;
        /**
         * The coordinate along the NE-SW (columns) or N-S (rows) axis.
         * Equal to the offset row coordinate if row orientation.
         */
        r: number;
        /** The coordinate along the SE-NW axis. */
        s: number;
    }

    /** 3D cube coordinates in a hexagonal grid. q + r + s = 0. */
    interface HexagonalGridCube3D {
        /**
         * The coordinate along the E-W (columns) or SW-NE (rows) axis.
         * Equal to the offset column coordinate if column orientation.
         */
        q: number;
        /**
         * The coordinate along the NE-SW (columns) or N-S (rows) axis.
         * Equal to the offset row coordinate if row orientation.
         */
        r: number;
        /** The coordinate along the SE-NW axis. */
        s: number;
        /** The vertical coordinate. */
        k: number;
    }

    /** A 2D offset of a grid space or a 2D point with pixel coordinates. */
    type GridCoordinates2D = GridOffset2D | Point;

    /** A 3D offset of a grid space or an elevated point. */
    type GridCoordinates3D = GridOffset3D | ElevatedPoint;

    /** 2D hexagonal cube coordinates, a 2D offset of a grid space, or a 2D point with pixel coordinates. */
    type HexagonalGridCoordinates2D = GridCoordinates2D | HexagonalGridCube2D;

    /** 3D hexagonal cube coordinates, a 3D offset of a grid space, or a 3D point with pixel coordinates. */
    type HexagonalGridCoordinates3D = GridCoordinates3D | HexagonalGridCube3D;

    /** A snapping behavior is defined by the snapping mode at the given resolution of the grid. */
    interface GridSnappingBehavior {
        /** The snapping mode (a union of {@link CONST.GRID_SNAPPING_MODES}). */
        mode: number;
        /** The resolution (a positive integer). Default: `1`. */
        resolution?: number;
    }

    interface GridMeasurePathWaypointData2D {
        /** Teleport to this waypoint? Default: `false`. */
        teleport?: boolean;
        /** A predetermined cost (nonnegative) or cost function to be used instead of `options.cost`. */
        cost?: number | GridMeasurePathCostFunction2D;
    }

    interface GridMeasurePathWaypointData3D {
        /** Teleport to this waypoint? Default: `false`. */
        teleport?: boolean;
        /** A predetermined cost (nonnegative) or cost function to be used instead of `options.cost`. */
        cost?: number | GridMeasurePathCostFunction3D;
    }

    /** A waypoint of {@link GridMeasurePathResult}. */
    interface GridMeasurePathResultWaypoint {
        /** The segment from the previous waypoint to this waypoint. */
        backward: GridMeasurePathResultSegment | null;
        /** The segment from this waypoint to the next waypoint. */
        forward: GridMeasurePathResultSegment | null;
        /** The total distance travelled along the path up to this waypoint. */
        distance: number;
        /** The total cost of the direct path ({@link BaseGrid#getDirectPath}) up to this waypoint. */
        cost: number;
        /** The total number of spaces moved along a direct path up to this waypoint. */
        spaces: number;
        /** The total number of diagonals moved along a direct path up to this waypoint. */
        diagonals: number;
    }

    /** A segment of {@link GridMeasurePathResult}. */
    interface GridMeasurePathResultSegment {
        /** The waypoint that this segment starts from. */
        from: GridMeasurePathResultWaypoint;
        /** The waypoint that this segment goes to. */
        to: GridMeasurePathResultWaypoint;
        /** The distance travelled in grid units along this segment. */
        distance: number;
        /** The cost of the direct path ({@link BaseGrid#getDirectPath}) between the two waypoints. */
        cost: number;
        /** The number of spaces moved along this segment. */
        spaces: number;
        /** The number of diagonals moved along this segment. */
        diagonals: number;
    }

    /** A result of {@link BaseGrid#measurePath}. */
    interface GridMeasurePathResult {
        /** The measurements at each waypoint. */
        waypoints: GridMeasurePathResultWaypoint[];
        /** The measurements at each segment. */
        segments: GridMeasurePathResultSegment[];
        /** The total distance travelled along the path through all waypoints. */
        distance: number;
        /** The total cost of the direct path ({@link BaseGrid#getDirectPath}) through all waypoints. */
        cost: number;
        /**
         * The total number of spaces moved along a direct path through all waypoints.
         * Moving from a grid space to any of its neighbors counts as 1 step.
         * Always 0 in gridless grids.
         */
        spaces: number;
        /** The total number of diagonals moved along a direct path through all waypoints. */
        diagonals: number;
    }

    /**
     * A function that returns the cost for a given move between grid spaces in 2D.
     * In square and hexagonal grids the grid spaces are always adjacent unless teleported.
     * The distance is 0 if and only if teleported. The function is never called with the same offsets.
     * @param from The offset that is moved from
     * @param to The offset that is moved to
     * @param distance The distance between the grid spaces, or 0 if teleported
     * @param segment The properties of the segment
     * @returns The cost of the move between the grid spaces (nonnegative)
     */
    type GridMeasurePathCostFunction2D<SegmentData = {}> = (
        from: Readonly<GridOffset2D>,
        to: Readonly<GridOffset2D>,
        distance: number,
        segment: DeepReadonly<SegmentData>,
    ) => number;

    /**
     * A function that returns the cost for a given move between grid spaces in 3D.
     * In square and hexagonal grids the grid spaces are always adjacent unless teleported.
     * The distance is 0 if and only if teleported. The function is never called with the same offsets.
     * @param from The offset that is moved from
     * @param to The offset that is moved to
     * @param distance The distance between the grid spaces, or 0 if teleported
     * @param segment The properties of the segment
     * @returns The cost of the move between the grid spaces (nonnegative)
     */
    type GridMeasurePathCostFunction3D<SegmentData = {}> = (
        from: Readonly<GridOffset3D>,
        to: Readonly<GridOffset3D>,
        distance: number,
        segment: DeepReadonly<SegmentData>,
    ) => number;

    interface GridConfiguration {
        /** The size of a grid space in pixels (a positive number). */
        size: number;
        /** The distance of a grid space in units (a positive number). Default: `1`. */
        distance?: number;
        /** The units of measurement. Default: `""`. */
        units?: string;
        /** The style of the grid. Default: `"solidLines"`. */
        style?: string;
        /** The color of the grid. Default: `0x000000`. */
        color?: ColorSource;
        /** The alpha of the grid. Default: `1`. */
        alpha?: number;
        /** The line thickness of the grid. Default: `1`. */
        thickness?: number;
    }

    interface SquareGridConfiguration extends GridConfiguration {
        /** The rule for diagonal measurement (see {@link CONST.GRID_DIAGONALS}). Default: `CONST.GRID_DIAGONALS.EQUIDISTANT`. */
        diagonals?: GridDiagonals;
    }

    interface HexagonalGridConfiguration extends GridConfiguration {
        /** Is this grid column-based (flat-topped) or row-based (pointy-topped)? Default: `false`. */
        columns?: boolean;
        /** Is this grid even or odd? Default: `false`. */
        even?: boolean;
        /** The rule for diagonal measurement (see {@link CONST.GRID_DIAGONALS}). Default: `CONST.GRID_DIAGONALS.EQUIDISTANT`. */
        diagonals?: GridDiagonals;
    }
}
