// ts-error-fixed ts-migrate(2339) FIXME: Property 'isRoom' does not exist on type '{}'.
Quest.Parser.parser.isRoom = function (o) {
    return o.room;
};
// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('GoToDest', {
    npcCmd: true,
    objects: [
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'isRoom' does not exist on type '{}'.
        { scope: Quest.Parser.parser.isRoom },
    ],
    regex: /^(?:go to|go) (.+)$/,
    script(objects) {
        const room = objects[0][0];
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (room === Quest.World.currentLocation)
            return Quest.IO.failedmsg('As if by magic, you are suddenly... where you already were.');
        if (!room.room)
            return Quest.IO.failedmsg('{pv:item:be:true} not a destination.', { item: room });
        for (const ex of Quest.World.currentLocation.dests) {
            if (room.name === ex.name) {
                return ex.use(Quest.World.player, ex) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
            }
        }
        return Quest.IO.failedmsg('{pv:item:be:true} not a destination you can get to from here.', { item: room });
    },
}));
// ts-error-fixed ts-migrate(2339) FIXME: Property 'msgInputText' does not exist on type '{ ... Remove this comment to see the full error message
Quest.IO.io.msgInputText = function (s) {
    if (!Quest.Settings.settings.cmdEcho || s === '')
        return;
    // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#output').innerHTML += `<p id="n${Quest.IO.io.nextid}" class="input-text">&gt; ${s.toUpperCase()}</p>`;
    Quest.IO.io.nextid++;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'speak' does not exist on type '{ nextid:... Remove this comment to see the full error message
    if (Quest.IO.io.spoken)
        Quest.IO.io.speak(s, true);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'transcript' does not exist on type '{ ne... Remove this comment to see the full error message
    if (Quest.IO.io.transcript)
        Quest.IO.io.scriptAppend({ cssClass: 'input', text: s });
};
const roster = {
    data: [
        {
            alias: 'Helm', desc: 'The officer at the helm has responsibility for piloting the ship, and needs a good skill at navigation.', name: 'helm', skill: 'navigation',
        },
        {
            alias: 'Chief Engineer', desc: 'The chief engineer has the job of ensuring all systems on the ship are running smoothly, working with the 28 ratings who make up most of the crew.', name: 'engineering', skill: 'engineering',
        },
        {
            alias: 'Science Officer', desc: 'The science officer leads a team of twelve, who are trained in various disciplines. He or she will report findings and opinions to the captains, as appropriate.', name: 'science', skill: 'science',
        },
        {
            alias: 'Armsman', desc: 'The armsman is responsible for targeting and firing the ship\'s weapons in the event of combat, which requires skill with the weapon as well as the ability to remain calm under pressure. The office will be in command of eight crewman who are responsible for maintenance of the weapon systems (so knowledge of engineering is of limited use). The officer is also in charge of the marines and shipboard security.', name: 'armsman', skill: 'weapons',
        },
    ],
    getCrew() {
        const l = [];
        for (const el of roster.data) {
            if (roster.hasOfficer(el.name))
                l.push(roster.getOfficer(el.name));
        }
        return l;
    },
    // get the officer object assigned to the role or null if not set
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    getOfficer(pos) {
        return this.hasOfficer(pos) ? Quest.World.w[Quest.World.w.ship[pos]] : null;
    },
    // get the data for the given role
    getRole(pos) {
        return roster.data.find((el) => el.name === pos);
    },
    // get a list of role names for the officer
    getRoles(officer) {
        const list = roster.data.map((el) => el.name);
        if (officer === undefined)
            return list;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
        if (officer === true)
            return list.filter((el) => Quest.World.w.ship[el] !== undefined);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
        if (officer === false)
            return list.filter((el) => Quest.World.w.ship[el] === undefined);
        if (typeof officer !== 'string')
            officer = officer.name;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
        return list.filter((el) => Quest.World.w.ship[el] === officer);
    },
    getRoster() {
        let s = 'Ship officer roster:';
        for (const el of roster.data) {
            if (roster.hasOfficer(el.name)) {
                s += `|${el.alias}: ${roster.getOfficer(el.name).alias}`;
            }
            else {
                s += `|${el.alias}: no assignment`;
            }
        }
        return s;
    },
    // is an officer assigned to the role?
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    hasOfficer(pos) {
        return Quest.World.w.ship[pos] !== undefined;
    },
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective('role', (arr, params) => {
    const pos = arr[0];
    const npc = roster.getOfficer(pos);
    if (!npc) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg(`TP Failed for role :${arr.join(':')}`);
        return '';
    }
    const s = npc[arr[1]];
    return arr[2] === 'true' ? Quest.Utilities.sentenceCase(s) : s;
});
// ts-error-fixed ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective('sir', (arr, params) => (Quest.World.player.callmemaam ? "ma'am" : 'sir'));
// ts-error-fixed ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective('Sir', (arr, params) => (Quest.World.player.callmemaam ? "Ma'am" : 'Sir'));
// ts-error-fixed ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective('time', (arr, params) => 
// ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
`Stardate ${Quest.World.w.ship.getDateTime(arr[0])}`);
const newVerbs = [
    { name: 'Encyclopedia' },
    { name: 'Press button' },
    { name: 'Assign crew' },
    { name: 'Crew roster' },
    { name: 'Missions' },
    { name: 'Contact planet' },
    { name: 'Star database' },
];
for (const el of newVerbs) {
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    Quest.Commands.commands.unshift(new Quest.Command.Cmd(el.name, {
        attName: Quest.Utilities.verbify(el.name),
        defmsg: "{pv:item:'be:true} not something you can do that with.",
        objects: [
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'scopeHeld' does not exist on type '{ nam... Remove this comment to see the full error message
            { scope: el.scopeHeld ? Quest.Parser.parser.isHeld : Quest.Parser.parser.isHere },
        ],
        regex: new RegExp(`^${el.name.toLowerCase()} (.+)$`),
    }));
}
const newCmds = [
    {
        name: 'Intro1',
        script() {
            Quest.IO.showDiag('Welcome to your new ship, captain!', `<br/>${this.text.replace(/\|/g, '<br/><br/>')}`, 'Okay');
            return Quest.World.world.SUCCESS;
        },
        text: 'All interactions in this game (except some explanatory links like this) are through the panel to the left. You can select different areas of the ship to visit, and from the shuttle bay may also be able to go off ship, depending on whether there is anything near by. You can also talk to people - giving your crew instructions is a big part of the game.|Your PAGE is also there; this gives you access to the ship computer. Use this is check the missions, organise your bridge crew or view the encyclopedia.',
    },
    {
        name: 'Intro2',
        script() {
            Quest.IO.showDiag('Getting started', `<br/>${this.text.replace(/\|/g, '<br/><br/>')}`, 'Okay');
            return Quest.World.world.SUCCESS;
        },
        text: 'Your first task is to assemble your crew by assigning candidates to posts on the bridge using your PAGE. Look at the mission on your PAGE for the current assignments and a quick overview of the candidates. You will need a helmsman, but other posts can be left empty if you wish. You can assign officers to multiple roles, but they will tend to be less effective in both roles. Some candidates are better suited to a certain roles than others, but it is up to you; if you want to appoint people to posts that will be poor at, go for it! If you change your mind - perhaps after talking to the candidate - you can unassign the role for the current officer, and then assign it to your new choice.|Once you are happy with your crew, ask the helmsman to lay in a course for sector 7 Iota. Note that once you set off for Sector 7 Iota you cannot change assignments.|Once you arrive there, you will get a new list of missions - you will need to prioritize. It may not be possible to  do everything, and the situation could change as time passes. In most cases it takes about a day to travel between star systems in the sector, but some systems are further out and will take longer; this will be noted in the mission. Obviously it will take a similar time to get back to a star system in the central cluster.',
    },
    {
        name: 'Intro3',
        script() {
            Quest.IO.showDiag('Additional notes', `<br/>${this.text.replace(/\|/g, '<br/><br/>')}`, 'Okay');
            return Quest.World.world.SUCCESS;
        },
        text: 'If your screen is wide enough, you will see a star map on the right, but you do not need it to play the game. When you arrive in sector 7 Iota you will be able to toggle between  map of the stars in the sector and the star system you are currently at.|It is possible to die; bad decisions or just bad luck may lead to a bad ending; you may want to save often, and think about how you could do better next time.|Any similarity to a certain series from the sixties... and several other decades... is entirely coincidental. Honest.',
    },
];
for (const el of newCmds) {
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    Quest.Commands.commands.unshift(new Quest.Command.Cmd(el.name, {
        objects: [],
        regex: new RegExp(`^${el.name.toLowerCase()}$`),
        script: el.script,
        text: el.text,
    }));
}
// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('JumpStart', {
    objects: [],
    regex: /start/,
    script() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
        Quest.World.w.ship.helm = 'farrington_moss';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
        Quest.World.w.ship.science = 'lashirr_hrong';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
        Quest.World.w.ship.engineering = 'milton_keynes';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
        Quest.World.w.ship.armsman = 'dakota_north';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'farrington_moss' does not exist on type ... Remove this comment to see the full error message
        Quest.World.w.farrington_moss.loc = 'bridge';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'lashirr_hrong' does not exist on type '{... Remove this comment to see the full error message
        Quest.World.w.lashirr_hrong.loc = 'bridge';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'milton_keynes' does not exist on type '{... Remove this comment to see the full error message
        Quest.World.w.milton_keynes.loc = 'bridge';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'dakota_north' does not exist on type '{}... Remove this comment to see the full error message
        Quest.World.w.dakota_north.loc = 'bridge';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'helmsman_go_to_7iota' does not exist on ... Remove this comment to see the full error message
        Quest.World.w.helmsman_go_to_7iota.hide();
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'helmsman_go_to_star' does not exist on t... Remove this comment to see the full error message
        Quest.World.w.helmsman_go_to_star.show();
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'helmsman_go_to_location' does not exist ... Remove this comment to see the full error message
        Quest.World.w.helmsman_go_to_location.show();
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'helmsman_go_to_7iota' does not exist on ... Remove this comment to see the full error message
        Quest.World.w.helmsman_go_to_7iota.script();
        // stars.arriveAtSector()
        return Quest.World.world.SUCCESS;
    },
}));
//# sourceMappingURL=code.js.map