import { QuestClass } from '../../types/quest';

export const init = (Quest: QuestClass) => {
  Quest.Settings.settings.add({
    author:       'The Pixie',
    ifid:         '1F95711E-44DE-4C57-AA30-0BAB292E5874',
    panes:        'none',
    roomTemplate: [
      '#{cap:{hereName}}',
      '{hereDesc}',
      '{objectsHere:You can see {objects} here.}',
    ],
    styleFile: 'style',
    thanks:    [],
    title:     'Cloak of Darkness',
    version:   '0.3',
  });
};
