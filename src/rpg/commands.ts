"use strict";




// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('Attack', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isPresent],
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isPresent }
  ],
  defmsg: "No point attacking {nm:item:the}."
}))


// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('Search', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isPresent],
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isPresent }
  ],
  defmsg: "No point attacking {nm:item:the}."
}))

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('Equip', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isHeld],
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld }
  ],
  defmsg: "{nv:item:be:true} not something you can equip.",
}))


// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('Unequip', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isHeld],
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld }
  ],
  defmsg: "{nv:item:be:true} not something you can equip.",
}))





Quest.Commands.commands.push(new Quest.Command.Cmd('LearnSpell', {
  npcCmd: true,
  rules: [Quest.Command.cmdRules.isPresent],
  objects: [
    { special: 'text' }
  ],
  script: function (objects: any) {
    const spell = rpg.find(objects[0])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'spell' does not exist on type 'never'.
    if (!spell || !spell.spell) return Quest.IO.failedmsg("There is no spell called " + objects[0] + ".")

    const source = rpg.isSpellAvailable(Quest.World.player, spell)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (!source) return Quest.IO.failedmsg("You do not have anything you can learn {i:" + spell.name + "} from.")

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
    Quest.World.player.skillsLearnt.push(spell.name)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("You learn {i:" + spell.name + "} from " + Quest.lang.getName(source, { article: Quest.Utilities.DEFINITE }) + ".")
    return Quest.World.world.SUCCESS
  },
}))



// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('CastSpell', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isPresent],
  objects: [
    { special: 'text' }
  ],
  script: function (objects: any) {
    const spell = rpg.find(objects[0])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'spell' does not exist on type 'never'.
    if (!spell || !spell.spell) return Quest.IO.failedmsg("There is no spell called " + objects[0] + ".")

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
    if (!Quest.World.player.skillsLearnt.includes(spell.name)) return Quest.IO.failedmsg("You do not know the spell {i:" + spell.name + "}.")

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'noTarget' does not exist on type 'never'... Remove this comment to see the full error message
    if (!spell.noTarget) return Quest.IO.failedmsg("You need a target for the spell {i:" + spell.name + "}.")

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
    const attack = Attack.createAttack(Quest.World.player, Quest.World.player, spell)
    if (!attack) return Quest.World.world.FAILED
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'apply' does not exist on type 'true | At... Remove this comment to see the full error message
    attack.apply().output()
    return Quest.World.world.SUCCESS
  },
}))





// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('CastSpellAt', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isPresent],
  objects: [
    { special: 'text' },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isPresent },
  ],
  script: function (objects: any) {
    const spell = rpg.find(objects[0])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'spell' does not exist on type 'never'.
    if (!spell || !spell.spell) return Quest.IO.failedmsg("There is no spell called " + objects[0] + ".")

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
    if (!Quest.World.player.skillsLearnt.includes(spell.name)) return Quest.IO.failedmsg("You do not know the spell {i:" + spell.name + "}.")

    const target = objects[1][0]

    // check target

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'damage' does not exist on type 'never'.
    if (spell.damage && target.health === undefined) return Quest.IO.failedmsg("You can't attack that.")

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
    const attack = Attack.createAttack(Quest.World.player, target, spell)
    if (!attack) return Quest.World.world.FAILED
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'apply' does not exist on type 'true | At... Remove this comment to see the full error message
    attack.apply().output()
    return Quest.World.world.SUCCESS
  },
}))


// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('DebugRPG', {
  regex: /^rpg$/,
  objects: [
  ],
  script: function (objects: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'attackOutputLevel' does not exist on typ... Remove this comment to see the full error message
    Quest.Settings.settings.attackOutputLevel = 10
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg("All output from attacks will now be seen.");
    return Quest.World.world.SUCCESS_NO_TURNSCRIPTS
  },
}))



