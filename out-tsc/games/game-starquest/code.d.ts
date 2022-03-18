declare const roster: {
    data: {
        alias: string;
        desc: string;
        name: string;
        skill: string;
    }[];
    getCrew(): any[];
    getOfficer(pos: any): any;
    getRole(pos: any): {
        alias: string;
        desc: string;
        name: string;
        skill: string;
    };
    getRoles(officer: any): string[];
    getRoster(): string;
    hasOfficer(pos: any): boolean;
};
declare const newVerbs: {
    name: string;
}[];
declare const newCmds: {
    name: string;
    script(): any;
    text: string;
}[];
//# sourceMappingURL=code.d.ts.map