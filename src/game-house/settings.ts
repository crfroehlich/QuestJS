"use strict"

// @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.Settings.settings.playMode = "play"

// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.Settings.settings.title = "The House on Highfield Lane"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'author' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.Settings.settings.author = "Andy Joel"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
Quest.Settings.settings.version = "1.6"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifid' does not exist on type '{ performa... Remove this comment to see the full error message
Quest.Settings.settings.ifid = "8F79966F-54C6-4DA3-842A-330DBA5D0CB0"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'additionalAbout' does not exist on type ... Remove this comment to see the full error message
Quest.Settings.settings.additionalAbout = {
  'Thanks to': 'K.V., Pertex, XanMag, Jade, Mike Russo, Karona, Agnieszka Trzaska, Christopher Merriner, Mike_G, Amanda Walker and Andrew Schultz for beta testing. I would like to particularly pick out K.V., Agnieszka Trzaska and Christopher Merriner who went above and beyond, with any number of helpful suggestions between them.',
  'Also thanks to': 'My wife, sister, son and daughter -- Sara, Mags, Richard and Bex -- for testing from an outsider\'s perspective.',
  'Reporting bugs': 'Hopefully you will not encounter any issues with the game, but if you do, please e-mail the details to me at <i>the_pix@hotmail.com</i>, or via the IntFiction forum where my user name is "The Pixie".',
  'Bug reporters': 'Thanks to those who did indeed report bugs that have hopefully been sorted in later versions: Rovarsson and Sarah Willson. Also the anonymous comments left during the competition.',
  'Privacy': 'QuestJS games do not send any data to the server (besides the initial HTTP requests for the files) and do not use cookies. They only save data to your hard drive (in a place provided by your browser called localStorage) when you choose to save your game progress (or are recording a transcript).',
  'Compatibility': 'This game runs on JavaScript ES2015, and should work fine on any reasonably up-to-date browser. It has been tested on Chrome, Firefox, Edge and Safari; and on Windows, Mac, Ubuntu and Android. If you are reading this, you should be fine... ',
  'QuestJS': 'QuestJS is the latest version of Quest, and is also by Andy joel *(aka The Pixie). Learn more about QuestJS {link:here:https://github.com/ThePix/QuestJS/wiki}. Both QuestJS and this game are open-source, and the code is accessible from that site.',
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'warnings' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.Settings.settings.warnings = "Occasional bad language, including the F-word. A couple of locations have seen recent battles, and there are a lot bodies, but no graphic descriptions."
// @ts-expect-error ts-migrate(2339) FIXME: Property 'transcript' does not exist on type '{ pe... Remove this comment to see the full error message
Quest.Settings.settings.transcript = 'walk'

// @ts-expect-error ts-migrate(2339) FIXME: Property 'convertDoubleDash' does not exist on typ... Remove this comment to see the full error message
Quest.Settings.settings.convertDoubleDash = true


Quest.Settings.settings.files = [
  'code', 'walk', 'commands', 'data', 'external', 'normality',
  'victorian', 'battlefield', 'flora', 'medieval', 'steampunk', 'theatre', 'weird', 'observatory',
]

Quest.Settings.settings.tests = true
// @ts-expect-error ts-migrate(2339) FIXME: Property 'styleFile' does not exist on type '{ per... Remove this comment to see the full error message
Quest.Settings.settings.styleFile = 'style'
Quest.Settings.settings.getDefaultRoomHeading = function (item) { return Quest.Utilities.titleCase(Quest.lang.addDefiniteArticle(item) + item.alias) }
Quest.Settings.settings.symbolsForCompass = true
//Quest.Settings.settings.panes = 'none'
// @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.Settings.settings.panes = Quest.Settings.settings.playMode === "dev" ? 'left' : 'none'
Quest.Settings.settings.themes = ['serif']
// @ts-expect-error ts-migrate(2339) FIXME: Property 'favicon' does not exist on type '{ perfo... Remove this comment to see the full error message
Quest.Settings.settings.favicon = 'assets/icons/houseicon.png'
// @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
Quest.Settings.settings.noAskTell = false
Quest.Settings.settings.givePlayerAskTellMsg = false
Quest.Settings.settings.roomTemplate = [
  "#{cap:{hereName}}",
  "{terse:{hereDesc}}",
  "{objectsHere:She can see {objects} here.}",
  "{ifNot:settings:playMode:play:{ifExists:currentLocation:todo:{class:todo:{show:currentLocation:todo}}}}",
]

// @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
Quest.Settings.settings.fluids = ['sand', 'water']
Quest.Settings.settings.saveLoadExcludedAtts.push('silverSighting')

// @ts-expect-error ts-migrate(2339) FIXME: Property 'roomCreateFunc' does not exist on type '... Remove this comment to see the full error message
Quest.Settings.settings.roomCreateFunc = function (o: any) {
  // @ts-expect-error ts-migrate(7005) FIXME: Variable 'zone' implicitly has an 'any' type.
  o.zone = zone
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'afterLoad' does not exist on type '{ per... Remove this comment to see the full error message
Quest.Settings.settings.afterLoad = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
  parser.pronouns = {}
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'customNoExitMsg' does not exist on type ... Remove this comment to see the full error message
Quest.Settings.settings.customNoExitMsg = function (char: any, dir: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const list = w[player.loc].getExitDirs({ excludeLocked: true, excludeScenery: true, excludeAlsoDir: true })
  if (list.length === 1) return "She cannot go " + dir + ". Looks like the only exit is back " + list[0] + "."
  const listString = Quest.Utilities.formatList(list, { lastJoiner: Quest.lang.list_or, nothing: Quest.lang.list_nowhere })
  return "She cannot go " + dir + " - the exits she can see are " + listString + "."
}


Quest.Settings.settings.statsData = [
  { name: 'Objects', test: function (o) { return true } },
  { name: 'Locations', test: function (o) { return o.room } },
  { name: 'Locations requiring work', test: function (o) { return o.room && o.todo !== undefined } },
  { name: 'Items', test: function (o) { return !o.room } },
  { name: 'Takeables', test: function (o) { return o.takeable } },
  { name: 'Scenery', test: function (o) { return o.scenery } },
  { name: 'NPCs', test: function (o) { return o.npc && !o.player } },
]

// @ts-expect-error ts-migrate(2339) FIXME: Property 'intro' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.Settings.settings.intro = "There is something weird about the house on Highfield Lane. Whenever she walks past it, Mandy feels a chill, and hurries to be away from it. It is not the only house on Highfield Lane -- there are a couple of dozen, all built in the late nineteenth century -- but to Mandy it is {i:the} house. The end of the row, on the right, as she walks up the hill, before the town gives way to fields.|Tuesday... exams in three weeks, so tonight will be another evening of devising evermore complex and artistic revision timetables. Perhaps she should get down to some real revision, maybe biology or French. She should really learn those irregular verbs. Her bag slips off her shoulder, and she shivers, suddenly feeling cold; she is already at that house. Usually she would have crossed over to the other side of the road to avoid it by now. She glances at it quickly, the windows that look like eyes mocking her. How is that even possible? There are four windows, all rectangular and all different sizes. They look nothing like eyes, and yet somehow she knows they are laughing at her."

// @ts-expect-error ts-migrate(2339) FIXME: Property 'blurb' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.Settings.settings.blurb = [
  'The house at the top of Highfield Lane has always scared Mandy, though she could never say why exactly. Perhaps today is the day she should confront that fear!',
  'I started writing this in 2012-13, and to be honest bits of it were more relevant back then. Like why has Mandy not got a mask in her bag? For the record, then, this is set in 2016.',
  'There are a couple of riddles... The first is for Mandy to solve, the second for you. YOU may know the answer to the first, and if you do not you can easily Google it. Good for you. The riddle is for Mandy, and to solve it you need to find a way for HER to look it up. The second riddle, however, is for YOU, and you need to connect the numerous -- if obscure -- clues throughout the game to solve it and complete the game.',
  'While every item is there for a reason, some of them are just to help create a world, and not because you need to use them to progress, such as the items in your inventory at the start, maybe?',
  'WARNING: There is occasional swearing, including the F-word.',
]

// @ts-expect-error ts-migrate(2339) FIXME: Property 'finishMetaComment' does not exist on typ... Remove this comment to see the full error message
Quest.Settings.settings.finishMetaComment = "Congratulations on completing \"The House on Highfield Lane\". You can read about some of the background to the game and how I created it {link:here:" + folder + "/story.html}."

// @ts-expect-error ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.Settings.settings.setup = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'shakespeare_book' does not exist on type... Remove this comment to see the full error message
  for (const s in w.shakespeare_book.names) w.shakespeare_book.synonyms.push(w.shakespeare_book.names[s])
  //io.transcript = true
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'betaTesters' does not exist on type '{ p... Remove this comment to see the full error message
Quest.Settings.settings.betaTesters = [
  ['KV'],                           // First Quest wave (version 0.1.0--0.1.4+, early July)
  ['XanMag', 'Pertex'],             // Second Quest wave (version 0.2.0-?, late July
  ['Mags', 'Rick', 'Sara', 'Bex'],  // Family wave (0.2.6-0.2.8, late July)
  ['Jade', 'Mike Russo'],           // First IntFiction Wave (version 0.3.0, early August)
  ['Karona', 'Zed Lopez'],          // Second IntFiction Wave (version ?, mid-August)
  ['ChristopherMerriner', 'Mike_G', 'Agnieszka Trzaska'],// Third IntFiction Wave (version 0.3.5-0.3.6, late-August
  ['Amanda Walker'],                // Fourth IntFiction Wave (version 0.4.0, end-August
  ['aschultz'],                     // Fourth IntFiction Wave (version 0.4.3-5, mid-September
]