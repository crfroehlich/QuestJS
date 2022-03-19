import { QuestClass } from '../../types/quest';

export const init = (Quest: QuestClass) => {

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
  Quest.Settings.settings.title = 'Buttons, buttons, buttons';
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

  // ts-error-fixed ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
  Quest.Settings.settings.noTalkTo = false;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'styleFile' does not exist on type '{ per... Remove this comment to see the full error message
  Quest.Settings.settings.styleFile = 'style';

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'roomCreateFunc' does not exist on type '... Remove this comment to see the full error message
  Quest.Settings.settings.roomCreateFunc = function (o: any) {
    if (o.dests) {
      for (const ex of o.dests) {
        ex.origin = o;
        ex.dir = `to ${o.dirAlias ? o.dirAlias : o.alias}`;
      }
    }
  };

  Quest.Settings.settings.afterEnter = function () {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (Quest.World.player.onPhoneTo && Quest.World.w[Quest.World.player.onPhoneTo].loc === Quest.World.player.loc) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
      Quest.World.w.phone.hangUp();
    }
  };

  // For items
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'inventoryPane' does not exist on type '{... Remove this comment to see the full error message
  Quest.Settings.settings.inventoryPane = [
    {
      alt: 'itemsHeld',
      getLoc() {
        return Quest.World.player.name;
      },
      name: 'You are holding...',
      noContent: 'Nothing',
      test: Quest.Settings.settings.isHeldNotWorn,
    },
    {
      alt: 'itemsWorn',
      getLoc() {
        return Quest.World.player.name;
      },
      name: 'You are wearing...',
      noContent: 'Nothing',
      test: Quest.Settings.settings.isWorn,
    },
    {
      alt: 'itemsHere',
      getLoc() {
        return Quest.World.player.loc;
      },
      name: 'You can see...',
      noContent: 'Nothing',
      test: Quest.Settings.settings.isHere,
    },
    {
      alt: 'onPhoneTo',
      name: 'You are on the phone to',
      noContent: 'No one',
      test(item: any) {
        return item.name === Quest.World.player.onPhoneTo;
      },
    },
  ];

  // For directions
  Quest.Settings.settings.compassPane = false;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
  Quest.Settings.settings.setup = function () {
    Quest.IO.createAdditionalPane(0, 'Go to', 'directions', () => {
      const exitList = Quest.World.currentLocation.getExits({ excludeLocked: true });
      let s = '<p class="item-class"><span class="item-name">You can go:</span>';
      for (const ex of exitList) {
        s += ` <span class="item-action-button" onclick="Quest.IO.io.clickExit('${ex.dir}')">`;
        s += ex.dir;
        s += '</span>';
      }
      s += '</p>';
      return s;
    });
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'updateCustomUI' does not exist on type '... Remove this comment to see the full error message
    Quest.Settings.settings.updateCustomUI();
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'updateCustomUI' does not exist on type '... Remove this comment to see the full error message
  Quest.Settings.settings.updateCustomUI = function () {
    // For items
    for (const el of document.querySelectorAll('.item-action')) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
      el.style.display = 'block';
      log(el.innerHTML);
    }

    // el.previousSibling.innerHTML = Quest.World.currentLocation.headingAlias
  };
}
