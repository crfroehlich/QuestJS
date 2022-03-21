import { noop }                  from 'lodash';
import { Quest, QuestClass }     from '../../types/quest';
import { TDiagText, TPrintData } from './types';

export class IoState {
  protected doNotSaveInput: boolean;

  #quest: QuestClass;

  protected get quest() {
    return this.#quest;
  }

  protected set quest(data: Partial<QuestClass>) {
    Object.assign(this.#quest, data);
  }

  protected get world() {
    return this.#quest.World.world;
  }

  protected get game() {
    return this.#quest.World.game;
  }

  protected get w() {
    return this.#quest.World.w;
  }

  protected get player() {
    return this.#quest.World.player;
  }

  protected get saveLoad() {
    return this.#quest.SaveLoad.saveLoad;
  }

  protected get lang() {
    return this.#quest.lang;
  }

  protected get parser() {
    return this.#quest.Parser;
  }

  protected get settings() {
    return this.#quest.Settings.settings;
  }

  protected get test() {
    return this.#quest.Utilities.test;
  }

  protected get text() {
    return this.#quest.Text;
  }

  protected get util() {
    return this.#quest.Utilities;
  }

  // eslint-disable-next-line class-methods-use-this
  protected get synth() {
    return globalThis.speechSynthesis;
  }

  protected nextid = 0;

  // False for normal function, true if things should be printed to the same paragraph
  protected otnb = false;

  protected keydownFunction = noop;

  protected showMenuDiagTitle: TDiagText | undefined;

  protected menuFn = noop;

  protected savedCommandsPos = 0;

  protected showMenuDiagSubmit: HTMLElement | undefined;

  protected sameLine = false;

  protected savedCommands = ['help'];

  protected doNotEraseLastCommand = true;

  // The output system is quite complicated...
  // https://github.com/ThePix/QuestJS/wiki/The-Output-Queue
  protected outputQueue: TPrintData[] = [];

  protected outputSuspended = false;

  protected panesWidth = 160;

  // 0: not disabled at all
  // 1: disable until output is done
  // 2: awaiting special input, eg from menu, including text
  // 3: awaiting special input, eg from menu, excluding text
  protected disableLevel = 0;

  // A list of names for items currently Quest.World.world. in the inventory panes
  protected currentItemList = [];

  protected dialogShowing = false;

  protected disableTextFunction = false;

  protected textColour = '';

  protected menuStartId = 0;

  protected menuFailFn = noop;

  protected menuOptions: any = {};

  protected finished = false;

  protected mainGutter = 20;

  protected voice: SpeechSynthesisVoice = new SpeechSynthesisVoice();

  protected voice2: SpeechSynthesisVoice = new SpeechSynthesisVoice();

  protected modulesToInit = [];

  protected modulesToUpdate = [];

  protected spoken = false;

  constructor(data: Partial<IoState> = {}, quest: QuestClass = Quest) {
    Object.assign(this, data);
    this.#quest = quest;
  }
}
