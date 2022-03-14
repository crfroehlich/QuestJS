"use strict"

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("me", PLAYER(), {
  loc: "lounge",
  regex: /^(me|myself|player)$/,
  examine: "Just a regular guy.",
  hitpoints: 100,
  hintCounter: 0,
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("usb_stick", {
  alias: 'USB stick',
  examine: "A plain black USB stick; you can download the files on to this.",
  loc: 'me'
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("fist", {
  alias: 'fist',
  regex: /fist|hand|arm/,
  examine: "That funny shaped thing on the end of your arm.",
  isLocatedAt: function (loc: any, situation: any) {
    return situation === world.PARSER && loc === 'me'
  }
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("lounge", {
  desc: "The lounge is pleasant, if rather bare. There is a{if:kitchen_door:locked: locked} door to the north. A door to the west leads to the lift.",
  afterFirstEnter: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("The man you need to find is upstairs, but the lift does not work - it has no power. How can you get to him?")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    tmsg("This is the first room, and the text is telling you about it. If there were things here, you would probably be told about them in the room description, but we will come on to that later. You will also usually be told of any exits. This room has an exit north, but it is currently locked.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    tmsg("We will get to the lift later.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    tmsg("Before going any further, we should look at what is on the screen. Below this text, you should see a cursor. In this game it is a > sign, but other games might use different symbols or have a box. You type commands in there. Try it now by typing WAIT (I am going to write commands for you to type in capitals to diffentiate them; you do not need to).")
  },
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  north: new Exit("kitchen"),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  west: new Exit("lift", { isLocked: function () { return !w.reactor_room.reactorRunning } }),
  eventPeriod: 1,
  eventActive: true,
  eventCount: 0,
  eventScript: function () {
    this.eventCount++
    switch (this.eventCount) {
      case 1:
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        tmsg("Typing WAIT made time pass in the game, while the player-character did nothing. You can also just type Z, which is a shortcut for WAIT.")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        tmsg("Look to the left, and you will see a panel; you can perform a lot of actions here without typing anything at all. In some games it is on the right, and many do not have it at all, so we will mostly ignore it, but for now click the clock icon to again wait one turn.")
        break
      case 2:
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        tmsg("Some games have commands that tell you about the game or set it up differently to suit the player. In Quest 6 (but not necessarily other games) none of these count as a turn, so try a couple, and when you are done, do WAIT again.")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        tmsg("Type DARK to toggle dark mode; some users find if easier to see light text on a dark background. Type SPOKEN to toggle hearing the text read out. Type SILENT to toggle the sounds and music (not that there are any in this game).")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        tmsg("You can also type HELP to see some general instructions. You can also do ABOUT or CREDITS. Less common is the HINT command; if implemented it will give you a clue of what to do next. In this game, as it is a tutorial, it will tell you exactly what to do.")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        tmsg("For completeness, I will also mention TRANSCRIPT (or just SCRIPT), which will record your game session, and can be useful when testing someone's game. You can also use BRIEF, TERSE and VERBOSE to control how often room descriptions are shown, but I suggest we keep it VERBOSE for this tutorial.")
        break
      case 3:
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'kitchen_door' does not exist on type '{}... Remove this comment to see the full error message
        w.kitchen_door.locked = false
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        tmsg("Time to move on. Something tells me that door to the north is not locked any more.")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        tmsg("You might want to look at the room again before we go. Type LOOK or just L. Hopefully it no longer says the door is locked. By the way, in some games you can use the EXITS commands to see what exits are available.")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        tmsg("Movement in adventure games is done following compass directions. To go north, type GO NORTH, or NORTH or just N.")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        tmsg("You can also use the compass rose at the top left, or, in Quest 6, if your computer has a number pad, ensure \"Num Lock\" is on, and press the up key (i.e., 8).")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        tmsg("So I will see you in the next room...")
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
        hint.now('northToKitchen')
        break
    }
  },
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("kitchen", {
  desc: "The kitchen looks clean and well-equipped.",
  afterFirstEnter: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    hint.now('neToGarden')
  },
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  south: new Exit("lounge"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  down: new Exit("basement"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  in: new Exit("larder"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  northeast: new Exit("garden"),
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("kitchen_door", LOCKED_DOOR([], "lounge", "kitchen"), {
  examine: "It is plain, wooden door, painted white.",
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("basement", {
  desc: "A dank room, with a whole load of crates piled {ifNot:crates:moved:against the west wall}{if:crates:moved:up in the middle of the room. There is a door to the west}. Cobwebs hang from every beam.",
  darkDesc: "The basement is dark and full of cobwebs. The only way out is back up the ladder.",
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  up: new Exit('kitchen', { isHidden: function () { return false; } }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  west: new Exit('secret_passage', { isHidden: function () { return !w.crates.moved || (!w.light_switch.switchedon && !w.flashlight.switchedon); } }),
  lightSource: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'light_switch' does not exist on type '{}... Remove this comment to see the full error message
    return w.light_switch.switchedon ? world.LIGHT_FULL : world.LIGHT_NONE
  },
  eventPeriod: 1,
  eventIsActive: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
    return (w.me.loc === this.name)
  },
  eventScript: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'flashlight' does not exist on type '{}'.
    if (w.flashlight.switchedon && !this.flag1) hint.now('turnOnLight')
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'flashlight' does not exist on type '{}'.
    if (!w.flashlight.switchedon && w.light_switch.switchedon && !this.flag2) hint.now('getAll')
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
    if (parser.currentCommand.all && hint.before('moveCrates')) hint.now('moveCrates')
  }
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("light_switch", SWITCHABLE(false), {
  loc: "basement",
  examine: "A switch, presumably for the light.",
  regex: /^light|switch/,
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("crates", {
  loc: "basement",
  examine: "A bunch of old crates.",
  pronouns: lang.pronouns.plural,
  move: function () {
    if (!this.moved) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You move the crates... And find a passage was hidden behind them.")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
      hint.now("enterPassage")
      this.moved = true
      return true
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You feel pretty sure moving the crates again will not reveal any more hidden doors.")
      return false
    }
  },
  take: function (options: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg('The crates are too heavy to pick... But you might be able to move them.')
    return false
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("cobwebs", {
  examine: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("There are a lot! You wonder if it is worse if there are a thousand spiders down here... Or just one very big one.")
    if (!this.flag) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg("I felt embarrassed about the cobwebs not being implemented, now you can look at them to your heart's content.")
      this.flag = true
    }
  },
  take: function (options: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg('The cobwebs just disintegrate when you try to take them.')
    return false
  },
  scenery: true,
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("old_newspaper", TAKEABLE(), READABLE(), {
  examine: 'A newspaper from the eighties; yellow with age.',
  read: 'You spend a few minutes reading about what happens on the day 14th June 1987 (or perhaps the day before). A somewhat mocking article about an archaeologist, Dr Ruudhorn, and Atlantis catches your eye.',
  loc: 'basement',
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("rope", ROPE(false), {
  examine: 'About 25 foot long; it looks old, but serviceable.',
  loc: 'basement',
  ropeLength: 5,
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("apple", EDIBLE(), {
  examine: 'A rosy red apple.',
  loc: 'basement',
});








// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("larder", {
  desc: "Oh, dear, the larder is empty!",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  out: new Exit("kitchen"),
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("garden", {
  desc: "The garden is basically a few square feet of grass.",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  southwest: new Exit("kitchen"),
  afterFirstEnter: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    hint.now('getHat')
  },
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  east: new Exit("shed", {
    alsoDir: ['in'],
    use: function () {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'shed_door' does not exist on type '{}'.
      if (w.shed_door.locked) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('You shed door is padlocked. If only you have something to break it off...')
        return false
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('You walk into the shed.')
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
        w.me.moveChar(this)
        return true
      }
    },
  }),
  smell: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("You can smell the freshly-cut grass!")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'before' does not exist on type '{}'.
    if (hint.before('xBox')) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg("You can also smell specific items, so SMELL GRASS would have also worked.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("A large wooden box falls from the sky! Miraculously, it seems to have survived intact.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg("The box is a container, which means you can put things inside it and maybe find things already in it. Perhaps we should start by looking at it.")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'box' does not exist on type '{}'.
      w.box.loc = "garden"
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
      hint.now('xBox')
    }
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("hat", WEARABLE(), {
  examine: "It is straw boater, somewhat the worse for wear.",
  loc: "garden",
  afterMove: function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    if (!this.flag1 && options.toLoc === 'me') hint.now('wearHat')
  },
  afterWear: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    if (!this.flag2) hint.now('xGrass')
  },
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("grass", {
  examine: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("The grass is green, and recently cut.")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    hint.now('smell')
  },
  loc: "garden",
  scenery: true,
  smell: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("You can smell the grass; it has just been cut!")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'before' does not exist on type '{}'.
    if (hint.before('xBox')) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg("You can also smell the whole location, so just SMELL would have also worked.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("A large wooden box falls from the sky! Miraculously, it seems to have survived intact.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg("The box is a container, which means you can put things inside it and maybe find things already in it. Perhaps we should start by looking at it.")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'box' does not exist on type '{}'.
      w.box.loc = "garden"
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
      hint.now('xBox')
    }
  },
})








// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 5.
createItem("box", READABLE(), CONTAINER(true), LOCKED_WITH([]), {
  examine: function () {
    const tpParams = { char: player, container: this }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type '{ char: an... Remove this comment to see the full error message
    tpParams.list = this.listContents(world.LOOK)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("It is large, wooden box. It does not look very substantial, but it survived the fall nevertheless. There is a label on the {ifNot:box:closed:open }lid.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    if (!this.closed) msg(lang.look_inside_it, tpParams)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    if (!this.flag2) hint.now('readBox')
  },
  regex: /crate|label|lid/,
  read: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("The label says: \"The Hat and Crowbar Company - exchanging hats for crowbars since 2020.\"")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    hint.now('openBox')
    this.locked = false
  },
  msgClose: "You close the lid.",
  afterClose: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'hat' does not exist on type '{}'.
    if (this.loc && w.hat.loc === 'box' && w.crowbar.loc !== 'box') {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(" 'Thank you for your custom!' says the box. It starts to shake violently then leaps into the air, rapidly disappearing from sight.")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
      hint.now("crowbar")
      this.loc = false
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Hey!' exclaims a voice from the box, 'where's my hat?' The lid flips back open.")
      this.closed = false
    }
  },
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("crowbar", TAKEABLE(), {
  examine: "A cheap plastic crowbar; it is red, white, blue and yellow.",
  loc: "box",
  afterMove: function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    if (options.toLoc === 'me') hint.now("hatInBox")
  },
  use: function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'lab_door' does not exist on type '{}'.
    if (options.char.loc === 'laboratory' && w.lab_door.locked) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The crowbar is not going to help open that door.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg("Nice try, but you have to get the robot to open this door, not the crowbar.")
      return false
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'lab_door' does not exist on type '{}'.
    if (options.char.loc === 'office' && w.lab_door.locked) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Use it on what?")
      return false
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (options.char.loc !== 'garden') return falsemsg("There is nothing to use the crowbar on here.")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'shed_door' does not exist on type '{}'.
    return w.shed_door.crowbar()
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("shed_door", {
  examine: "The shed is metal, a kind of beige colour{if:shed_door:locked:; the door is padlocked... but the padlock does not look that strong}.",
  loc: "garden",
  locked: true,
  scenery: true,
  crowbar: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (!this.locked) return falsemsg("The padlock is already off the lock.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("You put the crowbar to the padlock, and give a pull. The padlock breaks.")
    this.locked = false
    return true
  },
})








// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("shed", {
  desc: "The shed is disappointingly empty{if:flashlight:scenery:, apart from a torch in the far corner}.",
  afterFirstEnter: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    hint.now("getTorch")
  },
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  west: new Exit("garden", { alsoDir: ['out'] }),
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("flashlight", TAKEABLE(), SWITCHABLE(false, 'providing light'), {
  loc: "shed",
  scenery: true,
  examine: "A small red torch.",
  synonyms: ['torch'],
  lightSource: function () {
    return this.switchedon ? world.LIGHT_FULL : world.LIGHT_NONE;
  },
  afterMove: function (options: any) {
    if (!this.flag1 && options.toLoc === 'me') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
      hint.now("torchOn")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'cobwebs' does not exist on type '{}'.
      w.cobwebs.loc = 'basement'
    }
    this.flag1 = true
  },
});






// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("secret_passage", {
  desc: "The passage heads west.",
  afterFirstEnter: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
    if (w.me.alreadySaved) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg("I {i:was} going to go though saving and loading at this point, but you've done that already, so we'll just press on.")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
      hint.now('westRobot')
    }
    else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
      hint.now('save')
    }
  },
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  east: new Exit("basement"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Exit("laboratory"),
})








// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("laboratory", {
  desc: "This is a laboratory of some sort. The room is full of screens and instruments, but you cannot tell what sort of science is being done here. There is a big steel door {ifNot:lab_door:closed:lying open }to the north{if:lab_door:closed:; you feel pretty sure it will be too heavy for you to open}.",
  afterFirstEnter: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'before' does not exist on type '{}'.
    if (hint.before('saveGame')) tmsg("Okay, so not bothering with saving...")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    hint.now("robot")
  },
  afterEnter: function () {
    //hint.now("rGoNorth")
  },

  lab_door_locked: true,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  east: new Exit("secret_passage"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Exit("lift"),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  north: new Exit("reactor_room", {
    use: function (char: any) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
      if (char === w.me && w.lab_door.closed) return falsemsg("The door is too heavy for you to move.")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'robot' does not exist on type '{}'.
      if (char === w.robot) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'lab_door' does not exist on type '{}'.
        if (w.lab_door.closed) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("The robot opens the heavy door with ease.")
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'lab_door' does not exist on type '{}'.
          w.lab_door.closed = false
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'robot' does not exist on type '{}'.
        w.robot.moveChar(this)
        return true
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
      w.me.moveChar(this)
      return true
    }
  }),
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("lab_door", OPENABLE(false), {
  examine: "A very solid, steel door.",
  loc: 'laboratory',
  open: function (options: any) {
    if (!this.closed) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg(lang.already, { item: this })
      return false;
    }
    if (options.char.strong) {
      this.closed = false;
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg(this.msgOpen, tpParams)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
      hint.now("northToReactor")
      return true
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('The door is too heavy to open.')
      return false
    }
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("screens", {
  examine: "There are six smaller screens attached to different instruments, each displaying graphs and numbers that are slowly evolving over time. A larger screen shows another room, with some huge device sitting in a sunked area in the middle of it. Pipes are cables seem to feed it.{if:robot:loc:reactor_room: You can see the robot in the room.}",
  loc: 'laboratory',
  scenery: true,
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("instruments", {
  examine: "The instruments are essentially oddly-shaped boxes. They are a mix of pale grey, light brown and white, and have various pipe and cable connections at at various points. They all have a brand badge on the front, but no other markings.",
  loc: 'laboratory',
  scenery: true,
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("brand_badges", COMPONENT("instruments"), {
  examine: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("The badges on the various instruments are all the same; \"Zeta Industries\". They appear to be hand-drawn.")
    if (!this.flag1) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg("Cool, you are using your initiative to look deeper. This can be vital in some games.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg("But not this one.")
    }
    this.flag1 = true
  },
  regex: /badge/,
  loc: 'laboratory',
  scenery: true,
})







// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("reactor_room", {
  desc: function () {
    return "The reactor room is dominated by a huge zeta-reactor, extending from a sunken area some five foot below floor level, up to the ceiling. Pipes and cables of varying sizes are connected to it{if:reactor_room:reactorRunning:, and the reactor is humming with power}.{ifHere:vomit: There is vomit in the corner.}"
  },
  reactorRunning: false,
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  south: new Exit("laboratory"),
  eventPeriod: 1,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
  eventIsActive: function () { return w.me.loc === "reactor_room" },
  countdown: 6,
  eventScript: function () {
    this.countdown--
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("A recorded voice echoes round the room: 'Warning: Zeta-particle levels above recommended safe threshold. Death expected after approximately {reactor_room.countdown} minutes of exposure.'")
    switch (this.countdown) {
      case 5:
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
        hint.now("getRod")
      case 4:
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("You are feeling a little nauseous.")
        break
      case 3:
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("You start to get a headache.")
        break
      case 2:
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("You are feeling very nauseous.")
        break
      case 1:
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("You throw up, feeling very weak.")
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'vomit' does not exist on type '{}'.
        w.vomit.loc = this.name
        break
      case 0:
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("You have died.")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        tmsg("Don't worry, you are not really dead; this is just a tutorial. Unfortunately, that does mean the next warning will say you will die in minus one minute, as the countdown goes below zero.")
        break
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    hint.now("rGetRod")
  }
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createRoom("reactor", CONTAINER(false), {
  examine: function () {
    return "The reactor is composed of a series of rings, hoops and cylinders arranged on a vertical axis. Some are shiny metal, other dull black, but you have no idea of the significant of any of them.{if:reactor_room:reactorRunning: An intense blue light spills out from various points up it length.}"
  },
  loc: 'reactor_room',
  testDropIn: function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'control_rod' does not exist on type '{}'... Remove this comment to see the full error message
    if (options.item === w.control_rod) return true
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("That cannot go in there!")
    return false
  },
  afterDropIn: function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'control_rod' does not exist on type '{}'... Remove this comment to see the full error message
    if (w.control_rod.loc === this.name) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The reactor starts to glow with a blue light, and you can hear it is now buzzing.")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'reactor_room' does not exist on type '{}... Remove this comment to see the full error message
      w.reactor_room.reactorRunning = true
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
      hint.now("useLift")
    }
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("vomit", {
  examine: "You decide against looking too closely at the vomit, but it occurs to you that perhaps you should tell the robot about it.",
  scenery: true,
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("control_rod", TAKEABLE(), {
  examine: "The control rod is about two foot long, and a dull black colour.",
  take: function (options: any) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'char'.
    const tpParams = { char: char, item: this }
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'char'.
    if (this.isAtLoc(char.name)) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg(lang.already_have, tpParams);
      return false;
    }
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'char'.
    if (!char.testManipulate(this, "take")) return false;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'char'.
    if (char === w.me) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("As you go to grab the control rod, a recorded message says: 'Warning: Control rod is highly zeta-active. Handling will result in instant death.' You decide upon reflection that you do not want to pick it up that much.")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
      hint.now("backToRobot")
      return false
    }
    let flag = (this.loc === "reactor")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg(lang.take_successful, tpParams)
    this.moveToFrom(options, "name")
    if (flag) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The blue light in the reactor winks out and the buzz dies.")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'reactor_room' does not exist on type '{}... Remove this comment to see the full error message
      w.reactor_room.reactorRunning = false
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    hint.now("rRInR")
    return true
  },
  loc: 'control_rod_repository',
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("control_rod_repository", SURFACE(), {
  examine: "The control rod repository is a cross between a shelf and a cradle; it is attached to the wall like a shelf, but shaped like a cradle to hold the control rod.",
  loc: 'reactor_room',
})





// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("office", {
  desc: function () {
    return "The office is a fair-size, dominated by a large desk. {ifNot:Professor_Kleinscope:flag:Sat behind the desk is Professor Kleinscope. }There is an elderly computer sat on the desk {once:- this must be the computer with the files on it; getting the files will not be possible while the Professor is sat there, however}. Behind the desk is a large window, and on the wall to the right is an odd painting."
  },
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  west: new Exit("lift", {
    use: function () {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'office' does not exist on type '{}'.
      if (w.office.lift_exit_locked) return falsemsg("The lift door is closed. You suspect Professor Kleinscope is in he lift and on his way up right now.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You walk back into the lift.")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
      w.me.moveChar(this)
    }
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  out: new Exit("garden", {
    use: function () {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'office_window' does not exist on type '{... Remove this comment to see the full error message
      if (!w.office_window.smashed) falsemsg("There is a pane of glass in the way.")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'rope' does not exist on type '{}'.
      if (!w.rope.locs.includes('outside')) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("You look out the window. If is a long way down to the ground, and there are no hand-holds. You need a way to climb down.")
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
        hint.now('climbOut')
        return false
      }
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You climb out the window, and down the rope, quickly reaching the ground. You jump in your SUV, and drive away. A job well done.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(" ")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Congratulations, you have won!")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(" ")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg("So this is where we say good bye; you have completed the game, and hopefully now have a pretty good idea of how to play parser-based adventure games (and perhaps even write some too).")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'finish' does not exist on type '{ nextid... Remove this comment to see the full error message
      io.finish()
      return true
    },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'office_window' does not exist on type '{... Remove this comment to see the full error message
    isHidden: function () { return !w.office_window.smashed },
  }),
  afterFirstEnter: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    hint.now("useComputer")
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("office_window", {
  examine: function () {
    if (this.smashed) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The window is tall and wide... and smashed.")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The window is tall and wide; it does not look like it will open.")
    }
    if (!this.lookedout) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg("You might want to try LOOK OUT WINDOW; may be more interesting than the window itself.")
      this.lookedout = true
    }
  },
  loc: 'office',
  scenery: true,
  outside: [],
  lookout: function () {
    let s = 'Out of the window you can see the street at the front of the house. Your black SUV is parked at the side on the road.'
    if (this.outside.length > 0) s += ' On the street below the house you can see ' + Quest.Utilities.formatList(this.outside, { article: Quest.Utilities.DEFINITE, lastJoiner: lang.list_and }) + '.'
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg(s)
  },
  smash: function () {
    if (this.smashed) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return falsemsg("The window is already smashed.")
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'old_newspaper' does not exist on type '{... Remove this comment to see the full error message
    else if (w.old_newspaper.fist_wrapped) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("With your fist wrapped in the old newspaper, you punch it through the window, breaking the glass. You take a moment to knock away the remaining jagged shards in the frame.")
      this.smashed = true
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
      hint.now('out')
      return true
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You are about to put your fist through the window when it occurs to you that your hand will get ripped to shreds by the glass fragments, and you really do not want to leave DNA evidence here. It is definitely not that you hate the sight of blood.")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
      hint.now('wrapFist')
      return false
    }
  },
  isThrowThroughable: function (item: any) {
    if (this.smashed) return true
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return falsemsg("You can't throw anything out of the window, it is closed.")
  },
  throwThrough: function (item: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'rope' does not exist on type '{}'.
    if (item !== w.rope) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You lob {nm:item:the} out the window; it lands on the street below.")
      item.loc = false
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'office_window'.
      office_window.outside.push(item)
      return true
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (!item.tiedTo1 && !item.tiedTo2) return falsemsg("You are about to heave the rope out the window when it occurs to you that it might be useful to tie one end to something first.")
    // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'falsedmsg'. Did you mean 'falsem... Remove this comment to see the full error message
    if (item.tiedTo1 && item.tiedTo2) falsedmsg("The rope is tied to both {nm:obj1:the} and {nm:obj2:the}; which end were you hoping to throw out?", { obj1: w[rope.tiedTo1], obj2: w[rope.tiedTo2] })

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("You throw the end of the rope out the window.")
    if (item.tiedTo1) {
      item.locs.push("outside")
    }
    else {
      item.locs.unshift("outside")
    }
  },
  open: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return falsemsg("The window does not open.")
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("painting", {
  examine: "The painting at first glance is abstract, but after staring at it for a few minutes, you realise is is actually a portrait of a woman in a blue dress with a bizarre hat.",
  loc: 'office',
  scenery: true,
  lookbehind: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Professor_Kleinscope' does not exist on ... Remove this comment to see the full error message
    if (w.Professor_Kleinscope.loc === 'office') {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Please don't touch that,' says the Professor as you reach out, 'it's very expensive.'")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('You look behind the painting, but inexplicably there is no safe there. But there is a post-it note stuck to the back of the picture.')
    }
  },
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("postit_note", TAKEABLE(), READABLE(), {
  alias: 'post-it note',
  examine: "The sticky yellow note has something written on it; the number {show:computer:code}.",
  read: "The post-it note just has six digits written on it: {show:computer:code}.",
  loc: 'office',
  scenery: true,
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("chair", FURNITURE({ sit: true, stand: true }), {
  examine: "This is an elegant, white office chair in good condition.",
  loc: 'office',
  scenery: true,
  afterPostureOn: function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Professor_Kleinscope' does not exist on ... Remove this comment to see the full error message
    if (w.Professor_Kleinscope.loc === 'office' && options.posture === 'sit') {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Making yourself at home, I see...' notes Professor Kleinscope.")
    }
  },
  testPostureOn: function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Professor_Kleinscope' does not exist on ... Remove this comment to see the full error message
    if (w.Professor_Kleinscope.flag && options.posture === 'sit') return true
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (options.posture === 'sit') return falsemsg("You think about " + options.posture + " on the chair, but are unsure how Professor Kleinscope feel about it - given he is already sat on it.")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Professor_Kleinscope' does not exist on ... Remove this comment to see the full error message
    if (w.Professor_Kleinscope.loc === 'office' && options.posture === 'stand') {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'I'd rather you kept your feet {i:off} the furniture,' says Professor Kleinscope crossly.")
    }
  },
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("desk", {
  examine: "The desk is artfully curved, and made of a pale wood.",
  loc: 'office',
  scenery: true,
  attachable: true,
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("computer", {
  examine: "The computer is so old it is beige.",
  loc: 'office',
  scenery: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'int' does not exist on type '{ buffer: n... Remove this comment to see the full error message
  code: Quest.Random.rndm.int(10000, 999999).toString(),
  use: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Professor_Kleinscope' does not exist on ... Remove this comment to see the full error message
    if (!w.Professor_Kleinscope.flag) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You cannot use the computer while Professor Kleinscope is sat there using it himself!")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
      hint.now("talkProf")
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Professor_Kleinscope' does not exist on ... Remove this comment to see the full error message
    else if (w.Professor_Kleinscope.loc === 'office') {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You reach a hand out to the keyboard. 'Hands off!' insists the Professor.{once: 'I have some very important files on there, and I don't want the likes of you messing with them.'}")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg("I have a feeling if we just wait a few turns Kleinscope will head off and look for his dinner.")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You press a key on the keyboard, and a message appears on the screen: 'Please input your six digit PIN.'")
      askText("PIN?", function (result: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'computer' does not exist on type '{}'.
        if (result === w.computer.code) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("You type \"" + result + "\", and unlock the computer. You put in your USB stick, and download the files... It takes nearly twenty minutes; this is one slow computer.")
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'before' does not exist on type '{}'.
          if (hint.before('smashWindow')) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            tmsg("Cool, you found the number without any prompting from me.")
          }
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("As you remove the USB stick, an alarm sounds, and you hear a voice: 'Warning: Illegal access to USB port detected. Warning: Illegal access to USB port detected.'")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          tmsg("Who knew such an old computer would be protected like that? The Professor will be here soon, coming up the lift. You need to find another way out. How about the window?")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          tmsg("I've held you hand for long enough, let's see if you can do this on your own - but remember, you can use the HINT command if you are stuck.")
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'old_newspaper' does not exist on type '{... Remove this comment to see the full error message
          if (w.old_newspaper.loc !== 'me' && w.rope.isAtLoc('me') && w.old_newspaper.loc !== 'office' && !w.rope.isAtLoc('office')) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            tmsg("That said, I see you lost the newspaper and the rope somewhere. First rule of playing adventure games; never leave anything behind unless you have to. Through the magical power of Tutorial-Guy, I will summon them here for you, just on the off-chance they will be needed.")
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'old_newspaper' does not exist on type '{... Remove this comment to see the full error message
            w.old_newspaper.loc = 'office'
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'rope' does not exist on type '{}'.
            w.rope.locs = ['office']
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'rope' does not exist on type '{}'.
            w.rope.tiedTo1 = false
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'rope' does not exist on type '{}'.
            w.rope.tiedTo2 = false
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'old_newspaper' does not exist on type '{... Remove this comment to see the full error message
          else if (w.old_newspaper.loc !== 'me' && w.old_newspaper.loc !== 'office') {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            tmsg("That said, I see you lost the newspaper somewhere. First rule of playing adventure games; never leave anything behind unless you have to. Through the magical power of Tutorial-Guy, I will summon it here for you, just on the off-chance it will be needed.")
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'old_newspaper' does not exist on type '{... Remove this comment to see the full error message
            w.old_newspaper.loc = 'office'
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'rope' does not exist on type '{}'.
          else if (!w.rope.isAtLoc('me') && !w.rope.isAtLoc('office')) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            tmsg("That said, I see you lost the rope somewhere. First rule of playing adventure games; never leave anything behind unless you have to. Through the magical power of Tutorial-Guy, I will summon it here for you, just on the off-chance it will be needed.")
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'rope' does not exist on type '{}'.
            w.rope.locs = ['office']
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'rope' does not exist on type '{}'.
            w.rope.tiedTo1 = false
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'rope' does not exist on type '{}'.
            w.rope.tiedTo2 = false
          }

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
          hint.now('smashWindow')
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'office' does not exist on type '{}'.
          w.office.lift_exit_locked = true
        }
        else {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("You type \"" + result + "\", but it fails to unlock the computer.")
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
          hint.now("findCode")
        }
      })
    }
  },
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createRoom("lift", TRANSIT("east"), {
  regex: /elevator/,
  desc: function () {
    return "The lift is small; according the plaque it is limited to just three people. There are three buttons, labelled one to three. A label above indicates the lift is at \"{transitDest}\"."
  },
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  east: new Exit("laboratory"),
  afterFirstEnter: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    hint.now("press3")
  },
  testTransit: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'reactor_room' does not exist on type '{}... Remove this comment to see the full error message
    if (!w.reactor_room.reactorRunning) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The lift does not seem to be working.")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
      hint.now("askRLift")
      return false
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'rope' does not exist on type '{}'.
    if (w.rope.locs.includes("lift") && w.rope.locs.length > 2) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The lift door closes... gets stopped by the rope, and then opens again.")
      if (!this.ropeFlag) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        tmsg("What have you done? I said nothing about tying the rope to something! I've got a bad feeling about this...")
        this.ropeFlag
      }
      return false
    }
    return true;
  },
  afterTransitMove: function (transitDest: any, exitName: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    if (transitDest === 'office') hint.now("eastOffice")
  }
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("button_3", TRANSIT_BUTTON("lift"), {
  alias: "Button: 3",
  examine: "A button with the letter 3 on it.",
  transitDest: "office",
  title: 'Level 3: Office',
  transitAlreadyHere: "You press the button; nothing happens.",
  transitGoToDest: "You press the button; the door closes and the lift ascends.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("button_2", TRANSIT_BUTTON("lift"), {
  alias: "Button: 2",
  examine: "A button with the letter 2 on it.",
  title: 'Level 2: Lounge',
  transitDest: "lounge",
  transitAlreadyHere: "You press the button; nothing happens.",
  transitGoToDest: "You press the button; the door closes and the lift moves.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("button_1", TRANSIT_BUTTON("lift"), {
  alias: "Button: 1",
  examine: "A button with the letter 1 on it.",
  title: 'Level 1: Laboratory',
  transitDest: "laboratory",
  transitAlreadyHere: "You press the button; nothing happens.",
  transitGoToDest: "You press the button; the door closes and the lift descends.",
})

