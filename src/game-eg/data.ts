"use strict";





// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("knife",
  TAKEABLE(),
  {
    loc: "Buddy", sharp: false,
    examine: function (options: any) {
      if (this.sharp) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("A really sharp knife.");
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("A blunt knife.");
      }
    },
    chargeResponse: function (options: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("There is a loud bang, and the knife is destroyed.")
      this.loc = false
      return false
    },
  }
)






// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("lounge", {
  desc: 'A smelly room with an old settee and a tv. There is a tatty rug on the floor.{if:player:name:piggy_suu: This is Piggy-Suu\'s favourite room.}',
  mapColour: 'silver',
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  east: new Exit('kitchen'),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Exit("dining_room"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  south: new Exit("conservatory"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  up: new Exit("bedroom"),
  hint: "There is a lot in this room! The bricks can be picked up by number (try GET 3 BRICKS). The book can be read. The coin is stuck to the floor. There are containers too. Kyle is an NPC; you can tell him to do nearly anything the player character can do (everything except looking and talking).",
  scenery: [
    'tv',
    { alias: ['old settee', 'couch', 'sofa'] },
    { alias: 'rug', examine: 'It might have been blue at one time. Maybe.' },
  ],
});



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("Buddy", NPC(false), {
  loc: "lounge",
  money: 10,
  properNoun: true,
  examine: 'An orangutan!',
  talkto: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
    const res = quest.getState('A carrot for Buddy', this)
    console.log(res)
    if (!res.status) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Hey, Buddy,' you say.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Hey yourself! Say, could you get me a carrot?'")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'start' does not exist on type '{ INITIAL... Remove this comment to see the full error message
      quest.start('A carrot for Buddy')
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Hey, Buddy,' you say.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Hey yourself! Where is that carrot?'")
    }
  },
  receiveItems: [
    {
      test: function () { return true },
      f: function (options: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        msg("{multi}Done.", options)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ test: ()... Remove this comment to see the full error message
        options.item.loc = this.name
      }
    },
  ],
})
// @ts-expect-error ts-migrate(2339) FIXME: Property 'changePOV' does not exist on type '{}'.
Quest.Utilities.util.changePOV(w.Buddy)





// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("dining_room_on_stool", {
  desc: 'Stood on a stool, in an old-fashioned room.',
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  east: new Exit('lounge', { mapIgnore: true }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  down: new Exit("dining_room", { mapIgnore: true }),
  alias: "dining room (on a stool)",
  //loc:"dining_room",
});


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("hole", {
  desc: 'An old-fashioned room.',
});





// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("book", TAKEABLE(), READABLE(true), {
  loc: "lounge",
  examine: "A leather-bound book.",
  read: function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    if (cmdRules.isHeld(null, options)) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Lara' does not exist on type '{}'.
      if (options.char === w.Lara) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Okay.' Lara spends a few minutes reading the book.");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'I meant, read it to me.'");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'All of it?'");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Quick summary.'");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'It is all about carrots. The basic gist is that all carrots should be given to me.' You are not entirely sure you believe her.")
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        msg("It is not in a language {pv:char:understand}.", options)
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'abort' does not exist on type '{}'.
      parser.abort()
      return true;
    }
    else {
      return false;
    }
  },
  lookinside: "The book has pages and pages of text, but you do not even recognise the alphabet.",
  watchedStringAttribute: 'yellow',
  watchedNumberAttribute: 5,
})

// @ts-expect-error ts-migrate(2339) FIXME: Property 'addChangeListener' does not exist on typ... Remove this comment to see the full error message
Quest.Utilities.util.addChangeListener(w.book, "watchedStringAttribute", function (o: any, current: any, previous: any) {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  msg("watchedStringAttribute changed from " + previous + " to " + current)
})
// @ts-expect-error ts-migrate(2339) FIXME: Property 'addChangeListener' does not exist on typ... Remove this comment to see the full error message
Quest.Utilities.util.addChangeListener(w.book, "watchedNumberAttribute", function (o: any, current: any, previous: any) {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  msg("watchedNumberAttribute changed from " + previous + " to " + current)
}, function (o: any, current: any, previous: any) {
  return current > 10 && current !== previous
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("book_cover", COMPONENT("book"), {
  examine: "The book cover is very fancy.",
  parserPriority: -20,
});


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("boots", WEARABLE(), {
  loc: "lounge",
  pronouns: lang.pronouns.plural,
  examine: "Some old boots.",
  special_att_3: 'three',
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("canteen", TAKEABLE(), VESSEL(), {
  examine: "The canteen is {ifExists:canteen:containedFluidName:full:empty}.",
  loc: "lounge",
})





// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("glass_cabinet", CONTAINER(true), LOCKED_WITH(["cabinet_key", "small_key"]), {
  examine: "A cabinet with a glass front.",
  transparent: true,
  isLocatedAt: function (loc: any) { return (loc == "lounge" || loc == "dining_room") }
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("cabinet_key", KEY(), {
  loc: "garage",
  examine: "A small brass key."
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("jewellery_box",
  TAKEABLE(),
  CONTAINER(true),
  { loc: "glass_cabinet", alias: "jewellery box", examine: "A nice box.", }
);

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("ring",
  TAKEABLE(),
  { loc: "jewellery_box", examine: "A ring.", }
);

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("cardboard_box", TAKEABLE(), CONTAINER(true), {
  loc: "lounge",
  alias: "cardboard box",
  regex: /cardboard/,
  examine: "A big cardboard box.",
  closed: false,
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("ham_and_cheese_sandwich", EDIBLE(false), {
  pattern: 'egg|mayo',
  loc: "lounge",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  afterIngest: function () { msg("That was great!"); },
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("ornate_doll", TAKEABLE(), {
  loc: "glass_cabinet",
  alias: "ornate doll",
  examine: "A fancy doll, eigthteenth century.",
})




// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("coin", TAKEABLE(), {
  loc: "lounge",
  examine: "A gold coin.",
  take2: function (options: any) {
    return falsemsg("{pv:char:try:true} to pick up the coin, but it just will not budge.", options)
  },
  take: "{pv:char:try:true} to pick up the coin, but it just will not budge.",
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("small_key", KEY(), {
  loc: "lounge", examine: "A small key.", alias: "small key",
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("flashlight", TAKEABLE(), SWITCHABLE(false, 'providing light'), {
  loc: "lounge",
  examine: "A small red torch.",
  regex: /^torch$/,
  lightSource: function () {
    return this.switchedon ? world.LIGHT_FULL : world.LIGHT_NONE
  },
  eventPeriod: 1,
  eventIsActive: function () {
    return this.switchedon
  },
  eventScript: function () {
    this.power--;
    if (this.power === 2) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The torch flickers.")
    }
    if (this.power < 0) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The torch flickers and dies.{once: Perhaps there is a charger in the garage?}");
      this.doSwitchoff()
    }
  },
  testSwitchOn() {
    if (this.power < 0) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The torch is dead.")
      return false
    }
    return true
  },
  power: 2,
  chargeResponse: function (options: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg("{nv:char:push:true} the button. There is a brief hum of power, and a flash.", options)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'flashlight' does not exist on type '{}'.
    w.flashlight.power = 20
    return true
  },
})






// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("dining_room", {
  desc: 'An old-fashioned room.',
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  east: new Exit('lounge'),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Exit('lift'),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  up: new Exit("dining_room_on_stool", { mapIgnore: true }),
  alias: "dining room",
  hint: "This room features an NPC who will sometimes do as you ask. Compliment her, and she will go to another room, and with then pick things up and drop them (but not bricks). Also not that the glass cabinet is in this room as well as the lounge.",
});


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("lift_item", {
  alias: 'lift',
  loc: "dining_room",
  examine: "An old-fashioned lift.",
  scenery: true,
  goInDirection: 'west',
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("chair", FURNITURE({ sit: true }), {
  loc: "dining_room", examine: "A wooden chair.",
  afterPostureOn: function (options: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg("The chair makes a strange noise when {nv:char:sit} on it.", options)
  },
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createRoom("lift", TRANSIT("east"), {
  desc: 'A curious lift.',
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  east: new Exit('dining_room'),
  transitMenuPrompt: 'Where do you want to go?',
})


// calling it button_0 make it appear before button_1 in lists
// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("button_0",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  TRANSIT_BUTTON("lift"),
  {
    alias: "Button: G",
    examine: "A button with the letter G on it.",
    scenery: true,
    transitDest: "dining_room",
    transitDestAlias: "Ground Floor",
    transitAlreadyHere: "You're already there mate!",
    transitGoToDest: "The old man presses the button....",

  }
);

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("button_1",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  TRANSIT_BUTTON("lift"),
  {
    alias: "Button: 1",
    examine: "A button with the letter 1 on it.",
    transitDest: "bedroom",
    scenery: true,
    transitDestAlias: "The Bedroom",
    transitAlreadyHere: "You press the button; nothing happens.",
    transitGoToDest: "You press the button; the door closes and the lift heads to the first floor. The door opens again.",

  }
);

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("button_2",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  TRANSIT_BUTTON("lift"),
  {
    alias: "Button: 2",
    examine: "A button with the letter 2 on it.",
    transitDest: "attic",
    scenery: true,
    transitDestAlias: "The Attic",
    locked: true,
    transitAlreadyHere: "You press the button; nothing happens.",
    transitGoToDest: "You press the button; the door closes and the lift heads to the second floor. The door opens again.",
    transitLocked: "That does nothing, the button does not work.",
  }
);





// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("attic", {
  desc: 'An spooky attic.',
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Exit('lift'),
});





// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("kitchen", {
  desc: 'A clean room{if:clock:scenery:, a clock hanging on the wall}. There is a sink in the corner.',
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Exit("lounge"),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  down: new Exit('basement', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'trapdoor' does not exist on type '{}'.
    isHidden: function () { return w.trapdoor.closed; },
    msg: "You go through the trapdoor, and down the ladder.",
    npcLeaveMsg: function (char: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("{nv:char:disappear:true} through the trapdoor.", { char: char });
    },
    npcEnterMsg: function (char: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("{nv:char:come:true} through the trapdoor, and {cj:char:climb} down the ladder to join you in the basement.", { char: char });
    },
  }),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  north: new Exit("garage"),
  afterFirstEnter: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("A fresh smell here!");
  },
  hint: "This room features two doors that open and close. The garage door needs a key.",
  source: "water",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("clock", TAKEABLE(), {
  loc: "kitchen",
  scenery: true,
  examine: "A white clock.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("trapdoor", OPENABLE(false), {
  loc: "kitchen",
  examine: "A small trapdoor in the floor.",
  goThroughDirection: 'down',
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("camera", TAKEABLE(), {
  loc: "kitchen",
  examine: "A cheap digital camera.",
  regex: /^picture box$/,
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("big_kitchen_table", SURFACE(), {
  loc: "kitchen",
  examine: "A Formica table.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("jug", TAKEABLE(), VESSEL(), {
  loc: "big_kitchen_table",
  examine: "A small jug, stripped blue and white.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("honey_pot", {
  scenery: true,
  examine: "A pot of honey.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("kitchen_sink", {
  loc: "kitchen",
  scenery: true,
  examine: "A dirty sink.",
  isSourceOf: function (fluid: any) {
    return fluid === "water"
  },
  sink: function (fluid: any, char: any, vessel: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg("{nv:char:empty:true} {nm:item:the} into the dirty sink.", { char: char, item: vessel })
  },
})








// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("basement", {
  desc: "A dank room, with piles of crates everywhere.",
  darkDesc: "It is dark, but you can just see the outline of the trapdoor above you.",
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  up: new Exit('kitchen', { isHidden: function () { return false; } }),
  lightSource: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'light_switch' does not exist on type '{}... Remove this comment to see the full error message
    return w.light_switch.switchedon ? world.LIGHT_FULL : world.LIGHT_NONE;
  },
  hint: "The basement illustrates light and dark. There is a torch in the lounge that may be useful.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("light_switch", SWITCHABLE(false), {
  loc: "basement",
  examine: "A switch, presumably for the light.",
  alias: "light switch",
  testSwitchOn: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'crates' does not exist on type '{}'.
    if (!w.crates.moved) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You cannot reach the light switch, without first moving the crates.");
      return false;
    }
    else {
      return true;
    }
  }
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("ladder", {
  loc: "basement",
  examine: "A ladder, fixed to the wall, leading to the trapdoor.",
  goUpDirection: 'up',
})
// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("crates", {
  loc: "basement",
  examine: "A bunch of old crates.",
  move: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("You move the crates, so the light switch is accessible.");
    this.moved = true;
    return true;
  }
})





// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("garage", {
  desc: 'An empty garage.',
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  south: new Exit("kitchen"),
  hint: "The garage features a complex mechanism, with two components.",
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("garage_door", LOCKED_DOOR("garage_key", "kitchen", "garage"), {
  examine: "The door to the garage.",
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("garage_key", KEY(), {
  loc: "lounge",
  examine: "A big key.",
});


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("charger", {
  loc: "garage",
  examine: "A device bigger than a washing machine to charge a torch? It has a compartment and a button. {charger_state}.",
  mended: false,
  use: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg("To use the charge, you need to put the torch in the compartment and press the button.");
  }
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("charger_compartment", COMPONENT("charger"), CONTAINER(true), {
  alias: "compartment",
  examine: "The compartment is just the right size for the torch. It is {if:charger_compartment:closed:closed:open}.",
  testDropIn: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
    const contents = w.charger_compartment.getContents(world.LOOK)
    if (contents.length > 0) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The compartment is full.")
      return false
    }
    return true
  },
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("charger_button", COMPONENT("charger"), BUTTON(), {
  examine: "A big red button.",
  alias: "button",
  push: function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
    const contents = w.charger_compartment.getContents(world.ALL)[0]
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
    if (!w.charger_compartment.closed || !contents) return falsemsg("{pv:char:push:true} the button, but nothing happens.", options)
    if (!contents.chargeResponse) return falsemsg("{pv:char:push:true} the button. There is a brief hum of power, but nothing happens.", options)
    return contents.chargeResponse(options)
  }
})






// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("bedroom", {
  desc: "A large room, with a big bed and a wardrobe.",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  down: new Exit("lounge"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  in: new Exit("wardrobe"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Exit('lift'),
  hint: "The bedroom has a variety of garments that can be put on - in the right order.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("wardrobe", DEFAULT_ROOM, {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  out: new Exit("bedroom"),
  loc: "bedroom",
  examine: "It is so big you could probably get inside it.",
  desc: "Oddly empty of fantasy worlds.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("bed", FURNITURE({ sit: true, recline: true }), {
  loc: "bedroom",
  scenery: true,
  examine: "What would a bedroom be without a bed?",
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("underwear",
  WEARABLE(1, ["lower"]),
  {
    loc: "bedroom",
    pronouns: lang.pronouns.massnoun,
    examine: "Clean!",
  }
);

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("jeans",
  WEARABLE(2, ["lower"]),
  { loc: "bedroom", pronouns: lang.pronouns.plural, examine: "Clean!", }
);

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("shirt",
  WEARABLE(2, ["upper"]),
  { loc: "bedroom", examine: "Clean!", }
);

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("coat",
  WEARABLE(3, ["upper"]),
  { loc: "bedroom", examine: "Clean!", }
);

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("jumpsuit",
  WEARABLE(2, ["upper", "lower"]),
  { loc: "bedroom", examine: "Clean!", }
);






// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("suit_trousers",
  WEARABLE(2, ["lower"]),
  { loc: "wardrobe", examine: "The trousers.", pronouns: lang.pronouns.plural }
);

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("jacket",
  WEARABLE(3, ["upper"]),
  { loc: "wardrobe", examine: "The jacket", }
);

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("waistcoat",
  WEARABLE(2, ["upper"]),
  { loc: "wardrobe", examine: "The waistcoat", }
);

// @ts-expect-error ts-migrate(2339) FIXME: Property 'suit_trousers' does not exist on type '{... Remove this comment to see the full error message
createEnsemble("suit", [w.suit_trousers, w.jacket, w.waistcoat],
  { examine: "A complete suit.", regex: /xyz/ }
);



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("conservatory", {
  desc: "A light airy room.",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  north: new Exit("lounge"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Exit("garden"),
  hint: "The conservatory features a pro-active NPC.",
});


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("crate", FURNITURE({ stand: true }), SHIFTABLE(), {
  loc: "conservatory",
  examine: "A large wooden crate, probably strong enough to stand on.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("broken_chair", {
  loc: "conservatory",
  examine: "A broken chair.",
  attachable: true,
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("rope", ROPE(3), {
  loc: "conservatory",
  examine: "The rope is about 40' long.",
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("garden", {
  desc: "Very overgrown. The garden opens onto a road to the west, whilst the conservatory is east. There is a hook on the wall.",
  mapColour: 'green',
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  east: new Exit("conservatory"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Exit("road"),
  visibleFrom: ["dining_room"],
  visibleFromPrefix: "Through the window you can see",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("hook", {
  loc: "garden",
  scenery: true,
  examine: "A rusty hook, on the wall of the house.",
  attachable: true,
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("far_away", {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  north: new Exit("lounge"),
});



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("Arthur",
  NPC(false),
  {
    loc: "garden",
    examine: function () {
      if (this.suspended) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Arthur is asleep.");
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Arthur is awake.");
      }
    },
    suspended: true,
    properNoun: true,
    agenda: [
      "text:Arthur stands up and stretches.",
      "text:'I'm going to find Lara, and show her the garden,' says Arthur.:'Whatever!'",
      "walkTo:Lara:'Hi, Lara,' says Arthur. 'Come look at the garden.'",
      "joinedBy:Lara:'Sure,' says Lara.",
      "walkTo:garden:inTheGardenWithLara:'Look at all the beautiful flowers,' says Arthur.:Through the window you see Arthur say something to Lara.",
      "run:inTheGardenWithLara:Lara smells the flowers.:You notice Lara is smelling the flowers in the garden.",
      "walkTo:conservatory",
      "walkTo:garden",
    ],
    inTheGardenWithLara: function (arr: any) {
      if (this.isHere()) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(arr[0]);
      }
      if (player.loc === "dining_room") {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(arr[1]);
      }
    },
    talkto: function () {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Hey, wake up,' you say to Arthur.");
      this.suspended = false;
      this.pause();
      this.multiMsg([
        "'What?' he says, opening his eyes. 'Oh, it's you.'",
        "'I am awake!'",
        false,
        "'Stop it!'",
      ])
      return true;
    }
  }
);





// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("ball", {
  //loc:"Kyle",
  examine: "Some old boots.",
});



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("Kyle", NPC(false),
  {
    loc: "lounge",
    //alias:'Bobby',
    examine: "A grizzly bear. But cute.",
    receiveItems: [
      {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
        item: w.book,
        f: function () {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Oh!' says Kyle. 'Is this a book?'")
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
          w.book.loc = this.name
          return true
        }
      },
      {
        test: function () { return true },
        f: function (options: any) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          msg("{multi}Done.", options)
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ test: ()... Remove this comment to see the full error message
          options.item.loc = this.name
          return true
        }
      },
    ],
    askOptions: [
      {
        test: function (p: any) { return p.text.match(/kyle|himself/); },
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        script: function () { msg("'Oh!' says Kyle. 'I suppose I would say: " + this.examine + "'") },
      },
      {
        name: 'House',
        test: function (p: any) { return p.text.match(/house/); },
        msg: "'I like it,' says Kyle.",
      },
      {
        name: 'Garden',
        test: function (p: any) { return p.text.match(/garden/); },
        responses: [
          {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'garden' does not exist on type '{}'.
            test: function (p: any) { return w.garden.fixed; },
            msg: "'Looks much better now,' Kyle says with a grin.",
          },
          {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
            test: function (p: any) { return w.Kyle.needsWorkCount === 0; },
            msg: "'Needs some work,' Kyle says with a sign.",
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
            script: function (p: any) { w.Kyle.needsWorkCount++; },
          },
          {
            msg: "'I'm giving up hope of it ever getting sorted,' Kyle says.",
          },
        ],
      },
      {
        test: function (p: any) { return p.text.match(/park/); },
        responses: [
          {
            name: 'Park',
            mentions: ['Swings'],
            msg: "'Going to the park sounds like fun,' Kyle says with a grin. 'We can go on the swings!'",
          },
        ],
      },
      {
        name: 'Fountain',
        test: function (p: any) { return p.text.match(/fountain/) && p.char.specialFlag; },
        msg: "'The fountain does not work.'",
      },
      {
        name: 'Swings',
        silent: true,
        test: function (p: any) { return p.text.match(/swing/); },
        msg: "'The swings are fun!'",
      },
      {
        msg: "Kyle has no interest in that subject.",
        failed: true,
      },
    ],
    needsWorkCount: 0,
    talkto2: function () {
      switch (this.talkto_count) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        case 0: msg("You say 'Hello,' to Kyle, and he replies in kind."); break;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        case 1: msg("You ask Kyle how to get upstairs. 'You know,' he replies, 'I have no idea.'"); break;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        case 2: msg("'Where do you sleep?' you ask Kyle."); msg("'What's \"sleep\"?'"); break;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        default: msg("You wonder what you can talk to Kyle about."); break;
      }
      this.pause();
      return true;
    },

    convTopics: [
      {
        showTopic: true,
        alias: "What's the deal with the garden?",
        nowShow: ["Seriously, what's the deal with the garden?"],
        script: function () {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("You ask Kyle about the garden, but he's not talking.")
        },
      },
      {
        alias: "Seriously, what's the deal with the garden?",
        msg: "You ask Kyle about the garden, but he's STILL not talking.",
      },
      {
        showTopic: true,
        alias: "The weather",
        script: function () {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("You talk to " + this.alias + " about the weather; he asks your opinion...")
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'askTopics' does not exist on type '{ sho... Remove this comment to see the full error message
          this.askTopics("Tell Kyle your view on the weather...", w.kyle_response_good, w.kyle_response_bad)
        },
      },
      {
        alias: "The weather is good",
        name: 'kyle_response_good',
        script: function () {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("You tell Kyle you think the weather is good.")
        },
      },
      {
        alias: "The weather is bad",
        name: 'kyle_response_bad',
        script: function () {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("You tell " + this.alias + " the weather is bad; he shakes his head sadly.")
        },
      },
      {
        alias: "Lead me to the garden",
        showTopic: true,
        name: 'kyle_to_garden',
        script: function () {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Can you show me where the garden is?'")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'No problem,' says Kyle.")
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
          w.Kyle.agenda = [
            "leadTo:garden",
            "waitFor:player:'So here we are,' says Kyle.",
          ]
        },
      },
    ],


  });


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("kyle_question", QUESTION(), {
  responses: [
    {
      regex: /^(yes)$/,
      response: function () {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Oh, cool,' says Kyle.");
      }
    },
    {
      regex: /^(no)$/,
      response: function () {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Oh, well, Lara, this is Tester, he or she is testing Quest 6,' says Kyle.");
      }
    },
    {
      response: function () {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'I don't know what that means,' says Kyle. 'It's a simple yes-no question.'");
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
        w.Kyle.askQuestion("kyle_question");
      }
    },
  ],
});


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("straw_boater",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  WEARABLE(false),
  { loc: "Kyle", examine: "A straw boater.", worn: true }
);







// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("Lara", NPC(true), {
  loc: "dining_room",
  examine: "A normal-sized bunny.",
  properNoun: true,
  happy: false,
  receiveItemsFailMsg: "'That's not a carrot,' Lara points out.",
  receiveItems: [
    {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
      item: w.knife,
      f: function () {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'A knife?' says Lara. 'I guess I could use that... for something?'")
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
        w.knife.loc = this.name
      }
    },
    {
      test: function (options: any) {
        return options.item.name.startsWith('carrot')
      },
      f: function (options: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'A carrot!' says Lara with delight, before stuffing it in her mouth. 'So, do you have any more?'")
        delete options.item.loc
      }
    },
    {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'ring' does not exist on type '{}'.
      item: w.ring,
      f: function (options: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Oh, my,' says Lara. 'How delightful.' She slips the ring on her finger, then hands you a key.")
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ring' does not exist on type '{}'.
        w.ring.loc = "Lara"
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ring' does not exist on type '{}'.
        w.ring.worn = true
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'garage_key' does not exist on type '{}'.
        w.garage_key.loc = options.char.name
      }
    },
    {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
      item: w.book,
      f: function (options: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Hmm, a book about carrots,' says Lara. 'Thanks.'")
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
        w.book.loc = "Lara"
      }
    },
  ],
  getAgreementTake: function (item: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'brick' does not exist on type '{}'.
    if (item === w.brick) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'I'm not picking up any bricks,' says Lara indignantly.")
      return false
    }
    return true
  },
  getAgreementGo: function (ex: any) {
    if (!this.happy) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'I'm not going " + ex.dir + ",' says Lara indignantly. 'I don't like that room.'")
      return false
    }
    return true
  },
  getAgreementDrop: function () {
    return true
  },
  getAgreementRead: function () {
    return true
  },
  getAgreementPosture: function () {
    if (!this.happy) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'I don't think so!' says Lara indignantly.")
      return false
    }
    return true
  },
  getAgreementDefault() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("'I'm not doing that!' says Lara indignantly.")
    return false
  },
  testTalkPlayer: function () { return true; },

  sayPriority: 3,
  sayResponses: [
    {
      regex: /^(hi|hello)$/,
      id: "hello",
      response: function () {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Oh, hello there,' replies Lara.")
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
        if (w.Kyle.isHere()) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Have you two met before?' asks Kyle.")
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
          w.Kyle.askQuestion("kyle_question")
        }
      },
    }
  ],
  greeting: function () {
    if (this.talkto_count === 0) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Hello,' says Lara.");
    } else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'You again?' says Lara.");
    }
  }
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("Lara_garage_key",
  TOPIC(true),
  {
    loc: "Lara", alias: "Can I have the garden key?",
    script: function () {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You ask Lara about the garage key; she agrees to give it to you if you give her a ring. Perhaps there is one in the glass cabinet?");
    },
  }
);


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("Lara_very_attractive",
  TOPIC(true),
  {
    loc: "Lara", alias: "You're very attractive",
    script: function () {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You tell Lara she looks very attractive. 'Why thank you!' she replies, smiling at last.");
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Lara' does not exist on type '{}'.
      w.Lara.happy = true;
    },
  }
);

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("Lara_carrots",
  TOPIC(true),
  {
    loc: "Lara", alias: "I hear you like carrots",
    script: function () {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Need carrots!' she says with feeling. 'Fading away bunny!' She looks mournfully at her ample tummy.");
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Lara' does not exist on type '{}'.
      w.Lara.happy = true;
    },
  }
);



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("walls", {
  examine: "They're walls, what are you expecting?",
  regex: /^wall$/,
  scenery: true,
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  isLocatedAt: function (loc: any) { return w[loc].room },
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("brick", COUNTABLE({ lounge: 7, dining_room: 1 }), {
  examine: "A brick is a brick.",
  //regex:/^(\d+ )?bricks?$/,
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("shop", {
  desc: "A funny little shop.",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  south: new Exit("road"),
  willBuy: function (obj: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'trophy' does not exist on type '{}'.
    return (obj === w.trophy);
  }
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("road", {
  desc: "A road heading west over a bridge. You can see a shop to the north.",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  east: new Exit("garden"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Exit("bridge"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  north: new Exit("shop"),
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("carrot", TAKEABLE(), MERCH(2, ["shop"]), {
  examine: "It's a carrot!",
  slice: function (options: any) {
    if (options.with === undefined) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
      if (w.knife.loc !== player.name) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return falsemsg("Going to need a knife to do that.")
      }
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
    else if (options.with !== w.knife) {
      return falsemsg("You can't cut a carrot with {nm:with:the}.", { with: options.with })
    }
    // do stuff
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg('Done.')
    return true
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("honey_pasta", TAKEABLE(), MERCH(5, ["shop"]), {
  examine: "It's pasta. With honey on it.",
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("trophy", TAKEABLE(), MERCH(15, "shop"), {
  examine: "It is a unique trophy!",
  doNotClone: true,
});









// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("cactus", ZONE_FEATURE('desert', 1, -2, 3), {
  featureLook: "There is a big cactus to the #.",
  zoneColour: 'green',
  zoneMapName: 'Strange cactus',
  examine: "Prickly!",
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("tower", ZONE_FEATURE('desert', -1, 3, 4), {
  featureLook: "There is a tower to the #.",
  featureLookHere: "There is a tall stone tower here.",
  zoneMapName: 'Ancient tower',
  examine: "The tower looks ancient, but in a fair state of repair. It is about four storeys high.",
});



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("barrier", ZONE_BORDER('desert'), {
  examine: "It is invisible!",
  scenery: true,
  border: function (x: any, y: any) {
    return (x * x + y * y > 55)
  },
  borderMsg: "You try to head #, but hit an invisible barrier.",
  borderDesc: "The air seems to kind of shimmer.",
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("canyon", ZONE_BORDER('desert'), {
  examine: "It looks very deep!",
  scenery: true,
  border: function (x: any, y: any) {
    return (x - y > 5)
  },
  //borderMsg:"You cannot go #, the canyon is too wide to jump and too steep to climb.",
  borderDesc: "There is a deep canyon southeast of you, running from the southwest to the northeast.",
});



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createRoom("desert", ZONE(), {
  zoneExits: [
    { x: -1, y: 3, dir: 'in', dest: 'inside_tower', msg: 'You step inside the tower, and climb the step, spiral staircase to the top.' },
    { x: 5, y: 0, dir: 'east', dest: 'bridge', msg: 'You start across the bridge.' },
  ],
  zoneDescs: [
    {
      x: 5, y: 0,
      desc: 'You are standing on a road heading west through a desert, and east over a bridge.'
    },
    {
      when: function (x: any, y: any) { return y === 0 },
      desc: 'You are standing on a road running east to west through a desert.',
    },
    {
      when: function (x: any, y: any) { return y > 0 },
      desc: 'You are standing in the desert, north of the road.',
    },
    {
      desc: 'You are standing in the desert, south of the road.',
    },
  ],
  size: 8,
  outsideColour: 'transparent',  // Locations the player cannot access
  mapBorder: false,              // Hide the map border
  featureColour: 'blue',         // Default colour for features
  playerColour: 'black',         // Colour of the player
  cellSize: 20,                  // The size of each location, if less than 10 the player will disappear!
  mapFont: 'italic 10px serif',   // Style of the labels for features
  mapCells: [
    '<rect x="0" y="162" width="336" height="16" stroke="none" fill="#999"/>'
  ],
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("silver_coin", TAKEABLE(), ZONE_ITEM('desert', 1, 1), {
  examine: "A curious silver coin; you do not recognise it. It says it is worth two dollars.",
})





// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("bridge", {
  desc: 'From the bridge you can just how deep the canyon is.',
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Exit('desert'),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  east: new Exit('road'),
  beforeEnter: function () {
    player.positionX = 5
    player.positionY = 0
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("inside_tower", {
  desc: "A tower, looking out over the desert. To the south is the road, heading east back to your house. To the north is a magic portal, going who knows where.",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  down: new Exit("desert"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  north: new Exit("shop"),
  alias: 'Inside the tower',
  properNoun: true,
  beforeEnter: function () {
    player.positionX = -1
    player.positionY = 3
  },
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("piggy_suu", NPC(true), {
  loc: "bridge",
  alias: 'Piggy-suu',
  money: 10,
  examine: 'Piggy-suu is a pig.',
  receiveItems: [
    {
      test: function () { return true },
      f: function (options: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        msg(lang.done_msg, options)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ test: ()... Remove this comment to see the full error message
        options.item.loc = this.name
        return true
      }
    },
  ],
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("Boris", NPC(), {
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("timetable", AGENDA_FOLLOWER(), {
  counter: 0,
  script: function (n: any) {
    this.counter += (n[0] ? parseInt(n[0]) : 1)
  },
  check: function () { return this.flag },
})

