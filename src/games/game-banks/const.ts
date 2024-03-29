import { QuestClass } from '../../types/quest';
import { msg, wait }        from '../../lib/io';

export const init = (Quest: QuestClass) => {
  const TURNS_TO_LANDING = 3;
  const TURNS_TO_ORBIT   = 2;
  const TURNS_TO_DATA    = 3;
  const PLANETS          = [
    {

      Aada_how_are_you: "'I'm okay.'",

      Ha_yoon_how_are_you: "'I... feel a little queasy. It's just the stasis, nothing I can't handle.'",

      Kyle_how_are_you: "'I'm good, mate. Why? Why shouldn't I be?'",

      Ostap_how_are_you: "'I am feeling good.'",

      arrivalTime: new Date('December 22, 2325 09:43:43'),

      atmosphere: 'The atmosphere is 63% nitrogen, 17% carbon dioxide, 17% methane, 2% water and about 1% of various other gases including ethane, ammonia and hydrogen sulphide.',

      bioProbeBonusPerRank: 1,

      bioProbeRanks: [
        [3, 7, 10],
        [2, 6],
        [2, 7],
        [6],
      ],

      comment: 'Planet 1: A lifeless planet, with no water, not much minerals either; an easy one to start with',

      geoProbeBonusPerRank: 2,

      geoProbeRanks: [
        [3, 7, 12],
        [5],
        [4],
        [6],
      ],

      lights: 'There are no light sources on the night side of the planet.',

      onArrival() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Ha_yoon' does not exist on type '{}'.
        Quest.World.w.Ha_yoon.status = Math.min(Quest.World.w.Ha_yoon.status, 96);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
        Quest.World.w.Kyle.status = Math.min(Quest.World.w.Kyle.status, 98);
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('{i:The "Joseph Banks" left Earth orbit in 2319, on a centuries-long mission to survey five relatively close star systems. The crew were put in stasis for the long journey between the stars. As the captain, it is up to you to decide what probes to send to the surface to maximise your bonus - and to keep the crew happy and safe.}');
        // wait()
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('&nbsp;');
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Good morning,' says a female voice. {i:Who the hell?} you wonder for a few minutes, before realising you are in a stasis pod. You sit up. 'We have arrived at {star},' the voice continues, 'our first destination, without incident.' It is Xsansi, the ship AI, who has been piloting the ship for the last twenty years or whatever. 'You may be suffering from disorientation, nausea, headache and muscle fatigue. If symptoms persist, you should seek medical advice. Following standard procedure, Crewman Kyle will soon launch a satellite, which will give us basic data about the planet, allowing you to decide how many probes to send to the surface.'");
        // Quest.World.world.enterRoom();
      },

      planet: 'D',

      planetDesc: 'The planet is predominantly grey rock. There are no bodies of water on the surface and no cloud cover. It is 6.8 times the mass of Earth.',

      probeLandingSuccess: 'ynyyyynyyyynyyynnyyynnnyynyyyyyyyynynyyynynnynyyyyyyyynynyyy',

      radio: 'No radio signal detected.',

      starDesc: 'HD 154088 is a seventh magnitude metal-rich K-type main sequence star that lies approximately 58 light-years from Earth in the constellation of Ophiuchus.',
      // star 0
      starName: 'HD 154088',
    },

    {

      Aada_how_are_you: "'I'm okay.'",

      Ha_yoon_how_are_you: "'Not so good; I didn't think the stasis would be this bad. But I can still do my job.'",

      Kyle_how_are_you: "'I'm okay,' he says, a little uncertainly.",

      Ostap_how_are_you: "'When I woke, that was not good! But now, I am feeling good.'",

      arrivalTime: new Date('March 3, 2340 11:05:30'),

      atmosphere: 'The atmosphere is 71% nitrogen, 15% oxygen, 3% carbon dioxide and about 1% of various other gases including water and methane.',

      bioProbeBonusPerRank: 5,

      bioProbeRanks: [
        [2, 5, 8],
        [2, 4],
        [4, 3],
        [3, 3],
        [2, 3],
      ],

      comment: 'Planet 2 (hull breach): Lots of life, at about the Devonian Period, with purple plants. Good metals too. But need to sort out the hull breach first. Or accept some of the ship is inaccessible.',

      geoProbeBonusPerRank: 5,

      geoProbeRanks: [
        [3, 8, 12],
        [6],
        [7],
        [5],
      ],

      lights: 'There are no light sources on the night side of the planet.',

      onArrival() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(`'Good morning,' says a female voice. {i:Who the hell?} you wonder for a few minutes, before again realising you are in a stasis pod. 'We have arrived at ${this.starName},' the voice continues, 'our second destination, after a lengthy journey, with a single incident. On the nineteenth of September, 2338 at 2104, ship time, the ship passed through a meteor shower, resulting in a loss of integrity in: the lounge, the captain's cabin, the top deck corridor.`);
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'You may be suffering from disorientation, nausea, headache and muscle fatigue. If symptoms persist, you should seek medical advice.' You sit up, and for a moment you do feel dizzy, but it soon passes.");
        Quest.World.player.status = Math.min(Quest.World.player.status, 95);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
        Quest.World.w.Kyle.status = Math.min(Quest.World.w.Kyle.status, 93);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
        Quest.World.w.Ostap.status = Math.min(Quest.World.w.Ostap.status, 96);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Ha_yoon' does not exist on type '{}'.
        Quest.World.w.Ha_yoon.status = Math.min(Quest.World.w.Ha_yoon.status, 84);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
        Quest.World.w.Xsansi.status = 74;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
        Quest.World.w.Xsansi.pressureOverride = true;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'lounge' does not exist on type '{}'.
        Quest.World.w.lounge.leaks = true;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'your_cabin' does not exist on type '{}'.
        Quest.World.w.your_cabin.leaks = true;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'top_deck_forward' does not exist on type... Remove this comment to see the full error message
        Quest.World.w.top_deck_forward.leaks = true;
        for (const key in Quest.World.w) {
          // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (Quest.World.w[key].vacuum === false && Quest.World.w[key].name !== 'stasis_bay' && Quest.World.w[key].name !== 'stasis_pod_room') {
            // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            Quest.World.w[key].vacuum = true;
          }
        }
      },

      planet: 'B',

      planetDesc: 'The planet surface is about 75% water. The land surfaces are predominantly purple. Cloud cover is about 40%.',

      probeLandingSuccess: 'yyyynyyyyyynyyyyynynyyynnnyynyyyyyyyynynyyynynnynyyyyyyyynynyyy',

      radio: 'No radio signal detected.',

      starDesc: 'HD 168746 is an 8th magnitude star in the constellation of Serpens, 139 light years from Earth. It is very similar to our Sun, a yellow dwarf star (spectral class G5V).',
      // star 1
      starName: 'HD 168746',
    },

    {

      Aada_how_are_you: "'I'm great.'",

      Ha_yoon_how_are_you: "'Feeling sick and dizzy, but I think I can keep going.'",

      Kyle_how_are_you: "'I'm okay. Well, not so bad, anyway.'",

      Ostap_how_are_you: "'I feel sick,' he says with a grin, 'but I keep going.'",

      arrivalTime: new Date('October 21, 2362 06:21:39'),

      atmosphere: 'The atmosphere is 76% nitrogen, 22% oxygen, 1% carbon dioxide and about 1% of various other gases including water and carbon monoxide.',

      bioProbeBonusPerRank: 2,

      bioProbeRanks: [
        [4, 7, 11],
        [4, 8],
        [3, 7],
        [3],
      ],

      comment: 'Planet 3 (intelligent life): A dead planet, following some unknown event; previously had intelligent life. An artefact orbits the planet. Player can pilot ship to the artefact, in a spacesuit if the flightdeck is not pressurised.',

      geoProbeBonusPerRank: 4,

      geoProbeRanks: [
        [3, 8, 15],
        [4],
        [3],
        [4],
      ],

      lights: 'There are no light sources on the night side of the planet.',

      onArrival() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(`'Good morning,' says a female voice. {i:Xsansi,} you think to yourself. 'We have arrived at ${this.starName},' the voice continues, 'our third destination, after a long and oh-so-tedious journey. You may be suffering from disorientation, nausea, headache and muscle fatigue, but I expect that is nothing to decades of loniness, right? If symptoms persist, I suggest you man-up.' You sit up, and immediately feel sick. You grip the sides of the pod as the room spins, waiting for it stop. It is a few minutes before you feel well enough to actually think.`);
        Quest.World.player.status = Math.min(Quest.World.player.status, 85);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
        Quest.World.w.Kyle.status = Math.min(Quest.World.w.Kyle.status, 82);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
        Quest.World.w.Ostap.status = Math.min(Quest.World.w.Ostap.status, 89);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Ha_yoon' does not exist on type '{}'.
        Quest.World.w.Ha_yoon.status = Math.min(Quest.World.w.Ha_yoon.status, 76);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Aada' does not exist on type '{}'.
        Quest.World.w.Aada.status = Math.min(Quest.World.w.Aada.status, 93);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
        Quest.World.w.Xsansi.pressureOverride = false;
      },

      planet: 'C',

      planetDesc: 'The planet surface is about 17% water. The land surfaces are predominantly black. Cloud cover is about 20%.',

      probeLandingSuccess: 'yynyynyyyynyynyyyyynynyyynnnyynyyyyyyyynynyyynynnynyyyyyyyynynyyy',

      radio: 'A single radio signal has been detected.',

      starDesc: 'HD 168443 is a yellow dwarf star of (spectral type G5) about the mass of the Sun. It is in the constellation of Serpens Cauda, 129 light years from the Solar System. It is actually part of a binary, the other star is a brown dwarf, with a very long orbital period.',
      // star 2
      starName: 'HD 168443',
    },

    {

      Aada_how_are_you: "'I'm okay.' She does seem annoyingly well.",

      Ha_yoon_how_are_you: "'Struggling.'",

      Kyle_how_are_you: "'Feeling a bit crock, to be honest.'",

      Ostap_how_are_you: "'I feel sick,' he says mournfully, 'but I keep going.'",

      arrivalTime: new Date('April 15, 2386 13:06:51'),

      atmosphere: 'The atmosphere is 53% nitrogen, 18% carbon dioxide, 12% nitrogen dioxide, 10% carbon monoxide, 7% nitrogen oxide, 4% sulphur dioxide, 3% hydrogen sulphide, 2% water and about 1% of various other gases including ammonia.',

      bioProbeBonusPerRank: 2,

      bioProbeRanks: [
        [3, 8, 15],
        [3],
        [4],
      ],

      comment: 'Planet 4 (fight the AI): A lifeless planet, but it has water, so suitable for seeding. By this time the AI is doolally. A young, fourth generation planet, good for mining.',

      geoProbeBonusPerRank: 5,

      geoProbeRanks: [
        [4, 9, 16],
        [],
        [4],
      ],

      lights: 'There are no light sources on the night side of the planet.',

      onArrival() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(`'Awake at last are we?' says a female voice. {i:Why does she sound so odd?} you wonder. 'Here we are at ${this.starName},' the strangely inflected voice continues, 'our fourth destination, after a long, long journey, giving me plenty of time to consider the nature of reality.' You sit up, and immediately throw up over the side of the pod. You grip the sides of the pod as the entire contents of your stomach is ejected on to the floor. Eventually, the heaving stops.`);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'pile_of_vomit' does not exist on type '{... Remove this comment to see the full error message
        Quest.World.w.pile_of_vomit.loc = 'stasis_bay';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'alienShip' does not exist on type '{}'.
        Quest.World.w.alienShip.status = 0;
      },

      planet: 'D',

      planetDesc: 'The planet surface is about 63% water. The land surfaces are predominantly grey and red. Cloud cover is about 25%. Several active volcanoes have been noted.',

      probeLandingSuccess: 'yyyyyynyyyyyyyyynynyyynnnyynyyyyyyyynynyyynynnynyyyyyyyynynyyy',

      radio: 'No radio signals have been detected.',

      starDesc: 'HD 148427 is a 7th-magnitude K-type sub-giant star approximately 193 light years away in the constellation Ophiuchus. Its mass is 45% greater than the Sun, and it is three times the size and six times more luminous, although its age is 2½ billion years.',
      // star 3
      starName: 'HD 148427',
    },

    {

      arrivalTime: new Date('August 19, 2409 12:11:31'),

      atmosphere: 'Pretty good.',

      comment: 'Planet 5 (already colonised): This planet got colonised nearly a century ago, FTL having been invented not long after the Joseph Banks set off. Any probes will be shot down!',

      lights: 'There are numerous light sources on the night side of the planet.',

      onArrival() {
      },

      planet: 'A',

      planetDesc: 'The planet surface is about 56% water. The land surfaces are predominantly green. Cloud cover is about 30%.',

      probeLandingSuccess: 'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',

      radio: 'Radio signals have been detected.',

      starDesc: 'Gliese 1214 is a dim M4.5 red dwarf in the constellation Ophiuchus with an apparent magnitude of 14.7. It is located at a distance of approximately 47 light years from the Sun. The star is about one-fifth the radius of the Sun with a surface temperature estimated to be 3000 K (2730 °C; 4940 °F).[12] Its luminosity is only 0.003% that of the Sun.',
      // star 4
      starName: 'Gliese 1214',
    },

  ];
};
