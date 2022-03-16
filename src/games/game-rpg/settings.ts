// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.Settings.settings.title = 'A First RPG...';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'author' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.Settings.settings.author = 'The Pixie';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
Quest.Settings.settings.version = '1.1';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'thanks' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.Settings.settings.thanks = ['Kyle', 'Lara'];

// @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
Quest.Settings.settings.customLibraries.push({ files: ['lang-en', 'rpg', 'skill', 'attack', 'item_templates', 'npc_templates', 'commands', 'spells', 'weapons'], folder: 'rpg' });
Quest.Settings.settings.files.push('weather');

// @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
Quest.Settings.settings.statusPane = false;
Quest.Settings.settings.tests      = true;
// @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.Settings.settings.playMode = 'dev';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'attackOutputLevel' does not exist on typ... Remove this comment to see the full error message
Quest.Settings.settings.attackOutputLevel = 10;
// @ts-expect-error ts-migrate(2339) FIXME: Property 'armourScaling' does not exist on type '{... Remove this comment to see the full error message
Quest.Settings.settings.armourScaling = 10;
// @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
Quest.Settings.settings.noTalkTo = false;
// @ts-expect-error ts-migrate(2339) FIXME: Property 'output' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.Settings.settings.output = function (report: any) {
  for (const el of report) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'attackOutputLevel' does not exist on typ... Remove this comment to see the full error message
    if (el.level <= Quest.Settings.settings.attackOutputLevel) {
      if (el.level === 1) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(el.t);
      } else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg(el.t);
      }
    }
  }
};

Quest.Settings.settings.dateTime = {

  data: [
    { name: 'second', number: 60 },
    { name: 'minute', number: 60 },
    { name: 'hour', number: 24 },
    { name: 'day', number: 365 },
    { name: 'year', number: 999999 },
  ],

  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],

  formats: {
    def:  '%dayOfWeek% %dayOfYear%, %year%, %hour%:%minute% %ampm%',
    time: '%hour%:%minute% %ampm%',
  },

  functions: {
    ampm(dict: any) {
      if (dict.minute === 0 && dict.hour === 0) return 'midnight';
      if (dict.minute === 0 && dict.hour === 12) return 'noon';
      return dict.hour < 12 ? 'am' : 'pm';
    },
    dayOfWeek(dict: any) {
      // @ts-expect-error ts-migrate(2551) FIXME: Property 'days' does not exist on type '{ year: st... Remove this comment to see the full error message
      return Quest.Settings.settings.dateTime.days[(dict.day + 365 * dict.year) % Quest.Settings.settings.dateTime.days.length];
    },
    dayOfYear(dict: any) {
      let { day } = dict;
      // @ts-expect-error ts-migrate(2551) FIXME: Property 'months' does not exist on type '{ year: ... Remove this comment to see the full error message
      for (const el of Quest.Settings.settings.dateTime.months) {
        if (el.n > day) return `${day + 1} ${el.name}`;
        day -= el.n;
      }
      return 'failed';
    },
    hour(dict: any) {
      return dict.hour < 13 ? dict.hour : (dict.hour - 12);
    },
    minute(dict: any) {
      return dict.minute < 10 ? `0${dict.minute}` : dict.minute;
    },
    year(dict: any) {
      return `AD ${dict.year + 1000}`;
    },
  },

  months: [
    { n: 31, name: 'January' },
    { n: 28, name: 'February' },
    { n: 31, name: 'March' },
    { n: 30, name: 'April' },
    { n: 31, name: 'May' },
    { n: 30, name: 'June' },
    { n: 31, name: 'July' },
    { n: 31, name: 'August' },
    { n: 30, name: 'September' },
    { n: 31, name: 'October' },
    { n: 30, name: 'November' },
    { n: 31, name: 'December' },
  ],
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ startTime: number; data: { name: string; n... Remove this comment to see the full error message
  startTime: 1000000000,
};

// This function will be called at the start of the game, so can be used
// to introduce your game.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.Settings.settings.setup = function () {
  Quest.World.player.skillsLearnt = ['Double attack', 'Fireball'];
  Quest.IO.createAdditionalPane(1, 'Spells', 'spells-known', () => {
    let html = '';
    for (const name of Quest.World.player.skillsLearnt) {
      html += `<p class="item" onclick="Quest.Utilities.runCmd('cast ${name}')" >${name}</p><br/>`;
    }
    return html;
  });

  Quest.World.player.hitpoints    = 20;
  Quest.World.player.status       = 'You are feeling fine';
  Quest.World.player.skillsLearnt = ['Double attack', 'Fireball'];
  // Quest.Settings.settings.updateCustomUI()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'rabbit' does not exist on type '{}'.
  Quest.World.w.rabbit.setLeader(player);
};
