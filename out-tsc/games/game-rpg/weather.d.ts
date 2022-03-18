declare const weatherTypes: {};
declare class Weather {
    getNext: any;
    name: any;
    ongoing: any;
    wetness: any;
    constructor(name: any, data: any);
    turn(): void;
    outside(includeVisible: any): boolean;
    report(s: any, options: any): boolean;
    getCloudCover(): number;
}
//# sourceMappingURL=weather.d.ts.map