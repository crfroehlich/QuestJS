import { QuestClass } from '../../types/quest';

export const init = (Quest: QuestClass) => {
  // ts-error-fixed ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'walkthroug... Remove this comment to see the full error message
  const walkthroughs = {
    a: [
      's', 'u', 'w', 'in',
    ],
  };
}
