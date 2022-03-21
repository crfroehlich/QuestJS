import { Cmd }        from '../../lib/command';
import { QuestClass } from '../../types/quest';
import { msg }        from '../../lib/io';

export const init = (Quest: QuestClass) => {
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('missions', {
    pageOption: true,
    verbFunction(verbList: any) {
      verbList.pop();
      for (const m of missions.getList()) verbList.push(m.alias);
    },
  });

  // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  Quest.Commands.commands.unshift(
    new Cmd('Mission', {
      objects: [{ special: 'text' }],
      regex:   /(.+) missions$/,
      script(objects: any) {
        const mission = missions.find(objects[0]);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHtml' does not exist on ty... Remove this comment to see the full error message
        Quest.Settings.settings.startingDialogHtml = `<p>Name: <i>${mission.alias}</i></p>`;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHtml' does not exist on ty... Remove this comment to see the full error message
        Quest.Settings.settings.startingDialogHtml += '<p>Brief:</p>';
        // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        const s   = typeof mission.brief === 'function' ? mission.brief() : mission.brief;
        const ary = s.split('|');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHtml' does not exist on ty... Remove this comment to see the full error message
        for (const el of ary) {
          Quest.Settings.settings.startingDialogHtml += `<p><i>${el}</i></p>`;
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'setUpDialog' does not exist on type '{ p... Remove this comment to see the full error message
        Quest.Settings.settings.setUpDialog();
        return Quest.World.world.SUCCESS;
      },
    }),
  );

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('crew_roster', {
    pageOption: true,
    verbFunction(verbList: any) {
      verbList.pop();
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
      if (Quest.World.w.ship.arrivedAtSector) {
        for (const o of roster.getCrew()) verbList.push(o.alias);
      } else {
        for (const o of getCandidates()) verbList.push(o.alias);
      }
    },
  });

  // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  Quest.Commands.commands.unshift(
    new Cmd('Crew Roster', {
      objects: [
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'isInWorld' does not exist on type '{}'.
        { attName: 'npc', scope: Quest.Parser.parser.isInWorld },
      ],
      regex: /(.+) crew roster$/,
      script(objects: any) {
        const o = objects[0][0];
        o.dutiesDiag();
        return Quest.World.world.SUCCESS;
      },
    }),
  );

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('encyclopedia', {
    askDiag(s: any, fromLink: any) {
      if (s.length === 0) return;
      if (s.length < 3) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(
          `On your PAGE you search for "${s}", but get over a billion hits. Perhaps search for something a few more characters long?`,
        );
        return;
      }
      const regex = RegExp(s, 'i');
      for (const key in encyclopedia) {
        if (regex.test(key)) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          if (!fromLink) msg(`On your PAGE you search for "${s}".`);
          const strs = [];
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'encyclopedia' does not exist on type '{}... Remove this comment to see the full error message
          if (
            Quest.Utilities.doOnce(Quest.World.w.encyclopedia, 'Encyclopaedia')
          ) {
            strs.push('<b>Welcome to the Fleet Admiralty Encyclopaedia</b>');
            strs.push(
              'Please note that the admiralty cannot be held accountable for any inaccuracy or inconsistency on the information contained herein. Continued use is taken as absolving the admiralty of any and all liability.',
            );
            strs.push(
              'If you do notice any  inaccuracy or inconsistency, please communicate this to the admiralty.',
            );
          }
          // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const paras = encyclopedia[key].split('|');
          let flag    = true;
          for (const s of paras) {
            if (flag) {
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'encyclopedia' does not exist on type '{}... Remove this comment to see the full error message
              strs.push(
                `<b>${key}</b> ${Quest.World.w.encyclopedia.expandRefs(s)}`,
              );
              flag = false;
            } else {
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'encyclopedia' does not exist on type '{}... Remove this comment to see the full error message
              strs.push(Quest.World.w.encyclopedia.expandRefs(s));
            }
          }
          Quest.IO.msgDiv(strs, {}, 'encyclopedia');
          return true;
        }
      }
      if (fromLink) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(
          'The link seems to be broken; you wondeer if you should report it to someone....',
        );
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(
          `On your PAGE you search for "${s}", but find nothing of interest.`,
        );
      }
      return false;
    },
    expandRefs(s: any) {
      let match = s.match(/\[\[(.+)\]\]/);
      while (match) {
        const link = `<span onclick="Quest.Utilities.runCmd('encyclopedia ${match[1]}')" class="encycLink">${match[1]}</span>`;
        s          = s.replace(match[0], link);
        match      = s.match(/\[\[.+\]\]/);
      }
      return s;
    },
    pageOption: true,
  });

  // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  Quest.Commands.commands.unshift(
    new Cmd('Encyclopedia', {
      objects: [{ special: 'text' }],
      regex:   /encyclopedia (.+)$/,
      script(objects: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'encyclopedia' does not exist on type '{}... Remove this comment to see the full error message
        Quest.World.w.encyclopedia.askDiag(objects[0], true);
        return Quest.World.world.SUCCESS;
      },
    }),
  );

  const encyclopedia = {
    83: 'Starbase 83 orbits the sun in the same orbit as Earth, at L4, and is considered third starbase at that location, though the first was an unmanned telescope. Its primary role is assembling, re-fitting and overhaul of fleet starships. It has no civilian facilities.',

    Alliance:
      'Currently thirty four species spread across 3962 planets make up the alliance. Its aim is to promote peace and prosperity throughout the galaxy. The latest species to join the Alliance was the [[Chal]], five years ago.',

    // Species
    Brakk:
      'The Brakk are a belligerent, war-like race who have taken it upon themselves to halt the natural expansion of mankind into space.',

    Chal: 'The similarities between the Chal and mankind, both in shape and in thought, are very apparent, and more than one commentator has suggested this led to the three decades of war between the two species. After some five years of tentative peace, we are at last learning more about this species, and realising just how much we are alike.',

    'Girr-Girr':
      'The Girr-Girr are a sentient race from the planet Noshtrim, noted for their abstract poetry and athletic dance. As a species, they tend to be quick and agile, if flighty.',

    // Other
    Pirates:
      'Pirates have plagued interstellar travel for centuries. The vastness of space has turned out to be the biggest defence against pirates, but also the biggest obstacle in eradicating them altogether.',

    'SS Star Quest':
      'The SS Star Quest is an {i:Intrepid} class warship, launched {time:-195341} from Newport, in Mars orbit. Originally a top-of-the-line ship, she has been downgraded twice, and is now classified as a general purpose ship. She is fitted with medical and science facilities, armaments and limited cargo facilities.|She was re-fitted in {time:-49}, and as of the re-fit she has a mass of 984 te, a typical crew of 54 plus 18 marines and can achieve a maximum speed of warp 6 with her two Mark 7 engines. She is armed with twin turbo lasers and hard-light torpedoes. She is due to be decommissioned in {time:25,871}',

    Salis:
      'Salis are a race of amorphous blobs. They were first encountered on Sirius Beta V, but xenobiologists consider it unlikely they originated there, as there are no other lifeforms on the planet with the same biochemistry. They had no written or oral history and so their origins remain a mystery.|Due to issues with communication, it was only some thirty years after discovery they were found to be sentient, and indeed to be particularly intelligent.',

    // Locations
    'Sector 7 Iota':
      'Sector 7 Iota is approximately 60 light-years from Earth, heading approximately away from the galatic centre. It is characterised by a cluster of some twenty stars, many with inhabited planets, with a limited number of outlying worlds at some remove.|The admiralty maintain Starbase 142 in orbit around Mendone III, the most populous planet.',

    Stardate:
      'The "Stardate" has been adopted as a universal time system across [[Union]] space. Due to relativistic effects, time travels at different rates depending on the observer\'s own speed, and as stars are moving relative to each other, even different planets have slight different time rates. The Stardate is a theoretical time based on a stationary galaxy. It uses midnight, New Year\'s day, 1970 in the original Earth-based system as the start of the epoch.|It is split into parts, separated by dots. The first is the number of years since the start of the epoch, the second part is the number of days since the start of the year, the third part is the number of hours. Further divisions divide into minutes and second. Later parts may be omitted as convenient. Note that Stardate uses a "standard year", which is exactly 360 days long or 31,104,000 seconds.',

    'Terran Union of Planets':
      'Of the 84 planets that are considered to be terran (earth and its colonies), 68 are part of the Terran Union of Planets. The union aims to provide protect to its members, but is more of a trade organisation. Members are required to uphold certain rights for all sentient beings on the planets.|The Terran Union of Planets is a subset of the [[Alliance]].',

    'The Admiralty':
      'The Space Admiralty, or more often just the Admiralty, is the administration for Earth-based space military.',
  };
};
