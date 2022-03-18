import {
  ICommand,
  ICommands,
  IDefaults, IFileSaver,
  IIo, ILang, INpc, IParser, IQuest,
  ISaveLoad,
  ISettings, ITemplates, IText,
  IUtilities, IWorld,
} from './iquest';

export class QuestClass implements IQuest {
  constructor(data: Partial<IQuest> = {}) {
    Object.assign(this, data);
  }

  #Command: ICommand = {};

  get Command(): Required<ICommand> {
    this.#Command = this.#Command || {};
    return this.#Command as Required<ICommand>;
  }

  set Command(data: Partial<ICommand>) {
    Object.assign(this.#Command, data);
  }

  #Commands: ICommands = {};

  get Commands(): Required<ICommands> {
    this.#Commands = this.#Commands || {};
    return this.#Commands as Required<ICommands>;
  }

  set Commands(data: Partial<ICommands>) {
    Object.assign(this.#Commands, data);
  }

  #Defaults: IDefaults = {};

  get Defaults(): Required<IDefaults> {
    this.#Defaults = this.#Defaults || {};
    return this.#Defaults as Required<IDefaults>;
  }

  set Defaults(data: Partial<IDefaults>) {
    Object.assign(this.#Defaults, data);
  }

  #FileSaver: IFileSaver = {};

  get FileSaver(): Required<IFileSaver> {
    this.#FileSaver = this.#FileSaver || {};
    return this.#FileSaver as Required<IFileSaver>;
  }

  set FileSaver(data: Partial<IFileSaver>) {
    Object.assign(this.#FileSaver, data);
  }

  #IO: IIo = {};

  get IO(): Required<IIo> {
    this.#IO = this.#IO || {};
    return this.#IO as Required<IIo>;
  }

  set IO(data: Partial<IIo>) {
    Object.assign(this.#IO, data);
  }

  #NPC: INpc = {};

  get NPC(): Required<INpc> {
    this.#NPC = this.#NPC || {};
    return this.#NPC as Required<INpc>;
  }

  set NPC(data: Partial<INpc>) {
    Object.assign(this.#NPC, data);
  }

  #Parser: IParser = {};

  get Parser(): Required<IParser> {
    this.#Parser = this.#Parser || {};
    return this.#Parser as Required<IParser>;
  }

  set Parser(data: Partial<IParser>) {
    Object.assign(this.#Parser, data);
  }

  #SaveLoad: ISaveLoad = {};

  get SaveLoad(): Required<ISaveLoad> {
    this.#SaveLoad = this.#SaveLoad || {};
    return this.#SaveLoad as Required<ISaveLoad>;
  }

  set SaveLoad(data: Partial<ISaveLoad>) {
    Object.assign(this.#SaveLoad, data);
  }

  #Settings: ISettings = {};

  get Settings(): Required<ISettings> {
    this.#Settings = this.#Settings || {};
    return this.#Settings as Required<ISettings>;
  }

  set Settings(data: Partial<ISettings>) {
    Object.assign(this.#Settings, data);
  }

  #Templates: ITemplates = {};

  get Templates(): Required<ITemplates> {
    this.#Templates = this.#Templates || {};
    return this.#Templates as Required<ITemplates>;
  }

  set Templates(data: Partial<ITemplates>) {
    Object.assign(this.#Templates, data);
  }

  #Text: IText = {};

  get Text(): Required<IText> {
    this.#Text = this.#Text || {};
    return this.#Text as Required<IText>;
  }

  set Text(data: Partial<IText>) {
    Object.assign(this.#Text, data);
  }

  #Utilities: IUtilities = {};

  get Utilities(): Required<IUtilities> {
    this.#Utilities = this.#Utilities || {};
    return this.#Utilities as Required<IUtilities>;
  }

  set Utilities(data: Partial<IUtilities>) {
    Object.assign(this.#Utilities, data);
  }

  #World: IWorld = {};

  get World(): Required<IWorld> {
    this.#World = this.#World || {};
    return this.#World as Required<IWorld>;
  }

  set World(data: Partial<IWorld>) {
    Object.assign(this.#World, data);
  }

  #lang: ILang = {};

  get lang(): Required<ILang> {
    this.#lang = this.#lang || {};
    return this.#lang as Required<ILang>;
  }

  set lang(data: Partial<ILang>) {
    Object.assign(this.#lang, data);
  }

  Random?: any;
}

export const Quest = new QuestClass();
