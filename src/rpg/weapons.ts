namespace Quest {
  const weapons = [
    {
      atts: 'msFT', damage: 'd6', desc: 'Can be concealed', name: 'Dagger',
    },
    {
      atts: 'msF', damage: '2d6', desc: 'Use if you want to go first; bonus to initiative', name: 'Short sword',
    },
    {
      atts: 'ms', damage: '2d8', desc: 'Also sword, etc. Good general purpose weapon', name: 'Broad sword',
    },
    {
      atts: 'ms', damage: '3d6', desc: 'Also scimitar, etc. Good for unarmoured foes', name: 'Sabre',
    },
    {
      atts: 'MsX', damage: '3d8', desc: 'Requires skill, but does good damage, especially to unarmed foes', name: 'Two-handed sword',
    },
    {
      atts: 'maST', damage: 'd8', desc: 'Cheap and readily available!', name: 'Wood axe',
    },
    {
      atts: 'maS', damage: 'd10', desc: 'Good against armoured foes, but slow', name: 'Battle axe',
    },
    {
      atts: 'MaSX', damage: '2d10', desc: 'Requires skill, but does good damage, especially to unarmed foes', name: 'Great axe',
    },
    {
      atts: 'mb', damage: '2d4', desc: 'Includes improvised weapons', name: 'Club',
    },
    {
      atts: 'mb', damage: 'd10', desc: 'Good against armed foes', name: 'Mace',
    },
    {
      atts: 'ma', damage: 'd12', desc: 'Good against armed foes', name: 'Flanged mace',
    },
    {
      atts: 'ma', damage: '2d8', desc: 'All round weapon', name: 'Morning star',
    },
    {
      atts: 'MaXY', damage: 'd12', desc: 'Requires skill, especially good against armoured foes with shields', name: 'Flail',
    },
    {
      atts: 'MbD', damage: '2d4', desc: 'Good for defense', name: 'Quarterstaff',
    },
    {
      atts: 'mbS', damage: '2d10', desc: 'Slow but good damage', name: 'Warhammer',
    },
    {
      atts: 'MbSX', damage: '2d12', desc: 'Lots of damage, but slow and requires skill', name: 'Two-handed hammer',
    },
    {
      atts: 'MpR2XST', damage: '2d8', desc: 'Extra reach, can be used as a thrown weapon too (also javelin or trident)', name: 'Spear',
    },
    {
      atts: 'MpR2XS', damage: '3d8', desc: 'Extra reach', name: 'Polearm',
    },
    {
      atts: 'MpR2XSH', damage: '3d6', desc: 'Extra reach, and can be used to hook a foe', name: 'Halberd',
    },
    {
      atts: 'msR2XS', damage: '4d4', desc: 'Requires skill, but good against unarmed and extra reach', name: 'Whip',
    },
    {
      atts: 'msR3XS]', damage: '4d4', desc: 'As whip, but even more reach', name: 'Bull whip',
    },

    {
      atts: 'tb', damage: 'd4', desc: 'Or anything of a decent size and weight to throw', name: 'Thrown rock',
    },
    {
      atts: 'tbL0', damage: '2d4', desc: 'Cheap ammo', name: 'Sling',
    },
    {
      atts: 'bpL0X', damage: '2d6', desc: 'Fast reload', name: 'Short bow',
    },
    {
      atts: 'bpFL0X', damage: '3d6', desc: 'Takes a minor action to reload, but decent damage against unarmoured', name: 'Long bow',
    },
    {
      atts: 'bpL0X', damage: 'd12', desc: 'Takes a minor action to reload, but decent against armoured foes', name: 'Light crossbow',
    },
    {
      atts: 'bpL1X', damage: 'd20', desc: 'Takes a full standard action to reload, but good against armoured foes', name: 'Heavy crossbow',
    },
    {
      atts: 'fpL2', damage: '2d12', desc: 'Very noisy. Takes two full standard actions to reload, and expensive to use.', name: 'Flintlock',
    },
    {
      atts: 'FpL2', damage: '2d20', desc: 'Very noisy. Takes two full standard actions to reload, and expensive to use, but look at all the damage!', name: 'Musket',
    },
  ];

// ts-error-fixed ts-migrate(2339) FIXME: Property 'weaponTypeMapping' does not exist on typ... Remove this comment to see the full error message
  Quest.RPG.rpg.weaponTypeMapping = {
    F: '2H firearm',
    M: '2H melee',
    b: 'Bow',
    f: '1H firearm',
    m: '1H melee',
    t: 'Thrown',
  };

// ts-error-fixed ts-migrate(2339) FIXME: Property 'weaponDamageMapping' does not exist on t... Remove this comment to see the full error message
  Quest.RPG.rpg.weaponDamageMapping = {
    a: 'Axe',
    b: 'Bash',
    c: 'Crush',
    p: 'Pierce',
    s: 'Slash',    // using weight to create bloody wound
  };

// ts-error-fixed ts-migrate(2339) FIXME: Property 'weaponFlags' does not exist on type '{ l... Remove this comment to see the full error message
  Quest.RPG.rpg.weaponFlags = {
    D:  'defensive',
    F:  'fast',
    H:  'hook',
    L0: 'quickReload',
    L1: 'longReload',
    L2: 'veryLongReload',
    R2: 'longReach',
    R3: 'veryLongReach',
    S:  'slow',
    T:  'thrownable',
    X:  'requiresSkill',
  };

// ts-error-fixed ts-migrate(2339) FIXME: Property 'createWeapon' does not exist on type '{ ... Remove this comment to see the full error message
  Quest.RPG.rpg.createWeapon = function (data: any) {
    const name = `${data.name.toLowerCase().replace(/ |\-/g, '_')}_prototype`;
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
    const weapon = Quest.World.createItem(name, Quest.Templates.WEAPON(data.damage));
    // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    weapon.type = Quest.RPG.rpg.weaponTypeMapping[data.atts[0]];
    // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (!weapon.type) log(`Weapon type not recognised for ${name}: ${data.atts}`);
    // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    weapon.damageType = Quest.RPG.rpg.weaponDamageMapping[data.atts[1]];
    // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (!weapon.damageType) log(`Weapon damage type not recognised for ${name}: ${data.atts}`);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'weaponFlags' does not exist on type '{ l... Remove this comment to see the full error message
    for (const key in Quest.RPG.rpg.weaponFlags) {
      // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      if (data.atts.substring(2).includes(key)) weapon[Quest.RPG.rpg.weaponFlags[key]] = true;
    }
    return weapon;
  };

  for (const data of weapons) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'createWeapon' does not exist on type '{ ... Remove this comment to see the full error message
    Quest.RPG.rpg.createWeapon(data);
  }
}
