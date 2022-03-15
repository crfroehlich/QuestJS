"use strict";







const EQUIPPABLE = function () {
  const res = Object.assign({}, Quest.Templates.TAKEABLE_DICTIONARY);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'equippable' does not exist on type '{ af... Remove this comment to see the full error message
  res.equippable = true;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeEffects' does not exist on type '{... Remove this comment to see the full error message
  res.activeEffects = [],
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'hasEffect' does not exist on type '{ aft... Remove this comment to see the full error message
    res.hasEffect = function (name: any) { return this.activeEffects.includes(name) }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getObstructing' does not exist on type '... Remove this comment to see the full error message
  res.getObstructing = function (char: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type '{ afterCr... Remove this comment to see the full error message
    return Quest.Utilities.scopeHeldBy(char).filter((el: any) => el.equipped && this.match(el));
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'oldRpgOnCreation' does not exist on type... Remove this comment to see the full error message
  res.oldRpgOnCreation = res.afterCreation
  res.afterCreation = function (o) {
    o.oldRpgOnCreation(o)
    o.verbFunctions.push(function (o: any, verbList: any) {
      if (o.isAtLoc(player)) {
        verbList.push(o.equipped ? Quest.lang.verbs.unequip : Quest.lang.verbs.equip)
      }
    })
    o.nameModifierFunctions.push(function (o: any, list: any) {
      if (o.equipped && o.isAtLoc(player.name)) list.push(Quest.lang.invModifiers.equipped)
    })
  }


  res.drop = function (options) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'equipped' does not exist on type '{ afte... Remove this comment to see the full error message
    if (this.equipped) this.equipped = false
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    Quest.IO.msg(Quest.lang.drop_successful, options);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'moveToFrom' does not exist on type '{ af... Remove this comment to see the full error message
    this.moveToFrom(options, "loc", "name");
    return true;
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'equip' does not exist on type '{ afterCr... Remove this comment to see the full error message
  res.equip = function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getObstructing' does not exist on type '... Remove this comment to see the full error message
    const equipped = this.getObstructing(options.char)
    if (equipped.includes(this)) return falsemsg(Quest.lang.already, options)
    if (equipped.length === 0) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.msg(Quest.lang.equip, options)
    }
    else {
      options.list = Quest.Utilities.formatList(equipped, { article: Quest.Utilities.DEFINITE, joiner: Quest.lang.list_and })
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.msg(Quest.lang.unequipAndEquip, options)
      for (let el of equipped) el.equipped = false
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'equipped' does not exist on type '{ afte... Remove this comment to see the full error message
    this.equipped = true
    return true;
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'unequip' does not exist on type '{ after... Remove this comment to see the full error message
  res.unequip = function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'equipped' does not exist on type '{ afte... Remove this comment to see the full error message
    if (!this.equipped) return falsemsg(Quest.lang.already, options)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'equipped' does not exist on type '{ afte... Remove this comment to see the full error message
    this.equipped = false
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    Quest.IO.msg(Quest.lang.unequip, options)
    return true;
  }

  return res;
}



const WEAPON = function (damage: any, weaponType: any) {
  const res = Object.assign({}, EQUIPPABLE())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'weapon' does not exist on type '{ afterC... Remove this comment to see the full error message
  res.weapon = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'weaponType' does not exist on type '{ af... Remove this comment to see the full error message
  res.weaponType = weaponType
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'damage' does not exist on type '{ afterC... Remove this comment to see the full error message
  res.damage = damage
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type '{ afterCr... Remove this comment to see the full error message
  res.match = function (item: any) { return item.weapon }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{ afterCre... Remove this comment to see the full error message
  res.icon = () => 'weapon12'
  return res;
}





const LIMITED_AMMO_WEAPON = function (damage: any, weaponType: any, ammo: any) {
  const res = Object.assign({}, WEAPON(damage, weaponType))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ammo' does not exist on type '{ afterCre... Remove this comment to see the full error message
  res.ammo = ammo
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeEffects' does not exist on type '{... Remove this comment to see the full error message
  res.activeEffects.push(typeof ammo === 'number' ? "Ammo tracker" : "Ammo consumer")
  return res;
}



new Effect("Ammo consumer", {
  modifyOutgoingAttack: function (attack: any, source: any) {
    if (!source.equipped) return
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const item = w[source.ammo]
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (!item) return Quest.IO.errormsg("The weapon " + source.name + " has an unknown ammo set: " + source.ammo)
    if (item.countAtLoc(player.name) < 1) {
      attack.Quest.IO.msg("Out of ammo!", 1)
      attack.abort = true
    }
    else {
      item.takeFrom(player.name, 1)
    }
  },
})



new Effect("Ammo tracker", {
  modifyOutgoingAttack: function (attack: any, source: any) {
    if (!source.equipped) return
    if (attack.weapon.ammo === 0) {
      attack.Quest.IO.msg("Out of ammo!", 1)
      attack.abort = true
    }
    else {
      attack.weapon.ammo--
    }
  },
})


/*
rpg.add(new Effect("Deteriorating", {
  // really needs to be on success only
  modifyOutgoingAttack:function(attack) {
    if (attack.weapon.ammo === 0) {
      attack.Quest.IO.msg("Out of ammo!")
      attack.abort = true
    }
    else {
      attack.weapon.ammo--
    }
  },
}))
*/

const SHIELD = function (bonus: any) {
  const res = Object.assign({}, EQUIPPABLE())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'shield' does not exist on type '{ afterC... Remove this comment to see the full error message
  res.shield = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'shieldBonus' does not exist on type '{ a... Remove this comment to see the full error message
  res.shieldBonus = bonus
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type '{ afterCr... Remove this comment to see the full error message
  res.match = function (item: any) { return item.shield }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'modifyIncomingAttack' does not exist on ... Remove this comment to see the full error message
  res.modifyIncomingAttack = function (attack: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'equipped' does not exist on type '{ afte... Remove this comment to see the full error message
    if (!this.equipped) return
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'shieldBonus' does not exist on type '{ a... Remove this comment to see the full error message
    attack.offensiveBonus -= this.shieldBonus
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{ afterCre... Remove this comment to see the full error message
  res.icon = () => 'shield12'
  return res;
}


const SPELLBOOK = function (list: any) {
  const res = Object.assign({}, Quest.Templates.TAKEABLE_DICTIONARY)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'spellbook' does not exist on type '{ aft... Remove this comment to see the full error message
  res.spellbook = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'spellsAvailableToLearn' does not exist o... Remove this comment to see the full error message
  res.spellsAvailableToLearn = list
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'examineX' does not exist on type '{ afte... Remove this comment to see the full error message
  res.examineX = ''
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'examine' does not exist on type '{ after... Remove this comment to see the full error message
  res.examine = function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg(this.examineX + ' It contains the spells ' + Quest.Utilities.formatList(this.spellsAvailableToLearn.map((el: any) => '<i>' + el + '</i>'), { lastJoiner: Quest.lang.list_and }) + '.')
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{ afterCre... Remove this comment to see the full error message
  res.icon = () => 'spell12'
  return res
}




const ONE_USE_ITEM = function (spellName: any, requiresTarget: any) {
  const res = Object.assign({}, Quest.Templates.TAKEABLE_DICTIONARY)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'spellName' does not exist on type '{ aft... Remove this comment to see the full error message
  res.spellName = spellName
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'requiresTarget' does not exist on type '... Remove this comment to see the full error message
  res.requiresTarget = requiresTarget
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'use' does not exist on type '{ afterCrea... Remove this comment to see the full error message
  res.use = function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'requiresTarget' does not exist on type '... Remove this comment to see the full error message
    if (this.requiresTarget) return falsemsg("You need to specify a target when using this item.")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ afterCrea... Remove this comment to see the full error message
    if (this.loc !== options.char.name) return falsemsg("You need to be holding {nm:item:the} when using {sb:item}.", options)

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const attack = Attack.createAttack(options.char, null, rpg.findSkill(this.spellName), this)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'apply' does not exist on type 'boolean |... Remove this comment to see the full error message
    attack.apply().output()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msgDestroy' does not exist on type '{ af... Remove this comment to see the full error message
    if (this.msgDestroy) Quest.IO.msg(this.msgDestroy)
    rpg.destroy(this)
    return true
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'useWith' does not exist on type '{ after... Remove this comment to see the full error message
  res.useWith = function (char: any, target: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'requiresTarget' does not exist on type '... Remove this comment to see the full error message
    if (!this.requiresTarget) return falsemsg("You should not specify a target when using this item.")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ afterCrea... Remove this comment to see the full error message
    if (this.loc !== char.name) return falsemsg("You need to be holding {nm:item:the} when using {sb:item}.", { item: this })

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const attack = Attack.createAttack(char, target, rpg.findSkill(this.spellName), this)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'apply' does not exist on type 'boolean |... Remove this comment to see the full error message
    attack.apply().output()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msgDestroy' does not exist on type '{ af... Remove this comment to see the full error message
    if (this.msgDestroy) Quest.IO.msg(this.msgDestroy)
    rpg.destroy(this)
    return true
  }
  return res
}



const SCROLL = function (spellName: any, requiresTarget: any) {
  const res = Object.assign({}, ONE_USE_ITEM(spellName, requiresTarget))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'reportText' does not exist on type '{ af... Remove this comment to see the full error message
  res.reportText = Quest.lang.castSpellFrom
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'msgDestroy' does not exist on type '{ af... Remove this comment to see the full error message
  res.msgDestroy = 'The scroll crumbles to dust.'
  return res
}


const POTION = function (spellName: any) {
  const res = Object.assign({}, ONE_USE_ITEM(spellName, false))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'reportText' does not exist on type '{ af... Remove this comment to see the full error message
  res.reportText = Quest.lang.drinkPotion
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'drink' does not exist on type '{ afterCr... Remove this comment to see the full error message
  res.drink = function (options: any) { return this.use(options) }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ingest' does not exist on type '{ afterC... Remove this comment to see the full error message
  res.ingest = function (options: any) { return this.use(options) }
  return res
}






// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("weapon_unarmed", WEAPON(), {
  image: "fist",
  damage: "d4",
  offensiveBonus: -2,
  alias: "unarmed",
  scenery: true,
  isLocatedAt: function (loc: any, situation: any) {
    return (situation === world.PARSER || situation === world.ALL) && loc === player.name
  },
})

