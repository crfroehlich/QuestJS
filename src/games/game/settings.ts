import { QuestClass } from '../../types/quest';

export const init = (Quest: QuestClass) => {

  Quest.Settings.settings.add({
    author: 'Your name',
    playMode: 'dev',
    thanks: [],
    title: 'Your new game',
    version: '0.1',
    warnings: 'No warnings have been set for this game.',
  });
}
