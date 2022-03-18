export interface IQuest {
  Command?: ICommand;
  Commands?: ICommands;
  Defaults?: IDefaults;
  FileSaver?: IFileSaver;
  IO?: IIo;
  NPC?: INpc;
  Parser?: IParser;
  SaveLoad?: ISaveLoad;
  Settings?: ISettings;
  Templates?: ITemplates;
  Text?: IText;
  Utilities?: IUtilities;
  World?: IWorld;
  lang?: ILang;
}

interface IBase {
  [key: string]: any;
}

export interface ICommand extends IBase {
  cmdRules?: IFileSaver;
}

export interface IFileSaver {
  [key: string]: any;
}

export interface ICommands extends IBase {
  commands?: ICommandElement[];
}

export interface ICommandElement {
  all?: boolean;
  antiRegexes?: null[];
  attName?: string;
  cmdCategory?: string;
  defmsg?: string;
  dir?: string;
  dirType?: string;
  exitCmd?: boolean;
  forNpc?: boolean;
  name?: string;
  npcCmd?: boolean;
  objects?: Array<IObject | null>;
  regex?: IFileSaver;
  regexes?: Array<IFileSaver | null>;
  rules?: null[];
  scope?: null[];
  score?: number;
}

export interface IObject {
  attName?: string;
  extendedScope?: boolean;
  multiple?: boolean;
  special?: ISpecial;
}

export enum ISpecial {
  Fluid = 'fluid',
  Ignore = 'ignore',
  Text = 'text',
}

export interface IDefaults extends IBase {
  DEFAULT_ITEM?: IFileSaver;
  DEFAULT_OBJECT?: IDefaultObject;
  DEFAULT_ROOM?: IDefaultRoom;
}

export interface IDefaultObject {
  eventActive?: boolean;
  eventCountdown?: number;
  saveLoadExcludedAtts?: any[];
}

export interface IDefaultRoom {
  afterEnterIf?: IFileSaver;
  afterEnterIfFlags?: string;
  room?: boolean;
  visited?: number;
}

export interface IIo extends IBase {
  io?: IIoClass;
}

export interface IIoClass extends IBase {
  allowedHtmlAttrs?: string[];
  currentItemList?: any[];
  dialogShowing?: boolean;
  disableLevel?: number;
  doNotSaveInput?: boolean;
  escapeCodes?: IEscapeCodes;
  mainGutter?: number;
  menuFunctions?: IFileSaver;
  modulesToInit?: any[];
  modulesToUpdate?: any[];
  nextid?: number;
  otnb?: boolean;
  outputQueue?: any[];
  outputSuspended?: boolean;
  panesWidth?: number;
  resizeMapImageListener?: IFileSaver;
  resizePanesListener?: IFileSaver;
  sameLine?: boolean;
  savedCommands?: string[];
  savedCommandsPos?: number;
  slID?: string;
  spoken?: boolean;
  synth?: IFileSaver;
  voice?: null;
  voice2?: null;
}

export interface IEscapeCodes {
  colon?: string;
  hash?: string;
  lcurly?: string;
  lsquare?: string;
  rcurly?: string;
  rsquare?: string;
  vert?: string;
}

export interface INpc extends IBase {
  agenda?: IFileSaver;
}

export interface IParser extends IBase {
  parser?: IParserClass;
}

export interface IParserClass extends IBase {
  BAD_SPECIAL?: number;
  DISALLOWED_MULTIPLE?: number;
  NONE_FOR_ALL?: number;
  NO_MATCH?: number;
  NO_OBJECT?: number;
  currentCommand?: string;
  debug?: boolean;
  inputTexts?: any[];
  pronouns?: IFileSaver;
  specialText?: ISpecialText;
}

export interface ISpecialText {
  fluid?: IFileSaver;
  ignore?: IFileSaver;
  number?: IFileSaver;
  text?: IFileSaver;
}

export interface ISaveLoad extends IBase {
  saveLoad?: ISaveLoadClass;
}

export interface ISaveLoadClass extends IBase {
  replacements?: IReplacement[];
  transcript?: boolean;
  transcriptName?: string;
}

export interface IReplacement {
  escaped?: string;
  unescaped?: string;
}

export interface ISettings extends IBase {
  settings?: ISettingsClass;
}

export interface ISettingsClass extends IBase {
  afterFinish?: any[];
  afterTurn?: any[];
  author?: string;
  autoscroll?: boolean;
  closeQuotation?: string;
  cmdEcho?: boolean;
  compassPane?: boolean;
  convertNumbersInParser?: boolean;
  cssFolder?: string;
  cursor?: string;
  customExits?: boolean;
  customLibraries?: any[];
  customPaneFunctions?: IFileSaver;
  darkModeActive?: boolean;
  dateTime?: IDateTime;
  delayStart?: boolean;
  eventFunctions?: IFileSaver;
  failCountsAsTurn?: boolean;
  favicon?: string;
  files?: string[];
  fluids?: any[];
  folder?: string;
  funcForDisambigMenu?: string;
  funcForDynamicConv?: string;
  givePlayerAskTellMsg?: boolean;
  givePlayerSayMsg?: boolean;
  iconsFolder?: string;
  ifid?: string;
  imagesFolder?: string;
  inventoryPane?: IInventoryPane[];
  lang?: string;
  libraries?: string[];
  lookCountsAsTurn?: boolean;
  mapAndImageCollapseAt?: number;
  mapStyle?: IMapStyle;
  maxUndo?: number;
  mediaQuery?: IFileSaver;
  moneyFormat?: string;
  narrowMode?: number;
  noAskTell?: string;
  noTalkTo?: string;
  npcReactionsAlways?: boolean;
  openQuotation?: string;
  panes?: string;
  panesCollapseAt?: number;
  performanceLogStartTime?: number;
  plainFontModeActive?: boolean;
  playMode?: string;
  questVersion?: string;
  roomSetList?: IFileSaver;
  roomTemplate?: string[];
  saveDisabled?: boolean;
  saveLoadExcludedAtts?: string[];
  scriptDoc?: IScriptDoc;
  scriptLoadLogging?: boolean;
  scriptLoading?: string;
  scriptToLoad?: any[];
  silent?: boolean;
  soundsFileExt?: string;
  soundsFolder?: string;
  startingDialogEnabled?: boolean;
  statsData?: IStatsDatum[];
  status?: null[];
  statusPane?: string;
  statusWidthLeft?: number;
  statusWidthRight?: number;
  styleFile?: string;
  symbolsForCompass?: boolean;
  tests?: boolean;
  textEffectDelay?: number;
  textInput?: boolean;
  thanks?: any[];
  themes?: string[];
  timerInterval?: number;
  title?: string;
  turnsQuestionsLast?: number;
  verbosity?: number;
  version?: string;
  videosFolder?: string;
  walkthroughMenuResponses?: any[];
  warnings?: string;
}

export interface IDateTime extends IBase {
  day?: string;
  formats?: any;
  functions?: any;
  hour?: string;
  locale?: string;
  minute?: string;
  month?: string;
  secondsPerTurn?: number;
  start?: Date;
  year?: string;
}

export interface IInventoryPane {
  alt?: string;
  getLoc?: (...params: any[]) => any;
  name?: string;
  test?: (...params: any[]) => any;
}

export interface IMapStyle {
  'background-color'?: string;
  height?: string;
  right?: string;
  top?: string;
  width?: string;
}

export interface IScriptDoc {
  location?: ILocation;
}

export interface ILocation {
  ancestorOrigins?: IFileSaver;
  hash?: string;
  host?: string;
  hostname?: string;
  href?: string;
  origin?: string;
  pathname?: string;
  port?: string;
  protocol?: string;
  search?: string;
}

export interface IStatsDatum {
  name?: string;
  test: (...params: any[]) => any;
}

export interface ITemplates {
  TAKEABLE_DICTIONARY?: ITakeableDictionary;
}

export interface ITakeableDictionary {
  msgDrop?: string;
  msgDropIn?: string;
  msgTake?: string;
  msgTakeOut?: string;
  takeable?: boolean;
}

export interface IText extends IBase {
  colours?: string[];
  text_processors?: IFileSaver;
  usedStrings?: string[];
}

export interface IUtilities extends IBase {
  COUNT?: number;
  DEFINITE?: number;
  INDEFINITE?: number;
  array?: IFileSaver;
  test?: ITest;
  util?: IUtil;
}

export interface ITest {
  testing?: boolean;
}

export interface IUtil extends IBase {
  changeListeners?: any[];
}

export interface IWorld extends IBase {
  game?: IGame;
  player?: IPlayer;
  w?: IW;
  world?: IWorldClass;
}

export interface IGame extends IBase {
  dark?: boolean;
  elapsedRealTime?: number;
  elapsedTime?: number;
  name?: string;
  startTime?: Date;
  ticker?: number;
  timerEventIntervals?: any[];
  timerEventNames?: any[];
  timerEventTriggerTimes?: any[];
  turnCount?: number;
}

export interface IPlayer extends IBase {
  alias?: string;
  eventActive?: boolean;
  eventCountdown?: number;
  examine?: string;
  headingAlias?: string;
  listAlias?: string;
  loc?: string;
  name?: string;
  parserOptionsSet?: boolean;
  player?: boolean;
  pluralAlias?: string;
  properNoun?: boolean;
  ready?: boolean;
  testTalkFlag?: boolean;
}

export interface IW extends IBase {
  bar?: IBar;
  ceiling?: ICeiling;
  cloak?: ICloak;
  cloakroom?: IBar;
  doors?: ICeiling;
  floor?: ICeiling;
  hook?: IHook;
  lobby?: ILobby;
  me?: IMe;
  message?: IHook;
  posters?: ICeiling;
  walls?: ICeiling;
}

export interface IBar extends IBase {
  afterEnterIfFlags?: string;
  alias?: string;
  east?: IEast;
  eventActive?: boolean;
  eventCountdown?: number;
  headingAlias?: string;
  listAlias?: string;
  listen?: string;
  name?: string;
  nameModifierFunctions?: any[];
  north?: IEast;
  parserOptionsSet?: boolean;
  pluralAlias?: string;
  properNoun?: boolean;
  room?: boolean;
  scopeStatus?: IFileSaver;
  smell?: string;
  verbFunctions?: null[];
  visited?: number;
}

export interface IEast {
  dir?: string;
  guardedBy?: any[];
  name?: string;
}

export interface ICeiling {
  alias?: string;
  eventActive?: boolean;
  eventCountdown?: number;
  examine?: string;
  headingAlias?: string;
  listAlias?: string;
  loc?: string;
  name?: string;
  nameModifierFunctions?: any[];
  parserOptionsSet?: boolean;
  plural?: boolean;
  pluralAlias?: string;
  properNoun?: boolean;
  read?: string;
  scenery?: boolean;
  scopeStatus?: ICeilingScopeStatus;
  synonyms?: string[];
  verbFunctions?: null[];
}

export interface ICeilingScopeStatus {
  canReach?: boolean;
  canSee?: boolean;
  doneReach?: boolean;
  doneSee?: boolean;
}

export interface ICloak {
  alias?: string;
  armour?: number;
  eventActive?: boolean;
  eventCountdown?: number;
  examine?: string;
  headingAlias?: string;
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
  parserOptionsSet?: boolean;
  pluralAlias?: string;
  properNoun?: boolean;
  scopeStatus?: ICeilingScopeStatus;
  slots?: any[];
  takeable?: boolean;
  verbFunctions?: null[];
  wear_layer?: boolean;
  wearable?: boolean;
  worn?: boolean;
}

export interface IHook {
  alias?: string;
  closed?: boolean;
  container?: boolean;
  contentsType?: string;
  count?: number;
  disturbed?: number;
  eventActive?: boolean;
  eventCountdown?: number;
  eventPeriod?: number;
  headingAlias?: string;
  hookable?: boolean;
  listAlias?: string;
  loc?: string;
  name?: string;
  nameModifierFunctions?: null[];
  openable?: boolean;
  parserOptionsSet?: boolean;
  pluralAlias?: string;
  properNoun?: boolean;
  scenery?: boolean;
  scopeStatus?: IFileSaver;
  synonyms?: string[];
  verbFunctions?: null[];
}

export interface ILobby {
  afterEnterIfFlags?: string;
  alias?: string;
  desc?: string;
  eventActive?: boolean;
  eventCountdown?: number;
  headingAlias?: string;
  listAlias?: string;
  name?: string;
  nameModifierFunctions?: any[];
  north?: IEast;
  parserOptionsSet?: boolean;
  pluralAlias?: string;
  properNoun?: boolean;
  room?: boolean;
  scopeStatus?: ILobbyScopeStatus;
  smell?: string;
  south?: IEast;
  verbFunctions?: null[];
  visited?: number;
  west?: IEast;
}

export interface ILobbyScopeStatus {
  canReach?: boolean;
  canSee?: boolean;
  doneReach?: boolean;
  doneSee?: boolean;
  roomReach?: boolean;
  roomSee?: boolean;
}

export interface IMe {
  afterCarryList?: any[];
  alias?: string;
  eventActive?: boolean;
  eventCountdown?: number;
  examine?: string;
  followers?: any[];
  headingAlias?: string;
  listAlias?: string;
  loc?: string;
  mentionedTopics?: any[];
  name?: string;
  nameModifierFunctions?: null[];
  parserOptionsSet?: boolean;
  player?: boolean;
  pluralAlias?: string;
  properNoun?: boolean;
  receiveItems?: IFileSaver[];
  scopeStatus?: ICeilingScopeStatus;
  synonyms?: string[];
  testTalkFlag?: boolean;
  verbFunctions?: null[];
}

export interface IWorldClass extends IBase {
  ALL?: number;
  BRIEF?: number;
  FAILED?: number;
  INVENTORY?: number;
  LIGHT_EXTREME?: number;
  LIGHT_FULL?: number;
  LIGHT_MEAGRE?: number;
  LIGHT_NONE?: number;
  LIGHT_SELF?: number;
  LOOK?: number;
  PARSER?: number;
  PARSER_FAILURE?: number;
  PURCHASE?: number;
  SIDE_PANE?: number;
  SUCCESS?: number;
  SUCCESS_NO_TURNSCRIPTS?: number;
  TERSE?: number;
  VERBOSE?: number;
  gameState?: string[];
  isCreated?: boolean;
  scope?: null[];
}

export interface ILang extends IBase {
  again_not_available?: string;
  all_exclude_regex?: IFileSaver;
  all_regex?: IFileSaver;
  already?: string;
  already_empty?: string;
  already_following?: string;
  already_full?: string;
  already_have?: string;
  already_waiting?: string;
  already_wearing?: string;
  article_filter_regex?: IFileSaver;
  buy?: string;
  buy_headings?: string[];
  can_go?: string;
  cannot_afford?: string;
  cannot_ask_about?: string;
  cannot_close?: string;
  cannot_drink?: string;
  cannot_drop?: string;
  cannot_eat?: string;
  cannot_empty?: string;
  cannot_fill?: string;
  cannot_follow?: string;
  cannot_get_fluid?: string;
  cannot_go_down?: string;
  cannot_go_in?: string;
  cannot_go_out?: string;
  cannot_go_through?: string;
  cannot_go_up?: string;
  cannot_ingest?: string;
  cannot_listen?: string;
  cannot_lock?: string;
  cannot_lock_with?: string;
  cannot_look_out?: string;
  cannot_mix?: string;
  cannot_open?: string;
  cannot_open_with?: string;
  cannot_purchase_again?: string;
  cannot_purchase_here?: string;
  cannot_push?: string;
  cannot_push_up?: string;
  cannot_read?: string;
  cannot_recline_on?: string;
  cannot_remove_under?: string;
  cannot_sell_here?: string;
  cannot_sit_on?: string;
  cannot_smash?: string;
  cannot_smell?: string;
  cannot_stand_on?: string;
  cannot_switch_off?: string;
  cannot_switch_on?: string;
  cannot_take?: string;
  cannot_take_component?: string;
  cannot_talk_about?: string;
  cannot_talk_to?: string;
  cannot_tell_about?: string;
  cannot_turn?: string;
  cannot_unlock?: string;
  cannot_unlock_with?: string;
  cannot_use?: string;
  cannot_wait?: string;
  cannot_wear?: string;
  cannot_wear_ensemble?: string;
  cannot_wear_over?: string;
  carrying?: string;
  char_has_it?: string;
  click_to_continue?: string;
  close_and_lock_successful?: string;
  close_successful?: string;
  command_split_regex?: IFileSaver;
  component_missing?: string;
  component_wrong?: string;
  conjugations?: IConjugations;
  construction_already?: string;
  construction_done?: string;
  container_closed?: string;
  container_recursion?: string;
  contentsForData?: IContentsForData;
  current_money?: string;
  default_description?: string;
  default_examine?: string;
  disambig_msg?: string;
  done_msg?: string;
  drink_successful?: string;
  drop_successful?: string;
  drop_successful_counted?: string;
  eat_successful?: string;
  empty_into_successful?: string;
  empty_onto_successful?: string;
  empty_successful?: string;
  error?: string;
  exit_list?: IExitList[];
  fill_successful?: string;
  game_over_html?: string;
  general_obj_error?: string;
  go_pre_regex?: string;
  go_successful?: string;
  inside?: string;
  inside_container?: string;
  invHoldingPrefix?: string;
  invModifiers?: IInvModifiers;
  invWearingPrefix?: string;
  inventory_prefix?: string;
  it_is_empty?: string;
  joiner_regex?: IFileSaver;
  list_and?: string;
  list_nothing?: string;
  list_nowhere?: string;
  list_or?: string;
  lock_successful?: string;
  locked?: string;
  locked_exit?: string;
  look_inside?: string;
  look_inside_it?: string;
  mode_brief?: string;
  mode_silent_off?: string;
  mode_silent_on?: string;
  mode_terse?: string;
  mode_verbose?: string;
  never_mind?: string;
  new_tab_failed?: string;
  no_fluid_here?: string;
  no_fluid_here_at_all?: string;
  no_generic_fluid_here?: string;
  no_key?: string;
  no_listen?: string;
  no_map?: string;
  no_multiples_msg?: string;
  no_receiver?: string;
  no_recline_object?: string;
  no_sit_object?: string;
  no_smell?: string;
  no_topics?: string;
  none_held?: string;
  none_here?: string;
  not_a_fluid_here?: string;
  not_able_to_hear?: string;
  not_carrying?: string;
  not_carrying_fluid?: string;
  not_container?: string;
  not_container_not_vessel?: string;
  not_enough?: string;
  not_here?: string;
  not_inside?: string;
  not_interested_for_give?: string;
  not_known_msg?: string;
  not_npc?: string;
  not_npc_for_give?: string;
  not_sink?: string;
  not_source?: string;
  not_that_way?: string;
  not_vessel?: string;
  not_wearing?: string;
  nothing_for_sale?: string;
  nothing_inside?: string;
  nothing_msg?: string;
  nothing_there?: string;
  nothing_useful?: string;
  npc_dead?: string;
  npc_no_interest_in?: string;
  numberTens?: string[];
  numberUnits?: string[];
  on_top?: string;
  open_and_enter?: string;
  open_successful?: string;
  ordinalReplacements?: IOrdinalReplacement[];
  pour_into_self?: string;
  press_button_successful?: string;
  pronouns?: IPronouns;
  purchase_successful?: string;
  push_exit_successful?: string;
  recline_on_successful?: string;
  regex?: IRegex;
  remove_successful?: string;
  restart_are_you_sure?: string;
  restart_no?: string;
  rope_attach_success?: string;
  rope_attach_verb?: string;
  rope_attached_verb?: string;
  rope_cannot_move?: string;
  rope_detach_end_ambig?: string;
  rope_detach_success?: string;
  rope_detach_verb?: string;
  rope_examine_attached_both_ends?: string;
  rope_examine_attached_one_end?: string;
  rope_examine_end_attached?: string;
  rope_examine_end_headed?: string;
  rope_examine_end_held?: string;
  rope_no_attachable_here?: string;
  rope_no_end?: string;
  rope_not_attachable?: string;
  rope_not_attachable_to?: string;
  rope_not_attached?: string;
  rope_not_attached_to?: string;
  rope_not_detachable?: string;
  rope_one_end?: string;
  rope_other_end?: string;
  rope_tethered?: string;
  rope_tied_both_end?: string;
  rope_tied_both_ends_already?: string;
  rope_tied_one_end?: string;
  rope_unwind?: string;
  rope_wind?: string;
  say_no_one_here?: string;
  say_no_response?: string;
  say_no_response_full?: string;
  say_something?: string;
  scores_not_implemented?: string;
  sell_successful?: string;
  sit_on_successful?: string;
  sl_already_exists?: string;
  sl_deleted?: string;
  sl_dir_headings?: string[];
  sl_dir_msg?: string;
  sl_file_loaded?: string;
  sl_file_not_found?: string;
  sl_no_filename?: string;
  sl_saved?: string;
  spoken_off?: string;
  spoken_on?: string;
  stand_on_successful?: string;
  switch_off_successful?: string;
  switch_on_successful?: string;
  take_not_push?: string;
  take_successful?: string;
  take_successful_counted?: string;
  tell_to_prefixes?: { [key: string]: string };
  topics_ask_list?: string;
  topics_no_ask_tell?: string;
  topics_none_found?: string;
  topics_tell_list?: string;
  tp_false?: string;
  tp_true?: string;
  transcript_already_off?: string;
  transcript_already_on?: string;
  transcript_cleared?: string;
  transcript_finish?: string;
  transcript_none?: string;
  transcript_off?: string;
  transcript_on?: string;
  transit_already_here?: string;
  transit_go_to_dest?: string;
  try_but_locked?: string;
  undo_disabled?: string;
  undo_done?: string;
  undo_not_available?: string;
  unlock_and_enter?: string;
  unlock_successful?: string;
  verbs?: IVerbs;
  wait_msg?: string;
  wear_successful?: string;
  yesNo?: string[];
  yes_regex?: IFileSaver;
}

export interface IConjugations {
  i?: II[];
  it?: II[];
  they?: II[];
  we?: II[];
  you?: II[];
}

export interface II {
  name?: string;
  value?: string;
}

export interface IContentsForData {
  container?: IContainer;
  surface?: IContainer;
}

export interface IContainer {
  prefix?: string;
  suffix?: string;
}

export interface IExitList {
  abbrev?: string;
  alt?: string;
  key?: number;
  name?: string;
  niceDir?: string;
  opp?: string;
  rotate?: number;
  symbol?: string;
  type?: string;
  x?: number;
  y?: number;
  z?: number;
}

export interface IInvModifiers {
  dead?: string;
  equipped?: string;
  open?: string;
  worn?: string;
}

export interface IOrdinalReplacement {
  regex?: IFileSaver;
  replace?: string;
}

export interface IPronouns {
  female?: IFemale;
  firstperson?: IFemale;
  male?: IFemale;
  massnoun?: IFemale;
  plural?: IFemale;
  secondperson?: IFemale;
  thirdperson?: IFemale;
}

export interface IFemale {
  objective?: string;
  poss_adj?: string;
  possessive?: string;
  reflexive?: string;
  subjective?: string;
}

export interface IRegex {
  AskAbout?: IFileSaver;
  Close?: IFileSaver;
  DebugHighlight?: IFileSaver;
  DebugInspect?: IFileSaver;
  DebugInspectByName?: IFileSaver;
  DebugInspectCommand?: IFileSaver;
  DebugListCommands?: IFileSaver;
  DebugListCommands2?: IFileSaver;
  DebugParserToggle?: IFileSaver;
  DebugStats?: IFileSaver;
  DebugTest?: IFileSaver;
  DebugWalkThrough?: IFileSaver;
  Drink?: IFileSaver;
  Drop?: IFileSaver;
  Eat?: IFileSaver;
  Empty?: IFileSaver;
  EmptyFluidInto?: IFileSaver;
  EmptyInto?: IFileSaver;
  Examine?: IFileSaver;
  Exits?: IFileSaver;
  Fill?: IFileSaver;
  FillWith?: IFileSaver;
  FollowMe?: IFileSaver[];
  GetFluid?: IFileSaver;
  GetOff?: IFileSaver;
  Give?: IFileSaver;
  GiveTo?: IFileSaver;
  GoDownItem?: IFileSaver;
  GoInItem?: IFileSaver;
  GoOutItem?: IFileSaver;
  GoThroughItem?: IFileSaver;
  GoUpItem?: IFileSaver;
  Ingest?: IFileSaver;
  Inv?: IFileSaver;
  Listen?: IFileSaver;
  ListenToItem?: IFileSaver;
  Lock?: IFileSaver;
  LockWith?: IWith[];
  Look?: IFileSaver;
  LookAt?: IFileSaver;
  LookBehind?: IFileSaver;
  LookInside?: IFileSaver;
  LookOut?: IFileSaver;
  LookThrough?: IFileSaver;
  LookUnder?: IFileSaver;
  Make?: IFileSaver;
  MakeWith?: IWith[];
  Map?: IFileSaver;
  MetaAgain?: IFileSaver;
  MetaAutoScrollMode?: IFileSaver;
  MetaBrief?: IFileSaver;
  MetaCredits?: IFileSaver;
  MetaDarkMode?: IFileSaver;
  MetaDeleteGame?: IFileSaver;
  MetaDir?: IFileSaver;
  MetaFileLoadGame?: IFileSaver;
  MetaFileSaveGame?: IFileSaver;
  MetaHelp?: IFileSaver;
  MetaHint?: IFileSaver;
  MetaImages?: IFileSaver;
  MetaIntro?: IFileSaver;
  MetaLoad?: IFileSaver;
  MetaLoadGame?: IFileSaver;
  MetaNarrowMode?: IFileSaver;
  MetaOops?: IFileSaver;
  MetaPlainFontMode?: IFileSaver;
  MetaPronouns?: IFileSaver;
  MetaRestart?: IFileSaver;
  MetaSave?: IFileSaver;
  MetaSaveGame?: IFileSaver;
  MetaSaveOverwriteGame?: IFileSaver;
  MetaScore?: IFileSaver;
  MetaSilent?: IFileSaver;
  MetaSpoken?: IFileSaver;
  MetaTerse?: IFileSaver;
  MetaTopicsNote?: IFileSaver;
  MetaTranscript?: IFileSaver;
  MetaTranscriptClear?: IFileSaver;
  MetaTranscriptOff?: IFileSaver;
  MetaTranscriptOn?: IFileSaver;
  MetaTranscriptShow?: IFileSaver;
  MetaTranscriptStart?: IFileSaver;
  MetaTranscriptWalkthrough?: IFileSaver;
  MetaUndo?: IFileSaver;
  MetaUserComment?: IFileSaver;
  MetaVerbose?: IFileSaver;
  MetaWarnings?: IFileSaver;
  NpcEmptyFluidInto?: IFileSaver[];
  NpcEmptyInto?: IFileSaver[];
  NpcFillWith?: IFileSaver[];
  NpcGive?: IFileSaver[];
  NpcGiveTo?: IFileSaver[];
  NpcGoDownItem?: IFileSaver[];
  NpcGoInItem?: IFileSaver[];
  NpcGoOutItem?: IFileSaver[];
  NpcGoThroughItem?: IFileSaver[];
  NpcGoUpItem?: IFileSaver[];
  NpcMake?: IFileSaver[];
  NpcMakeWith?: IWith[];
  NpcPushExit?: IFileSaver[];
  NpcPutIn?: IFileSaver[];
  NpcStand?: IFileSaver[];
  NpcTakeOut?: IFileSaver[];
  NpcTieTo?: IFileSaver[];
  NpcTieUp?: IFileSaver[];
  NpcUntie?: IFileSaver[];
  NpcUntieFrom?: IFileSaver[];
  Open?: IFileSaver;
  OpenWith?: IWith[];
  Pull?: IFileSaver;
  Purchase?: IFileSaver;
  PurchaseFromList?: IFileSaver;
  Push?: IFileSaver;
  PushExit?: IFileSaver;
  PutFluidIn?: IFileSaver;
  PutIn?: IFileSaver;
  Read?: IFileSaver;
  Recline?: IFileSaver;
  ReclineOn?: IFileSaver;
  Remove?: IFileSaver;
  Remove2?: IFileSaver;
  Say?: IFileSaver;
  Search?: IFileSaver;
  Sell?: IFileSaver;
  Sit?: IFileSaver;
  SitOn?: IFileSaver;
  Smash?: IFileSaver;
  Smell?: IFileSaver;
  SmellItem?: IFileSaver;
  Stand?: IFileSaver;
  StandOn?: IFileSaver;
  SwitchOff?: IFileSaver;
  SwitchOff2?: IFileSaver;
  SwitchOn?: IFileSaver;
  SwitchOn2?: IFileSaver;
  Take?: IFileSaver;
  TakeOut?: IFileSaver;
  TalkAbout?: IFileSaver[];
  TalkTo?: IFileSaver;
  TellAbout?: IFileSaver;
  TieTo?: IFileSaver;
  TieUp?: IFileSaver;
  Topics?: IFileSaver;
  Turn?: IFileSaver;
  TurnLeft?: IFileSaver;
  TurnRight?: IFileSaver;
  Unlock?: IFileSaver;
  UnlockWith?: IWith[];
  Untie?: IFileSaver;
  UntieFrom?: IFileSaver;
  Use?: IFileSaver;
  UseWith?: IFileSaver;
  Wait?: IFileSaver;
  WaitHere?: IFileSaver[];
  Wear?: IFileSaver;
  Wear2?: IFileSaver;
}

export interface IWith {
  mod?: IMod;
  regex?: IFileSaver;
}

export interface IMod {
  reverse?: boolean;
}

export interface IVerbs {
  attack?: string;
  close?: string;
  drink?: string;
  drop?: string;
  eat?: string;
  empty?: string;
  equip?: string;
  examine?: string;
  fill?: string;
  getOff?: string;
  lookat?: string;
  open?: string;
  push?: string;
  read?: string;
  reclineOn?: string;
  remove?: string;
  sitOn?: string;
  standOn?: string;
  switchoff?: string;
  switchon?: string;
  take?: string;
  talkto?: string;
  turn?: string;
  unequip?: string;
  use?: string;
  wear?: string;
}
