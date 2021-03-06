import { Cmd, findCmd } from '../../lib/command';
import { QuestClass } from '../../types/quest';
import { msg, metamsg, failedmsg } from '../../lib/io';

export const cloakHere = function (Quest: QuestClass) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'cloak' does not exist on type '{}'.
  if (Quest.World.w.cloak.isAtLoc('me')) return true;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'cloak' does not exist on type '{}'.
  if (Quest.World.w.cloak.isHere()) return true;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'cloak' does not exist on type '{}'.
  if (
    Quest.World.w.cloak.isAtLoc('hook') &&
    Quest.World.player.isAtLoc('cloakroom')
  )
    return true;
  return false;
};

export const init = (Quest: QuestClass) => {
  Quest.lang.no_smell = 'It smells slightly musty.';

  Quest.lang.no_listen = 'It is quiet as the grave...';

  Quest.Text.addDirective('cloakHere', (arr: any, params: any) =>
    cloakHere(Quest) ? arr[0] : arr[1],
  );

  findCmd('MetaCredits').script = function () {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg(
      'This game was created by The Pixie, following the Cloak of Darkness specification by Roger Firth.',
    );
  };

  findCmd('MetaHelp').script = function () {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg('Just type stuff at the prompt!');
  };

  Quest.Commands.commands.push(
    new Cmd('HangUp', {
      objects: [{ scope: Quest.Parser.parser.isHeld }],
      regex: /^(?:hang up|hang) (.+?)(?: on the hook| on hook|)$/,
      script(objects: any) {
        if (!objects[0][0].isAtLoc(Quest.World.player)) {
          return failedmsg("You're not carrying {sb:obj}.", {
            obj: objects[0][0],
          });
        }
        if (objects[0][0].worn) {
          return failedmsg("Not while you're wearing {sb:obj}!", {
            obj: objects[0][0],
          });
        }
        if (!Quest.World.player.isAtLoc('cloakroom')) {
          return failedmsg('Hang {sb:obj} where, exactly?', {
            obj: objects[0][0],
          });
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'hook' does not exist on type '{}'.
        objects[0][0].moveToFrom(Quest.World.player, Quest.World.w.hook);
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        msg('You hang {nm:obj:the} on the hook.', {
          obj: objects[0][0],
        });
        return Quest.World.world.SUCCESS;
      },
    }),
  );
};
