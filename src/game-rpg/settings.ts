"use strict";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
settings.title = "A First RPG...";
// @ts-expect-error ts-migrate(2339) FIXME: Property 'author' does not exist on type '{ perfor... Remove this comment to see the full error message
settings.author = "The Pixie"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
settings.version = "1.1";
// @ts-expect-error ts-migrate(2339) FIXME: Property 'thanks' does not exist on type '{ perfor... Remove this comment to see the full error message
settings.thanks = ["Kyle", "Lara"];

// @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
settings.customLibraries.push({folder:'rpg', files:["lang-en", "rpg", "skill", "attack", "item_templates", "npc_templates", "commands", "spells", "weapons"]})
settings.files.push('weather')

// @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
settings.statusPane = false;
settings.tests = true
// @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
settings.playMode = 'dev'
// @ts-expect-error ts-migrate(2339) FIXME: Property 'attackOutputLevel' does not exist on typ... Remove this comment to see the full error message
settings.attackOutputLevel = 10
// @ts-expect-error ts-migrate(2339) FIXME: Property 'armourScaling' does not exist on type '{... Remove this comment to see the full error message
settings.armourScaling = 10
// @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
settings.noTalkTo = false
// @ts-expect-error ts-migrate(2339) FIXME: Property 'output' does not exist on type '{ perfor... Remove this comment to see the full error message
settings.output = function(report: any) {
  for (let el of report) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'attackOutputLevel' does not exist on typ... Remove this comment to see the full error message
    if (el.level <= settings.attackOutputLevel) {
      if (el.level === 1) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(el.t)
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(el.t)
      }
    }
  }
}





settings.dateTime = {
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ startTime: number; data: { name: string; n... Remove this comment to see the full error message
  startTime:1000000000,
  data:[
    { name:'second', number:60 },
    { name:'minute', number:60 },
    { name:'hour', number:24 },
    { name:'day', number:365 },
    { name:'year', number:999999 },
  ],
  months:[
    { name:'January', n:31},
    { name:'February', n:28},
    { name:'March', n:31},
    { name:'April', n:30},
    { name:'May', n:31},
    { name:'June', n:30},
    { name:'July', n:31},
    { name:'August', n:31},
    { name:'September', n:30},
    { name:'October', n:31},
    { name:'November', n:30},
    { name:'December', n:31},
  ],
  days:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  formats:{
    def:'%dayOfWeek% %dayOfYear%, %year%, %hour%:%minute% %ampm%',
    time:'%hour%:%minute% %ampm%',
  },
  functions:{
    dayOfWeek:function(dict: any) { 
      // @ts-expect-error ts-migrate(2551) FIXME: Property 'days' does not exist on type '{ year: st... Remove this comment to see the full error message
      return settings.dateTime.days[(dict.day + 365 * dict.year) % settings.dateTime.days.length] 
    },
    dayOfYear:function(dict: any) {
      let day = dict.day
      // @ts-expect-error ts-migrate(2551) FIXME: Property 'months' does not exist on type '{ year: ... Remove this comment to see the full error message
      for (let el of settings.dateTime.months) {
        if (el.n > day) return (day + 1) + ' ' + el.name
        day -= el.n
      }
      return 'failed'
    },
    year:function(dict: any) { return 'AD ' + (dict.year + 1000) },
    hour:function(dict: any) { return dict.hour < 13 ? dict.hour : (dict.hour - 12) },
    minute:function(dict: any) { return dict.minute < 10 ? '0' + dict.minute : dict.minute },
    ampm:function(dict: any) {
      if (dict.minute === 0 && dict.hour === 0) return 'midnight'
      if (dict.minute === 0 && dict.hour === 12) return 'noon'
      return dict.hour < 12 ? 'am' : 'pm'
    },
  },
}


// This function will be called at the start of the game, so can be used
// to introduce your game.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
settings.setup = function() {
  player.skillsLearnt = ["Double attack", "Fireball"]
  createAdditionalPane(1, "Spells", 'spells-known', function() {
    let html = ''
    for (const name of player.skillsLearnt) {
      html += '<p class="item" onclick="runCmd(\'cast ' + name + '\')" >' + name + '</p><br/>'
    }
    return html
  })

  player.hitpoints = 20
  player.status = "You are feeling fine"
  player.skillsLearnt = ["Double attack", "Fireball"]
  //settings.updateCustomUI()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'rabbit' does not exist on type '{}'.
  w.rabbit.setLeader(player)
}

