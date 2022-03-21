import { QuestClass } from '../../types/quest';
import { msg } from '../../lib/io';

export const init = (Quest: QuestClass) => {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
  Quest.Settings.settings.title = 'Your new game';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'author' does not exist on type '{ perfor... Remove this comment to see the full error message
  Quest.Settings.settings.author = 'Your name here';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
  Quest.Settings.settings.version = '0.1';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'thanks' does not exist on type '{ perfor... Remove this comment to see the full error message
  Quest.Settings.settings.thanks = [];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'warnings' does not exist on type '{ perf... Remove this comment to see the full error message
  Quest.Settings.settings.warnings = 'No warnings have been set for this game.';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
  Quest.Settings.settings.playMode = 'dev';

  Quest.Settings.settings.symbolsForCompass = true;
  Quest.Settings.settings.themes = ['sans-serif'];

  Quest.Settings.settings.eventFunctions = {
    sayNow() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Now!');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'scrollToEnd' does not exist on type '{ n... Remove this comment to see the full error message
      Quest.IO.io.scrollToEnd();
    },

    sayOften() {
      if (!Quest.World.player.count) Quest.World.player.count = 0;
      Quest.World.player.count++;
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(`Often! ${Quest.World.player.count}`);
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'scrollToEnd' does not exist on type '{ n... Remove this comment to see the full error message
      Quest.IO.io.scrollToEnd();
      if (Quest.World.player.count > 3) return true;
    },

    sayThen() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Then!');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'scrollToEnd' does not exist on type '{ n... Remove this comment to see the full error message
      Quest.IO.io.scrollToEnd();
    },
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
  Quest.Settings.settings.setup = function () {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'registerTimerEvent' does not exist on ty... Remove this comment to see the full error message
    Quest.Utilities.util.registerTimerEvent('sayNow', 2, 2);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'registerTimerEvent' does not exist on ty... Remove this comment to see the full error message
    Quest.Utilities.util.registerTimerEvent('sayThen', 10);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'registerTimerEvent' does not exist on ty... Remove this comment to see the full error message
    Quest.Utilities.util.registerTimerEvent('sayOften', 3, 3);
  };
}
