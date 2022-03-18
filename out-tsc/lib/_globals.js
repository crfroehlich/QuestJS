export const globals = {
    player: {},
    settings: {},
    world: {},
};
export const getGlobal = (name) => {
    if (!globals[name]) {
        globals[name] = window[name];
    }
    return globals[name];
};
export const getGlobals = () => globals;
export const setGlobal = (data) => {
    Object.assign(globals, data);
    Object.assign(window, globals);
};
//# sourceMappingURL=_globals.js.map