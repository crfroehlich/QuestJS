import { init as initCode } from './code';
import { init as initData } from './data';
import { init as initSettings } from './settings';
export const init = (Quest) => {
    initCode(Quest);
    initData(Quest);
    initSettings(Quest);
};
//# sourceMappingURL=index.js.map