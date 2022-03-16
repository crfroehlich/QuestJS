// weather

/*

precipitation - rain/snow/sleet
wind
thunder/lightning
cloud
fog

weather
name
getNumberOfTurns
getNextWeather
getDescription

currentWeatherName
currentWeatherCount
currentWeatherTotal

  ___   _   _   ____     ___   _____      _______     ___
 / _ \ | | | | |  __|  / ___| |_   _|      |__   __|  / ___|
| | | || | | | | |_   | |__     | |           | |    | |__
| | | || | | | |  _|   \__ \    | |           | |     \__ \
| | | || |_| | | |__   ___| |   | |         __| |     ___| |
 \__/\_\\___/  |____| |____/    |_|        |___/     |____/
*/

// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '() => void' is not assignable to... Remove this comment to see the full error message
Quest.Settings.settings.afterTurn.push(() => {
  if (Quest.World.player.currentWeatherDisabled) return;
  if (Quest.World.player.currentWeatherName) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    weatherTypes[Quest.World.player.currentWeatherName].turn();
  } else {
    Quest.World.player.currentWeatherName  = Object.keys(weatherTypes)[0];
    Quest.World.player.currentWeatherCount = 0;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    Quest.World.player.currentWeatherTotal = weatherTypes[Quest.World.player.currentWeatherName].getNumberOfTurns();
  }
});

const weatherTypes = {};

class Weather {
  getNext: any;

  name: any;

  ongoing: any;

  wetness: any;

  constructor(name: any, data: any) {
    this.name = name;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    for (const key in data) this[key] = data[key];
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (weatherTypes[name]) return Quest.IO.errormsg(`Two weather types called "${name}".`);
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    weatherTypes[name] = this;
  }

  turn() {
    Quest.World.player.currentWeatherCount++;
    if (this.wetness) {
      if (!Quest.World.player.currentWeatherWetness) Quest.World.player.currentWeatherWetness = 0;
      Quest.World.player.currentWeatherWetness += this.wetness;
      if (this.wetness > 100) this.wetness = 100;
      if (this.wetness < 0) this.wetness = 0;
      if (this.wetness > 80) this.wetness--;
      if (this.wetness > 60) this.wetness--;
    }
    if (Quest.World.player.currentWeatherCount >= Quest.World.player.currentWeatherTotal) {
      const currentName = this.getNext();
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const current                          = weatherTypes[currentName];
      Quest.World.player.currentWeatherName  = currentName;
      Quest.World.player.currentWeatherCount = 0;
      Quest.World.player.currentWeatherTotal = current.getNumberOfTurns();
      if (current.start) current.start(this.name);
    } else if (this.ongoing) this.ongoing();
  }

  outside(includeVisible: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'weatherReportsAssumeYes' does not exist ... Remove this comment to see the full error message
    if (Quest.Settings.settings.weatherReportsAssumeYes && Quest.World.currentLocation.noWeather) return false;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'weatherReportsAssumeYes' does not exist ... Remove this comment to see the full error message
    if (!Quest.Settings.settings.weatherReportsAssumeYes && !Quest.World.currentLocation.yesWeather) return false;
    if (includeVisible) return true;
    return !Quest.World.currentLocation.weatherModifier;
  }

  report(s: any, options: any) {
    if (!this.outside(true)) return false;
    if (Quest.World.currentLocation.weatherModifier) s = Quest.World.currentLocation.weatherModifier.replace('#', s);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    Quest.IO.msg(s, options);
    return true;
  }

  getCloudCover() {
    return 100;
  }
}

new Weather('hot', {
  getCloudCover() {
    return 0;
  },

  getDescription() {
    return 'It is hot!';
  },

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
  getNext() {
    return Quest.Random.rndm.fromArray(['hot', 'cloudingOver', 'stormPrelude']);
  },

  getNumberOfTurns() {
    return 3;
  },
  wetness: -1,
});
new Weather('cloudingOver', {
  getCloudCover() {
    return Math.round(Quest.World.player.currentWeatherCount / Quest.World.player.currentWeatherTotal * 100);
  },

  getDescription() {
    return 'It is getting cloudy.';
  },

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
  getNext() {
    return Quest.Random.rndm.fromArray(['rain', 'clearing', 'drizzle', 'cloudy']);
  },

  getNumberOfTurns() {
    return 3;
  },
  start() {
    this.report('It is starting to get cloudy.');
  },
});
new Weather('rain', {
  getDescription() {
    return 'It is raining.';
  },

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
  getNext() {
    return Quest.Random.rndm.fromArray(['rain', 'clearing', 'cloudy']);
  },

  getNumberOfTurns() {
    return 3;
  },
  start() {
    this.report('It is starting to rain.');
  },
  wetness: 2,
});
new Weather('cloudy', {
  getDescription() {
    return 'It is raining.';
  },

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
  getNext() {
    return Quest.Random.rndm.fromArray(['rain', 'clearing', 'cloudy']);
  },

  getNumberOfTurns() {
    return 3;
  },
  start() {
    this.report('It is starting to rain.');
  },
  wetness: 2,
});
new Weather('drizzle', {
  getDescription() {
    return 'There is a very light fall of rain; nt much more than mist really.';
  },

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
  getNext() {
    return Quest.Random.rndm.fromArray(['rain', 'clearing', 'drizzle', 'cloudy']);
  },

  getNumberOfTurns() {
    return 3;
  },
  start() {
    this.report('It is starting to drizzle.');
  },
  wetness: 1,
});
new Weather('clearing', {
  getCloudCover() {
    return 100 - Math.round(Quest.World.player.currentWeatherCount / Quest.World.player.currentWeatherTotal * 100);
  },

  getDescription() {
    return 'The sky is clearing.';
  },

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
  getNext() {
    return Quest.Random.rndm.fromArray(['hot', 'cloudingOver']);
  },

  getNumberOfTurns() {
    return 3;
  },
  start(previous: any) {
    if (previous === 'rain') this.report('The rain stops.');
  },
});
new Weather('clearingToHot', {
  getDescription() {
    return 'The sky is clearing.';
  },
  getNext() {
    return 'hot';
  },
  getNumberOfTurns() {
    return 3;
  },
  start(previous: any) {
    this.report(previous === 'rain' ? 'The rain stops, and the clouds are clearing.' : 'The clouds are clearing, it is going to get warm.');
  },
});
new Weather('stormPrelude', {
  getDescription() {
    return 'It is getting cloudy, and the wind is picking up. A storm is coming.';
  },

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
  getNext() {
    return Quest.Random.rndm.fromArray(['storm']);
  },

  getNumberOfTurns() {
    return 3;
  },
  start() {
    this.report('It is starting to get cloudy.');
  },
});
new Weather('storm', {
  getDescription() {
    return 'It is raining hard; the wind is howling.';
  },

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
  getNext() {
    return Quest.Random.rndm.fromArray(['rain', 'clearing']);
  },

  getNumberOfTurns() {
    return 3;
  },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'chance' does not exist on type '{ buffer... Remove this comment to see the full error message
  ongoing() {
    if (Quest.Random.rndm.chance(10)) this.report('A flash of lightning illuminates the landscape, and a moment later you hear the crack of thunder.');
  },

  start() {
    this.report('Suddenly the heavens open, and the rain is coming down hard.');
  },
  wetness: 4,
});
