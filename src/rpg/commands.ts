"use strict";




// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.push(new Cmd('Attack', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [cmdRules.isPresent],
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    { scope: parser.isPresent }
  ],
  defmsg: "No point attacking {nm:item:the}."
}))


// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.push(new Cmd('Search', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [cmdRules.isPresent],
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    { scope: parser.isPresent }
  ],
  defmsg: "No point attacking {nm:item:the}."
}))

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.push(new Cmd('Equip', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
  rules: [cmdRules.isHeld],
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: parser.isHeld }
  ],
  defmsg: "{nv:item:be:true} not something you can equip.",
}))


// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.push(new Cmd('Unequip', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
  rules: [cmdRules.isHeld],
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: parser.isHeld }
  ],
  defmsg: "{nv:item:be:true} not something you can equip.",
}))





// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.push(new Cmd('LearnSpell', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [cmdRules.isPresent],
  objects: [
    { special: 'text' }
  ],
  script: function (objects: any) {
    const spell = rpg.find(objects[0])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'spell' does not exist on type 'never'.
    if (!spell || !spell.spell) return failedmsg("There is no spell called " + objects[0] + ".")

    const source = rpg.isSpellAvailable(player, spell)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (!source) return failedmsg("You do not have anything you can learn {i:" + spell.name + "} from.")

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
    player.skillsLearnt.push(spell.name)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("You learn {i:" + spell.name + "} from " + lang.getName(source, { article: Quest.Utilities.DEFINITE }) + ".")
    return world.SUCCESS
  },
}))



// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.push(new Cmd('CastSpell', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [cmdRules.isPresent],
  objects: [
    { special: 'text' }
  ],
  script: function (objects: any) {
    const spell = rpg.find(objects[0])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'spell' does not exist on type 'never'.
    if (!spell || !spell.spell) return failedmsg("There is no spell called " + objects[0] + ".")

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
    if (!player.skillsLearnt.includes(spell.name)) return failedmsg("You do not know the spell {i:" + spell.name + "}.")

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'noTarget' does not exist on type 'never'... Remove this comment to see the full error message
    if (!spell.noTarget) return failedmsg("You need a target for the spell {i:" + spell.name + "}.")

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
    const attack = Attack.createAttack(player, player, spell)
    if (!attack) return world.FAILED
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'apply' does not exist on type 'true | At... Remove this comment to see the full error message
    attack.apply().output()
    return world.SUCCESS
  },
}))





// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.push(new Cmd('CastSpellAt', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [cmdRules.isPresent],
  objects: [
    { special: 'text' },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    { scope: parser.isPresent },
  ],
  script: function (objects: any) {
    const spell = rpg.find(objects[0])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'spell' does not exist on type 'never'.
    if (!spell || !spell.spell) return failedmsg("There is no spell called " + objects[0] + ".")

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
    if (!player.skillsLearnt.includes(spell.name)) return failedmsg("You do not know the spell {i:" + spell.name + "}.")

    const target = objects[1][0]

    // check target

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'damage' does not exist on type 'never'.
    if (spell.damage && target.health === undefined) return failedmsg("You can't attack that.")

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
    const attack = Attack.createAttack(player, target, spell)
    if (!attack) return world.FAILED
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'apply' does not exist on type 'true | At... Remove this comment to see the full error message
    attack.apply().output()
    return world.SUCCESS
  },
}))


// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.push(new Cmd('DebugRPG', {
  regex: /^rpg$/,
  objects: [
  ],
  script: function (objects: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'attackOutputLevel' does not exist on typ... Remove this comment to see the full error message
    Quest.Settings.settings.attackOutputLevel = 10
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg("All output from attacks will now be seen.");
    return world.SUCCESS_NO_TURNSCRIPTS
  },
}))



