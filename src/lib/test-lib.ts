"use strict";

// This is not language neutral, but should not be shipping with the game, so tough

// Note that the test object was defined in Quest.Utilities.util.js

// @ts-expect-error ts-migrate(2339) FIXME: Property 'resetOnCompletion' does not exist on typ... Remove this comment to see the full error message
test.resetOnCompletion = true
// @ts-expect-error ts-migrate(2339) FIXME: Property 'saveFilename' does not exist on type '{}... Remove this comment to see the full error message
test.saveFilename = 'unit-test-save-file'

// @ts-expect-error ts-migrate(2339) FIXME: Property 'runTests' does not exist on type '{}'.
test.runTests = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
  test.testOutput = []
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  test.totalCount = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'failCount' does not exist on type '{}'.
  test.failCount = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  test.subCount = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentTitle' does not exist on type '{}... Remove this comment to see the full error message
  test.currentTitle = "Not specified"
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveFilename' does not exist on type '{}... Remove this comment to see the full error message
  localStorage.setItem(saveLoad.getName(test.saveFilename), saveLoad.saveTheWorld('Start point saved for unit testing'))
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
  const time = parseInt(Date.now())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'tests' does not exist on type '{}'.
  test.tests()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'results' does not exist on type '{}'.
  test.results(time)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'resetOnCompletion' does not exist on typ... Remove this comment to see the full error message
  if (this.resetOnCompletion) test.start("All done")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveFilename' does not exist on type '{}... Remove this comment to see the full error message
  localStorage.removeItem(saveLoad.getName(test.saveFilename))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterFinish' does not exist on type '{}'... Remove this comment to see the full error message
  if (test.afterFinish) test.afterFinish(test.failCount === 0)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateUIItems' does not exist on type '{... Remove this comment to see the full error message
  io.updateUIItems()
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'start' does not exist on type '{}'.
test.start = function (title: any, filename = test.saveFilename) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  this.title(title)
  const s = localStorage.getItem(saveLoad.getName(filename))
  if (s != null) {
    saveLoad.loadTheWorld(s, 4)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterLoad' does not exist on type '{ per... Remove this comment to see the full error message
    if (Quest.Settings.settings.afterLoad) Quest.Settings.settings.afterLoad(filename)
  }
  else {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg("Load failed: File not found: " + filename);
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
test.title = function (title: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  test.subCount = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentTitle' does not exist on type '{}... Remove this comment to see the full error message
  test.currentTitle = title
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'printTitles' does not exist on type '{}'... Remove this comment to see the full error message
  if (test.printTitles) log(title)
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
test.printTitle = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentTitle' does not exist on type '{}... Remove this comment to see the full error message
  debugmsg(test.currentTitle + ": Error (test " + test.subCount + ")")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'failCount' does not exist on type '{}'.
  test.failCount++
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
test.assertCmd = function (cmdStr: any, expected: any, extraOutput: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'logCommand' does not exist on type '{}'.
  if (test.logCommand) test.logCommand(cmdStr)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
  test.assertOut(expected, function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
    parser.parse(cmdStr)
  }, extraOutput)
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'assertSPCmd' does not exist on type '{}'... Remove this comment to see the full error message
test.assertSPCmd = function (item: any, verb: any, expected: any, extraOutput: any) {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  const cmdStr = verb + ' ' + Quest.lang.getName(item)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'logCommand' does not exist on type '{}'.
  if (test.logCommand) test.logCommand(cmdStr)

  const list = item.getVerbs()
  if (expected) {
    log(list)
    log(Quest.Utilities.sentenceCase(verb))
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'verbListIncludes' does not exist on type... Remove this comment to see the full error message
    if (test.verbListIncludes(list, verb)) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
      test.assertOut(expected, function () {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
        parser.parse(cmdStr)
      }, extraOutput)
    }
    else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentTitle' does not exist on type '{}... Remove this comment to see the full error message
      debugmsg(test.currentTitle + ": Error (test " + test.subCount + ")")
      debugmsg("Expected this to be allowed")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
      test.totalCount++
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
      test.subCount++
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'failCount' does not exist on type '{}'.
      test.failCount++
    }
  }
  else {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
    test.totalCount++
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
    test.subCount++
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'verbListIncludes' does not exist on type... Remove this comment to see the full error message
    if (test.verbListIncludes(list, verb)) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentTitle' does not exist on type '{}... Remove this comment to see the full error message
      debugmsg(test.currentTitle + ": Error (test " + test.subCount + ")")
      debugmsg("Expected this NOT to be allowed")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'failCount' does not exist on type '{}'.
      test.failCount++
    }
  }

}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'verbListIncludes' does not exist on type... Remove this comment to see the full error message
test.verbListIncludes = function (list: any, verb: any) {
  verb = Quest.Utilities.sentenceCase(verb)
  for (const el of list) {
    if (el === verb) return true
    if (el.action === verb) return true
  }
  return false
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'function' does not exist on type '{}'.
test.function = function (f: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
  test.testOutput = []
  f()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
  return test.testOutput
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
test.assertOut = function (expected: any, f: any, extraOutput: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  test.totalCount++
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  test.subCount++
  if (!Array.isArray(expected)) {
    expected = [expected]
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
  test.testOutput = []
  f()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = false

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
  if (test.testOutput.length === expected.length && test.testOutput.every(function (value: any, index: any) {
    if (typeof expected[index] === "string") {
      return value === expected[index]
    }
    else {
      return expected[index].test(value)
    }
  })) {
    //debugmsg(".")
  }
  else {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle();
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
    for (let i = 0; i < Math.max(test.testOutput.length, expected.length); i++) {
      if (typeof expected[i] === "string") {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
        if (expected[i] !== test.testOutput[i]) {
          debugmsg("Expected (A): " + expected[i])
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
          debugmsg("...Found (A): " + test.testOutput[i])
          debugmsg(" ")
          if (extraOutput) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
            if (typeof expected[i] === "string" && typeof test.testOutput[i] === "string") {
              for (let j = 0; j < expected[i].length; j++) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
                if (expected[i][j] !== test.testOutput[i][j]) {
                  console.log("Mismatch at position: " + j)
                  console.log("Expected: " + expected[i].charCodeAt(j))
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
                  console.log("Found: " + test.testOutput[i].charCodeAt(j))
                }
              }
            }
            else {
              console.log("Found: type mismatch")
              console.log(typeof expected[i])
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
              console.log(typeof test.testOutput[i])
            }
          }
        }
      }
      else if (expected[i] instanceof RegExp) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
        if (test.testOutput[i] === undefined || !expected[i].test(test.testOutput[i])) {
          debugmsg("Expected: " + expected[i])
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
          debugmsg("...Found: " + test.testOutput[i])
          debugmsg(" ")
        }
      }
      else if (expected[i] === undefined) {
        debugmsg("Expected nothing")
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
        debugmsg("...Found: " + test.testOutput[i])
        debugmsg(" ")
      }
      else {
        debugmsg("Found an unrecognised type for expected (should be string or regex): " + (typeof expected[i]))
        debugmsg(" ")
      }
    }
  }
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
test.assertEqual = function (expected: any, found: any, extraOutput: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'assertMatch'.
  if (expected instanceof RegExp) return assertMatch(expected, found)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  test.totalCount++
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  test.subCount++

  if (Array.isArray(expected)) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'compare' does not exist on type '{}'.
    if (!Quest.Utilities.array.compare(expected, found)) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
      test.printTitle()
      debugmsg("Expected (A): " + expected)
      debugmsg("...Found (A): " + found)
      debugmsg(" ")
    }
  }
  else if (expected === found) {
    //debugmsg(".")
  }
  else {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle()
    debugmsg("Expected: " + expected)
    debugmsg("...Found: " + found)
    debugmsg(" ")
    if (extraOutput) {
      if (typeof expected === "string" && typeof found === "string") {
        for (let i = 0; i < expected.length; i++) {
          if (expected[i] !== found[i]) {
            console.log("Mismatch at position: " + i)
            console.log("Expected: " + expected.charCodeAt(i))
            console.log("Found: " + found.charCodeAt(i))
          }
        }
      }
    }
  }
}

// Use only for numbers; expected must not be zero, as long as the found is within 0.1% of the expected, this is pass
// @ts-expect-error ts-migrate(2339) FIXME: Property 'assertAlmostEqual' does not exist on typ... Remove this comment to see the full error message
test.assertAlmostEqual = function (expected: any, found: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  test.totalCount++
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  test.subCount++

  if (Math.abs((found - expected) / expected) < 0.001) {
    //debugmsg(".")
  }
  else {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle();
    debugmsg("Expected: " + expected)
    debugmsg("...Found: " + found)
    debugmsg(" ")
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'assertMatch' does not exist on type '{}'... Remove this comment to see the full error message
test.assertMatch = function (expected: any, found: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  test.totalCount++
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  test.subCount++
  if (expected.test(found)) {
    //debugmsg(".")
  }
  else {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle();
    debugmsg("Expected: " + expected)
    debugmsg("...Found: " + found)
    debugmsg(" ")
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'assertError' does not exist on type '{}'... Remove this comment to see the full error message
test.assertError = function (expected: any, f: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  test.totalCount++
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  test.subCount++
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
  test.errorOutput = []
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
  test.testOutput = []
  f()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
  if (test.errorOutput.length === 0) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle();
    debugmsg("Expected error: " + expected)
    debugmsg("...Found no error")
    debugmsg(" ")
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
  else if (typeof expected === 'string' && test.errorOutput[0] !== expected) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle();
    debugmsg("Expected error: " + expected)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
    debugmsg("...Found error: " + test.errorOutput[0])
    debugmsg(" ")
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
  else if (!test.errorOutput[0].match(expected)) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle();
    debugmsg("Expected error: " + expected)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
    debugmsg("...Found error: " + test.errorOutput[0])
    debugmsg(" ")
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
  delete test.errorOutput
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'assertThrow' does not exist on type '{}'... Remove this comment to see the full error message
test.assertThrow = function (f: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  test.totalCount++
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'subCount' does not exist on type '{}'.
  test.subCount++
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = true
  let flag = false
  try {
    f()
  } catch (e) {
    flag = true
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = false
  if (!flag) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
    test.printTitle();
    debugmsg("Expected an exception to be throw, and it was not")
    debugmsg(" ")
  }
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'fail' does not exist on type '{}'.
test.fail = function (msg: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'printTitle' does not exist on type '{}'.
  test.printTitle()
  debugmsg("Failure: " + msg)
  debugmsg(" ")
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'verbs' does not exist on type '{}'.
test.verbs = function (obj: any, list: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(list, obj.getVerbs())
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'results' does not exist on type '{}'.
test.results = function (time: any) {
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
  const elapsed = parseInt(Date.now()) - time
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  debugmsg("Number of tests: " + test.totalCount)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'failCount' does not exist on type '{}'.
  debugmsg("Number of fails: " + test.failCount)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'totalCount' does not exist on type '{}'.
  debugmsg("Elapsed time: " + elapsed + " ms (" + (Math.round(elapsed / test.totalCount * 10) / 10) + " ms/test)")
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'padArray' does not exist on type '{}'.
test.padArray = function (arr: any, n: any) {
  for (let i = 0; i < n; i++) arr.push(/./)
  return arr
}


// You can use this in a test to move the player silently
// @ts-expect-error ts-migrate(2339) FIXME: Property 'movePlayer' does not exist on type '{}'.
test.movePlayer = function (roomName: any) {
  player.loc = roomName
  world.update()
}
