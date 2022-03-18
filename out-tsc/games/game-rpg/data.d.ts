declare const elementals: {
    desc: string;
    level: number;
    name: string;
}[];
declare const imported: any[];
declare const monsters: ({
    desc: string;
    instances: {
        desc: string;
        name: string;
    }[];
    name: string;
    specialAttacks: ({
        attackdesc: string;
        canberusted: boolean;
        name: string;
        mustmatch?: undefined;
        onsuccessfulattack?: undefined;
    } | {
        attackdesc: string;
        canberusted: boolean;
        mustmatch: string;
        name: string;
        onsuccessfulattack?: undefined;
    } | {
        attackdesc: string;
        canberusted: boolean;
        mustmatch: string;
        name: string;
        onsuccessfulattack: {
            text: string;
            type: string;
        };
    })[];
    template: any;
    treasureChance: number;
} | {
    desc: string;
    instances: {
        desc: string;
        name: string;
    }[];
    name: string;
    template: any;
    specialAttacks?: undefined;
    treasureChance?: undefined;
} | {
    instances: {
        desc: string;
        name: string;
    }[];
    name: string;
    template: any;
    desc?: undefined;
    specialAttacks?: undefined;
    treasureChance?: undefined;
} | {
    instances: {
        desc: string;
        name: string;
    }[];
    name: string;
    specialAttacks: ({
        alias: string;
        attackdesc: string;
        damagedicenumber: {
            text: string;
            type: string;
        };
        element: {
            text: string;
            type: string;
        };
        name: string;
        nonweapon: any[];
        damagedicesides?: undefined;
        attackplayer?: undefined;
        destroyonsale?: undefined;
        level?: undefined;
    } | {
        alias: string;
        attackdesc: string;
        damagedicesides: {
            text: string;
            type: string;
        };
        element: {
            text: string;
            type: string;
        };
        name: string;
        nonweapon: any[];
        damagedicenumber?: undefined;
        attackplayer?: undefined;
        destroyonsale?: undefined;
        level?: undefined;
    } | {
        alias: string;
        attackdesc: string;
        damagedicesides: {
            text: string;
            type: string;
        };
        name: string;
        damagedicenumber?: undefined;
        element?: undefined;
        nonweapon?: undefined;
        attackplayer?: undefined;
        destroyonsale?: undefined;
        level?: undefined;
    } | {
        alias: string;
        attackplayer: {
            text: string;
            type: string;
        };
        damagedicesides: {
            text: string;
            type: string;
        };
        destroyonsale: any[];
        level: {
            text: string;
            type: string;
        };
        name: string;
        nonweapon: any[];
        attackdesc?: undefined;
        damagedicenumber?: undefined;
        element?: undefined;
    })[];
    template: any;
    treasureChance: number;
    desc?: undefined;
} | {
    instances: {
        desc: string;
        name: string;
    }[];
    name: string;
    specialAttacks: ({
        alias: string;
        attackdesc: string;
        canberusted: {
            text: string;
            type: string;
        };
        damagedicenumber: {
            text: string;
            type: string;
        };
        damagedicesides: {
            text: string;
            type: string;
        };
        name: string;
        nonweapon: any[];
        attackbonus?: undefined;
        level?: undefined;
        element?: undefined;
    } | {
        alias: string;
        attackbonus: {
            text: string;
            type: string;
        };
        attackdesc: string;
        canberusted: boolean;
        damagedicesides: {
            text: string;
            type: string;
        };
        level: {
            text: string;
            type: string;
        };
        name: string;
        nonweapon: any[];
        damagedicenumber?: undefined;
        element?: undefined;
    } | {
        alias: string;
        attackdesc: string;
        canberusted: boolean;
        damagedicenumber: {
            text: string;
            type: string;
        };
        damagedicesides: {
            text: string;
            type: string;
        };
        element: {
            text: string;
            type: string;
        };
        level: {
            text: string;
            type: string;
        };
        name: string;
        nonweapon: any[];
        attackbonus?: undefined;
    })[];
    template: any;
    desc?: undefined;
    treasureChance?: undefined;
})[];
//# sourceMappingURL=data.d.ts.map