import { QuestClass } from '../../types/quest';
import { createAdditionalPane } from '../../lib/io';

export const init = (Quest: QuestClass) => {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
  Quest.Settings.settings.title = 'No Compass';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'author' does not exist on type '{ perfor... Remove this comment to see the full error message
  Quest.Settings.settings.author = 'The Pixie';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
  Quest.Settings.settings.version = '0.1';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'thanks' does not exist on type '{ perfor... Remove this comment to see the full error message
  Quest.Settings.settings.thanks = [];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'warnings' does not exist on type '{ perf... Remove this comment to see the full error message
  Quest.Settings.settings.warnings = 'No warnings have been set for this game.';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
  Quest.Settings.settings.playMode = 'dev';

  Quest.Settings.settings.compassPane = false;
  // Quest.Settings.settings.noAskTell = false
  // ts-error-fixed ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
  Quest.Settings.settings.noTalkTo = false;

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
  Quest.Settings.settings.setup = function () {
    createAdditionalPane(2, 'Go to', 'directions', () => {
      let html = '';
      for (const ex of Quest.World.currentLocation.dests) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const dest = Quest.World.w[ex.name];
        html      += `<div style="margin-bottom: 10px;"><p class="item" onclick="Quest.Utilities.runCmd('go to ${dest.alias.toLowerCase()}')">${dest.headingAlias}</p></div>`;
      }
      return html;
    });
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'roomCreateFunc' does not exist on type '... Remove this comment to see the full error message
  Quest.Settings.settings.roomCreateFunc = function (o: any) {
    if (o.dests) {
      for (const ex of o.dests) {
        ex.origin = o;
        ex.dir    = `to ${o.dirAlias ? o.dirAlias : o.alias}`;
      }
    }
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'inventoryPane' does not exist on type '{... Remove this comment to see the full error message
  Quest.Settings.settings.inventoryPane.push(
    {
      alt:  'onPhoneTo',
      name: 'On Phone To',
      test(item: any) {
        return item.name === Quest.World.player.onPhoneTo;
      },
    },
  );

  Quest.Settings.settings.afterEnter = function () {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (Quest.World.player.onPhoneTo && Quest.World.w[Quest.World.player.onPhoneTo].loc === Quest.World.player.loc) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
      Quest.World.w.phone.hangUp();
    }
  };
};
