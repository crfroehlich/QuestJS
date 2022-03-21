export interface ITextParams {
  already?: boolean;
  attacker?: IAttacker;
  char?: ICharacter;
  dir?: string;
  fromLoc?: string;
  item?: IItem;
  npc?: INpc;
  room?: IRoom;
  skill?: ISkill;
  target?: IAttacker;
  toLoc?: string;
  tpFirstTime?: boolean;
  tpOriginalString?: string;
}

export interface IAttacker {
  activeEffects?: IActiveEffects;
  afterCarryList?: any[];
  agenda?: any[];
  aggressive?: boolean;
  alias?: string;
  allegiance?: string;
  armour?: number;
  askOptions?: any[];
  asleep?: boolean;
  attackPattern?: string[];
  attack_count?: number;
  blinded?: boolean;
  cmdMatch?: string;
  consultable?: boolean;
  damage?: string;
  dead?: boolean;
  defensiveBonus?: number;
  delayAgendaAttack?: boolean;
  eventActive?: boolean;
  eventCountdown?: number;
  ex?: string;
  excludeFromAll?: boolean;
  followers?: any[];
  headingAlias?: string;
  health?: number;
  isFemale?: boolean;
  isLight?: boolean;
  key?: AttackerKey;
  listAlias?: string;
  loc?: string;
  maxHealth?: number;
  mentionedTopics?: any[];
  msgDeath?: string;
  name?: string;
  nameModifierFunctions?: null[];
  npc?: boolean;
  offensiveBonus?: number;
  parserItemName?: string;
  parserItemNameParts?: string[];
  parserOptionsSet?: boolean;
  petrified?: boolean;
  pluralAlias?: string;
  pronouns?: IActiveEffects;
  properNoun?: boolean;
  reactionFlags?: any[];
  reactions?: any[];
  receiveItems?: any[];
  saveLoadExcludedAtts?: IActiveEffects;
  sayBonus?: number;
  sayPriority?: number;
  sayQuestion?: boolean;
  sayQuestionCountdown?: null;
  sayState?: number;
  sayUsed?: string;
  scopeStatus?: IScopeStatus;
  signalGroups?: string[];
  signalResponses?: IActiveEffects;
  skillsLearnt?: IActiveEffects;
  spellCasting?: number;
  spellDefence?: number;
  stunned?: number;
  suspended?: boolean;
  target?: string;
  tellOptions?: any[];
  testTalkFlag?: boolean;
  verbFunctions?: null[];
}

export interface IActiveEffects {
  key?: string;
}

export type TAttackerKey = 'attacker' | 'target';

export interface IScopeStatus {
  canReach?: boolean;
  canSee?: boolean;
  doneReach?: boolean;
  doneSee?: boolean;
  roomReach?: boolean;
  roomSee?: boolean;
}

export interface ICharacter {
  activeEffects?: any[];
  afterCarryList?: any[];
  alias?: string;
  allegiance?: string;
  armour?: number;
  asleep?: boolean;
  blinded?: boolean;
  currentWeatherCount?: number;
  currentWeatherName?: string;
  currentWeatherTotal?: number;
  currentWeatherWetness?: number;
  dead?: boolean;
  defensiveBonus?: number;
  eventActive?: boolean;
  eventCountdown?: number;
  followers?: string[];
  headingAlias?: string;
  health?: number;
  hitpoints?: number;
  isLight?: boolean;
  key?: string;
  listAlias?: string;
  loc?: string;
  maxHealth?: number;
  maxPP?: number;
  mentionedTopics?: any[];
  name?: string;
  nameModifierFunctions?: any[];
  offensiveBonus?: number;
  parserItemName?: string;
  parserItemNameParts?: string[];
  parserOptionsSet?: boolean;
  petrified?: boolean;
  player?: boolean;
  pluralAlias?: string;
  pp?: number;
  previousLoc?: string;
  pronouns?: IPronouns;
  properNoun?: boolean;
  receiveItems?: Regex[];
  regex?: Regex;
  saveLoadExcludedAtts?: any[];
  scopeStatus?: IScopeStatus;
  signalResponses?: RegExp;
  skillsLearnt?: string[];
  spellCasting?: number;
  spellDefence?: number;
  status?: string;
  stunned?: number;
  suspended?: boolean;
  testTalkFlag?: boolean;
  verbFunctions?: null[];
}

export interface IPronouns {
  key?: string;
  objective?: string;
  poss_adj?: string;
  possessive?: string;
  reflexive?: string;
  subjective?: string;
}

type TVerbList = {
  action?: string;
  name?: string;
  style?: string;
}

export interface IItem {
  alias?: string;
  armour?: number;
  closed?: boolean;
  cmdMatch?: string;
  container?: boolean;
  drop_count?: number;
  eventActive?: boolean;
  eventCountdown?: number;
  getContents?: (...params: any[]) => IItem[];
  getListAlias?: (...params: any[]) => any;
  getVerbs?: (...params: any[]) => string[] | TVerbList[];
  headingAlias?: string;
  icon?: (...params: any[]) => string;
  key?: string;
  listAlias?: string;
  loc?: string;
  msgDrop?: string;
  msgDropIn?: string;
  msgRemove?: string;
  msgTake?: string;
  msgTakeOut?: string;
  msgWear?: string;
  name?: string;
  nameModifierFunctions?: null[];
  parserItemName?: string;
  parserItemNameParts?: string[];
  parserOptionsSet?: boolean;
  pluralAlias?: string;
  pronouns?: IPronouns;
  properNoun?: boolean;
  saveLoadExcludedAtts?: IActiveEffects;
  scopeStatus?: IScopeStatus;
  slots?: string[];
  take_count?: number;
  takeable?: boolean;
  verbFunctions?: null[];
  wear_layer?: number;
  wearable?: boolean;
  worn?: boolean;
}

export interface INpc {
  activeEffects?: IActiveEffects;
  afterCarryList?: any[];
  agenda?: any[];
  alias?: string;
  allegiance?: string;
  armour?: number;
  askOptions?: any[];
  asleep?: boolean;
  attackPattern?: string[];
  beast?: boolean;
  blinded?: boolean;
  consultable?: boolean;
  damage?: string;
  dead?: boolean;
  defensiveBonus?: number;
  delayAgendaAttack?: boolean;
  eventActive?: boolean;
  eventCountdown?: number;
  ex?: string;
  excludeFromAll?: boolean;
  followers?: any[];
  headingAlias?: string;
  health?: number;
  isFemale?: boolean;
  isLight?: boolean;
  key?: string;
  leaderName?: string;
  listAlias?: string;
  loc?: string;
  maxHealth?: number;
  mentionedTopics?: any[];
  msgDeath?: string;
  name?: string;
  nameModifierFunctions?: null[];
  npc?: boolean;
  offensiveBonus?: number;
  parserItemName?: string;
  parserItemNameParts?: string[];
  parserOptionsSet?: boolean;
  petrified?: boolean;
  pluralAlias?: string;
  previousLoc?: string;
  pronouns?: IPronouns;
  properNoun?: boolean;
  reactionFlags?: any[];
  reactions?: any[];
  receiveItems?: any[];
  saveLoadExcludedAtts?: IActiveEffects;
  sayBonus?: number;
  sayPriority?: number;
  sayQuestion?: boolean;
  sayQuestionCountdown?: null;
  sayState?: number;
  sayUsed?: string;
  scopeStatus?: IScopeStatus;
  signalResponses?: IActiveEffects;
  skillsLearnt?: any[];
  spellCasting?: number;
  spellDefence?: number;
  stunned?: number;
  suspended?: boolean;
  tellOptions?: any[];
  testTalkFlag?: boolean;
  verbFunctions?: null[];
}

export interface IRoom {
  afterEnterIf?: IActiveEffects;
  afterEnterIfFlags?: string;
  alias?: string;
  desc?: string;
  east?: IDirection;
  eventActive?: boolean;
  eventCountdown?: number;
  exit_locked_south?: boolean;
  headingAlias?: string;
  listAlias?: string;
  name?: string;
  nameModifierFunctions?: any[];
  parserOptionsSet?: boolean;
  pluralAlias?: string;
  pronouns?: IPronouns;
  properNoun?: boolean;
  room?: boolean;
  rpgFog?: number;
  saveLoadExcludedAtts?: IActiveEffects;
  scopeStatus?: IScopeStatus;
  south?: IDirection;
  verbFunctions?: null[];
  visited?: number;
  west?: IDirection;
}

export interface IDirection {
  dir?: string;
  door?: string;
  doorName?: string;
  guardedBy?: any[];
  lockedmsg?: string;
  name?: string;
  origin?: IActiveEffects;
}

export interface ISkill {
  alias?: string;
  key?: TSkillKey;
  name?: string;
  offensiveBonus?: number;
  primaryFailure?: string;
  primarySuccess?: string;
  reportText?: string;
}

export type TSkillKey = 'skill';

export type TItemState = 'itemsHeld' | 'itemsHere' | 'itemsWorn';
