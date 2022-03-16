namespace Quest {
  new Quest.Skill.Spell('Ice shard', {
    damage:      '3d6',
    description: 'A blast of frost power blasts your target.',
    icon:        'ice-shard',
    level:       3,
    modifyOutgoingAttack(attack: any) {
      attack.element = 'frost';
    },
    primarySuccess: 'A shard of ice jumps from {nms:attacker:the} finger to {nm:target:the}!',
    tactical:       'On a successful hit, target takes 3d6.',
    tooltip:        'A shard of ice pierces your foe!',
  });

  new Quest.Skill.Spell('Fireball', {
    damage:            '2d6',
    description:       'A ball of fire engulfs the room.',
    getPrimaryTargets: Quest.RPG.rpg.getAll,
    level:             3,
    modifyOutgoingAttack(attack: any) {
      attack.element = 'fire';
      attack.msg('The room is momentarily filled with fire.', 1);
    },
    noTarget:       true,
    primaryFailure: '{nv:target:ignore:true} it.',
    primarySuccess: '{nv:target:reel:true} from the explosion.',
    tactical:       'Targets all in the location except you; on a successful hit, target takes 2d6.',
    tooltip:        'A fireball that fills the room (but does not affect you!)',
  });

  new Quest.Skill.Spell('Psi-blast', {
    damage:      '3d6',
    description: 'A blast of pure mental energy blasts your target.',
    icon:        'psi-blast',
    level:       5,
    modifyOutgoingAttack(attack: any) {
      attack.armourMultiplier = 0;
    },
    primaryFailure: 'A blast of raw psi-energy... is barely noticed by {nm:target:the}.',
    primarySuccess: 'A blast of raw psi-energy sends {nm:target:the} reeling.',
    tactical:       'On a successful hit, target takes 3d6; ignores armour.',
    tooltip:        'A blast of mental energy (ignores armour)',
  });

  new Quest.Skill.Spell('Lightning bolt', {
    afterPrimaryFailure(attack: any) {
      attack.secondaryTargets = [];
    },
    damage:              '3d6',
    description:         'A blast of lightning leaps to your target - and perhaps his comrades too.',
    element:             'storm',
    getSecondaryTargets: Quest.RPG.rpg.getFoesBut,
    icon:                'lightning',
    level:               5,
    modifyOutgoingAttack(attack: any) {
      attack.element = 'storm';
    },
    primaryFailure:   'A lightning bolt jumps from {nms:attacker:the} out-reached hand to {nm:target:the}, fizzling out before it can actually do anything.',
    primarySuccess:   'A lightning bolt jumps from {nms:attacker:the} out-reached hand to {nm:target:the}!',
    secondaryDamage:  '2d6',
    secondaryFailure: 'A smaller bolt jumps {nms:attacker:the} target, but entirely misses {nm:target:the}!',
    secondarySuccess: 'A smaller bolt jumps {nms:attacker:the} target to {nm:target:the}!',
    tactical:         'On a successful hit, target takes 3d6 and his allies take 2d6.',
    tooltip:          'A lightning bolt jumps from your out-reached hand to you foe!',
  });

  // Only when raining
  new Quest.Skill.Spell('Call lightning', {
    damage:      '3d6',
    description: 'A bolt of thunder is called down from the clouds to blast your target.',
    element:     'storm',
    icon:        'lightning',
    level:       3,
    modifyOutgoingAttack(attack: any) {
      attack.element = 'storm';
      if (Quest.World.player.currentWeatherDisabled) return;
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const weather = weatherTypes[Quest.World.player.currentWeatherName];
      if (!weather.outside()) {
        attack.abort = true;
        attack.msg('The <i>Call lightning</i> spell can only be used outside.', 1);
      }
      if (weather.wetness < 1) {
        attack.abort = true;
        attack.msg('The <i>Call lightning</i> spell can only be used when it is raining.', 1);
      }
    },
    primaryFailure: 'A lightning bolt comes down from the sky, towards {nm:target:the}, but fizzles out before it can actually do anything.',
    primarySuccess: 'A lightning bolt comes down from the sky, to strike {nm:target:the}!',
    tactical:       'On a successful hit, target takes 3d6, but can only be used when outside, in the rain.',
    tooltip:        'A lightning bolt jumps from your out-reached hand to you foe!',
  });

  // -------  ARMOUR SPELLS  -----------
  // Spells that have an ongoing effect on attacks against the target

  new Quest.Skill.Spell('Cursed armour', {
    description: 'Can be cast on a foe to reduce the protection armour gives.',
    effect:      {
      category: 'armour',
      modifyOutgoingAttack(attack: any) {
        attack.armourModifier = (attack.armourModifier > 2 ? attack.armourModifier - 2 : 0);
      },
    },
    icon:           'unarmour',
    level:          3,
    primarySuccess: '{nms:target:the:true} armour is reduced.',
    tactical:       'Target loses 2 from their armour, to a minimum of zero.',
  });

  new Quest.Skill.SpellSelf('Stoneskin', {
    description: 'Can be cast on yourself to give protection to all physical and many elemental attacks.',
    effect:      {
      category: 'armour',
      modifyIncomingAttack(attack: any) {
        attack.armourModifier += 2;
      },
    },
    level:          2,
    primarySuccess: 'Your skin becomes as hard as stone - and yet still just as flexible.',
    tactical:       'Adds 2 to your armour.',
  });

  new Quest.Skill.SpellSelf('Steelskin', {
    description: 'Can be cast on yourself to give protection to all physical and many elemental attacks.',
    duration:    3,
    effect:      {
      category: 'armour',
      modifyIncomingAttack(attack: any) {
        attack.armourModifier += 3;
      },
    },
    level:          4,
    primarySuccess: 'Your skin becomes as hard as steel - and yet still just as flexible.',
    tactical:       'Adds 3 to your armour.',
  });

  // -------  ATTACK-MODIFYING SPELLS  -----------
  // Spells that have an ongoing effect on attacks made by the target

  new Quest.Skill.SpellSelf('Strength', {
    description: 'The target of this spell is made much stronger, able to do far more damage in non-magical attacks.',
    effect:      {
      category: 'enhancement',
      modifyOutgoingAttack(attack: any) {
        if (!attack.skill.spell) attack.damageModifier *= 2;
      },
    },
    level:          3,
    primarySuccess: '{nms:target:the:true} strength is enhanced.',
    tactical:       'Target will do twice the normal damage when making non-spell attacks',
  });

  new Quest.Skill.Spell('Weakness', {
    description: 'The target of this spell is made much weaker, doing far less damage in non-magical attacks.',
    effect:      {
      category: 'enhancement',
      modifyOutgoingAttack(attack: any) {
        if (!attack.skill.spell) attack.damageModifier /= 2;
      },
    },
    level:          3,
    primarySuccess: '{nms:target:the:true} strength is reduced.',
    tactical:       'Target will do half the normal damage when making non-spell attacks',
  });

  new Quest.Skill.SpellSelf('Focus', {
    description: 'The target of this spell can cast attack spells better.',
    effect:      {
      category: 'enhancement',
      modifyOutgoingAttack(attack: any) {
        if (!attack.skill.spell) attack.offensiveBonus += 3;
      },
    },
    level:          3,
    primarySuccess: '{nms:target:the:true} mental acuity is enhanced.',
    tactical:       'Gives a +3 bonus to attack rolls for spells.',
  });

  new Quest.Skill.Spell('Befuddle', {
    description: 'The target of this spell will cast attack spells poorly.',
    effect:      {
      category: 'enhancement',
      modifyOutgoingAttack(attack: any) {
        if (!attack.skill.spell) attack.offensiveBonus -= 3;
      },
    },
    level:          3,
    primarySuccess: '{nms:target:the:true} mental acuity is reduced.',
    tactical:       'Gives a -3 penalty to attack rolls for spells.',
  });

  // -------  ENHANCING SPELLS  -----------
  // These spells give the cast an ability, but only in terms of adding the active effect. It is up to authors
  // to create the Quest.World.world so this is meaningful.

  new Quest.Skill.SpellSelf('Lore', {
    description: 'While this spell is active, you will gain new insights into items and creatures you look at.',
    effect:      {
      category: 'enhancement',
    },
    level:          2,
    primarySuccess: 'You feel enlightened.',
  });

  new Quest.Skill.SpellSelf('Walk On Water', {
    description: 'While this spell is active, you can walk on water!',
    effect:      {
      category: 'enhancement',
    },
    level:          2,
    primarySuccess: 'You feel lighter.',
  });

  new Quest.Skill.SpellSelf('Featherfall', {
    description: 'While this spell is active, you can fall from a great height without harm (as long as it is not into lava!).',
    effect:      {
      category: 'enhancement',
    },
    level:          2,
    primarySuccess: 'You feel lighter.',
  });

  // -------  ELEMENTAL PROTECTION SPELLS  -----------
  // These spells give the target protection (or vulnerability) to an element for a while

  for (const el of ['Fire', 'Frost', 'Storm']) {
    new Quest.Skill.SpellSelf(`Protection From ${el}`, {
      description: `Can be cast on yourself to give protection to all ${el}-based attacks.`,
      duration:    6,
      effect:      {
        category: 'protection',
        modifyIncomingAttack(attack: any) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'element' does not exist on type '{ categ... Remove this comment to see the full error message
          if (attack.element !== this.element) return;
          attack.damageMultiplier /= 3;
        },
      },
      element:        el.toLowerCase(),
      level:          4,
      primarySuccess: `You take only a third damage from ${el.toLowerCase()}-based attacks for six turns.`,
      tactical:       `Your take one third damage from all ${el}-based attacks.`,
    });

    new Quest.Skill.Spell(`Vulnerability To ${el}`, {
      description: `Can be cast on a target to give vulnerability to all ${el}-based attacks.`,
      duration:    6,
      effect:      {
        category: 'protection',
        modifyIncomingAttack(attack: any) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'element' does not exist on type '{ categ... Remove this comment to see the full error message
          if (attack.element !== this.element) return;
          attack.damageMultiplier *= 3;
        },
      },
      element:        el.toLowerCase(),
      level:          4,
      primarySuccess: `Target takes triple damage from ${el.toLowerCase()}-based attacks for six turns.`,
      tactical:       `Target takes three times damage from all ${el}-based attacks.`,
    });

    new Quest.Skill.SpellSelf(`Immunity To ${el}`, {
      description: `Can be cast on yourself to give immunity to all ${el}-based attacks.`,
      duration:    6,
      effect:      {
        category: 'protection',
        modifyIncomingAttack(attack: any) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'element' does not exist on type '{ categ... Remove this comment to see the full error message
          if (attack.element !== this.element) return;
          attack.damageMultiplier *= 0;
        },
      },
      element:        el.toLowerCase(),
      level:          4,
      primarySuccess: `You take no damage from ${el.toLowerCase()}-based attacks for six turns.`,
    });
  }

  // -------  ELEMENTAL Quest.Templates.WEAPON ENHANCEMENTS  -----------
  // Cast on a weapon to give it a bonus

  new Quest.Skill.SpellInanimate('Earthmight Smasher', {
    description: 'The Earthmight Smasher spell will temporarily enchant any crushing weapon to do extra Earthmight-based damage.',
    effect:      {
      modifyOutgoingAttack(attack: any) {
        attack.element      = 'earthmight';
        attack.damageBonus += 6;
      },
    },
    getTargets(attack: any) {
      return Quest.Utilities.scopeReachable().filter((el) => el.weaponType === 'crush' && el.loc === attack.attacker.name);
    },
    level:       2,
    msgNoTarget: 'You have no crush weapon for this spell.',
    tactical:    'Can be cast on any crushing weapon the player is holding. The weapon will then do Earthmight damage, and an additional 6 damage.',
    targetEffect(attack: any, item: any) {
      attack.msg(Quest.Text.processText('{nm:item:the:true} now has earthmight pounding in it.', { item }), 1);
    },
  });

  new Quest.Skill.SpellInanimate('Storm Bow', {
    description: 'The Storm Bow spell will temporarily enchant any bow to do extra Storm-based damage.',
    effect:      {
      modifyOutgoingAttack(attack: any) {
        attack.element      = 'storm';
        attack.damageBonus += 6;
      },
    },
    getTargets(attack: any) {
      return Quest.Utilities.scopeReachable().filter((el) => el.weaponType === 'bow' && el.loc === attack.attacker.name);
    },
    level:       2,
    msgNoTarget: 'You have no bow for this spell.',
    tactical:    'Can be cast on any bow the player is holding. The weapon will then do Storm damage, and an additional 6 damage.',
    targetEffect(attack: any, item: any) {
      attack.msg(Quest.Text.processText('{nm:item:the:true} now fizzles with electrical energy.', { item }), 1);
    },
  });

  new Quest.Skill.SpellInanimate('Ice Spear', {
    description: 'The Ice Spear spell will temporarily enchant any polearm to do extra Fros-based damage.',
    effect:      {
      modifyOutgoingAttack(attack: any) {
        attack.element      = 'frost';
        attack.damageSides += 3;
      },
    },
    getTargets(attack: any) {
      return Quest.Utilities.scopeReachable().filter((el) => el.weaponType === 'polearm' && el.loc === attack.attacker.name);
    },
    level:       2,
    msgNoTarget: 'You have no bow for this spell.',
    tactical:    'Can be cast on any polearm the player is holding. The weapon will then do frost damage, and the damage dice type will be increased by 3 (so a d6 will become d9).',
    targetEffect(attack: any, item: any) {
      attack.msg(Quest.Text.processText('{nm:item:the:true} has frost over it.', { item }), 1);
    },
  });

  new Quest.Skill.SpellInanimate('Flaming Blade', {
    description: 'The Flaming Blade spell will temporarily enchant any bladed weapon to do extra Fire-based damage.',
    effect:      {
      modifyOutgoingAttack(attack: any) {
        attack.element = 'fire';
        attack.damageNumber++;
      },
    },
    getTargets(attack: any) {
      return Quest.Utilities.scopeReachable().filter((el) => el.weaponType === 'blade' && el.loc === attack.attacker.name);
    },
    level:       2,
    msgNoTarget: 'You have no bladed weapon for this spell.',
    tactical:    'Can be cast on any blade the player is holding. The weapon will then do fire damage, and the number of damage dice type will be increased by 1.',
    targetEffect(attack: any, item: any) {
      attack.msg(Quest.Text.processText('{nm:item:the:true} now has fire along its blade.', { item }), 1);
    },
  });

  // -------  VISAGE SPELLS  -----------
  // Change the player's appearance

  new Quest.Skill.SpellSelf('Kobold Glamour', {
    description: 'After casting this spell, the caster will resemble a kobold.',
    duration:    5,
    effect:      {
      category: 'visage',
      finish(target: any) {
        delete target.visage;
        return '{nms:target:the:true} appearance returns to normal.';
      },
      start(target: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'visage' does not exist on type '{ catego... Remove this comment to see the full error message
        target.visage === this.visage;
        return '{nv:target:have:true} now has a long, crocodilian snout, and green scales.';
      },
    },
    level:    1,
    regex:    /kobold/,
    tactical: "Visage spells are purely visual - there is no change in the caster's stats or general size, and caster will not sound any different.",
    visage:   'kobold',
  });

  const visages = [
    {
      colour: 'blue', eyes: 'pale blue', hair: 'royal blue', name: 'Azure', skin: 'sky blue',
    },
    {
      colour: 'red', eyes: 'pink', hair: 'blood red', name: 'Vermilion', skin: 'blood red',
    },
    {
      colour: 'green', eyes: 'pale green', hair: 'emerald', name: 'Viridescent', skin: 'deep green',
    },

  ];

  for (const visage of visages) {
    new Quest.Skill.SpellSelf(`${visage.name} Visage`, {
      description: `After casting this spell, the caster will be ${visage.colour}.`,
      effect:      {
        category: 'visage',
        finish(target: any) {
          delete target.visage;
          delete target.visageSkin;
          delete target.visageHair;
          delete target.visageEyes;
          return '{nms:target:the:true} appearance returns to normal.';
        },
        start(target: any) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'visage' does not exist on type '{ catego... Remove this comment to see the full error message
          if (target.visage === this.visage) {
            return `{nv:target:have:true} still got ${this.visageData.skin} skin and ${this.visageData.hair} hair.`;
          }
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'visage' does not exist on type '{ catego... Remove this comment to see the full error message
          target.visage     = this.visage;
          target.visageSkin = this.visageData.skin;
          target.visageHair = this.visageData.hair;
          target.visageEyes = this.visageData.eyes;
          return `{nv:target:have:true} now got ${this.visageData.skin} skin and ${this.visageData.hair} hair.`;
        },
        visageData: visage,
      },
      regex:    new RegExp(visage.name.toLowerCase()),
      tactical: "Visage spells are purely visual - there is no change in the caster's stats or general size, and caster will not sound any different.",
      visage:   visage.colour,
    });
  }

  new Quest.Skill.SpellSelf('Truesight', {
    targetEffect(attack: any) {
      const room = Quest.World.w[attack.attacker.loc];
      let flag   = false;
      for (const o of Quest.Utilities.scopeReachable()) {
        if (typeof o.truesight === 'function') {
          flag = flag || o.truesight();
        }
      }
      if (!flag) attack.msg('It would seem there are no illusions here.', 1);
    },
  });

  new Quest.Skill.SpellSelf('Cleanse', {
    targetEffect(attack: any) {
      const room = Quest.World.w[attack.attacker.loc];
      let flag   = false;
      for (const o of Quest.Utilities.scopeReachable()) {
        if (typeof o.cleanse === 'function') {
          flag = flag || o.cleanse();
        }
      }
      if (!flag) attack.msg('Nothing here needs cleaning.', 1);
    },
  });

  // -------  ENVIRONMENTAL SPELLS  -----------
  // Affect inanimate items in the location

  new Quest.Skill.SpellInanimate('Unlock', {
    description: 'All locks in this location will unlock.',
    getTargets(attack: any) {
      const list = Quest.World.w[attack.attacker.loc].getExits().filter((el: any) => el.isLocked());
      for (const key in Quest.World.w) {
        if (Quest.World.w[key].isHere() && Quest.World.w[key].locked) list.push(Quest.World.w[key]);
      }
      return list;
    },
    level:       2,
    msgNoTarget: '{nv:attacker:cast:true} the {i:{nm:skill}} spell, but there are no locked doors.',
    targetEffect(attack: any, ex: any) {
      if (ex instanceof Quest.World.Exit) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'nice' does not exist on type '{}'.
        attack.msg(`The door to ${ex.nice()} unlocks.`, 1);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'setLock' does not exist on type '{}'.
        ex.setLock(false);
      } else {
        attack.msg(Quest.Text.processText('{nv:item:unlock:true}.', { item: ex }), 1);
        ex.locked = false;
      }
    },
  });

  new Quest.Skill.SpellInanimate('Unillusion', {
    automaticSuccess: true,
    description:      'All illusions in this location will disappear.',
    getTargets(attack: any) {
      const list = Quest.Utilities.scopeHereParser().filter((el) => el.unillusionable);
      if (Quest.World.currentLocation.unillusionable) list.push(Quest.World.currentLocation);
      return list;
    },
    level:       2,
    msgNoTarget: '{nv:attacker:cast:true} the {i:{nm:skill}} spell, but there are no illusions here.',
    targetEffect(attack: any, item: any) {
      item.unillusion(attack);
    },
  });

  new Quest.Skill.SpellSelf('Annulment', {
    description: 'Cancels all spell (and other) effects of the caster, good or bad.',
    icon:        'annul',
    targetEffect(attack: any) {
      if (attack.target.activeEffects.length === 0) {
        attack.msg('The {i:Annulment} spell has no effect - no effects to annul!');
        return;
      }
      for (const el of attack.target.activeEffects) {
        // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        const s = Quest.RPG.rpg.findEffect(el).terminate(attack.target);
        attack.msg(s);
      }
      return true;
    },
  });

  new Quest.Skill.SpellSelf('Dispel', {
    description: 'Dispels all elementals across the entire Quest.World.world!',
    icon:        'annul',
    targetEffect(attack: any) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
      Quest.RPG.rpg.broadcast('elementals', 'destroy', Quest.World.player);
      return true;
    },
  });

  new Quest.Skill.SpellSelf('Healing', {
    description: 'A standard healing spell.',
    hits:        25,
    icon:        'annul',
    tactical:    'Gives up to 25 hit points (up to your maximum).',
    targetEffect(attack: any) {
      attack.attacker.health += 25;
      if (attack.attacker.health > attack.attacker.maxHealth) attack.attacker.health = attack.attacker.maxHealth;
      attack.msg('{nv:attacker:have:true} {show:attacker:health} hits.');
      return true;
    },
  });

  new Quest.Skill.Spell('Commune with animal', {
    automaticSuccess: true,
    description:      'Can be cast on any beast to allow the caster to talk to it for a limited time.',
    duration:         5,
    effect:           {
      start(target: any) {
        return target.beast ? '{nv:attacker:can:true} now talk to {nm:target:the} for a short time.' : '{nv:attacker:can:true} talk to {nm:target:the} for a short time (like before the spell...).';
      },
    },
    icon:               'commune',
    level:              1,
    regex:              /commune/,
    suppressAntagonise: true,
  });

  new Quest.Skill.Spell('Befriend', {
    automaticSuccess: true,
    description:      'Can be cast on any character; the character will see the player as his or her friend, and may, therefore, see former friends as foes.',
    effect:           {
      start(target: any) {
        target.allegiance = 'friend';
        target.aggressive = false;
        return '{nv:target:will:true} now regard {nm:attacker:the} as a friend.';
      },
    },
    icon:               'befriend',
    level:              4,
    regex:              /befriend/,
    suppressAntagonise: true,
  });

  new Quest.Skill.Spell('Calm', {
    automaticSuccess: true,
    description:      'Can be cast on any character; the character will stopping attacking, at least for now.',
    effect:           {
      start(target: any) {
        target.aggressive = false;
        return '{nv:target:be:true} no longer aggressive.';
      },
    },
    icon:               'befriend',
    level:              2,
    regex:              /calm/,
    suppressAntagonise: true,
  });

  new Quest.Skill.Spell('Enrage', {
    automaticSuccess: true,
    description:      'Can be cast on any character; the character will attack you and no longer consider you a friend! Use with caution.',
    effect:           {
      start(target: any) {
        target.aggressive = true;
        target.target     = Quest.World.player.name;
        if (target.allegiance === 'friend') target.allegiance = 'foe';
        return '{nv:target:look:true} angry at you.';
      },
    },
    icon:  'enrage',
    level: 2,
    regex: /enrage/,
  });

  new Quest.Skill.SpellSelf('Mage Light', {
    automaticSuccess: true,
    description:      'The caster glows, illuminating the location.',
    duration:         5,
    effect:           {
      finish(target: any) {
        target.isLight = false;
        return '{nv:target:stop:true} shining.';
      },
      start(target: any) {
        target.isLight = true;
        return '{nv:target:be:true} shines brightly.';
      },
    },
    level: 1,
    regex: /light/,
  });

  new Quest.Skill.SpellSelf('Way of the Merchant', {
    automaticSuccess: true,
    description:      'The caster gains knowledge of how much items are worth and how much others are prepared to pay for them.',
    duration:         5,
    effect:           {
      finish(target: any) {
        target.tradeSkill -= 5;
        return '{nv:target:stop:true} loses trading skill.';
      },
      start(target: any) {
        target.tradeSkill += 5;
        return '{nv:target:be:true} gains trading skill.';
      },
    },
    level:    1,
    regex:    /light/,
    tactical: 'Gives a +5 bonus to the trading skill.',
  });

  new Quest.Skill.SpellSelf('Returning', {
    description: 'Casting this spell instantly moves the caster to the location of the Stone of Returning.',
    icon:        'moving',
    item:        'Stone_of_Returning',
    targetEffect(attack: any) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('The air swirls around you, and everything blurs...');
      Quest.RPG.rpg.teleport(attack.target, Quest.World.w[this.item].loc);
      return true;
    },
  });

  new Quest.Skill.SpellSelf('Teleport', {
    description: 'Casting this spell instantly moves the caster to a location previously stored with the <i>Mark</i> spell.',
    icon:        'moving',
    targetEffect(attack: any) {
      if (!attack.target.activeTeleportLocation) {
        attack.msg('The {i:Teleport} spell has no effect - no location has been marked!');
        return;
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('The air swirls around you, and everything blurs...');
      Quest.RPG.rpg.teleport(attack.target, attack.target.activeTeleportLocation);
      return true;
    },
  });

  new Quest.Skill.SpellSelf('Mark', {
    description: 'Casting this spell marks a location for later use with the <i>Teleport</i> spell.',
    icon:        'moving',
    targetEffect(attack: any) {
      attack.msg('This location is marked for future use.');
      attack.target.activeTeleportLocation = attack.target.loc;
      return true;
    },
  });

  new Quest.Skill.SpellSelf('Call rain', {
    description: 'Casting this spell will cause it to rain.',
    icon:        'weather',
    modifyOutgoingAttack(attack: any) {
      if (Quest.World.player.currentWeatherDisabled) return;
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const weather = weatherTypes[Quest.World.player.currentWeatherName];
      if (!weather.outside()) {
        attack.abort = true;
        attack.msg('The <i>Call rain</i> spell can only be used outside.', 1);
      }
      if (weather.wetness > 0) {
        attack.abort = true;
        attack.msg('The <i>Call rain</i> spell is only going to work if it is not already raining.', 1);
      }
    },
    targetEffect(attack: any) {
      const currentName = 'rain';
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const current                          = weatherTypes[currentName];
      Quest.World.player.currentWeatherName  = currentName;
      Quest.World.player.currentWeatherCount = 0;
      Quest.World.player.currentWeatherTotal = current.getNumberOfTurns();
      if (current.start) current.start(this.name);
      return true;
    },
  });

  new Quest.Skill.SpellSelf('Cloudbusting', {
    description: 'Casting this spell will clear the sky of all clouds, at least for a while.',
    icon:        'weather',
    modifyOutgoingAttack(attack: any) {
      if (Quest.World.player.currentWeatherDisabled) return;
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const weather = weatherTypes[Quest.World.player.currentWeatherName];
      if (!weather.outside()) {
        attack.abort = true;
        attack.msg('The <i>Cloudbusting</i> spell can only be used outside.', 1);
      }
      if (weather.name === 'hot') {
        attack.abort = true;
        attack.msg('The <i>Cloudbusting</i> spell is only going to work if there are clouds around', 1);
      }
    },
    targetEffect(attack: any) {
      const currentName = 'clearingToHot';
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const current                          = weatherTypes[currentName];
      Quest.World.player.currentWeatherName  = currentName;
      Quest.World.player.currentWeatherCount = 0;
      Quest.World.player.currentWeatherTotal = current.getNumberOfTurns();
      if (current.start) current.start(this.name);
      return true;
    },
  });

  /*

  Lighting and fog

  we need to give each item responsibility for deciding if it is reachable and/or seeable.
  we need to check the light situation before hand.

  first pass, collect all relevant items
  - things in the room, in connected rooms, allowing for containers
  - see how each impacts the lighting in the current room
  - see if items can be reached/seen

  Before times: 2512, 2564, 2602, 2586, 2657, 2619, 2554

  utterlight - no darkness, no shadows
  daylight - destoyrs vampires
  interior light or bright night
  dim light - invisible with shadows
  complete darkness - can see with dark vision
  utterdark - extinguishes all lights except utterlight

  illusions
  invisible
  fog

  need to consider ambient light

  10 utterlight - no darkness, no shadows
  9 bright sunlight
  8 normal sunlight
  7 bright day
  6 dark daylight
  5 twilight
  4 moonlit night
  3 dark night
  2 very dark, interior with no lights
  1 complete darkness - can see with dark vision
  0 utterdark - extinguishes all lights except utterlight

  each room has a getAmbientLighting function
  also consider each item inb the room - this is already done somewhere (_world.js?)

  need to consider each character's relationship with an item
  is the item held or in a container held?
  is it lit?
  is fog obscuring vision?
  is it invisible?
  is it an illusion?
  is it hidden by an illusion?

  True sight
  Darkness
  Light
  Utterdark
  Utterlight
  Invisibility
  Shadows
  Visage
  Phantom
  Darkvision
  Utterdark vision
  Fog

  Summon weapon/shield

  Merchant's tongue

  Repel undead

  Extinguish

  Command

  Befriend

  Sleep

  Beast form

  Breathe under water

  */
}
