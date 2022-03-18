import { init as initCode }     from './code';
import { init as initData }     from './data';
import { init as initSettings } from './settings';
// import './style.css';
import { QuestClass } from '../../types/quest';

export const init = (Quest: QuestClass) => {
  initCode(Quest);
  initData(Quest);
  initSettings(Quest);
};
