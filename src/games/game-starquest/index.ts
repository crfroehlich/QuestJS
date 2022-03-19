import { QuestClass } from '../../types/quest';
import { init as code } from './code';
import { init as data } from './data';
import { init as settings } from './settings';

export const init = (Quest: QuestClass) => {
  code(Quest);
  data(Quest);
  settings(Quest);
};
