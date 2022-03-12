"use strict";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
settings.title = "A First Step..."
// @ts-expect-error ts-migrate(2339) FIXME: Property 'author' does not exist on type '{ perfor... Remove this comment to see the full error message
settings.author = "The Pixie"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
settings.version = "1.2"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'thanks' does not exist on type '{ perfor... Remove this comment to see the full error message
settings.thanks = ["Kyle", "Lara"]

// @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
settings.noTalkTo = false
// @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
settings.noAskTell = false

settings.tests = true
// @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
settings.playMode = 'dev'
// @ts-expect-error ts-migrate(2339) FIXME: Property 'reportAllSvg' does not exist on type '{ ... Remove this comment to see the full error message
settings.reportAllSvg = true

settings.textEffectDelay = 100

settings.imagesFolder = 'images/'
settings.libraries.push('zone')
settings.libraries.push('quest')
// @ts-expect-error ts-migrate(2339) FIXME: Property 'styleFile' does not exist on type '{ per... Remove this comment to see the full error message
settings.styleFile = 'style'


//settings.libraries.push('item_links')

//settings.localStorageDisabled = true

settings.textEffectDelay = 100

settings.symbolsForCompass = true

// @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
settings.fluids = ['water', 'honey', 'lemonade']

settings.status = [
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type '() => str... Remove this comment to see the full error message
  "hitpoints",
  function() { return "<td>Spell points:</td><td>3</td>"; },
  function() { return "<td>Health points:</td><td>" + player.hitpoints + "</td>"; },
  function() { return '<td colspan="2">' + player.status + "</td>"; },
]

// @ts-expect-error ts-migrate(2339) FIXME: Property 'intro' does not exist on type '{ perform... Remove this comment to see the full error message
settings.intro = "This is a quick example of what can be done in Quest 6.|Your objective is to turn on the light in the basement, but there are, of course, numerous hoops to jump through.|If you are successful, see if you can do it again, but getting {popup:Kyle:This is an example of a pop-up.} to do everything. It is {dateTime}. You should find that you can tell an NPC to do pretty much anything (except look at things for you and talk to people for you).|There is now a sizeable desert to the west you can explore too.|Learn more about Quest 6 {link:here:https://github.com/ThePix/QuestJS/wiki}."

// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDrawLabels' does not exist on type '{... Remove this comment to see the full error message
settings.mapDrawLabels=true

// This function will be called at the start of the game, so can be used
// to introduce your game.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
settings.setup = function() {
  player.hitpoints = 20;
  player.status = "You are feeling fine";
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateStatus' does not exist on type '{ ... Remove this comment to see the full error message
  io.updateStatus()
}

//settings.libraries.push('item_links')


settings.mapStyle = {right:'0', top:'200px', width:'300px', height:'300px', 'background-color':'yellow' }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapLabelStyle' does not exist on type '{... Remove this comment to see the full error message
settings.mapLabelStyle = {'font-size':'8pt', 'font-weight':'bold', color:'blue'}

settings.funcForDynamicConv = 'showMenuDiag'