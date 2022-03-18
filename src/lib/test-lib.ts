import { Quest } from '../types/quest';

export const { log } = console;
// This is not language neutral, but should not be shipping with the game, so tough

// Note that the test object was defined in Quest.Utilities.util.js

// ts-error-fixed ts-migrate(2339) FIXME: Property 'resetOnCompletion' does not exist on typ... Remove this comment to see the full error message
Quest.Utilities.test.resetOnCompletion = true;
// ts-error-fixed ts-migrate(2339) FIXME: Property 'saveFilename' does not exist on type '{}... Remove this comment to see the full error message
Quest.Utilities.test.saveFilename = 'unit-test-save-file';

// ts-error-fixed ts-migrate(2339) FIXME: Property 'runTests' does not exist on type '{}'.
Quest.Utilities.test.runTests = function () {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
  Quest.Utilities.test.testOutput = [];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  Quest.Utilities.test.totalCount = 0;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'failCount' does not exist on type '{}'.
  Quest.Utilities.test.failCount = 0;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  Quest.Utilities.test.subCount = 0;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'currentTitle' does not exist on type '{}... Remove this comment to see the full error message
  Quest.Utilities.test.currentTitle = 'Not specified';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'saveFilename' does not exist on type '{}... Remove this comment to see the full error message
  localStorage.setItem(Quest.SaveLoad.saveLoad.getName(Quest.Utilities.test.saveFilename), Quest.SaveLoad.saveLoad.saveTheWorld('Start point saved for unit testing'));
  // ts-error-fixed ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
  const time = parseInt(Date.now());
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'tests' does not exist on type '{}'.
  Quest.Utilities.test.tests();
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'results' does not exist on type '{}'.
  Quest.Utilities.test.results(time);
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'resetOnCompletion' does not exist on typ... Remove this comment to see the full error message
  if (this.resetOnCompletion) Quest.Utilities.test.start('All done');
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'saveFilename' does not exist on type '{}... Remove this comment to see the full error message
  localStorage.removeItem(Quest.SaveLoad.saveLoad.getName(Quest.Utilities.test.saveFilename));
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'afterFinish' does not exist on type '{}'... Remove this comment to see the full error message
  if (Quest.Utilities.test.afterFinish) Quest.Utilities.test.afterFinish(Quest.Utilities.test.failCount === 0);
  Quest.IO.io.updateUIItems();
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'start' does not exist on type '{}'.
Quest.Utilities.test.start = function (title: any, filename = Quest.Utilities.test.saveFilename) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  this.title(title);
  const s = localStorage.getItem(Quest.SaveLoad.saveLoad.getName(filename));
  if (s != null) {
    Quest.SaveLoad.saveLoad.loadTheWorld(s, 4);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'afterLoad' does not exist on type '{ per... Remove this comment to see the full error message
    if (Quest.Settings.settings.afterLoad) Quest.Settings.settings.afterLoad(filename);
  } else {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(`Load failed: File not found: ${filename}`);
  }
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
Quest.Utilities.test.title = function (title: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  Quest.Utilities.test.subCount = 0;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'currentTitle' does not exist on type '{}... Remove this comment to see the full error message
  Quest.Utilities.test.currentTitle = title;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'printTitles' does not exist on type '{}'... Remove this comment to see the full error message
  if (Quest.Utilities.test.printTitles) log(title);
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
Quest.Utilities.test.printTitle = function () {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'currentTitle' does not exist on type '{}... Remove this comment to see the full error message
  Quest.IO.debugmsg(`${Quest.Utilities.test.currentTitle}: Error (test ${Quest.Utilities.test.subCount})`);
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'failCount' does not exist on type '{}'.
  Quest.Utilities.test.failCount++;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
Quest.Utilities.test.assertCmd = function (cmdStr: any, expected: any, extraOutput: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'logCommand' does not exist on type '{}'.
  if (Quest.Utilities.test.logCommand) Quest.Utilities.test.logCommand(cmdStr);
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
  Quest.Utilities.test.assertOut(expected, () => {
    Quest.Parser.parser.parse(cmdStr);
  }, extraOutput);
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'assertSPCmd' does not exist on type '{}'... Remove this comment to see the full error message
Quest.Utilities.test.assertSPCmd = function (item: any, verb: any, expected: any, extraOutput: any) {
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  const cmdStr = `${verb} ${Quest.lang.getName(item)}`;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'logCommand' does not exist on type '{}'.
  if (Quest.Utilities.test.logCommand) Quest.Utilities.test.logCommand(cmdStr);

  const list = item.getVerbs();
  if (expected) {
    log(list);
    log(Quest.Utilities.sentenceCase(verb));
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'verbListIncludes' does not exist on type... Remove this comment to see the full error message
    if (Quest.Utilities.test.verbListIncludes(list, verb)) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
      Quest.Utilities.test.assertOut(expected, () => {
        Quest.Parser.parser.parse(cmdStr);
      }, extraOutput);
    } else {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'currentTitle' does not exist on type '{}... Remove this comment to see the full error message
      Quest.IO.debugmsg(`${Quest.Utilities.test.currentTitle}: Error (test ${Quest.Utilities.test.subCount})`);
      Quest.IO.debugmsg('Expected this to be allowed');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
      Quest.Utilities.test.totalCount++;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
      Quest.Utilities.test.subCount++;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'failCount' does not exist on type '{}'.
      Quest.Utilities.test.failCount++;
    }
  } else {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
    Quest.Utilities.test.totalCount++;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
    Quest.Utilities.test.subCount++;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'verbListIncludes' does not exist on type... Remove this comment to see the full error message
    if (Quest.Utilities.test.verbListIncludes(list, verb)) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'currentTitle' does not exist on type '{}... Remove this comment to see the full error message
      Quest.IO.debugmsg(`${Quest.Utilities.test.currentTitle}: Error (test ${Quest.Utilities.test.subCount})`);
      Quest.IO.debugmsg('Expected this NOT to be allowed');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'failCount' does not exist on type '{}'.
      Quest.Utilities.test.failCount++;
    }
  }
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'verbListIncludes' does not exist on type... Remove this comment to see the full error message
Quest.Utilities.test.verbListIncludes = function (list: any, verb: any) {
  verb = Quest.Utilities.sentenceCase(verb);
  for (const el of list) {
    if (el === verb) return true;
    if (el.action === verb) return true;
  }
  return false;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'function' does not exist on type '{}'.
Quest.Utilities.test.function = function (f: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = true;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
  test.testOutput = [];
  f();
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = false;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
  return test.testOutput;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
test.assertOut = function (expected: any, f: any, extraOutput: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  test.totalCount++;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  test.subCount++;
  if (!Array.isArray(expected)) {
    expected = [expected];
  }
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = true;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
  test.testOutput = [];
  f();
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = false;

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
  if (test.testOutput.length === expected.length && test.testOutput.every((value: any, index: any) => {
    if (typeof expected[index] === 'string') {
      return value === expected[index];
    }
    return expected[index].test(value);
  })) {
    // Quest.IO.debugmsg(".")
  } else {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle();
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
    for (let i = 0; i < Math.max(test.testOutput.length, expected.length); i++) {
      if (typeof expected[i] === 'string') {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
        if (expected[i] !== test.testOutput[i]) {
          Quest.IO.debugmsg(`Expected (A): ${expected[i]}`);
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
          Quest.IO.debugmsg(`...Found (A): ${test.testOutput[i]}`);
          Quest.IO.debugmsg(' ');
          if (extraOutput) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
            if (typeof expected[i] === 'string' && typeof test.testOutput[i] === 'string') {
              for (let j = 0; j < expected[i].length; j++) {
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
                if (expected[i][j] !== test.testOutput[i][j]) {
                  console.log(`Mismatch at position: ${j}`);
                  console.log(`Expected: ${expected[i].charCodeAt(j)}`);
                  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
                  console.log(`Found: ${test.testOutput[i].charCodeAt(j)}`);
                }
              }
            } else {
              console.log('Found: type mismatch');
              console.log(typeof expected[i]);
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
              console.log(typeof test.testOutput[i]);
            }
          }
        }
      } else if (expected[i] instanceof RegExp) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
        if (test.testOutput[i] === undefined || !expected[i].test(test.testOutput[i])) {
          Quest.IO.debugmsg(`Expected: ${expected[i]}`);
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
          Quest.IO.debugmsg(`...Found: ${test.testOutput[i]}`);
          Quest.IO.debugmsg(' ');
        }
      } else if (expected[i] === undefined) {
        Quest.IO.debugmsg('Expected nothing');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
        Quest.IO.debugmsg(`...Found: ${test.testOutput[i]}`);
        Quest.IO.debugmsg(' ');
      } else {
        Quest.IO.debugmsg(`Found an unrecognised type for expected (should be string or regex): ${typeof expected[i]}`);
        Quest.IO.debugmsg(' ');
      }
    }
  }
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
test.assertEqual = function (expected: any, found: any, extraOutput: any) {
  // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'assertMatch'.
  if (expected instanceof RegExp) return assertMatch(expected, found);

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  test.totalCount++;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  test.subCount++;

  if (Array.isArray(expected)) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'compare' does not exist on type '{}'.
    if (!Quest.Utilities.array.compare(expected, found)) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
      test.printTitle();
      Quest.IO.debugmsg(`Expected (A): ${expected}`);
      Quest.IO.debugmsg(`...Found (A): ${found}`);
      Quest.IO.debugmsg(' ');
    }
  } else if (expected === found) {
    // Quest.IO.debugmsg(".")
  } else {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle();
    Quest.IO.debugmsg(`Expected: ${expected}`);
    Quest.IO.debugmsg(`...Found: ${found}`);
    Quest.IO.debugmsg(' ');
    if (extraOutput) {
      if (typeof expected === 'string' && typeof found === 'string') {
        for (let i = 0; i < expected.length; i++) {
          if (expected[i] !== found[i]) {
            console.log(`Mismatch at position: ${i}`);
            console.log(`Expected: ${expected.charCodeAt(i)}`);
            console.log(`Found: ${found.charCodeAt(i)}`);
          }
        }
      }
    }
  }
};

// Use only for numbers; expected must not be zero, as long as the found is within 0.1% of the expected, this is pass
// ts-error-fixed ts-migrate(2339) FIXME: Property 'assertAlmostEqual' does not exist on typ... Remove this comment to see the full error message
test.assertAlmostEqual = function (expected: any, found: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  test.totalCount++;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  test.subCount++;

  if (Math.abs((found - expected) / expected) < 0.001) {
    // Quest.IO.debugmsg(".")
  } else {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle();
    Quest.IO.debugmsg(`Expected: ${expected}`);
    Quest.IO.debugmsg(`...Found: ${found}`);
    Quest.IO.debugmsg(' ');
  }
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'assertMatch' does not exist on type '{}'... Remove this comment to see the full error message
test.assertMatch = function (expected: any, found: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  test.totalCount++;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  test.subCount++;
  if (expected.test(found)) {
    // Quest.IO.debugmsg(".")
  } else {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle();
    Quest.IO.debugmsg(`Expected: ${expected}`);
    Quest.IO.debugmsg(`...Found: ${found}`);
    Quest.IO.debugmsg(' ');
  }
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'assertError' does not exist on type '{}'... Remove this comment to see the full error message
test.assertError = function (expected: any, f: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  test.totalCount++;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  test.subCount++;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = true;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
  test.errorOutput = [];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
  test.testOutput = [];
  f();
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
  if (test.errorOutput.length === 0) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle();
    Quest.IO.debugmsg(`Expected error: ${expected}`);
    Quest.IO.debugmsg('...Found no error');
    Quest.IO.debugmsg(' ');
  }
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
  else if (typeof expected === 'string' && test.errorOutput[0] !== expected) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle();
    Quest.IO.debugmsg(`Expected error: ${expected}`);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
    Quest.IO.debugmsg(`...Found error: ${test.errorOutput[0]}`);
    Quest.IO.debugmsg(' ');
  }
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
  else if (!test.errorOutput[0].match(expected)) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle();
    Quest.IO.debugmsg(`Expected error: ${expected}`);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
    Quest.IO.debugmsg(`...Found error: ${test.errorOutput[0]}`);
    Quest.IO.debugmsg(' ');
  }
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = false;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
  delete test.errorOutput;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'assertThrow' does not exist on type '{}'... Remove this comment to see the full error message
test.assertThrow = function (f: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  test.totalCount++;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  test.subCount++;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = true;
  let flag                     = false;
  try {
    f();
  } catch (e) {
    flag = true;
  }
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = false;
  if (!flag) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle();
    Quest.IO.debugmsg('Expected an exception to be throw, and it was not');
    Quest.IO.debugmsg(' ');
  }
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'fail' does not exist on type '{}'.
test.fail = function (msg: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
  test.printTitle();
  Quest.IO.debugmsg(`Failure: ${msg}`);
  Quest.IO.debugmsg(' ');
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'verbs' does not exist on type '{}'.
test.verbs = function (obj: any, list: any) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(list, obj.getVerbs());
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'results' does not exist on type '{}'.
test.results = function (time: any) {
  // ts-error-fixed ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
  const elapsed = parseInt(Date.now()) - time;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  Quest.IO.debugmsg(`Number of tests: ${test.totalCount}`);
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'failCount' does not exist on type '{}'.
  Quest.IO.debugmsg(`Number of fails: ${test.failCount}`);
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  Quest.IO.debugmsg(`Elapsed time: ${elapsed} ms (${Math.round(elapsed / test.totalCount * 10) / 10} ms/test)`);
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'padArray' does not exist on type '{}'.
test.padArray = function (arr: any, n: any) {
  for (let i = 0; i < n; i++) arr.push(/./);
  return arr;
};

// You can use this in a test to move the player silently
// ts-error-fixed ts-migrate(2339) FIXME: Property 'movePlayer' does not exist on type '{}'.
test.movePlayer = function (roomName: any) {
  Quest.World.player.loc = roomName;
  Quest.World.world.update();
};
