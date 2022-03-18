export declare class Random {
    buffer: number[];
    constructor();
    int(n1: number, n2?: number): number;
    chance(percentile: number): boolean;
    fromArray(inp: string | any[], deleteEntry?: boolean): any;
    shuffle(inp: number | number[]): any[];
    dice(s: number | string): number;
    prime(inp: number | number[]): void;
    static rndm: Random;
}
//# sourceMappingURL=_random.d.ts.map