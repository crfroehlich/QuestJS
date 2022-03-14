"use strict"



register('medieval', {
  book: 'Hamlet',
  uniform: 'a startling blue and red uniform that is especially uncomfortable',
  smell: 'The room does not smell good; there is a definitely odour of dung.',
  listen: 'Mandy can hear nothing.',
  floor: "The floor is rough wood.",
  walls: "The walls are all rough-cut stone.",
  door: "The door is wood; panelled and unpainted.",
  ceiling: "The ceiling is wood, like the floor, supported by thick beams.",
})





// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("great_gallery", {
  windowsface: 'north',
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  examine_ceiling: function () { msg("The stone bricks of the walls curve over to form a vaulted roof to the room.") },
  desc: "The great gallery is a wooden platform that overlooks the great hall, running along the north and east sides of it. A wide flight of wooden stairs leads back down to the hall, while a narrow spiral staircase goes further upwards. The walls are of rough-cut stone. There is a rather low doorway north, and further exits east, south and west.{if:spike:alias:mangled metal: There is a black line running from the observatory, down to the Great Hall.}",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  down: new Exit("great_hall"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  south: new Exit("solar"),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  north: new Exit("nursery", { msg: 'Mandy has to stoop to get through the narrow door to the north.' }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  east: new Exit("brass_dining_room", {
    simpleUse: function (char: any) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'brass_dining_room' does not exist on typ... Remove this comment to see the full error message
      if (w.brass_dining_room.blocked()) return falsemsg("Mandy starts heading east, but the dining room is now so full of mannequins, she cannot get into it.")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
      return Quest.Utilities.util.defaultSimpleExitUse(char, this)
    }
  }),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  up: new Exit("observatory"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Exit("greenhouse_catwalk_east"),
  afterEnter: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'uniform' does not exist on type '{}'.
    if (w.uniform.wet === 4) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'uniform' does not exist on type '{}'.
      w.uniform.wet = 2
    }
  },
  scenery: [
    { alias: ['balustrade', 'banister', 'handrail'], examine: 'A study, but rough-cut balustrade runs the length of the gallery.' },
    { alias: 'stairs', examine: 'The stairs look old and well-used.' },
  ],
  silverSighting: {
    8: 'Mandy sees a silver figure in the great hall below her. It seems to be sniffing the floor, but then it looks up at Mandy, skitters away, heading west.',
    14: 'Mandy can see another silver figure on the floor below. Again it seems to be studying the floor, before running off.',
  },
  // @ts-expect-error ts-migrate(1117) FIXME: An object literal cannot have multiple properties ... Remove this comment to see the full error message
  afterEnter() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    if (this.silverSighting[this.visited % 15]) msg(this.silverSighting[this.visited % 15])
  },
})




// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("great_hall", {
  windowsface: 'north',
  desc: "The great hall is an impressive size. It looks older than the rest of the house, a lot older, being built of rough-cut stone. There are large double doors to the west, and a wooden staircase leads up to a wooden gallery that runs along the west side of the hall. To the south, a doorway leads to a flight of steps heading downwards.{if:spike:alias:mangled metal: There is a black line running from the gallery, down to the lab.}",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  examine_ceiling: function () { msg("The stone bricks of the walls curve over to form a vaulted roof to the room, up above the gallery.") },
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  up: new Exit("great_gallery"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  down: new Exit("mad_science_lab"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  south: new Exit("mad_science_lab"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Exit("greenhouse_east"),
  afterEnter(exit: any) {
    if (this.visited === 9) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'greenhouse_east' does not exist on type ... Remove this comment to see the full error message
      if (exit.origin === w.greenhouse_east) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Mandy sees a flash of silver as a figure darts up the stairs at the other end of the room.")
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Mandy sees a flash of silver as a figure darts out the doors at the other end of the room, heading into the greenhouse.")
      }
    }
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("great_hall_floor", {
  scenery: true,
  alias: "floor",
  loc: "great_hall",
  synonyms: ["ground", 'flagstones'],
  examine: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("The floor is composed of flagstones, of the same mid-grey as the walls. It looks a little uneven in places.")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'great_gallery' does not exist on type '{... Remove this comment to see the full error message
    if (w.great_gallery.visited > 7) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Remembering the interest the silver figure had in the floor, Mandy examines that patch of it especially well, but it looks as boring as the rest.")
    }
  },
  smell: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'great_gallery' does not exist on type '{... Remove this comment to see the full error message
    if (w.great_gallery.visited > 7) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Mandy thinks about the silver figure sniffing the floor. Most of the flagstones just smell somewhat musty, but there is one - more or less when the silver was sniffing - that smells distinctly of lavender.")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The floor smells vaguely unpleasant; kind of musty.")
    }
  },
})




// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("solar", {
  windowsface: 'south',
  desc: "The solar. Mandy knows the name from history class; this is where the lord of the castle would sleep. None too comfortable to Mandy's eyes, but possibly the height of luxury a thousand years ago. A large bed, crudely built of wood; a tapestry hung from one wall{if:chamber_pot:scenery:; a chamber pot under the bed}.",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  north: new Exit("great_gallery"),
  scenery: [
    { alias: 'bed', examine: 'The bed is a four-poster, but not ornate at all, and surprisingly small; probably a bit wider than her own bed, but not as long.' },
    { alias: 'tapestry', examine: 'The tapestry has a rather impressive image of a knight fighting a dragon, though time has muted the colours.' },
  ],
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("chamber_pot", SIZE_CHANGING(), VESSEL(), {
  loc: "solar",
  synonyms: ['chamberpot'],
  scenery: true,
  underLeakState: 0,
  underLeak: false,
  underTree: false,
  flipped: false,
  msgTake: "Mandy takes the chamber pot, trying desperately not to think about what it has been used for. At least it is empty...",
  desc5: 'A chamber pot, useful for... something?{chamber_pot}',
  desc4: 'A tiny chamber pot, probably not useful for anything.{chamber_pot}',
  desc6: 'A huge chamber pot, useful for... She decides she would rather not think about that!{chamber_pot}',
  desc7: 'An enormous chamber pot, almost big enough to use as a boat!{chamber_pot}',
  desc8: 'A gigantic chamber pot; it is probable as big as her bedroom inside.',
  testFill: function (options: any) {
    if (this.size > 5) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Mandy thinks about filling the chamber pot with " + options.fluid + ", but it is so big, she would never be able to lift it.")
      return false
    }
    if (options.fluid === 'water' && player.loc === 'beach') {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Mandy thinks about filling the chamber pot with water from the sea, but just the sight of those bodies in it is making her feel nauseous. No way is she going near that water.")
      return false
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
    if (w.chamber_pot.underLeakState > 0) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy empties the tiny bit of oily water out of the chamber pot.')
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      w.chamber_pot.underLeakState = 0
    }
    return true
  },
  nameModifierFunction: function (list: any) {
    if (this.containedFluidName) list.push('full of ' + this.containedFluidName)
  },
  testCarry: function () {
    if (this.loc === player.name && this.size === 7 && this.containedFluidName) return falsemsg('Mandy starts to the door, but the weight of the enormous chamber pot full of {show:fluid} is just too much for her to lug around.', { fluid: this.containedFluidName })
    return true
  },
  afterMove: function () {
    this.msgTake = Quest.lang.take_successful
    this.underLeak = false
    this.underTree = false
    this.flipped = false
  },
  use: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Mandy looks at the chamber pot. She could actually do with a wee, but the thought of using that... No, she can wait.")
  },
  eventPeriod: 1,
  eventIsActive: function () {
    return this.underLeak
  },
  eventScript: function () {
    this.underLeakState++
    if (this.underLeakState > 20) this.containedFluidName = "water"
  }
})
// @ts-expect-error ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
tp.addDirective("chamber_pot", function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
  if (w.chamber_pot.underLeakState > 0) return ' It has a tiny bit of oily water in it.'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
  if (w.chamber_pot.flipped) return ' It is upside down.'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
  if (!w.chamber_pot.containedFluidName) return ''
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
  return ' It is full of ' + w.chamber_pot.containedFluidName + '.'
})




// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("mad_science_lab", {
  windowsface: 'none',
  alias: "mad science laboratory",
  smell: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'spike' does not exist on type '{}'.
    if (w.spike.alias === 'mangled metal') {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("There is a strong smell burnt flesh -- disturbingly like barbecue -- and ozone.")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Mandy warily sniffs the air; it is not a pleasant smell. Acrid, a bit like vinegar, but not quite.")
    }
  },
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  examine_floor: function () { msg("The floor is packed earth; there are patches that look darker, where something might have been spilt perhaps.") },
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  examine_ceiling: function () { msg("The stone bricks of the walls curve over to form a vaulted roof to the room.") },
  desc: function () {
    let s = "This appears to be some kind of laboratory, though nothing like the ones at school. While they have their own distinctive smell, this room is "
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'spike' does not exist on type '{}'.
    s += w.spike.alias === 'mangled metal' ? 'altogether worse, with a strong smell of burnt rubber' : 'different, though Mandy is not sure what it is'
    s += ". The room is dominated by a very solid wooden bench"
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'patchwork_body' does not exist on type '... Remove this comment to see the full error message
    if (w.patchwork_body.isHere("this")) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'patchwork_body' does not exist on type '... Remove this comment to see the full error message
      if (w.patchwork_body.loc || w.Patch.state === 0) {
        s += ", with a corpse on it; is it there to be dissected?"
      }
      else {
        s += ", with a patchwork body on it."
      }
      s += " A strange device stands at the head of the table, connected to the body by a number of thick wires"
    }
    else {
      s += ". At one end of the bench a strange device stands with wires dangling from it"
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
    if (w.wire.scenery) {
      s += ", and a coil of wire sits on the floor beside it"
    }
    s += ". Above the table, a crocodile is suspended."
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mad_science_journal' does not exist on t... Remove this comment to see the full error message
    if (w.mad_science_journal.scenery) {
      s += " Mandy can also see a journal lying in a corner, as though tossed there in anger."
    }
    return s
  },
  afterEnter: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
    if (w.wire.tiedTo2 === 'spike') {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Suddenly there is a crack of thunder, so loud Mandy can hear it even down here. Mandy shrieks in shock at a bright flash that she thinks at first is the lightning, but then realises is the wire suddenly, and very briefly, glowing white-hot.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("There is a smell of ozone and burnt flesh and, as her pounding heart slows again, she sees that smoke is coming from the strange device.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Then she notices the body on the bench twitching. It raises its right arm, and looks at it. 'It's alive!' Mandy cackles, because, really, what else is one supposed to do after animating a body with lightning?")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'spike' does not exist on type '{}'.
      w.spike.setAlias('mangled metal')
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
      delete w.wire.tiedTo2
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
      delete w.wire.loc
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'patchwork_body' does not exist on type '... Remove this comment to see the full error message
      w.patchwork_body.transform(w.Patch)
    }
  },
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  up: new Exit("great_hall"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  north: new Exit("great_hall"),
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("stuffed_crocodile", TAKEABLE(), CONTAINER(true), { // cannot get taken to size change rooms
  loc: "mad_science_lab",
  scenery: true,
  parserPriority: 50,
  examine: "The crocodile is a little over a metre long, and hanging from the ceiling on four wires. It looks like it is stuffed, and it is kind of creepy imagining that once it had been alive.{ifNot:stuffed_crocodile:closed: Its mouth is wide open, and one tooth {if:crocodile_tooth:loc:stuffed_crocodile:looks lose:is missing}.}",
  testTake: function (options: any) {
    if (!this.scenery) return true
    if (options.char.postureFurniture === "mad_science_bench" && options.char.posture === "standing") {
      this.msgTake = 'Mandy can just about reach the crocodile from the bench. She reaches up, and gives it a good pull, yanking the fixing from the ceiling in a shower of dust.'
      return true
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
    if (options.char !== w.Patch) return falsemsg('The crocodile is too high for {nm:char:the} to reach.', { char: options.char })
    return true
  },
  msgTake: 'Patch looks up at the crocodile for a moment. He reaches up, and gives it a good pull, yanking the fixing from the ceiling in a shower of dust.',
  afterMove: function (options: any) {
    this.msgTake = Quest.lang.take_successful
  },
  testCarry: function (options: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (options.char === player) return falsemsg("Mandy thinks about heading off... She hoists up the crocodile to get the better grip, but it is just too big! No way is she going anywhere whilst carrying this thing.")
  },
  testDropIn: function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'crocodile_tooth' does not exist on type ... Remove this comment to see the full error message
    if (options.item === w.crocodile_tooth) return falsemsg("The tooth does not seem to want to go back into the crocodile's mouth. Mandy shrugs; no big deal.")
    falsemsg("Mandy contemplates putting {nm:item:the} in the mouth of the crocodile. People have handbags made out of crocodiles, right? It suddenly occurs to her that the crocodile will be skinned, and its leather used to make the bag, rather than putting things down the corpse's gullet.", options)
  },
  testOpen: function (options: any) { return this.testTake(options) },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("crocodile_tooth", SIZE_CHANGING(), {
  loc: "stuffed_crocodile",
  sharp: true,
  desc5: "The tooth is a couple of centimetres long, and very sharp.",
  desc6: "The tooth is huge - about as long as Mandy's arm - and very sharp.",
  testTake: function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stuffed_crocodile' does not exist on typ... Remove this comment to see the full error message
    if (this.loc !== "stuffed_crocodile" || !w.stuffed_crocodile.scenery) return true
    if (options.char.postureFurniture === "mad_science_bench" && options.char.posture === "standing") return true
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
    if (options.char !== w.Patch && this.loc === "stuffed_crocodile" && w.stuffed_crocodile.scenery) return falsemsg('The crocodile is too high for {nm:char:the} to reach.', { char: options.char })
    return true
  },
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("mad_science_bench", FURNITURE({ recline: true, sit: true, stand: true }), {
  loc: "mad_science_lab",
  synonyms: ['table'],
  scenery: true,
  alias: "bench",
  examine: "The wood of the bench has black rings and circles scorched into it, testament to years of use. Or perhaps a week of use by an inept experimenter, Mandy muses.",
  take: 'The bench is far to heavy for Mandy to pick up.',
  testPostureOn: function (options: any) {
    let phrase = ''
    if (options.posture === 'reclining') phrase = 'lying down'
    if (options.posture === 'sitting') phrase = 'sitting down'
    if (options.posture === 'standing') phrase = 'standing up on the bench'
    let s = "The thought of " + phrase + " next to a body assembled from numerous corpses makes Mandy feel sick."

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'patchwork_body' does not exist on type '... Remove this comment to see the full error message
    if (w.patchwork_body.loc === "mad_science_lab") return falsemsg(s)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
    if (w.Patch.isHere() && !w.boots.isAtLoc("Patch")) return falsemsg(s + " The fact that said body is now moving makes the prospect no more appealing.")
    return true
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("patchwork_body", {
  loc: "mad_science_lab",
  alias: "patchwork body",
  synonyms: ['corpse'],
  scenery: true,
  state: 0,
  examine: function () {
    this.state = 1
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Mandy gingerly inspects the corpse on the table. It is naked, but nothing to suggest it is either male or female. Mandy decides she does not want to look too closely at {i:that} situation. As she looks closer, she can see stitch marks, and with a growing sense of nausea, she realises it is not a corpse, but the stitched together parts of {i:several} corpses.")
  },
  take: 'Mandy thinks about picking up the body... Not going to happen.',
  shift: 'Mandy thinks about shifting the body off the table. She would have to touch it to do that. And really, why would she want to?',
})
// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("patchwork_body_stiches", COMPONENT("patchwork_body"), {
  alias: "stitches",
  synonyms: ['marks', 'parts'],
  examine: 'Mandy looks closer at the stitching holding the patchwork body together. She has to acknowledge that the needlework is good quality - and presumably all done by hand. She remembers her own efforts at making oven gloves at school, and that was with a machine. Not good.',
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("Patch", NPC(false), {
  alias: "animated corpse",
  synonyms: ['patch', 'patchwork body', 'animated corpse'],
  state: 0,
  afterMove: function () {
    this.huggingTree = false
    delete this.goUpDirection
  },
  hug: "He might be made from a collection of disparate body parts, but there is something quite endearing about Patch. Mandy gives him a big hug, and he grins at her.",
  examine: function () {
    let s
    if (this.state === 0) {
      s = "Mandy looks at the creature she bought to life. It is about two and a half metres tall, and very solidly built. Patches of it are hairy, other patches are dark skinned, some light skinned. Its face is not attractive, it too is a mishmash of parts. Mandy really does not want to know where all the parts came from. However, it needs a name... 'I'll call you Patch,' she says. It nods it head, possibly in acknowledgement."
      this.setAlias("Patch")
      this.state = 1
    }
    else {
      s = "Mandy looks at Patch, the creature she bought to life. He is about two and a half metres tall, and very solidly built. Patches of him are hairy, other patches are dark skinned, some light skinned. His face is not attractive, it too is a mishmash of parts. Mandy really does not want to know where all the parts came from."
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
    if (w.boots.isAtLoc("Patch")) {
      s += " He is wearing a pair of boots."
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
    const held = Quest.Utilities.scopeHeldBy(w.Patch)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'remove' does not exist on type '{}'.
    Quest.Utilities.array.remove(held, w.boots)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'remove' does not exist on type '{}'.
    Quest.Utilities.array.remove(held, w.boots_toe)
    if (held.length > 0) s += ' He is holding ' + Quest.Utilities.formatList(held, { article: Quest.Utilities.INDEFINITE, lastJoiner: 'and' }) + '.'
    if (this.huggingTree) s += '|He is currently hugging a tree.'
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg(s)
  },
  talktoOptions: [
    "'So, do you come here often?' Mandy asks Patch. He gave no indication either way.",
    "'Tell me about yourself!' says Mandy to Patch. His silence suggested there is not much to tell. Or he is unable to talk.",
    "'Where now, do you think?' Mandy asks Patch. Patch seems as stumped as Mandy.",
  ],
  kill: 'Mandy contemplates killing Patch... Would it be murder, given he is made up of dead bodies anyway? And she game him life, so that must mean she has the right to take it away; she is sure she has heard people say that about God. On the other hand, if she did kill him, would that be considered a massacre, given he is made up all numerous bodies -- would she get blamed for killing all them? She decides it is not worth the legal nightmare that would ensue.',
  talkto: function () {
    if (this.state === 0) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'I shall call you \"Patch\",' declares Mandy.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The animated body seems to stand a little taller, Mandy thinks, proud to have a name.")
      this.setAlias("Patch")
      this.state = 1
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(this.talktoOptions[Quest.Random.rndm.int(2)])
    }
    return true
  },
  getAgreement: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
    if (w.boots.loc !== 'Patch') return falsemsg("Patch looks mournfully at his feet. His bare feet.")
    return true
  },
  endFollow: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg("'Wait here,' says Mandy to {nm:npc:the}.", { npc: this })
    if (!this.leaderName) return falsemsg("{nv:npc:look:true} at Mandy in confusion.", { npc: this })
    this.setLeader()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg("{nv:npc:nod:true} his head.", { npc: this })
    return true
  },
  startFollow: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg("'Follow me,' says Mandy to {nm:npc:the}.", { npc: this })
    if (this.leaderName) return falsemsg("{nv:npc:look:true} at Mandy in confusion.", { npc: this })
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
    if (w.boots.loc !== 'Patch') return falsemsg("Patch looks mournfully at his feet. His bare feet.")

    this.setLeader(player)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg("{nv:npc:nod:true} his head.", { npc: this })
    return true
  },
  testFollowTo: function (room: any) {
    if (room && !room.noFollow) return true
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Mandy realises Patch is no longer following her.")
    this.setLeader()
    return false
  },
  hasPod: function () {
    const l = Quest.Utilities.scopeHeldBy(this)
    for (const el of l) {
      if (el.name.startsWith('tamarind_pod_prototype')) return true
    }
    return false
  },
  receiveItemsFailMsg: function (options: any) {
    options.item.loc = this.loc
    return falsemsg("Mandy gives {nm:item:the} to {nm:Patch:the}. {nv:Patch:look} at {sb:item} in confusion, before dropping {sb:item} to the floor.", options)
  },
  receiveItems: [
    {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
      item: w.boots,
      f: function (options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
        if (w.boots.size < 5) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ item: any... Remove this comment to see the full error message
          options.item.loc = this.loc
          return falsemsg("Mandy gives the boots to {nm:npc:the}. He looks at the tiny footwear in confusion, before dropping them on the floor.", options)
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
        if (!w.boots.mended) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ item: any... Remove this comment to see the full error message
          options.item.loc = this.loc
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
          w.boots.rejectedForHole = true
          return falsemsg("Mandy gives the boots to {nm:npc:the}. He looks at the footwear at first with a big smile, which turns into a forlorn frown when he finds the right boot is coming apart. With a glum expression, he drops them on the floor.", options)
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'secret_recipe' does not exist on type '{... Remove this comment to see the full error message
        if (w.secret_recipe.loc === 'boots_room') {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ item: any... Remove this comment to see the full error message
          options.item.loc = this.loc
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          msg("Mandy gives the boots to {nm:npc:the}. He looks at the footwear with a big smile, then proceeds to pull on the left boot... Suddenly his grin turns to a frown, and he pulls off the boot, dropping both on the floor.", options)
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
          if (w.boots.rejectedForHole = true) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'For fuck's sake,' mutters Mandy, 'now what? Is there a stone in it or something?'")
          }
          else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'What the...' mutters Mandy, 'Is there a stone in it or something?'")
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
          w.boots.rejectedForStone = true
          return false
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ item: an... Remove this comment to see the full error message
        options.item.loc = this.name
        options.item.worn = true
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'animated' does not exist on type '{ item... Remove this comment to see the full error message
        this.animated = true
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        msg("Mandy gives the boots to {nm:npc:the}. He looks at the footwear with a big smile, then proceeds to pull on the left boot... Then the right. He looks at them, now on his feet, for a moment, before getting off the bench, and standing upright, ripping of all the wires connecting him to the strange device.", options)
      },
    },
  ],
  askOptions: [
    { // boots
      test: function (p: any) { return p.text.match(/boot/); },
      script: function (p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'What's the big deal about the boots?' asks Mandy. Patch just stares at her.")
      }
    },
    {
      test: function (p: any) { return true },
      script: function (p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Tell me about " + p.text + ",' says Mandy. Patch just stares at her")
      }
    },
  ],
  tellOptions: [
    {
      test: function (p: any) { return true },
      script: function (p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Mandy starts to tell Patch about " + p.text + ". He looks at her intensely, but she gets the feeling he has no idea what she is saying.")
      }
    },
  ],
})
// @ts-expect-error ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
w.Patch.nameModifierFunctions[0] = function (item: any, l: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
  if (w.boots.loc === 'Patch') l.push('wearing a pair of boots')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
  const held = Quest.Utilities.scopeHeldBy(w.Patch)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'remove' does not exist on type '{}'.
  Quest.Utilities.array.remove(held, w.boots)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'remove' does not exist on type '{}'.
  Quest.Utilities.array.remove(held, w.boots_toe)
  if (held.length > 0) l.push('holding ' + Quest.Utilities.formatList(held, { article: Quest.Utilities.INDEFINITE, lastJoiner: 'and' }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
  if (w.Patch.huggingTree) l.push('hugging a tree')
}

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("strange_device", {
  loc: "mad_science_lab",
  alias: "strange device",
  synonyms: ['strange machine'],
  scenery: true,
  switchon: 'Mandy tries to turn on the strange device, but there seems to be no power to it.',
  switchoffn: 'It is already off.',
  examine: function () {
    let s = "The machine at the head of the table is about a metre and a half tall; a wooden cabinet, with brass fittings. On the front are a series of dials and knobs. "
    let body
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'patchwork_body' does not exist on type '... Remove this comment to see the full error message
    if (w.patchwork_body.isAtLoc("mad_science_lab")) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'patchwork_body' does not exist on type '... Remove this comment to see the full error message
      body = w.patchwork_body
      s += " About a dozen wires run from the machine to the body, each attached to its own brass bolt on the machine, and to a clip on the torso."
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
    else if (!w.Patch.animated) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
      body = w.Patch
      s += " About a dozen wires run from the machine to {nm:item:the}, each attached to its own brass bolt on the machine, and to a clip on his torso."
    }
    else {
      s += " About a dozen wires hang down from the machine, each attached to its own brass bolt on the machine."
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'spike' does not exist on type '{}'.
    if (w.spike.alias === 'mangled metal') s += ' There is smoke coming from the back of it.'
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg(s, { item: body })
  },
  use: "Mandy gives the knobs on the strange device a twist, but nothing happens. She gives it a kick, but that is no more successful.",
  attachable: true,
  testAttach: function (options: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return falsemsg("Mandy thinks about attaching the wire to the the strange device... But the other end is already soldered to it, and she decides having one end fixed to it is enough.")
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("device_controls", COMPONENT("strange_device"), {
  scenery: true,
  synonyms: ['dials', 'knobs'],
  examine: "There are three black knobs, each set to about half way between zero and ten. Each has a dial above, each reading exactly zero.",
  parserPriority: -10,
  use: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Mandy looks at the complicated controls on the strange device. She probably should not mess with them.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("'Ah, what the hell...' She turns the knob on the left clockwise a bit, then a bit more. Then all of them as far as they can go, and then turns them all the other way as far as they can go. Nothing happens.")
    return false
  },
  turn: function () { return this.use() },
  attachable: true,
  testAttach: function (options: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return falsemsg("Mandy thinks about attaching the wire to the the strange device... But the other end is already soldered to it, and she decides having one end fixed to it is enough.")
  },
})
// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("bolts", COMPONENT("strange_device"), {
  synonyms: ['pads', 'wires'],
  examine: "There are twelve bolts on the strange device, in a row under the control panel. {ifExists:patchwork_body:loc:Each has a wire that runs to a pad on the patchwork body:Each has a wire dangling from it}.",
  attachable: true,
  rope: true,
  parserPriority: 15,
  testAttach: function (options: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return falsemsg("Mandy thinks about attaching the wire to the the strange device... But the other end is already soldered to it, and she decides having one end fixed to it is enough.")
  },
  handleUntieFrom: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return failedmsg('Mandy thinks about detaching the wires, but decides to leave it alone. {ifExists:patchwork_body:loc:Just has a weird feeling it is important that they stay attached to the body:They are no use to her, and not doing any harm just dangling there}.')
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("wire", ROPE(8, "strange_device"), {
  loc: "mad_science_lab",
  alias: "wire",
  synonyms: ['coil of wires', 'wires', 'cable'],
  pronouns: Quest.lang.pronouns.massnoun,
  indefArticle: 'some',
  scenery: true,
  parserPriority: 10,
  msgUnwind: "The wire trails behind as Mandy unwinds it.",
  msgWind: "Mandy coils up the wire.",
  msgTake: "She takes the coil of wire.",
  examine: function () {
    let s = "The wire is about a millimetre thick, and "
    let length = this.locs.length
    if (this.isHeld()) length--
    if (length === 1) {
      s += "she guesses there is about " + Quest.lang.toWords(5 * this.ropeLength) + " metres of it, the end of which is soldered to the side of the machine at the head of the table."
    }
    else if (length === 2) {
      s += "she guesses there is about twenty metres of it on the spindle, which is also metal, and more heading down the stairs to the laboratory."
    }
    else if (length === this.ropeLength - 1) {
      s += "there is not much left."
    }
    else if (length === this.ropeLength) {
      s += "she is holding just the end of it."
    }
    else {
      s += "she guesses there is about " + Quest.lang.toWords(5 * (this.ropeLength - length)) + " metres of it in a coil; more is heading back to the laboratory."
    }
    this.examined = true
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg(s)
  },

  suppessMsgs: true,
  attachTo: function (char: any, item: any) {
    if (this.locs[this.locs.length - 1] === player.name) this.locs.pop()
    this.locs.push(item.name)
    this.tiedTo2 = item.name
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'spike' does not exist on type '{}'.
    if (item === w.spike) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Mandy wraps the wire from the spindle around the letter E on the weather vane, then lets the spindle drop, happy that it is secure.")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sky' does not exist on type '{}'.
      if (w.sky.state < 5) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sky' does not exist on type '{}'.
        w.sky.state = 5
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("A brief flash of lightning lights up the weather vane, and a few seconds later Mandy hears the thunder.")
      }
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("Mandy attaches the wire from the spindle to {nm:item:true}, then lets the spindle drop.", { item: item })
    }
  },
  detachFrom: function (char: any, item: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (!this.tiedTo2) return falsemsg("Mandy looks at where the wire is soldered to the strange device. That is not coming of there.")

    this.tiedTo2 = false
    this.locs.pop()
    this.locs.push(player.name)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'spike' does not exist on type '{}'.
    if (item === w.spike) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Mandy unwraps the wire from the spindle around the letter E on the weather vane.")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("Mandy detaches the wire from {nm:item:true}.", { item: item })
    }
  },

  afterMove: function () {
    if (!this.examined) {
      this.examined = true
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Mandy realises one end of the wire on the spindle is soldered to the strange machine.")
    }
    if (!this.moved) this.moved = true
  },
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("mad_science_journal", SIZE_CHANGING(), {
  loc: "mad_science_lab",
  scenery: true,
  read: "Mandy leafs though the {if:mad_science_journal:size:4:tiny }{if:mad_science_journal:size:6:huge }journal, scanning the pages. Most of it makes as little sense as her \"Chemistry in Context\" text book, and the handwriting does not help. What the hell is a homunculus? The last third of the journal is empty, but the last entry says: \"I am so near, all I need is the vital spark. Weather vane on the Great Hall?\"",

  desc4: "The journal is about the size of a postage stamp; it looks like various things have been spilled on it, including acid, given the entire bottom right corner is missing. It looks old too -- or at least old-fashioned -- and is bound in leather.",
  desc5: "The journal is in a bad condition; it looks like various things have been spilled on it, including acid, given the entire bottom right corner is missing. It looks old too -- or at least old-fashioned -- and is bound in leather.",
  desc6: "The journal is as big as a table, and its bad condition is even more apparent; it looks like various things have been spilled on it, including acid, given the entire bottom right corner is missing. It looks old too -- or at least old-fashioned -- and is bound in leather.",

})












/*


This room resets when the balloon touches the floor

The player needs to:
enter
open doll's house
talk to man
give boots to man
wait
get boots

get balloon, touch, move, knock, etc. heads it up,



*/



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("nursery", {
  windowsface: 'north',
  noFollow: true,
  desc: "This seems to be a nursery, or at least what a nursery might have looked like a century ago. {if:china_doll:scenery:A china doll sits on a chair, and there is a doll's house near them:On the far side of the room, there is a chair and a doll's house}. Mandy can also see a cream-painted cot near the window{ifExists:yellow_balloon:loc:, and a balloon..}. The only way out is back south.",
  afterEnter: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'yellow_balloon' does not exist on type '... Remove this comment to see the full error message
    w.yellow_balloon.state = 0
  },
  afterExit: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'yellow_balloon' does not exist on type '... Remove this comment to see the full error message
    w.yellow_balloon.reset()
  },
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  south: new Exit("great_gallery", { msg: "Mandy ducks down to go out the door, and as she does a sudden flash of light momentarily disorientates her." }),
  hereish: function (o: any) {
    return ['nursery', 'dollshouse', 'tiny_man'].includes(o.loc)
  }
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("nursery_chair", FURNITURE({ sit: true }), {
  alias: 'chair',
  loc: "nursery",
  scenery: true,
  examine: 'A simple wooden chair; small, as though for a child.',
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("nursery_cot", FURNITURE({ sit: true, recline: true }), {
  alias: 'cot',
  loc: "nursery",
  scenery: true,
  examine: 'A simple cot, of unpainted wood.',
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  testPostureOn: function () { return falsemsg("Mandy looks at the cot, and decides it is too small for her.") },
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("china_doll", SIZE_CHANGING(), {
  scenery: true,
  loc: "nursery",
  alive: true,
  parserPriority: 5,
  testTake: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (this.alive) return falsemsg("Mandy tries to grab the china doll, but she is a bit more tricky to grab hold off now she is a live. There is also the moral question of whether Mandy should be picking up a living person too.")
    return true
  },
  msgTake: "{if:china_doll:scenery:Mandy picks up the china doll because you never know when a creepy toy is going to come in useful. The body is soft and floppy, and the contrast with the head is a little disturbing.|'Help me!' says a tiny voice. Was that the doll speaking?:Mandy picks up the china doll.}",
  desc5: "The doll is about forty centimetres tall, or would be if she was standing upright -- she clearly is supposed to be female. Her head and shoulders are glazed porcelain, including her dark hair and blue eyes; she has very rosy cheeks. She is wearing quite a fancy burnt umber dress, with belt and buttons. There is something creepy about her.",
  desc4: "The doll is small enough to fit comfortably in Mandy's palm. Her head and shoulders are glazed porcelain, including her dark hair and blue eyes; she has very rosy cheeks. She is wearing quite a fancy burnt umber dress, with belt and buttons. She is decidedly less creepy this size.",
  desc3: "The china doll is so small, Mandy can hardly see it.",
  desc6: "The doll would be considerably taller than Mandy if she were standing upright. Her head and shoulders are glazed porcelain, including her dark hair and blue eyes; she has very rosy cheeks. She is wearing quite a fancy burnt umber dress, with belt and buttons. Definitely creepy.",
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("china_doll_dress", COMPONENT("china_doll"), {
  scenery: true,
  alias: 'dress',
  examine: 'The reddish brown dress is quite fancy, if old fashioned, and equipped with all the accessories of a proper dress albeit in miniature. {ifMoreThan:china_doll:size:5: Well, not in miniature now, but it was when she first saw it.} There seems to be no way to get the dress off the doll, in fact, Mandy suspects the doll\'s torso is just stuffing inside the dress.'
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("yellow_balloon", {
  loc: "nursery",
  scenery: true,
  alias: "yellow balloon",
  states: [
    'The balloon is near the ceiling, but seems to be falling...',
    'The balloon, gently falling from the ceiling, is at about head height.',
    'The balloon has drifted down to about waist height.',
    'The balloon is at knee height, floating downwards.',
    'Mandy watches the balloon as it drifts down, to touch the floor...',
  ],
  state: 0,
  eventPeriod: 1,
  eventIsActive: function () { return player.loc === 'nursery' && this.loc === 'nursery' },
  eventScript: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg(this.states[this.state])
    this.state++
    if (this.state === this.states.length) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Suddenly everything goes white...")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(w.great_gallery.north.msg)
      this.reset()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(this.states[0])
      this.state++
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      for (const s of Quest.Settings.settings.roomTemplate) msg(s)
    }
  },
  reset: function () {
    // balloon burst, so no reset
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'yellow_balloon_remains' does not exist o... Remove this comment to see the full error message
    if (w.yellow_balloon_remains.loc) return

    this.state = 0

    // wire
    // either the wire is not here OR the player is holding it OR it is in the room
    // either the player is in the nursery or great_gallery
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
    if (w.wire.isAtLoc('nursery')) {
      log('sort wire')
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
      if (w.wire.locs[w.wire.locs.length - 1] === 'player') w.wire.locs.pop()
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
      if (w.wire.locs[w.wire.locs.length - 1] === 'nursery') w.wire.locs.pop()
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
      log(w.wire.locs)
      if (player.loc === 'nursery') {
        log('nursery')
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
        w.wire.locs.push('nursery')
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
      w.wire.locs.push('player')
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
      log(w.wire.locs)
    }

    // dollshouse
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dollshouse' does not exist on type '{}'.
    w.dollshouse.closed = true
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dollshouse' does not exist on type '{}'.
    w.dollshouse.hasBeenOpened = false
    // china doll
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'china_doll' does not exist on type '{}'.
    for (const el of [w.china_doll, w.nursery_cot, w.nursery_chair]) {
      el.scenery = true
      el.loc = "nursery"
    }
    // tiny man
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
    w.tiny_man.state = 0
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
    if (w.tiny_man.breakingIntoPod) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      w[w.tiny_man.breakingIntoPod].loc = player.name
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
      delete w.tiny_man.breakingIntoPod
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
    delete w.tiny_man.agenda

    // boots not mended if in the room
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'nursery' does not exist on type '{}'.
    if (w.nursery.hereish(w.boots)) w.boots.mended = false

    for (const key in w) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const o = w[key]
      // not interested in rooms, scenery or player
      if (o.room || o.scenery || o.player) continue
      // anything else in the nursery goes back to player inventory
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'nursery' does not exist on type '{}'.
      if (w.nursery.hereish(o)) o.loc = player.name
    }
  },
  examine: "The balloon is bright yellow, and pretty much spherical, except for the bit where it is blown up.",
  take: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Mandy tries to grab the balloon, but it bounces upwards, out of reach.")
    this.state = 0
  },
  'catch': function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Mandy tries to catch the balloon, but it bounces upwards, out of reach.")
    this.state = 0
  },
  smash: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Mandy tries to burst the stupid balloon, but it bounces out of reach, rising up to the ceiling.")
    this.state = 0
  },
  knockon: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Mandy knocks the balloon, sending it up to the ceiling.")
    this.state = 0
  },
  kick: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Mandy kicks the balloon, making it rise up to the ceiling.")
    this.state = 0
  },
  burst: function () {
    const sharp = player.getSharp()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (!sharp) return falsemsg("Mandy jabs her finger at the balloon, and it just bounces off. She jabs again, and then again, but does no better. she needs something sharp.")

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg("Mandy jabs at the balloon with {nm:item:the}, and it just bounces off. She jabs again, and then again, and finally the balloon pops! The remains drop to the floor. She resists the urge to grind the limp yellow remnants under her heel.", { item: sharp })
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'yellow_balloon_remains' does not exist o... Remove this comment to see the full error message
    this.transform(w.yellow_balloon_remains)
  },
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("yellow_balloon_remains", {
  pronouns: Quest.lang.pronouns.plural,
  alias: "remains of a yellow balloon",
  synonyms: ['remnants'],
  examine: "A ragged piece of yellow rubber.",
  take: 'Mandy wonders if the remains of a very annoying balloon are worth picking up. She decides they are not.',
  grind: "'Fuck it,' said Mandy, 'I {i:am} going to do it.' She stands over the remains of the yellow balloon, puts her heel down on it, and {i:grinds}. It feels good!",
  repair: 'Realistically, the yellow balloon is beyond repair.',
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("dollshouse", CONTAINER(true), {
  loc: "nursery",
  scenery: true,
  hasBeenOpened: false,
  openCount: 0,
  alias: "doll's house",
  synonyms: ['dollshouse', 'dollhouse', 'dolls house', 'doll house', 'doll\'s house', 'back,'],
  examine: function () {
    let s = "Like the room, the doll's house is old fashioned. Made of wood, the roof looks like maybe it has been carved to look like it is thatched. The walls are white, the window frames are metal, and it stands on a base painted green. "
    if (this.closed) {
      s += "It looks like the back would open up."
    }
    else {
      s += "The back is opened up, and inside Mandy can see a tiny man."
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg(s)
  },
  openMsg: function () {
    if (this.hasBeenOpened) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("She opens the doll's house. There is the little man; he looks at Mandy. 'You again, eh?'")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("She opens the doll's house. Inside, the house is perfectly furnished, complete with a little man, sat on a chair.")
      let s = "The little man looks at Mandy, a look of surprise on his face. 'Cor blimey, you're a big 'un!' "
      switch (this.openCount) {
        case 0: s += " Apparently he is alive!"; break;
        case 1: s += " Apparently he is alive! Mandy has a strange feeling of déjà vu..."; break;
        case 2: s += " Apparently he is alive! Mandy has a strange feeling of déjà vu, then a feeling of déjà vu about the feeling of déjà vu!"; break;
        case 3: s += " Apparently he is alive! Why is that not a surprise?"; break;
        default: s += " He is alive, just as she expected."; break;
      }
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(s)
      this.openCount++
      this.hasBeenOpened = true
    }
  },
  testDropIn: function (options: any) {
    log(options)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'china_doll' does not exist on type '{}'.
    log(w.china_doll)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'china_doll' does not exist on type '{}'.
    if (options.item === w.china_doll && w.china_doll.size === 4) return true
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'china_doll' does not exist on type '{}'.
    if (options.item === w.china_doll) return falsemsg("Mandy thinks about putting the china doll in the doll's house, but she is too big.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return falsemsg("Mandy thinks about putting {nm:item:the} in the doll's house, but maybe now is not the time to be playing in it.")
  },
  afterDropIn: function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'china_doll' does not exist on type '{}'.
    if (options.item === w.china_doll) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("After a moment, the china doll suddenly comes to life! She sits up, and looks around, then gets to her feet.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Blow me,' says the tiny man, 'you found me a friend, lady-giant! Mind, if you could get me one a bit less creepy next time, that would be even better.'")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'china_doll' does not exist on type '{}'.
      w.china_doll.alive = true
    }
  },
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("tiny_man", NPC(false), {
  loc: "dollshouse",
  scenery: true,
  alias: "tiny man",
  synonyms: ['little man', 'big bert', 'cuthbert'],
  state: 0,
  inSight: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dollshouse' does not exist on type '{}'.
    return player.loc === 'nursery' && !w.dollshouse.closed
  },
  agendaBootsDone: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("'Okay, there you go,' says the tiny man, putting the boots on the floor just outside the doll's house. 'Good as new! Well, nearly.'")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
    w.tiny_man.state = 3
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
    w.boots.loc = 'nursery'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
    w.boots.mended = true
  },
  agendaPodDone: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'int' does not exist on type '{ buffer: n... Remove this comment to see the full error message
    const count = Quest.Random.rndm.int(3, 5)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("'Nearly there,' says the tiny man with a cheerful grin. He gives the chisel another tap, and the pod splits open, to reveal " + count + " seeds.")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'tamarind_seed' does not exist on type '{... Remove this comment to see the full error message
    if (!w.tamarind_seed.countableLocs[player.name]) w.tamarind_seed.countableLocs[player.name] = 0
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'tamarind_seed' does not exist on type '{... Remove this comment to see the full error message
    w.tamarind_seed.countableLocs[player.name] += count
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    delete w[w.tiny_man.breakingIntoPod].loc
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
    delete w.tiny_man.breakingIntoPod
  },
  kill: 'Mandy contemplates killing the little man. The guy is only ten centimetres, no court in the land would consider him an actual person, would it. Admittedly he does seem like a normal person. And what if he is normal-sized, and it is she who is a giant? No court in the land would find a giant innocent for the cold-bloodied murder of a man just trying to make a living mending shoes. Probably best to let him live, annoying though he is.',
  examine: function () {
    let s = "The man is only about ten centimetres tall, but looks normally proportioned. He is dressed in blue overalls, and has dark hair, that is going grey. "
    if (this.state < 2) {
      s += "He seems to be making a pair of shoes."
    }
    else if (this.state === 2) {
      s += "He is mending the boots Mandy has given him."
    }
    else if (this.breakingIntoPod) {
      s += "He is trying to break into a tamarind pod."
    }
    else {
      s += "He is once again making a pair of shoes."
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg(s)
  },
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
  msg: function (s: any, params: any) { msg(s, params) },  // override default for NPCs so we see it when he is in house
  endFollow: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg("'Wait here,' says Mandy to {nm:npc:the}.", { npc: obj })
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return falsemsg("'I wasn't going nowhere!'")
  },
  startFollow: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg("'Follow me,' says Mandy to {nm:npc:the}.", { npc: obj })
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return falsemsg("'If it's all the same to you, I'll stay here.'")
  },
  getAgreement: function (verb: any, item: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (verb !== 'Repair') return falsemsg("'Sorry, lady-giant, I've got to much to do here. In fact I best get on.'")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
    if (item !== w.boots && item !== w.tiny_shoes) return falsemsg("'Sorry, lady-giant, I can do shoes, maybe boots at a push, but... No, not that.'")
    return true
  },
  take: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return falsemsg("Mandy tries to grab the tiny man, because a four inch high man has to score a few views on Youtube, but he dodges out of the way. 'Ere, wot you playin' at?' he demands. 'You keep yer 'ands off!'")
  },
  askOptions: [
    {
      name: 'Himself',
      test: function (p: any) { return p.text.match(/himself|who he|man/) || (p.text.match(/he is/) && p.text2 === 'who'); },
      msg: "'Who are you?' says Mandy.|He shrugs. 'Name's Cuthbert, but most call me Big Bert.'|'Why do they call you \"Big Bert\"?'|'It's short for Cuthbert, see?'",
    },
    {
      name: 'House',
      test: function (p: any) { return p.text.match(/doll\'?s?\'? ?house/); },
      msg: "'Nice house,' says Mandy politely. 'Is it your?'|'I should be so lucky! I'm just here mending some shoes. They've got some great tools.'",
    },
    {
      name: 'Escape',
      test: function (p: any) { return p.text.match(/escape|way out|get out|house/); },
      msg: "'I don't suppose you know how I can get out of this stupid house?'|The little man looks around him at the doll's house, then at Mandy. 'You're not in it, love.'|'No, not that house, this one!' She points vaguely around the nursery.|'Wait, I'm in a house inside another house? Stone the crows! If that don't beat all!' Clearly he was not going to be much use in that regard.",
    },
    {
      name: 'Shoes',
      test: function (p: any) { return p.text.match(/shoes/); },
      msg: "'Are you making those shoes or mending them?'|'Mending 'em. Be good as new when I've done with 'em.'|'Whose are they?'|'Mine! You think I go around mending random shoes? Strange hobby that would be!'",
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
      script: function () { w.tiny_man.askedAboutShoes = true },
    },
    { // Mannequins
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'brass_dining_room' does not exist on typ... Remove this comment to see the full error message
      test: function (p: any) { return p.text.match(/mannequin/) && w.brass_dining_room.visited > 2; },
      msg: "'What's the deal with the mannequins in the dining room?'|The little man look through a doorway, into the dining room of the doll's house. 'Don't see no mannequins in there, love.'",
    },
    {
      name: 'Silvers',
      test: function (p: any) { return p.text.match(/silver/) && player.silverSpotted > 0; },
      msg: "'What's the deal with the Silvers - the guy in silver I saw?'|'I don't know. Something weird about them, if you ask me. I just keep me head down when they're around.'",
    },
    {
      name: 'Boots',
      test: function (p: any) { return p.text.match(/boot/); },
      script: function () {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
        w.boots.doRepair()
      },
    },
    {
      test: function (p: any) { return p.text.match(/small|tiny/); },
      script: function () {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'I can't help noticing...,' says Mandy wondering how she say this, 'that you quite... well, small.'");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Or maybe you're freakishly tall.'");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Well, maybe. But this room looks to me like a nursery for people my  size, and you're in a toy house.'");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Ah, that coz this 'ouse went big. Never used to be. I got trapped 'ere, see? In this 'ouse when it was normal-sized. Went exploring, trying to find a way out, like, walked in this room with all the signs of the zodiac on the rub. As I looked at, the whole house grew! Suddenly I `ad to walk miles to get anywhere. Eventually I found this place, what's a bit more my size, what with the {class:riddle:little things} in it.'");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("`How long ago was that?' asks Mandy")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Only about ten minutes, maybe twenty.' Mandy thinks about the balloon, and wonders how many years it has really been.")

      },
    },
    {
      test: function (p: any) { return p.text.match(/doctor|winfield|malewicz|man/); },
      script: function () {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Do you know a Dr Winfield Malewicz?' says Mandy. 'I've got a letter for him.'|He looks Mandy up and down. 'I swear postmen get younger ever day! And bigger too. Yeah, I know the doctor. Weird guy, 'as an 'house on me route.'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Your route?'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Yeah, me route, when I'm deliverin' coal. Up Highfield Lane as I recalls. God knows what me customers are doing with no coal! Must be days now.'")
      }
    },
    {
      test: function (p: any) { return p.text.match(/balloon/); },
      script: function () {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'What's the deal with the balloon?' asks Mandy")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("The tiny man looks out the window. 'Yeah, I saw that floating up there when I got here, like some great floaty yellow thing. Big ain't it?'")
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dollshouse' does not exist on type '{}'.
        if (w.dollshouse.openCount > 3) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I was more concerned with the way it seems to rewind time when it hits the floor.'")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'You what? You on drugs on summit?' Being in the middle of it, he may not realise anything odd is happening, it occurs to Mandy.")
        }
      },
    },
    {
      test: function (p: any) { return p.text.match(/hamlet/); },
      script: function () {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'I don't suppose you know any Shakespeare?' asks Mandy. 'Hamlet in particular.'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Do I look like a toff?'")
      },
    },
    {
      test: function (p: any) { return p.text.match(/past|origin|career|job|deliver/); },
      script: function () {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'What did you do before you got trapped here?' asks Mandy")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'I'm a coal merchant. I was just 'ere bring round a sack of coal, when I kind of got sucked inside. {class:riddle:Drag me down,} it did! That was weeks ago. What's happened to my business?' Mandy decides not to tell him the entire coal industry is dead in England, and no one has coal fires any more.")
      },
    },
    {
      test: function (p: any) { return p.text.match(/letter/); },
      script: function () {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'You know anything about this letter?' asks Mandy")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'What am I, a postman?'")
      },
    },
    {
      test: function (p: any) { return p.text.match(/telescope|observatory/); },
      script: function () {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'What's the deal with the telescope in the observatory?' asks Mandy")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Observatory? You 'aving a laugh! I bin delivering round here for years; and ?I can tell you, this is a 'ouse, ain't got no observatory. '")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'You must've noticed it's a lot bigger than it should be from the outside.'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Lot of 'ouses look big 'un there are. Clever use of furniture, that's the trick.'")
      },
    },
    {  // !!!
      test: function (p: any) { return p.text.match(/live/) && p.text2 === 'where'; },
      alias: "So where do you live?",
      script: function () {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'So where {i:do} you live?'");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'14 Clarence Street. Least, that's where I lived before I come in 'ere.'");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Clarence Street? I know that road, Charlene Porter lives there.' It is a terrace house, built in the later nineteenth century, near the centre of town.");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'I don't know no Charlene. French is she?'");
      },
    },
    {
      script: function (p: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
        w.tiny_man.badTopicCount++
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Mandy asks the little man about " + p.text + ".")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'What the..?' he replies, 'Ask me about a topic what I know about.'")
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
        if (w.tiny_man.badTopicCount > 7) msg("'Do you know about anything?' asks Mandy getting increasingly frustrated.|'Not a lot, no.'")
      }
    },
  ],
  badTopicCount: 0,
  tellOptions: [
    {
      test: function (p: any) { return true },
      script: function (p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Mandy starts to tell the tiny man about " + p.text + ".")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("He looks at her, 'Listen giant-lady, I don't really care.{once: Maybe these things are important in the giant world, but not in mine.}'")
      }
    },
  ],
  receiveItemsFailMsg: "Mandy gives {nm:item:the} to the tiny man. 'What'd I want something like that for?' he asks.",
  receiveItems: [
    {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
      item: w.boots,
      f: function (options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
        if (w.boots.size !== 4) {
          return falsemsg("Mandy gives {nm:item:the} to the tiny man. 'What'd I want something like that for?' he asks.|'I thought you might be a cobbler elf.'|'A what? Are you taking the piss?'|'No! It's just you're quite... small.|'I'm normal size, I am. You're the freak, lady-giant. I can't fix no giant lady boots; I only do {i:normal-size} footwear.'", options)
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
        if (w.tiny_man.state !== 1 || w.boots.size !== 4) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("Mandy gives the small boots to the tiny man. 'What'd I want something like that for?' he asks.|'I thought you might be a cobbler elf.'|'A what? Are you taking the piss?'|'No! It's just you're quite... small.|'I'm normal size, I am. You're the freak, lady-giant. Though I suppose I {i:could} fix them.' He starts to examine the hole in the boot.")
        }
        else {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("Mandy gives the boots to the tiny man. 'I'll get on that as soon as I've done these,' he says.")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("{ifExists:yellow_balloon:loc:Mandy glances at the balloon. }'I don't suppose you could do it now?' She smiles sweetly at him, making him jump back from his seat in horror.")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Okay, okay, giant-lady! Whatever you say!' He drops the shoes, and starts to examine the hole in the boot.")
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
        w.boots.loc = 'tiny_man'
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
        w.tiny_man.bootsState = 2
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
        w.tiny_man.agenda = ['wait:3', 'run:agendaBootsDone']
      }
    },
    {
      test: function (options: any) { return options.item.name.startsWith('tamarind_pod_prototype') },
      f: function (options: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Mandy gives the tamarind pod to the tiny man. 'What'd I want something like that for?' he asks.|'I thought you might be able to cut it open,' says Mandy. 'You know, with your little tools.'|'My what?'|'Er, your normal-sized tools?'")
        if (options.item.size > 4) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("He shrugs. 'Give it a go.' He grabs and hammer and chisel, and sets about trying to break into the pod.")
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
          w.tiny_man.breakingIntoPod = options.item.name
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
          w.tiny_man.agenda = ['wait', 'wait', "text:'It's a right tough one, this,' the tiny man notes, as he catches his breath, 'but I'll get into it, {class:riddle:one way or another}.' He starts banging the hammer on the chisel again. Mandy wonders if he should be using a mallet, but says nothing.", 'wait', 'run:agendaPodDone']
        }
        else {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'int' does not exist on type '{ buffer: n... Remove this comment to see the full error message
          const count = Quest.Random.rndm.int(3, 5)
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("He shrugs. 'Should be easy enough.' He grabs and hammer and chisel, and sets the chisel to the pod. He gives it a gentle tap, and the pod splits open, to reveal " + count + " seeds.")
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'tamarind_seed' does not exist on type '{... Remove this comment to see the full error message
          if (!w.tamarind_seed.countableLocs[player.name]) w.tamarind_seed.countableLocs[player.name] = 0
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'tamarind_seed' does not exist on type '{... Remove this comment to see the full error message
          w.tamarind_seed.countableLocs[player.name] += count
        }
        delete options.item.loc
      },
    },
  ],
  talkto: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Mandy wonders what {i:topics} she could {i:ask the tiny man about}...")
    return false
  }
})





// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("tiny_shoes", {
  loc: "nursery",
  scenery: true,
  examine: "The tiny shoes are brown; they lace up and are rather pointed at the toe.",
  take: "Mandy tries to grab the shoes, but the tiny man is too quick for her. 'They're not your!'",
  repair: function (options: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (options.char === player) return falsemsg("With the best will in the world, Mandy is not going to be ablke to repair the shoes. Better leave it to the cobbler elf...")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
    if (w.tiny_man.bootsState === 2) return falsemsg("'So can you fox those shoes?' asks Mandy.|'Not while I'm doin' this I can't.'")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("'So can you fox those shoes?' asks Mandy.|'Reckon so!'")
    return true
  }
})