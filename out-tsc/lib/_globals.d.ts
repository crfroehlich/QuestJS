declare type TState = {
    [key: string]: any;
};
export declare const globals: TState;
export declare const getGlobal: <T>(name: string) => T;
export declare const getGlobals: () => TState;
export declare const setGlobal: (data: TState) => void;
export {};
//# sourceMappingURL=_globals.d.ts.map