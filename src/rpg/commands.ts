namespace Quest {
  export namespace Commands {

    Quest.Commands.commands.push(new Quest.Command.Cmd('Attack', {
      defmsg:  'No point attacking {nm:item:the}.',
      npcCmd:  true,
      objects: [
        { scope: Quest.Parser.parser.isPresent },
      ],
      rules: [Quest.Command.cmdRules.isPresent],
    }));

    Quest.Commands.commands.push(new Quest.Command.Cmd('Search', {
      defmsg:  'No point attacking {nm:item:the}.',
      npcCmd:  true,
      objects: [
        { scope: Quest.Parser.parser.isPresent },
      ],
      rules: [Quest.Command.cmdRules.isPresent],
    }));

    Quest.Commands.commands.push(new Quest.Command.Cmd('Equip', {
      defmsg:  '{nv:item:be:true} not something you can equip.',
      npcCmd:  true,
      objects: [
        { scope: Quest.Parser.parser.isHeld },
      ],
      rules: [Quest.Command.cmdRules.isHeld],
    }));

    Quest.Commands.commands.push(new Quest.Command.Cmd('Unequip', {
      defmsg:  '{nv:item:be:true} not something you can equip.',
      npcCmd:  true,
      objects: [
        { scope: Quest.Parser.parser.isHeld },
      ],
      rules: [Quest.Command.cmdRules.isHeld],
    }));

    Quest.Commands.commands.push(new Quest.Command.Cmd('LearnSpell', {
      npcCmd:  true,
      objects: [
        { special: 'text' },
      ],
      rules: [Quest.Command.cmdRules.isPresent],
      script(objects: any) {
        const spell = Quest.RPG.rpg.find(objects[0]);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'spell' does not exist on type 'never'.
        if (!spell || !spell.spell) return Quest.IO.failedmsg(`There is no spell called ${objects[0]}.`);

        const source = Quest.RPG.rpg.isSpellAvailable(Quest.World.player, spell);
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (!source) return Quest.IO.failedmsg(`You do not have anything you can learn {i:${spell.name}} from.`);

        // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
        Quest.World.player.skillsLearnt.push(spell.name);
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(`You learn {i:${spell.name}} from ${Quest.lang.getName(source, { article: Quest.Utilities.DEFINITE })}.`);
        return Quest.World.world.SUCCESS;
      },
    }));

    Quest.Commands.commands.push(new Quest.Command.Cmd('CastSpell', {
      npcCmd:  true,
      objects: [
        { special: 'text' },
      ],
      rules: [Quest.Command.cmdRules.isPresent],
      script(objects: any) {
        const spell = Quest.RPG.rpg.find(objects[0]);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'spell' does not exist on type 'never'.
        if (!spell || !spell.spell) return Quest.IO.failedmsg(`There is no spell called ${objects[0]}.`);

        // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
        if (!Quest.World.player.skillsLearnt.includes(spell.name)) return Quest.IO.failedmsg(`You do not know the spell {i:${spell.name}}.`);

        // ts-error-fixed ts-migrate(2339) FIXME: Property 'noTarget' does not exist on type 'never'... Remove this comment to see the full error message
        if (!spell.noTarget) return Quest.IO.failedmsg(`You need a target for the spell {i:${spell.name}}.`);

        // ts-error-fixed ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
        const attack = Quest.RPG.Attack.createAttack(Quest.World.player, Quest.World.player, spell);
        if (!attack) return Quest.World.world.FAILED;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'apply' does not exist on type 'true | At... Remove this comment to see the full error message
        attack.apply().output();
        return Quest.World.world.SUCCESS;
      },
    }));

    Quest.Commands.commands.push(new Quest.Command.Cmd('CastSpellAt', {
      npcCmd:  true,
      objects: [
        { special: 'text' },
        { scope: Quest.Parser.parser.isPresent },
      ],
      rules: [Quest.Command.cmdRules.isPresent],
      script(objects: any) {
        const spell = Quest.RPG.rpg.find(objects[0]);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'spell' does not exist on type 'never'.
        if (!spell || !spell.spell) return Quest.IO.failedmsg(`There is no spell called ${objects[0]}.`);

        // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
        if (!Quest.World.player.skillsLearnt.includes(spell.name)) return Quest.IO.failedmsg(`You do not know the spell {i:${spell.name}}.`);

        const target = objects[1][0];

        // check target

        // ts-error-fixed ts-migrate(2339) FIXME: Property 'damage' does not exist on type 'never'.
        if (spell.damage && target.health === undefined) return Quest.IO.failedmsg("You can't attack that.");

        // ts-error-fixed ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
        const attack = Quest.RPG.Attack.createAttack(Quest.World.player, target, spell);
        if (!attack) return Quest.World.world.FAILED;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'apply' does not exist on type 'true | At... Remove this comment to see the full error message
        attack.apply().output();
        return Quest.World.world.SUCCESS;
      },
    }));

    Quest.Commands.commands.push(new Quest.Command.Cmd('DebugRPG', {
      objects: [
      ],
      regex: /^Quest.RPG.rpg$/,
      script(objects: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'attackOutputLevel' does not exist on typ... Remove this comment to see the full error message
        Quest.Settings.settings.attackOutputLevel = 10;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('All output from attacks will now be seen.');
        return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
      },
    }));
  }
}
