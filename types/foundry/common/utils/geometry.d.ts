/**
 * Determine the relative orientation of three points in two-dimensional space.
 * The result is also an approximation of twice the signed area of the triangle defined by the three points.
 * This method is fast - but not robust against issues of floating point precision. Best used with integer coordinates.
 * Adapted from https://github.com/mourner/robust-predicates.
 * @param a An endpoint of segment AB, relative to which point C is tested
 * @param b An endpoint of segment AB, relative to which point C is tested
 * @param c A point that is tested relative to segment AB
 * @returns The relative orientation of points A, B, and C.
 *          A positive value if the points are in counter-clockwise order (C lies to the left of AB).
 *          A negative value if the points are in clockwise order (C lies to the right of AB).
 *          Zero if the points A, B, and C are collinear.
 */
export function orient2dFast(a: Point, b: Point, c: Point): number;

/**
 * Quickly test whether the line segment AB intersects with the line segment CD.
 * This method does not determine the point of intersection, for that use lineLineIntersection.
 * @param a The first endpoint of segment AB
 * @param b The second endpoint of segment AB
 * @param c The first endpoint of segment CD
 * @param d The second endpoint of segment CD
 * @returns Do the line segments intersect?
 */
export function lineSegmentIntersects(a: Point, b: Point, c: Point, d: Point): boolean;

/**
 * An internal helper method for computing the intersection between two infinite-length lines.
 * Adapted from http://paulbourke.net/geometry/pointlineplane/.
 * @param a The first endpoint of segment AB
 * @param b The second endpoint of segment AB
 * @param c The first endpoint of segment CD
 * @param d The second endpoint of segment CD
 * @param options Options which affect the intersection test
 * @param options.t1 Return the optional vector distance from C to D on CD
 * @returns An intersection point, or null if no intersection occurred
 */
export function lineLineIntersection(
    a: Point,
    b: Point,
    c: Point,
    d: Point,
    options?: {
        t1: Maybe<boolean>;
    },
): Maybe<LineIntersection>;

/**
 * An internal helper method for computing the intersection between two finite line segments.
 * Adapted from http://paulbourke.net/geometry/pointlineplane/
 * @param a The first endpoint of segment AB
 * @param b The second endpoint of segment AB
 * @param c The first endpoint of segment CD
 * @param d The second endpoint of segment CD
 * @param epsilon A small epsilon which defines a tolerance for near-equality
 * @returns An intersection point, or null if no intersection occurred
 */
export function lineSegmentIntersection(
    a: Point,
    b: Point,
    c: Point,
    d: Point,
    epsilon?: number,
): Maybe<LineIntersection>;

/**
 * Determine the intersection between a line segment and a circle.
 * @param a The first vertex of the segment
 * @param b The second vertex of the segment
 * @param center The center of the circle
 * @param radius The radius of the circle
 * @param epsilon A small tolerance for floating point precision
 * @returns The intersection of the segment AB with the circle
 */
export function lineCircleIntersection(
    a: Point,
    b: Point,
    center: Point,
    radius: number,
    epsilon?: number,
): LineCircleIntersection;

/**
 * Identify the point closest to C on segment AB
 * @param c The reference point C
 * @param a Point A on segment AB
 * @param b Point B on segment AB
 * @returns The closest point to C on segment AB
 */
export function closestPointToSegment(c: Point, a: Point, b: Point): Point;

/**
 * Determine the points of intersection between a line segment (p0,p1) and a circle.
 * There will be zero, one, or two intersections
 * See https://math.stackexchange.com/a/311956.
 * @param p0 The initial point of the line segment
 * @param p1 The terminal point of the line segment
 * @param center The center of the circle
 * @param radius The radius of the circle
 * @param epsilon A small tolerance for floating point precision
 */
export function quadraticIntersection(p0: Point, p1: Point, center: Point, radius: number, epsilon?: number): Point[];

/**
 * Calculate the centroid non-self-intersecting closed polygon.
 * See https://en.wikipedia.org/wiki/Centroid#Of_a_polygon.
 * @param points The points of the polygon
 * @returns The centroid of the polygon
 */
export function polygonCentroid(points: Point[] | number[]): Point;

/**
 * Test whether the circle given by the center and radius intersects the path (open or closed).
 * @param points The points of the path
 * @param close If true, the edge from the last to the first point is tested
 * @param center The center of the circle
 * @param radius The radius of the circle
 * @returns Does the circle intersect the path?
 */
export function pathCircleIntersects(
    points: Point[] | number[],
    close: boolean,
    center: Point,
    radius: number,
): boolean;

/**
 * Test whether two circles (with position and radius) intersect.
 * @param x0 x center coordinate of circle A.
 * @param y0 y center coordinate of circle A.
 * @param r0 radius of circle A.
 * @param x1 x center coordinate of circle B.
 * @param y1 y center coordinate of circle B.
 * @param r1 radius of circle B.
 * @returns True if the two circles intersect, false otherwise.
 */
export function circleCircleIntersects(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): boolean;

declare global {
    interface LineIntersection {
        /** The x-coordinate of intersection */
        x: number;
        /** The y-coordinate of intersection */
        y: number;
        /** The vector distance from A to B on segment AB */
        t0: number;
        /** The vector distance from C to D on segment CD */
        t1: Maybe<number>;
    }

    interface LineCircleIntersection {
        /** Is point A inside the circle? */
        aInside: boolean;
        /** Is point B inside the circle? */
        bInside: boolean;
        /** Is the segment AB contained within the circle? */
        contained: boolean;
        /** Is the segment AB fully outside the circle? */
        outside: boolean;
        /** Is the segment AB tangent to the circle? */
        tangent: boolean;
        /** Intersection points: zero, one, or two */
        intersections: Point[];
    }
}