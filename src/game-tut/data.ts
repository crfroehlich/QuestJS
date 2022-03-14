"use strict"

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("me", PLAYER(), {
  loc: "lounge",
  synonyms: ['me', 'myself'],
  examine: "Just a regular guy.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("lounge", {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  east: new Exit("kitchen"),
  desc: "A smelly room with an old settee and a tv.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("coin", TAKEABLE(), {
  loc: "lounge",
  examine: "A gold coin.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("glass_cabinet", CONTAINER(), {
  loc: "lounge",
  transparent: true,
  examine: "A cabinet with a glass front",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("ornate_doll", TAKEABLE(), LOCKED_WITH("cabinet_key"), {
  loc: "glass_cabinet",
  examine: "A fancy doll, eighteenth century.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("boots", WEARABLE(), {
  loc: "lounge",
  pronouns: Quest.lang.pronouns.plural,
  examine: "Some old boots.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("Lara", NPC(true), {
  loc: "lounge",
  examine: "A normal-sized rabbit.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("torch", TAKEABLE(), SWITCHABLE(false, 'providing light'), {
  loc: "lounge",
  examine: "A small black torch.",
  synonyms: ["flashlight"],
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
  power: 3,
  charge: function (options: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (options.char.loc != "garage") return falsemsg("There is nothing to charge the torch with here.")

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg("{pv:char:charge:true} the torch - it should last for hours now.", options)
    this.power = 20
    return true
  },
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("garage_key", KEY(), {
  loc: "lounge",
  examine: "A big key.",
})







// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("kitchen", {
  desc: 'A clean room, a clock hanging on the wall. There is a sink in the corner.',
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Exit("lounge"),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  down: new Exit('basement', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'trapdoor' does not exist on type '{}'.
    isHidden: function () { return w.trapdoor.closed; },
  }),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  north: new Exit("garage"),
  afterFirstEnter: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("A fresh smell here!");
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("trapdoor", OPENABLE(false), {
  loc: "kitchen",
  examine: "A small trapdoor in the floor.",
})







// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("garage", {
  desc: 'An empty garage.',
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  south: new Exit('kitchen'),
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("cabinet_key", KEY(), {
  loc: "garage",
  examine: "A small brass key."
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("garage_door", LOCKED_DOOR("garage_key", "kitchen", "garage"), {
  examine: "The door to the garage.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("charger", {
  loc: "garage",
  examine: "A device bigger than a washing machine to charge a torch? It has a compartment and a button. {charger_state}.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("charger_compartment", COMPONENT("charger"), CONTAINER(true), {
  alias: "compartment",
  examine: "The compartment is just the right size for the torch. It is {if:charger_compartment:closed:closed:open}.",
  testDropIn: function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
    const contents = w.charger_compartment.getContents();
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (contents.length > 0) return falsemsg("The compartment is full.")

    return true
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("charger_button", COMPONENT("charger"), {
  examine: "A big red button.",
  alias: "button",
  push: function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
    if (!w.charger_compartment.closed || w.torch.loc !== "charger_compartment") return falsemsg("{pv:char:push:true} the button, but nothing happens.", options)

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg("{pv:char:push:true} the button. There is a brief hum of power, and a flash.", options)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'torch' does not exist on type '{}'.
    w.torch.power = 20
    return true
  },
})








// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("basement", {
  desc: "A dank room, with piles of crates everywhere.",
  darkDesc: "It is dark, but you can just see the outline of the trapdoor above you.",
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  up: new Exit('kitchen'),
  lightSource: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'light_switch' does not exist on type '{}... Remove this comment to see the full error message
    return w.light_switch.switchedon ? world.LIGHT_FULL : world.LIGHT_NONE;
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("light_switch", SWITCHABLE(false), {
  loc: "basement",
  alias: "light switch",
  examine: "A switch, presumably for the light.",
})