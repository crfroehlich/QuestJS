export declare const saveLoad: {
    decode(hash: any, str: any): any;
    decodeArray(s: any): any;
    decodeExit(s: any): any;
    decodeNumberArray(s: any): any;
    decodeString(s: any): any;
    deleteGame(filename: any): void;
    dirGame(): void;
    encode(key: any, value: any): string;
    encodeArray(ary: any): any;
    encodeNumberArray(ary: any): any;
    encodeString(s: any): any;
    getHeader(s: any): {
        comment: any;
        timestamp: any;
        title: any;
        version: any;
    };
    getName(filename: any): string;
    getSaveBody(): string;
    getSaveHeader(comment: any): string;
    getSummary(filename: any): any;
    loadGame(filename: any, contents: any): void;
    loadGameAsFile(): void;
    loadGameFromLS(filename: any): void;
    loadTheWorld(s: any, removeHeader: any): void;
    lsTest(): boolean;
    replacements: {
        escaped: string;
        unescaped: string;
    }[];
    saveGame(filename: any, overwrite: any): boolean;
    saveGameAsFile(filename: any): boolean;
    saveTheWorld(comment: any): any;
    setFromArray(obj: any, arr: any): void;
    setLoadString(s: any): void;
    testExistsGame(filename: any): boolean;
    transcript: boolean;
    transcriptAppend(data: any): void;
    transcriptClear(data: any): void;
    transcriptEnd(): void;
    transcriptExists(data: any): boolean;
    transcriptName: string;
    transcriptShow(): boolean;
    transcriptStart(): void;
    transcriptWalk(): void;
    transcriptWrite(html: any): void;
};
//# sourceMappingURL=_saveload.d.ts.map