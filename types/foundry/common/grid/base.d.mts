/**
 * The base grid class.
 */
export default abstract class BaseGrid {
    /**
     * The base grid constructor.
     * @param config The grid configuration
     */
    constructor(config: GridConfiguration);

    /**
     * The grid type (see {@link CONST.GRID_TYPES}).
     */
    readonly type: GridTypes;

    /**
     * Is this a gridless grid?
     */
    get isGridless(): boolean;

    /**
     * Is this a square grid?
     * @type {boolean}
     */
    get isSquare(): boolean;

    /**
     * Is this a hexagonal grid?
     */
    get isHexagonal(): boolean;

    /**
     * Calculate the total size of the canvas with padding applied, as well as the top-left coordinates of the inner
     * rectangle that houses the scene.
     * @param sceneWidth The width of the scene.
     * @param sceneHeight The height of the scene.
     * @param padding The percentage of padding.
     */
    abstract calculateDimensions(
        sceneWidth: number,
        sceneHeight: number,
        padding: number,
    ): { width: number; height: number; x: number; y: number; rows: number; columns: number };

    /**
     * Returns the offset of the grid space corresponding to the given coordinates.
     * @param coords The coordinates
     * @returns The offset
     */
    abstract getOffset(coords: GridCoordinates2D): GridOffset2D;
    abstract getOffset(coords: GridCoordinates3D): GridOffset3D;

    /**
     * Returns the smallest possible range containing the offsets of all grid spaces that intersect the given bounds.
     * If the bounds are empty (nonpositive width or height), then the offset range is empty.
     * @param bounds The bounds
     * @returns The offset range
     */
    abstract getOffsetRange(bounds: Rectangle): [i0: number, j0: number, i1: number, j1: number];

    /**
     * Returns the offsets of the grid spaces adjacent to the one corresponding to the given coordinates.
     * Returns always an empty array in gridless grids.
     * @param coords The coordinates
     * @returns The adjacent offsets
     */
    abstract getAdjacentOffsets(coords: GridCoordinates2D): GridOffset2D[];
    abstract getAdjacentOffsets(coords: GridCoordinates3D): GridOffset3D[];

    /**
     * Returns true if the grid spaces corresponding to the given coordinates are adjacent to each other.
     * In square and hexagonal grids with illegal diagonals the diagonally neighboring grid spaces are not adjacent.
     * Returns always false in gridless grids.
     * @param coords1 The first coordinates
     * @param coords2 The second coordinates
     */
    abstract testAdjacency(coords1: GridCoordinates2D, coords2: GridCoordinates2D): boolean;
    abstract testAdjacency(coords1: GridCoordinates3D, coords2: GridCoordinates3D): boolean;

    /**
     * Returns the offset of the grid space corresponding to the given coordinates
     * shifted by one grid space in the given direction. The k-coordinate is not changed.
     * In square and hexagonal grids with illegal diagonals the offset of the given coordinates is returned
     * if the direction is diagonal.
     * In gridless grids the point is by the grid size.
     * @param coords The coordinates
     * @param direction The direction (see {@link CONST.MOVEMENT_DIRECTIONS})
     * @returns The offset
     */
    abstract getShiftedOffset(coords: GridCoordinates2D, direction: MovementDirections): GridOffset2D;
    abstract getShiftedOffset(coords: GridCoordinates3D, direction: MovementDirections): GridOffset3D;

    /**
     * Returns the point shifted by the difference between the grid space corresponding to the given coordinates
     * and the shifted grid space in the given direction. The z-coordinate is not changed.
     * In square and hexagonal grids with illegal diagonals the point is not shifted if the direction is diagonal.
     * In gridless grids the point coordinates are shifted by the grid size.
     * @param point The point that is to be shifted
     * @param direction The direction (see {@link CONST.MOVEMENT_DIRECTIONS})
     * @returns The shifted point
     */
    abstract getShiftedPoint(point: Point, direction: MovementDirections): Point;
    abstract getShiftedPoint(point: ElevatedPoint, direction: MovementDirections): ElevatedPoint;

    /**
     * Returns the top-left point of the grid space bounds corresponding to the given coordinates.
     * If given a point, the top-left point of the grid space bounds that contains it is returned.
     * The top-left point lies in the plane of the bottom face of the 3D grid space.
     * In gridless grids a point with the same coordinates as the given point is returned.
     * @param coords The coordinates
     * @returns The top-left point
     */
    abstract getTopLeftPoint(coords: GridCoordinates2D): Point;
    abstract getTopLeftPoint(coords: GridCoordinates3D): ElevatedPoint;

    /**
     * Returns the center point of the grid space corresponding to the given coordinates.
     * If given a point, the center point of the grid space that contains it is returned.
     * The center point lies in the plane of the bottom face of the 3D grid space.
     * In gridless grids a point with the same coordinates as the given point is returned.
     * @param coords The coordinates
     * @returns The center point
     */
    abstract getCenterPoint(coords: GridCoordinates2D): Point;
    abstract getCenterPoint(coords: GridCoordinates3D): ElevatedPoint;

    /**
     * Returns the points of the grid space shape relative to the center point.
     * The points are returned in the same order as in {@link BaseGrid.getVertices}.
     * In gridless grids an empty array is returned.
     * @returns The points of the polygon
     */
    abstract getShape(): Point[];

    /**
     * Returns the vertices of the grid space corresponding to the given coordinates.
     * The vertices are returned ordered in positive orientation with the first vertex
     * being the top-left vertex in square grids, the top vertex in row-oriented
     * hexagonal grids, and the left vertex in column-oriented hexagonal grids.
     * In gridless grids an empty array is returned.
     * @param coords The coordinates
     * @returns The vertices
     */
    abstract getVertices(coords: GridCoordinates2D): Point[];

    /**
     * Snaps the given point to the grid.
     * In square and hexagonal grids the z-coordinate of the point is rounded to the nearest multiple of the grid size.
     * In gridless grids a point with the same coordinates as the given point is returned regardless of the
     * snapping behavior.
     * @param point The point that is to be snapped
     * @param behavior The snapping behavior
     * @returns The snapped point
     */
    abstract getSnappedPoint(point: Point, behavior: GridSnappingBehavior): Point;
    abstract getSnappedPoint(point: ElevatedPoint, behavior: GridSnappingBehavior): ElevatedPoint;

    /**
     * Measure a shortest, direct path through the given waypoints.
     * @param waypoints The waypoints the path must pass through
     * @param cost The function that returns the cost for a given move between grid spaces (default is the distance travelled along the direct path)
     * @returns The measurements a shortest, direct path through the given waypoints
     */
    measurePath<SegmentData = {}>(
        waypoints: (GridCoordinates2D & Partial<GridMeasurePathWaypointData2D> & SegmentData)[],
        options?: { cost?: GridMeasurePathCostFunction2D<SegmentData> },
    ): GridMeasurePathResult;
    measurePath<SegmentData = {}>(
        waypoints: (GridCoordinates3D & Partial<GridMeasurePathWaypointData3D> & SegmentData)[],
        options?: { cost?: GridMeasurePathCostFunction3D<SegmentData> },
    ): GridMeasurePathResult;

    /**
     * Measures the path and writes the segments measurements into the result.
     * The waypoint measurements are filled in by {@link BaseGrid.measurePath}.
     * Called by {@link BaseGrid.measurePath}.
     * @template {{[K in "i"|"j"|"k"|"q"|"r"|"s"|"x"|"y"|"elevation"|"cost"]: never}} SegmentData
     * @overload
     * @param {(Coordinates2D & Partial<GridMeasurePathWaypointData2D> & SegmentData)[]} waypoints
     *   The waypoints the path must pass through
     * @param {object} [options]                                             Additional measurement options
     * @param {GridMeasurePathCostFunction2D<SegmentData>} [options.cost]    The function that returns the cost
     *   for a given move between grid spaces (default is the distance travelled)
     * @param {GridMeasurePathResult} result    The measurement result that the measurements need to be written to
     * @overload
     * @param {(Coordinates3D & Partial<GridMeasurePathWaypointData3D> & SegmentData)[]} waypoints
     *   The waypoints the path must pass through
     * @param {object} [options]                                             Additional measurement options
     * @param {GridMeasurePathCostFunction3D<SegmentData>} [options.cost]    The function that returns the cost
     *   for a given move between grid spaces (default is the distance travelled)
     * @param {GridMeasurePathResult} result    The measurement result that the measurements need to be written to
     * @protected
     * @abstract
     */
    protected abstract _measurePath(waypoints, options, result): GridMeasurePathResult;

    /**
     * Returns the sequence of grid offsets of a shortest, direct path passing through the given waypoints.
     * @param waypoints The waypoints the path must pass through
     * @returns The sequence of grid offsets of a shortest, direct path
     */
    abstract getDirectPath(waypoints: GridCoordinates2D): GridOffset2D[];
    abstract getDirectPath(waypoints: GridCoordinates3D): GridOffset3D[];

    /**
     * Get the point translated in a direction by a distance.
     * The z-coordinate is not changed.
     * @param point The point that is to be translated
     * @param direction The angle of direction in degrees
     * @param distance The distance in grid units
     * @returns The translated point
     */
    abstract getTranslatedPoint(point: Point, direction: number, distance: number): Point;
    abstract getTranslatedPoint(point: ElevatedPoint, direction: number, distance: number): ElevatedPoint;

    /**
     * Get the circle polygon given the radius in grid units for this grid.
     * The points of the polygon are returned ordered in positive orientation.
     * In gridless grids an approximation of the true circle with a deviation of less than 0.25 pixels is returned.
     * @param center The center point of the circle.
     * @param radius The radius in grid units.
     * @returns The points of the circle polygon.
     */
    abstract getCircle(center: Point, radius: number): Point[];

    /**
     * Get the cone polygon given the radius in grid units and the angle in degrees for this grid.
     * The points of the polygon are returned ordered in positive orientation.
     * In gridless grids an approximation of the true cone with a deviation of less than 0.25 pixels is returned.
     * @param origin The origin point of the cone
     * @param radius The radius in grid units
     * @param direction The direction in degrees
     * @param angle The angle in degrees
     * @returns The points of the cone polygon
     */
    getCone(origin: Point, radius: number, direction: number, angle: number): Point[];
}
