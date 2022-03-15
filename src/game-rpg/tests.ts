"use strict";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'resetOnCompletion' does not exist on typ... Remove this comment to see the full error message
test.resetOnCompletion = false


// @ts-expect-error ts-migrate(2339) FIXME: Property 'tests' does not exist on type '{}'.
test.tests = function () {


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'suppressAntagonise' does not exist on ty... Remove this comment to see the full error message
  for (const skill of Quest.RPG.rpg.list) skill.suppressAntagonise = true



  //Quest.World.player.skillsLearnt = ["Double attack", "Fireball",  "Commune with animal", "Unlock", "Stoneskin", "Steelskin", "Lightning bolt", "Ice shard", "Psi-blast"]
  //ioUpdateCustom()

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'attackOutputLevel' does not exist on typ... Remove this comment to see the full error message
  Quest.Settings.settings.attackOutputLevel = 2
  //Quest.Settings.settings.includeHitsInExamine = true
  Quest.World.player.currentWeatherDisabled = true

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Elements");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("fire", Quest.RPG.rpg.elements.opposed('frost'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("frost", Quest.RPG.rpg.elements.opposed('fire'))



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Finding foes")
  let l

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  l = Quest.RPG.rpg.getAll(Quest.World.w.orc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(4, l.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.orc, l[0])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  l = Quest.RPG.rpg.getAllBut(Quest.World.w.orc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(3, l.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, l.includes(Quest.World.w.orc))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  l = Quest.RPG.rpg.getFoes(Quest.World.w.orc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(3, l.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.orc, l[0])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  l = Quest.RPG.rpg.getFoesBut(Quest.World.w.orc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(2, l.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, l.includes(Quest.World.w.orc))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  l = Quest.RPG.rpg.getHostiles(Quest.World.w.orc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, l.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.orc, l[0])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  l = Quest.RPG.rpg.getHostilesBut(Quest.World.w.orc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, l.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, l.includes(Quest.World.w.orc))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.agressive = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  l = Quest.RPG.rpg.getHostiles(Quest.World.w.orc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, l.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.orc, l[0])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  l = Quest.RPG.rpg.getHostilesBut(Quest.World.w.orc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, l.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, l.includes(Quest.World.w.orc))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  delete Quest.World.w.goblin.agressive






  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Equip")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('unarmed', Quest.World.player.getEquippedWeapon().alias)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("i", "You are carrying a flail, an ice amulet, a knife and a long bow.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("equip knife", "You draw the knife.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("i", "You are carrying a flail, an ice amulet, a knife (equipped) and a long bow.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('knife', Quest.World.player.getEquippedWeapon().alias)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("equip knife", "It already is.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop knife", "You drop the knife.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('unarmed', Quest.World.player.getEquippedWeapon().alias)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(undefined, Quest.World.player.equipped)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("take knife", "You take the knife.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("unequip knife", "It already is.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("equip knife", "You draw the knife.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("unequip knife", "You put away the knife.");


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Armour")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'armourScaling' does not exist on type '{... Remove this comment to see the full error message
  Quest.Settings.settings.armourScaling = 1
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, Quest.World.player.getArmour())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get helmet", "You take the helmet.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, Quest.World.player.getArmour())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear helmet", "You put on the helmet.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(10, Quest.World.player.getArmour())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get chestplate", "You take the chestplate.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(10, Quest.World.player.getArmour())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear chestplate", "You put on the chestplate.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(30, Quest.World.player.getArmour())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'armourScaling' does not exist on type '{... Remove this comment to see the full error message
  Quest.Settings.settings.armourScaling = 10



  //TODO
  // Monster descriptions that include an injury note and optionally hits
  // Also lore and truesight, search
  // behavior - hostile, following, guarding, etc.

  // non-corporeal
  // death, afterDeath, corpseDescription

  // pickpocket



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.RPG.Attack.createAttack (unarmed) misses")
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 2.
  let attack = Quest.RPG.Attack.createAttack(Quest.World.player, Quest.World.w.goblin)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('me', attack.attacker.name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.goblin], attack.primaryTargets)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('d4', attack.damage)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, attack.offensiveBonus)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime(3)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'resolve' does not exist on type 'boolean... Remove this comment to see the full error message
  attack.resolve(Quest.World.w.goblin, true, 0)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(40, Quest.World.w.goblin.health)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.aggressive = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  Quest.World.w.orc.aggressive = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'snotling' does not exist on type '{}'.
  Quest.World.w.snotling.aggressive = false


  // Turn off getting aggressive
  Quest.World.w.goblin.antagonise = function () { }
  Quest.World.w.goblin.afterAttack = function () { }
  Quest.World.w.orc.antagonise = function () { }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.RPG.Attack.createAttack (unarmed)")
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 2.
  attack = Quest.RPG.Attack.createAttack(Quest.World.player, Quest.World.w.goblin)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('me', attack.attacker.name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.goblin], attack.primaryTargets)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('d4', attack.damage)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, attack.offensiveBonus)

  Quest.Random.rndm.prime([19, 4])
  attack.resolve(Quest.World.w.goblin, true, 0)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(36, Quest.World.w.goblin.health)
  Quest.World.w.goblin.armour = 2
  Quest.Random.rndm.prime([19, 4])
  attack.resolve(Quest.World.w.goblin, true, 0)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(34, Quest.World.w.goblin.health)
  Quest.World.w.goblin.armour = 0
  Quest.World.w.goblin.health = 40

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.RPG.Attack.createAttack (flail)")
  const oldProcessAttack = Quest.World.player.modifyOutgoingAttack
  Quest.World.player.modifyOutgoingAttack = function (attack: any) { attack.offensiveBonus += 2 }
  Quest.World.w.flail.equipped = true

  //Quest.Settings.settings.attackOutputLevel = 5
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 2.
  attack = Quest.RPG.Attack.createAttack(Quest.World.player, Quest.World.w.orc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('me', attack.attacker.name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('2d10+4', attack.damage)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(5, attack.offensiveBonus)  // player has + 3 plus 2 from l07 above


  Quest.Random.rndm.prime([19, 4, 7])
  attack.resolve(Quest.World.w.goblin, true, 0)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(25, Quest.World.w.goblin.health)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.armour = 2
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19, 4, 7])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'resolve' does not exist on type 'boolean... Remove this comment to see the full error message
  attack.resolve(Quest.World.w.goblin, true, 0)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(14, Quest.World.w.goblin.health)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.armour = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.health = 40

  Quest.World.player.modifyOutgoingAttack = oldProcessAttack
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'flail' does not exist on type '{}'.
  Quest.World.w.flail.equipped = false





  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.RPG.Attack.createAttack (flail, defensive)")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'flail' does not exist on type '{}'.
  Quest.World.w.flail.equipped = true

  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
  attack = Quest.RPG.Attack.createAttack(Quest.World.player, Quest.World.w.goblin, Quest.RPG.rpg.findSkill("Defensive attack"))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19, 4, 7])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'apply' does not exist on type 'boolean |... Remove this comment to see the full error message
  attack.apply()
  //attack.resolve(Quest.World.w.goblin, true, 0)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(25, Quest.World.w.goblin.health)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['Defensive'], Quest.World.player.activeEffects)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", "Time passes...")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([], Quest.World.player.activeEffects)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.health = 40
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'flail' does not exist on type '{}'.
  Quest.World.w.flail.equipped = false


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.RPG.Attack.createAttack (bow, defensive)")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'long_bow' does not exist on type '{}'.
  Quest.World.w.long_bow.equipped = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'long_bow' does not exist on type '{}'.
  const bowTmp = Quest.World.w.long_bow.activeEffects
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'long_bow' does not exist on type '{}'.
  Quest.World.w.long_bow.activeEffects = []

  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
  attack = Quest.RPG.Attack.createAttack(Quest.World.player, Quest.World.w.goblin, Quest.RPG.rpg.findSkill("Defensive attack"))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, attack)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'long_bow' does not exist on type '{}'.
  Quest.World.w.long_bow.equipped = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'long_bow' does not exist on type '{}'.
  Quest.World.w.long_bow.activeEffects = bowTmp


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.RPG.Attack.createAttack (goblin)");
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 2.
  attack = Quest.RPG.Attack.createAttack(Quest.World.w.goblin, Quest.World.player)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('goblin', attack.attacker.name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.me], attack.primaryTargets)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('d8', attack.damage)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, attack.offensiveBonus)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19, 5])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'resolve' does not exist on type 'boolean... Remove this comment to see the full error message
  attack.resolve(Quest.World.w.me, true, 0)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(98, Quest.World.w.me.health)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
  Quest.World.w.me.health = 100











  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("attack command, success");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19, 4, 7])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'flail' does not exist on type '{}'.
  Quest.World.w.flail.equipped = true

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('attack goblin', ['You attack the goblin.', /A hit/, "The attack does 15 hits, the goblin's health is now 25."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(25, Quest.World.w.goblin.health)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.health = 40
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'flail' does not exist on type '{}'.
  Quest.World.w.flail.equipped = false



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("attack command, fails");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime(4)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'flail' does not exist on type '{}'.
  Quest.World.w.flail.equipped = true

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('attack goblin', ['You attack the goblin.', /A miss/])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(40, Quest.World.w.goblin.health)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'flail' does not exist on type '{}'.
  Quest.World.w.flail.equipped = false




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("learn fireball")

  const spell = Quest.RPG.rpg.find('fireball')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, spell.spell)

  Quest.World.player.skillsLearnt = ["Double attack"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast nonsense', ['There is no spell called nonsense.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast fireball', ['You do not know the spell <i>Fireball</i>.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('learn nonsense', ['There is no spell called nonsense.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('learn fireball', ['You do not have anything you can learn <i>Fireball</i> from.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('get spellbook', ['You take the spellbook.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('learn fireball', ['You learn <i>Fireball</i> from the spellbook.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Double attack", "Fireball"], Quest.World.player.skillsLearnt)
  //goblin, orc, snotling, rabbit

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19, 4, 4, 19, 2, 2, 4, 4])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast fireball', ['You cast the <i>Fireball</i> spell.', 'The room is momentarily filled with fire.', 'The goblin reels from the explosion.', "The attack does 8 hits, the goblin's health is now 32.", 'The orc reels from the explosion.', "The attack does 4 hits, the orc's health is now 56.", 'The snotling ignores it.', 'The rabbit ignores it.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.health = 40
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  Quest.World.w.orc.health = 60





  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("learn Ice shard")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('learn ice shard', ['You learn <i>Ice shard</i> from the spellbook.'])
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Ice shard"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast ice shard', ['You need a target for the spell <i>Ice shard</i>.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('drop spellbook', ['You drop the spellbook.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19, 4, 7, 9])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast Ice shard at goblin', ['You cast the <i>Ice shard</i> spell.', 'A shard of ice jumps from your finger to the goblin!', "The attack does 20 hits, the goblin's health is now 20."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.health = 40




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Lightning bolt")
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Lightning bolt"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast lightning bolt', ['You need a target for the spell <i>Lightning bolt</i>.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([
    19, 4, 7, 9,

    // For the orc
    2,

    // For the snotling
    19, 4, 7,
  ])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast Lightning bolt at goblin', ['You cast the <i>Lightning bolt</i> spell.', 'A lightning bolt jumps from your out-reached hand to the goblin!', "The attack does 20 hits, the goblin's health is now 20.", 'A smaller bolt jumps your target, but entirely misses the orc!', 'A smaller bolt jumps your target to the snotling!', "The attack does 11 hits, the snotling's health is now 9."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.health = 40
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'snotling' does not exist on type '{}'.
  Quest.World.w.snotling.health = 20

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime(4)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast lightning bolt at goblin', ['You cast the <i>Lightning bolt</i> spell.', 'A lightning bolt jumps from your out-reached hand to the goblin, fizzling out before it can actually do anything.'])




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.RPG.Attack.createAttack  (goblin, spells)")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.spellCasting = 3

  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
  attack = Quest.RPG.Attack.createAttack(Quest.World.w.goblin, Quest.World.player, Quest.RPG.rpg.findSkill('Ice shard'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('goblin', attack.attacker.name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.me], attack.primaryTargets)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('3d6', attack.damage)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(3, attack.offensiveBonus)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19, 5, 5, 5])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'resolve' does not exist on type 'boolean... Remove this comment to see the full error message
  attack.resolve(Quest.World.w.me, true, 0)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(94, Quest.World.w.me.health)


  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
  attack = Quest.RPG.Attack.createAttack(Quest.World.w.goblin, Quest.World.player, Quest.RPG.rpg.findSkill('Psi-blast'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('goblin', attack.attacker.name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19, 5, 5, 5])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'resolve' does not exist on type 'boolean... Remove this comment to see the full error message
  attack.resolve(Quest.World.w.me, true, 0)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(79, Quest.World.w.me.health)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ice_amulet' does not exist on type '{}'.
  Quest.World.w.ice_amulet.worn = true
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
  attack = Quest.RPG.Attack.createAttack(Quest.World.w.goblin, Quest.World.player, Quest.RPG.rpg.findSkill('Ice shard'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime(19)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'resolve' does not exist on type 'boolean... Remove this comment to see the full error message
  attack.resolve(Quest.World.w.me, true, 0)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(79, Quest.World.w.me.health)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("A shard of ice jumps from the goblin's finger to you, but the ice amulet protects you, and you take no damage.", attack.reportTexts[14].t)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
  Quest.World.w.me.health = 100
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.spellCasting = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ice_amulet' does not exist on type '{}'.
  Quest.World.w.ice_amulet.worn = false




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("learn ongoing spells")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('get spellbook', ['You take the spellbook.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('learn steelskin', ['You learn <i>Steelskin</i> from the spellbook.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('learn stoneskin', ['You learn <i>Stoneskin</i> from the spellbook.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('drop spellbook', ['You drop the spellbook.'])



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("cast ongoing spells")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([], Quest.World.player.activeEffects)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast stoneskin', ['You cast the <i>Stoneskin</i> spell.', 'Your skin becomes as hard as stone - and yet still just as flexible.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['Stoneskin'], Quest.World.player.activeEffects)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast steelskin', ['You cast the <i>Steelskin</i> spell.', 'Your skin becomes as hard as steel - and yet still just as flexible.', 'The <i>Stoneskin</i> effect on you expires.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['Steelskin'], Quest.World.player.activeEffects)







  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("ongoing spells expire")
  Quest.World.player['countdown_Steelskin'] = 3
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...',])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(2, Quest.World.player['countdown_Steelskin'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, Quest.World.player['countdown_Steelskin'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...', 'The <i>Steelskin</i> effect on you expires.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(undefined, Quest.World.player['countdown_Steelskin'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([], Quest.World.player.activeEffects)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...'])





  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("cast unlock")
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Unlock"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast unlock', ['You cast the <i>Unlock</i> spell.', 'The door to the south unlocks.', 'The practice room door unlocks.', 'The chest unlocks.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast unlock', ['You cast the <i>Unlock</i> spell, but there are no locked doors.'])




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("cast Commune with animal")
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Commune with animal"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('talk to rabbit', [/You spend a few minutes telling the rabbit/])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast commune on rabbit', ['You cast the <i>Commune with animal</i> spell.', 'You can now talk to the rabbit for a short time.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('talk to rabbit', [/You say \'Hello,\' to the rabbit/, /Fading away bunny/])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...', 'The <i>Commune with animal</i> effect on the rabbit expires.'])



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("cast Commune with animal restricted")
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.RPG.rpg.defaultSpellTestUseable = function (char) { return Quest.IO.falsemsg("You have no mana.") }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast commune on rabbit', ['You have no mana.'])
  Quest.RPG.rpg.defaultSpellTestUseable = function (char) { return true }


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("cast Protection from Frost")
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Protection From Frost"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast Protection From Frost', ['You cast the <i>Protection From Frost</i> spell.', 'You take only a third damage from frost-based attacks for six turns.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
  Quest.World.w.me.health = 100
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
  let attack4 = Quest.RPG.Attack.createAttack(Quest.World.w.goblin, Quest.World.player, Quest.RPG.rpg.findSkill('Ice shard'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19, 6, 6, 6])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'resolve' does not exist on type 'boolean... Remove this comment to see the full error message
  attack4.resolve(Quest.World.w.me, true, 0)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(97, Quest.World.w.me.health)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("A shard of ice jumps from the goblin's finger to you!", attack4.reportTexts[14].t)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("cast Vuln to Frost")
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Vulnerability To Frost"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast Vulnerability To Frost on me', ['You cast the <i>Vulnerability To Frost</i> spell.', 'Target takes triple damage from frost-based attacks for six turns.', 'The <i>Protection From Frost</i> effect on you expires.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
  Quest.World.w.me.health = 100
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
  attack4 = Quest.RPG.Attack.createAttack(Quest.World.w.goblin, Quest.World.player, Quest.RPG.rpg.findSkill('Ice shard'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19, 6, 6, 6])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'resolve' does not exist on type 'boolean... Remove this comment to see the full error message
  attack4.resolve(Quest.World.w.me, true, 0)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(73, Quest.World.w.me.health)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("A shard of ice jumps from the goblin's finger to you!", attack4.reportTexts[14].t)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("cast Immunity to Frost")
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Immunity To Frost"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast Immunity To Frost on me', ['You cast the <i>Immunity To Frost</i> spell.', 'You take no damage from frost-based attacks for six turns.', 'The <i>Vulnerability To Frost</i> effect on you expires.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
  Quest.World.w.me.health = 100
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
  attack4 = Quest.RPG.Attack.createAttack(Quest.World.w.goblin, Quest.World.player, Quest.RPG.rpg.findSkill('Ice shard'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19, 6, 6, 6])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'resolve' does not exist on type 'boolean... Remove this comment to see the full error message
  attack4.resolve(Quest.World.w.me, true, 0)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(100, Quest.World.w.me.health)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("A shard of ice jumps from the goblin's finger to you!", attack4.reportTexts[14].t)


  Quest.World.player.skillsLearnt = ["Double attack", "Fireball"]


  // knife does d4+2 normally
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("cast Flaming blade")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([], Quest.World.w.knife.activeEffects)
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Flaming Blade"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast Flaming blade', ['You cast the <i>Flaming Blade</i> spell.', 'The knife now has fire along its blade.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['Flaming Blade'], Quest.World.w.knife.activeEffects)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('equip knife', ['You draw the knife.',])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19, 3, 4])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('attack goblin', ['You attack the goblin.', 'A hit!', "The attack does 9 hits, the goblin's health is now 31."])



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...',])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...', 'The <i>Immunity To Frost</i> effect on you expires.'])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("cast Summon Frost Elemental")
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Summon Lesser Frost Elemental"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast Summon Lesser Frost Elemental', ['You cast the <i>Summon Lesser Frost Elemental</i> spell.', 'The lesser frost elemental appears before you.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19, 3, 4])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('attack elemental', ['You attack the lesser frost elemental.', 'A hit!', "The attack does 18 hits, the lesser frost elemental's health is now 17."])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...',])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...',])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...',])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...', 'The lesser frost elemental disappears.'])



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("cast Lore")
  Quest.World.player.activeEffects = []
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Lore", "Steelskin"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('x rabbit', ['An example of a monster you can talk to after casting the right spell, and is generally not hostile.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast lore', ['You cast the <i>Lore</i> spell.', 'You feel enlightened.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['Lore'], Quest.World.player.activeEffects)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('x rabbit', ['With Lore active, you can learn all about rabbit culture... they like carrots.'])


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'rabbit' does not exist on type '{}'.
  Quest.World.w.rabbit.setLeader()



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("cast Mage Light")
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Lore", "Steelskin", "Mage Light"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast Mage Light', ['You cast the <i>Mage Light</i> spell.', 'You are shines brightly.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['Lore', 'Mage Light'], Quest.World.player.activeEffects)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.World.player.isLight)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.world.LIGHT_FULL, Quest.World.player.lightSource())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('s', ['You head south.', 'The cupboard', 'A large storeroom, with no windows.', 'You can go north.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('n', ['You head north.', 'The practice room', 'A large room with straw scattered across the floor. The only exit is west', 'You can see some boots, a chest, a goblin, an orc (holding a huge shield), a rabbit, a shotgun, a small key, a snotling and a spellbook here.', 'You can go east, south or west.'])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...',])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...', 'You stop shining.'])



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("cast Teleport, etc")
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Returning", "Teleport", "Mark"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast Teleport', ['You cast the <i>Teleport</i> spell.', 'The <i>Teleport</i> spell has no effect - no location has been marked!'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast Mark', ['You cast the <i>Mark</i> spell.', 'This location is marked for future use.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast Returning', ['You cast the <i>Returning</i> spell.', 'The air swirls around you, and everything blurs...', 'The yard', 'A large open area in front of the Great Hall, which is to the south. There is a lake to the north, and you can see an island in the lake.', 'You can see fourteen arrows and Stone of Returning here.', 'You can go north or south.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast Teleport', ['You cast the <i>Teleport</i> spell.', 'The air swirls around you, and everything blurs...', 'The practice room', 'A large room with straw scattered across the floor. The only exit is west', 'You can see some boots, a chest, a goblin, an orc (holding a huge shield), a rabbit, a shotgun, a small key, a snotling and a spellbook here.', 'You can go east, south or west.'])



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('w', ['You open the door to the great hall and walk through.', 'The great hall', 'An imposing - and rather cold - room with a high, vaulted roof, and an impressive tapestry hanging from the wall.', 'You can go east or north.'])




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("cast Walk On Water")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('n', ['You head north.', 'The yard', 'A large open area in front of the Great Hall, which is to the south. There is a lake to the north, and you can see an island in the lake.', 'You can see fourteen arrows and Stone of Returning here.', 'You can go north or south.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('n', ['You dive into the lake...', 'The lake swimming', 'You are swimming in a lake! Dry land is to the south.', 'You can go south.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('s', ['You head south.', 'The yard', 'A large open area in front of the Great Hall, which is to the south. There is a lake to the north, and you can see an island in the lake.', 'You can see fourteen arrows and Stone of Returning here.', 'You can go north or south.'])
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Lore", "Steelskin", "Walk On Water"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast walk on water', ['You cast the <i>Walk On Water</i> spell.', 'You feel lighter.', 'The <i>Lore</i> effect on you expires.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['Walk On Water'], Quest.World.player.activeEffects)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('n', ['You walk out on to the surface of the lake.', 'The lake', 'You are stood on a lake! Dry land is to the south.', 'You can go south.'])


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("use ammo")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.loc = 'yard'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'shotgun' does not exist on type '{}'.
  Quest.World.w.shotgun.loc = 'yard'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('s', ['You head south.', 'The yard', 'A large open area in front of the Great Hall, which is to the south. There is a lake to the north, and you can see an island in the lake.', 'You can see fourteen arrows, a goblin, a shotgun and Stone of Returning here.', 'You can go north or south.'])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("equip bow", "You put away the knife, and equip the long bow.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("attack goblin", ["You attack the goblin.", "Out of ammo!",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get 3 arrow", "You take three arrows.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([4])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("attack goblin", ["You attack the goblin.", "A miss!"])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(2, Quest.World.w.arrow.countAtLoc(Quest.World.player.name))



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get shotgun", "You take the shotgun.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("equip shotgun", "You put away the long bow, and equip the shotgun.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime(2)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("attack goblin", ["You attack the goblin.", "A miss!"])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("attack goblin", ["You attack the goblin.", "Out of ammo!"])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop shotgun", "You drop the shotgun.")


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("cast unillusion")
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
  const illusion = Quest.World.cloneObject(Quest.World.w.phantasm_prototype, 'great_hall')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'alias' does not exist on type '{}'.
  illusion.alias = 'red dragon'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'examine' does not exist on type '{}'.
  illusion.examine = 'A scary dragon, that is definitely real!'
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Returning", "Teleport", "Mark", "Unillusion", "Summon Frost Elemental", "Dispel", "Healing"]

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('s', ['You head south.', 'The great hall', 'An imposing - and rather cold - room with a high, vaulted roof, and an impressive tapestry hanging from the wall.', 'You can see a red dragon here.', 'You can go east or north.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast unillusion', ['You cast the <i>Unillusion</i> spell.', 'The red dragon disappears.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast unillusion', ['You cast the <i>Unillusion</i> spell, but there are no illusions here.'])




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("selectSkill")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Basic attack', Quest.World.w.goblin.selectSkill().name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.skillOptions = ["Fireball"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Fireball', Quest.World.w.goblin.selectSkill().name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.skillOptions = ["Double attack", "Fireball", "Returning", "Teleport", "Mark"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([1])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Fireball', Quest.World.w.goblin.selectSkill().name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  delete Quest.World.w.goblin.skillOptions


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("performAttack  (goblin)")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.loc = 'great_hall'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([0, 19, 5])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  attack = Quest.World.w.goblin.performAttack(Quest.World.player)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('goblin', attack.attacker.name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Basic attack', attack.skill.name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.me], attack.primaryTargets)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('d8', attack.damage)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, attack.offensiveBonus)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(98, Quest.World.w.me.health)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("performAttack  (goblin, fireball)")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([1, 19, 5, 5, 5])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.attackPattern = ["Double attack", "Ice shard", "Returning", "Teleport", "Mark"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  attack = Quest.World.w.goblin.performAttack(Quest.World.player)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('goblin', attack.attacker.name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Ice shard', attack.skill.name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.me], attack.primaryTargets)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('3d6', attack.damage)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, attack.offensiveBonus)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(92, Quest.World.w.me.health)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.loc = 'yard'


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('e', ['The practice room', 'A large room with straw scattered across the floor. The only exit is west', 'You can see some boots, a chest, an orc (holding a huge shield), a rabbit, a small key, a snotling and a spellbook here.', 'You can go east, south or west.'])


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("scrolls")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'pink_scroll' does not exist on type '{}'... Remove this comment to see the full error message
  Quest.World.w.pink_scroll.loc = Quest.World.player.name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'blue_scroll' does not exist on type '{}'... Remove this comment to see the full error message
  Quest.World.w.blue_scroll.loc = Quest.World.player.name
  Quest.World.world.update()

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19, 4, 4, 4, 19, 3, 3, 3, 18, 5, 2, 3])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('use pink on orc', ["You should not specify a target when using this item."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('use pink', ["You cast the <i>Fireball</i> spell from the pink scroll.", "The room is momentarily filled with fire.", "The orc reels from the explosion.", "The attack does 12 hits, the orc's health is now 48.", "The snotling reels from the explosion.", "The attack does 9 hits, the snotling's health is now 11.", "The rabbit reels from the explosion.", "The attack does 10 hits, the rabbit's health is now 10.", "The scroll crumbles to dust."])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([3])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('use blue', ["You need to specify a target when using this item."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('use blue on orc', ["You cast the <i>Ice shard</i> spell from the blue scroll.", "A miss...", "The scroll crumbles to dust."])


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("potions")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'healing_potion' does not exist on type '... Remove this comment to see the full error message
  Quest.World.w.healing_potion.loc = Quest.World.player.name
  Quest.World.world.update()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('drink potion', ["You drink the healing potion, casting the <i>Healing</i> spell.", "You have 100 hits."])



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("death")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('x sn', 'A cowering green humanoid; hairless and dressed in rags.')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('search sn', 'You think searching the snotling whilst he is alive and awake is a bad idea.')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('equip knife', 'You draw the knife.')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([18, 3, 3])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('attack snotling', ['You attack the snotling.', 'A hit!', 'The attack does 8 hits, the snotling\'s health is now 3.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([18, 3, 3])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('attack snotling', ['You attack the snotling.', 'A hit!', 'The attack does 8 hits, the snotling\'s health is now -5.', 'The snotling falls down, dead.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('x sn', 'A cowering green humanoid; hairless and dressed in rags. He is dead.')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'snotling' does not exist on type '{}'.
  Quest.World.w.snotling.exDead = 'The bloody corpse of a snotling, merciless cut down in his prime.'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('x sn', 'The bloody corpse of a snotling, merciless cut down in his prime.')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('search sn', 'You search the snotling, but find nothing.')


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("weather")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'weatherReportsAssumeYes' does not exist ... Remove this comment to see the full error message
  Quest.Settings.settings.weatherReportsAssumeYes = true
  Quest.World.player.currentWeatherDisabled = false

  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const hotWeather = weatherTypes['hot']
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime(0)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('hot', hotWeather.getNext())

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('wait', ['Time passes...'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('hot', Quest.World.player.currentWeatherName)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('wait', ['Time passes...'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('hot', Quest.World.player.currentWeatherName)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('wait', ['Time passes...'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('hot', Quest.World.player.currentWeatherName)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime(1)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('wait', ['Time passes...', "It is starting to get cloudy."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('cloudingOver', Quest.World.player.currentWeatherName)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("weather II")
  Quest.World.player.skillsLearnt = ["Fireball", "Call rain", "Cloudbusting"]

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast call rain', ['You cast the <i>Call rain</i> spell.', 'It is starting to rain.'])
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Call rain", "Cloudbusting"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('rain', Quest.World.player.currentWeatherName)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast call rain', ['You cast the <i>Call rain</i> spell.', 'The <i>Call rain</i> spell is only going to work if it is not already raining.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast Cloudbusting', ['You cast the <i>Cloudbusting</i> spell.', "The clouds are clearing, it is going to get warm."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('clearingToHot', Quest.World.player.currentWeatherName)

  Quest.World.player.currentWeatherDisabled = true

  //Monsters attack when...?

  //We can either track attitude or mental stare, or we can track actions through an agenda.

  // how do we flag an exit as guarded?
  // needs to be on exit or room
  // needs to be saved
  // needs to be integrated with rest of Quest
  // needs to be easy and intuitive - so a setting on the NPC that impacts the room/exit
  // ... so attribute of NPC called guardingExit
  // ... or agenda item
  // Suppose we use an agenda item, which registers the NPC with the exit. When the exit is used, check if registeted guards still have that as the top agenda item, are not dead or suspended.
  // when the game is saved, the exit is not
  // when the game is loaded, are agendas done before the player next takes a turn?


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'suppressAntagonise' does not exist on ty... Remove this comment to see the full error message
  for (const skill of Quest.RPG.rpg.list) delete skill.suppressAntagonise

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'goblin' does not exist on type '{}'.
  Quest.World.w.goblin.antagonise = Quest.World.w.snotling.antagonise
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  Quest.World.w.orc.antagonise = Quest.World.w.snotling.antagonise








  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Guarding exit")

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  Quest.World.w.orc.setGuard(Quest.World.w.practice_room, "east", "The orc looks at {nm:char:the} suspiciously.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('z', ['Time passes...'])  // takes a turn for guarding to get applied
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('east', Quest.World.w.orc.guardingDir)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['orc'], Quest.World.w.practice_room.east.guardedBy)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.orc], Quest.World.w.practice_room.east.isGuarded())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['orc'], Quest.World.w.practice_room.east.guardedBy)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('e', ["The way east is guarded!", "The orc looks at you suspiciously."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  Quest.World.w.orc.loc = 'great_hall'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('e', ["You head east.", "The passage", "A long passage.", "You can go west."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('w', ["You head west.", "The practice room", "A large room with straw scattered across the floor. The only exit is west", "You can see some boots, a chest, a rabbit, a small key, a snotling (dead) and a spellbook here.", "You can go east, south or west."])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  Quest.World.w.orc.unsetGuard()


  //Quest.World.w.orc.attitude = Quest.RPG.rpg.BELLIGERENT

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  Quest.World.w.orc.signalGroups = []

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Guarding item with guardScenery")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  Quest.World.w.orc.agenda = ['guardScenery:tapestry:The orc draws his sword.']
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'tapestry' does not exist on type '{}'.
  Quest.World.w.tapestry.oldLoc = Quest.World.w.tapestry.loc
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('w', ['The great hall', 'An imposing - and rather cold - room with a high, vaulted roof, and an impressive tapestry hanging from the wall.', 'You can see an orc (holding a huge shield) here.', 'You can go east or north.',])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", "Time passes...")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get tap", ["You take the tapestry.", "The orc draws his sword."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([0, 16, 7, 4])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "The orc attacks you.", "A hit!", "The attack does 9 hits, your health is now 91."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(91, Quest.World.w.me.health)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'tapestry' does not exist on type '{}'.
  Quest.World.w.tapestry.scenery = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'tapestry' does not exist on type '{}'.
  Quest.World.w.tapestry.loc = Quest.World.w.tapestry.oldLoc
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  Quest.World.w.orc.aggressive = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  delete Quest.World.w.orc.target

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Guarding item with waitUntil")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  Quest.World.w.orc.agenda = ['waitUntil:tapestry:scenery:false:The orc draws his sword.', 'antagonise']
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes..."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get tap", ["You take the tapestry.", "The orc draws his sword."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.World.w.orc.aggressive)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['antagonise'], Quest.World.w.orc.agenda)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([0, 16, 7, 4])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "The orc attacks you.", "A hit!", "The attack does 9 hits, your health is now 82."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([], Quest.World.w.orc.agenda)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.World.w.orc.aggressive)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(82, Quest.World.w.me.health)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'tapestry' does not exist on type '{}'.
  Quest.World.w.tapestry.scenery = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'tapestry' does not exist on type '{}'.
  Quest.World.w.tapestry.loc = Quest.World.w.tapestry.oldLoc
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  Quest.World.w.orc.aggressive = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  delete Quest.World.w.orc.target

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Guarding item with waitUntilNow")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  Quest.World.w.orc.agenda = ['waitUntilNow:tapestry:scenery:false:The orc draws his sword.', 'antagonise']
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([0, 16, 7, 4])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get tap", ["You take the tapestry.", "The orc draws his sword.", "The orc attacks you.", "A hit!", "The attack does 9 hits, your health is now 73."])


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(73, Quest.World.w.me.health)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'tapestry' does not exist on type '{}'.
  Quest.World.w.tapestry.scenery = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'tapestry' does not exist on type '{}'.
  Quest.World.w.tapestry.loc = Quest.World.w.tapestry.oldLoc
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
  Quest.World.w.me.health = 100



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Attack agendas")

  new Quest.Skill.Spell("Test attack 1", {
    primarySuccess: "Test attack one was performed",
  })
  new Quest.Skill.Spell("Test attack 2", {
    primarySuccess: "Test attack two was performed",
  })
  new Quest.Skill.Spell("Test attack 3A", {
    primarySuccess: "Test attack three was prepared",
    afterUse: function (attack: any) {
      attack.attacker.nextAttack = "Test attack 3B"
    }
  })
  new Quest.Skill.Spell("Test attack 3B", {
    primarySuccess: "Test attack three was performed",
  })

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  Quest.World.w.orc.attackPattern = ['Test attack 1', 'Test attack 2', "Test attack 3A"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([1, 19])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "The orc casts the <i>Test attack 2</i> spell.", "Test attack two was performed"])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([1, 19])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "The orc casts the <i>Test attack 2</i> spell.", "Test attack two was performed"])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([1, 19])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "The orc casts the <i>Test attack 2</i> spell.", "Test attack two was performed"])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([0, 19])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "The orc casts the <i>Test attack 1</i> spell.", "Test attack one was performed"])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([2, 19])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "The orc casts the <i>Test attack 3A</i> spell.", "Test attack three was prepared"])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([19])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "The orc casts the <i>Test attack 3B</i> spell.", "Test attack three was performed"])




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("pursueToAttack")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'orc' does not exist on type '{}'.
  Quest.World.w.orc.pursueToAttack = Quest.RPG.rpg.pursueToAttack

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('n', ['You head north.', 'The yard', 'A large open area in front of the Great Hall, which is to the south. There is a lake to the north, and you can see an island in the lake.', 'You can see eleven arrows, a goblin, a shotgun and Stone of Returning here.', 'You can go north or south.', 'The orc enters the yard from the south.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([1, 19])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "The orc casts the <i>Test attack 2</i> spell.", "Test attack two was performed"])


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Befriend")
  Quest.World.player.skillsLearnt = ["Double attack", "Fireball", "Befriend"]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd('cast befriend at orc', ['You cast the <i>Befriend</i> spell.', 'The orc will now regard you as a friend.'])




  /**/
}
