"use strict"


/*
The ship is on a long mission to visit various stars to survey them. It takes years between each one, so the crew are in stasis. The shop has an AI that controls the ship between stars, and on arrival does the initial scans, looking for anything interesting. The ship does not have the capability to land (it has two escape pods that can be used to land, but not get off the planet again).

There are:
Six stasis pods
Five? crew
Six seeder pods, to be deployed in batches of three
Six satellites
Sixteen probes with crawler-bots
Six probes with marine-bots
Two escape pods

Probes:
Geology (MS, also analyse atmosphere)
Biology (slice and dice, microscope)


Keep a score in the way of a bonus, related to how much data for useful planets

Each awakening gets steadily worse, by the fourth you are throwing up.








*/







const CREW = function(isFemale: any) {
  const res = NPC(isFemale)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'status' does not exist on type '{ canRea... Remove this comment to see the full error message
  res.status = "okay"
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'properNoun' does not exist on type '{ ca... Remove this comment to see the full error message
  res.properNoun = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'crewman' does not exist on type '{ canRe... Remove this comment to see the full error message
  res.crewman = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'relationship' does not exist on type '{ ... Remove this comment to see the full error message
  res.relationship = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'clothing' does not exist on type '{ canR... Remove this comment to see the full error message
  res.clothing = 2
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'reactionToUndress' does not exist on typ... Remove this comment to see the full error message
  res.reactionToUndress = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'oxygenUseModifier' does not exist on typ... Remove this comment to see the full error message
  res.oxygenUseModifier = 1
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'oxygenUse' does not exist on type '{ can... Remove this comment to see the full error message
  res.oxygenUse = function() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'status' does not exist on type '{ canRea... Remove this comment to see the full error message
    if (typeof this.status !== 'number') return 0
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'baseOxygeUse' does not exist on type '{ ... Remove this comment to see the full error message
    return this.baseOxygeUse * this.oxygenUseModifier
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'revive' does not exist on type '{ canRea... Remove this comment to see the full error message
  res.revive = function(options: any) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'char'.
    if (char === player) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("You wonder how to revive {nm:item} - probably best to leave that to Xsansi.", options);
      return false;
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
    if (options.char !== w.Xsansi) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("'{nm:char}, can you revive {nm:item}?' you ask.", options);
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Probably best to leave that to Xsansi.'");
      return false;
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'inPod' does not exist on type '{ canReac... Remove this comment to see the full error message
    if (!this.inPod) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("'Xsansi, please revive {nm:item},' you say.", options);
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("'Crew member {nm:item} is not currently in stasis.'", options);
      return false;
    }
    // check number revived TODO!!!
    
  }
  // Description
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'examine' does not exist on type '{ canRe... Remove this comment to see the full error message
  res.examine = function(options: any) {
    const tpParams = {char:this}
    let s;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clothing' does not exist on type '{ canR... Remove this comment to see the full error message
    switch (this.clothing) {
      case 0: s = " {pv:char:be:true} naked."; break;
      case 1: s = " {pv:char:be:true} in his underwear."; break;
      case 2: s = " {pv:char:be:true} wearing a dark grey jumpsuit."; break;
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'posture' does not exist on type '{ canRe... Remove this comment to see the full error message
    if (this.posture === "reclining" && this.loc === "stasis_bay") {
      s += " {pv:char:be:true} lying in his stasis pod.";
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'posture' does not exist on type '{ canRe... Remove this comment to see the full error message
    else if (this.posture) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'posture' does not exist on type '{ canRe... Remove this comment to see the full error message
      s += " {pv:char:be:true} " + this.posture + ".";
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg(this.desc + s, tpParams);
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'stasis' does not exist on type '{ canRea... Remove this comment to see the full error message
  res.stasis = function() {
    const tpParams = {char:this}
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg("'{nm:char}, you're work here is done; you can go get in your stasis pod.'", tpParams);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeTotal' does not exist on type... Remove this comment to see the full error message
    if (this.deployProbeTotal === 0) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("'You don't think I should deploy a probe first?'", tpParams);
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("'I'm the captain,' you remind {ob:char}.", tpParams);
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg(this.okay);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'agenda' does not exist on type '{ canRea... Remove this comment to see the full error message
    this.agenda.push("walkTo:stasis_bay");
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'agenda' does not exist on type '{ canRea... Remove this comment to see the full error message
    this.agenda.push("text:stasisPod");
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stasisPodCount' does not exist on type '... Remove this comment to see the full error message
    this.stasisPodCount = 0;
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'stasisPod' does not exist on type '{ can... Remove this comment to see the full error message
  res.stasisPod = function() {
    const tpParams = {char:this}
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clothing' does not exist on type '{ canR... Remove this comment to see the full error message
    if (this.clothing === 2) {
      this.msg("{nv:char:pull:true} off {pa:char} jumpsuit, and puts it in the drawer under {pa:char} stasis pod.", tpParams);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'clothing' does not exist on type '{ canR... Remove this comment to see the full error message
      this.clothing = 1;
      return false;
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'posture' does not exist on type '{ canRe... Remove this comment to see the full error message
    if (this.posture !== "reclining") {
      this.msg("Just in {pa:char} underwear, {nv:char:climb} into {pa:char} stasis pod.", tpParams);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'posture' does not exist on type '{ canRe... Remove this comment to see the full error message
      this.posture = "reclining";
      return false;
    }
    this.msg("'Close the pod, Xsansi,' {nv:char:say}. The stasis pod lid smoothly lowers, and Xsansi operates the stasis field.", tpParams);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'status' does not exist on type '{ canRea... Remove this comment to see the full error message
    this.status = "stasis";
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ canReachT... Remove this comment to see the full error message
    this.loc = "nowhere";
    return true;
  }

  // Probe deployment
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeAction' does not exist on typ... Remove this comment to see the full error message
  res.deployProbeAction = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeCount' does not exist on type... Remove this comment to see the full error message
  res.deployProbeCount = 0  // number deployed in one batch
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeTotal' does not exist on type... Remove this comment to see the full error message
  res.deployProbeTotal = 0  // number deployed in this system
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeOverallTotal' does not exist ... Remove this comment to see the full error message
  res.deployProbeOverallTotal = 0  // total
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbe' does not exist on type '{ c... Remove this comment to see the full error message
  res.deployProbe = function(arr: any) {
    // This is an agenda item; it will continue until it returns true and is set other parameters from the agenda (just the count in this case).
    // It will run every turn until done. It should only start once the character is at the correct location.
    // Progress is tracked with deployProbeAction.
    // 0 is sitting down at the console
    // 1 is preparing the probe
    // 2 is launching the probe, and we can return to 1 if there are more to do
    // 3 is noting the job is done
    // Once a probe is launched this system forgets it
    const count = parseInt(arr[0])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeCount' does not exist on type... Remove this comment to see the full error message
    const tpParams = {char:this, count:this.deployProbeCount + 1}
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeAction' does not exist on typ... Remove this comment to see the full error message
    switch (this.deployProbeAction) {
      case 0:
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'probeAction0' does not exist on type '{ ... Remove this comment to see the full error message
        this.probeAction0(count)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeAction' does not exist on typ... Remove this comment to see the full error message
        this.deployProbeAction++
        break
      case 1:
        this.msg("{nv:char:prepare:true} the {ordinal:count} {show:char:probeType}.", tpParams)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeAction' does not exist on typ... Remove this comment to see the full error message
        this.deployProbeAction++
        break
      case 2:
        this.msg("{nv:char:launch:true} the {ordinal:count} {show:char:probeType}.", tpParams)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'actuallyDeployProbe' does not exist on t... Remove this comment to see the full error message
        this.actuallyDeployProbe(count)
        break
      case 3:
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'probeAction3' does not exist on type '{ ... Remove this comment to see the full error message
        this.probeAction3(count)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeAction' does not exist on typ... Remove this comment to see the full error message
        this.deployProbeAction++
        break
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeAction' does not exist on typ... Remove this comment to see the full error message
    return this.deployProbeAction === 4
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'actuallyDeployProbe' does not exist on t... Remove this comment to see the full error message
  res.actuallyDeployProbe = function(count: any) {
    // the details of leaunching a probe are done here
    // housekeeping
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'probesRemaining' does not exist on type ... Remove this comment to see the full error message
    this.probesRemaining--
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeCount' does not exist on type... Remove this comment to see the full error message
    this.deployProbeCount++
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeTotal' does not exist on type... Remove this comment to see the full error message
    this.deployProbeTotal++
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeOverallTotal' does not exist ... Remove this comment to see the full error message
    this.deployProbeOverallTotal++
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeCount' does not exist on type... Remove this comment to see the full error message
    if (this.deployProbeCount === count) {
      // last of the batch
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeAction' does not exist on typ... Remove this comment to see the full error message
      this.deployProbeAction++;
    }
    else {
      // some left to deploy
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'deployProbeAction' does not exist on typ... Remove this comment to see the full error message
      this.deployProbeAction--;
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'probe_prototype' does not exist on type ... Remove this comment to see the full error message
    w.probe_prototype.cloneMe(this)
  }
  
  return res 
}








// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'walkthroug... Remove this comment to see the full error message
const walkthroughs = {
  c:[
    "o",
    "get jumpsuit",
    "wear jumpsuit",
    "a",
    "u",
    "f",
    "s",
    "ask ostap about probes",
    "x chair",
    "x table",
    "ask ostap about bio-probes",
    "ask ostap about his health",
    "ostap, launch 19 probes",
    "ostap, launch 2 bio-probe",
    "z",
    "p",
    "d",
    "d",
    "a",
    "z",
    "ask ostap about lost probes",
    "ask ostap about planet",
    "ask ostap about lost probes",
    "topics for ostap",
    "z",
    "z",
    "z",
    "z",
    "z",
    "z",
    "ask ostap about lost probes",
    "ask ostap about planet",
    "topics ostap",
    "ask ostap about himself",
    "ask ostap about himself",
    "ostap, go in stasis pod",
    "f",
    "u",
    "s",
    "ostap, stop",
    "ostap, stop",
    "z",
    "z",
    "l",
    "ostap, go in stasis pod",
    "z",
    "x ostap",
    "l",
    "ask ai about crew",
    "p",
    "u",
    "a",
    "a",
    "tell aada to deploy probe",
    "z",
    "f",
    "f",
    "d",
    "d",
    "a",
    "z",
    "z",
    "z",
    "z",
    "z",
    "ask aada about planet",
    "topics aada",
    "ask aada about himself",
    "ask aada about herself",
    "aada, go in stasis pod",

    "up",
    "forward",
    "starboard",
    "starboard",
    "in",
    "remove jumpsuit",
    "drop jumpsuit",
    "close lid",

    "out",
    "open locker",
    "get suit",
    "get sp",
    "wear sp",
    "ai,depres stasis",



    /**/
  ],
  c1:[
    "o",
    "get jumpsuit",
    "wear jumpsuit",
    "p",
    "f",
    "kyle, launch 19 probes",
    "kyle, launch 1 satellite",
    "z",
    "a",
    "d",
    
  ],
}




function isRoomScope(obj: any) { return obj.room }





function createTopics(npc: any) {
  npc.askOptions.push({
    name:"health",
    regex:/(his |her )?(health|well\-?being)/,
    test:function(p: any) { return p.text.match(this.regex); }, 
    script:howAreYouFeeling,
  });
  npc.askOptions.push({
    name:"planet",
    regex:/(this |the |)?planet/,
    test:function(p: any) { return p.text.match(this.regex) }, 
    script:function(response: any) {
      const tpParams = {char:response.char}
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("'What's your report on {planet}?' you ask {nm:char:the}.", tpParams)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg(planetAnalysis(response), tpParams)
    },
  });
  npc.askOptions.push({
    name:"probes",
    regex:/probes?/,
    test:function(p: any) { return p.text.match(this.regex) }, 
    script:function(response: any) {
      response.char.probesAskResponse();
    }
  });
  npc.askOptions.push({
    name:"expertise", 
    regex:/(your |his |her )?(area|special.*|expert.*|job|role)/,
    test:function(p: any) { return p.text.match(this.regex); }, 
    script:function(response: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'What is your area of expertise?' you ask " + lang.getName(response.char, {article:DEFINITE}) + ".");
      response.char.areaAskResponse();
    }
  });
  npc.askOptions.push({
    name:"background", 
    regex:/^((his |her )?(background))|((him|her)self)$/,
    test:function(p: any) { return p.text.match(this.regex); }, 
    script:function(response: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Tell me about yourself,' you say to " + lang.getName(response.char, {article:DEFINITE}) + ".");
      response.char.backgroundAskResponse();
      trackRelationship(response.char, 1, "background");
    }
  });
  npc.askOptions.push({
    msg:"{nv:char:have:true} no interest in that.",
    failed:true,
  })
}
 
function howAreYouFeeling(response: any) {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  msg("'How are you feeling?' you ask " + lang.getName(response.char, {article:DEFINITE}) + ".");
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  msg(PLANETS[w.Xsansi.currentPlanet][response.char.name + "_how_are_you"]);
}

function planetAnalysis(response: any) {
  log(response)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
  const arr = response.char.data[w.Xsansi.currentPlanet]
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (Object.keys(arr).length === 0) return falsemsg("You should talk to Aada or Ostap about that stuff.")

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
  let rank = response.char["rank" + w.Xsansi.currentPlanet]
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (rank === undefined) return falsemsg("You should talk to Aada or Ostap about that stuff.")
  rank >>= 1
  if (rank >= arr.length) rank = arr.length - 1
  return arr[rank]
}

  
function createPlanets() {
  for (let i = 0; i < PLANETS.length; i++) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
    createItem("planet" + i,
      { 
        starName:PLANETS[i].starName,
        alias:PLANETS[i].starName + " " + PLANETS[i].planet,
        geology:0,
        marine:0,
        biology:0,
        coms:0,
        satellite:false,
        probeLandingSuccess:PLANETS[i].probeLandingSuccess,
        eventIsActive:function() { return this.satellite; },
        eventPeriod:5,
        eventScript:function() {
          this.coms++; 
        },
      }
    )
  }
}


createPlanets();


function arrival() {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
  w.Xsansi.currentPlanet++
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
  PLANETS[w.Xsansi.currentPlanet].onArrival()
  game.elapsedTime = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
  game.startTime = PLANETS[w.Xsansi.currentPlanet].arrivalTime
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Aada' does not exist on type '{}'.
  w.Aada.deployProbeTotal = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
  w.Ostap.deployProbeTotal = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
  updateTopics(w.Xsansi, w.Xsansi.currentPlanet)
  for (let npc of NPCS) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
    npc.state = w.Xsansi.currentPlanet * 100
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  w.Kyle.setAgenda(["walkTo:probes_forward", "text:deployProbe:1"])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateStatus' does not exist on type '{ ... Remove this comment to see the full error message
  io.updateStatus() 
}

// If a topic has an attribute "name2", then using code=2,
// "name" will be changed to "name2". This means new topics get added to the TOPIC command
// tested
function updateTopics(npc: any, code: any) {
  for (let opt of npc.askOptions) {
    if (opt["name" + code] !== undefined) {
      opt.name = opt["name" + code]
    }
  }
}

// Use this to increase the player's relationship with the NPC to ensure it only happens once
// tested
function trackRelationship(npc: any, inc: any, code: any) {
  if (npc.relationshipTracker === undefined) npc.relationshipTracker = "~"
  const regex = new RegExp("~" + code + "~")
  if (!regex.test(npc.relationshipTracker)) {
    npc.relationship += inc
    npc.relationshipTracker += code + "~"
  }
}
    


function reviveNpc(npc: any, object: any) {
  
}





function getProbes() {
  const arr = [];
  for (let key in w) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (w[key].clonePrototype === w.probe_prototype) arr.push(w[key]);
  }
  return arr;
}


function shipAlert(s: any) {
  if (isOnShip()) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("'" + s + "' announces Xsansi.");
  }
}


function isOnShip() {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return w[player.loc].notOnShip === undefined;
}


function currentPlanet() {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return w["planet" + w.Xsansi.currentPlanet];
}


function probeLandsOkay() {
  const planet = currentPlanet();
  const flag = (planet.probeLandingSuccess[0] === "y");
  planet.probeLandingSuccess = planet.probeLandingSuccess.substring(1);
  if (!flag) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Aada' does not exist on type '{}'.
    w.Aada.lostProbe = true;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
    w.Ostap.lostProbe = true;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
    updateTopics(w.Ostap, "Lost")
  }
  return flag;
}
  
  
// @ts-expect-error ts-migrate(2339) FIXME: Property 'deckNames' does not exist on type '{ per... Remove this comment to see the full error message
settings.deckNames = {layer1:'Deck 2', layer3:'Deck 1', layer4:'Deck 3'}

function updateMap() {
  if (!document.querySelector('#layer1')) return
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('#layer1').style.display = 'none'
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('#layer3').style.display = 'none'
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('#layer4').style.display = 'none'
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const currentDeck = w[player.loc].deckName
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('#map').setAttribute('title', 'The Joseph Banks, ' + settings.deckNames[currentDeck]);
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!currentDeck) return errormsg("No deckName for " + player.loc)
  let el = document.querySelector('#' + currentDeck)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
  if (el) el.style.display = 'block'
  for (let key in w) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (w[key].svgId) document.querySelector('#' + w[key].svgId).style.fill = isRoomPressured(w[key]) ? '#777' : '#222'
  }
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const mySvgId = w[player.loc].svgId
  let otherSvgId
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
  if (w.Xsansi.locate) otherSvgId = w[w[w.Xsansi.locate].loc].svgId

  if (!mySvgId && !otherSvgId) return
  if (mySvgId === otherSvgId) {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#' + mySvgId).style.fill = 'green'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
    w.Xsansi.locate = false
  }
  else {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    if (mySvgId) document.querySelector('#' + mySvgId).style.fill = 'yellow'
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    if (otherSvgId) document.querySelector('#' + otherSvgId).style.fill ='blue'
  }
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('#rect10').style.fill = settings.darkModeActive ? '#606' : '#bbb'
  for (let id of [3334, 2800, 2788, 3330]) {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#text' + id).style.fill = settings.darkModeActive ? 'white' : 'black'
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#text' + id).style.fontFamily = 'Orbitron, sans-serif'
  }
}




function isRoomPressured(room: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (typeof room.vacuum === "string") room = w[room.vacuum];
  return !room.vaccum;
}


