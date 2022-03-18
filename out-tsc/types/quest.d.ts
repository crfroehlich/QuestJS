import { ICommand, ICommands, IDefaults, IFileSaver, IIo, ILang, INpc, IParser, IQuest, ISaveLoad, ISettings, ITemplates, IText, IUtilities, IWorld } from './iquest';
export declare class QuestClass implements IQuest {
    #private;
    constructor(data?: Partial<IQuest>);
    get Command(): Required<ICommand>;
    set Command(data: Partial<ICommand>);
    get Commands(): Required<ICommands>;
    set Commands(data: Partial<ICommands>);
    get Defaults(): Required<IDefaults>;
    set Defaults(data: Partial<IDefaults>);
    get FileSaver(): Required<IFileSaver>;
    set FileSaver(data: Partial<IFileSaver>);
    get IO(): Required<IIo>;
    set IO(data: Partial<IIo>);
    get NPC(): Required<INpc>;
    set NPC(data: Partial<INpc>);
    get Parser(): Required<IParser>;
    set Parser(data: Partial<IParser>);
    get SaveLoad(): Required<ISaveLoad>;
    set SaveLoad(data: Partial<ISaveLoad>);
    get Settings(): Required<ISettings>;
    set Settings(data: Partial<ISettings>);
    get Templates(): Required<ITemplates>;
    set Templates(data: Partial<ITemplates>);
    get Text(): Required<IText>;
    set Text(data: Partial<IText>);
    get Utilities(): Required<IUtilities>;
    set Utilities(data: Partial<IUtilities>);
    get World(): Required<IWorld>;
    set World(data: Partial<IWorld>);
    get lang(): Required<ILang>;
    set lang(data: Partial<ILang>);
    Random?: any;
}
export declare const Quest: QuestClass;
//# sourceMappingURL=quest.d.ts.map