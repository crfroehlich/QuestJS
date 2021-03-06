import { Quest } from '../types/quest';
import { Cmd, cmdRules } from './command';

export const quest = {
  ACTIVE: 1,
  FAILED: 3,
  INITIAL: 0,
  MOOT: 2,
  SUCCESS: 4,
  data: [],
  progressNames: ['', 'Active', 'Moot', 'Failed', 'Success'],
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'create' does not exist on type '{ INITIA... Remove this comment to see the full error message
quest.create = function (name: any, stages: any, data: any) {
  if (!data) data = {};
  data.name = name;
  data.stages = stages;
  data.key = name.replace(/ /g, '_').replace(/[^a-zA-Z0-9_]/g, '');
  // ts-error-fixed ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
  quest.data.push(data);
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
quest.getState = function (name: any, char: any) {
  if (!char) char = Quest.World.player;
  const result = {};
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'quest' does not exist on type '{}'.
  result.quest =
    typeof name === 'string' ? quest.data.find((el) => el.name === name) : name;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'quest' does not exist on type '{}'.
  if (!result.quest) {
    error(`Failed to find a quest called ${name}`);
    ('Giving up...');
  }
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'stateName' does not exist on type '{}'.
  result.stateName = `quest_state_${result.quest.key}`;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'progressName' does not exist on type '{}... Remove this comment to see the full error message
  result.progressName = `quest_progress_${result.quest.key}`;
  char;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'stateName' does not exist on type '{}'.
  result.stateName;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'stateName' does not exist on type '{}'.
  char[result.stateName];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'state' does not exist on type '{}'.
  result.state = char[result.stateName];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'progress' does not exist on type '{}'.
  result.progress = char[result.progressName];
  result;
  return result;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
quest.comment = function (q: any, n: any, s: any) {
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg(`${s}: {i:${q.name}}`);
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (n !== false) Quest.IO.metamsg(q.stages[n].text);
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'start' does not exist on type '{ INITIAL... Remove this comment to see the full error message
quest.start = function (name: any) {
  name;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const result = quest.getState(name, Quest.World.player);
  if (result.progress !== undefined) return false; // quest already started
  Quest.World.player[result.progressName] = quest.ACTIVE;
  Quest.World.player[result.stateName] = 0;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
  quest.comment(result.quest, 0, 'Quest started');
  return true;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'restart' does not exist on type '{ INITI... Remove this comment to see the full error message
quest.restart = function (name: any, n: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const data = quest.getState(name, Quest.World.player);
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress === quest.ACTIVE) return false; // quest already started
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  Quest.World.player[result.progressName] = quest.ACTIVE;
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  Quest.World.player[result.stateName] = n || 0;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
  quest.comment(result.quest, 0, 'Quest started');
  return true;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'next' does not exist on type '{ INITIAL:... Remove this comment to see the full error message
quest.next = function (name: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const data = quest.getState(name, Quest.World.player);
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress !== quest.ACTIVE) return false;
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  Quest.World.player[result.stateName]++;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'stages' does not exist on type '{ INITIA... Remove this comment to see the full error message
  if (quest.stages.length >= Quest.World.player[result.stateName])
    return quest.complete(data.quest);
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
  quest.comment(result.quest, result.stateName, 'Quest progress');
  return true;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'complete' does not exist on type '{ INIT... Remove this comment to see the full error message
quest.complete = function (name: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const data = quest.getState(name, Quest.World.player);
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress !== quest.ACTIVE) return false;
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  Quest.World.player[result.progressName] = quest.SUCCESS;
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  Quest.World.player[result.stateName] = false;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
  quest.comment(result.quest, false, 'Quest completed');
  return true;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'fail' does not exist on type '{ INITIAL:... Remove this comment to see the full error message
quest.fail = function (name: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const data = quest.getState(name, Quest.World.player);
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress !== quest.ACTIVE) return false;
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  Quest.World.player[result.progressName] = quest.FAILED;
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  Quest.World.player[result.stateName] = false;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
  quest.comment(result.quest, false, 'Quest failed');
  return true;
};

// ts-error-fixed ts-migrate(2551) FIXME: Property 'moot' does not exist on type '{ INITIAL:... Remove this comment to see the full error message
quest.moot = function (name: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const data = quest.getState(name, Quest.World.player);
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress !== quest.ACTIVE) return false;
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  Quest.World.player[result.progressName] = quest.MOOT;
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  Quest.World.player[result.stateName] = false;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
  quest.comment(result.quest, false, 'Quest moot');
  return true;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'set' does not exist on type '{ INITIAL: ... Remove this comment to see the full error message
quest.set = function (name: any, n: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const data = quest.getState(name, Quest.World.player);
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress !== quest.ACTIVE) return false;
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.state <= n) return false;
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  Quest.World.player[result.stateName] = n;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'comment' does not exist on type '{ INITI... Remove this comment to see the full error message
  quest.comment(result.quest, result.stateName, 'Quest progress');
  return true;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'progress' does not exist on type '{ INIT... Remove this comment to see the full error message
quest.progress = function (name: any, all: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
  const data = quest.getState(name, Quest.World.player);
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress === undefined) return false;
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress !== quest.ACTIVE && all) return false;
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg(`${data.name}, {i:${quest.progressNames[result.progress]}}`);
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'result'.
  if (result.progress === quest.ACTIVE)
    Quest.IO.metamsg(data.quest.stages[result.stateName].text);
  return true;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'list' does not exist on type '{ INITIAL:... Remove this comment to see the full error message
quest.list = function (all: any) {
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg(all ? 'Active Quests' : 'All Quests');
  let flag = false;
  for (const q of quest.data) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getStatus' does not exist on type '{ INI... Remove this comment to see the full error message
    flag = flag || quest.getStatus(q, all);
  }
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!flag) Quest.IO.metamsg('None');
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!all)
    Quest.IO.metamsg('[Do QUESTS ALL to include completed and failed quests]');
};

Quest.Commands.commands.unshift(
  new Cmd('MetaQuests', {
    objects: [],
    regex: /^(?:quest|quests|q)$/,
    rules: [cmdRules.isPresent],
    script(item: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'list' does not exist on type '{ INITIAL:... Remove this comment to see the full error message
      quest.list(false);
    },
  }),
);

Quest.Commands.commands.unshift(
  new Cmd('MetaQuestsAll', {
    objects: [],
    regex: /^(?:quest|quests|q) all$/,
    rules: [cmdRules.isPresent],
    script(item: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'list' does not exist on type '{ INITIAL:... Remove this comment to see the full error message
      quest.list(true);
    },
  }),
);
