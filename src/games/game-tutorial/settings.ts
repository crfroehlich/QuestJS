// About your game
// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.Settings.settings.title = 'Professor Kleinscope';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'author' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.Settings.settings.author = 'The Pixie';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
Quest.Settings.settings.version = '1.4';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'additionalAbout' does not exist on type ... Remove this comment to see the full error message
Quest.Settings.settings.additionalAbout = { 'Thanks to': 'Pertex and R2T1 for beta-testing.' };
// @ts-expect-error ts-migrate(2339) FIXME: Property 'warnings' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.Settings.settings.warnings = 'No warning relevant for this game.';
Quest.Settings.settings.files    = ['data', 'code', 'npcs'];
// @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.Settings.settings.playMode = 'dev';
// @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
Quest.Settings.settings.noTalkTo = false;
// @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
Quest.Settings.settings.noAskTell            = false;
Quest.Settings.settings.givePlayerAskTellMsg = false;
Quest.Settings.settings.symbolsForCompass    = true;
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifid' does not exist on type '{ performa... Remove this comment to see the full error message
Quest.Settings.settings.ifid = '3749B11B-0AAA-494B-B2C7-19E0A8E6EBCE';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'afterSave' does not exist on type '{ per... Remove this comment to see the full error message
Quest.Settings.settings.afterSave = function (filename: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'before' does not exist on type '{}'.
  if (hint.before('save')) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    tmsg('Okay, we were not going to do saving until later, but whatever...');
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
    Quest.World.w.me.alreadySaved = true;
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'before' does not exist on type '{}'.
  else if (hint.before('westRobot')) {
    if (filename.toLowerCase() === 'tutorial') {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg("Great, we have saved the game - and you even followed my advice for the name. Now let's continue west down this passage.");
    } else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg("Great, we have saved the game - though I am, a bit disappointed that you didn't followed my advice for the name... Oh, well, I guess we better continue west down this passage.");
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    hint.now('westRobot');
  }
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'afterLoad' does not exist on type '{ per... Remove this comment to see the full error message
Quest.Settings.settings.afterLoad = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'before' does not exist on type '{}'.
  if (!hint.before('westRobot')) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    tmsg('Great, you not only saved the game, you loaded it too! I suggest you use the HINT command to see what to do next, and then you can get going with the tutorial again.');
  }
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'intro' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.Settings.settings.intro = [
  'Your mission is to retrieve some files from the computer of Professor Kleinscope. His office is upstairs, but getting there will not be easy.',
];

// @ts-expect-error ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.Settings.settings.setup = function () {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  tmsg('This is a simple introduction to text adventures; comments like this will lead you by the hand as you do most of the common things in a text adventures (you can toggle these comments on and off with the TUTORIAL command).');
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  tmsg('Text adventures are also known as interactive fiction, and there are numerous formats. This is about parser-based game, which is to say, a game where the user types commands, and the game attempts to parse the command, and update the game Quest.World.world accordingly.');
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  tmsg("There is also a huge variety of parser-based games, but most start with some introductory text, as above, and then place the player in a starting location, so let's see where we are...");
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  tmsg('I suggest you type WAIT now (by he way, I will give commands you type in capitals; you can use upper or lower case as you prefer -input is not case sensitive).');
};

Quest.Settings.settings.roomTemplate = [
  '#{cap:{hereName}}',
  '{terse:{hereDesc}}',
  '{objectsHere:You can see {objects} here.}',
];
