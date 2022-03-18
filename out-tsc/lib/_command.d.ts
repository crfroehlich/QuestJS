import { ICommand } from '../types/iquest';
export declare class Cmd {
    _test: (s: any) => boolean;
    _testNot: (s: any) => boolean;
    all: boolean;
    antiRegexes: RegExp[];
    attName: string;
    default: (options: any) => void;
    error: any;
    matchItems: (s: any) => any;
    mod: any;
    name: any;
    noTurnscripts?: boolean;
    objects: any[];
    objectTexts?: any[];
    regex: any;
    regexes?: RegExp[];
    rules: any[];
    score: any;
    script: (objects: any) => number;
    scriptWith: (objects: any) => number;
    setError: (score: any, msg: any) => void;
    tmp?: Partial<Cmd>;
    withScript: any;
    [key: string]: any;
    constructor(name: any, hash: any);
    defmsg(defmsg: any, options: any): void;
    noobjecterror(error_s: any, i: number): any;
    processCommand(options: {
        char: any;
        item: any;
        multiple: any;
        secondItem: any;
        verb: any;
    }): number;
}
export declare function NpcCmd(this: any, name: any, hash: any): void;
export declare function ExitCmd(this: any, name: any, dir: any, hash: any): void;
export declare function NpcExitCmd(this: any, name: any, dir: any, hash: any): void;
export declare function initCommands(): void;
export declare function extractChar(cmd: any, objects: any): any;
export declare function findCmd(name: any): import("../types/iquest").ICommandElement;
export declare function testCmd(name: any, s: any): void;
export declare const cmdRules: {
    canTalkTo(cmd: any, options: any): any;
    isHeld(cmd: any, options: any): any;
    isHeldNotWorn(cmd: any, options: any): any;
    isHere(cmd: any, options: any): any;
    isHereAlready(cmd: any, options: any): any;
    isPresent(cmd: any, options: any): any;
    isPresentOrContained(cmd: any, options: any): any;
    isWorn(cmd: any, options: any): any;
    testManipulate(cmd: any, options: any): boolean;
    testPosture(cmd: any, options: any): boolean;
};
export declare const Command: ICommand;
//# sourceMappingURL=_command.d.ts.map