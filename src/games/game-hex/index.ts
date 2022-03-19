import { QuestClass }       from '../../types/quest';
import { init as code }     from '../game/code';
import { init as data }     from '../game/data';
import { init as settings } from '../game/settings';

export const init = (Quest: QuestClass) => {
  code(Quest);
  data(Quest);
  settings(Quest);
};
