import { QuestClass } from '../../types/quest';

export const init = (Quest: QuestClass) => {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
  Quest.Settings.settings.title = 'The Voyages of The Joseph Banks';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'author' does not exist on type '{ perfor... Remove this comment to see the full error message
  Quest.Settings.settings.author = 'The Pixie';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
  Quest.Settings.settings.version = '0.1';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'thanks' does not exist on type '{ perfor... Remove this comment to see the full error message
  Quest.Settings.settings.thanks = ['Kyle', 'Lara'];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'warnings' does not exist on type '{ perf... Remove this comment to see the full error message
  Quest.Settings.settings.warnings =
    'This game does have swearing (including the F-word); it is possible to romance crew mates of either gender, but nothing graphic.';

  // UI options
  Quest.Settings.settings.libraries.push('shipwise');
  Quest.Settings.settings.files = [
    'const',
    'code',
    'commands',
    'text',
    'data',
    'npcs',
    'map',
  ];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'styleFile' does not exist on type '{ per... Remove this comment to see the full error message
  Quest.Settings.settings.styleFile = 'style';
  Quest.Settings.settings.noTalkTo =
    'You can talk to an NPC using either {color:red:ASK [name] ABOUT [topic]} or {color:red:TELL [name] ABOUT [topic]}.';
  // ts-error-fixed ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
  Quest.Settings.settings.noAskTell = false;
  Quest.Settings.settings.givePlayerAskTellMsg = false;
  Quest.Settings.settings.symbolsForCompass = true;

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
  Quest.Settings.settings.playMode = 'dev';
  Quest.Settings.settings.tests = true;
  Quest.Settings.settings.dateTime.start = new Date('April 14, 2387 09:43:00');

  Quest.Settings.settings.roomTemplate = [
    '#{cap:{hereName}}',
    '{terse:{hereDesc}}',
    '{objectsHere:You can see {objects} here.}',
  ];

  Quest.Settings.settings.saveLoadExcludedAtts.push('data');

  Quest.Settings.settings.status = [
    function () {
      return `<td width="55px" title="You receive a bonus for collecting good data"><b>Bonus:</b></td><td width="20px"></td><td align="right"><b>$${Quest.World.player.bonus}k</b></td>`;
    },
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'statusReport' does not exist on type '{ ... Remove this comment to see the full error message
    function () {
      return Quest.Settings.settings.statusReport(Quest.World.player);
    },
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'statusReport' does not exist on type '{ ... Remove this comment to see the full error message
    function () {
      return Quest.Settings.settings.statusReport(Quest.World.w.Xsansi);
    },
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'statusReport' does not exist on type '{ ... Remove this comment to see the full error message
    function () {
      return Quest.Settings.settings.statusReport(Quest.World.w.Ha_yoon);
    },
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'statusReport' does not exist on type '{ ... Remove this comment to see the full error message
    function () {
      return Quest.Settings.settings.statusReport(Quest.World.w.Kyle);
    },
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'statusReport' does not exist on type '{ ... Remove this comment to see the full error message
    function () {
      return Quest.Settings.settings.statusReport(Quest.World.w.Ostap);
    },
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'statusReport' does not exist on type '{ ... Remove this comment to see the full error message
    function () {
      return Quest.Settings.settings.statusReport(Quest.World.w.Aada);
    },
    function () {
      return `<td colspan="3" style="border:black solid 1px" align="center" title="The current date and time (adjusted for relativistic effects)">${Quest.Utilities.util.getDateTime()}</td>`;
    },
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'oxygenReport' does not exist on type '{ ... Remove this comment to see the full error message
    function () {
      return Quest.Settings.settings.oxygenReport();
    },
  ];

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'colours' does not exist on type '{ perfo... Remove this comment to see the full error message
  Quest.Settings.settings.colours = [
    'red',
    'yellow',
    'blue',
    'lime',
    'lime',
    'grey',
    'black',
  ];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'colourNotes' does not exist on type '{ p... Remove this comment to see the full error message
  Quest.Settings.settings.colourNotes = [
    'Red indicates something is seriously wrong; action should be taken to avoid death',
    'Yellow indicates cause for concern',
    'Blue indicates less than excellent, but probably no cause for concern',
    'Green indicates excellent',
    'lime',
    'Grey indicates the crewman is in stasis',
    'Black indicates the crewman is dead',
  ];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'intervals' does not exist on type '{ per... Remove this comment to see the full error message
  Quest.Settings.settings.intervals = [25, 50, 25, 1, 1000];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'intervalDescs' does not exist on type '{... Remove this comment to see the full error message
  Quest.Settings.settings.intervalDescs = [
    'worrying',
    'fair',
    'good',
    'perfect',
  ];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'statusReport' does not exist on type '{ ... Remove this comment to see the full error message
  Quest.Settings.settings.statusReport = function (obj: any) {
    let s;
    let colourCode;
    let tooltip;
    tooltip = `${obj.alias} is `;
    if (!obj.crewman)
      tooltip += obj.player
        ? 'the captain of the ship (i.e., you)'
        : 'the ship AI';
    if (typeof obj.status === 'string') {
      s = obj.status;
      colourCode = s === 'stasis' ? 5 : 6;
      if (obj.crewman) tooltip += s === 'stasis' ? 'in stasis' : 'dead';
    } else {
      s = `${obj.status.toString()}%`;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'getByInterval' does not exist on type '{... Remove this comment to see the full error message
      colourCode = Quest.Utilities.util.getByInterval(
        Quest.Settings.settings.intervals,
        obj.status,
      );
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (obj.crewman) tooltip += `in ${Quest.World.w[obj.loc].alias}`;
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'warningLight' does not exist on type '{ ... Remove this comment to see the full error message
    return `<td title="${tooltip}"><i>${
      obj.alias
    }:</i></td>${Quest.Settings.settings.warningLight(
      colourCode,
    )}<td align="right">${s}</td>`;
  };
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'oxygenReport' does not exist on type '{ ... Remove this comment to see the full error message
  Quest.Settings.settings.oxygenReport = function (obj: any) {
    // 0.84 kg O2  per day
    // https://ntrs.nasa.gov/citations/20040012725
    // so 0.58 g/m
    // log(Quest.World.w.ship.oxygen)
    // log(Quest.Utilities.util.getByInterval(Quest.Settings.settings.intervals, Quest.World.w.ship.oxygen / 50))
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getByInterval' does not exist on type '{... Remove this comment to see the full error message
    const colourCode = Quest.Utilities.util.getByInterval(
      Quest.Settings.settings.intervals,
      Quest.World.w.ship.oxygen / 10,
    );
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'warningLight' does not exist on type '{ ... Remove this comment to see the full error message
    return `<td title="The ship has a limited amount of oxygen; an adult uses about 6 g every minute, but none while in stasis"><b>Oxygen:</b></td>${Quest.Settings.settings.warningLight(
      colourCode,
    )}<td align="right"><span style="font-size:0.8em">${(
      Math.round(Quest.World.w.ship.oxygen) / 1000
    ).toFixed(3)} kg</span></td>`;
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'warningLight' does not exist on type '{ ... Remove this comment to see the full error message
  Quest.Settings.settings.warningLight = function (colourCode: any) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'colourNotes' does not exist on type '{ p... Remove this comment to see the full error message
    let s = `<td title="${Quest.Settings.settings.colourNotes[colourCode]}">`;
    s += '<svg height="12" width="10">';
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'colours' does not exist on type '{ perfo... Remove this comment to see the full error message
    s += `<circle cx="5" cy="5" r="5" stroke="black" stroke-width="1" fill="${Quest.Settings.settings.colours[colourCode]}" />`;
    s += '</svg>';
    s += '</td>';
    return s;
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'inventoryPane' does not exist on type '{... Remove this comment to see the full error message
  Quest.Settings.settings.inventoryPane = false;

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
  Quest.Settings.settings.setup = function () {
    arrival();
    // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector(
      '#panes',
    ).innerHTML += `<div id="map" class="pane-div" style="text-align:center;">${mapSVG}</div>`;
    updateMap();
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'updateCustomUI' does not exist on type '... Remove this comment to see the full error message
  Quest.Settings.settings.updateCustomUI = function () {
    updateMap();
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'afterDarkToggle' does not exist on type ... Remove this comment to see the full error message
  Quest.Settings.settings.afterDarkToggle = function () {
    updateMap();
  };

  const professions = [
    { bonus: 'mech', name: 'Engineer' },
    { bonus: 'science', name: 'Scientist' },
    { bonus: 'medicine', name: 'Medical officer' },
    { bonus: 'combat', name: 'Soldier' },
    { bonus: 'computers', name: 'Computer specialist' },
    { bonus: 'agility', name: 'Exotic dancer' },
    { bonus: 'deceit', name: 'Advertising exec' },
    { bonus: 'social', name: 'Urban poet' },
  ];

  const backgrounds = [
    { bonus: 'social', name: 'Bored dilettante' },
    { bonus: 'science', name: 'Wannabe explorer' },
    { bonus: 'none', name: 'Fame-seeker' },
    { bonus: 'none', name: 'Debtor' },
    { bonus: 'deceit', name: 'Criminal escaping justice' },
    { bonus: 'none', name: 'Anti-social loner' },
    { bonus: 'none', name: 'Conspiracy crackpot' },
    { bonus: 'none', name: 'Religious fanatic' },
  ];

  let s =
    '<p>You are on a mission to survey planets around five stars; the captain of a crew of five, including yourself. There is also a computer system, Xsansi, that you can talk to anywhere on the ship. </p><p>The objective of the game is to maximise your bonus. Collecting data will give a bonus, but geo-data about planets suitable for mining and bio-data about planets suitable for colonisation will give higher bonuses. Evidence of alien intelligence will be especially rewarding!</p><p>You need to survive to collect the bonus! You should also keep your crew alive; as captain you get a bigger bonus than the crew, but it will be reduced if they do not survive.</p><p>You have just arrived at your first destination after years in a "stasis" pod in suspended animation. Once you have created your character, ASK AI ABOUT MISSION or CREW might be a good place to start. Later you may want to try commands like OSTAP, LAUNCH PROBE or ASK AADA ABOUT PLANET. Also see what happens when you hover the mouse over a name in the status pane. You can also use HELP if you want more details.</p>';

  s += '<table>';
  s +=
    '<tr><td>Name:</td><td><input id="namefield" type="text" value="Ariel" style="width:300px" /></td></tr>';
  s +=
    '<tr><td>Sex:</td><td>Male: <input type="radio" id="male" name="sex" value="male">&nbsp;&nbsp;&nbsp;&nbsp;';
  s +=
    'Female<input type="radio" id="female" name="sex" value="female" checked></td></tr>';
  s += '<tr><td>Profession:</td><td><select id="job" style="width:300px">';
  for (const prof of professions) {
    s += `<option value="${prof.name}">${prof.name}</option>`;
  }
  s += '</select></td></tr>';
  s +=
    '<tr><td>Background:</td><td><select id="background" style="width:300px">';
  for (const back of backgrounds) {
    s += `<option value="${back.name}">${back.name}</option>`;
  }
  s += '</select></td></tr></table>';

  // Quest.Settings.settings.startingDialogEnabled = Quest.Settings.settings.playMode !== 'dev'
  Quest.Settings.settings.startingDialogEnabled = true;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogTitle' does not exist on t... Remove this comment to see the full error message
  Quest.Settings.settings.startingDialogTitle = 'To start with...';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogWidth' does not exist on t... Remove this comment to see the full error message
  Quest.Settings.settings.startingDialogWidth = 500;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHeight' does not exist on ... Remove this comment to see the full error message
  Quest.Settings.settings.startingDialogHeight = 550;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHtml' does not exist on ty... Remove this comment to see the full error message
  Quest.Settings.settings.startingDialogHtml = s;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogButton' does not exist on ... Remove this comment to see the full error message
  Quest.Settings.settings.startingDialogButton = 'OK';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogOnClick' does not exist on... Remove this comment to see the full error message
  Quest.Settings.settings.startingDialogOnClick = function () {
    const p = Quest.World.player;
    // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
    const jobName = document.querySelector('#job').value;
    const job = professions.find((el) => el.name === jobName);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
    Quest.World.w.me.job = job.name;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
    Quest.World.w.me.jobBonus = job.bonus;
    // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
    const backgroundName = document.querySelector('#background').value;
    const background = backgrounds.find((el) => el.name === backgroundName);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
    Quest.World.w.me.background = background.name;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
    Quest.World.w.me.backgroundBonus = background.bonus;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
    Quest.World.w.me.isFemale = document.querySelector('#female').checked;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
    Quest.World.w.me.alias = document.querySelector('#namefield').value;
  };
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogInit' does not exist on ty... Remove this comment to see the full error message
  Quest.Settings.settings.startingDialogInit = function () {
    // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#namefield').focus();
  };
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogAlt' does not exist on typ... Remove this comment to see the full error message
  Quest.Settings.settings.startingDialogAlt = function () {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
    Quest.World.w.me.job = professions[0].name;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
    Quest.World.w.me.jobBonus = professions[0].bonus;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
    Quest.World.w.me.isFemale = true;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
    Quest.World.w.me.alias = 'Shaala';
  };
};
