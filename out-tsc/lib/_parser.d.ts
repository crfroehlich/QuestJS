import { IParser } from '../types/iquest';
export declare const parser: {
    BAD_SPECIAL: number;
    DISALLOWED_MULTIPLE: number;
    NONE_FOR_ALL: number;
    NO_MATCH: number;
    NO_OBJECT: number;
    abort(): void;
    currentCommand: string;
    debug: boolean;
    execute(): void;
    findCommand(inputText: any): any;
    findInList(s: any, list: any, cmdParams: any): any[];
    findInScope(s: any, scopes: any, cmdParams: any): any[];
    getScope(cmdParams: any): any[];
    getScopes(cmdParams: any): any[][];
    inputTexts: any[];
    inspect(): void;
    isContained(item: any): boolean;
    isForSale(item: any): any;
    isHeld(item: any): any;
    isHeldByNpc(item: any): boolean;
    isHeldNotWorn(item: any): boolean;
    isHere(item: any): any;
    isHereOrContained(item: any): boolean;
    isHereOrLocationContained(item: any): boolean;
    isInWorld(item: any): boolean;
    isLocationContained(item: any): boolean;
    isNpcAndHere(item: any): any;
    isNpcOrHere(item: any): any;
    isPresent(item: any): any;
    isPresentOrMe(item: any): any;
    isReachable(item: any): any;
    isUnconstructed(item: any): boolean;
    isVisible(item: any): any;
    isWorn(item: any): any;
    isWornByNpc(item: any): boolean;
    itemSetup(item: any): void;
    keepTogether(s: any): any;
    matchToName(s: any, scopes: any, cmdParams: any, objectWordList: any): any;
    matchToNames(s: any, scopes: any, cmdParams: any, res: any): void;
    msg(...ary: any[]): void;
    override: (_p: any) => void;
    overrideWith(fn: any): void;
    parse(inputText: any): void;
    parseSingle(inputText: any): void;
    pronouns: {};
    scopeFromScope(fn: any, options: any): any[];
    scopeFromWorld(fn: any, options: any): any[];
    scoreObjectMatch(s: any, item: any, cmdParams: any): number;
    specialText: {
        fluid: {
            error(text: any): any;
            exec(text: any): any;
        };
        ignore: {
            error(text: any): boolean;
            exec(text: any): boolean;
        };
        number: {
            error(text: any): boolean;
            exec(text: any): number;
        };
        text: {
            error(text: any): boolean;
            exec(text: any): any;
        };
    };
};
export declare const Parser: IParser;
//# sourceMappingURL=_parser.d.ts.map