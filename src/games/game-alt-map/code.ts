import { QuestClass } from '../../types/quest';

export const init = (Quest: QuestClass) => {
  // Quest.quest.next(char, questname)
  // Quest.quest.set(char, questname, const or stepname)

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'create' does not exist on type '{ INITIA... Remove this comment to see the full error message
  Quest.quest.create('Charm for Tary', [
    { text: 'Tary has asked me to find her a petro-charm; I should try Madame Rel\'s Little Shop of Wonders on the Wheat Road.' },
    { text: 'Tary has asked me to find her a petro-charm; I have found one, I need to give it to her.' },
  ]);

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'openingTimes' does not exist on type '{}... Remove this comment to see the full error message
  Quest.Utilities.util.openingTimes = function () {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isAfter' does not exist on type '{}'.
    if (Quest.Utilities.util.isAfter('1700')) return Quest.IO.falsemsg('The business is now closed.');
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isAfter' does not exist on type '{}'.
    if (!Quest.Utilities.util.isAfter('0800')) return Quest.IO.falsemsg('The business closed until eight.');
    return true;
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
  Quest.Text.addDirective('timeOfDayComment', (arr: any, params: any) => {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getCustomDateTimeDict' does not exist on... Remove this comment to see the full error message
    const time = Quest.Utilities.util.getCustomDateTimeDict({});
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const location = Quest.World.w[Quest.World.player.loc];
    if (!location.timeStatus) return '';
    let { hour } = time;
    for (let i = 0; i < location.timeStatus.length; i++) {
      if (hour < location.timeStatus[i].to) return location.timeStatus[i].t;
      hour -= location.timeStatus[i].to;
    }
    return 'NONE';
  });

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
  Quest.Text.addDirective('npcStatus', (arr: any, params: any) => {
    const result = [];
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    for (const el of Quest.Utilities.scopeAllNpcHere()) {
      console.log(el.name);
      if (el.locationStatus) {
        const s = el.locationStatus();
        if (s) result.push(s);
      }
    }
    return result.join('|');
  });
};
