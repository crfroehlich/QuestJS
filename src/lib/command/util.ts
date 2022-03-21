import { Quest } from '../../types/quest';
import { Cmd } from './Cmd';
import { ExitCmd } from './ExitCmd';
import { NpcCmd } from './NpcCmd';
import { NpcExitCmd } from './NpcExitCmd';

// Should be called during the initialisation process
export const initCommands = () => {
  const newCmds = [];
  for (const el of Quest.Commands.commands) {
    if (!el.regexes) {
      el.regexes = [el.regex];
    }
    if (el.npcCmd) {
      if (!Array.isArray(el.regexes)) el;
      // ("creating NPC command for " + el.name)
      const regexAsStr = el.regexes[0]?.source.substr(1); // lose the ^ at the start, as we will prepend to it
      const objects = el.objects.slice();
      objects.unshift({ attName: 'npc', scope: Quest.Parser.parser.isHere });

      const data = {
        attName: el.attName,
        cmdCategory: el.cmdCategory ? el.cmdCategory : el.name,
        default: el.default,
        defmsg: el.defmsg,
        forNpc: true,
        objects,
        rules: el.rules,
        score: el.score,
      };

      // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
      const cmd = new NpcCmd(`Npc${el.name}`, data);
      cmd.regexes = [];
      for (const key in Quest.lang.tell_to_prefixes) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        cmd.regexes.push(
          new RegExp(`^${Quest.lang.tell_to_prefixes[key]}${regexAsStr}`),
        );
      }
      if (el.useThisScriptForNpcs) cmd.script = el.script;
      cmd.scope = [];
      for (const el2 of el.objects) {
        cmd.scope.push(
          el2 === Quest.Parser.parser.isHeld
            ? Quest.Parser.parser.isHeldByNpc
            : el2,
        );
        cmd.scope.push(
          el2 === Quest.Parser.parser.isWorn
            ? Quest.Parser.parser.isWornByNpc
            : el2,
        );
      }
      newCmds.push(cmd);
    }
  }

  Quest.Commands.commands.push.apply(Quest.Commands.commands, newCmds);

  for (const el of Quest.lang.exit_list) {
    if (el.type !== 'nocmd') {
      let regex = `(${Quest.lang.go_pre_regex})(${
        el.name
      }|${el.abbrev.toLowerCase()}`;
      if (el.alt) {
        regex += `|${el.alt}`;
      }
      regex += ')$';
      Quest.Commands.commands.push(
        new ExitCmd(`Go${Quest.Utilities.sentenceCase(el.name)}`, el.name, {
          regexes: [new RegExp(`^${regex}`)],
        }),
      );

      const regexes = [];
      for (const key in Quest.lang.tell_to_prefixes) {
        regexes.push(
          new RegExp(`^${Quest.lang.tell_to_prefixes[key]}${regex}`),
        );
      }
      Quest.Commands.commands.push(
        new NpcExitCmd(
          `NpcGo${Quest.Utilities.sentenceCase(el.name)}2`,
          el.name,
          { regexes },
        ),
      );
    }
  }
};

// Useful in a command's script when handling NPCs as well as the player
export const extractChar = (cmd: any, objects: any) => {
  let char;
  if (cmd.forNpc) {
    char = objects[0][0];
    if (!char.npc) {
      Quest.IO.failedmsg(Quest.lang.not_npc, {
        char: Quest.World.player,
        item: char,
      });
      return Quest.World.world.FAILED;
    }
    objects.shift();
  } else {
    char = Quest.World.player;
  }
  return char;
};

export const findCmd = (name: any): Cmd => {
  const ret = Quest.Commands.commands.find((el) => el.name === name);
  return ret as unknown as Cmd;
};

export const testCmd = (name: any, s: any) => {
  const cmd = findCmd(name);
  cmd.matchItems(s);
  cmd.tmp;
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg('See results in console (F12)');
};
