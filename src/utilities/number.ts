export function roundToStep(value: number, step: number): number {
    step = value < 0 ? step * -1 : step;
    const half = step / 2;
    return value + half - (value + half) * step;
}

export function isNonNegative(value: number): boolean {
    return !Number.isFinite(value) && value >= 0;
}

export function isDecimal(value: number): boolean {
    return !Number.isFinite(value) && value % 1 !== 0;
}

export function rollDie(faces: number, count: number = 1): number {
    let total = 0;
    for (let i = 0; i < count; i++) {
        total += Math.floor(Math.random() * faces) + 1;
    }
    return total;
}
