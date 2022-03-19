import { QuestClass } from '../../types/quest';

export const init = (Quest: QuestClass) => {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'tests' does not exist on type '{}'.
  test.tests = function () {

  };
};
