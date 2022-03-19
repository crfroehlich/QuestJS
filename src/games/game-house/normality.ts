import { QuestClass } from '../../types/quest';

export const init = (Quest: QuestClass) => {
  register('normality', {
    book: 'All\'s Well That Ends Well',
    ceiling: 'The ceiling is white, with simple decorations along each side.',
    door: 'The door is wood; panelled and unpainted.',
    floor: 'The floor is wooden, and well-polished.',
    listen: 'If she strains, Mandy can hear a quiet humming, and even more faintly a deep, slow rhythmic pulsing sound.',
    smell: 'The house smells old and musty, like it never gets any fresh air at all.',
    uniform: 'her grey and blue Kyderbrook High School uniform',
    walls: 'The walls are all panelled in wood.',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('lounge', {
    desc: 'This is a cosy room. After the chaos of the last few hours, there is a strange sense of normality here; the comfy chairs around the fireplace, the ornaments on the mantelpiece.|The way out of the house -- and back to her routine life, Mandy suspects -- is west.',
    scenery: [
      { alias: 'comfy chairs', examine: 'There are three leather wing-back chairs; they are quite ornate, and almost throne-like.' },
      { alias: ['fireplace', 'mantelpiece'], examine: 'This is the fireplace from the drawing room; dark metal with ornate scrolling, and decorated with tiles with a floral design down either side..' },
      { alias: 'ornaments', examine: 'There are two candlesticks, and a clock that looks familiar.' },
      { alias: 'candlesticks', examine: 'The candlesticks are silver, or silver plate. There are no candles in them.' },
      {
        alias: 'clock',
        examine: 'This is a large, old-fashioned clock - identical to the one in the dining room. A dark wood case houses the ticking mechanism. Roman numerals run round the clock face, which indicate the time is now twenty past nine.{ifNot:large_key:loc:clock: The key is missing...}',
        setclock: 'Mandy thinks about setting the clock - but what time is it? She decides to leave it to Dr Malewicz to set when he can find out what the time actually is. Could the clock be right?',
        windup: "{if:large_key:loc:clock:Mandy gives the clock a quick wind for old times' sake:Mandy wonders how Dr Malewicz will wind his clock up without a key. Perhaps she should aim to be out of here before he realises}.",
      },
      {
        alias: 'key',
        examine: '{ifNot:large_key:loc:clock:Mandy looks at the hole in the clock where the key would be...:The key in the clock is identical to the one she used to wind up the clockwork thespian - though normal-sized again.}',
        take: 'Force of habit makes Mandy reach for the key, but {ifNot:large_key:loc:clock:it is not there:she changes her mind. She has no need of it now, and Dr Malewicz will need it when the clock winds down}.',
      },
      {
        alias: 'tiles',
        examine: 'There are three tiles on each side of the grate. All six have the floral design -- red elongated flowers, knobbly brown pods and bright green leaves composed of well over a dozen long, slim leaflets.',
      },

    ],

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    west: new Quest.World.Exit('_', {
      use() {
        if (Quest.World.player.easterEgg) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg('Mandy steps out of the house, and into the garden. She has escaped at last. Now all she has to worry about is exams in two weeks... But at least she knows what will be on the papers, and has seen the future-Mandy confidently answering the questions. She smiles to herself, feeling strangely confident about the future.');
        } else {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg('Mandy steps out of the house, and into the garden. She has escaped at last. Now all she has to worry about is exams in two weeks. Assuming it is still the thirteenth of May, 2016...');
        }
        Quest.IO.blankLine();
        Quest.IO.msg('T H E &nbsp;&nbsp;&nbsp;&nbsp;  E N D', {}, 'centred');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'finish' does not exist on type '{ nextid... Remove this comment to see the full error message
        Quest.IO.io.finish();
        return false;
      },
    }),

    windowsface: 'west',
  });
}
