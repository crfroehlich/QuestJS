type TState = {
  [key: string]: any;
}

export const globals: TState = {
  world: { },
  player: {},
  settings: {},
}

export const getGlobal = <T>(name: string): T => {
  if (!globals[name]) {
    globals[name] = (window as any)[name];
  }
  return globals[name] as T;
}

export const getGlobals = () => globals;

export const setGlobal = (data: TState) => {
  Object.assign(globals, data);
  Object.assign(window, globals);
}
