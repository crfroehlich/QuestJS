var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _QuestClass_Command, _QuestClass_Commands, _QuestClass_Defaults, _QuestClass_FileSaver, _QuestClass_IO, _QuestClass_NPC, _QuestClass_Parser, _QuestClass_SaveLoad, _QuestClass_Settings, _QuestClass_Templates, _QuestClass_Text, _QuestClass_Utilities, _QuestClass_World, _QuestClass_lang;
export class QuestClass {
    constructor(data = {}) {
        _QuestClass_Command.set(this, {});
        _QuestClass_Commands.set(this, {});
        _QuestClass_Defaults.set(this, {});
        _QuestClass_FileSaver.set(this, {});
        _QuestClass_IO.set(this, {});
        _QuestClass_NPC.set(this, {});
        _QuestClass_Parser.set(this, {});
        _QuestClass_SaveLoad.set(this, {});
        _QuestClass_Settings.set(this, {});
        _QuestClass_Templates.set(this, {});
        _QuestClass_Text.set(this, {});
        _QuestClass_Utilities.set(this, {});
        _QuestClass_World.set(this, {});
        _QuestClass_lang.set(this, {});
        Object.assign(this, data);
    }
    get Command() {
        __classPrivateFieldSet(this, _QuestClass_Command, __classPrivateFieldGet(this, _QuestClass_Command, "f") || {}, "f");
        return __classPrivateFieldGet(this, _QuestClass_Command, "f");
    }
    set Command(data) {
        Object.assign(__classPrivateFieldGet(this, _QuestClass_Command, "f"), data);
    }
    get Commands() {
        __classPrivateFieldSet(this, _QuestClass_Commands, __classPrivateFieldGet(this, _QuestClass_Commands, "f") || {}, "f");
        return __classPrivateFieldGet(this, _QuestClass_Commands, "f");
    }
    set Commands(data) {
        Object.assign(__classPrivateFieldGet(this, _QuestClass_Commands, "f"), data);
    }
    get Defaults() {
        __classPrivateFieldSet(this, _QuestClass_Defaults, __classPrivateFieldGet(this, _QuestClass_Defaults, "f") || {}, "f");
        return __classPrivateFieldGet(this, _QuestClass_Defaults, "f");
    }
    set Defaults(data) {
        Object.assign(__classPrivateFieldGet(this, _QuestClass_Defaults, "f"), data);
    }
    get FileSaver() {
        __classPrivateFieldSet(this, _QuestClass_FileSaver, __classPrivateFieldGet(this, _QuestClass_FileSaver, "f") || {}, "f");
        return __classPrivateFieldGet(this, _QuestClass_FileSaver, "f");
    }
    set FileSaver(data) {
        Object.assign(__classPrivateFieldGet(this, _QuestClass_FileSaver, "f"), data);
    }
    get IO() {
        __classPrivateFieldSet(this, _QuestClass_IO, __classPrivateFieldGet(this, _QuestClass_IO, "f") || {}, "f");
        return __classPrivateFieldGet(this, _QuestClass_IO, "f");
    }
    set IO(data) {
        Object.assign(__classPrivateFieldGet(this, _QuestClass_IO, "f"), data);
    }
    get NPC() {
        __classPrivateFieldSet(this, _QuestClass_NPC, __classPrivateFieldGet(this, _QuestClass_NPC, "f") || {}, "f");
        return __classPrivateFieldGet(this, _QuestClass_NPC, "f");
    }
    set NPC(data) {
        Object.assign(__classPrivateFieldGet(this, _QuestClass_NPC, "f"), data);
    }
    get Parser() {
        __classPrivateFieldSet(this, _QuestClass_Parser, __classPrivateFieldGet(this, _QuestClass_Parser, "f") || {}, "f");
        return __classPrivateFieldGet(this, _QuestClass_Parser, "f");
    }
    set Parser(data) {
        Object.assign(__classPrivateFieldGet(this, _QuestClass_Parser, "f"), data);
    }
    get SaveLoad() {
        __classPrivateFieldSet(this, _QuestClass_SaveLoad, __classPrivateFieldGet(this, _QuestClass_SaveLoad, "f") || {}, "f");
        return __classPrivateFieldGet(this, _QuestClass_SaveLoad, "f");
    }
    set SaveLoad(data) {
        Object.assign(__classPrivateFieldGet(this, _QuestClass_SaveLoad, "f"), data);
    }
    get Settings() {
        __classPrivateFieldSet(this, _QuestClass_Settings, __classPrivateFieldGet(this, _QuestClass_Settings, "f") || {}, "f");
        return __classPrivateFieldGet(this, _QuestClass_Settings, "f");
    }
    set Settings(data) {
        Object.assign(__classPrivateFieldGet(this, _QuestClass_Settings, "f"), data);
    }
    get Templates() {
        __classPrivateFieldSet(this, _QuestClass_Templates, __classPrivateFieldGet(this, _QuestClass_Templates, "f") || {}, "f");
        return __classPrivateFieldGet(this, _QuestClass_Templates, "f");
    }
    set Templates(data) {
        Object.assign(__classPrivateFieldGet(this, _QuestClass_Templates, "f"), data);
    }
    get Text() {
        __classPrivateFieldSet(this, _QuestClass_Text, __classPrivateFieldGet(this, _QuestClass_Text, "f") || {}, "f");
        return __classPrivateFieldGet(this, _QuestClass_Text, "f");
    }
    set Text(data) {
        Object.assign(__classPrivateFieldGet(this, _QuestClass_Text, "f"), data);
    }
    get Utilities() {
        __classPrivateFieldSet(this, _QuestClass_Utilities, __classPrivateFieldGet(this, _QuestClass_Utilities, "f") || {}, "f");
        return __classPrivateFieldGet(this, _QuestClass_Utilities, "f");
    }
    set Utilities(data) {
        Object.assign(__classPrivateFieldGet(this, _QuestClass_Utilities, "f"), data);
    }
    get World() {
        __classPrivateFieldSet(this, _QuestClass_World, __classPrivateFieldGet(this, _QuestClass_World, "f") || {}, "f");
        return __classPrivateFieldGet(this, _QuestClass_World, "f");
    }
    set World(data) {
        Object.assign(__classPrivateFieldGet(this, _QuestClass_World, "f"), data);
    }
    get lang() {
        __classPrivateFieldSet(this, _QuestClass_lang, __classPrivateFieldGet(this, _QuestClass_lang, "f") || {}, "f");
        return __classPrivateFieldGet(this, _QuestClass_lang, "f");
    }
    set lang(data) {
        Object.assign(__classPrivateFieldGet(this, _QuestClass_lang, "f"), data);
    }
}
_QuestClass_Command = new WeakMap(), _QuestClass_Commands = new WeakMap(), _QuestClass_Defaults = new WeakMap(), _QuestClass_FileSaver = new WeakMap(), _QuestClass_IO = new WeakMap(), _QuestClass_NPC = new WeakMap(), _QuestClass_Parser = new WeakMap(), _QuestClass_SaveLoad = new WeakMap(), _QuestClass_Settings = new WeakMap(), _QuestClass_Templates = new WeakMap(), _QuestClass_Text = new WeakMap(), _QuestClass_Utilities = new WeakMap(), _QuestClass_World = new WeakMap(), _QuestClass_lang = new WeakMap();
export const Quest = new QuestClass();
//# sourceMappingURL=quest.js.map