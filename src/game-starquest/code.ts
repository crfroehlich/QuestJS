"use strict"





// @ts-expect-error ts-migrate(2339) FIXME: Property 'isRoom' does not exist on type '{}'.
parser.isRoom = function (o: any) { return o.room }

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('GoToDest', {
  npcCmd: true,
  regex: /^(?:go to|go) (.+)$/,
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isRoom' does not exist on type '{}'.
    { scope: parser.isRoom }
  ],
  script: function (objects: any) {
    const room = objects[0][0]
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (room === currentLocation) return failedmsg("As if by magic, you are suddenly... where you already were.")
    if (!room.room) return failedmsg("{pv:item:be:true} not a destination.", { item: room })
    for (const ex of currentLocation.dests) {
      if (room.name === ex.name) {
        return ex.use(player, ex) ? world.SUCCESS : world.FAILED
      }
    }
    return failedmsg("{pv:item:be:true} not a destination you can get to from here.", { item: room })
  },
}))






// @ts-expect-error ts-migrate(2339) FIXME: Property 'msgInputText' does not exist on type '{ ... Remove this comment to see the full error message
io.msgInputText = function (s: any) {
  if (!Quest.Settings.settings.cmdEcho || s === '') return
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector("#output").innerHTML += '<p id="n' + io.nextid + '" class="input-text">&gt; ' + s.toUpperCase() + "</p>"
  io.nextid++
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'speak' does not exist on type '{ nextid:... Remove this comment to see the full error message
  if (io.spoken) io.speak(s, true)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'transcript' does not exist on type '{ ne... Remove this comment to see the full error message
  if (io.transcript) io.scriptAppend({ cssClass: 'input', text: s })
}



const roster = {
  data: [
    { name: 'helm', alias: 'Helm', skill: 'navigation', desc: 'The officer at the helm has responsibility for piloting the ship, and needs a good skill at navigation.' },
    { name: 'engineering', alias: 'Chief Engineer', skill: 'engineering', desc: 'The chief engineer has the job of ensuring all systems on the ship are running smoothly, working with the 28 ratings who make up most of the crew.' },
    { name: 'science', alias: 'Science Officer', skill: 'science', desc: 'The science officer leads a team of twelve, who are trained in various disciplines. He or she will report findings and opinions to the captains, as appropriate.' },
    { name: 'armsman', alias: 'Armsman', skill: 'weapons', desc: 'The armsman is responsible for targeting and firing the ship\'s weapons in the event of combat, which requires skill with the weapon as well as the ability to remain calm under pressure. The office will be in command of eight crewman who are responsible for maintenance of the weapon systems (so knowledge of engineering is of limited use). The officer is also in charge of the marines and shipboard security.' },
  ],
  // get the data for the given role
  getRole: function (pos: any) { return roster.data.find(el => el.name === pos) },
  // is an officer assigned to the role?
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  hasOfficer: function (pos: any) { return w.ship[pos] !== undefined },
  // get the officer object assigned to the role or null if not set
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  getOfficer: function (pos: any) { return this.hasOfficer(pos) ? w[w.ship[pos]] : null },
  // get a list of role names for the officer
  getRoles: function (officer: any) {
    const list = roster.data.map(el => el.name)
    if (officer === undefined) return list
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    if (officer === true) return list.filter(el => w.ship[el] !== undefined)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    if (officer === false) return list.filter(el => w.ship[el] === undefined)
    if (typeof officer !== 'string') officer = officer.name
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    return list.filter(el => w.ship[el] === officer)
  },
  getRoster: function () {
    let s = 'Ship officer roster:'
    for (let el of roster.data) {
      if (roster.hasOfficer(el.name)) {
        s += '|' + el.alias + ': ' + roster.getOfficer(el.name).alias
      }
      else {
        s += '|' + el.alias + ': no assignment'
      }
    }
    return s
  },
  getCrew: function () {
    let l = []
    for (let el of roster.data) {
      if (roster.hasOfficer(el.name)) l.push(roster.getOfficer(el.name))
    }
    return l
  },
}






// @ts-expect-error ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
tp.addDirective("role", function (arr: any, params: any) {
  const pos = arr[0]
  const npc = roster.getOfficer(pos)
  if (!npc) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    errormsg("TP Failed for role :" + arr.join(':'))
    return ''
  }
  const s = npc[arr[1]]
  return arr[2] === 'true' ? Quest.Utilities.sentenceCase(s) : s
})

// @ts-expect-error ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
tp.addDirective("sir", function (arr: any, params: any) { return player.callmemaam ? "ma'am" : "sir" })
// @ts-expect-error ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
tp.addDirective("Sir", function (arr: any, params: any) { return player.callmemaam ? "Ma'am" : "Sir" })

// @ts-expect-error ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
tp.addDirective("time", function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  return "Stardate " + w.ship.getDateTime(arr[0])
})




const newVerbs = [
  { name: 'Encyclopedia' },
  { name: 'Press button' },
  { name: 'Assign crew' },
  { name: 'Crew roster' },
  { name: 'Missions' },
  { name: 'Contact planet' },
  { name: 'Star database' },
]

for (let el of newVerbs) {
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  Quest.Commands.commands.unshift(new Quest.Command.Cmd(el.name, {
    regex: new RegExp('^' + el.name.toLowerCase() + ' (.+)$'),
    attName: Quest.Utilities.verbify(el.name),
    objects: [
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'scopeHeld' does not exist on type '{ nam... Remove this comment to see the full error message
      { scope: el.scopeHeld ? parser.isHeld : parser.isHere },
    ],
    defmsg: "{pv:item:'be:true} not something you can do that with.",
  }))
}

const newCmds = [
  {
    name: 'Intro1',
    script: function () { showDiag('Welcome to your new ship, captain!', '<br/>' + this.text.replace(/\|/g, '<br/><br/>'), 'Okay'); return world.SUCCESS },
    text: "All interactions in this game (except some explanatory links like this) are through the panel to the left. You can select different areas of the ship to visit, and from the shuttle bay may also be able to go off ship, depending on whether there is anything near by. You can also talk to people - giving your crew instructions is a big part of the game.|Your PAGE is also there; this gives you access to the ship computer. Use this is check the missions, organise your bridge crew or view the encyclopedia.",
  },
  {
    name: 'Intro2',
    script: function () { showDiag('Getting started', '<br/>' + this.text.replace(/\|/g, '<br/><br/>'), 'Okay'); return world.SUCCESS },
    text: "Your first task is to assemble your crew by assigning candidates to posts on the bridge using your PAGE. Look at the mission on your PAGE for the current assignments and a quick overview of the candidates. You will need a helmsman, but other posts can be left empty if you wish. You can assign officers to multiple roles, but they will tend to be less effective in both roles. Some candidates are better suited to a certain roles than others, but it is up to you; if you want to appoint people to posts that will be poor at, go for it! If you change your mind - perhaps after talking to the candidate - you can unassign the role for the current officer, and then assign it to your new choice.|Once you are happy with your crew, ask the helmsman to lay in a course for sector 7 Iota. Note that once you set off for Sector 7 Iota you cannot change assignments.|Once you arrive there, you will get a new list of missions - you will need to prioritize. It may not be possible to  do everything, and the situation could change as time passes. In most cases it takes about a day to travel between star systems in the sector, but some systems are further out and will take longer; this will be noted in the mission. Obviously it will take a similar time to get back to a star system in the central cluster.",
  },
  {
    name: 'Intro3',
    script: function () { showDiag('Additional notes', '<br/>' + this.text.replace(/\|/g, '<br/><br/>'), 'Okay'); return world.SUCCESS },
    text: "If your screen is wide enough, you will see a star map on the right, but you do not need it to play the game. When you arrive in sector 7 Iota you will be able to toggle between  map of the stars in the sector and the star system you are currently at.|It is possible to die; bad decisions or just bad luck may lead to a bad ending; you may want to save often, and think about how you could do better next time.|Any similarity to a certain series from the sixties... and several other decades... is entirely coincidental. Honest.",
  },
]

for (let el of newCmds) {
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  Quest.Commands.commands.unshift(new Quest.Command.Cmd(el.name, {
    regex: new RegExp('^' + el.name.toLowerCase() + '$'),
    objects: [
    ],
    text: el.text,
    script: el.script,
  }))
}








// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd("JumpStart", {
  regex: /start/,
  objects: [
  ],
  script: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    w.ship.helm = 'farrington_moss'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    w.ship.science = 'lashirr_hrong'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    w.ship.engineering = 'milton_keynes'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    w.ship.armsman = 'dakota_north'

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'farrington_moss' does not exist on type ... Remove this comment to see the full error message
    w.farrington_moss.loc = 'bridge'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'lashirr_hrong' does not exist on type '{... Remove this comment to see the full error message
    w.lashirr_hrong.loc = 'bridge'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'milton_keynes' does not exist on type '{... Remove this comment to see the full error message
    w.milton_keynes.loc = 'bridge'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dakota_north' does not exist on type '{}... Remove this comment to see the full error message
    w.dakota_north.loc = 'bridge'

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'helmsman_go_to_7iota' does not exist on ... Remove this comment to see the full error message
    w.helmsman_go_to_7iota.hide()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'helmsman_go_to_star' does not exist on t... Remove this comment to see the full error message
    w.helmsman_go_to_star.show()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'helmsman_go_to_location' does not exist ... Remove this comment to see the full error message
    w.helmsman_go_to_location.show()

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'helmsman_go_to_7iota' does not exist on ... Remove this comment to see the full error message
    w.helmsman_go_to_7iota.script()
    //stars.arriveAtSector()
    return world.SUCCESS
  },
}))



