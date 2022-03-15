
// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("me", Quest.Templates.PLAYER(), {
  loc: "lobby",
  synonyms: ["me", "myself", "player"],
  examine: "Just a regular guy.",
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('cloak', Quest.Templates.WEARABLE(), {
  examine: 'The cloak is black... Very black... So black it seems to absorb light.',
  worn: true,
  loc: 'me'
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("lobby", {
  desc: "There is something oppressive about the {cloakHere:dark:dingy} {once:room:foyer}; a presence in the air that almost suffocates you. It's former glory has all but faded; the walls still sport old posters from productions that ended over twenty years ago. Paint is peeling, dust is everywhere and it smells decidedly musty. You can see doors to the north, west and south.",
  beforeFirstEnter: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("You hurry through the night, keen to get out of the rain. Ahead, you can see the old opera house, a brightly-lit beacon of safety.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Moments later you are pushing though the doors into the foyer. Now that you are here it does not seem so bright. The doors close behind you with an ominous finality...")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("")
  },
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  north: new Quest.World.Exit('lobby', {
    use: function () {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('You try the doors out of the opera house, but they are locked. {once:{i:How did that happen?} you wonder.}')
      return false
    }
  }),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Quest.World.Exit('cloakroom'),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  south: new Quest.World.Exit('bar'),
  smell: 'It smells of damp and neglect in here.',
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('posters', {
  examine: 'The posters are ripped and peeling off the wall.',
  read: 'You spend a few minutes reading about the shows they put on twenty-odd years ago.... {i:Die Zauberflöte}... {i:Guillaume Tell}... {i:A Streetcar Named Desire}. Wasn\'t that a play?',
  scenery: true,
  plural: true,
  loc: 'lobby'
})






// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("cloakroom", {
  desc: function () {
    let s = "The cloakroom is {cloakHere:dimly:brightly} lit, and is little more than a cupboard. "
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'cloak' does not exist on type '{}'.
    if (Quest.World.w.cloak.isAtLoc('hook')) {
      s = s + "Your cloak is hung from the only hook."
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'cloak' does not exist on type '{}'.
    else if (Quest.World.w.cloak.isAtLoc(this)) {
      s = s + "There is a single hook, which apparently was not good enough for you, to judge from the cloak on the floor."
    }
    else {
      s = s + "There is a single hook, which strikes you as strange for a cloakroom."
    }
    return s + " The only way out is back to the east. "
  },
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  east: new Quest.World.Exit('lobby'),
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('hook', Quest.Templates.SURFACE(), {
  synonyms: ["peg"],
  hookable: true,
  scenery: true,
  examine: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'cloak' does not exist on type '{}'.
    if (Quest.World.w.cloak.isAtLoc('hook')) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("An ornate brass hook, with a cloak hanging from it.")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("An ornate brass hook, ideal for hanging cloaks on.")
    }
  },
  loc: 'cloakroom'
})







// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("bar", {
  desc: function () {
    if (cloakHere()) {
      return "It is too dark to see anything except the door to the north."
    }
    else {
      return "The bar is dark, and somehow brooding. It is also thick with dust. So much so that someone has scrawled a message in the dust on the floor. The only exit is north."
    }
  },
  beforeEnter: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'message' does not exist on type '{}'.
    Quest.World.w.message.visible = !cloakHere()
  },
  afterExit: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'message' does not exist on type '{}'.
    Quest.World.w.message.count = 0
  },
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  north: new Quest.World.Exit('lobby'),
  smell: 'There is a musty smell, but behind that, something else, something that reminds you of the zoo, perhaps?',
  listen: 'Is there something moving?',
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('message', {
  synonyms: ["writing", "note", "dust"],
  count: 0,
  disturbed: 0,
  scenery: true,
  loc: 'bar',
  examine: function () {
    if (cloakHere()) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("You cannot see any message, it is too dark.")
      return
    }
    if (this.disturbed < 3) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("The message in the dust says 'You have won!'")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("The message in the dust says 'You have lost!'")
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'finish' does not exist on type '{ nextid... Remove this comment to see the full error message
    Quest.IO.io.finish()
  },
  read: function () { this.examine() },
  eventPeriod: 1,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'finished' does not exist on type '{ next... Remove this comment to see the full error message
  eventIsActive: function () { return Quest.World.player.isAtLoc('bar') && !Quest.IO.io.finished },
  eventScript: function () {
    this.count++
    if (this.count > 1) {
      if (this.disturbed === 0) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("You think it might be a bad idea to disturb things in the dark.")
      }
      else {
        if (!Quest.World.player.suppress_background_sounds) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("You can hear {random:scratching:something moving in the dark:rasping breathing}.")
        }
      }
      this.disturbed++
    }
  },
})









// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('walls', {
  examine: function () {
    if (cloakHere() && Quest.World.player.isAtLoc('bar')) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("It is too dark to see the walls.")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("The walls are covered in a faded red and gold wallpaper, that is showing signs of damp.")
    }
  },
  scenery: true,
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  isLocatedAt: function (loc: any) { return Quest.World.w[loc].room },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('ceiling', {
  examine: function () {
    if (cloakHere() && Quest.World.player.isAtLoc('bar')) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("It is too dark to see the ceiling.")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("The ceiling is - or was - white. Now it is a dirty grey.")
    }
  },
  scenery: true,
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  isLocatedAt: function (loc: any) { return Quest.World.w[loc].room },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('floor', {
  synonyms: ["carpet"],
  examine: function () {
    if (cloakHere() && Quest.World.player.isAtLoc('bar')) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("It is too dark to see the floor.")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("A red carpet covers the floor, worn almost though in places.")
    }
  },
  scenery: true,
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  isLocatedAt: function (loc: any) { return Quest.World.w[loc].room },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('doors', {
  examine: function () {
    if (cloakHere() && Quest.World.player.isAtLoc('bar')) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("It is too dark to see the door properly.")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("All the doors are wooden, and painted white.")
    }
  },
  scenery: true,
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  isLocatedAt: function (loc: any) { return Quest.World.w[loc].room },
})
