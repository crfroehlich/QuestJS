"use strict"


const quest = {
  INITIAL: 0,
  ACTIVE: 1,
  MOOT: 2,
  FAILED: 3,
  SUCCESS: 4,
  data: [],
  progressNames: ['', 'Active', 'Moot', 'Failed', 'Success'],
}




// @ts-expect-error ts-migrate(2339) FIXME: Property 'create' does not exist on type '{ INITIA... Remove this comment to see the full error message
quest.create = function (name: any, stages: any, data: any) {
  if (!data) data = {}
  data.name = name
  data.stages = stages
  data.key = name.replace(/ /g, '_').replace(/[^a-zA-Z0-9_]/g, '')
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
  quest.data.push(data)
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
quest.getState = function (name: any, char: any) {
  if (!char) char = player
  const result = {}
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'quest' does not exist on type '{}'.
  result.quest = typeof name === 'string' ? quest.data.find(el => el.name === name) : name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'quest' does not exist on type '{}'.
  if (!result.quest) {
    console.error("Failed to find a quest called " + name)
    console.log('Giving up...')
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'stateName' does not exist on type '{}'.
  result.stateName = 'quest_state_' + result.quest.key
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'progressName' does not exist on type '{}... Remove this comment to see the full error message
  result.progressName = 'quest_progress_' + result.quest.key
  console.log(char)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'stateName' does not exist on type '{}'.
  console.log(result.stateName)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'stateName' does not exist on type '{}'.
  console.log(char[result.stateName])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'state' does not exist on type '{}'.
  result.state = char[result.stateName]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'progress' does not exist on type '{}'.
  result.progress = char[result.progressName]
  console.log(result)
  return result
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
quest.comment = function (q: any, n: any, s: any) {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg(s + ": {i:" + q.name + "}")
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (n !== false) Quest.IO.metamsg(q.stages[n].text)
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'start' does not exist on type '{ INITIAL... Remove this comment to see the full error message
quest.start = function (name: any) {
  console.log(name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const result = quest.getState(name, player)
  if (result.progress !== undefined) return false // quest already started
  player[result.progressName] = quest.ACTIVE
  player[result.stateName] = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
  quest.comment(result.quest, 0, "Quest started")
  return true
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'restart' does not exist on type '{ INITI... Remove this comment to see the full error message
quest.restart = function (name: any, n: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const data = quest.getState(name, player)
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress === quest.ACTIVE) return false // quest already started
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  player[result.progressName] = quest.ACTIVE
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  player[result.stateName] = n ? n : 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
  quest.comment(result.quest, 0, "Quest started")
  return true
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'next' does not exist on type '{ INITIAL:... Remove this comment to see the full error message
quest.next = function (name: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const data = quest.getState(name, player)
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress !== quest.ACTIVE) return false
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  player[result.stateName]++
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'stages' does not exist on type '{ INITIA... Remove this comment to see the full error message
  if (quest.stages.length >= player[result.stateName]) return quest.complete(data.quest)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
  quest.comment(result.quest, result.stateName, "Quest progress")
  return true
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'complete' does not exist on type '{ INIT... Remove this comment to see the full error message
quest.complete = function (name: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const data = quest.getState(name, player)
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress !== quest.ACTIVE) return false
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  player[result.progressName] = quest.SUCCESS
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  player[result.stateName] = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
  quest.comment(result.quest, false, "Quest completed")
  return true
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'fail' does not exist on type '{ INITIAL:... Remove this comment to see the full error message
quest.fail = function (name: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const data = quest.getState(name, player)
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress !== quest.ACTIVE) return false
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  player[result.progressName] = quest.FAILED
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  player[result.stateName] = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
  quest.comment(result.quest, false, "Quest failed")
  return true
}

// @ts-expect-error ts-migrate(2551) FIXME: Property 'moot' does not exist on type '{ INITIAL:... Remove this comment to see the full error message
quest.moot = function (name: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const data = quest.getState(name, player)
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress !== quest.ACTIVE) return false
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  player[result.progressName] = quest.MOOT
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  player[result.stateName] = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
  quest.comment(result.quest, false, "Quest moot")
  return true
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'set' does not exist on type '{ INITIAL: ... Remove this comment to see the full error message
quest.set = function (name: any, n: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const data = quest.getState(name, player)
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress !== quest.ACTIVE) return false
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.state <= n) return false
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  player[result.stateName] = n
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
  quest.comment(result.quest, result.stateName, "Quest progress")
  return true
}





// @ts-expect-error ts-migrate(2339) FIXME: Property 'progress' does not exist on type '{ INIT... Remove this comment to see the full error message
quest.progress = function (name: any, all: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const data = quest.getState(name, player)
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress === undefined) return false
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress !== quest.ACTIVE && all) return false
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg(data.name + ', {i:' + quest.progressNames[result.progress] + '}')
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress === quest.ACTIVE) Quest.IO.metamsg(data.quest.stages[result.stateName].text)
  return true
}










// @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type '{ INITIAL:... Remove this comment to see the full error message
quest.list = function (all: any) {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg(all ? 'Active Quests' : 'All Quests')
  let flag = false
  for (let q of quest.data) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getStatus' does not exist on type '{ INI... Remove this comment to see the full error message
    flag = flag || quest.getStatus(q, all)
  }
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!flag) Quest.IO.metamsg("None")
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!all) Quest.IO.metamsg("[Do QUESTS ALL to include completed and failed quests]")
}

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('MetaQuests', {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isPresent],
  regex: /^(?:quest|quests|q)$/,
  objects: [
  ],
  script: function (item: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type '{ INITIAL:... Remove this comment to see the full error message
    quest.list(false)
  },
}))

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('MetaQuestsAll', {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isPresent],
  regex: /^(?:quest|quests|q) all$/,
  objects: [
  ],
  script: function (item: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type '{ INITIAL:... Remove this comment to see the full error message
    quest.list(true)
  },
}))


