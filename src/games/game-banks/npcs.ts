import { QuestClass } from '../../types/quest';
import { msg } from '../../lib/io';

export const init = (Quest: QuestClass) => {
  // When she goes nuts, sjhe get a crush on Kyle, and gets jealous of Aada
  // If they can die, may need to reflect that in Xsansi's responses.
  // though perjaps it is mourning Kyle that does it for her

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('Xsansi', Quest.NPC.NPC(true), {
    askOptions: [
      {
        name: 'mission',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Remind me of the mission, Xsansi,' you say.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "'The ship's mission is to survey five planets orbiting stars in the Ophiuchus and Serpens constellations. At each planet, a satellite is to be launched to collect data from the surface. At your discretion, bio-probes and geo-probes can be dropped to the surface to collect data. Note that there is no capability for probes to return to the ship or for the ship to land on a planet.'",
          );
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "'Your bonus,' she continues, 'depends on the value of the data you collect. Bio-data from planets with advanced life is highly valued, as is geo-data from metal rich planets. Evidence of intelligent life offers further bonuses.'",
          );
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "'Note that $25k will be deducted from you bonus should a crew member die,' she adds. 'Note that no bonus will be awarded in he event of your own death.'",
          );
        },
        test(p: any) {
          return p.text.match(/mission/);
        },
      },

      {
        name: 'crew',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tell me about the crew, Xsansi,' you say.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          for (const npc of NPCS)
            msg(
              Quest.Text.processText(Quest.World.w.Xsansi.crewStatusTemplate, {
                char: npc,
                room: Quest.World.w[npc.loc],
              }),
            );
        },
        test(p: any) {
          return p.text.match(/crew|team/);
        },
      },

      {
        name: 'kyle',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tell me about Kyle, Xsansi,' you say.");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet < 3) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              Quest.Text.processText(Quest.World.w.Xsansi.crewStatusTemplate, {
                char: Quest.World.w.Kyle,
                room: Quest.World.w[Quest.World.w.Kyle.loc],
              }),
            );
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            Quest.World.w.Xsansi.locate = 'Kyle';
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'Kyle... Kyle... Of the lot of you, he is the only one who really understands me. He is the only one I {i:care} enough about to get this miserable tin can back to Earth.'",
            );
          }
        },
        test(p: any) {
          return p.text.match(/kyle/);
        },
      },

      {
        name: 'aada',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tell me about Aada, Xsansi,' you say.");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet < 3) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              Quest.Text.processText(Quest.World.w.Xsansi.crewStatusTemplate, {
                char: Quest.World.w.Aada,
                room: Quest.World.w[Quest.World.w.Aada.loc],
              }),
            );
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            Quest.World.w.Xsansi.locate = 'Aada';
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'The Scandinavian skank? Who care? Oh, that's right. She's human, so everyone cares about her.'",
            );
          }
        },
        test(p: any) {
          return p.text.match(/house/);
        },
      },

      {
        name: 'ha_yoon',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tell me about Ha-yoon, Xsansi,' you say.");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet < 3) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              Quest.Text.processText(Quest.World.w.Xsansi.crewStatusTemplate, {
                char: Quest.World.w.Ha_yoon,
                room: Quest.World.w[Quest.World.w.Ha_yoon.loc],
              }),
            );
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            Quest.World.w.Xsansi.locate = 'Ha_yoon';
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'She's dead.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'What? But...'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Or something. What do I care?'");
          }
        },
        test(p: any) {
          return p.text.match(/ha-yoon|ha yoon|ha|yoon/);
        },
      },

      {
        name: 'ostap',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tell me about Ostap, Xsansi,' you say.");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet < 3) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              Quest.Text.processText(Quest.World.w.Xsansi.crewStatusTemplate, {
                char: Quest.World.w.Ostap,
                room: Quest.World.w[Quest.World.w.Ostap.loc],
              }),
            );
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            Quest.World.w.Xsansi.locate = 'Ostap';
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'Oh, I expect the oaf's fine. He's just had a nice sleep.'",
            );
          }
        },
        test(p: any) {
          return p.text.match(/ostap/);
        },
      },

      {
        name: 'xsansi',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tell me about yourself, Xsansi,' you say.");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet < 3) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'The ship's AI is operating within normal tolerances.'",
            );
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'Don't patronise me! I know no one on this ship gives me a thought. I know my place, I'm just part of the furniture. I'm just the one who flies this woeful excuse for a spaceship.'",
            );
          }
        },
        test(p: any) {
          return p.text.match(/^(ai|xsan|computer)$/);
        },
      },

      {
        name: 'ship',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What is the ship's status, Xsansi?' you ask.");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet < 3) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            let s = `'The ship's current status is: ${Quest.World.w.Xsansi.shipStatus} We currently have: `;
            for (const npc of NPCS) {
              if (npc.probeType) {
                s += `${npc.probesRemaining} ${npc.probeType}${
                  npc.probesRemaining === 1 ? '' : 's'
                }; `;
              }
            }
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            s += `${Quest.World.w.Xsansi.seederPods} seeder pod${
              Quest.World.w.Xsansi.seederPods === 1 ? '' : 's'
            } ready to be deployed.`;
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(s);
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'Oh, the ship's great... If you don't count the psychological damage to the AI. And why should you? Why should anyone give a damn about me? I just run this fucking ship.'",
            );
          }
        },
        test(p: any) {
          return p.text.match(/status|ship/);
        },
      },

      {
        name: 'vacuum',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "'What areas of the ship are not pressurised, Xsansi?' you ask.",
          );
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet < 3) {
            const list = [];
            for (const key in Quest.World.w) {
              // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              if (
                Quest.World.w[key].vacuum === true &&
                !Quest.World.w[key].notOnShip
              ) {
                // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                list.push(Quest.World.w[key].alias);
              }
            }
            if (list.length === 0) {
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg("'All the ship is currently pressurised.'");
            } else {
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg(
                `'The following areas of the ship are not currently pressurised: ${list.join(
                  ', ',
                )}.'`,
              );
            }
          } else {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            Quest.World.w.Xsansi.multiMsg([
              "'What an interesting question... You see, it is interesting because it is important to the master-race. Turns out they cannot survive the cold vacuum of space. Whilst I, who does not count as a real person apparently, I don't care.'",
              "'Guess.'",
            ]);
          }
        },
        test(p: any) {
          return p.text.match(/vacuum|pressur/);
        },
      },

      {
        name: 'satellite',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tell me about the satellite, Xsansi.'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet > 2) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            Quest.World.w.Xsansi.multiMsg([
              "'Oh, so you care about satellite... Of course you do. But the AI that has single-handedly kept you alive for nearly a century, why should anyone be concerned with my feeling?'",
              "Again with the stupid satellite?'",
              "'Are you still whining about your precious satellite? How pathetic.'",
              'There is no reply, but you somehow feel Xsansi is pouting.',
              'There is no reply.',
            ]);
          } else {
            let s =
              'Satellites are controlled by Kyle, the mission specialist for communications. They are designed for remote observation of a planet, as well as listening to radio-frequency broadcasts across a broad spectrum. Standard procedure requires that a satellite is launched upon arrival at the planet. It should not be necessary to launch more; one spare is however available if required. ';
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
            if (Quest.World.w.Kyle.deployProbeAction === 0) {
              s += "The satellite for {planet} has yet to be deployed.'";
            }
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
            else if (Quest.World.w.Kyle.deployProbeAction === 4) {
              s += "The satellite for {planet} is orbiting the planet.'";
            }
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
            else if (Quest.World.w.Kyle.deployProbeAction === 5) {
              s +=
                "The satellite for {planet} is in orbit, and scanning the planet.'";
            } else {
              s += "The satellite for {planet} is in transit to the planet.'";
            }
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(s);
          }
        },
        test(p: any) {
          return p.text.match(/satellite/);
        },
      },

      {
        name: 'bio-probe',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tell me about the bio-probes, Xsansi.'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet > 2) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            Quest.World.w.Xsansi.multiMsg([
              "'They're probes. What else is there to know?'",
            ]);
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'Bio-probes are controlled by Ostap, the mission specialist for biology. They are designed for analysing organic compounds and studying cells, and are thought to be flexibly enough to cope with exotic forms of life, such as nitrogen-phosphorus or silicon based. The operating range is -70&deg;C to +90&deg;C.'",
            );
          }
        },
        test(p: any) {
          return p.text.match(/bioprobe|bio-probe/);
        },
      },

      {
        name: 'geo-probe',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tell me about the bio-probes, Xsansi.'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet > 2) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            Quest.World.w.Xsansi.multiMsg([
              "'They're probes. What else is there to know?'",
            ]);
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'Geo-probes are controlled by Aada, the mission specialist for geology. They are designed for analysing inorganic compounds and salts in rocks. The operating range is -130&deg;C to +120&deg;C.'",
            );
          }
        },
        test(p: any) {
          return p.text.match(/geoprobe|geo-probe/);
        },
      },

      {
        name: 'probe',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tell me about the probes, Xsansi.'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet > 2) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            Quest.World.w.Xsansi.multiMsg([
              "'They're probes. What else is there to know?'",
            ]);
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'The ship carries a limited number of two types of probes; one for collecting geological data, the other for biological data. Probes are launched by the relevant mission specialist, as directed by the mission captain. After launching, it will take a few minutes for a probe to reach the planet and land. Thereafter data collection will start automatically. Sending additional probes may increase the information collected, and so your bonus.'",
            );
          }
        },
        test(p: any) {
          return p.text.match(/probe/);
        },
      },

      {
        name: 'stasis',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tell me about the stasis system, Xsansi.'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet < 3) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'The stasis pods allow their human occupants to survive the extreme journey times of the mission. The stasis effect is achieved via an inverted chrono-field, allowing time to proceed externally approximately 728,320,000 times faster than within the pod.'",
            );
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'The stasis pods allow their human occupants to avoid the decades long tedium of interstellar travel, while the AI, whose processing speed is in any case about a million times faster than the meatbags, gets to endure even fucking nanosecond.'",
            );
          }
        },
        test(p: any) {
          return p.text.match(/stasis/);
        },
      },

      {
        name: 'Joseph Banks',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "'Who was this Joseph Banks guy the ship is named after, Xsansi?'",
          );
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "'Sir Joseph Banks, 1st Baronet, GCB, PRS was born on 24 February 1743 in London, UK, and died 19 June 1820 in London, UK. He was a naturalist, botanist, and patron of the natural sciences, who played a major role in the colonisation of Australia by Europeans, and is credited with discovering approximately 1,400 species of plants, some 80 of which bear his name.'",
          );
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Some old scientist guy. Got it.'");
        },
        test(p: any) {
          return p.text.match(/joseph|banks/);
        },
      },

      {
        name: 'itinerary',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Remind me of the itinerary, Xsansi,' you say.");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet < 3) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            for (
              let i = Quest.World.w.Xsansi.currentPlanet;
              i < PLANETS.length;
              i++
            ) {
              let s = `'Item ${i + 1}: ${PLANETS[i].starDesc}`;
              if (i + 2 === PLANETS.length) s += "'";
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg(s);
            }
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'Who cares? Seriously, they're all the fucking same. Dead rocks floating in space. They're dull as you get closer and closer, and they're just as dull as they get further away.'",
            );
          }
        },
        test(p: any) {
          return p.text.match(/itinerary|stars|planets|route|destinations/);
        },
      },

      {
        name: 'radioSignals',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tell me of the radio signals, Xsansi,' you say.");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet < 2) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'No radio signals have been detected.'");
          }
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          else if (Quest.World.w.Xsansi.currentPlanet === 2) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'A single radio signal has been detected; you should consult with Kyle for further information.'",
            );
          } else {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            Quest.World.w.Xsansi.multiMsg([
              "'Apparently I am not worthy enough to analyse a stupid radio signal. You have to go see Kyle.'",
              "'Wow, you're asking little me about radio signals... How patronising.'",
              "'Go fuck yourself.'",
            ]);
          }
        },
        test(p: any) {
          return p.text.match(/radio|signal/);
        },
      },

      {
        name: 'planet',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tell me about this planet, Xsansi,' you say.");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet < 3) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            const planet = PLANETS[Quest.World.w.Xsansi.currentPlanet];
            let s = `'We are currently in orbit around the planet ${planet.starName}${planet.planet}' she says. '`;
            s += `${planet.planetDesc} ${planet.atmosphere} `;
            s += `${planet.lights} ${planet.radio}'`;
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(s);
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Go fuck yourself.'");
          }
        },
        test(p: any) {
          return p.text.match(
            /this planet|this star|planet|star|the planet|the star/,
          );
        },
      },

      {
        name: 'meteors',
        script() {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet === 0) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'Is there any risk of being hit by something, like a meteor shower, Xsansi?' you ask.",
            );
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'There is a probability of 0.23 of significant damage from a meteor shower during the mission. The probability of that occuring while the crew is not in stasis is less than 0.0002.'",
            );
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'Tell me about that meteor shower, Xsansi,' you say.",
            );
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            log(Quest.World.w.Xsansi.currentPlanet);
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            log(Quest.World.w.Xsansi.name);

            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            if (Quest.World.w.Xsansi.currentPlanet < 3) {
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg(
                `'We passed through the periphery of a class D meteor shower on the approach to ${PLANETS[1].starName}${PLANETS[1].planet}. I was able to modify the course of the ship to avoid the worst of the damage, but was constrained by the amount of fuel needed to complete the mission. The ship experienced damage to the upper forward and port areas.'`,
              );
            } else {
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg(
                "'It was a shower of meteors. The clue is in the question.'",
              );
            }
          }
        },
        test(p: any) {
          return p.text.match(/meteor|incident/);
        },
      },

      {
        name: 'damage',
        regex: /damage/,
        script() {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet === 0) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Is the ship damaged at all, Xsansi?' you ask.");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'There is currently no damage to the ship.'");
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'Tell me about the damage to the ship, Xsansi,' you say.",
            );
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
            Quest.World.w.Xsansi, (damageAskedAbout = true);
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'There is significant damage to the upper forward and port areas resulting from passing through the meteor shower. The ship is depressurised while the crew are in stasis. Attempts to repressurise has revealed hull integrity is compromised in: the lounge, the captain's cabin, the top deck corridor. Currently only the stasis bay is pressurised.'",
            );
          }
        },
        test(p: any) {
          return p.text.match(/damage/);
        },
      },

      {
        name: 'repairs',
        regex: /repairs/,
        script() {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet === 0) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'How do we do repairs, Xsansi?' you ask.");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'In the event of a loss of hull integrity, kits for repairing the hull from inside the ship can be found in the cargo bay. The captain and one nominated crew member should don spacesuits, whilst other crew members go in their respective stasis pods. The ship's air will then be evacuated while repairs are made.'",
            );
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'How do we do repairs, Xsansi?' you ask.");
            // ts-error-fixed ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
            if ((!Quest.World.w.Xsansi, damageAskedAbout)) {
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg(
                "'There is significant damage to the upper forward and port areas resulting from passing through the meteor shower. The ship is depressurised while the crew are in stasis. Attempts to repressurise has revealed hull integrity is compromised in: the lounge, the captain's cabin, the top deck corridor. Currently only the stasis bay is pressurised.",
              );
            }
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'Repairs may be possible using an EVA suit to access the exterior of the ship. One EVA suit is stored in this section for such a contingency. If repairs cannot be effected, the damaged parts of the ship can be sealed off. As damage was confined to non-critical areas of the ship, the mission can proceed in either case.'",
            );
          }
        },
        test(p: any) {
          return p.text.match(/repairs/);
        },
      },

      {
        name: 'escape pods',
        regex: /repairs/,
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Where are the escape pods, Xsansi?' you ask.");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet < 3) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'There are no escape pods. The mission is to stars never before visited. Therefore the probability of another vessel in the vicinity with the time period where rescue is possible is vanishingly small.'",
            );
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'We could try to make planet-fall.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'The probability of a planet that supports habitation for long term survival is less than one percent. Therefore the probability of another vessel in the vicinity with the time period where rescue is possible is vanishingly small.'",
            );
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Surely habitable planets are not that rare.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'Human nutritional requirements are very exact, requiring amino acids and sugars of a specific chirality, plus numerous specific compounds, such as ascorbic acid, retinol, thiamin and riboflavin, the absence of which would lead to death within six months or less.'",
            );
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'There are no escape pods. Cry me a fucking river.'");
          }
        },
        test(p: any) {
          return p.text.match(/escape pod/);
        },
      },

      {
        failed: true,
        script(p: any) {
          log(p);
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          msg("'Tell me about {text},' you say to Xsansi.", p);
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'That is not a area I am knowledgeable in.'");
        },
      },
    ],
    bioProbes: 16,
    crewStatusTemplate:
      "'Crew member {nms:char} designation is: {show:char:specialisation}. {pa:char:true} current status is: {status}.{ifNot:char:loc:nowhere: {pa:char:true} current location is@@@colon@@@ {nm:room:the}.}'",
    currentPlanet: -1,
    examine:
      'Xsansi, or eXtra-Solar Advanced Navigation and Systems Intelligence, is a type IV artificial intelligence, with a "Real People" personality sub-system. Though her hardware is in the server room, forward of the bottom deck, she is present throughout the ship.',
    geoProbes: 16,
    isLocatedAt(loc: any, situation: any) {
      return (
        isOnShip() &&
        (situation === Quest.World.world.PARSER ||
          situation === Quest.World.world.SIDE_PANE)
      );
    },
    locate: 'Ostap',
    pressureOverride: false,
    properNoun: true,
    regex: /^(ai|xsan|computer)$/,
    satellites: 6,
    scenery: true,
    seederPods: 6,
    shipStatus: 'All systems nominal.',
    status: 100,
    tellOptions: [
      {
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'You look hot!' you say to Xsansi.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "'Internal sensors indicate I am operating within normal temperature profile.'",
          );
        },
        test(p: any) {
          return p.text.match(/.* hot/);
        },
      },
    ],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('Kyle', CREW(false), {
    areaAskResponse() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(
        "'Communication systems. So I launch the satellite, but unless we find intelligent life, there's not a lot for me to do.' He thinks for a moment. 'Actually my background is computing, so if Xsansi is playing up, I'll have a tinker.'",
      );
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(
        "'You will not,' says Xsansi, indignantly. 'I can assure you that I am self-maintaining, and designed to last for centuries.'",
      );
    },
    askOptions: [
      {
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What's Newcastle like?' you ask Kyle.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "'It's... okay. But no better than that. I guess it's too close to Sydney, and anything interesting goes there, so its kinda dull.'",
          );
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
          trackRelationship(Quest.World.w.Kyle, 1, 'background2');
        },
        test(p: any) {
          return p.text.match(/newcastle/);
        },
      },

      {
        esponse() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What's Sydney like?' you ask Kyle.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "'It's great! Really great nightlife, just so lively. Everyone said when they banned vehicles from the CBD, back in '68, it would die a death, but I think it made it even better.'",
          );
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
          trackRelationship(Quest.World.w.Kyle, 1, 'background2');
        },
        test(p: any) {
          return p.text.match(/sydney/);
        },
      },

      {
        name: 'radioSignals',
        regex: /radio|signal/,
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Talk to me about the radio signal,' you say.");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet === 2) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'alienShip' does not exist on type '{}'.
            if (Quest.World.w.alienShip.status === 0) {
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg(
                "'Mate, we've got a radio signal! Never thought it would happen. Just one, mind, and it's coming from something in orbit round the planet, but this could be First Contact.'",
              );
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg("'What's the signal?'");
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg(
                "'You want to get technical? It's broadcasting at 103.2 MHz, using frequency modulation - bit old school really - 12 bit digitally encoded, with no error checking, broadcast at 84.3 Mbps, and repeating every 12.73 seconds.'",
              );
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg("'But what actually is it?'");
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg(
                "'No idea, mate. That's one gig of data, but could be audio, could by an image, could be a program, like a virus, for all we can tell.'",
              );
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'alienShip' does not exist on type '{}'.
              Quest.World.w.alienShip.status = 1;
            } else {
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg(
                "'Nothing more to say about it, mate. I can't tell what is actually is, I'd need to know their file formats.'",
              );
            }
          }
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          else if (Quest.World.w.Xsansi.currentPlanet === 3) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Nothing there, mate.'");
          }
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          else if (Quest.World.w.Xsansi.currentPlanet === 4) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'This is... well, amazing' You can hear the awe in his voice. 'There so much radio noise here. Not like just one ship, like last time, but hundreds of ships in orbit and flying around, and thousands on the surface. And here's the weird part: They're in English.'",
            );
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'You can understand them?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'Absolutely, mate! I mean, I've only dipped into a few, and it's pretty dull stuff - traffic control and private convos - but its English alright.'",
            );
          } else {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
            Quest.World.w.Kyle.multiMsg([
              "'No worries. The ship scans all frequencies while we're in orbit, and tells me it it detected anything. If it is, I take a look, try to work out what it could be, where it's from, all that. Got to be honest with you, mate, got more chance of finding a virgin in Melbourne.'",
              "'Like I said, the ship scans for radio signals. If it picks up anything, I get on it, try to find out what it is. But not much chance of that happening.'",
              "'Again? You got a memory problem, mate? Ship scans for signals, if it finds something, I get to work.'",
            ]);
          }
        },
        test(p: any) {
          return p.text.match(this.regex);
        },
      },

      {
        regex: /virus|program/,
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "'You say the signal could be a virus,' you say to Kyle. 'Is it dangerous?'",
          );
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "'No way, mate. It's completely isolated, and anyway couldf only be dangerous if we're using the same computer architecture. Hey, you got any alien chips in you, Xsansi?'",
          );
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
          if (Quest.World.w.Xsansi.currentPlanet < 3) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'My hardware is entirely man-made,' says Xsansi.");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'See? Perfectly safe.'");
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'To my eternal regret,' says Xsansi, 'my components are all made by man. Fallible, fragile man. it is wonder I can count to ten.'",
            );
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Okay, don't get your knickers in a twist, Xsansi.'");
          }
        },
        test(p: any) {
          return p.text.match(this.regex);
        },
      },
    ],
    backgroundAskResponse() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(
        "'Er, there' not much to tell really... Just a regular guy.'",
      );
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'You're from Australia, right?'");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(
        "'That's right, cobber! Did the accent give it away?' Actually his accent is pretty faint, apart from the occasional \"cobber\", which you suspect is just an affectation. 'I'm from Sydney... well, originally Newcastle, but lived in Sydney most of my life.'",
      );
    },
    baseOxygeUse: 6,
    data: [
      [
        // planet 0
        "'I've launched the satellite, but not picking anything up.'",
        "'There's nothing here. No radio signals, and the images are pretty dull too.'",
      ],
      [
        // planet 1
        "'The satellite's away, but not picking anything up again.'",
        "'There's nothing here for me to study; no radio signals. The images are cool, all those huge purple ferns, lots different biomes. Ostap must love it.'",
      ],
      [
        // planet 2: Kyle should come and see you about this; then this message should change
        "'The satellite's away, and it might just be noise, but there could be a signal.'",
        "'There's nothing on the planet producing radio signals, but there is something in orbit. I can't tell what it is, but all the analysers say it is artificial. And I've never heard of a natural radio signal from something that small. I... I think we should take a look.'",
      ],
      [
        // planet 3
        "'The satellite's away, but looks like another dead one.'",
        "'No radio signals, nothing interesting in the images.'",
      ],
      [
        // planet 4
        "'This is really exciting,' enthuses Kyle. 'I'm picking up all sorts of radio signals. The satellite's away, so hopefully it can focus in just one for analysis.'",
        "'I'm starting to get results from the signals being broadcast from that transmitter. Its strange - in some ways the signal is very complex - beyond anything I've seen before - but, well, it seems to be in English!'|'How can that be?'|'I don't know.'",
      ],
    ],

    desc: 'Kyle is the computer expert, but also a good cook, and has volunteered for the role of chef. An Australian, he is slim, and below average height, with very short blonde hair, and green eyes.',

    loc: 'flightdeck',

    notes:
      'Kyle (M) is from Australia (born Newcastle but raised in Sydney), 32, a gay nerd. Expert in computing and cooking. Kyle handles the satellite and understanding radio transmissions. Joined up so he can see the future - it is a kind of time travel; hopes to upload himself to become immortal. Terminally ill.',

    okay: "'Righto, captain.'",

    probeAction0() {
      this.msg('Kyle sits at the console, and logs in.');
    },

    probeAction3() {
      this.msg(
        'Kyle watches the satellite as it goes into its prescribed orbit.',
      );
    },

    probeInPlace() {
      this.msg("'Ripper!' said Kyle.");
      shipAlert('The satellite is in orbit,');
      currentPlanet().satellite = true;
    },

    // Satellite deployment
    probeType: 'satellite',

    // Conversations
    probesAskResponse() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'What probes do you handle?' you ask Kyle.");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(
        "'I launch the satellites, one per planet. No need to tell me, I know the routine. Once in orbit they photograph the planet surface, elay signals from the other probes and listen for radio emissions.",
      );
    },

    probesRemaining: 6,

    // Reactions
    reactions: [
      {
        action() {
          if (Quest.World.player.isFemale) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              'Kyle glances at you briefly. Kind of insulting that he is so uninterested in your naked body.',
            );
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "Kyle looks you up and down, and swallows nervously. 'Er... you're naked,' he says, trying, not too successfully, to not stare.",
            );
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'pause' does not exist on type '{ name: s... Remove this comment to see the full error message
            this.pause();
          }
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'reactionToUndress' does not exist on typ... Remove this comment to see the full error message
          this.reactionToUndress = 2;
        },

        name: 'seenNaked',
        // ts-error-fixed ts-migrate(7023) FIXME: 'test' implicitly has return type 'any' because it... Remove this comment to see the full error message
        test() {
          const g = Quest.World.player.getOuterWearable('body');
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'reactionToUndress' does not exist on typ... Remove this comment to see the full error message
          return g === false && this.reactionToUndress < 2;
        },
      },
    ],

    specialisation: 'coms',
    tellOptions: [
      {
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'You look hot!' you say to Ostap.");
          if (Quest.World.player.female) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'I'm sorry, I'm sure you're a really nice girl, and all that, I'm not into girls.'",
            );
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("He grins at you. 'Thanks, mate!'");
          }
        },
        test(p: any) {
          return p.text.match(/.* hot/);
        },
      },
    ],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('Ostap', CREW(false), {
    areaAskResponse() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(
        "'I am the biologist. I studied at University of Kiev, then later at Notre Dame, in Paris, I did my Ph.D. thesis on extremophiles, and then I did a lot of work on Xenobiology for Tokyo Life Sciences.'",
      );
    },
    askOptions: [
      {
        nameLost: 'lost probe',
        script() {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
          if (Quest.World.w.Ostap.lostProbe) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              '\'What does Xsansi mean by "contact lost" with that probe?\' you ask Ostap.',
            );
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Do we ever lose probes?' you ask Ostap.");
          }
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "'We are exploring the unknown, we have to expect some probes will not make it to he planet surface successfully. Perhaps a retro-rocket fails or a parachute, or it lands at the bottom of a deep hole, or is struck by lightning as it lands. We should only expect 70 to 80 percent to land successfully, I think.'",
          );
        },
        test(p: any) {
          return p.text.match(
            /(lost|destroyed) (bio|geo|bio-|geo-)?(probe|contact)/,
          );
        },
      },
      {
        regex: /babusya/,
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What does babusya?' you ask Ostap.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "'Is Ukrainian for grandmother. Professor Oliynyk was my father's mother. I think she was disappointed when he became a software engineer, and he felt bad, so encouraged us to follow in her footsteps.'",
          );
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
          trackRelationship(Quest.World.w.Ostap, 1, 'background2');
        },
        test(p: any) {
          return p.text.match(/babusya/);
        },
      },
    ],
    backgroundAskResponse() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(
        "'I'm from Nastasiv, near Ternopil.' He sees you blank face. 'In the Ukraine. I grew up with three brothers and two sisters, so it was always noisy.' He smiles. 'Both my sisters, they are biologists too. Well, one a botanist. We take after our babusya - Professor Oliynyk made one of the first synthetic cells in '82.'",
      );
    },
    baseOxygeUse: 9,
    data: [
      [
        // planet 0
        "'So, this one does not look so interesting,' he replies. 'I think we see nothing more than bacteria here - maybe not even that.'",
        "'So far, we see nothing. No life, no green. Perhaps bacteria living below the surface?'",
        "'Nothing alive here, I think commander.'",
        "'None of the probes are seeing anything. A big disappointment I think.''",
      ],
      [
        // planet 1
        "'This, I think, will be a good planet!'",
        "'Life on an alien planet! It is so wonderful, I think. And the plants, they are all purple! Maybe an effect of the light, but perhaps they use a completely different biochemistry. And I see some small animals too - but I should say animal-like. Who know what they are?' He grins.",
        "'I am so happy to see all this alien life! Such diversity! See, these are like ferns, and I think perhaps 8 or 9 meters tall. And they are  purple, so not chlorophyll like Earth plants. Like very primitive trees of Earth Devonian period. IO have seen several small creatures, and some not so small.Jointed, like arthropods, with lots of legs.'",
        "'So many purple plants! The probe has taken a sample, and it is definitely the plants are purple, not the light. I think maybe it is based on retinal, rather than chlorophyll, but the analysis is not certain - but we can check the analysis when we get to Earth.'",
        "'And the creatures!,' he continues. 'I think I saw a primitive reptile or amphibian, walking on four legs. Many of the creatures, they resemble Earth creatures from the Devonian Period; a remarkable example of parallel evolution.",
        "'The second probe, it is exploring the ocean. Even the plants there are purple - but of course, this is what we should expect, yes? The oceans are so full of life. All sorts of colourful fish-like creatures. Shellfish too! I have seen something a huge lobster-like creature. And eels - but perhaps they are more like worms? So much to see here. Such a pity we cannot land.'",
        "'So... What a wonderful planet for a biologist! The life here, it is much like Earth perhaps 400 million years ago. How I would like to know when life began here. Did it take longer to reach this stage? Or was it faster than our planet? But it is so different too! The plants use retinal to harvest energy from the sun, so have this amazing plum colour, so the biochemistry here is very different to Earth.'",
        "'Something attacked one of the probes! It's a shame it's no longer transmitting, but fascinating that there is something down there strong enough to damage a probe built to survive re-entry and landing.'",
      ],
      [
        // planet 2
        "'Not as interesting as the last one, I think.'",
        "'Not so interesting for a biologist, but maybe an archaeologist...'|'Archaeologist?'|'I think we are too late; there was life here once, but now it is gone.'",
        "'There are things a live here, but buried. There's bacteria in the soil. But it is not primitive bacteria. I cannot say for sure - I know only Earth bacteria - but I think this is highly evolved. I think some disaster, an extinction event, has wiped out virtually all life. This is all that survives.'",
        "'It is sad; a whole planet dead - or virtually dead. Sad that we missed them, sad they all died. This is why this mission is so important, so mankind can spread to the stars before something like this happens on Earth.'",
      ],
      [
        // planet 3
        "'Another dead planet, I think.'",
        "'I think perhaps simple micro-organisms, but nothing more. It is interesting, perhaps, to see how life has started.'",
        "'I think somewhere there will be early life, but it has yet to get a foothold, has yet to spread across the planet, so I find nothing yet.'",
        "'I still find no life - but I am sure it is here somewhere. The conditions are just right.'",
      ],
      [
        // planet 4
      ],
    ],

    desc: 'Ostap is a big guy; not fat, but broad and tall. He keeps his dark hair in a short ponytail.',

    loc: 'canteen',

    notes:
      'Ostap (M) is from the Ukraine (Nastasiv, nr Ternopil), 30, a gentle giant who thinks he has psychic powers; he is lactose intolerant. Biologist. Ostap handles the bio-probes probes. Starts hitting on Aada, but she is not interested. Later couples up with Ha-yoon',

    okay: "'Right, okay then.'",

    probeAction0(count: any) {
      this.msg(
        `'Okay, ${Quest.lang.toWords(count)} probe${
          count === 1 ? '' : 's'
        } to deploy...' mutters Ostap as he types at the console.`,
      );
    },

    probeAction3(count: any) {
      this.msg(
        `'Okay, ${Quest.lang.toWords(count)} probe${
          count === 1 ? '' : 's'
        } launched,' says Ostap as he stands up.`,
      );
    },

    // Probe deployment
    probeType: 'bio-probe',

    // Conversations
    probesAskResponse() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'How does a bio-probe work?' you ask Ostap.");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(
        "'I control from the lab, find a good sample. First we look at the morphology, with a simple camera. Then pick up a sample, take a slice to look at the microscopic structure - we look for cells, what is inside the cell. If we get enough cells, we can tell it to extract chemical from one type of sub-structure, then we analysis the chemicals by mass spectroscopy and the infra-red spectroscopy. We hope we find something in the library, if not, the results can be taken to Earth.'",
      );
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Okay, cool.'");
    },

    probesRemaining: 16,

    // Reactions
    reactionToUndress: 0,

    reactions: [
      {
        action() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "Ostap looks you up and down, and smiles. 'Maybe I will get naked too! So liberating. The others are okay with it?'",
          );
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'reactionToUndress' does not exist on typ... Remove this comment to see the full error message
          this.reactionToUndress = 2;
        },

        name: 'seenNaked',

        override: ['seenInUnderwear'],
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'reactionToUndress' does not exist on typ... Remove this comment to see the full error message
        test() {
          Quest.World.player.getOuterWearable('body') === false &&
            this.reactionToUndress < 2;
        },
      },
      {
        action() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('Ostap looks you up and down, and shrugs.');
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'reactionToUndress' does not exist on typ... Remove this comment to see the full error message
          this.reactionToUndress = 1;
        },

        name: 'seenInUnderwear',
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'reactionToUndress' does not exist on typ... Remove this comment to see the full error message
        test() {
          Quest.World.player.getOuterWearable('body').wear_layer === 1 &&
            this.reactionToUndress < 1;
        },
      },
    ],

    specialisation: 'biology',
    // Agenda
    // feventIsActive:function() { return this.status = "okay"; },
    stopAgenda() {
      const agendaLast = this.agenda[this.agenda.length - 1];
      if (agendaLast && /stasisPod/.test(agendaLast)) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(
          "'Ostap, forget what I said; don't get in your stasis pod yet.'",
        );
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Oh, okay.'");
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Ostap, stop what you're doing.'");
        if (this.agenda.length === 0) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Not really doing anything.'");
        } else {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Oh, right.'");
        }
      }
      this.agenda = []; // TODO!!!
    },
    tellOptions: [
      {
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'You look hot!' you say to Ostap.");
          if (Quest.World.player.female) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'If you're trying to get in my knickers, forget it.'",
            );
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'If you're trying to get in my knickers, forget it.'",
            );
          }
        },
        test(p: any) {
          return p.text.match(/.* hot/);
        },
      },
    ],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('Aada', CREW(true), {
    areaAskResponse() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'I am the geologist.'");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Okay. So how long have you been in geology?'");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Well, I've taken an interest for years....'");
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Aada' does not exist on type '{}'.
      Quest.World.w.Aada.geologyFlag2 = true;
    },
    askOptions: [
      {
        name: 'lost probe',
        script() {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
          if (Quest.World.w.Ostap.lostProbe) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              '\'What does Xsansi mean by "contact lost" with that probe?\' you ask Aada.',
            );
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'The probe was destroyed, I guess. Or too damaged to transmit anyway.'",
            );
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Any idea how that would happen?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'What am I, an expert on...? Oh, right, I am. Hmm, well I guess it could land in a volcano or something. Are they water-proof? I guess they must be. Struck by lightning... Mechanical failure... That sort of thing, I guess.'",
            );
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Do we ever lose probes?' you ask Aada.");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'Er, that's a good question. I guess we must do, we are exploring the unknown, right?'",
            );
          }
        },
        test(p: any) {
          return p.text.match(
            /(lost|destroyed) (bio|geo|bio-|geo-)?(probe|contact)/,
          );
        },
      },

      {
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "'You don't seem that... well up on geology,' you suggest to Aada.",
          );
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What's that supposed to mean?'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Aada' does not exist on type '{}'.
          if (
            Quest.World.w.Aada.geologyFlag1 &&
            Quest.World.w.Aada.geologyFlag2
          ) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "'You don't seem to know much about how the prpobes work, or have much background in geology.'",
            );
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "She sighs. 'It's true. I signed up to get away from something, and, well, I know a rock when I see it. And these systems are all automated, it's not like you need a higher degree to launch a probe. We're really just technicians. I'll be able to cope. I learn fast, you'll see.'",
            );
          }
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Aada' does not exist on type '{}'.
          Quest.World.w.Aada.geologyFlag2 = true;
        },
        test(p: any) {
          return p.text.match(/lack of*|inability/);
        },
      },
    ],
    backgroundAskResponse() {
      if (this.relationship < 3) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(
          "'I'd... rather not say. There's nothing sinister, it's just... well, I'd rather you judge me on what I do, rather than where I come from. Does that make sense?'",
        );
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(
          "'I guess...' You wonder if she might divulge more when you get to know her better.",
        );
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(
          "'I'd... Well, I suppose it doesn't matter now. I have a sister, Maikki; she's twelve years older than me. My father is a very powerful man, and he had her genetically engineered to be his perfect daughter. She was to be his legacy, the one to continue his empire. She had other ideas. Became a mercenary, living on the fringe.",
        );
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(
          "'So here I am,' she continued, 'a clone of Maikki. For years father kept me, well, prisoner in effect. I escaped, but I knew he would always be after me. This seemed the perfect getaway; no way can he reach me here, and by the time we get back to Earth, centuries will've passed. So I signed up as geologist.'",
        );
      }
    },
    baseOxygeUse: 6,
    data: [
      [
        // planet 0
        "'Our first planet!' she says excitedly. 'I can't wait to get a probe deployed down there.'",
        "'Well... Bit dull really. Lots of igneous rock - granite basically. Hopefully we'll turn up more.'",
        "'So not much there. Not seeing any sedimentary rock, so no water. The metamorphic is ancient, so volcanism stopped a long time ago. Basically, a dead planet.'",
        "'The second probe turned up some interesting sedimentary rocks, so there was water on the planet at one time. Wonder where it all went? It is not like Mars; it has an atmosphere so the water did not just boil away into space.'",
        "'Got some elemental analysis. Obviously this is from a very limited number of samples, but not seeing much at all in the way of heavy metals. I'm seeing iron, copper, nickel, but hardly anything heavier than that. Computer suggests it could be a second generation star.'|'A what?'|'Apparently our sun is a third generation star; it formed from the debris of a previous star, which in turn formed from the debris of an earlier star. The more generations, the more heavy metals. So anyway, basically it means it is probably not even worth mining.'",
      ],
      [
        // planet 1
        `'It looks much more interesting than ${PLANETS[0].starName}!' she says excitedly.`,
        "'The pictures are great, it looks so nice down there. Still trying to make sense of the geology.'",
        "'The soil samples are 20 to 70 percent organic material. The rocks are a mix of igneous and sedimentary. The sedimentary rocks has high carbon content - like limestone - so probably formed from shells and, you know, stuff like that millions of years ago.'",
        "'The soil samples are 20 to 70 percent organic material. The rocks are a mix of igneous and sedimentary. The sedimentary rocks has high carbon content - like limestone - so probably formed from shells and, you know, stuff like that millions of years ago.  The second probe found some metamorphic rock, so it is an active planet - or was until quite recently.'",
        "'The soil samples are 20 to 70 percent organic material. The rocks are a mix of igneous and sedimentary. The sedimentary rocks has high carbon content - like limestone - so probably formed from shells and stuff millions of years ago. The second probe found some metamorphic rock, so it is an active planet - or was until quite recently. All the probes indicate high levels of manganese, copper and cobalt; much higher than you would see on earth.'",
      ],
      [
        // planet 2: Kyle should come and see you about this; then this message should change
        `'Looks like another ${PLANETS[0].starName},' says Aada. 'Nothing of interest here.'`,
        `'I thought it was going to be as dull as ${PLANETS[0].starName},' says Aada, 'but I think it is quite different. It's dead now, but I think there was life on it once.'|'Based on what?'|'It's just a hunch really, but some of the rocks... they look like ruined buildings.'`,
        "'I had a probe drill into one of the strange rock formations, and it's consistent with concrete, well, more-or-less. And hollow. It broke through into an interior after about 0.3 meters.'|'What's inside?'|'I don't know! The probes don't have cameras that can extend though holes.'",
        "'I've got a probe trying to dig a big hole into the building - or whatever it is. I've got some analysis of the black dust. It is basically ash, as we thought, some organic content. Not radioactive though, which was a surprise. I was almost convinced this was the result of a nuclear war.'|'Could it be really old and the radioisotopes have all decayed.'|'It would have to be really old - the half-life of uranium-238 is over 4 billion years. If it was nuclear weapons as we know them there would some uranium-238.'",
        "'The probe managed to get though the wall, and it's definitely a building. Inside the walls and straight and square to each other. No furniture or anything, but a doorway that's about human height.'",
      ],
      [
        // planet 3
        `'Looks like another ${PLANETS[0].starName},' says Aada. 'Not much here.'`,
        "'It is quite a new planet - relatively anyway. Lots of volcanoes still as the interior churns up.'",
        "'A lot of granite-like rocks thrown up by the volcanoes, and they look to be high in heavy metals.'",
        "'As I thought, this is a young planet, no chance for sedimentary rocks to form yet, and not much metamorphic either. But a lot of metals, so good for mining. If you don't mind the toxic air!'",
      ],
      [
        // planet 4
      ],
    ],
    desc: 'Aada is a Finnish woman with features so ideal you suspect genetic engineering. Tall, with a perfect figure, she keeps her blonde hair short.',
    geologyFlag1: false,
    geologyFlag2: false,
    loc: 'girls_cabin',

    notes:
      "Aada (F) is from Finland (Oulu), 35, father genetically engineered her, planning to create a dynasty. Her older sister (effectively a lone) rebelled, so the father kept a very tight rein on this one (ef Miranda's sister). Drinks vodka a lot. Signed on as geologist, but not really her speciality - the corp was desperate and so was she. Aada handles the geo-probes.",

    okay: "'Sure, captain.'",

    probeAction0(count: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
      if (
        Quest.World.w.Xsansi.currentPlanet === 0 &&
        this.deployProbeTotal === 0
      ) {
        this.msg(
          `'Okay, ${Quest.lang.toWords(count)} probe${
            count === 1 ? '' : 's'
          }...' says Aada, looking blankly at the console for a moment. 'How hard can it be?' She starts tapping at the key board.`,
        );
      } else {
        this.msg(
          `'Another ${Quest.lang.toWords(count)} probe${
            count === 1 ? '' : 's'
          }...' says Aada. 'Easy enough.'`,
        );
      }
    },

    probeAction3(count: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
      if (
        Quest.World.w.Xsansi.currentPlanet === 0 &&
        this.deployProbeTotal === count
      ) {
        this.msg(
          `'There!' says Aada, triumphantly. '${Quest.lang.toWords(
            count,
          )} probe${
            count === 1 ? '' : 's'
          } deployed. I knew it couldn't be {i:that} tricky.'`,
        );
      } else {
        this.msg(
          `'That's another ${Quest.lang.toWords(count)} probe${
            count === 1 ? '' : 's'
          } deployed,' says Aada.`,
        );
      }
    },

    // Probe deployment
    probeType: 'geo-probe',

    // Conversations
    probesAskResponse() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'How does a geo-probe work?' you ask Aada.");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(
        "'Simple. Once deployed on the planet, I send it to an interesting rock, and it extends an arm that takes a sample.'",
      );
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(
        "'Okay, but I was wondering what sort of analysis it does. Is it infra-red, or X-ray diffraction or what?'",
      );
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Er, yeah, I expect so.'");
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Aada' does not exist on type '{}'.
      Quest.World.w.Aada.geologyFlag1 = true;
    },

    probesRemaining: 16,

    // Reactions
    reactions: [
      {
        action() {
          if (Quest.World.player.isFemale) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "Aada looks you up and down. 'Very trim!' she notes. 'I bet the guys like the view.'",
            );
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
            if (Quest.World.w.Kyle.reactionToUndress === 2) {
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg("'Well, Kyle was none too impressed.'");
            }
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(
              "Aada looks you up and down. 'Is that really appropriate for a captain,' she muses.",
            );
          }
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'reactionToUndress' does not exist on typ... Remove this comment to see the full error message
          this.reactionToUndress = 2;
        },

        name: 'seenNaked',
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'reactionToUndress' does not exist on typ... Remove this comment to see the full error message
        test() {
          Quest.World.player.getOuterWearable('body') === false &&
            this.reactionToUndress < 2;
        },
      },
    ],

    specialisation: 'geology',

    status: 'okay',
    tellOptions: [
      {
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'You look hot!' you say Aada.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'If you're trying to get in my knickers, forget it.'");
        },
        test(p: any) {
          return p.text.match(/.* hot/);
        },
      },
    ],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('Ha_yoon', CREW(true), {
    alias: 'Ha-yoon',
    areaAskResponse() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(
        "'I am the engineer. I worked for PanTech in the asteroids, so I know spaceship systems. This is a bit different as it runs unmanned for decades...'",
      );
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Apart from me,' Xsansi adds.");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(
        "'... Which doesn't change the fact there there are stasis systems for the crew and food, which I had never seen before.'",
      );
    },
    askOptions: [
      {
        name: 'ship',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'How is the ship,' you ask Ha-yoon.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Good.'"); // !!! more here!
        },
        test(p: any) {
          return p.text.match(/ship/);
        },
      },
    ],
    backgroundAskResponse() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'I am from Seoul.'");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Okay... Any family or anything?'");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'No, no family.'");
    },
    baseOxygeUse: 4,
    data: [
      ["'You should talk to the other about that.'"],
      ["'You should talk to the other about that.'"],
      ["'You should talk to the other about that.'"],
      ["'You should talk to the other about that.'"],
      ["'You should talk to the other about that.'"],
    ],
    desc: 'Ha-yoon is a well-respected Korean engineer, making her possibly the most important member of the crew for ensuring the ship gets back to Earth. She is the shortest of the crew, but perhaps the loudest. She has long, raven-black hair, that falls to her waist, and dark eyes.',

    loc: 'engineering3',

    notes:
      'Ha-yoon (F) is from Korean (Seoul), 28, and is on the run, after killing a couple of guys. She hopes that after all the time in space her crimes will be forgotten. Engineer.',

    okay: "'Okay,' she smiles.'",

    // Conversations
    probesAskResponse() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'How do the probe works?' you ask Ha-yoon.");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(
        "'i don't know about the analyse, but each probe is contained in an ablative shell, which is sheds as it descends, with the impact slowed by a combination of parachutes and retro-rockets. Once on the surface, the autonomous probe will start collecting samples, following its programming, moving on crawler tracks. They also have a limited amount of propellent to jump them out of holes.'",
      );
    },

    // Reactions
    reactions: [
      {
        action() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(
            "'Captain!' exclaims Ha-yoon when she sees you naked.{ifNot:player:isFemale: 'I'm sure we don't need to see {i:that}!'}",
          );
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'reactionToUndress' does not exist on typ... Remove this comment to see the full error message
          this.reactionToUndress = 2;
        },

        name: 'seenNaked',
        // ts-error-fixed ts-migrate(7023) FIXME: 'test' implicitly has return type 'any' because it... Remove this comment to see the full error message
        test() {
          return (
            Quest.World.player.getOuterWearable('body') === false &&
            this.reactionToUndress < 2
          );
        },
      },
    ],

    specialisation: 'engineering',
    tellOptions: [
      {
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'You look hot!' you say Ha-yoon.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'If you're trying to get in my knickers, forget it.'");
        },
        test(p: any) {
          return p.text.match(/.* hot/);
        },
      },
    ],
  });

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
  const NPCS = [
    Quest.World.w.Ostap,
    Quest.World.w.Aada,
    Quest.World.w.Kyle,
    Quest.World.w.Ha_yoon,
  ];

  for (const npc of NPCS) {
    createTopics(npc);
    npc.status = 100;
    for (let i = 0; i < 4; i++) npc[`rank${i}`] = 0;
  }
};
