// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('me', Quest.RPG.RPG_PLAYER(), {
    examine() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(`A ${this.isFemale ? 'chick' : 'guy'} called ${this.alias}`);
    },
    health: 100,
    loc: 'practice_room',
    maxPP: 40,
    offensiveBonus: 3,
    pp: 40,
    regex: /^(me|myself|player)$/,
    spellCasting: 5,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('knife', Quest.Templates.WEAPON('d4+2', 'blade'), {
    examine: 'An example of a poor weapon.',
    image: 'knife',
    loc: 'me',
    offensiveBonus: -2,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('flail', Quest.Templates.WEAPON('2d10+4', 'crush'), {
    examine: 'An example of a good weapon.',
    image: 'flail',
    loc: 'me',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('long_bow', Quest.Templates.LIMITED_AMMO_WEAPON('2d8', 'bow', 'arrow'), {
    examine: 'An example of a bow.',
    loc: 'me',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('arrow', Quest.Templates.COUNTABLE({ yard: 14 }), {
    examine: 'A simple arrow.',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('flaming_sword', Quest.Templates.WEAPON('3d6+2', 'blade'), {
    activeEffects: ['Flaming weapon'],
    examine: 'An example of a magic weapon.',
    // loc:"me",
    image: 'sword',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('ice_amulet', Quest.Templates.WEARABLE(4, ['neck']), {
    examine: 'An example of a wearable magic item; it stops ice/frost damage.',
    loc: 'me',
    modifyIncomingAttack(attack) {
        if (this.worn && attack.element === 'frost') {
            attack.damageMultiplier = 0;
            attack.primarySuccess = attack.primarySuccess.replace(/[.!]/, ', but the ice amulet protects {sb:target}, and {pv:target:take} no damage.');
        }
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('practice_room', {
    desc: 'A large room with straw scattered across the floor. The only exit is west',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('passage'),
    exit_locked_south: true,
    /* east:new Quest.World.Exit('passage', {
        simpleUse:function(char) {
          if (Quest.World.w.practice_room.guarded && !Quest.World.w.orc.dead) {
            Quest.RPG.rpg.broadcast('guards', 'attack', 'practice room exit')
            return Quest.IO.falsemsg("You try to head east, but the orc bars your way. Looks like he is going to attack!")
          }
          return Quest.Utilities.util.defaultSimpleExitUse(char, this)
        }
      }), */
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    south: new Quest.World.Exit('cupboard', {
        lockedmsg: 'It seems to be locked.',
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('great_hall'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('great_hall', {
    desc: 'An imposing - and rather cold - room with a high, vaulted roof{if:tapestry.scenery:, and an impressive tapestry hanging from the wall}.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('practice_room'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('yard'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('tapestry', Quest.Templates.TAKEABLE(), {
    examine: 'A huge tapestry, taller than you, and wider than it is tall.',
    loc: 'great_hall',
    scenery: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('passage', {
    desc: 'A long passage.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('practice_room'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('practice_room_door', Quest.Templates.LOCKED_DOOR('small_key', 'great_hall', 'practice_room'), {
    examine: 'A very solid, wooden door.',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('cupboard', {
    darkDesc: 'It is dark, but the exit is north.',
    desc: 'A large storeroom, with no windows.',
    lightSource() {
        return Quest.World.world.LIGHT_NONE;
    },
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    north: new Quest.World.Exit('practice_room', {
        isHidden() {
            return false;
        },
    }),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('small_key', Quest.Templates.KEY(), {
    examine: 'A small key.',
    loc: 'practice_room',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('yard', {
    desc: 'A large open area in front of the Great Hall, which is to the south. There is a lake to the north, and you can see an island in the lake.',
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    north: new Quest.World.Exit('lake_swimming', {
        msg: 'You dive into the lake...',
        simpleUse(char) {
            if (char.hasEffect('Walk On Water')) {
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
                return Quest.Utilities.util.defaultSimpleExitUse(char, new Quest.World.Exit('lake', { dir: this.dir, msg: 'You walk out on to the surface of the lake.', origin: this.origin }));
            }
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
            return Quest.Utilities.util.defaultSimpleExitUse(char, this);
        },
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('great_hall'),
    yesWeather: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('lake', {
    desc: 'You are stood on a lake! Dry land is to the south.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('yard'),
    yesWeather: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('lake_swimming', {
    desc: 'You are swimming in a lake! Dry land is to the south.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('yard'),
    yesWeather: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('goblin', Quest.RPG.RPG_NPC(false), {
    damage: 'd8',
    ex: 'A rather small green humanoid; hairless and dressed in rags.',
    health: 40,
    loc: 'practice_room',
    signalGroups: ['guards'],
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('orc', Quest.RPG.RPG_NPC(false), {
    damage: '2d10+4',
    ex: 'A large green humanoid; hairless and dressed in leather.',
    health: 60,
    loc: 'practice_room',
    signalGroups: ['guards'],
    signalResponses: {
        wake() {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('He rolls over and goes back to sleep.');
        },
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('huge_shield', SHIELD(10), {
    loc: 'orc',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('snotling', Quest.RPG.RPG_NPC(false), {
    damage: '2d4',
    ex: 'A cowering green humanoid; hairless and dressed in rags.',
    health: 20,
    loc: 'practice_room',
    signalGroups: ['guards'],
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('rabbit', Quest.NPC.RPG_BEAST(false), {
    allegiance: 'friend',
    damage: '2d4',
    ex: '{lore:An example of a monster you can talk to after casting the right spell, and is generally not hostile.:With Lore active, you can learn all about rabbit culture... they like carrots.}',
    health: 20,
    loc: 'practice_room',
    talk() {
        switch (this.talkto_count) {
            case 0:
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("You say 'Hello,' to the rabbit, 'how is it going?'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("The rabbit looks at you. 'Need carrots.' It looks plaintively at it round tummy. 'Fading away bunny!");
                break;
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            default:
                Quest.IO.msg('You wonder what you can talk to the rabbit about.');
                break;
        }
        return true;
    },
});
const elementals = [
    { desc: 'swirling mass of freezing air that chills you to the bone', level: 0, name: 'frost' },
    { desc: 'burning ball of fire', level: 2, name: 'fire' },
    { desc: 'sizzling whirlwind of crackling lightning', level: 1, name: 'storm' },
    { desc: 'churning mass of rocks and earth', level: 3, name: 'earthmight' },
    { desc: 'ball of utter darkness', level: 1, name: 'shadow' },
    { desc: 'kaleidoscope of colours too painful to look at', level: 2, name: 'rainbow' },
];
for (const el of elementals) {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem(`lesser_${el.name}_elemental_prototype`, Quest.RPG.RPG_ELEMENTAL(el.name), {
        alias: `lesser ${el.name} elemental`,
        damage: `2d${4 + el.level}`,
        ex: `A small ${el.desc}.`,
        health: 35 + 5 * el.level,
        signalGroups: ['elementals'],
    });
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem(`greater_${el.name}_elemental_prototype`, Quest.RPG.RPG_ELEMENTAL(el.name), {
        alias: `greater ${el.name} elemental`,
        damage: `3d${6 + el.level}`,
        ex: `A large ${el.desc}.`,
        health: 100 + 10 * el.level,
        signalGroups: ['elementals'],
    });
}
for (const el of elementals) {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    new Quest.Skill.SpellSummon(Quest.World.w[`lesser_${el.name}_elemental_prototype`], { duration: 6, level: 2 + el.level });
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    new Quest.Skill.SpellSummon(Quest.World.w[`greater_${el.name}_elemental_prototype`], { duration: 6, level: 12 + el.level });
}
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('phantasm_prototype', Quest.RPG.RPG_PHANTOM(), {
    alias: 'phantom',
    damage: '1',
    health: 1,
});
// -------  SUMMONING SPELLS  -----------
// Affect inanimate items in the location
// ts-error-fixed ts-migrate(2339) FIXME: Property 'phantasm_prototype' does not exist on ty... Remove this comment to see the full error message
new Quest.Skill.SpellSummon(Quest.World.w.phantasm_prototype, { duration: 6, level: 1 });
/*
Quest.World.createItem("zombie_prototype", Quest.RPG.RPG_CORPOREAL_UNDEAD(), {
  alias:'zombie',
  damage:"2d4",
  health:20,
  signalGroups:['zombies'],
  ex:"A shambling corpse.",
})
*/
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('pink_scroll', Quest.Templates.SCROLL('Fireball', false), {
    examine: 'A scroll with a magical glyph on it.',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('blue_scroll', Quest.Templates.SCROLL('Ice shard', true), {
    examine: 'A scroll with a magical glyph on it.',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('healing_potion', Quest.Templates.POTION('Healing'), {
    examine: 'A sweet smelling concoction!',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('chest', Quest.Templates.CONTAINER(true), Quest.Templates.LOCKED_WITH(), {
    loc: 'practice_room',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('spellbook', Quest.Templates.SPELLBOOK(['Fireball', 'Stoneskin', 'Steelskin', 'Lightning bolt', 'Ice shard']), {
    examine: 'An example of a spell book, obviously.',
    loc: 'practice_room',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('helmet', Quest.Templates.WEARABLE(2, ['head']), {
    armour: 10,
    examine: 'An example of armour; it will add +{armour} to your armour rating.',
    loc: 'practice_room',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('chestplate', Quest.Templates.WEARABLE(2, ['chest']), {
    armour: 20,
    examine: 'An example of armour; it will add +{armour} to your armour rating.',
    loc: 'practice_room',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('boots', Quest.Templates.WEARABLE(2, ['feet']), {
    loc: 'practice_room',
    pronouns: Quest.lang.pronouns.plural,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('shotgun', Quest.Templates.LIMITED_AMMO_WEAPON('2d10+4', 'firearm', 1), {
    ammo: 1,
    examine: 'An example of a limited ammo weapon.',
    image: 'flail',
    loc: 'practice_room',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('Stone_of_Returning', Quest.Templates.TAKEABLE(), {
    loc: 'yard',
});
new Quest.RPG.Effect('Flaming weapon', {
    modifyOutgoingAttack(attack, source) {
        if (!source.equipped)
            return;
        attack.element = 'fire';
    },
});
new Quest.RPG.Effect('Frost vulnerability', {
    modifyIncomingAttack(attack) {
        if (attack.element)
            attack.damageMultiplier *= 2;
    },
});
new Quest.RPG.Effect('Report for testing', {
    modifyIncomingAttack(attack) {
        if (attack.element)
            attack.damageMultiplier *= 2;
    },
    modifyOutgoingAttack(attack) {
        attack.element = 'fire';
    },
});
new Quest.RPG.Effect('Defensive', {
    modifyIncomingAttack(attack) {
        attack.offensiveBonus -= 3;
    },
    suppressFinishMsg: true,
});
new Quest.Skill.Skill('Double attack', {
    description: 'Two attacks is better than one - though admittedky less accurate.',
    level: 2,
    modifyOutgoingAttack(attack) {
        attack.offensiveBonus -= 2;
        attack.attackNumber = 2;
    },
    tactical: 'Attack one foe twice, but at -2 to the attack roll',
});
new Quest.Skill.Skill('Sweeping attack', {
    description: 'You attack you foe with a flourish that may do minor damage to the others who assail you.',
    getSecondaryTargets: Quest.RPG.rpg.getFoesBut,
    level: 1,
    modifyOutgoingAttack(attack) {
        // ts-error-fixed ts-migrate(2552) FIXME: Cannot find name 'options'. Did you mean 'Option'?
        if (options.secondary) {
            attack.damageNumber = 0;
            attack.damageBonus = 4;
        }
        attack.offensiveBonus -= 2;
    },
    tactical: 'Attack one foe as normal. In addition, attack any other foe -2; on a success do 4 damage.',
    testUseable(char) {
        // ts-error-fixed ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message
        if (!char.equipped.weaponType === 'blade')
            return Quest.IO.falsemsg('This skill is only useable with a bladed weapon.');
        return Quest.RPG.rpg.defaultSkillTestUseable(char);
    },
});
new Quest.Skill.Skill('Defensive attack', {
    afterUse(attack, count) {
        const effect = Quest.RPG.rpg.findEffect('Defensive');
        // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        effect.apply(attack, attack.attacker, 1);
        Quest.RPG.rpg.defaultSkillAfterUse(attack, count);
    },
    description: 'Make a cautious attack, careful to maintain your defense, at the expense of your attack.',
    level: 2,
    modifyOutgoingAttack(attack) {
        attack.offensiveBonus -= 2;
    },
    tactical: 'Attack one foe with a -2 penalty, but any attacks on you will suffer a -3 penalty until your next turn.',
    testUseable(char) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (char.getEquippedWeapon().weaponType === 'bow')
            return Quest.IO.falsemsg('This skill is not useable with a bow.');
        return Quest.RPG.rpg.defaultSkillTestUseable(char);
    },
});
const imported = [
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('slug_prototype', Quest.RPG.RPG_CORRUPTED(), {
        alias: 'Giant slug',
        desc: 'At least fifteen foot of slimy slug.',
        name: 'slug',
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('giant_rat_prototype', Quest.NPC.RPG_BEAST(), {
        alias: 'Giant rat',
        armour: 1,
        damage: 2,
        defence: 3,
        desc: 'This thing looks like a rat, only bigger. Much bigger.',
        guarding: [],
        hitpoints: 20,
        image: 'giant_rat',
        level: 1,
        loredesc: 'Giantism is a common way for those skilled in the art to create powerful guardians, and in many ways the rat is the idea starting point, being fierce, easy to feed and overly abundant.',
        movetype: 'Constrained',
        noncorporeal: [],
        treasurechance: 8,
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('gargoyle_prototype', Quest.RPG.RPG_CREATED(), {
        alias: 'Gargoyle',
        desc: 'A dire cross between a bat and a statue.',
        treasurechance: 0,
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('tentacled_horror_prototype', Quest.RPG.RPG_CORRUPTED(), {
        alias: 'Tentacled horror',
        desc: 'A writhing black mass of mouths and eyes.',
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('mudman_prototype', Quest.RPG.RPG_CREATED(), {
        alias: 'Mudman',
        damage: '2d6+1',
        desc: 'Composed of primordial mud, the mudman is a horrific caricature of a man. Dark holes for eyes, a gaping mawl, and no neck or nose. It looks tough to fight, but it is guarding the way north.',
        element: 'earthmight',
        level: 2,
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('hydra_prototype', Quest.NPC.RPG_BEAST(), {
        alias: 'Hydra',
        desc: 'A semi-aquatic creature with numerous heads,',
        loredesc: 'A semi-aquatic creature with numerous heads, academics have suggested that it is related to the dragon, adapted for life in water. Some speculate that in fact it is a colony of creatures; each head is in fact a separate entity, but this theory so far remains unpopular with more respected scholars.',
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('rust_monster_prototype', Quest.NPC.RPG_BEAST(), {
        alias: 'Rust monster',
        armour: 3,
        attackbonus: 2,
        attackdesc: '% bites at you',
        damage: '3d8+2',
        defence: 1,
        desc: 'A beetle-like reptile, with two long tendrils extending from its mouth, and a spiky tail.',
        hitpoints: 32,
        level: 8,
        onweaponhit: 'if (Quest.World.player.equipped.canberusted) {\n            msg ("Your " + Quest.World.player.equipped.alias + " has been rusted by its contact with the creature. It will not be so effective from now on (but it is immune to further rusting).")\n            Quest.World.player.equipped.canberusted = false\n            Quest.World.player.equipped.rusted = true\n            Quest.World.player.equipped.attackbonus = Quest.World.player.equipped.attackbonus - 2\n            Quest.World.player.equipped.damagebonus = Quest.World.player.equipped.damagebonus - 2\n            Quest.World.player.equipped.damagedicesides = Quest.World.player.equipped.damagedicesides - 2\n            Quest.World.player.equipped.alias = Quest.World.player.equipped.alias + " (rusted)"\n            UpdateStatus\n          }',
        treasurechance: 5,
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('amorphous_blob_prototype', Quest.RPG.RPG_PLANT(), {
        alias: 'Amorphous blob',
        attackbonus: 3,
        attackdesc: '% lunges at you with a pseudopod',
        canberusted: false,
        damage: '3d8',
        desc: 'The blob is a grey-green colour, and every now and again is vaguely man-shaped, but seems unable to keep any shape for long.',
        hitpoints: 40,
        level: 7,
        nocorpse: [],
        ondeath: 'msg ("The blob slumps to the ground, split in to three by your attack, dead at last...")\n          msg ("Wait... The bits are starting to twitch. As you watch, each of the three parts rises up, a new, albeit smaller, amorphous blob.")\n          for (i, 1, 3) {\n            o = CloneObjectAndMove(amorphous_blob_2, this.parent)\n            do (o, "settoattack")\n          }',
        treasurechance: 0,
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('amorphous_blob_2_prototype', Quest.RPG.RPG_PLANT(), {
        alias: 'Amorphous blob',
        attackbonus: 3,
        attackdesc: '% lunges at you with a pseudopod',
        attackonsight: [],
        canberusted: false,
        damage: '2d6',
        desc: 'The smaller blob is a grey-green colour, and every now and again is vaguely man-shaped, but seems unable to keep any shape for long.',
        level: 3,
        nocorpse: [],
        ondeath: 'msg ("The smaller blob slumps to the ground.")\n          msg ("Then the bits start to twitch. As you watch, each of the parts rises up, a new, even smaller, amorphous blob.")\n          for (i, 1, GetRandomInt(2, 4)) {\n            o = CloneObjectAndMove(amorphous_blob_3, this.parent)\n            do (o, "settoattack")\n          }',
        treasurechance: 0,
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('amorphous_blob_3_prototype', Quest.RPG.RPG_PLANT(), {
        alias: 'Amorphous blob',
        attackbonus: 3,
        attackdesc: '% lunges at you with a pseudopod',
        attackonsight: [],
        canberusted: false,
        death: 'The remains of the blob seep away through cracks in the floor.',
        desc: 'The small blob is a grey-green colour, and every now and again is vaguely man-shaped, but seems unable to keep any shape for long.',
        hitpoints: 1,
        level: 1,
        nocorpse: [],
        ondeath: 'msg ("The blob slumps to the ground, split in two by your attack, dead at last...")\n          msg ("Wait... The bits are starting to twitch. As you watch, each of the three parts rises up, a new, albeit smaller, amorphous blob.")\n          for (i, 1, 3) {\n            o = CloneObjectAndMove(amorphous_blob_2, this.parent)\n            do (o, "settoattack")\n          }',
        treasurechance: 0,
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('adherer_prototype', Quest.RPG.RPG_CORRUPTED(), {
        alias: 'Weird mummy creature',
        armour: 2,
        attackdesc: '% bites at you',
        attackonsight: [],
        damage: '2d8+1',
        desc: 'This creature looks kind of like a mummy, but it seems to have various things stuck to it; you can see a dagger and some kind of club. It has the slow, shambling gait of a mummy, but somehow you feel it is not undead.',
        hitpoints: 24,
        level: 4,
        lookwhendead: 'There is just a pile of bandages and junk.',
        nonweapon: [],
        onweaponhit: 'if (not Quest.World.player.equipped = fists) {\n            msg ("Your " + Quest.World.player.equipped.alias + " has stuck fast to the creature!")\n            Quest.World.player.equipped.parent = this\n            Quest.World.player.equipped.inventoryverbs = Split ("Look at;Drop;Equip;Sell", ";")\n            Quest.World.player.equipped = fists\n            UpdateStatus\n            this.alias = "Adherer"\n          }',
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('mimic_prototype', Quest.RPG.RPG_PLANT(), {
        alias: 'Chest',
        attackbonus: 2,
        attackdesc: '% bites at you',
        damage: '3+6',
        death: 'The mimic now looks like a surrealist take on the subject of chests.',
        hitpoints: 14,
        level: 3,
        look: 'This battered chest has a lock, but it looks crude.',
        nonweapon: [],
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('mushroomman_prototype', Quest.RPG.RPG_PLANT(), {
        alias: 'Mushroomman',
        attackonsight: false,
        damage: 'd6',
        desc: 'A weirldly humanoid mushroom, according to that guy in the Greedy Goblin, they explode when killed.',
        level: 1,
        nocorpse: [],
        ondeath: "if (DoesInherit(Quest.World.player.currectattack, \"spell\") or DoesInherit(Quest.World.player.currectattack, \"scroll\")) {\n            msg (\"The mushroom man's corpse explodes in a haze of spores. Just as well you were not right next to it.\")\n          }\n          else if (GetBoolean(Quest.World.player.currectattack, \"longreach\")) {\n            msg (\"The mushroomman's corpse explodes in a haze of spores. Just as well you finished it off with a weapon with long reach.\")\n          }\n          else {\n            msg (\"The mushroomman's corpse explodes in a haze of spores, leaving you coughing and spluttering. -6 hits.\")\n            Quest.World.game.pov.hitpoints = Quest.World.game.pov.hitpoints - 6\n          }",
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('dark_pixie_prototype', Quest.RPG.RPG_FEY(), {
        alias: 'Dark pixie',
        attackasgroup: [],
        defence: 5,
        desc: 'While most pixies are wondrous and clever, dark pixies are annoying! They are less than a foot tall, and have wings not unlike that of a dragon fly. Cunning and elusive!',
        level: 3,
        poisonimmunity: true,
        poisonimmunitymsg: 'Poison has no effect on pixies, they are just too cool!',
        reflectsmagic: [],
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('shambling_mound_prototype', Quest.RPG.RPG_CORPOREAL_UNDEAD(), {
        absorbsmagic: [],
        alias: 'Shambling Mound',
        attackonsight: [],
        desc: 'Humanoid, flesh-eating vegetation!',
        hitpoints: 24,
        level: 1,
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('dire_hag_prototype', Quest.RPG.RPG_CORRUPTED(), {
        alias: 'Dire hag',
        attackonsight: [],
        death: 'In the death, the Dire Hag looks like a sad old woman.',
        defence: 3,
        desc: 'At first glance the hag resembles an old woman, but the reality is this creature is considerably tougher than that.',
        hitpoints: 24,
        level: 5,
        ondeath: 'if (HasString(this, "oldroomdesc")) {\n            this.parent.description = this.oldroomdesc\n          }\n          foreach (ex, ScopeExitsForRoom(this.parent)) {\n            ex.visible = true\n          }\n          msg ("As the Dire Hag dies, the lava-filled cavern shimmers before you eyes, and a moment later you are back in the chamber you first encountered the creature - if you ever left it?")',
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('iron_cobra_prototype', Quest.RPG.RPG_CONSTRUCT(), {
        alias: 'Iron cobra',
        armour: 4,
        attackonsight: [],
        desc: 'A huge, mechanical snake, constructed of articulated segments.',
        hitpoints: 50,
        level: 10,
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('lich_prototype', Quest.RPG.RPG_CORPOREAL_UNDEAD(), {
        alias: 'Lich',
        armour: 2,
        attackonsight: [],
        defence: 4,
        desc: 'A malicious wizard who has tried to cheat death, the lich resembles a bonelord, but retains his evil powers,',
        hitpoints: 80,
        level: 15,
        name: 'lich',
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('electric_skeleton_prototype', Quest.RPG.RPG_CORPOREAL_UNDEAD(), {
        alias: 'Electric skeleton',
        armour: 2,
        attackdesc: '% lunges at you',
        attackonsight: [],
        defence: 2,
        desc: 'A skeleton, with electricity sparking off it.',
        hitpoints: 30,
        level: 8,
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem('fire_zombie_prototype', Quest.RPG.RPG_CORPOREAL_UNDEAD(), {
        alias: 'Fire zombie',
        armour: 0,
        attackdesc: '% swings a burning hard at you',
        attackonsight: [],
        defence: 1,
        desc: 'A zombie, burning, but not consumed in the fire.',
        hitpoints: 25,
        level: 5,
    }),
];
const monsters = [
    {
        desc: 'Floating a little above the ground, the insubstantial ghost regards you with its one good eye.',
        instances: [
            {
                desc: 'The spirit of someone who has died in unfortunate circumstances.',
                name: 'minor apparition',
            },
            {
                desc: 'The spirit of someone who has died in unfortunate circumstances.',
                name: 'apparition',
            },
            {
                desc: 'The spirit of someone who has died in unfortunate circumstances.',
                name: 'spook',
            },
            {
                desc: 'The spirit of someone who has died in unfortunate circumstances.',
                name: 'ghost',
            },
            {
                desc: 'The spirit of someone guilty of dark crimes.',
                name: 'spectre',
            },
            {
                desc: 'The spirit of someone guilty of dark crimes.',
                name: 'dire spectre',
            },
            {
                desc: 'The spirit of someone guilty of particularly dark crimes.',
                name: 'shade',
            },
            {
                desc: 'The spirit of someone guilty of particularly dark crimes, whose laments chill the soul.',
                name: 'banshee',
            },
            {
                desc: 'The spirit of one who has fallen in battle, but is kept tied to this Quest.World.world by his or her own hate and need for vengeance against all living things.',
                name: 'revenant',
            },
            {
                desc: 'The spirit of one who has fallen in battle, but is kept tied to this Quest.World.world by his or her own hate and need for vengeance against all living things.',
                name: 'dark stalker',
            },
            {
                desc: 'The spirit of someone guilty of particularly dark crimes, whose laments chill the soul.',
                name: 'greater banshee',
            },
            {
                desc: 'The spirit of someone corrupted to evil by dark magicks.',
                name: 'wraith',
            },
            {
                desc: 'The spirit of a powerful leader who has fallen in battle, but is kept tied to this Quest.World.world by his or her own hate and need for vengeance against all living things.',
                name: 'revenant lord',
            },
            {
                desc: 'The spirit of someone corrupted to evil by dark magicks.',
                name: 'blood wraith',
            },
            {
                desc: 'The spirit of a powerful leader corrupted to evil by dark magicks.',
                name: 'wraith lord',
            },
        ],
        name: 'ghost',
        specialAttacks: [
            {
                attackdesc: 'The % lunges at you',
                canberusted: false,
                name: 'ghost_attack',
            },
            {
                attackdesc: 'The % tries to drain your intelligence',
                canberusted: false,
                mustmatch: 'wraith',
                name: 'wraith_attack',
            },
            {
                attackdesc: 'The % emits an ear-spliting shriek',
                canberusted: false,
                mustmatch: 'banshee',
                name: 'banshee shriek',
                onsuccessfulattack: {
                    text: 'msg ("The % has drained your mind!")\n            Quest.World.player.magiccurse = Quest.World.player.magiccurse + 2\n            Quest.World.player.magicbonus = Quest.World.player.magicbonus - 2',
                    type: 'script',
                },
            },
        ],
        template: Quest.RPG.RPG_NON_CORPOREAL_UNDEAD(),
        treasureChance: 0,
    },
    {
        desc: 'The bodies of the recently dead are easily transformed into zombies by those skilled in the necrotic arts.',
        instances: [
            {
                desc: 'The bodies of the recently dead are easily transformed into animated corpses by those skilled in the necrotic arts.',
                name: 'animated corpse',
            },
            {
                desc: 'The bodies of the recently dead are easily transformed into zombies by those skilled in the necrotic arts.',
                name: 'zombie',
            },
            {
                desc: 'The bodies of the recently dead are easily transformed into zombies by those skilled in the necrotic arts.',
                name: 'dire zombie',
            },
            {
                desc: 'A skeleton animated by necromancer.',
                name: 'decipit skeleton',
            },
            {
                desc: 'A skeleton animated by necromancer.',
                name: 'skeleton',
            },
            {
                desc: 'A zombie that has broken free of its controller, and survives by eating the dead.',
                name: 'ghoul',
            },
            {
                desc: 'In ancient times, priests would try to preserve the body of the deceased by embalming. Such corpses are highly prized by necromancers who can animate them for their own evil deeds.',
                name: 'mummy',
            },
            {
                desc: 'The corpse of one who has fallen in battle, animated and corrupted.',
                name: 'wight',
            },
            {
                desc: 'In ancient times, priests would try to preserve the body of the deceased by embalming. Such corpses are highly prized by necromancers who can animate them for their own evil deeds.',
                name: 'greater mummy',
            },
            {
                desc: 'A skeleton animated by necromancer, using superior enchantments to create this fearsome warrior.',
                name: 'skeletal warrior',
            },
            {
                desc: 'The corpse of a powerful leader who has fallen in battle, animated and corrupted.',
                name: 'wight king',
            },
            {
                desc: 'A zombie that has broken free of its controller, and survives by eating the dead.',
                name: 'ghast',
            },
            {
                desc: 'Like a mummy, the necrotic warrior has been animated from a mummified corpse, but the enchantments are rather more powerful.',
                name: 'necrotic warrior',
            },
            {
                desc: 'A malicious wizard who has tried to cheat death, the bonelord is now little more than a skeleton animated by evil in some disturbing armour.',
                name: 'bonelord',
            },
            {
                desc: 'A malicious wizard who has tried to cheat death, the bonelord is now little more than a skeleton animated by evil in some disturbing armour.',
                name: 'greater bonelord',
            },
        ],
        name: 'zombie',
        template: Quest.RPG.RPG_CORPOREAL_UNDEAD(),
    },
    {
        instances: [
            {
                desc: 'Smallest of the goblinoids, the snotling is nevertheless dangerous when encountered in numbers.',
                name: 'snotling',
            },
            {
                desc: 'The kobold is a skulking humanoid, who would only come up to your shoulder if he stood up straight. Its skin is green and scaled, and it is dressed in ragged clothes. Its teeth look sharp, his eyes cruel.',
                name: 'kobold',
            },
            {
                desc: 'A cruel creature, the goblin will bully those weaker than itself, and cower from those stronger.',
                name: 'goblin',
            },
            {
                desc: 'A cruel creature, the goblin will bully those weaker than itself, and cower from those stronger. The dire goblin is the larger, more unpleasant type.',
                name: 'dire goblin',
            },
            {
                desc: 'A little bigger than a goblin, but rather less intelligent, gnolls seem to spend their lives rooting through rubbish.',
                name: 'gnoll',
            },
            {
                desc: 'A little bigger than a goblin, but rather less intelligent, gnolls seem to spend their lives rooting through rubbish.',
                name: 'dire gnoll',
            },
            {
                desc: 'A bigger version of the goblin, less cowardly more cruel.',
                name: 'hobgoblin',
            },
            {
                desc: 'Orcs are like goblins but bigger; cruel and cowardly, but more dangerous to be around.',
                name: 'orc',
            },
            {
                desc: 'Orcs are like goblins but bigger; cruel and cowardly, but more dangerous to be around.',
                name: 'greater orc',
            },
            {
                desc: 'Larger than orcs, bugbears have thick fur hides.',
                name: 'bugbear',
            },
            {
                desc: 'Larger than orcs, bugbears have thick fur hides.',
                name: 'greater bugbear',
            },
            {
                desc: 'Orcs are like goblins but bigger; cruel and cowardly, but more dangerous to be around.',
                name: 'blood orc',
            },
            {
                desc: 'Largest of the goblinoids, the ogre is possibly also the dumbest.',
                name: 'ogre',
            },
            {
                desc: 'Largest of the goblinoids, the ogre is possibly also the dumbest.',
                name: 'blood ogre',
            },
            {
                desc: 'Largest of the goblinoids, the ogre is possibly also the dumbest.',
                name: 'ogre monarch',
            },
        ],
        name: 'kobold',
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        template: Quest.RPG.RPG_NPC(),
    },
    {
        instances: [
            {
                desc: 'Smallest of the goblinoids, the snotling is nevertheless dangerous when encountered in numbers.',
                name: 'snotling shaman',
            },
            {
                desc: 'The kobold is a skulking humanoid, who would only come up to your shoulder if he stood up straight. Its skin is green and scaled, and it is dressed in ragged clothes. Its teeth look sharp, his eyes cruel.',
                name: 'kobold diremage',
            },
            {
                desc: 'A cruel creature, the goblin will bully those weaker han itself, and cower from those stronger.',
                name: 'goblin shaman',
            },
            {
                desc: 'A cruel creature, the goblin will bully those weaker han itself, and cower from those stronger. The dire goblin is the larger, more unpleasant type.',
                name: 'dire goblin shaman',
            },
            {
                desc: 'A little bigger than a goblin, but rather less intelligent, gnolls seem to spend their lives rooting through rubbish.',
                name: 'gnoll bloodmage',
            },
            {
                desc: 'A little bigger than a goblin, but rather less intelligent, gnolls seem to spend their lives rooting through rubbish.',
                name: 'dire gnoll bloodmage',
            },
            {
                desc: 'A bigger version of the goblin, less cowardly more cruel.',
                name: 'hobgoblin warlord',
            },
            {
                desc: 'Orcs are like goblins but bigger; cruel and cowardly, but more dangerous to be around.',
                name: 'orc shaman',
            },
            {
                desc: 'Orcs are like goblins but bigger; cruel and cowardly, but more dangerous to be around.',
                name: 'greater orc shaman',
            },
            {
                desc: 'Larger than orcs, bugbears have thick fur hides.',
                name: 'bugbear obeah',
            },
            {
                desc: 'Larger than orcs, bugbears have thick fur hides.',
                name: 'greater bugbear obeah',
            },
            {
                desc: 'Orcs are like goblins but bigger; cruel and cowardly, but more dangerous to be around.',
                name: 'blood orc shaman',
            },
            {
                desc: 'Largest of the goblinoids, the ogre is possibly also the dumbest.',
                name: 'ogre magi',
            },
            {
                desc: 'Largest of the goblinoids, the ogre is possibly also the dumbest.',
                name: 'blood ogre magi',
            },
            {
                desc: 'Largest of the goblinoids, the ogre is possibly also the dumbest.',
                name: 'ogre monarch magi',
            },
        ],
        name: 'kobold_shaman',
        specialAttacks: [
            {
                alias: 'Ice blast',
                attackdesc: 'The % casts <i>Ice blast</i> at you',
                damagedicenumber: {
                    text: '3',
                    type: 'int',
                },
                element: {
                    text: 'frost',
                    type: 'object',
                },
                name: 'kobold_shaman_ice_blast',
                nonweapon: [],
            },
            {
                alias: 'Lightning bolt',
                attackdesc: 'The % casts <i>Lightning bolt</i> at you',
                damagedicesides: {
                    text: '14',
                    type: 'int',
                },
                element: {
                    text: 'storm',
                    type: 'object',
                },
                name: 'kobold_shaman_lightning',
                nonweapon: [],
            },
            {
                alias: 'Staff',
                attackdesc: 'The % swings his staff at you',
                damagedicesides: {
                    text: '6',
                    type: 'int',
                },
                name: 'kobold_shaman_staff',
            },
            {
                alias: 'Weaken',
                attackplayer: {
                    text: '// Only targets player!\n            Quest.World.player.damagebonus = Quest.World.player.damagebonus - 5\n            this.parent.resetattribute = "damagebonus"\n            this.parent.resetbonus = 5\n            this.parent = dead\n            msg (CapFirst(GetDisplayAlias (this.parent)) + " casts <i>Weaken</i> at you; you will do 5  less damage.with every weapon attack.")',
                    type: 'script',
                },
                damagedicesides: {
                    text: '14',
                    type: 'int',
                },
                destroyonsale: [],
                level: {
                    text: '5',
                    type: 'int',
                },
                name: 'kobold_shaman_weaken',
                nonweapon: [],
            },
        ],
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        template: Quest.RPG.RPG_NPC(),
        treasureChance: 20,
    },
    /*
          name:"elemental_archetype",
          desc:"A swirling mass of %element%.",
          instances:[
              {
                  "desc": "Floating, swirling elemental %element%, a little larger than your head.",
                  "name": "elemental guardian"
              },
              {
                  "desc": "A swirling mass of %element%.",
                  "name": "lesser elemental"
              },
              {
                  "desc": "A dog-like being full of elemental fury.",
                  "name": "elemental hound"
              },
              {
                  "desc": "A large swirling mass of %element%.",
                  "name": "greater elemental"
              },
              {
                  "desc": "A bull-like being full of elemental fury.",
                  "name": "elemental bull"
              },
              {
                  "desc": "A large swirling mass of %element%.",
                  "name": "elemental tumult"
              },
              {
                  "desc": "A large swirling mass of %element%.",
                  "name": "elemental maelstrom"
              },
              {
                  "desc": "A large, vaglue humanoid swirling mass of %element%.",
                  "name": "elemental daemon"
              },
              {
                  "desc": "A large, vaglue humanoid swirling mass of %element%.",
                  "name": "elemental archon"
              }
          ]
      }, */
    {
        instances: [
            {
                desc: 'A small humanoid, the imp has grey skin, pointed eyes and no hair at all. It stares at you with cruel, cat-like eyes.',
                name: 'imp',
            },
            {
                desc: 'A small humanoid, the blood imp has red skin, pointed eyes and no hair at all.',
                name: 'blood imp',
            },
            {
                desc: 'A humanoid with leathery wings, and small horns on its head, the fiend is not quite as tall as you.',
                name: 'fiend',
            },
            {
                desc: 'A humanoid with leathery wings, and small horns on its head, the pit fiend is about your size.',
                name: 'pit fiend',
            },
            {
                desc: 'A humanoid with leathery wings, small horns on its head and blood red skin, the pit fiend is about your size.',
                name: 'dire fiend',
            },
            {
                desc: "A pair of leathery wings sprout from the back of the devil, and ram's horns from its head.",
                name: 'devil',
            },
            {
                desc: "A pair of leathery wings sprout from the back of the devil, and ram's horns from its head.",
                name: 'greater devil',
            },
            {
                desc: 'The horns of a bull, the face of a snarling mutt; the demon is muscled and large.',
                name: 'demon',
            },
            {
                desc: 'The horns of a bull, the face of a snarling mutt; the demon is muscled and large.',
                name: 'greater demon',
            },
            {
                desc: 'The horns of a bull, the face of a snarling mutt; the demon is muscled and large.',
                name: 'rage demon',
            },
            {
                desc: 'The cacodemon towers over you, a body rippling with might and spikes.',
                name: 'cacodemon',
            },
            {
                desc: 'The horns of a bull, the face of a snarling mutt and skin red as blood; this demon is muscled and large',
                name: 'blood demon',
            },
            {
                desc: 'The legs of a goat, the wings and talons of a dragon, this fearsome creature regards you with obvious contempt.',
                name: 'archdemon',
            },
            {
                desc: 'The legs of a goat, the wings and talons of a dragon, this fearsome creature grins as it contemplates your doom.',
                name: 'demon prince',
            },
            {
                desc: 'The legs of a goat, the wings and talons of a dragon, this is the most fearsome of all the demons.',
                name: 'demon lord',
            },
        ],
        name: 'fiend',
        specialAttacks: [
            {
                alias: 'Fire blast',
                attackdesc: 'The % casts <i>Fire Storm</i> at you',
                damagedicenumber: {
                    text: '3',
                    type: 'int',
                },
                element: {
                    text: 'frost',
                    type: 'object',
                },
                name: 'fiend_fire_blast',
                nonweapon: [],
            },
            {
                alias: 'Lightning bolt',
                attackdesc: 'The % casts <i>Lightning Storm</i> at you',
                damagedicesides: {
                    text: '14',
                    type: 'int',
                },
                element: {
                    text: 'storm',
                    type: 'object',
                },
                name: 'fiend_lightning',
                nonweapon: [],
            },
            {
                alias: 'Claw',
                attackdesc: 'The % lunges at you with its claws',
                damagedicesides: {
                    text: '6',
                    type: 'int',
                },
                name: 'fiend_claw',
            },
            {
                alias: 'Befuddle',
                attackplayer: {
                    text: '// Only targets player!\n            Quest.World.player.damagebonus = Quest.World.player.magicbonus - 2\n            this.parent.resetattribute = "magicbonus"\n            this.parent.resetbonus = 2\n            this.parent = dead\n            msg (CapFirst(GetDisplayAlias (this.parent)) + " casts <i>Befuddle</i> at you; your intelligence drops by 2.")',
                    type: 'script',
                },
                damagedicesides: {
                    text: '14',
                    type: 'int',
                },
                destroyonsale: [],
                level: {
                    text: '5',
                    type: 'int',
                },
                name: 'fiend_befuddle',
                nonweapon: [],
            },
        ],
        template: Quest.RPG.RPG_DEMON(),
        treasureChance: 20,
    },
    {
        instances: [
            {
                desc: 'A mottled worm-like creature, with three sickly-white tentacles emerging from its mouth.',
                name: 'maloeg grub',
            },
            {
                desc: 'A fleshy mass of eyes, mouths and tentacles.',
                name: 'grim shambler',
            },
            {
                desc: 'The creeping fright is like a giant centipede with tentacles.',
                name: 'creeping fright',
            },
            {
                desc: 'A shadowy creature of almost there tentacles.',
                name: 'spawn of hab yogsoth',
            },
            {
                desc: 'A slender body, held up on loing thin tentacles that flick arounmd it, its round, toothed mouth is pointed at you.',
                name: 'dire creeper',
            },
            {
                desc: "A bulbous quadruped, this sickly-white creature's head has tentacles where you might have expected a face.",
                name: 'night horror',
            },
            {
                desc: 'This fat, white worm is covered in eyes and tentacles.',
                name: 'chaos worm',
            },
            {
                desc: 'A mouth full of vicious, surrounded by tentacles.',
                name: 'abysmal horror',
            },
            {
                desc: 'A dark red writhing mass of tentacles.',
                name: 'maloeg',
            },
            {
                desc: 'A dark red, almost black writhing mass of tentacles.',
                name: 'greater maloeg',
            },
            {
                desc: 'This vaguely humanoid creature has a mouth in its stomach, filled with sharp, needle-like teeth, and a skull-like face dwarfed by its huge head. Its arms end in wriggling tentacles.',
                name: 'loathsome fright',
            },
            {
                desc: 'A humanoid bat, with tentacles rounds its foul mouth.',
                name: 'night grim',
            },
            {
                desc: 'A huge, dark red, almost black writhing mass of tentacles.',
                name: 'archmaloeg',
            },
            {
                desc: 'You can see this humanoid bat, with tentacles rounds its foul mouth.',
                name: 'ethereal horror',
            },
            {
                desc: 'Floating above the ground, the ascended maloeg is a writhing mass of blood red tentacles beneath a huge grey brain.',
                name: 'ascended maloeg',
            },
        ],
        name: 'horror',
        specialAttacks: [
            {
                alias: 'Death blast',
                attackdesc: 'The % blasts you with necrotic might',
                damagedicenumber: {
                    text: '3',
                    type: 'int',
                },
                element: {
                    text: 'necrotic',
                    type: 'object',
                },
                name: 'horror_death_blast',
                nonweapon: [],
            },
            {
                alias: 'Lightning bolt',
                attackdesc: 'The % blasts you with lightning',
                damagedicesides: {
                    text: '14',
                    type: 'int',
                },
                element: {
                    text: 'storm',
                    type: 'object',
                },
                name: 'horror_lightning',
                nonweapon: [],
            },
            {
                alias: 'Tentacle',
                attackdesc: 'The % whips a foul tentacle',
                damagedicesides: {
                    text: '6',
                    type: 'int',
                },
                name: 'horror_tentacle',
            },
        ],
        template: Quest.RPG.RPG_CORRUPTED(),
        treasureChance: 0,
    },
    {
        instances: [
            {
                desc: 'Unlike the usual scarecrow, this one has eyes of fire. And it moves.',
                name: 'scarecrow',
            },
            {
                desc: 'Bigger than the scarecrows you are familiar with, this one has eyes of fire. And it moves.',
                name: 'large scarecrow',
            },
            {
                desc: 'A more fearsome version of the standard animated scarecrow, this has a pumpkin for its head.',
                name: 'pumpkinhead',
            },
            {
                desc: 'A simple automaton, not as big as you, and rather slow.',
                name: 'lesser automaton',
            },
            {
                desc: 'A simple automaton, a little bigger than you, and rather slow.',
                name: 'greater automaton',
            },
            {
                desc: 'A basic automaton, a little bigger than you, and rather slow, with glowing red eyes.',
                name: 'warden',
            },
            {
                desc: 'A somewhat advanced automaton, rather bigger than you, and rather slow, with glowing red eyes.',
                name: 'construct',
            },
            {
                desc: 'A somewhat advanced automaton, rather bigger than you, and rather slow, with glowing red eyes and scary weaponry.',
                name: 'greater construct',
            },
            {
                desc: 'An advanced automaton, rather bigger than you, and not so slow, with glowing red eyes.',
                name: 'advanced construct',
            },
            {
                desc: 'A sophisticated brass automaton, with glowing red eyes.',
                name: 'brass man',
            },
            {
                desc: 'A sophisticated brass automaton, with glowing red eyes, designed for warfare.',
                name: 'brass soldier',
            },
            {
                desc: 'A sophisticated iron automaton, with glowing red eyes, designed for warfare.',
                name: 'iron golem',
            },
            {
                desc: 'A sophisticated bronze automaton, with glowing red eyes, designed for warfare.',
                name: 'bronze sentinel',
            },
            {
                desc: 'A sophisticated steel automaton, with glowing red eyes, designed for warfare.',
                name: 'steel sentinel',
            },
            {
                desc: 'A huge, steel automaton, with glowing red eyes, designed for warfare.',
                name: 'colossus',
            },
        ],
        name: 'construct_archetype',
        template: Quest.RPG.RPG_CONSTRUCT(),
    },
    {
        instances: [
            {
                desc: 'A large snake with intelligent eyes.',
                name: 'serpent',
            },
            {
                desc: 'A large snake with intelligent eyes, and a vicious temperament.',
                name: 'vicious serpent',
            },
            {
                desc: 'A fat, snake-like creature.',
                name: 'cave wyrm',
            },
            {
                desc: 'A large, snake-like creature with a row of spines down its back.',
                name: 'greater wyrm',
            },
            {
                desc: 'A winged reptile, with a rooster-like head.',
                name: 'cockatrice',
            },
            {
                desc: 'A huge snake with intelligent eyes, and a vicious temperament',
                name: 'great serpent',
            },
            {
                desc: 'This huge snake has a crest on its head.',
                name: 'basilisk',
            },
            {
                desc: 'A winged reptile, with viscous claws and teeth, the drake is the smallest member of the dragon family.',
                name: 'lesser drake',
            },
            {
                desc: 'A winged reptile, with viscous claws and teeth, the drake is the smallest member of the dragon family.',
                name: 'greater drake',
            },
            {
                desc: 'A winged reptile, with viscous claws and teeth, the wyvern is somewhat bigger than the more common drake.',
                name: 'young wyvern',
            },
            {
                desc: 'A winged reptile, with viscous claws and teeth, the wyvern is somewhat bigger than the more common drake.',
                name: 'mature wyvern',
            },
            {
                desc: 'This may be a young dragon, but it is still a powerful creature, with a tough hide, nasty teath and a bad temperament.',
                name: 'young dragon',
            },
            {
                desc: 'A winged reptile, with viscous claws and teeth, the wyvern is somewhat bigger than the more common drake. This is an ancient one; it only got to be this old by being tougher than the rest.',
                name: 'ancient wyvern',
            },
            {
                desc: 'This dragon is a powerful creature, with a tough hide, nasty teeth and a bad temperament. Maturity has not improved it!',
                name: 'mature dragon',
            },
            {
                desc: 'Oldest of the dragon, it is also the biggest and the toughest.',
                name: 'ancient dragon',
            },
        ],
        name: 'dragon',
        specialAttacks: [
            {
                alias: 'Bite',
                attackdesc: 'The % bites at you',
                canberusted: {
                    text: 'false',
                    type: 'boolean',
                },
                damagedicenumber: {
                    text: '2',
                    type: 'int',
                },
                damagedicesides: {
                    text: '6',
                    type: 'int',
                },
                name: 'dragon_bite',
                nonweapon: [],
            },
            {
                alias: 'Claw',
                attackbonus: {
                    text: '2',
                    type: 'int',
                },
                attackdesc: 'The % lunges at you with its claws',
                canberusted: false,
                damagedicesides: {
                    text: '6',
                    type: 'int',
                },
                level: {
                    text: '4',
                    type: 'int',
                },
                name: 'dragon_claw',
                nonweapon: [],
            },
            {
                alias: 'Dragon breath',
                attackdesc: "A jet of fire shoots from the %'s mouth",
                canberusted: false,
                damagedicenumber: {
                    text: '4',
                    type: 'int',
                },
                damagedicesides: {
                    text: '4',
                    type: 'int',
                },
                element: {
                    text: 'fire',
                    type: 'object',
                },
                level: {
                    text: '10',
                    type: 'int',
                },
                name: 'dragon_breath',
                nonweapon: [],
            },
        ],
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
        template: Quest.NPC.RPG_BEAST(),
    },
];
for (const el of monsters) {
    for (let i = 0; i < el.instances.length; i++) {
        const name = `${el.instances[i].name.replace(/ /g, '_')}_prototype`;
        // log(name)
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
        Quest.World.createItem(name, el.template, {
            alias: Quest.Utilities.sentenceCase(el.instances[i].name),
            desc: el.instances[i].desc,
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'element' does not exist on type '{ name:... Remove this comment to see the full error message
            element: el.element,
            level: i,
            name: el.instances[i].name,
        });
    }
}
//# sourceMappingURL=data.js.map