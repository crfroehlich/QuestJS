// mission state is saved on the player as a number prefixed with mission_
// if not defined, it is not yet given
// if over 1000 it is completed or otherwise can no longer be pursued
const missions = {
    add(data) {
        data.diag = function () {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHtml' does not exist on ty... Remove this comment to see the full error message
            Quest.Settings.settings.startingDialogHtml = `<p>Name: <i>${this.alias}</i></p>`;
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHtml' does not exist on ty... Remove this comment to see the full error message
            Quest.Settings.settings.startingDialogHtml += '<p>Brief:</p>';
            const s = (typeof this.brief === 'function') ? this.brief() : this.brief;
            const ary = s.split('|');
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHtml' does not exist on ty... Remove this comment to see the full error message
            for (const el of ary)
                Quest.Settings.settings.startingDialogHtml += `<p><i>${el}</i></p>`;
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'setUpDialog' does not exist on type '{ p... Remove this comment to see the full error message
            Quest.Settings.settings.setUpDialog();
        };
        data.properNoun = true;
        // ts-error-fixed ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        this.data.push(data);
        if (data.star)
            stars.add(data.star);
        if (data.stars) {
            for (const star of data.stars)
                stars.add(star);
        }
        if (data.encyc) {
            // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            for (const key in data.encyc)
                encyclopedia[key] = data.encyc[key];
        }
    },
    data: [],
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'alias' does not exist on type 'never'.
    find(alias) {
        return this.data.find((el) => el.alias.toLowerCase() === alias.toLowerCase());
    },
    getList() {
        const l = [];
        for (const el of this.data) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
            if (this.isActive(el.name))
                l.push(el);
        }
        return l;
    },
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
    getMission(name) {
        return this.data.find((el) => el.name === name);
    },
    getState(name) {
        return Quest.World.player[`mission_${name}`];
    },
    getStatus(name) {
        // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        return this.isActive(name) ? this.getMission(name).steps[this.getState(name) - 1].alias : 'n/a';
    },
    init() {
        for (const m of this.data) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'start' does not exist on type 'never'.
            if (m.start)
                this.start(m.name);
        }
    },
    isActive(name) {
        const state = this.getState(name);
        return state !== undefined && state < 1000;
    },
    start(name) {
        const mission = this.getMission(name);
        Quest.World.player[`mission_${name}`] = 1;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
        Quest.World.player[`missionStart_${name}`] = Quest.World.w.ship.dateTime;
    },
};
/*
A mission's attributes:

name           string              required  Single word identifier
alias          string              required  Title
start          Boolean             optional  If true, this mission is there from arrival
brief          string              required  A description of what is required
steps          array of steps      required  Details each step of the mission (in progress)
events         array of events     required  Details each step of the mission (in progress)
star           star                optional  A single star to be added to support this mission
stars          array of stars      optional  A set of stars to be added to support this mission
encyc          array of entries    optional  A set of entries to be added to support this mission

*/
missions.add({
    alias: 'Assemble bridge crew',
    brief() {
        let s = 'Assemble your officers. Fleet command has some suggestions, but you should check each record and decide for yourself.';
        for (const role of roster.data) {
            const npc = roster.getOfficer(role.name);
            s += `|<b>${role.alias}:</b> ${npc ? npc.alias : '--'}`;
        }
        s += '|<hr/>';
        for (const el of getCandidates()) {
            s += `|<b>${el.alias}:</b> ${el.summary}`;
        }
        return s;
    },
    name: 'assemble_crew',
});
missions.add({
    alias: 'Head to sector 7 iota',
    brief: 'Proceed to sector 7 Iota and report to Commander Nagoshima at Star Base 142. Further details will provided on arrival.',
    name: 'sector_7_iota',
});
missions.add({
    alias: 'Asteroid heading for Chloris V',
    brief: 'An asteroid has been detecting heading for Chloris V. It will impact in ten standard days. The planet supports a small agricultural community (population 243) and a science facility (population 9). Neither have the facilities to get off-planet, let alone deflect the asteroid.|Your mission is, ideally, to deflect the asteroid, and if that proves impossible to evacuate the planet. Evacuees should be brought here to Star Base 142.|Chloris is three days from the main cluster at warp 6.',
    encyc: {
        Asteroid: 'Asteroids are basically rocks in space. Occasionally they fall into the gravity well of a planet. Smaller ones just burn up in the atmosphere, larger ones are catastrophic - for example the asteroid that wiped out the dinosaurs 66 million years ago.',
    },
    events: [],
    // If you go early you can deflect the asteroid. A good science office will allow you to do it a bit later. Otherwise evaculate. And that means infestation?
    name: 'asteroid',
    star: {
        alias: 'Chloris',
        colour: 'orange',
        locations: [
            {
                alias: 'Chloris V',
                desc: 'A desolate planet that barely supports human life. At last count, the population was 262.',
                name: 'chloris5',
            },
        ],
        name: 'chloris',
        sector: '7 Iota',
        size: 6,
        x: 80,
        y: 40,
    },
    start: true,
    steps: [
        {
            alias: 'Get to Chloris',
            state: 2,
        },
    ],
});
missions.add({
    alias: 'Deploy probes on Calufrax',
    brief: 'The planet Calufrax has been noted as a possibility for terro-forming, but further data is required.|Deploy six multi-probes on the surface at appropriate positions. Deploy a satellite for further data. The preliminary data should be retrieved after a minimum of 7 days, but the probes and satellite should be left in place to collect further data.|Hardware to be collected from the star port on Ecros.',
    // Yeoman should point out they need to do the pick if player tries to go there first.
    // Better science allows better deployment - or even an initial scan that shows it is no good, too unstable or intelligent life?
    name: 'deploy_probes',
    star: {
        alias: 'alpha-Stego',
        colour: 'white',
        locations: [
            {
                alias: 'Calufrax',
                desc: 'Flagged as suitable for terraforming. No other data.',
                name: 'calufrax',
            },
        ],
        name: 'alphastego',
        sector: '7 Iota',
        size: 6,
        x: 190,
        y: 340,
    },
    start: true,
    steps: [
        {
            name: 'Pick up probes',
            state: 2,
        },
    ],
});
missions.add({
    // The colony has awoken a sleeping star beast. All the personal have joined its hive-mind.
    alias: 'Investigate Mining Colony',
    brief: 'There is a considerable asteroid mining operation orbiting Proxima Major. The last supply ship was due back four days ago, and attempts to raise the colony on subspace have been unsuccessful.|Investigate the colony, and take action as appropriate. Be careful of possible Brakk involvement.|The asteroids are particular rich in trans-uranics, and it is important that the mining operation is running as soon as possible.',
    name: 'mining_colony',
    star: {
        alias: 'Proxima Major',
        colour: 'red',
        locations: [
            {
                alias: 'Aastoid 326',
                desc: '',
                name: 'astoid326',
            },
        ],
        name: 'proxima',
        sector: '7 Iota',
        size: 9,
        x: 240,
        y: 130,
    },
    start: true,
    steps: [
        {
            name: 'Go to Proxima Major',
            state: 2,
        },
    ],
});
missions.add({
    alias: 'The Magestic Skies',
    brief: 'The Majestic Skies is a starship offering leisure cruises. Occasional cruises include Logopolis, the only city in Sector 7 Iota that has any interest to tourists, and the blue crystal caves on Metabelis III. It was supposed to arrive at Logopolis, on Olympus, two days ago, having departed Metabelis III four days earlier, but never appeared.|Locate the Majestic Skies, and take appropriate action. Use discretion as the tourist industry, meager though it is, provides important income.',
    // The ship picked up some spiders, and they are controlling the crew and passengers. Possibly the spiders put them in a state of ecstacy, and they are all happy like that. Do you rescue them?
    name: 'cruise_ship',
    star: {
        alias: 'Metabelis',
        colour: 'white',
        locations: [
            {
                alias: 'Metabelis III',
                desc: 'The third planet of the Metabelis is a pleasant Quest.World.world, know for it blue crystal caves, said to have mind-enhancing properties. This has allowed some minor tourism to develop, though the colony is mostly agricultural and mining.',
                name: 'metabelis3',
            },
        ],
        name: 'metabelis',
        sector: '7 Iota',
        size: 3,
        x: 140,
        y: 180,
    },
    start: true,
    steps: [
        {
            name: 'Locate the Magestic Skies',
            state: 2,
        },
    ],
});
missions.add({
    alias: 'Protect the Dogged Plodder',
    brief: 'The cargo vessel Dogged Plodder is due to head from Morestra to Star Base 142 in seven days time. It will be transporting high value chips, and is almost certain to be targeted by pirates.|The Dogged Plodder must be protected for the entirety of its journey.|The vessel is only capable of warp 3, so the journey will take four days.',
    // Obviously pirates will attack. When they flee, do you follow to get to their base? A good science officer might be able to work out where the base is is anyway.
    name: 'protect_ship',
    start: true,
    steps: [
        {
            name: 'Go to Morestra',
            state: 2,
        },
    ],
});
missions.add({
    alias: 'Clandestine attack',
    brief: 'A Brakk vessel will pass through the sector in twelve days. It would be unfortunate if it fell victim to the numerous pirates known to operate in the area.|Obviously the Admiralty cannot support any attack on the vessel.',
    // Need to check timing to make sure this is doable with other priorities as it will require travelling.
    // Disguising the ship would be a good idea. A good armsman could suggest it. A good engineer or science could implement it.
    name: 'piracy',
    start: true,
    steps: [
        {
            name: '',
            state: 2,
        },
    ],
});
missions.add({
    alias: 'Medical emergency',
    brief: 'The colony on Peladon has sent an urgent request for medical help, following an outbreak of some highly contagious infection. The exact nature of the infection is unclear, as no one on the colony has been able to perform any tests - despte there being two doctors in the colony.|Investigate the situation and provide such assistance as you can. It may be necessary to quanrantine the planet, and the Star Quest depending on the risk.',
    // It may not be an infection at all, but an attack (cybermats!)
    name: 'medical_supplies',
    steps: [
        {
            name: '',
            state: 2,
        },
    ],
});
missions.add({
    alias: 'Bandraginus V Diplomacy',
    brief: 'Bandraginus V is an independant planet that has traditionally kept itself apart from the rest of mankind. Recently a political faction has appeared that is interested in uniting. As yet they are in the minority, but they are growing.|Meet the leaders of the United Humanity Party, and see what can be done to help them.',
    // Need to check timing to make sure this is doable with other priorities as it will require travelling.
    // Disguising the ship would be a good idea. A good armsman could suggest it. A good engineer or science could implement it.
    name: 'diplomacy',
    steps: [
        {
            name: '',
            state: 2,
        },
    ],
});
//# sourceMappingURL=missions.js.map