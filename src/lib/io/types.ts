export type TParam = {
  tpFirstTime?: boolean;
  tpOriginalString?: string;
};

export type TDiagText = {
  height: number,
  text: string,
  title: string,
  width: number,
};

export const escapeCodes = {
  colon:   ':',
  hash:    '#',
  lcurly:  '{',
  lsquare: '[',
  rcurly:  '}',
  rsquare: ']',
  vert:    '|',
};

export const allowedHtmlAttrs = [
  'width',
  'height',
  'onclick',
  'src',
  'autoplay',
];
type TFunc = (...params: unknown[]) => unknown;
export type TPrintData = {
  action?: TAction;
  autoplay?: boolean;
  cssClass?: string;
  delay?: number;
  destination?: string;
  effect?: TFunc,
  func?: TFunc,
  height?: number,
  html?: string;
  id?: number;
  name?: string;
  onclick?: string;
  printBlank?: boolean;
  src?: string;
  tag?: TTag;
  text?: string;
  volume?: number;
  width?: number;
}

export type TAction = 'output' | 'wait' | 'delay' | 'func' | 'effect' | 'clear' | 'sound' | 'ambient';

export enum CssClass {
  DefaultHDefaultH2 = 'default-h default-h2',
  DefaultHDefaultH4 = 'default-h default-h4',
  DefaultP = 'default-p',
  DefaultPFailed = 'default-p failed',
  DefaultPre = 'default-pre',
  Error = 'error',
  Parser = 'parser'
}

export type THeading = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6';
export type TTag =
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  | 'pre' | 'div' | 'ol' | 'ul' | 'li' | 'tr' | 'td' | 'th'
  | 'span' | 'e' | 'i' | 'b' | 'table' | 'img' | 'svg' | 'video' | 'audio';

export const MARGIN_LEFT = 'margin-left';
export const MARGIN_RIGHT = 'margin-right';
export const STATUS_PANE = 'status-pane';
export const SIDE_PANES = 'side-panes';
export const QUEST_IMAGE = 'quest-image';
