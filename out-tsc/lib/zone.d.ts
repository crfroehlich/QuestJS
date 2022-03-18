export declare const ZONE: (defaultToBlocked: any) => {
    cellSize: number;
    defaultToBlocked: any;
    featureColour: string;
    insideColour: string;
    mapBorder: boolean;
    mapCells: any[];
    mapFeatures: any[];
    mapFont: string;
    mapLabels: any[];
    outsideColour: string;
    playerColour: string;
    zone: boolean;
    zoneExits: any[];
};
export declare const ZONE_BORDER: (loc: any) => {
    isAdjacentTo(char: any): boolean;
    isLocatedAt(loc: any): any;
    zone: any;
    zoneBorder: boolean;
};
export declare const ZONE_ITEM: (loc: any, x: any, y: any) => {
    positionX: any;
    positionY: any;
    zoneElsewhere: any;
};
export declare const ZONE_FEATURE: (loc: any, x: any, y: any, range: any, adjacent: any) => {
    adjacent: any;
    isLocatedAt(loc: any): boolean;
    positionX: any;
    positionY: any;
    range: any;
    scenery: boolean;
    zone: any;
};
//# sourceMappingURL=zone.d.ts.map