export type TGetVoid = (...params: any) => void;
export type TGetString = (...params: any[]) => string;
export type TGetBool = (...params: any[]) => boolean;
export const noop: TGetVoid = () => { };

export interface ICustomPaneFunctions {
  matches: any;
}

export interface IDateTime {
  day?: string;
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
  getLoc: TGetString;
  hasContent?: boolean;
  name?: string;
  noContent?: any;
  test: TGetBool;
}

interface IMapStyle {
  'background-color'?: string;
  height?: string;
  right?: string;
  top?: string;
  width?: string;
}

export interface IScriptDoc {
  location?: Location;
}

export interface IStatsDatum {
  name?: string;
  test: TGetBool;
}

export interface ISettings {
  afterEnter?: TGetVoid;
  afterFinish?: any[];
  afterTurn?: any[];
  author?: string;
  autoscroll?: boolean;
  beforeEnter?: TGetVoid;
  closeQuotation?: string;
  cmdEcho?: boolean;
  compassPane?: boolean;
  convertNumbersInParser?: boolean;
  cssFolder?: string;
  cursor?: string;
  customExits?: boolean;
  customLibraries?: any[];
  customPaneFunctions?: ICustomPaneFunctions;
  darkModeActive?: boolean;
  dateTime?: IDateTime;
  delayStart?: boolean;
  eventFunctions?: ICustomPaneFunctions;
  failCountsAsTurn?: boolean;
  favicon?: string;
  files?: string[];
  fluids?: any[];
  folder?: string;
  funcForDisambigMenu?: string;
  funcForDynamicConv?: string;
  getDefaultRoomHeading: TGetString;
  givePlayerAskTellMsg?: boolean;
  givePlayerSayMsg?: boolean;
  iconsFolder?: string;
  ifid?: string;
  imagesFolder?: string;
  inventoryPane?: IInventoryPane[];
  isHeldNotWorn?: TGetBool;
  isHere?: TGetBool;
  isWorn?: TGetBool;
  lang?: string;
  libraries?: string[];
  lookCountsAsTurn?: boolean;
  mapAndImageCollapseAt?: number;
  mapStyle?: IMapStyle;
  maxUndo?: number;
  mediaQuery?: ICustomPaneFunctions;
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
  questVersion?: string;
  roomSetList?: ICustomPaneFunctions;
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
  status?: TGetString[];
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
  warnings: string;
}

