"use strict"


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("nowhere", {
});



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("me", Quest.Templates.PLAYER(), {
  loc: "stasis_pod_room",
  regex: /^(me|myself|player)$/,
  status: 100,
  bonus: 0,
  baseOxygeUse: 6,
  oxygenUseModifier: 1,
  oxygenUse: function () {
    return this.baseOxygeUse * this.oxygenUseModifier
  },
  examine: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("You feel fine...")
  },
  testMove: function (ex: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    let room1 = Quest.World.w[this.loc]
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (typeof room1.vacuum === "string") room1 = Quest.World.w[room1.vacuum]
    if (ex.name === '_') return true
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    let room2 = Quest.World.w[ex.name]
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (typeof room2.vacuum === "string") room2 = Quest.World.w[room2.vacuum]

    if (room1.vacuum === room2.vacuum) return true

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (room2.name === 'space') return Quest.IO.falsemsg("The external airlock door cannot be opened while the airlock is pressurised.")

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("The door to " + Quest.lang.getName(room2, { article: Quest.Utilities.DEFINITE }) + " will not open while it is " + (room1.vacuum ? 'pressurised' : 'depressurised') + " and " + Quest.lang.getName(room1, { article: Quest.Utilities.DEFINITE }) + " is not.")
    return false
  },
  spray: function (char: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("You spray sealant on yourself.")
  },
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("your_jumpsuit", Quest.Templates.WEARABLE(2, ["body"]), {
  alias: "jumpsuit",
  loc: "stasis_pod_drawer",
  defArticle: "your",
  indefArticle: "your",
  examine: "Your jumpsuit is tight, but comfortable; a dark grey colour, with a slight metallic sheen.",
  afterMove: function (options: any) {
    if (options.fromLoc === "stasis_pod_drawer") {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'stasis_pod_drawer' does not exist on typ... Remove this comment to see the full error message
      Quest.World.w.stasis_pod_drawer.closed = true
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("The stasis pod drawer slides shut.");
    }
  },
  sprayCount: 2,
  spray: function (char: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("")
  },
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("your_underwear", Quest.Templates.WEARABLE(1, ["body"]), {
  alias: "underwear",
  loc: "me",
  worn: true,
  defArticle: "your",
  indefArticle: "your",
  examine: "Your underwear is standard issue; white and functional.",
  spray: function (char: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("")
  },
});


//-----------------------------------------------------
// STARBOARD POD

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("stasis_bay", {
  deckName: 'layer1',
  svgId: 'rect2756',
  alias: "stasis bay",
  pressure: true, // give priority to press/depress
  desc: 'There are six stasis pods here (despite only five crew members), four on one side and two on the other. {stasis_pod_status} Above each pod is a diagnostics screen, and behind them the various pipes that keep the occupant alive. Besides the pods, there is also a large locker at the back of the room. {ifHere:pile_of_vomit:There is some vomit on the floor by your stasis pod. }The exits are to port and aft.',
  tpStatus: function () {
    const arr = [];
    for (let npc of NPCS) {
      if (npc.status === "stasis") {
        arr.push(npc);
      }
    }
    switch (arr.length) {
      case 0: return "All pods are currently open.";
      case 4: return "Currently only your pod and the spare pod are open.";
      case 1: return Quest.lang.getName(arr[0], { possessive: true }) + " stasis pod is closed.";
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      default: return "The stasis pods of " + Quest.Utilities.formatList(arr) + " are closed.";
    }
  },
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  port: new Quest.World.Exit('hallway'),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  aft: new Quest.World.Exit('cargo_bay'),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  in: new Quest.World.Exit('stasis_pod_room', { msg: "You climb into the stasis pod.", }),
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem("pile_of_vomit", {
  scenery: true,
  regex: /vomit|sick/,
  examine: "A large splat of vomit, it stinks. You decide not to look too closely. You already know what you ate last, so what is the point?",
  spray: function (char: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("")
  },
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem("stasis_pod", {
  alias: "pod",
  regex: /^(stasis )?pods?$/,
  scenery: true,
  loc: "stasis_bay",
  examine: "Externally, the pods are rather less like coffins, as the sides are thick with the stasis equipment, and flared towards the floor. Each stasis pod is about waist height. {stasis_pod_status}{ifHere:pile_of_vomit: One has a slight splattering of vomit.}",
  spray: function (char: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("")
  },
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("stasis_pod_drawer", Quest.Templates.CONTAINER(true), {
  alias: "drawer",
  scenery: true,
  loc: "stasis_bay",
  closed: false,
  examine: "{if:stasis_pod_drawer:closed:The drawer is flush with the stasis pod, almost invisible.:The drawer extends out from the foot of the pod; it is white and quite shallow, and almost the width of the pod. You can see {contents:stasis_pod_drawer:,:and:nothing} stored in it.{ifHere:pile_of_vomit: Fortunately, it is well away from the vomit.}}",
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("stasis_locker", Quest.Templates.CONTAINER(true), {
  alias: "locker",
  scenery: true,
  loc: "stasis_bay",
  examine: function () {
    if (this.closed) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("This metal locker is taller than you, and just as wide; it is where spacesuits are stored{once: - if there is an emergency, you want the spacesuits by the stasis pods}.");
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("This metal locker is taller than you, and just as wide; it is where spacesuits are stored. You can see {contents:stasis_locker:,:and:nothing} stored in it.")
    }
  },
  spray: function (char: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("")
  },
});


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("your_spacesuit", Quest.Templates.WEARABLE(2, ["body"]), {
  alias: "spacesuit",
  loc: "stasis_locker",
  defArticle: "your",
  indefArticle: "your",
  examine: "Your spacesuit is a pale grey colour, with bright yellow flashes on the arms and legs for visibility. It says \"{show:player:alias}\" on the back.",
  spray: function (char: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("")
  },
  testRemove: function (char: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (isRoomPressured(Quest.World.w[char.loc])) return true
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("{nv:char:start:true} to unseal {pa:char} spacesuit... There is a hissing sound, and suddenly {nv:char:be} struggling for breath. Quickly, {nv:char:seal:true} it up again. Perhaps taking a spacesuit off in a vacuum is not such a good idea?")
    return false
  }
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("other_spacesuit", Quest.Templates.WEARABLE(2, ["body"]), {
  alias: "spare spacesuit",
  loc: "stasis_locker",
  parserPriority: -10,
  examine: "The other spacesuit is identical to your own, except it does not have your name on the back.",
  spray: function (char: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("")
  },
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("spray_sealant", Quest.Templates.TAKEABLE(), {
  alias: "sealant spray",
  loc: "stasis_locker",
  uses: 5,
  examine: "A spray can; the label says \"No-Leak Sealant\" and there is some other writing on it.",
  read: "You read the label on the can: \"No-Leak Sealant is a high performance foam sealant suitable for emergency use in space. It can be used to seal holes up to 30 mm side and 200 mm long, and is designed to maintain integrity for up to 24 hours. Typically one can is sufficient for five holes. WARNING: Highly flammable. Do not ingest. Do not breath fumes.\"",
  spray: function (char: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg("Spray the spray with the spray? Not going to happen.")
    this.uses++
    return Quest.World.world.FAILED
  },
});








// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("stasis_pod_room", {
  deckName: 'layer1',
  svgId: 'rect2756',
  alias: "stasis pod",
  desc: 'The stasis pod is shaped uncomfortably like a coffin, and is a pale grey colour. The lid is in the raised position.',
  vacuum: "stasis_bay",
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  out: new Quest.World.Exit('stasis_bay', {
    use: function () {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("You climb out of the stasis pod.");
      Quest.World.player.moveChar(this);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'your_jumpsuit' does not exist on type '{... Remove this comment to see the full error message
      if (Quest.World.w.your_jumpsuit.loc === "stasis_pod_drawer") {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stasis_pod_drawer' does not exist on typ... Remove this comment to see the full error message
        Quest.World.w.stasis_pod_drawer.loc = "stasis_bay";
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("A drawer under the pod slides open to reveal your jumpsuit.");
      }
      return true;
    }
  }),
  afterDropIn: function (options: any) {
    log(options)
    options.item.loc = "stasis_bay"
  }
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("stasis_pod_interior",
  Quest.Templates.OPENABLE(true),
  {
    alias: "stasis pod",
    regex: /^(stasis pod|pod|lid)$/,
    scenery: true,
    loc: "stasis_pod_room",
    closed: false,
    examine: "Externally, the pods are rather less like coffins, as the sides are thick with the stasis equipment, and flared towards the floor. Each stasis pod is about waist height. {stasis_pod_status}.{ifHere:pile_of_vomit: One has a slight splattering of vomit.}",
    close: function (char: any) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
      if (Quest.World.w.Kyle.deployProbeAction < 5) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("You give pod lid a pull, and it starts to descend for a moment, before stopping. 'Commander,' says Xsensi, 'closing the lid of a stasis pod will put you back in stasis. That is not permitted until the satellite is deployed, and not advised until probes have been deployed and data collected.' The lid rises to its fully open position.");
        return false;
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'your_jumpsuit' does not exist on type '{... Remove this comment to see the full error message
      if (Quest.World.w.your_jumpsuit.loc === Quest.World.player.name) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("You give pod lid a pull, and it starts to descend for a moment, before stopping. 'Commander,' says Xsensi, 'your jumpsuit should be left outside the pod when going into stasis.' The lid rises to its fully open position.");
        return false;
      }

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'your_jumpsuit' does not exist on type '{... Remove this comment to see the full error message
      Quest.World.w.your_jumpsuit.loc = "stasis_pod_drawer";
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'stasis_pod_drawer' does not exist on typ... Remove this comment to see the full error message
      Quest.World.w.stasis_pod_drawer.scenery = true;
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("You give pod lid a pull, and it starts to descend, sealing you in. You feel a sharp pain in your shoulder, and almost immediately you start to feel sleepy... so sleepy you cannot keep your eyes open.")
      Quest.IO.hr()
      arrival()
      // MORE STUFF HERE ???
      return true
    },
  }
);





// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("cargo_bay", {
  deckName: 'layer1',
  svgId: 'rect2758',
  desc: "The cargo bay is a large, open area, with numerous crates, several with their own stasis fields. Yellow lines on the floor indicate access ways to be kept clear. The ship's airlock is to starboard, whilst engineering is aft. The stasis bay is forward, and to port, stairs lead up to the top deck, where the living quarters are.",
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  forward: new Quest.World.Exit("stasis_bay"),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  port: new Quest.World.Exit("top_deck_aft", {
    msg: "You walk up the narrow stair way to the top deck.",
    alsoDir: ["up"],
  }),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  starboard: new Quest.World.Exit("airlock"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  aft: new Quest.World.Exit("engineering3"),
  scenery: [
    { alias: 'crates', examine: 'Each crate is a standard size, 1 m by 2 m by 1 m; they are all a pale grey colour, with a white sealing band, and identity patches on the sides.' },
  ],
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createRoom("airlock", Quest.Templates.TRANSIT("starboard"), {
  deckName: 'layer1',
  svgId: 'rect2770',
  desc: "The airlock is just big enough for two persons wearing spacesuits, and is featureless besides the doors, port and starboard, and the controls.",
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  port: new Quest.World.Exit("cargo_bay"),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  starboard: new Quest.World.Exit("space", { locked: true, alsoDir: ["out"] }),
});








//-----------------------------------------------------
// CENTRAL AXIS



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("hallway", {
  deckName: 'layer1',
  svgId: 'rect2768',
  desc: "This is, in a sense, the central nexus of the ship. The flight-deck is forward, the stasis bay to starboard, the labs to port. A ladder goes up to the living quarters and down to the probe hangers.",
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  starboard: new Quest.World.Exit("stasis_bay"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  port: new Quest.World.Exit("biolab"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  up: new Quest.World.Exit("top_deck_forward"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  down: new Quest.World.Exit("probes_forward"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  forward: new Quest.World.Exit("flightdeck"),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  aft: new Quest.World.Exit("service_passage", {
    isHidden: function () { return true; },
  }),
});


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("service_passage", {
  deckName: 'layer1',
  svgId: 'rect16',
  desc: "A narrow passage running along the spine of the ship, the walls are covered in piping, conduits and cabling.",
  vacuum: false,
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  forward: new Quest.World.Exit("hallway", {
    isHidden: function () { return true; },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  aft: new Quest.World.Exit("engineering2", {
    isHidden: function () { return true; },
  }),
});




// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("flightdeck", {
  deckName: 'layer1',
  svgId: 'path841',
  alias: "flight-deck",
  desc: "The flight deck is semi-circular, with windows looking out in all directions. In the centre is the command chair, and there are four other chairs at the various workstations. The flight-deck can be used as an escape capsule, and can be landed on a suitable planet (but cannot be used to get back to space). The only exit is aft.",
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  aft: new Quest.World.Exit("hallway"),
});








//-----------------------------------------------------
// LABS


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("biolab", {
  deckName: 'layer1',
  svgId: 'rect2752',
  alias: "Bio-lab",
  desc: "The bio-lab is really just a large office, with two chairs, a desk and lots of compuer screens.",
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  starboard: new Quest.World.Exit("hallway"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  aft: new Quest.World.Exit("geolab"),
});




// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("geolab", {
  deckName: 'layer1',
  svgId: 'rect2754',
  alias: "Geo-lab",
  desc: "The geo-lab is really just a large office, with two chairs, a desk and lots of compuer screens.",
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  forward: new Quest.World.Exit("biolab"),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  down: new Quest.World.Exit("probes_aft", {
    msg: "You walk down the narrow stair way to the bottom deck.",
    alsoDir: ["starboard"],
  }),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  aft: new Quest.World.Exit("engineering1"),
});





//-----------------------------------------------------
// ENGINEERING



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("engineering1", {
  deckName: 'layer1',
  svgId: 'path2760',
  desc: "This is where the fusion micro-reactor stands, a vaguely cylindrical device about a meter across, and stretching from floor to ceiling. Cables run to a small console nearby.",
  alias: "Engineering (port)",
  properNoun: true,
  vacuum: "engineering2",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  starboard: new Quest.World.Exit("engineering2"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  forward: new Quest.World.Exit("geolab"),
});


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("engineering2", {
  deckName: 'layer1',
  svgId: 'path4106',
  desc: "The main engineers are here, five huge light-drives that project out the rear of the ship.",
  alias: "Engineering (aft)",
  properNoun: true,
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  starboard: new Quest.World.Exit("engineering3"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  port: new Quest.World.Exit("engineering1"),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  forward: new Quest.World.Exit("service_passage", {
    isHidden: function () { return true; },
  }),
});


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("engineering3", {
  deckName: 'layer1',
  svgId: 'path4108',
  desc: "The various life-support machinery is housed on this side of engineering, including the CO2 scrubbers and water recycler.",
  properNoun: true,
  alias: "Engineering (starboard)",
  vacuum: "engineering2",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  port: new Quest.World.Exit("engineering2"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  forward: new Quest.World.Exit("cargo_bay"),
});





//-----------------------------------------------------
// LOWER DECK

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("probes_forward", {
  deckName: 'layer3',
  svgId: 'rect3634',
  alias: "Forward probe hanger",
  desc: "The forward probe hanger is where the satellites are stored ready for deployment. The six satellites are kept in a dust-free environment on the starboard side of the hanger, each on a cradle. A robot arm is available to pick them up and eject them through a hatch in the floor.|On the port side, the seeder pods are stored. Each pod contains a variety of simple lifeforms, such as algae, which, it is hoped, will kick-start life on a suitable planet. It is a long term plan. There are six pods, three to be deployed at distant locations on a planet.| There is a control console to handle it all, though it can also be done remotely.",
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  up: new Quest.World.Exit("hallway"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  aft: new Quest.World.Exit("probes_aft"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  forward: new Quest.World.Exit("server_room"),
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("probes_aft", {
  deckName: 'layer3',
  svgId: 'rect3638',
  alias: "Aft probe hanger",
  desc: "The aft probe hanger has the scientific probes. Each probe is contained in a crate, and needs unpacking before deployment. On the port side there is a delivery system into which a probe can be placed, to be sent to the planet. Various types of probes are available.",
  vacuum: false,
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  up: new Quest.World.Exit("geolab", {
    msg: "You walk up the narrow stair way to the middle deck.",
    alsoDir: ["port"],
  }),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  forward: new Quest.World.Exit("probes_forward"),
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("server_room", {
  deckName: 'layer3',
  svgId: 'path3619',
  desc: "The heart of the IT systems, including Xsansi, This room holds three racks of processors, each rack having four shelves and each shelf having eight units. The room is kept cool and smells slightly of ozone.",
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  aft: new Quest.World.Exit("probes_forward"),
});





//-----------------------------------------------------
// UPPER DECK


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("lounge", {
  deckName: 'layer4',
  svgId: 'path3973',
  desc: "The lounge has five well-padded seats, all facing the large windows that curve round the front of the ship, and over the ceiling too.",
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  aft: new Quest.World.Exit("top_deck_forward"),
});




// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("top_deck_forward", {
  deckName: 'layer4',
  svgId: 'rect4090',
  desc: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'top_deck_aft' does not exist on type '{}... Remove this comment to see the full error message
    if (!Quest.World.w.top_deck_aft.meFirst) {
      this.meFirst = true;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'top_deck_aft' does not exist on type '{}... Remove this comment to see the full error message
      return Quest.World.w.top_deck_aft.descStart + this.descThis + Quest.World.w.top_deck_aft.descFinish
    }
    else {
      return this.descThis;
    }
  },
  descThis: "You are standing at the forward end of a narrow corridor, with your cabin to port, and the canteen to starboard. Ahead, is the lounge.",
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  down: new Quest.World.Exit("hallway"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  starboard: new Quest.World.Exit("canteen"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  port: new Quest.World.Exit("your_cabin"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  aft: new Quest.World.Exit("top_deck_aft"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  forward: new Quest.World.Exit("lounge"),
});


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("top_deck_aft", {
  deckName: 'layer4',
  svgId: 'rect3976',
  descStart: "The top deck is where the living quarters - such as they are - are accessed. ",
  descFinish: " The corridor is very utilitarian, with a metal floor and ceiling. The sides are mostly covered in white plastic panels, as a small concession to aesthetics.",
  desc: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'top_deck_forward' does not exist on type... Remove this comment to see the full error message
    if (!Quest.World.w.top_deck_forward.meFirst) {
      this.meFirst = true;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'top_deck_aft' does not exist on type '{}... Remove this comment to see the full error message
      return Quest.World.w.top_deck_aft.descStart + this.descThis + Quest.World.w.top_deck_aft.descFinish
    }
    else {
      return this.descThis
    }
  },
  descThis: "You are standing at the aft end of a narrow corridor, with the women's cabin behind you, the men's to port. To starboard, steps lead down to the cargo bay on the lower deck.",
  vacuum: "top_deck_forward",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  port: new Quest.World.Exit("guys_cabin"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  aft: new Quest.World.Exit("girls_cabin"),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  starboard: new Quest.World.Exit("cargo_bay", {
    msg: "You walk down the narrow stair way to the middle deck.",
    alsoDir: ["down"],
  }),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  forward: new Quest.World.Exit("top_deck_forward"),
});



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("canteen", {
  deckName: 'layer4',
  svgId: 'rect3979',
  desc: "The canteen, like everything else of the ship, is pretty small. There is a table, with one short side against the wall, and five plastic chairs around it.{table_desc} At the back is the food preparation area; a work surface across the width of the room, with a sink on the right and a hob on the left.",
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  port: new Quest.World.Exit('top_deck_forward'),
});


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("canteen_table", Quest.Templates.SURFACE(), {
  alias: "table",
  loc: "canteen",
  scenery: true,
  tpDesc: function () { return " The table is bare." },
  examine: "The table is plastic, attached to the wall at one end, and held up by a single leg at the other end.{table_desc}",
})
// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("canteen_chair", Quest.Templates.FURNITURE({ sit: true }), {
  alias: "chair",
  loc: "canteen",
  scenery: true,
  examine: "The chaits are white and plastic and very basic.",
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("your_cabin", {
  deckName: 'layer4',
  svgId: 'rect3981',
  desc: "This is you cabin, not much more than a bed and a locker.",
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  starboard: new Quest.World.Exit("top_deck_forward"),
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("guys_cabin", {
  deckName: 'layer4',
  svgId: 'rect3983',
  desc: "Two bunk beds and two lockers pretty much sums up this room.",
  alias: "Men's cabin",
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  starboard: new Quest.World.Exit("top_deck_aft"),
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("girls_cabin", {
  deckName: 'layer4',
  svgId: 'rect3985',
  desc: "Two bunk beds and two lockers pretty much sums up this room.",
  alias: "Women's cabin",
  vacuum: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  forward: new Quest.World.Exit("top_deck_aft"),
});



//-----------------------------------------------------
// EXTERIOR



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("space", {
  desc: "You are floating in space, holding on to a handle on the side of the {i:Joseph Banks}. {once:You are very conscious of the fact that heading further out into space would be a {i:very bad idea}, as there would be no way to get back to the ship.} The view takes your breath away; the planet looming over head, and billions of stars. It is amazing to think that each is vastly bigger than the planet, and so far away your mind cannot really comprehend the distance.",
  vacuum: true,
  deckName: 'space',
  isSpace: true,
  notOnShip: true,
  properNoun: true,
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  port: new Quest.World.Exit("airlock", { alsoDir: ["in"] }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  starboard: new Quest.World.Exit("_", {
    alsoDir: ["out"], use: function () {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("You feel a sudden urge to be free, and push away from the ship... No! That would be a bad idea! You would drift forever. You cling desperately to the handle. What were you thinking?")
      return false
    }
  }),
});


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem("alien_ship_interior", {
  regex: /^alien ship|alien vessel|ship|vessel$/,
  desc: "",
  isShip: true,
  status: 0,
});




// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("_button_alien_ship", Quest.Templates.TRANSIT_BUTTON("airlock"), {
  transitDest: "alien_ship_interior",
  isLocatedAt: function () { return false },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("_button_space", Quest.Templates.TRANSIT_BUTTON("airlock"), {
  transitDest: "space",
  isLocatedAt: function () { return false },
})



// status
// 0 not detected
// 1 detected
// 2 approached
// 3 docked

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem("alienShip", {
  regex: /^alien ship|alien vessel|ship|vessel$/,
  desc: "",
  isShip: true,
  status: 0,
});






// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem("ship", {
  regex: /^ship|alien vessel|ship|vessel$/,
  desc: "",
  isShip: true,
  oxygen: 9546,
  status: 0,
  eventIsActive: function () { return true },
  eventPeriod: 1,
  eventScript: function () {
    this.oxygen -= Quest.World.player.oxygenUse()  // player using it
    for (let npc of NPCS) {
      this.oxygen -= npc.oxygenUse()
    }
  },
});




//-----------------------------------------------------
// SPECIAL ITEMS


// Probes are cloned from this
//
// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("probe_prototype", Quest.Templates.COUNTABLE([]), {
  alias: "probe",
  regex: /^(\d+ )?(bio-|geo-|bio|geo)?(probe|satellite|satelite)s?$/,
  launch: function (char: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (!char.probeType) return Quest.IO.falsemsg("To launch a probe, see either Aada or Ostap. For a satellite see Kyle.")

    let number = this.extractNumber();
    if (!number) number = 1

    if (number === 1) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Launch a " + char.probeType + ",' you say to " + Quest.lang.getName(char, { article: Quest.Utilities.DEFINITE }) + ".")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Launch " + number + " " + char.probeType + "s,' you say to " + Quest.lang.getName(char, { article: Quest.Utilities.DEFINITE }) + ".")
    }
    if (number > char.probesRemaining) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return Quest.IO.falsemsg("'We only have " + char.probesRemaining + " and we should save some for the other planets on our itinerary.'")
    }

    if (char.probeType === 'satellite') {
      if (number > (2 - char.deployProbeTotal)) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Are you sure? Protocol says we should deploy no more than two around a single planet.'");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Hey, I'm the captain. It's my bonus on the line here. Get those satellites deployed.'");
      }
    }
    else if (number > (5 - char.deployProbeTotal)) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Are you sure? Protocol says we should deploy no more than five on a single planet.'");
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Hey, I'm the captain. It's my bonus on the line here. Get those probes deployed.'");
    }

    if (char.deployProbeAction === 0 || char.deployProbeAction === 4) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Okay captain.'");
      char.setAgenda(["walkTo:probes_aft:" + Quest.lang.getName(char, { article: Quest.Utilities.DEFINITE }) + " goes to the probe deployment console.", "text:deployProbe:" + number])
      char.deployProbeAction = 0;
      char.deployProbeCount = 0;
    }
    else {
      // already part way through launching
      // skip walking there, skip first deploy action
      // the old number should be replaced
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Okay captain.'");
      char.setAgenda(["text:deployProbe:" + number])
      char.deployProbeAction = 1;
    }
    return true;
  },
  launchCounter: 0,
  status: "In flight",
  countAtLoc: function (loc: any) { return 0; },
  eventIsActive: function () { return this.clonePrototype },
  cloneMe: function (owner: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    const probe = Quest.World.cloneObject(this)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'alias' does not exist on type '{}'.
    probe.alias = Quest.Utilities.sentenceCase(owner.probeType) + " " + Quest.Utilities.toRoman(owner.deployProbeOverallTotal)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'probeType' does not exist on type '{}'.
    probe.probeType = owner.probeType
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'planetNumber' does not exist on type '{}... Remove this comment to see the full error message
    probe.planetNumber = Quest.World.w.Xsansi.currentPlanet
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'probeNumber' does not exist on type '{}'... Remove this comment to see the full error message
    probe.probeNumber = owner.deployProbeTotal
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'owner' does not exist on type '{}'.
    probe.owner = owner.name
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'parserPriority' does not exist on type '... Remove this comment to see the full error message
    probe.parserPriority = -100
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'eventScript' does not exist on type '{}'... Remove this comment to see the full error message
    probe.eventScript = (owner.probeType === 'satellite' ? this.satelliteEventScript : this.probeEventScript)
    return probe
  },

  probeEventScript: function () {
    this.launchCounter++
    if (this.launchCounter === TURNS_TO_LANDING) {
      if (probeLandsOkay()) {
        this.status = "Landing";
        shipAlert(this.alias + " has successfully landed on the planet.");
      }
      else {
        shipAlert("Contact with " + this.alias + " has been lost as it attempted to land on the planet.");
        this.launched = false;
        this.status = "Destroyed";
      }
    }
    if (this.launchCounter === TURNS_TO_LANDING + 1) {
      this.status = "Exploring";
    }
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const arr = PLANETS[this.planetNumber][this.probeType.substring(0, 3) + "ProbeRanks"][this.probeNumber - 1]
    if (arr !== undefined && arr.includes(this.launchCounter - TURNS_TO_LANDING)) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      Quest.World.w[this.owner]["rank" + this.planetNumber]++
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      Quest.World.player.bonus += PLANETS[this.planetNumber][this.probeType.substring(0, 3) + "ProbeBonusPerRank"]
    }
  },

  satelliteEventScript: function () {
    this.launchCounter++
    if (this.launchCounter === TURNS_TO_ORBIT) {
      this.status = "In orbit"
      shipAlert(this.alias + " has successfully entered orbit around the planet.")
    }
    if (this.launchCounter === TURNS_TO_ORBIT + 1) {
      this.status = "Scanning"
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      Quest.World.w[this.owner].deployProbeAction++
    }
    if (this.launchCounter > TURNS_TO_ORBIT + 1 && this.launchCounter % 4 === 0) {
      Quest.World.player.bonus += 1
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      Quest.World.w[this.owner].rank++
    }
  },

})



