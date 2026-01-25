import { Point } from "#common/_types.mjs";

export function distanceToPoint(a: Point, b: Point): number {
    return Math.hypot(b.x - a.x, b.y - a.y);
}

export function subtractPoint(a: Point, b: Point): Point {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
    };
}

export function addPoint(a: Point, b: Point): Point {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}

export function multiplyPointBy(point: Point, value: number): Point {
    return {
        x: point.x * value,
        y: point.y * value,
    };
}

export function dividePointBy({ x, y }: Point, value: number): Point {
    return {
        x: x / value,
        y: y / value,
    };
}

export function addToPoint({ x, y }: Point, value: number): Point {
    return {
        x: x + value,
        y: y + value,
    };
}

export function subtractFromPoint({ x, y }: Point, value: number): Point {
    return {
        x: x - value,
        y: y - value,
    };
}

export function calculateMidPoint(a: Point, b: Point): Point {
    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
    };
}

export function drawRectangleMask(x: number, y: number, width: number, height: number, radius?: number): PIXI.Graphics {
    const mask = new PIXI.Graphics();

    mask.beginFill(0x555555);

    if (radius) mask.drawRoundedRect(x, y, width, height, radius);
    else mask.drawRect(x, y, width, height);

    mask.endFill();

    return mask;
}

export function drawCircleMask(x: number, y: number, radius: number): PIXI.Graphics {
    const mask = new PIXI.Graphics();

    mask.beginFill(0x555555);
    mask.drawCircle(x, y, radius);
    mask.endFill();

    return mask;
}
