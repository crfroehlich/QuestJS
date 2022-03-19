import { QuestClass } from '../../types/quest';

export const init = (Quest: QuestClass) => {
  Quest.World.createItem('me', Quest.Templates.PLAYER(), {
    examine: 'Just a regular guy.',
    loc: 'lounge',
    synonyms: ['me', 'myself'],
  });

  Quest.World.createRoom('lounge', {
    desc: 'The lounge is boring, the author really needs to put stuff in it.',
  });
};
