"use strict"

//test.printTitles = true
// @ts-expect-error ts-migrate(2339) FIXME: Property 'resetOnCompletion' does not exist on typ... Remove this comment to see the full error message
test.resetOnCompletion = false

// @ts-expect-error ts-migrate(2339) FIXME: Property 'tests' does not exist on type '{}'.
test.tests = function () {

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Parser.parser.scoreObjectMatch");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(55, Quest.Parser.parser.scoreObjectMatch("me", Quest.World.w.Buddy, {}));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(-1, Quest.Parser.parser.scoreObjectMatch("me fkh", Quest.World.w.Buddy, {}));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(-1, Quest.Parser.parser.scoreObjectMatch("xme", Quest.World.w.Buddy, {}));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(60, Quest.Parser.parser.scoreObjectMatch("flashlight", Quest.World.w.flashlight, {}));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(16, Quest.Parser.parser.scoreObjectMatch("f", Quest.World.w.flashlight, {}));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(18, Quest.Parser.parser.scoreObjectMatch("fla", Quest.World.w.flashlight, {}));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(55, Quest.Parser.parser.scoreObjectMatch("torch", Quest.World.w.flashlight, {}));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(75, Quest.Parser.parser.scoreObjectMatch("torch", Quest.World.w.flashlight, { attName: 'lightSource' }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(55, Quest.Parser.parser.scoreObjectMatch("torch", Quest.World.w.flashlight, { attName: 'silly' }));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(55, Quest.Parser.parser.scoreObjectMatch("torch", Quest.World.w.flashlight, { items: ['glass_cabinet'] }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(100, Quest.Parser.parser.scoreObjectMatch("torch", Quest.World.w.flashlight, { items: ['glass_cabinet', 'flashlight'] }));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(60, Quest.Parser.parser.scoreObjectMatch("glass cabinet", Quest.World.w.glass_cabinet, {}));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(50, Quest.Parser.parser.scoreObjectMatch("glass", Quest.World.w.glass_cabinet, {}));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(50, Quest.Parser.parser.scoreObjectMatch("cabinet", Quest.World.w.glass_cabinet, {}));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(3, Quest.Parser.parser.scoreObjectMatch("cab", Quest.World.w.glass_cabinet, {}));


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Plurals")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('houses', Quest.lang.getPlural('house'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('rays', Quest.lang.getPlural('ray'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('ries', Quest.lang.getPlural('ry'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('stadia', Quest.lang.getPlural('stadium'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('tosses', Quest.lang.getPlural('toss'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('potatoes', Quest.lang.getPlural('potato'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('analyses', Quest.lang.getPlural('analysis'))




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Parser.parser.itemSetup")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.World.w.ham_and_cheese_sandwich.parserOptionsSet)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'itemSetup' does not exist on type '{}'.
  Quest.Parser.parser.itemSetup(Quest.World.w.ham_and_cheese_sandwich)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.World.w.ham_and_cheese_sandwich.parserOptionsSet)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('ham and cheese sandwich', Quest.World.w.ham_and_cheese_sandwich.parserItemName)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['egg', 'mayo'], Quest.World.w.ham_and_cheese_sandwich.synonyms)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["ham", "ham and", "ham and cheese", "ham and sandwich", "ham cheese", "ham cheese sandwich", "ham sandwich", "and", "and cheese", "and cheese sandwich", "and sandwich", "cheese", "cheese sandwich", "sandwich"], Quest.World.w.ham_and_cheese_sandwich.parserItemNameParts)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Parser.parser.findInList")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([], Quest.Parser.parser.findInList('book', [Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.glass_cabinet], {}))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.book], Quest.Parser.parser.findInList('book', [Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book], {}))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.Buddy, Quest.World.w.book, Quest.World.w.boots], Quest.Parser.parser.findInList('b', [Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book, Quest.World.w.boots], {}))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.book], Quest.Parser.parser.findInList('b', [Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book], { attName: 'read' }))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Parser.parser.findInScope")
  let parserResult
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'findInScope' does not exist on type '{}'... Remove this comment to see the full error message
  parserResult = Quest.Parser.parser.findInScope('book', [[Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.glass_cabinet]], {})
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, parserResult[0].length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, parserResult[1])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'findInScope' does not exist on type '{}'... Remove this comment to see the full error message
  parserResult = Quest.Parser.parser.findInScope('b', [[], [Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book]], { attName: 'read' })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserResult[0].length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('book', parserResult[0][0].name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserResult[1])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'findInScope' does not exist on type '{}'... Remove this comment to see the full error message
  parserResult = Quest.Parser.parser.findInScope('b', [[Quest.World.w.boots], [Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book]], { attName: 'read' })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserResult[0].length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('boots', parserResult[0][0].name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(2, parserResult[1])


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Parser.parser.findInScope with it")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
  Quest.Parser.parser.pronouns = { it: Quest.World.w.book, him: Quest.World.w.Buddy }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'findInScope' does not exist on type '{}'... Remove this comment to see the full error message
  parserResult = Quest.Parser.parser.findInScope('it', [[Quest.World.w.boots], [Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book]], { attName: 'read' })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserResult[0].length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('book', parserResult[0][0].name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserResult[1])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'findInScope' does not exist on type '{}'... Remove this comment to see the full error message
  parserResult = Quest.Parser.parser.findInScope('him', [[Quest.World.w.boots], [Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book]], { attName: 'read' })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserResult[0].length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Buddy', parserResult[0][0].name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserResult[1])


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Parser.parser.matchToName 1")
  let parserObjs: any = []
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'matchToName' does not exist on type '{}'... Remove this comment to see the full error message
  parserResult = Quest.Parser.parser.matchToName('book', [[Quest.World.w.boots], [Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book]], { attName: 'read' }, parserObjs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserResult)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserObjs.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.book], parserObjs[0])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Parser.parser.matchToName 2")
  parserObjs = []
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'matchToName' does not exist on type '{}'... Remove this comment to see the full error message
  parserResult = Quest.Parser.parser.matchToName('boo', [[Quest.World.w.boots], [Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book]], { attName: 'read' }, parserObjs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(2, parserResult)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserObjs.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.boots], parserObjs[0])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Parser.parser.matchToName 3")
  parserObjs = []
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'matchToName' does not exist on type '{}'... Remove this comment to see the full error message
  parserResult = Quest.Parser.parser.matchToName('boo', [[], [Quest.World.w.boots, Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book]], {}, parserObjs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserResult)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserObjs.length)  // matched one word
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(2, parserObjs[0].length)  // found two possible items
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.boots, Quest.World.w.book], parserObjs[0])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Parser.parser.matchToNames 1")
  parserResult = { objects: [], score: 0 }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'matchToNames' does not exist on type '{}... Remove this comment to see the full error message
  Quest.Parser.parser.matchToNames('boo', [[], [Quest.World.w.boots, Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book]], {}, parserResult)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserResult.score)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.boots, Quest.World.w.book], parserResult.objects[0][0])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Parser.parser.matchToNames 2")
  parserResult = { objects: [], score: 0 }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'matchToNames' does not exist on type '{}... Remove this comment to see the full error message
  Quest.Parser.parser.matchToNames('ham and cheese', [[], [Quest.World.w.boots, Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book]], { multiple: true }, parserResult)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserResult.score)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.ham_and_cheese_sandwich], parserResult.objects[0][0])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Parser.parser.matchToNames 3")
  parserResult = { objects: [], score: 0 }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'matchToNames' does not exist on type '{}... Remove this comment to see the full error message
  Quest.Parser.parser.matchToNames('book and coin', [[], [Quest.World.w.boots, Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book, Quest.World.w.coin]], { multiple: true }, parserResult)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserResult.score)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.book], parserResult.objects[0][0])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.coin], parserResult.objects[0][1])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Parser.parser.matchToNames 4")
  parserResult = { objects: [], score: 0 }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'matchToNames' does not exist on type '{}... Remove this comment to see the full error message
  Quest.Parser.parser.matchToNames('book and coin', [[], [Quest.World.w.boots, Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book]], { multiple: true }, parserResult)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.Parser.parser.NO_OBJECT, parserResult.score)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Parser.parser.matchToNames 5")
  parserResult = { objects: [], score: 0 }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'matchToNames' does not exist on type '{}... Remove this comment to see the full error message
  Quest.Parser.parser.matchToNames('book and coin', [[], [Quest.World.w.boots, Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book, Quest.World.w.coin]], {}, parserResult)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.Parser.parser.DISALLOWED_MULTIPLE, parserResult.score)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Parser.parser.matchToNames 5")
  parserResult = { objects: [], score: 0 }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'matchToNames' does not exist on type '{}... Remove this comment to see the full error message
  Quest.Parser.parser.matchToNames('ham and cheese', [[], [Quest.World.w.boots, Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.Buddy, Quest.World.w.book]], {}, parserResult)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, parserResult.score)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.ham_and_cheese_sandwich], parserResult.objects[0][0])





  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Utilities.util.clamp")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(4, Quest.Utilities.util.clamp(4, 0, 10))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, Quest.Utilities.util.clamp(-4, 0, 10))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(10, Quest.Utilities.util.clamp(14, 0, 10))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, Quest.Utilities.util.clamp(0, 0, 10))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(10, Quest.Utilities.util.clamp(10, 0, 10))




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Utilities.sentenceCase");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text", Quest.Utilities.sentenceCase("simple text"));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Utilities.titleCase");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple Text", Quest.Utilities.titleCase("simple text"));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("getName");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("book", Quest.lang.getName(Quest.World.w.book));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("the book", Quest.lang.getName(Quest.World.w.book, { article: Quest.Utilities.DEFINITE }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("A book", Quest.lang.getName(Quest.World.w.book, { article: Quest.Utilities.INDEFINITE, capital: true }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
  Quest.World.w.book.owner = 'Buddy'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("your book", Quest.lang.getName(Quest.World.w.book, { article: Quest.Utilities.DEFINITE }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Your book", Quest.lang.getName(Quest.World.w.book, { article: Quest.Utilities.INDEFINITE, capital: true }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
  Quest.World.w.book.owner = 'Kyle'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle's book", Quest.lang.getName(Quest.World.w.book, { article: Quest.Utilities.DEFINITE }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle's book", Quest.lang.getName(Quest.World.w.book, { article: Quest.Utilities.INDEFINITE, capital: true }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
  delete Quest.World.w.book.owner

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("you", Quest.lang.getName(Quest.World.w.Buddy));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("You", Quest.lang.getName(Quest.World.w.Buddy, { article: Quest.Utilities.INDEFINITE, capital: true }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Five bricks", Quest.lang.getName(Quest.World.w.brick, { brick_count: 5, capital: true, article: Quest.Utilities.INDEFINITE }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("a brick", Quest.lang.getName(Quest.World.w.brick, { brick_count: 1, article: Quest.Utilities.INDEFINITE }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("seven bricks", Quest.lang.getName(Quest.World.w.brick, { loc: 'lounge', article: Quest.Utilities.INDEFINITE }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("a lot of bricks", Quest.lang.getName(Quest.World.w.brick, { brick_count: 'infinity', article: Quest.Utilities.INDEFINITE }));


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Random.rndm.fromArray");
  const ary = ["one", "two", "three"];
  let ary2: any = [];
  for (let i = 0; i < 3; i++) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
    const res = Quest.Random.rndm.fromArray(ary, true);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fail' does not exist on type '{}'.
    if (ary2.includes(res)) test.fail("ary2 already has that value");
    ary2.push(res);
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, ary.length);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Random.rndm.int");
  for (let i = 0; i < 100; i++) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'int' does not exist on type '{ buffer: n... Remove this comment to see the full error message
    const res = Quest.Random.rndm.int(10);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
    test.assertEqual(true, res >= 0 && res <= 10);
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Random.rndm.chance");
  for (let i = 0; i < 100; i++) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
    test.assertEqual(true, Quest.Random.rndm.chance(100));
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
    test.assertEqual(false, Quest.Random.rndm.chance(0));
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Random primed")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime(19)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(19, Quest.Random.rndm.int())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime([3, 8])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(11, Quest.Random.rndm.dice('2d6'))



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Utilities.array.compare");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Utilities.array.compare([1, 2, 4, 6, 7], [1, 2, 3]));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Utilities.array.compare([1, 2, 4], [1, 2, 4]));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Utilities.array.compare([Quest.World.w.coin, Quest.World.w.boots, Quest.World.w.ring], [Quest.World.w.boots, Quest.World.w.ring]));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Utilities.array.compare([Quest.World.w.boots, Quest.World.w.ring], [Quest.World.w.boots, Quest.World.w.ring]));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Utilities.array.intersection");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([1, 2], Quest.Utilities.array.intersection([1, 2, 4, 6, 7], [1, 2, 3]));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([1, 2], Quest.Utilities.array.intersection([1, 2, 4, 6, 7], [3, 2, 1]));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([], Quest.Utilities.array.intersection([], [1, 2, 3]));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([], Quest.Utilities.array.intersection([1, 2, 4, 6, 7], []));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.boots, Quest.World.w.ring], Quest.Utilities.array.intersection([Quest.World.w.coin, Quest.World.w.boots, Quest.World.w.ring], [Quest.World.w.boots, Quest.World.w.ring]));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.boots, Quest.World.w.ring], Quest.Utilities.array.intersection([Quest.World.w.boots, Quest.World.w.ring], [Quest.World.w.boots, Quest.World.w.ring]));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Utilities.array.compareUnordered");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Utilities.array.compareUnordered([1, 2, 4, 6, 7], [1, 2, 3]));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Utilities.array.compareUnordered([1, 2, 4], [1, 2, 4]));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Utilities.array.compareUnordered([4, 1, 2], [1, 2, 4]));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Utilities.array.compareUnordered([4, 1, 2, 4], [1, 2, 4]));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Utilities.array.compareUnordered([Quest.World.w.coin, Quest.World.w.boots, Quest.World.w.ring], [Quest.World.w.boots, Quest.World.w.ring]));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Utilities.array.compareUnordered([Quest.World.w.boots, Quest.World.w.ring], [Quest.World.w.boots, Quest.World.w.ring]));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Utilities.array.compareUnordered([Quest.World.w.ring, Quest.World.w.boots], [Quest.World.w.boots, Quest.World.w.ring]));



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Utilities.array.subtract");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([4, 6, 7], Quest.Utilities.array.subtract([1, 2, 4, 6, 7], [1, 2, 3]));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['4', '6', '7'], Quest.Utilities.array.subtract(['1', '2', '4', '6', '7'], ['1', '2', '3']));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([Quest.World.w.coin, Quest.World.w.boots], Quest.Utilities.array.subtract([Quest.World.w.coin, Quest.World.w.boots, Quest.World.w.ring], [Quest.World.w.ring]));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
  const testAry = [Quest.World.w.boots, Quest.World.w.book, Quest.World.w.cardboard_box]

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Utilities.array.next");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.cardboard_box, Quest.Utilities.array.next(testAry, Quest.World.w.book));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Utilities.array.next(testAry, Quest.World.w.cardboard_box));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.boots, Quest.Utilities.array.next(testAry, Quest.World.w.cardboard_box, true));


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Utilities.array.nextFlagged");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.cardboard_box, Quest.Utilities.array.nextFlagged(testAry, Quest.World.w.book, "container"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Utilities.array.nextFlagged(testAry, Quest.World.w.book, "notcontainer"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Utilities.array.nextFlagged(testAry, Quest.World.w.book, "wearable"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.boots, Quest.Utilities.array.nextFlagged(testAry, Quest.World.w.book, "wearable", true));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Utilities.array.nextFlagged(testAry, Quest.World.w.book, "notwearable", true));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Utilities.array.clone");
  const testAry2 = ['boots', 'book', 'cardboard_box', 'boots']
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['boots', 'book', 'cardboard_box', 'boots'], Quest.Utilities.array.clone(testAry2));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['boots', 'cardboard_box', 'book', 'boots'], Quest.Utilities.array.clone(testAry2, { reverse: true }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['boots', 'book', 'cardboard_box'], Quest.Utilities.array.clone(testAry2, { compress: true }));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Utilities.array.combos")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([], Quest.Utilities.array.combos([]))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['one'], Quest.Utilities.array.combos(['one']))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['one', 'one two', 'two'], Quest.Utilities.array.combos(['one', 'two']))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([
    'boots', 'boots book', 'boots book cardboard_box', 'boots book shoes', 'boots cardboard_box', 'boots cardboard_box shoes', 'boots shoes',
    'book', 'book cardboard_box', 'book cardboard_box shoes', 'book shoes',
    'cardboard_box', 'cardboard_box shoes',
    'shoes'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'combos' does not exist on type '{}'.
  ], Quest.Utilities.array.combos(['boots', 'book', 'cardboard_box', 'shoes']))


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Utilities.util.getByInterval")
  const intervals = [2, 14, 4]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, Quest.Utilities.util.getByInterval(intervals, 0))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, Quest.Utilities.util.getByInterval(intervals, 1))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, Quest.Utilities.util.getByInterval(intervals, 2))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, Quest.Utilities.util.getByInterval(intervals, 15))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(2, Quest.Utilities.util.getByInterval(intervals, 16))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(2, Quest.Utilities.util.getByInterval(intervals, 19))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Utilities.util.getByInterval(intervals, 20))



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("isUltimatelyHeldBy")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.World.w.ring.isUltimatelyHeldBy(Quest.World.w.jewellery_box))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.World.w.ring.isUltimatelyHeldBy(Quest.World.w.glass_cabinet))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.World.w.ring.isUltimatelyHeldBy(Quest.World.player))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.World.w.brick.isUltimatelyHeldBy(Quest.World.player))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'brick' does not exist on type '{}'.
  Quest.World.w.brick.countableLocs.Buddy = 3
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.World.w.brick.isUltimatelyHeldBy(Quest.World.player))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'brick' does not exist on type '{}'.
  delete Quest.World.w.brick.countableLocs.Buddy


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("exit.reverse")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'lounge' does not exist on type '{}'.
  const ex1 = Quest.World.w.lounge.east
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'lounge' does not exist on type '{}'.
  const ex2 = Quest.World.w.lounge.up
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('west', ex1.reverse())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('the east', ex1.nice())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('down', ex2.reverse())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('above', ex2.nice())


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Utilities.formatList")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('', Quest.Utilities.formatList([]))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('nothing', Quest.Utilities.formatList([], { nothing: 'nothing' }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('one', Quest.Utilities.formatList(['one']))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('one, two', Quest.Utilities.formatList(['one', 'two']))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('one and two', Quest.Utilities.formatList(['one', 'two'], { lastJoiner: 'and' }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('one, three, two', Quest.Utilities.formatList(['one', 'two', 'three']))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('one, three and two', Quest.Utilities.formatList(['one', 'two', 'three'], { lastJoiner: 'and' }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'oxfordComma' does not exist on type '{ p... Remove this comment to see the full error message
  Quest.Settings.settings.oxfordComma = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('one', Quest.Utilities.formatList(['one']))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('one and two', Quest.Utilities.formatList(['one', 'two'], { lastJoiner: 'and' }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('one, three, and two', Quest.Utilities.formatList(['one', 'two', 'three'], { lastJoiner: 'and' }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'oxfordComma' does not exist on type '{ p... Remove this comment to see the full error message
  Quest.Settings.settings.oxfordComma = false



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 1");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text", Quest.Text.processText("Simple text"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple <i>text</i>", Quest.Text.processText("Simple {i:text}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple <span style=\"color:red\">text</span>.", Quest.Text.processText("Simple {colour:red:text}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple <span style=\"color:red\">text with <i>nesting</i></span>.", Quest.Text.processText("Simple {colour:red:text with {i:nesting}}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text", Quest.Text.processText("Simple {random:text}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {if:player:someOddAtt:yes:no}"));
  Quest.World.player.someOddAtt = 67;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: 67", Quest.Text.processText("Simple text: {show:player:someOddAtt}"));
  Quest.World.player.someOddAtt = 0;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: 0", Quest.Text.processText("Simple text: {show:player:someOddAtt}"));
  Quest.World.player.someOddAtt = undefined;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: ", Quest.Text.processText("Simple text: {show:player:someOddAtt}"));

  Quest.World.player.someOddAtt = 67;

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text to show capitalisation.", Quest.Text.processText("{cap:simple text to show capitalisation.}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple Text To Show Capitalisation.", Quest.Text.processText("{title:simple text to show capitalisation.}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("SIMPLE TEXT.", Quest.Text.processText("{upper:Simple text.}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("simple text.", Quest.Text.processText("{lower:Simple text.}"));


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 2");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {if:player:someOddAtt:50:yes:no}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {if:player:someOddAtt:67:yes:no}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: ", Quest.Text.processText("Simple text: {if:player:someOddAtt:50:yes}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {if:player:someOddAtt:67:yes}"));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {ifMoreThan:player:someOddAtt:66:yes:no}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {ifMoreThan:player:someOddAtt:67:yes:no}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {ifMoreThanOrEqual:player:someOddAtt:67:yes:no}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {ifMoreThanOrEqual:player:someOddAtt:68:yes:no}"));


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {ifLessThan:player:someOddAtt:67:yes:no}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {ifLessThan:player:someOddAtt:68:yes}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {ifLessThanOrEqual:player:someOddAtt:66:yes:no}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {ifLessThanOrEqual:player:someOddAtt:67:yes}"));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 2a");
  Quest.World.player.tpTest1 = function (params: any) { return Quest.lang.toWords(2 * params.val) }
  Quest.World.player.tpTest2 = function (params: any) { return 2 * params.val }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Lara' does not exist on type '{}'.
  Quest.World.player.tpTest3 = function (params: any) { return Quest.World.w.Lara }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: sixteen", Quest.Text.processText("Simple text: {show:player:tpTest1}", { val: 8 }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {if:player:tpTest2:16:yes:no}", { val: 8 }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {if:player:tpTest2:15:yes:no}", { val: 8 }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {if:player:tpTest3:Lara:yes:no}", { val: 8 }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {if:player:tpTest3:Kyle:yes:no}", { val: 8 }))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'tpTest' does not exist on type '{ perfor... Remove this comment to see the full error message
  Quest.Settings.settings.tpTest = 9
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: 9", Quest.Text.processText("Simple text: {show:settings:tpTest}"))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: nine", Quest.Text.processText("Simple text: {number:settings:tpTest}"))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {if:settings:tpTest:9:yes:no}", { val: 8 }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {if:settings:tpTest:8:yes:no}", { val: 8 }))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 2b show");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: ", Quest.Text.processText("Simple text: {show:item:att_does_not_exist}", { item: Quest.World.w.book }))
  // Test using a function
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
  Quest.World.w.book.tpStringTest = function () { return 'testy' }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: testy", Quest.Text.processText("Simple text: {show:item:tpStringTest}", { item: Quest.World.w.book }))
  // Test using params in function
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
  Quest.World.w.book.tpStringTest = function (options: any) { return 'testy=' + options.obj.name }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: testy=Lara", Quest.Text.processText("Simple text: {show:item:tpStringTest}", { item: Quest.World.w.book, obj: Quest.World.w.Lara }))
  // Test binding for this
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
  Quest.World.w.book.tpStringTest = function (options: any) { return 'testy=' + this.name }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: testy=book", Quest.Text.processText("Simple text: {show:item:tpStringTest}", { item: Quest.World.w.book }))
  Quest.World.player.someOddAtt = true;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: true", Quest.Text.processText("Simple text: {show:player:someOddAtt}"));


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 3");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {if:player:someOddAtt:yes:no}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {ifNot:player:someOddAtt:yes:no}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: seen first time only", Quest.Text.processText("Simple text: {once:seen first time only}{notOnce:other times}"));

  const testObject = { someOddAtt: true, someOtherAttribute: 5, falseAtt: false }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {if:obj:someOddAtt:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {if:obj:someUnknownAtt:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {if:obj:someOtherAttribute:5:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {if:obj:someOtherAttribute:3:yes:no}", { obj: testObject }))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {ifIs:obj:someUnknownAtt:5:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {ifIs:obj:someOtherAttribute:5:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {ifIs:obj:someOtherAttribute:3:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {ifIs:obj:someOtherAttribute:true:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {ifIs:obj:someOddAtt:true:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {ifIs:obj:someOddAtt:false:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {ifIs:obj:someOddAtt:undefined:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {ifIs:obj:someOddThatDoesNotExistAtt:undefined:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {ifIs:obj:falseAtt:false:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {ifIs:obj:falseAtt2:false:yes:no}", { obj: testObject }))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {ifNotIs:obj:someOddAtt:undefined:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {ifNotIs:obj:someOddThatDoesNotExistAtt:undefined:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {ifNotIs:obj:falseAtt:false:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {ifNotIs:obj:falseAtt2:false:yes:no}", { obj: testObject }))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {ifPlayer:Buddy:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {ifPlayer:Lara:yes:no}", { obj: testObject }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: yes", Quest.Text.processText("Simple text: {ifPlayer:obj:yes:no}", { obj: Quest.World.w.Buddy }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: no", Quest.Text.processText("Simple text: {ifPlayer:obj:yes:no}", { obj: Quest.World.w.Lara }))




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 4");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: other times", Quest.Text.processText("Simple text: {once:seen first time only}{notOnce:other times}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: other times", Quest.Text.processText("Simple text: {once:seen first time only}{notOnce:other times}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text: p2=red", Quest.Text.processText("Simple text: p2={show:p2}", { p1: "yellow", p2: "red" }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text2: seen first time only", Quest.Text.processText("Simple text2: {once:seen first time only:other times}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Simple text2: other times", Quest.Text.processText("Simple text2: {once:seen first time only:other times}"));



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 5: nm, nv, etc.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is a bear.", Quest.Text.processText("{nv:chr:be} a bear.", { chr: 'Kyle' }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is a bear.", Quest.Text.processText("{nv:chr:be} a bear.", { chr: Quest.World.w.Kyle }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is your bear.", Quest.Text.processText("{nv:Kyle:be} {pa:Buddy} bear."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is her bear.", Quest.Text.processText("{nv:Kyle:be} {pa:Lara} bear."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("There is Kyle.", Quest.Text.processText("There is {nm:chr:a}.", { chr: Quest.World.w.Kyle }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("There is a book.", Quest.Text.processText("There is {nm:chr:a}.", { chr: Quest.World.w.book }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is here.", Quest.Text.processText("{nm:chr:the:true} is here.", { chr: Quest.World.w.Kyle }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("The book is here.", Quest.Text.processText("{nm:chr:the:true} is here.", { chr: Quest.World.w.book }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("It is your book.", Quest.Text.processText("It is {nms:chr:the} book.", { chr: Quest.World.player }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("It is Kyle's book.", Quest.Text.processText("It is {nms:chr:the} book.", { chr: Quest.World.w.Kyle }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("There are seven bricks.", Quest.Text.processText("There are {nm:item:count}.", { item: Quest.World.w.brick, brick_count: 7 }));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 5a: nm with Quest.Templates.COUNTABLE.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Five bricks", Quest.Text.processText("{nm:item:count:true}", { item: Quest.World.w.brick, brick_count: 5 }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Five bricks", Quest.Text.processText("{nm:item:a:true}", { item: Quest.World.w.brick, brick_count: 5 }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("five bricks", Quest.Text.processText("{nm:item:a}", { item: Quest.World.w.brick, item_count: 5 }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("a brick", Quest.Text.processText("{nm:item:a}", { item: Quest.World.w.brick, brick_count: 1 }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("one brick", Quest.Text.processText("{nm:item:count}", { item: Quest.World.w.brick, brick_count: 1 }))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("five bricks", Quest.Text.processText("{nm:item:a}", { item: Quest.World.w.brick, count: 5 }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("five bricks and one book", Quest.Text.processText("{nm:item:a} and {nm:item2:count}", { item: Quest.World.w.brick, count: 5, item2: Quest.World.w.book }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
  Quest.World.w.book.specialCount = 4
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("five bricks and four books", Quest.Text.processText("{nm:item:a} and {nm:item2:count:false:count_this}", { item: Quest.World.w.brick, count: 5, item2: Quest.World.w.book, count_this: 'specialCount' }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Lara looks at the four books thoughtfully.", Quest.Text.processText("Lara looks at the {nm:item:false:false:count_this} thoughtfully.", { item: Quest.World.w.book, count_this: 'specialCount' }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
  Quest.World.w.book.specialCount = 1
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Lara looks at the book thoughtfully.", Quest.Text.processText("Lara looks at the {nm:item:false:false:count_this} thoughtfully.", { item: Quest.World.w.book, count_this: 'specialCount' }))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 5b: nm with Quest.Templates.COUNTABLE too.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
  Quest.World.w.book.getDisplayName = function (options: any) { return 'a ' + options.adj + ' tomb' }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("You see a mighty tomb", Quest.Text.processText("You see {nm:item:a:false:adj}", { item: Quest.World.w.book, adj: 'mighty' }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
  delete Quest.World.w.book.getDisplayName


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 6: show");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is a bear.", Quest.Text.processText("{Kyle.alias} is a bear."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is a bear.", Quest.Text.processText("{show:Kyle:alias} is a bear."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is a bear.", Quest.Text.processText("{Kyle:alias} is a bear."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("You have $10.", Quest.Text.processText("You have ${show:Buddy:money}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("You have $10.", Quest.Text.processText("You have ${Quest.World.player.money}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("You have $10.", Quest.Text.processText("You have ${Buddy.money}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("You have $10.", Quest.Text.processText("You have ${Quest.World.player.money}."));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 7: select");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  Quest.World.w.Kyle.colours = ['red', 'green', 'blue']
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  Quest.World.w.Kyle.colour = 1
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is green.", Quest.Text.processText("Kyle is {select:Kyle:colours:colour}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is blue.", Quest.Text.processText("Kyle is {select:Kyle:colour:green:blue:red}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is blue.", Quest.Text.processText("Kyle is {select:Kyle.colour:green:blue:red}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  Quest.World.w.Kyle.colour = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is red.", Quest.Text.processText("Kyle is {select:Kyle:colours:colour}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is green.", Quest.Text.processText("Kyle is {select:Kyle:colour:green:blue:red}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  Quest.World.w.Kyle.colour = 6
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is .", Quest.Text.processText("Kyle is {select:Kyle:colours:colour}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is .", Quest.Text.processText("Kyle is {select:Kyle:colour:green:blue:red}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  Quest.World.w.Kyle.colour = 6
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is red.", Quest.Text.processText("Kyle is {selectWrap:Kyle:colours:colour}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is red.", Quest.Text.processText("Kyle is {selectWrap:Kyle:colour:green:blue:red:yellow}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  Quest.World.w.Kyle.colour = 6
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is blue.", Quest.Text.processText("Kyle is {selectEnd:Kyle:colours:colour}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is red.", Quest.Text.processText("Kyle is {selectEnd:Kyle:colour:green:blue:red}."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  Quest.World.w.Kyle.colour = 0


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 8: dialogue");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  Quest.World.w.Kyle.dialogueStyle = 'color:magenta'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle says; <span style=\"color:magenta\">'Hello!'</span>", Quest.Text.processText("Kyle says; {dialogue:char:Hello!}", { char: Quest.World.w.Kyle }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle says; <span style=\"color:cyan\">'Hello!'</span>", Quest.Text.processText("Kyle says; {dialogue::cyan:Hello!}"))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle says; <span style=\"text-decoration:underline;color:cyan\">'Hello!'</span>", Quest.Text.processText("Kyle says; {dialogue:u:cyan:Hello!}"))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle says; <span style=\"font-style:italic;font-weight:bold;color:cyan\">'Hello!'</span>", Quest.Text.processText("Kyle says; {dialogue:ib:cyan:Hello!}"))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle says; <span class=\"nonsense\">'Hello!'</span>", Quest.Text.processText("Kyle says; {dialogue:.nonsense:Hello!}", { char: Quest.World.w.Kyle }))



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 9: rndalt");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is here.", Quest.Text.processText("{rndalt:Kyle} is here."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is here.", Quest.Text.processText("{rndalt:npc} is here.", { npc: Quest.World.w.Kyle }));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  Quest.World.w.Kyle.alt = ['red', 'green', 'blue']
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'prime' does not exist on type '{ buffer:... Remove this comment to see the full error message
  Quest.Random.rndm.prime(1)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("green is here.", Quest.Text.processText("{rndalt:Kyle} is here."));



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 10: quest 5 style if")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  Quest.World.w.Kyle.flag = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is here. Lara is here.", Quest.Text.processText("{if Kyle.flag:Kyle is here. }Lara is here."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Lara is here.", Quest.Text.processText("{if not Kyle.flag:Kyle is not here. }Lara is here."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  Quest.World.w.Kyle.flag = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is here. Lara is here.", Quest.Text.processText("{if not Kyle.flag:Kyle is here. }Lara is here."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Lara is here.", Quest.Text.processText("{if Kyle.flag:Kyle is not here. }Lara is here."))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is here. Lara is here.", Quest.Text.processText("{if Kyle.colour=0:Kyle is here. }Lara is here."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is here. Lara is here.", Quest.Text.processText("{if Kyle.colour<>10:Kyle is here. }Lara is here."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is here. Lara is here.", Quest.Text.processText("{if Kyle.colour !== 10:Kyle is here. }Lara is here."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Lara is here.", Quest.Text.processText("{if Kyle.colour=10:Kyle is here. }Lara is here."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Lara is here.", Quest.Text.processText("{if Kyle.colour != 0:Kyle is here. }Lara is here."))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is here. Lara is here.", Quest.Text.processText("{if Kyle.colour>=0:Kyle is here. }Lara is here."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Lara is here.", Quest.Text.processText("{if Kyle.colour>=1:Kyle is here. }Lara is here."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Lara is here.", Quest.Text.processText("{if Kyle.colour>0:Kyle is here. }Lara is here."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is here. Lara is here.", Quest.Text.processText("{if Kyle.colour>-1:Kyle is here. }Lara is here."))


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 11: here");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("He is here. Lara is not.", Quest.Text.processText("{ifHere:Kyle:He is here.} Lara is not."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("He is here. Lara is not.", Quest.Text.processText("{here Kyle:He is here.} Lara is not."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(" Lara is not.", Quest.Text.processText("{ifHere:Lara:He is here.} Lara is not."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(" Lara is not.", Quest.Text.processText("{here Lara:He is here.} Lara is not."));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("He is here. Lara is not.", Quest.Text.processText("{ifNotHere:Lara:He is here.} Lara is not."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("He is here. Lara is not.", Quest.Text.processText("{nothere Lara:He is here.} Lara is not."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(" Lara is not.", Quest.Text.processText("{ifNotHere:Kyle:He is here.} Lara is not."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(" Lara is not.", Quest.Text.processText("{nothere Kyle:He is here.} Lara is not."));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("He is here. Lara is not.", Quest.Text.processText("{ifHeld:knife:He is here.} Lara is not."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(" Lara is not.", Quest.Text.processText("{ifHeld:book:He is here.} Lara is not."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("He is here. Lara is not.", Quest.Text.processText("{ifNotHeld:book:He is here.} Lara is not."));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(" Lara is not.", Quest.Text.processText("{ifNotHeld:knife:He is here.} Lara is not."));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 12: pa2");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("'Please stop!' exclaims Kyle when you rip his book to shred.", Quest.Text.processText("'Please stop!' exclaims {nm:chr1:the} when {nv:chr2:rip} {pa2:chr1:chr2} book to shred.", { chr1: Quest.World.w.Kyle, chr2: Quest.World.player }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("'Please stop!' exclaims Kyle when Boris rips Kyle's book to shred.", Quest.Text.processText("'Please stop!' exclaims {nm:chr1:the} when {nv:chr2:rip} {pa2:chr1:chr2} book to shred.", { chr1: Quest.World.w.Kyle, chr2: Quest.World.w.Boris }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("'Please stop!' exclaims Kyle when Kyle rips his book to shred.", Quest.Text.processText("'Please stop!' exclaims {nm:chr1:the} when {nv:chr2:rip} {pa2:chr1:chr2} book to shred.", { chr1: Quest.World.w.Kyle, chr2: Quest.World.w.Kyle }))


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 11: numbers");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Lara is sixteen.", Quest.Text.processText("Lara is {number:age}.", { age: 16 }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Lara' does not exist on type '{}'.
  Quest.World.w.Lara.age = 17
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Lara is seventeen.", Quest.Text.processText("Lara is {number:Lara:age}."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Lara is seventeen.", Quest.Text.processText("Lara is {number:npc:age}.", { npc: Quest.World.w.Lara }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Lara is seventeenth.", Quest.Text.processText("Lara is {ordinal:Lara:age}."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Buddy' does not exist on type '{}'.
  Quest.World.w.Buddy.age = 15
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Buddy is fifteen.", Quest.Text.processText("Buddy is {number:player:age}."))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 12: contents")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("You see nothing.", Quest.Text.processText("You see {contents:cardboard_box:,:and:nothing}."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("You see nothing.", Quest.Text.processText("You see {contents:item:,:and:nothing}.", { item: Quest.World.w.cardboard_box }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("You see nothing.", Quest.Text.processText("You see {contents:item:,:and:nothing}.", { item: 'cardboard_box' }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'coin' does not exist on type '{}'.
  Quest.World.w.coin.loc = 'cardboard_box'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'small_key' does not exist on type '{}'.
  Quest.World.w.small_key.loc = 'cardboard_box'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'canteen' does not exist on type '{}'.
  Quest.World.w.canteen.loc = 'cardboard_box'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("You see a canteen, a coin and a small key.", Quest.Text.processText("You see {contents:cardboard_box:,:and:nothing}."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("You see a canteen - a coin - a small key.", Quest.Text.processText("You see {contents:cardboard_box: -:-:nothing}."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'coin' does not exist on type '{}'.
  Quest.World.w.coin.loc = 'lounge'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'small_key' does not exist on type '{}'.
  Quest.World.w.small_key.loc = 'lounge'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'canteen' does not exist on type '{}'.
  Quest.World.w.canteen.loc = 'lounge'


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Numbers");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("fourteen", Quest.lang.toWords(14));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("minus four hundred and three", Quest.lang.toWords(-403));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("ninety-seven", Quest.lang.toWords(97));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("fourteenth", Quest.lang.toOrdinal(14));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("four hundred and third", Quest.lang.toOrdinal(403));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("ninety-first", Quest.lang.toOrdinal(91));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("get 4 sticks", Quest.lang.convertNumbers("get four sticks"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("get 14 sticks", Quest.lang.convertNumbers("get fourteen sticks"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("get no sticks", Quest.lang.convertNumbers("get no sticks"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("ninetieth", Quest.lang.toOrdinal(90));


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Numbers 2");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("(012,34)", Quest.Utilities.displayNumber(1234, "(3,2)"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("$1234", Quest.Utilities.displayMoney(1234));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("$-1234", Quest.Utilities.displayMoney(-1234));
  Quest.Settings.settings.moneyFormat = "!3.2! credits"
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("012.34 credits", Quest.Utilities.displayMoney(1234));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("-012.34 credits", Quest.Utilities.displayMoney(-1234));
  Quest.Settings.settings.moneyFormat = "!+3.2! credits"
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("+012.34 credits", Quest.Utilities.displayMoney(1234));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("-012.34 credits", Quest.Utilities.displayMoney(-1234));
  Quest.Settings.settings.moneyFormat = "!$1,2!($1,2)!"
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("$12,34", Quest.Utilities.displayMoney(1234));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("($12,34)", Quest.Utilities.displayMoney(-1234));


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Quest.Utilities.getDir");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("out", Quest.Utilities.getDir("o"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("down", Quest.Utilities.getDir("dn"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("out", Quest.Utilities.getDir("exit"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Utilities.getDir("bo"));


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("date time")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("14 Feb 2019, 09:43", Quest.Utilities.util.getDateTime())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getDateTimeDict' does not exist on type ... Remove this comment to see the full error message
  const dateTimeDict = Quest.Utilities.util.getDateTimeDict()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("February", dateTimeDict.month)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(9, dateTimeDict.hour)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("It is 14 Feb 2019, 09:43", Quest.Text.processText("It is {dateTime}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("-Two-Three-", Quest.Text.processText("{hour:3:8:One}-{hour:5:10:Two}-{hour:9:10:Three}-{hour:10:99:Four}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(9, Quest.Utilities.util.seconds(9))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(127, Quest.Utilities.util.seconds(7, 2))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(127 + 3 * 3600, Quest.Utilities.util.seconds(7, 2, 3))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(127 + 3 * 3600 + 2 * 24 * 3600, Quest.Utilities.util.seconds(7, 2, 3, 2))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Utilities.util.isAfter('February 14, 2019 09:42:00'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Utilities.util.isAfter('February 14, 2019 09:43:00'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Utilities.util.isAfter('0943'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Utilities.util.isAfter('0942'))


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("msg function")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
  test.assertOut(["Kyle is red."], function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Kyle is {select:Kyle:colours:colour}.")
  })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
  test.assertOut(["Kyle is here.", "Lara is not"], function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Kyle is here.|Lara is not")
  })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
  test.assertOut(["Kyle is here.|Lara is not"], function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Kyle is here.@@@vert@@@Lara is not")
  })




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("msg function 2")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fullOutputData' does not exist on type '... Remove this comment to see the full error message
  test.fullOutputData = true
  let res
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'function' does not exist on type '{}'.
  res = test.function(function () { Quest.IO.msg("Kyle is {select:Kyle:colours:colour}.") })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("default-p", res[0].cssClass)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("p", res[0].tag)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is red.", res[0].text)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'function' does not exist on type '{}'.
  res = test.function(function () { Quest.IO.msg("#Kyle is {select:Kyle:colours:colour}.") })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("default-h default-h4", res[0].cssClass)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("h4", res[0].tag)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Kyle is red.", res[0].text)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'function' does not exist on type '{}'.
  res = test.function(function () { Quest.IO.msg("#Kyle is {select:Kyle:colours:colour}.", {}, 'test') })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("test", res[0].cssClass)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("p", res[0].tag)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("#Kyle is red.", res[0].text)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fullOutputData' does not exist on type '... Remove this comment to see the full error message
  test.fullOutputData = false



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Change listeners")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
  test.assertOut(["watchedStringAttribute changed from yellow to red"], function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
    Quest.World.w.book.watchedStringAttribute = 'red'
    Quest.World.world.endTurn(Quest.World.world.FAILED)
  })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
  test.assertOut([], function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
    Quest.World.w.book.watchedNumberAttribute = 9
    Quest.World.world.endTurn(Quest.World.world.FAILED)
  })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
  test.assertOut(["watchedNumberAttribute changed from 9 to 11"], function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
    Quest.World.w.book.watchedNumberAttribute = 11
    Quest.World.world.endTurn(Quest.World.world.FAILED)
  })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("ChangeListenersUsedStrings=red~11", Quest.Utilities.util.getChangeListenersSaveString())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
  Quest.World.w.book.watchedNumberAttribute = 17
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
  Quest.World.w.book.watchedStringAttribute = 'cyan'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'setChangeListenersLoadString' does not e... Remove this comment to see the full error message
  Quest.Utilities.util.setChangeListenersLoadString("ChangeListenersUsedStrings=cyan~17")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("cyan", Quest.Utilities.util.changeListeners[0].oldValue)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(17, Quest.Utilities.util.changeListeners[1].oldValue)




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("tokenising")
  let res2

  ary2 = ['ham', 'cheese']
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'oneFromTokens' does not exist on type '{... Remove this comment to see the full error message
  res2 = Quest.Utilities.array.oneFromTokens(ary2, [Quest.World.w.book, Quest.World.w.boots, Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.knife], {})
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, ary2.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.ham_and_cheese_sandwich, res2[0])

  ary2 = ['ham', 'cheese', 'boots']
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'oneFromTokens' does not exist on type '{... Remove this comment to see the full error message
  res2 = Quest.Utilities.array.oneFromTokens(ary2, [Quest.World.w.book, Quest.World.w.boots, Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.knife], {})
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, ary2.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.ham_and_cheese_sandwich, res2[0])

  ary2 = ['boots', 'ham', 'cheese']
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'oneFromTokens' does not exist on type '{... Remove this comment to see the full error message
  res2 = Quest.Utilities.array.oneFromTokens(ary2, [Quest.World.w.book, Quest.World.w.boots, Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.knife], {})
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(2, ary2.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.boots, res2[0])

  ary2 = ['hat', 'boots', 'ham', 'cheese']
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'oneFromTokens' does not exist on type '{... Remove this comment to see the full error message
  res2 = Quest.Utilities.array.oneFromTokens(ary2, [Quest.World.w.book, Quest.World.w.boots, Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.knife], {})
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(4, ary2.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(null, res2)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("tokenising 2")
  ary2 = ['ham', 'cheese']
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromTokens' does not exist on type '{}'.
  res2 = Quest.Utilities.array.fromTokens(ary2, [Quest.World.w.book, Quest.World.w.boots, Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.knife], {})
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, res2.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('ham_and_cheese_sandwich', res2[0][0].name)

  ary2 = ['ham', 'cheese', 'boots']
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromTokens' does not exist on type '{}'.
  res2 = Quest.Utilities.array.fromTokens(ary2, [Quest.World.w.book, Quest.World.w.boots, Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.knife], {})
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(2, res2.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('ham_and_cheese_sandwich', res2[0][0].name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('boots', res2[1][0].name)

  ary2 = ['boots', 'ham', 'cheese']
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromTokens' does not exist on type '{}'.
  res2 = Quest.Utilities.array.fromTokens(ary2, [Quest.World.w.book, Quest.World.w.boots, Quest.World.w.ham_and_cheese_sandwich, Quest.World.w.knife], {})
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(2, res2.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('ham_and_cheese_sandwich', res2[1][0].name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('boots', res2[0][0].name)





  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("errors")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get sdjfghfg", "There doesn't seem to be anything you might call 'sdjfghfg' here.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("map", "Sorry, no map available.")


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Look at scenery")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("look at settee", "It's just scenery.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x old settee", "It's just scenery.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("examine couch", "It's just scenery.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("look at tv", "It's just scenery.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("look at rug", "It might have been blue at one time. Maybe.")




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Look inside")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("look inside cabinet", "Inside the glass cabinet you can see a jewellery box and an ornate doll.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'jewellery_box' does not exist on type '{... Remove this comment to see the full error message
  Quest.World.w.jewellery_box.closed = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("look inside cabinet", "Inside the glass cabinet you can see a jewellery box (containing a ring) and an ornate doll.")

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("look inside box", "Inside the cardboard box you can see nothing.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("look inside boots", "There's nothing to see inside.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("look inside book", "The book has pages and pages of text, but you do not even recognise the alphabet.")

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("smell", "You can't smell anything here.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("listen", "You can't hear anything of note here.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("smell knife", "The knife has no smell.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("listen to knife", "The knife is not making any noise.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("read knife", "Nothing worth reading there.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("smash knife", "The knife is not something you can break.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("look out knife", "Not something you can look out of.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("switch on knife", "You can't turn it on.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("switch off knife", "You can't turn it off.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("exits", "You think you can go east, south, up or west.")

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Drop all")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop all", "You drop the knife.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop all", "Nothing there to do that with.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get knife", "You take the knife.");



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Concatenated commands")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop knife, and then get it", ["You drop the knife.", "You take the knife."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get book.read it.drop book", ["You take the book.", "It is not in a language you understand.", "Abandoning later commands: drop book"]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop book.read it.drop book", ["You drop the book.", "You don't have it.", "You don't have it."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("*drop book.read it.drop book", ["Comment: drop book.read it.drop book"]);



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Simple object commands");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("i", "You are carrying a knife.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get coin", "You try to pick up the coin, but it just will not budge.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get straw boater", "Kyle has it.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get cabinet", "You can't take it.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get the cabinet", "You can't take it.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get a cabinet", "You can't take it.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get knife", "You've got it already.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x tv", "It's just scenery.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get tv", "You can't take it.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("give knife to boots", "Realistically, the boots are not interested in anything you might give them.");


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Simple object commands (eat)");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("eat knife", "The knife is not something you can eat.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Take"], Quest.World.w.ham_and_cheese_sandwich.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get sandwich", "You take the ham and cheese sandwich.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x sandwich", "It is just your typical, every day ham and cheese sandwich.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x sandwich", "It is just your typical, every day ham and cheese sandwich.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x ham and cheese sandwich", "It is just your typical, every day ham and cheese sandwich.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x sandwich and knife", [
    "It is just your typical, every day ham and cheese sandwich.",
    "A blunt knife.",
  ])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x ham and cheese sandwich, knife", [
    "It is just your typical, every day ham and cheese sandwich.",
    "A blunt knife.",
  ])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Drop", "Eat"], Quest.World.w.ham_and_cheese_sandwich.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drink sandwich", "The ham and cheese sandwich is not something you can drink.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ingest sandwich", ["You eat the ham and cheese sandwich.", "That was great!"]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Simple object commands (drink the sandwich?)")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ham_and_cheese_sandwich' does not exist ... Remove this comment to see the full error message
  Quest.World.w.ham_and_cheese_sandwich.loc = Quest.World.player.name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ham_and_cheese_sandwich' does not exist ... Remove this comment to see the full error message
  Quest.World.w.ham_and_cheese_sandwich.isLiquid = true
  Quest.World.world.update()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Drop", "Drink"], Quest.World.w.ham_and_cheese_sandwich.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drink sandwich", ["You eat the ham and cheese sandwich.", "That was great!"]);



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Simple object commands (boots)");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Take"], Quest.World.w.boots.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear boots", "You don't have them.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("remove boots", "You don't have them.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get boots", "You take the boots.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Drop", "Wear"], Quest.World.w.boots.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("inv", "You are carrying some boots and a knife.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get boots", "You've got them already.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear boots", "You put on the boots.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Remove"], Quest.World.w.boots.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("inventory", "You are carrying some boots (worn) and a knife.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear boots", "You are already wearing them.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("remove boots", "You take the boots off.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Drop", "Wear"], Quest.World.w.boots.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop boots", "You drop the boots.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Take"], Quest.World.w.boots.getVerbs())


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Simple object commands (book)");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Take"], Quest.World.w.book.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get the book", "You take the book.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Drop", "Read"], Quest.World.w.book.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear book", "You can't wear it.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("remove book", "You are not wearing it.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("read the book", "It is not in a language you understand.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("give it to kyle", "'Oh!' says Kyle. 'Is this a book?'");

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, read the book", "It is not in a language he understands.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, drop book", "Kyle drops the book.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Take"], Quest.World.w.book.getVerbs())

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Simple object commands (container)");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Open"], Quest.World.w.glass_cabinet.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Take", "Close"], Quest.World.w.cardboard_box.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("open box", "It already is.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("close box", "You close the cardboard box.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Take", "Open"], Quest.World.w.cardboard_box.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("close box", "It already is.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("open box", "You open the cardboard box. It is empty.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Take", "Close"], Quest.World.w.cardboard_box.getVerbs())

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Simple object commands (bricks)");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get the bricks", "You take seven bricks.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("inv", "You are carrying seven bricks and a knife.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop 3 bricks", "You drop three bricks.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("inv", "You are carrying four bricks and a knife.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop 4 bricks", "You drop four bricks.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("inv", "You are carrying a knife.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get 10 bricks", "You take seven bricks, that is all there is.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["You head east.", "The kitchen", "A clean room, a clock hanging on the wall. There is a sink in the corner.", "You can see a big kitchen table (with a jug on it), a camera and a trapdoor here.", "You can go north or west.", "A fresh smell here!"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put 2 bricks on to the table", "Done.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("inv", "You are carrying five bricks and a knife.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("look", ["The kitchen", "A clean room, a clock hanging on the wall. There is a sink in the corner.", "You can see a big kitchen table (with two bricks and a jug on it), a camera and a trapdoor here.", "You can go north or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get the bricks", "You take two bricks.");

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put 12 bricks on to the table", "Done.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("look", ["The kitchen", "A clean room, a clock hanging on the wall. There is a sink in the corner.", "You can see a big kitchen table (with seven bricks and a jug on it), a camera and a trapdoor here.", "You can go north or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop 2 bricks", "You don't have any.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put 2 bricks on to the table", "You don't have any.");

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get 90 bricks", "You take seven bricks, that is all there is.");

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get clock", "You take the clock.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("look", ["The kitchen", "A clean room. There is a sink in the corner.", "You can see a big kitchen table (with a jug on it), a camera and a trapdoor here.", "You can go north or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop clock", "You drop the clock.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("look", ["The kitchen", "A clean room. There is a sink in the corner.", "You can see a big kitchen table (with a jug on it), a camera, a clock and a trapdoor here.", "You can go north or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The lounge", "A smelly room with an old settee and a tv. There is a tatty rug on the floor.", "You can see a book, some boots, a canteen, a cardboard box, a coin, a flashlight, a garage key, a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll), Kyle (wearing a straw boater) and a small key here.", "You can go east, south, up or west."]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Simple object commands (bricks and a box)");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Parser.parser.isContained(Quest.World.w.brick));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop bricks in box", "Done.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Parser.parser.isContained(Quest.World.w.brick));

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get bricks", "You take seven bricks.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Parser.parser.isContained(Quest.World.w.brick));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop three bricks in box", "Done.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Parser.parser.isContained(Quest.World.w.brick));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop bricks", "You drop four bricks.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Parser.parser.isContained(Quest.World.w.brick));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get bricks", "You take four bricks.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Parser.parser.isContained(Quest.World.w.brick));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get bricks", "You take three bricks.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Parser.parser.isContained(Quest.World.w.brick));


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Simple object commands (bricks and a held box)");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get box", "You take the cardboard box.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop bricks in box", "Done.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get bricks from box", "Done.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop three bricks in box", "Done.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop bricks", "You drop four bricks.");

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get bricks", "You take four bricks.");

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get bricks", "You take three bricks.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop box", "You drop the cardboard box.");

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Simple object commands (cabinet and key)")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("open small key", "The small key can't be opened.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("close small key", "The small key can't be closed.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("unlock small key", "You can't unlock it.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lock small key", "You can't lock it.")




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("open cabinet", "The glass cabinet is locked.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("unlock cabinet", "You do not have the right key.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get small key", "You take the small key.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.World.w.glass_cabinet.locked)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.World.w.glass_cabinet.closed)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("open cabinet", ["You unlock the glass cabinet.", "You open the glass cabinet. Inside it you can see a jewellery box (containing a ring) and an ornate doll."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.World.w.glass_cabinet.locked)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.World.w.glass_cabinet.closed)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("open cabinet", "It already is.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("unlock cabinet", "It already is.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lock cabinet", ["You close the glass cabinet and lock it."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("unlock cabinet with key", "You unlock the glass cabinet.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lock cabinet with knife", "You lock the glass cabinet.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("use key to unlock cabinet", "You unlock the glass cabinet.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put cabinet in small key", "The small key is not a container.")



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Simple object commands (cabinet and box)")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("open cabinet", ["You open the glass cabinet. Inside it you can see a jewellery box (containing a ring) and an ornate doll."])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("pick up cardboard box", "You take the cardboard box.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("pick up jewellery box", "You take the jewellery box.")


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put cardboard box in jewellery box", "Done.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put jewellery box in cardboard box", "What? You want to put the jewellery box in the cardboard box when the cardboard box is already in the jewellery box? That's just too freaky for me.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("take cardboard box box from jewellery box", "Done.")


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put jewellery box in cabinet", "Done.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("close cabinet", "You close the glass cabinet.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lock cabinet", "You lock the glass cabinet.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop small key", "You drop the small key.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop box", "You drop the cardboard box.")


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Dynamic conversations")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
  test.menuResponseNumber = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("talk to kyle", "You ask Kyle about the garden, but he's not talking.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
  test.menuResponseNumber = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("talk to kyle", "You ask Kyle about the garden, but he's STILL not talking.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
  test.menuResponseNumber = [0, 1]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("talk to kyle", ["You talk to Kyle about the weather; he asks your opinion...", 'You tell Kyle the weather is bad; he shakes his head sadly.']);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Restricting");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Look at", "Talk to"], Quest.World.w.Kyle.getVerbs())
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  Quest.World.player.testTalk = function () { Quest.IO.msg("You are gagged."); return false; }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("talk to kyle", "You are gagged.");
  Quest.World.player.testTalk = function () { return true; }
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  Quest.World.player.testManipulate = function () { Quest.IO.msg("You are handcuffed."); return false; }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop bricks", "You are handcuffed.");
  Quest.World.player.testManipulate = function () { return true; }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop bricks", "You drop seven bricks.");


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Wear/remove");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("u", ["You head up.", "The bedroom", "A large room, with a big bed and a wardrobe.", "You can see a coat, some jeans, a jumpsuit, a shirt, underwear and a wardrobe here.", "You can go down, in or west.",]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get all", ["Wardrobe: You can't take it.", "You take the underwear.", "You take the jeans.", "You take the shirt.", "You take the coat.", "You take the jumpsuit.",]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear underwear", "You put on the underwear.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear jeans", "You put on the jeans.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear shirt", "You put on the shirt.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("remove underwear", "You can't take off your underwear whilst wearing your jeans.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("remove jeans", "You take the jeans off.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("remove underwear", "You take the underwear off.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear jumpsuit", "You can't put the jumpsuit on over your shirt.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("remove shirt", "You take the shirt off.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear jumpsuit", "You put on the jumpsuit.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear coat", "You put on the coat.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear underwear", "You can't put the underwear on over your jumpsuit.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("remove coat", "You take the coat off.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop all", ["You drop the knife.", "You drop the underwear.", "You drop the jeans.", "You drop the shirt.", "You drop the coat.", "Jumpsuit: You are already wearing it.",]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("remove jumpsuit", "You take the jumpsuit off.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get knife", "You take the knife.");

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Postures")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lie on bed", "You lie down on the bed.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get off bed", "You get off the bed.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("sit on bed", "You sit on the bed.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get off bed", "You get off the bed.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("stand on bed", "The bed is not something you can stand on.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lie on wardrobe", "The wardrobe is not something you can lie on.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("sit on wardrobe", "The wardrobe is not something you can sit on.")


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("use")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("use jumpsuit", "You put on the jumpsuit.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("use knife", "No obvious way to use it.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
  Quest.World.w.knife.use = function (options: any) { Quest.IO.msg("You juggle the knife.") }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("use knife", "You juggle the knife.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("remove jumpsuit", "You take the jumpsuit off.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop jumpsuit", "You drop the jumpsuit.");

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Sit on", "Lie on"], Quest.World.w.bed.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("use bed", "You lie down on the bed.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Get off"], Quest.World.w.bed.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("use bed", "You already are.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("stand", "You get off the bed.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Sit on", "Lie on"], Quest.World.w.bed.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("use bed", "You lie down on the bed.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("d", ["You get off the bed.", "You head down.", "The lounge", "A smelly room with an old settee and a tv. There is a tatty rug on the floor.", "You can see a book, some boots, seven bricks, a canteen, a cardboard box, a coin, a flashlight, a garage key, a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll), Kyle (wearing a straw boater) and a small key here.", "You can go east, south, up or west.",]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("say");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("say hello", ["You say, 'Hello.'", "No one seems interested in what you say."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  Quest.World.w.Kyle.loc = "dining_room"
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The dining room", "An old-fashioned room.", "You can see a brick, a chair, a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll), Kyle (wearing a straw boater) and Lara here.", "You can go east, up or west.",]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("say hello", ["You say, 'Hello.'", "'Oh, hello there,' replies Lara.", "'Have you two met before?' asks Kyle."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("say nothing", ["You say, 'Nothing.'", "'I don't know what that means,' says Kyle. 'It's a simple yes-no question.'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("say nothing", ["You say, 'Nothing.'", "'I don't know what that means,' says Kyle. 'It's a simple yes-no question.'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("say nothing", ["You say, 'Nothing.'", "'I don't know what that means,' says Kyle. 'It's a simple yes-no question.'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("say yes", ["You say, 'Yes.'", "'Oh, cool,' says Kyle."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("say hello", ["You say, 'Hello.'", "No one seems interested in what you say."]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("ask");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask kyle about hats", ["You ask Kyle about hats.", "Kyle has no interest in that subject."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask kyle about garden", ["You ask Kyle about garden.", "'Needs some work,' Kyle says with a sign."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask kyle about garden", ["You ask Kyle about garden.", "'I'm giving up hope of it ever getting sorted,' Kyle says."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask kyle about garden", ["You ask Kyle about garden.", "'I'm giving up hope of it ever getting sorted,' Kyle says."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'garden' does not exist on type '{}'.
  Quest.World.w.garden.fixed = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask kyle about garden", ["You ask Kyle about garden.", "'Looks much better now,' Kyle says with a grin."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("topics", [/^Use TOPICS FOR/])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("topics kyle", ["Some suggestions for what to ask Kyle about: Garden; House; Park."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  Quest.World.w.Kyle.specialFlag = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("topics kyle", ["Some suggestions for what to ask Kyle about: Fountain; Garden; House; Park."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask kyle about park", ["You ask Kyle about park.", "'Going to the park sounds like fun,' Kyle says with a grin. 'We can go on the swings!'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("topics kyle", ["Some suggestions for what to ask Kyle about: Fountain; Garden; House; Park; Swings."])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask chair about hats", 'You can ask it about hats all you like, but it is not about to reply.')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("talk to chair", 'You chat to the chair for a few moments, before releasing that it is not about to reply.')



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  Quest.World.w.Kyle.loc = "lounge"


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("NPC topics");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertError' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertError(/Trying to find topic/, function () { Quest.World.w.Lara.findTopic("What's the deal with the garden?") })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, Quest.World.w.Kyle.findTopic("What's the deal with the garden?").nowShow.length)



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("NPC commands 1");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lara,get brick", "'I'm not picking up any bricks,' says Lara indignantly.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lara,e", "'I'm not going east,' says Lara indignantly. 'I don't like that room.'");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
  test.menuResponseNumber = 1;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(3, Quest.World.w.Lara.getTopics().length);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("speak to lara", ["'Hello,' says Lara.", "You tell Lara she looks very attractive. 'Why thank you!' she replies, smiling at last."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(2, Quest.World.w.Lara.getTopics().length);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lara,sit on chair", ["Lara sits on the chair.", "The chair makes a strange noise when Lara sits on it."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lara,stand up", "Lara gets off the chair.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lara,sit on chair", ["Lara sits on the chair.", "The chair makes a strange noise when Lara sits on it."]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("l", ["The dining room", "An old-fashioned room.", "You can see a brick, a chair, a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll) and Lara (sitting on the chair) here.", "You can go east, up or west.",]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("NPC commands 1.1");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Lara' does not exist on type '{}'.
  Quest.World.w.Lara.testPosture = function () { Quest.IO.msg("She is turned to stone."); return false; }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lara, get off chair", "She is turned to stone.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Lara' does not exist on type '{}'.
  Quest.World.w.Lara.testPosture = function () { return true; }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lara, get off chair", "Lara gets off the chair.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lara,sit on chair", ["Lara sits on the chair.", "The chair makes a strange noise when Lara sits on it."]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lara,e", ["Lara gets off the chair.", "Lara leaves the dining room, heading east."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["You head east.", "The lounge", "A smelly room with an old settee and a tv. There is a tatty rug on the floor.", "You can see a book, some boots, seven bricks, a canteen, a cardboard box, a coin, a flashlight, a garage key, a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll), Kyle (wearing a straw boater), Lara and a small key here.", "You can go east, south, up or west.",]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lara,get boots", "Lara takes the boots.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lara,wear boots", "'I'm not doing that!' says Lara indignantly.");

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lara,drop boots", "Lara drops the boots.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("lara,w", "Lara leaves the lounge, heading west.");


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("NPC commands 2");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("boots,get coin", "You can tell the boots to do anything you like, but there is no way they'll do it.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle,get coin", "He tries to pick up the coin, but it just will not budge.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle,get knife", "You have it.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle,get cabinet", "He can't take it.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle,get cover", "He can't take it; it is part of the book.");


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("NPC commands (boots)");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, wear boots", "He doesn't have them.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, remove boots", "He doesn't have them.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, get boots", "Kyle takes the boots.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, get boots", "He's got them already.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle,give boots to box", "Realistically, the cardboard box is not interested in anything he might give it.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, wear boots", "Kyle puts on the boots.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, wear boots", "Kyle is already wearing them.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, remove boots", "Kyle takes the boots off.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, put boots in box", "Done.");


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("NPC commands (book)");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("tell kyle to get the book", "Kyle takes the book.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("tell kyle to read the book", "It is not in a language he understands.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("tell kyle to drop the book", "Kyle drops the book.");


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("NPC commands (torch)");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, get torch", "Kyle takes the flashlight.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.World.w.flashlight.switchedon);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, turn on the torch", "Kyle switches the flashlight on.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.World.w.flashlight.switchedon);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, turn the torch off", "Kyle switches the flashlight off.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.World.w.flashlight.switchedon);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, drop torch", "Kyle drops the flashlight.");


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("NPC commands (go)");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, go ne", "Kyle can't go northeast.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, go e", "Kyle leaves the lounge, heading east.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, get torch", "There doesn't seem to be anything you might call 'kyle' here.")

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get torch", "You take the flashlight.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get garage", "You take the garage key.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["You head east.", "The kitchen", "A clean room. There is a sink in the corner.", "You can see a big kitchen table (with a jug on it), a camera, a clock, Kyle (wearing a straw boater) and a trapdoor here.", "You can go north or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle,n", "Kyle tries the door to the garage, but it is locked.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle,get all", ["Kyle takes the clock.", "Trapdoor: He can't take it.", "Kyle takes the camera.", "Big kitchen table: He can't take it.", "Kyle takes the jug."]);



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, drop picture box", "Kyle drops the camera.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, open trapdoor", "Kyle opens the trapdoor.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, down", "Kyle disappears through the trapdoor.");


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("The charger");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("open garage", ["You unlock the garage door.", "You open the garage door."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", ["The garage", "An empty garage.", /You can see/, "You can go south."]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x charger", "A device bigger than a washing machine to charge a torch? It has a compartment and a button. The compartment is closed.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("push button", "You push the button, but nothing happens.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put torch in compartment", "The compartment is closed.");


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x compartment", "The compartment is just the right size for the torch. It is closed.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("open compartment", "You open the compartment. It is empty.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x charger", "A device bigger than a washing machine to charge a torch? It has a compartment and a button. The compartment is empty.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x compartment", "The compartment is just the right size for the torch. It is open.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put torch in compartment", "Done.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put key in compartment", "The compartment is full.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x charger", "A device bigger than a washing machine to charge a torch? It has a compartment and a button. The compartment contains a flashlight.");

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("push button", "You push the button, but nothing happens.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("close compartment", "You close the compartment.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("push button", "You push the button. There is a brief hum of power, and a flash.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get torch", "There doesn't seem to be anything you might call 'torch' here.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("open compartment", "You open the compartment. Inside it you can see a flashlight.");

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get torch", "You take the flashlight.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("open compartment", "It already is.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put knife in compartment", "Done.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("close compartment", "You close the compartment.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("push button", "There is a loud bang, and the knife is destroyed.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("open compartment", "You open the compartment. It is empty.");

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x charger", "A device bigger than a washing machine to charge a torch? It has a compartment and a button. The compartment is empty.")


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Clone");
  const count = Object.keys(w).length;
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  const clone = Quest.World.cloneObject(Quest.World.w.book);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(count + 1, Object.keys(w).length);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.book, clone.clonePrototype);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.book.examine, clone.examine);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Take"], clone.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{}'.
  clone.loc = Quest.World.player.name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(["Examine", "Drop", "Read"], clone.getVerbs())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{}'.
  clone.loc = 'lounge'
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  const clone2 = Quest.World.cloneObject(clone);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(count + 2, Object.keys(w).length);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.book, clone2.clonePrototype);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.book.examine, clone2.examine);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Save/Load 0");

  const sl1 = "Some long string, with ~ all | sorts {} of! = stuff. In it^&*\""
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(sl1, Quest.SaveLoad.saveLoad.decodeString(Quest.SaveLoad.saveLoad.encodeString(sl1)))
  const sl2 = ["Some long string, ", "with ~ all | sorts {} of! = stuff.", " In it^&*\""]
  const sl3 = Quest.SaveLoad.saveLoad.decodeArray(Quest.SaveLoad.saveLoad.encodeArray(sl2))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(sl2[0], sl3[0])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(sl2[1], sl3[1])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(sl2[2], sl3[2])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("tst:number:14;", Quest.SaveLoad.saveLoad.encode("tst", 14))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("tst:boolean:false;", Quest.SaveLoad.saveLoad.encode("tst", false))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("tst:boolean:true;", Quest.SaveLoad.saveLoad.encode("tst", true))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("tst:string:14;", Quest.SaveLoad.saveLoad.encode("tst", '14'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("tst:qobject:book;", Quest.SaveLoad.saveLoad.encode("tst", Quest.World.w.book))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("tst:array:14~12;", Quest.SaveLoad.saveLoad.encode("tst", ['14', '12']))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("tst:numberarray:14~12;", Quest.SaveLoad.saveLoad.encode("tst", [14, 12]))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("tst:emptyarray;", Quest.SaveLoad.saveLoad.encode("tst", []))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("tst:emptystring;", Quest.SaveLoad.saveLoad.encode("tst", ''))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'far_away' does not exist on type '{}'.
  Quest.SaveLoad.saveLoad.decode(Quest.World.w.far_away, "one:number:14")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(14, Quest.World.w.far_away.one)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'far_away' does not exist on type '{}'.
  Quest.SaveLoad.saveLoad.decode(Quest.World.w.far_away, "two:string:14")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('14', Quest.World.w.far_away.two)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'far_away' does not exist on type '{}'.
  Quest.SaveLoad.saveLoad.decode(Quest.World.w.far_away, "three:boolean:true")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.World.w.far_away.three)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'far_away' does not exist on type '{}'.
  Quest.SaveLoad.saveLoad.decode(Quest.World.w.far_away, "four:qobject:book")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.w.book, Quest.World.w.far_away.four)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'far_away' does not exist on type '{}'.
  Quest.SaveLoad.saveLoad.decode(Quest.World.w.far_away, "five:array:14~12")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('14', Quest.World.w.far_away.five[0])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'far_away' does not exist on type '{}'.
  Quest.SaveLoad.saveLoad.decode(Quest.World.w.far_away, "six:numberarray:4~67~9")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([4, 67, 9], Quest.World.w.far_away.six)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'far_away' does not exist on type '{}'.
  Quest.SaveLoad.saveLoad.decode(Quest.World.w.far_away, "six:emptyarray")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([], Quest.World.w.far_away.six)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'far_away' does not exist on type '{}'.
  Quest.SaveLoad.saveLoad.decode(Quest.World.w.far_away, "seven:string:")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('', Quest.World.w.far_away.seven)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Save/Load 1")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
  Quest.World.w.boots.special_att_1 = 'one'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
  const bootsSaveString = Quest.World.w.boots.getSaveString().replace('Object=', '')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
  Quest.World.w.boots.special_att_2 = 'two'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
  delete Quest.World.w.boots.special_att_3
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
  Quest.SaveLoad.saveLoad.setFromArray(Quest.World.w.boots, bootsSaveString.split(";"))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('one', Quest.World.w.boots.special_att_1)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(undefined, Quest.World.w.boots.special_att_2)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('three', Quest.World.w.boots.special_att_3)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Save/Load 2");
  // Set up some changes to be saved
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
  Quest.World.w.boots.counter = 17;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
  Quest.World.w.boots.unusualString = "Some interesting text";
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
  Quest.World.w.boots.notableFlag = true;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
  Quest.World.w.boots.examine = "This will get saved";
  Quest.World.w.boots.sizes = [4, 5, 8]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'cloneCounter' does not exist on type '{}... Remove this comment to see the full error message
  clone.cloneCounter = 29;
  Quest.World.w.far_away.north.hidden = false
  Quest.World.w.far_away.north.locked = false
  const agendaCount = Quest.World.w.Arthur.agenda.length;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, Quest.World.w.Arthur.followers.length);
  const s = Quest.SaveLoad.saveLoad.saveTheWorld("Comment!!!");
  // Now change them again, these changes should get over-written
  Quest.World.w.boots.counter = 42;
  Quest.World.w.boots.unusualString = "Some boring text";
  Quest.World.w.boots.notableFlag = false;
  Quest.World.w.boots.examine = "This will not remain";
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  const clone3 = Quest.World.cloneObject(clone);  // should not be there later
  Quest.World.w.far_away.north.locked = true
  Quest.SaveLoad.saveLoad.loadTheWorld(s, 4)



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(count + 2, Object.keys(w).length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(17, Quest.World.w.boots.counter)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual([4, 5, 8], Quest.World.w.boots.sizes)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Some interesting text", Quest.World.w.boots.unusualString)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.World.w.boots.notableFlag)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("This will get saved", Quest.World.w.boots.examine)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(agendaCount, Quest.World.w.Arthur.agenda.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, Quest.World.w.Arthur.followers.length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(29, Quest.World.w[clone.name].cloneCounter)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Save/Load 3")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'usedStrings' does not exist on type '{ t... Remove this comment to see the full error message
  Quest.Text.usedStrings = ['One', 'Two']
  const tps = Quest.Text.getSaveString()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'usedStrings' does not exist on type '{ t... Remove this comment to see the full error message
  Quest.Text.usedStrings = ['three']
  Quest.Text.setLoadString(tps)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['One', 'Two'], Quest.Text.usedStrings)



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Path finding");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("lounge", Quest.Utilities.formatList(Quest.NPC.agenda.findPath(Quest.World.w.dining_room, Quest.World.w.lounge)));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("", Quest.Utilities.formatList(Quest.NPC.agenda.findPath(Quest.World.w.dining_room, Quest.World.w.dining_room)));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.NPC.agenda.findPath(Quest.World.w.dining_room, Quest.World.w.far_away));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("conservatory, dining room, lounge", Quest.Utilities.formatList(Quest.NPC.agenda.findPath(Quest.World.w.garden, Quest.World.w.dining_room)));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(null, Quest.World.w.dining_room.findExit(Quest.World.w.far_away));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("east", Quest.World.w.dining_room.findExit(Quest.World.w.lounge).dir);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", ["The kitchen", "A clean room. There is a sink in the corner.", /You can see/, "You can go down, north or west."])


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The lounge", "A smelly room with an old settee and a tv. There is a tatty rug on the floor.", /^You can see/, "You can go east, south, up or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", ["You head south.", "The conservatory", "A light airy room.", /You can see/, "You can go north or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The garden", "Very overgrown. The garden opens onto a road to the west, whilst the conservatory is east. There is a hook on the wall.", "You can see Arthur here.", "You can go east or west."]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Agendas");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("talk to arthur", ["'Hey, wake up,' you say to Arthur.", "'What?' he says, opening his eyes. 'Oh, it's you.'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("talk to arthur", ["'Hey, wake up,' you say to Arthur.", "'I am awake!'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("talk to arthur", ["'Hey, wake up,' you say to Arthur."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("talk to arthur", ["'Hey, wake up,' you say to Arthur.", "'Stop it!'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("talk to arthur", ["'Hey, wake up,' you say to Arthur.", "'Stop it!'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, Quest.World.w.Arthur.followers.length);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "Arthur stands up and stretches."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["You head east.", "The conservatory", "A light airy room.", /You can see/, "You can go north or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, Quest.World.w.Arthur.followers.length);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "Arthur enters the conservatory from the west."]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", ["You head north.", "The lounge", "A smelly room with an old settee and a tv. There is a tatty rug on the floor.", /^You can see/, "You can go east, south, up or west.", "Arthur enters the lounge from the south."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The dining room", "An old-fashioned room.", /^You can see/, "You can go east, up or west.", "Arthur enters the dining room from the east.", "'Hi, Lara,' says Arthur. 'Come look at the garden.'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, Quest.World.w.Arthur.followers.length);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "'Sure,' says Lara."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, Quest.World.w.Arthur.followers.length);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "Arthur and Lara leave the dining room, heading east."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes..."]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "Through the window you can see Arthur and Lara enter the garden from the east.", "Through the window you see Arthur say something to Lara."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "You notice Lara is smelling the flowers in the garden."]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Transit");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The lift", "A curious lift.", "You can go east."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("push button: g", ["You're already there mate!"]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("dining_room", Quest.World.w.lift.getTransitDestLocation().name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("button_0", Quest.World.w.lift.getTransitDestButton().name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("push 1", ["You press the button; the door closes and the lift heads to the first floor. The door opens again."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("bedroom", Quest.World.w.lift.getTransitDestLocation().name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("button_1", Quest.World.w.lift.getTransitDestButton().name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["You head east.", "The bedroom", "A large room, with a big bed and a wardrobe.", "You can see a coat, some jeans, a jumpsuit, a shirt, underwear and a wardrobe here.", "You can go down, in or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The lift", "A curious lift.", "You can go east."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'lift' does not exist on type '{}'.
  Quest.World.w.lift.afterTransitMove = function (toLoc: any, fromLoc: any) { Quest.IO.msg("MOVING to " + toLoc + " from " + fromLoc); };
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("push 1", ["You press the button; nothing happens."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("push 2", ["That does nothing, the button does not work."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("push g", ["The old man presses the button....", "MOVING to dining_room from bedroom"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["You head east.", "The dining room", "An old-fashioned room.", /^You can see/, "You can go east, up or west."])
  Quest.World.w.lift.testTransit = function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("The lift is out of order");
    return false;
  };
  Quest.World.w.lift.transitAutoMove = true;
  Quest.World.w.lift.afterEnter = Quest.World.w.lift.transitOfferMenu;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The lift", "A curious lift.", "You can go east.", "The lift is out of order", "The dining room", "An old-fashioned room.", "You can see a brick, a chair and a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll) here.", "You can go east, up or west."]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Push");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["You head east.", "The lounge", "A smelly room with an old settee and a tv. There is a tatty rug on the floor.", "You can see a book, a book, a book, seven bricks, a canteen, a cardboard box (containing some boots), a coin, a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll) and a small key here.", "You can go east, south, up or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", ["You head south.", "The conservatory", "A light airy room.", "You can see a broken chair, a crate and a rope here.", "You can go north or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("push crate", "That's not going to do anything useful.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("push chair s", "It is not something you can move around like that.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'broken_chair' does not exist on type '{}... Remove this comment to see the full error message
  Quest.World.w.broken_chair.shift = function () { Quest.IO.msg("You try to push chair, but it just breaks even more."); return false; }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'broken_chair' does not exist on type '{}... Remove this comment to see the full error message
  Quest.World.w.broken_chair.shiftable = true;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("push chair w", "You try to push chair, but it just breaks even more.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("push crate s", "You can't go south.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("push crate w", "You push the crate west.");


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("ensemble");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'movePlayer' does not exist on type '{}'.
  test.movePlayer("wardrobe");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("l", ["The wardrobe", "Oddly empty of fantasy worlds.", "You can see a suit here.", "You can go out."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get trousers", ["You take the suit trousers."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("l", ["The wardrobe", "Oddly empty of fantasy worlds.", "You can see a jacket and a waistcoat here.", "You can go out."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("i", ["You are carrying a flashlight, a garage key and some suit trousers."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get jacket, waistcoat", ["You take the jacket.", "You take the waistcoat."]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("i", ["You are carrying a flashlight, a garage key and a suit."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop suit", ["You drop the suit."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get suit", ["You take the suit."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear suit", ["Individual parts of an ensemble must be worn and removed separately."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear trousers", ["You put on the suit trousers."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("i", ["You are carrying a flashlight, a garage key, a jacket, some suit trousers (worn) and a waistcoat."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear jacket", ["You put on the jacket."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear waistcoat", ["You can't put the waistcoat on over your jacket."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("doff jacket", ["You take the jacket off."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear waistcoat", ["You put on the waistcoat."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear jacket", ["You put on the jacket."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("i", ["You are carrying a flashlight, a garage key and a suit (worn)."]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("pre-rope");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("o", ["You head out.", "The bedroom", "A large room, with a big bed and a wardrobe.", "You can see a coat, some jeans, a jumpsuit, a shirt, underwear and a wardrobe here.", "You can go down, in or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("d", ["You head down.", "The lounge", "A smelly room with an old settee and a tv. There is a tatty rug on the floor.", "You can see a book, a book, a book, seven bricks, a canteen, a cardboard box (containing some boots), a coin, a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll) and a small key here.", "You can go east, south, up or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", ["You head south.", "The conservatory", "A light airy room.", "You can see a broken chair and a rope here.", "You can go north or west."]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("rope - room one");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['conservatory'], Quest.World.w.rope.locs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.World.w.rope.isUltimatelyHeldBy(Quest.World.w.Buddy))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get rope", ['You take the rope.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['Buddy'], Quest.World.w.rope.locs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.World.w.rope.isUltimatelyHeldBy(Quest.World.w.Buddy))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x rope", ['The rope is about 40\' long.'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("tie rope to chair", ["You attach the rope to the broken chair."])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['conservatory', 'Buddy'], Quest.World.w.rope.locs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x rope", ["The rope is about 40' long. One end is tied to the broken chair. The other end is held by you."])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("tie rope to chair", ["It already is."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("untie rope from chair", ["You detach the rope from the broken chair."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("untie rope from chair", ["The rope is not attached to the broken chair."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['Buddy'], Quest.World.w.rope.locs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("tie rope to chair", ["You attach the rope to the broken chair."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['conservatory', 'Buddy'], Quest.World.w.rope.locs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.World.w.rope.isUltimatelyHeldBy(Quest.World.w.Buddy))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.World.w.rope.isUltimatelyHeldBy(Quest.World.w.conservatory))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.World.w.rope.isUltimatelyHeldBy(Quest.World.w.lounge))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("rope - room two");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The garden", "Very overgrown. The garden opens onto a road to the west, whilst the conservatory is east. There is a hook on the wall.", "You can see Arthur, a crate and Lara here.", "You can go east or west.", "The rope unwinds behind you."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['conservatory', 'garden', 'Buddy'], Quest.World.w.rope.locs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("tie rope to crate", ["That is not something you can attach the rope to."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("untie rope from crate", ["The rope is not attached to the crate."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("tie rope to hook", ["You attach the rope to the hook."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['conservatory', 'garden'], Quest.World.w.rope.locs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x rope", ["The rope is about 40' long. One end heads into the conservatory. The other end is tied to the hook."], true)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get rope", ['It is tied to something.'])




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("rope - room one again");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["You head east.", "The conservatory", "A light airy room.", "You can see a broken chair and a rope here.", "You can go north or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['conservatory', 'garden'], Quest.World.w.rope.locs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x rope", ["The rope is about 40' long. One end is tied to the broken chair. The other end heads into the garden."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("untie rope from chair", ["You detach the rope from the broken chair."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("attach rope", ["You attach the rope to the broken chair."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("untie rope", ["You detach the rope from the broken chair."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x rope", ["The rope is about 40' long. One end is held by you. The other end heads into the garden."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['Buddy', 'conservatory', 'garden'], Quest.World.w.rope.locs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", ["You head north.", "The lounge", "A smelly room with an old settee and a tv. There is a tatty rug on the floor.", "You can see a book, a book, a book, seven bricks, a canteen, a cardboard box (containing some boots), a coin, a glass cabinet (containing a jewellery box (containing a ring) and an ornate doll) and a small key here.", "You can go east, south, up or west.", "The rope unwinds behind you."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["The rope is not long enough, you cannot go any further."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("i", ["You are carrying a flashlight, a garage key, a rope and a suit (worn)."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x rope", ["The rope is about 40' long. One end is held by you. The other end heads into the conservatory."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['Buddy', 'lounge', 'conservatory', 'garden'], Quest.World.w.rope.locs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", ["You head south.", "The conservatory", "A light airy room.", "You can see a broken chair and a rope here.", "You can go north or west.", "You wind in the rope."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x rope", ["The rope is about 40' long. One end is held by you. The other end heads into the garden."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['Buddy', 'conservatory', 'garden'], Quest.World.w.rope.locs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The garden", "Very overgrown. The garden opens onto a road to the west, whilst the conservatory is east. There is a hook on the wall.", "You can see Arthur, a crate, Lara and a rope here.", "You can go east or west.", "You wind in the rope."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['Buddy', 'garden'], Quest.World.w.rope.locs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("untie rope", ["You detach the rope from the hook."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['Buddy'], Quest.World.w.rope.locs)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop rope", ["You drop the rope."])




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Get all (nothing)");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The road", "A road heading west over a bridge. You can see a shop to the north.", "You can go east, north or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get all", "Nothing there to do that with.");



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Buddy' does not exist on type '{}'.
  Quest.World.w.Buddy.money = 20

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("shop - text processor");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("buy", ["Nothing for sale here."]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", ["You head north.", "The shop", "A funny little shop.", "You can go south."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("The carrot is $0,02", Quest.Text.processText("The carrot is {money:carrot}"))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("The carrot is $0,02", Quest.Text.processText("The carrot is {$:carrot}"))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("You see $0,12", Quest.Text.processText("You see {$:12}"))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("The carrot is $0,02", Quest.Text.processText("{nm:item:the:true} is {$:item}", { item: Quest.World.w.carrot }))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("shop - buy");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Parser.parser.isForSale(Quest.World.w.carrot))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Parser.parser.isForSale(Quest.World.w.trophy))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(undefined, Quest.Parser.parser.isForSale(Quest.World.w.flashlight))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("buy carrot", ["You buy the carrot for $0,02."]);



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Parser.parser.isForSale(Quest.World.w.carrot0))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.World.w.carrot0.isForSale(Quest.World.player.loc))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("buy carrot", ["You buy the carrot for $0,02."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(16, Quest.World.w.Buddy.money)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("buy flashlight", ["You can't buy the flashlight here."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("buy trophy", ["You buy the trophy for $0,15."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, Quest.World.w.Buddy.money)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Parser.parser.isForSale(Quest.World.w.carrot))
  //console.log("----------------------");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Parser.parser.isForSale(Quest.World.w.trophy))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("buy trophy", ["You can't buy the trophy here - probably because you are already holding it."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("buy carrot", ["You can't afford the carrot (need $0,02)."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, Quest.World.w.Buddy.money)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'carrot0' does not exist on type '{}'.
  Quest.World.w.carrot0.loc = false

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("shop - sell");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("sell carrot", ["You can't sell the carrot here."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, Quest.World.w.Buddy.money)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("sell trophy", ["You sell the trophy for $0,08."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(9, Quest.World.w.Buddy.money)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("sell trophy", ["You don't have it."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(9, Quest.World.w.Buddy.money)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Buddy' does not exist on type '{}'.
  Quest.World.w.Buddy.money = 20
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'shop' does not exist on type '{}'.
  Quest.World.w.shop.sellingDiscount = 20
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(12, Quest.World.w.trophy.getBuyingPrice(Quest.World.w.Buddy))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("buy trophy", ["You buy the trophy for $0,12."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(8, Quest.World.w.Buddy.money)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'shop' does not exist on type '{}'.
  Quest.World.w.shop.buyingValue = 80
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("sell trophy", ["You sell the trophy for $0,12."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(20, Quest.World.w.Buddy.money)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("the zone - visible barrier and simple exit");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", ["You head south.", "The road", "A road heading west over a bridge. You can see a shop to the north.", "You can go east, north or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The bridge", "From the bridge you can just how deep the canyon is.", "You can see Piggy-suu here.", "You can go east or west."]);
  // Takes us to 5,0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The desert", "You are standing on a road heading west through a desert, and east over a bridge. There is a deep canyon southeast of you, running from the southwest to the northeast.", "You can go east, north, northeast, northwest, southwest or west."]);


  // Takes us to 4,0  
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The desert", "You are standing on a road running east to west through a desert. There is a deep canyon southeast of you, running from the southwest to the northeast.", "You can go east, north, northeast, northwest, south, southwest or west."]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop carrot", ["You drop the carrot."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("look", ["The desert", "You are standing on a road running east to west through a desert. There is a deep canyon southeast of you, running from the southwest to the northeast.", "You can see a carrot here.", "You can go east, north, northeast, northwest, south, southwest or west."]);


  // Takes us to 4,-1
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", ["You head south.", "The desert", "You are standing in the desert, south of the road. There is a deep canyon southeast of you, running from the southwest to the northeast.", "You can go north, northeast, northwest, southwest or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", ["You can't go south."]);
  // Takes us to 4,0  
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", ["You head north.", "The desert", "You are standing on a road running east to west through a desert. There is a deep canyon southeast of you, running from the southwest to the northeast.", "You can see a carrot here.", "You can go east, north, northeast, northwest, south, southwest or west."]);
  // Takes us to 5,0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["You head east.", "The desert", "You are standing on a road heading west through a desert, and east over a bridge. There is a deep canyon southeast of you, running from the southwest to the northeast.", "You can go east, north, northeast, northwest, southwest or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["You start across the bridge.", "The bridge", "From the bridge you can just how deep the canyon is.", "You can see Piggy-suu here.", "You can go east or west."]);
  // Takes us to 5,0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The desert", "You are standing on a road heading west through a desert, and east over a bridge. There is a deep canyon southeast of you, running from the southwest to the northeast.", "You can go east, north, northeast, northwest, southwest or west."]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("the zone - features");
  // 1. Takes us to 4,0  
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The desert", "You are standing on a road running east to west through a desert. There is a deep canyon southeast of you, running from the southwest to the northeast.", "You can see a carrot here.", "You can go east, north, northeast, northwest, south, southwest or west."]);
  // 2. Takes us to 3,0  
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The desert", "You are standing on a road running east to west through a desert. There is a big cactus to the southwest.", "You can go east, north, northeast, northwest, south, southeast, southwest or west."]);
  // 3. Takes us to 1,0  
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The desert", "You are standing on a road running east to west through a desert. There is a big cactus to the southwest.", "You can go east, north, northeast, northwest, south, southeast, southwest or west."]);
  // 4. Takes us to 1,0  
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The desert", "You are standing on a road running east to west through a desert. There is a big cactus to the south. There is a tower to the northwest.", "You can go east, north, northeast, northwest, south, southeast, southwest or west."]);
  // 5. Takes us to 1,1
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", ["You head north.", "The desert", "You are standing in the desert, north of the road. There is a big cactus to the south. There is a tower to the northwest.", "You can see a silver coin here.", "You can go east, north, northeast, northwest, south, southeast, southwest or west."]);
  // 6. Takes us to 1,2
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", ["You head north.", "The desert", "You are standing in the desert, north of the road. There is a tower to the northwest.", "You can go east, north, northeast, northwest, south, southeast, southwest or west."]);
  // 7. Takes us to 1,3
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", ["You head north.", "The desert", "You are standing in the desert, north of the road. There is a tower to the west.", "You can go east, north, northeast, northwest, south, southeast, southwest or west."]);
  // 8. Takes us to 1,4
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", ["You head north.", "The desert", "You are standing in the desert, north of the road. There is a tower to the southwest.", "You can go east, north, northeast, northwest, south, southeast, southwest or west."]);
  // 9. Takes us to 1,5
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", ["You head north.", "The desert", "You are standing in the desert, north of the road. There is a tower to the southwest.", "You can go east, north, northeast, northwest, south, southeast, southwest or west."]);
  // 10. Takes us to 1,6
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", ["You head north.", "The desert", "You are standing in the desert, north of the road. There is a tower to the southwest.", "You can go east, north, northeast, northwest, south, southeast, southwest or west."]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("the zone - invisible border");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x barrier", ["There doesn't seem to be anything you might call 'barrier' here."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", ["You head north.", "The desert", "You are standing in the desert, north of the road. The air seems to kind of shimmer.", "You can go east, north, northeast, northwest, south, southeast, southwest or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", ["You try to head north, but hit an invisible barrier."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x barrier", ["It is invisible!"]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("the zone - exits again");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The desert", "You are standing in the desert, north of the road. The air seems to kind of shimmer.", "You can go east, north, northeast, northwest, south, southeast, southwest or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", ["You head south.", "The desert", "You are standing in the desert, north of the road. There is a tower to the south.", "You can go east, north, northeast, northwest, south, southeast, southwest or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", ["You head south.", "The desert", "You are standing in the desert, north of the road. There is a tower to the southwest.", "You can go east, north, northeast, northwest, south, southeast, southwest or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("sw", ["You head southwest.", "The desert", "You are standing in the desert, north of the road. There is a tower to the south.", "You can go east, north, northeast, northwest, south, southeast, southwest or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", ["You head south.", "The desert", "You are standing in the desert, north of the road. There is a tall stone tower here.", "You can go east, in, north, northeast, northwest, south, southeast, southwest or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("in", ["You step inside the tower, and climb the step, spiral staircase to the top.", "Inside the tower", "A tower, looking out over the desert. To the south is the road, heading east back to your house. To the north is a magic portal, going who knows where.", "You can go down or north."]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", ["You head north.", "The shop", "A funny little shop.", "You can go south."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", ["You head south.", "The road", "A road heading west over a bridge. You can see a shop to the north.", "You can go east, north or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The bridge", "From the bridge you can just how deep the canyon is.", "You can see Piggy-suu here.", "You can go east or west."]);
  // Takes us to 5,0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The desert", "You are standing on a road heading west through a desert, and east over a bridge. There is a deep canyon southeast of you, running from the southwest to the northeast.", "You can go east, north, northeast, northwest, southwest or west."]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["You head west.", "The desert", "You are standing on a road running east to west through a desert. There is a deep canyon southeast of you, running from the southwest to the northeast.", "You can see a carrot here.", "You can go east, north, northeast, northwest, south, southwest or west."]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get carrot", ["You take the carrot."])


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("changing POV prep")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["You head east.", "The desert", "You are standing on a road heading west through a desert, and east over a bridge. There is a deep canyon southeast of you, running from the southwest to the northeast.", "You can go east, north, northeast, northwest, southwest or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["You start across the bridge.", "The bridge", "From the bridge you can just how deep the canyon is.", "You can see Piggy-suu here.", "You can go east or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["You head east.", "The road", "A road heading west over a bridge. You can see a shop to the north.", "You can go east, north or west."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("drop carrot", ["You drop the carrot."])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("changing POV")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'changePOV' does not exist on type '{}'.
  Quest.Utilities.util.changePOV(Quest.World.w.piggy_suu)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("l", ["The bridge", "From the bridge you can just how deep the canyon is.", "You can go east or west."])


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["You head east.", "The road", "A road heading west over a bridge. You can see a shop to the north.", "You can see Buddy (holding a flashlight and a garage key; wearing a suit) and a carrot here.", "You can go east, north or west."])


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("agenda follower")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'timetable' does not exist on type '{}'.
  Quest.World.w.timetable.setAgenda(['wait', 'run:script', 'wait:2', 'run:script:2', 'waitFor:check', 'run:script:3', 'waitFor:check:script:5'])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, Quest.World.w.timetable.counter)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wait", "Time passes...")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, Quest.World.w.timetable.counter)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wait", "Time passes...")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, Quest.World.w.timetable.counter)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wait", "Time passes...")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wait", "Time passes...")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, Quest.World.w.timetable.counter)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wait", "Time passes...")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(3, Quest.World.w.timetable.counter)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wait", "Time passes...")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wait", "Time passes...")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(3, Quest.World.w.timetable.counter)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'timetable' does not exist on type '{}'.
  Quest.World.w.timetable.flag = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wait", "Time passes...")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'timetable' does not exist on type '{}'.
  Quest.World.w.timetable.flag = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wait", "Time passes...")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(6, Quest.World.w.timetable.counter)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wait", "Time passes...")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wait", "Time passes...")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(6, Quest.World.w.timetable.counter)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'timetable' does not exist on type '{}'.
  Quest.World.w.timetable.flag = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wait", "Time passes...")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(11, Quest.World.w.timetable.counter)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("reverse order commands")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
  Quest.World.w.knife.loc = Quest.World.player.name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'carrot1' does not exist on type '{}'.
  Quest.World.w.carrot1.loc = Quest.World.player.name
  Quest.World.world.update()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("slice carrot with knife", "Done.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("use knife slice carrot", "Done.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("use knife to slice carrot", "Done.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("slice carrot with carrot", "You can't cut a carrot with the carrot.")



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("vessels and liquids")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'jug' does not exist on type '{}'.
  Quest.World.w.jug.loc = "big_kitchen_table"
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'canteen' does not exist on type '{}'.
  Quest.World.w.canteen.loc = "big_kitchen_table"
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'movePlayer' does not exist on type '{}'.
  test.movePlayer('kitchen')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get jug", ["You take the jug."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get canteen", ["You take the canteen."])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("fill jug with tears", ["I don't know of a liquid (or similar substance) called tears."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("fill jug with honey", ["There's no honey here."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("fill jug with water", ["You fill the jug."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("fill knife with water", ["Trying to put a liquid (or similar substance) in the knife is just going to cause a mess."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("fill jug with water", ["It is already full of water."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("empty knife", ["The knife is not something you can empty."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("empty jug", ["You empty the jug onto the ground, and it soaks away."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("fill jug", ["You fill the jug."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("empty jug into sink", ["You empty the jug into the dirty sink."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'jug' does not exist on type '{}'.
  Quest.World.w.jug.containedFluidName = 'water'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("pour canteen into jug", ["The canteen is already empty."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x canteen", ["The canteen is empty."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("pour jug into canteen", ["You empty the jug into the canteen."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x canteen", ["The canteen is full."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("pour water into jug", ["You empty the canteen into the jug."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("empty jug", ["You empty the jug onto the ground, and it soaks away."])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'canteen' does not exist on type '{}'.
  Quest.World.w.canteen.containedFluidName = 'honey'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("fill jug with honey", ["You empty the canteen into the jug."])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put jug in canteen", ["The canteen is not a container. It is a vessel, they are different, alright?"])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put water in canteen", ["You fill the canteen."])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'honey_pot' does not exist on type '{}'.
  Quest.World.w.honey_pot.loc = 'kitchen'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'canteen' does not exist on type '{}'.
  delete Quest.World.w.canteen.containedFluidName
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'jug' does not exist on type '{}'.
  delete Quest.World.w.jug.containedFluidName
  Quest.World.world.update()

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x honey", ["A pot of honey."])
  // the honey pot is NOT a source of honey, so this is right
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put honey in canteen", ["There's no honey here."])



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("item directions")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
  Quest.World.w.Kyle.loc = 'kitchen'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'light_switch' does not exist on type '{}... Remove this comment to see the full error message
  Quest.World.w.light_switch.switchedon = true
  Quest.World.world.update()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("tell kyle to go through trapdoor", ["Kyle disappears through the trapdoor."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("go through trapdoor", ["You go through the trapdoor, and down the ladder.", "The basement", "A dank room, with piles of crates everywhere.", "You can see a crates, Kyle (holding a clock; wearing a straw boater), a ladder and a light switch here.", "You can go up."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("tell kyle to climb ladder", ["Kyle leaves the basement, heading up."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("go up ladder", ["You head up.", "The kitchen", "A clean room. There is a sink in the corner.", "You can see a big kitchen table, a camera, Kyle (holding a clock; wearing a straw boater) and a trapdoor (open) here.", "You can go down, north or west."])


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("give plus")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ham_and_cheese_sandwich' does not exist ... Remove this comment to see the full error message
  Quest.World.w.ham_and_cheese_sandwich.loc = Quest.World.player.name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("give kyle knife", ["Done."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.knife.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
  Quest.World.w.knife.loc = Quest.World.player.name

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("give knife", ["Done."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.knife.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
  Quest.World.w.knife.loc = Quest.World.player.name

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("give knife to kyle", ["Done."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.knife.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
  Quest.World.w.knife.loc = Quest.World.player.name

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
  test.menuResponseNumber = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("give c", ["Done."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.canteen.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'canteen' does not exist on type '{}'.
  Quest.World.w.canteen.loc = Quest.World.player.name

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("give knife canteen", ["Knife: Done.", "Canteen: Done."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.knife.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.canteen.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
  Quest.World.w.knife.loc = Quest.World.player.name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'canteen' does not exist on type '{}'.
  Quest.World.w.canteen.loc = Quest.World.player.name

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("give plus 2")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("give kyle knife canteen", ["Knife: Done.", "Canteen: Done."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.knife.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.canteen.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
  Quest.World.w.knife.loc = Quest.World.player.name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'canteen' does not exist on type '{}'.
  Quest.World.w.canteen.loc = Quest.World.player.name

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("give nonsense canteen", ["There doesn't seem to be anything you might call 'nonsense canteen' here."])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("give kyle knife ham canteen", ["Knife: Done.", "Ham and cheese sandwich: Done.", "Canteen: Done."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.knife.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.canteen.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.ham_and_cheese_sandwich.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
  Quest.World.w.knife.loc = Quest.World.player.name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'canteen' does not exist on type '{}'.
  Quest.World.w.canteen.loc = Quest.World.player.name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ham_and_cheese_sandwich' does not exist ... Remove this comment to see the full error message
  Quest.World.w.ham_and_cheese_sandwich.loc = Quest.World.player.name


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("give kyle knife ham sandwich canteen", ["Knife: Done.", "Ham and cheese sandwich: Done.", "Canteen: Done."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.knife.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.canteen.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.ham_and_cheese_sandwich.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, give piggy knife ham sandwich canteen", ["Knife: Done.", "Ham and cheese sandwich: Done.", "Canteen: Done."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.player.name, Quest.World.w.knife.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.player.name, Quest.World.w.canteen.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.player.name, Quest.World.w.ham_and_cheese_sandwich.loc)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("give plus 3")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("give kyle knife ham and cheese sandwich canteen", ["Knife: Done.", "Ham and cheese sandwich: Done.", "Canteen: Done."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.knife.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.canteen.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Kyle', Quest.World.w.ham_and_cheese_sandwich.loc)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("kyle, give me knife ham and cheese sandwich canteen", ["Knife: Done.", "Ham and cheese sandwich: Done.", "Canteen: Done."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.player.name, Quest.World.w.knife.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.player.name, Quest.World.w.canteen.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(Quest.World.player.name, Quest.World.w.ham_and_cheese_sandwich.loc)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
  Quest.World.w.knife.loc = Quest.World.player.name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'canteen' does not exist on type '{}'.
  Quest.World.w.canteen.loc = Quest.World.player.name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ham_and_cheese_sandwich' does not exist ... Remove this comment to see the full error message
  Quest.World.w.ham_and_cheese_sandwich.loc = Quest.World.player.name

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("give alt")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Lara' does not exist on type '{}'.
  Quest.World.w.Lara.loc = 'kitchen'
  Quest.World.world.update()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("give lara jug", ["'That's not a carrot,' Lara points out."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("give lara knife", ["'A knife?' says Lara. 'I guess I could use that... for something?'"])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("give lara carrot", ["'A carrot!' says Lara with delight, before stuffing it in her mouth. 'So, do you have any more?'"])




  /*
    test.title("quests")
    test.assertCmd("talk to buddy", ["'Hey, Buddy,' you say.", "'Hey yourself! Say, could you get me a carrot?'","Quest started: <i>A carrot for Buddy</i>", "Go find a carrot."])
    let res = Quest.quest.getState('A carrot for Buddy', Quest.World.w.Buddy)
    test.assertEqual(0, res.progress)
    test.assertEqual(Quest.quest.ACTIVE, res.state)
    
  */









  /* */
  //this.check_lang = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'check_lang' does not exist on type '{}'.
  if (this.check_lang) {
    const langSkips = [
      /regex/,
      /prefix/i,
      /script/i,
      /rope_/,   // rope ones are combined so this system does not find them anyway
      /sl_dir_headings/,
      /sl_dir_msg/,
      /sl_no_filename/,
      /spoken_on/,
      /spoken_off/,
      /mode_brief/,
      /mode_terse/,
      /mode_verbose/,
      /mode_silent_on/,
      /mode_silent_off/,
      /undo_disabled/,
      /undo_not_available/,
      /undo_done/,
      /again_not_available/,
      /scores_not_implemented/,
      /restart_no/,
      /restart_are_you_sure/,
      /betaTestIntro/,
      /game_over_html/,
      /list_and/,
      /list_nothing/,
      /list_or/,
      /list_nowhere/,
      /never_mind/,
      /click_to_continue/,
      /buy/,
      /buy_headings/,
      /current_money/,
      /yesNo/,
      /pronouns/,
      /verbs/,
      /invModifiers/,
      /exit_list/,
      /numberUnits/,
      /numberTens/,
      /ordinalReplacements/,
      /conjugations/,
      /contentsForData/,
      /addDefiniteArticle/,
      /addIndefiniteArticle/,
      /getName/,
      /toWords/,
      /toOrdinal/,
      /convertNumbers/,
      /conjugate/,
      /pronounVerb/,
      /pronounVerbForGroup/,
      /verbPronoun/,
      /nounVerb/,
      /verbNoun/,
    ]
    let countOutstanding = 0
    let countDone = 0
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'usedStrings' does not exist on type '{ t... Remove this comment to see the full error message
    console.log(Quest.Text.usedStrings.length)
    for (let el in lang) {
      if (typeof el !== 'string') continue
      if (langSkips.find(e => el.match(e))) continue
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'usedStrings' does not exist on type '{ t... Remove this comment to see the full error message
      if (Quest.Text.usedStrings.includes(lang[el])) {
        countDone++
        continue
      }
      console.log(el)
      countOutstanding++
    }
    console.log(countOutstanding + '/' + (countOutstanding + countDone))
  }



}