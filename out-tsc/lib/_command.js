import { Quest } from '../types/quest';
// Should all be language neutral (except the inspect function, which is just for debugging)
export class Cmd {
    constructor(name, hash) {
        // tmp?: { regex: RegExp; mod: {}; };
        this.all = false;
        this.antiRegexes = [];
        this.attName = '';
        this.name = name;
        this.objects = [];
        this.rules = [];
        this.default = function (options) {
            Quest.IO.falsemsg(this.defmsg, options);
        };
        // Is this command a match at the most basic level (ignoring items, etc)
        // Also resets the command
        this._test = function (s) {
            if (!Array.isArray(this.regexes))
                console.log(this); // it will crash in the next line!
            for (const regex of this.regexes) {
                if (regex instanceof RegExp) {
                    if (regex.test(s)) {
                        this.tmp = { mod: {}, regex };
                        return true;
                    }
                }
                // else {
                //   if (regex.regex.test(s)) {
                //     this.tmp = { regex: regex.regex, mod: regex.mod }
                //     return true
                //   }
                // }
            }
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'NO_MATCH' does not exist on type '{}'.
            this.tmp = { score: Quest.Parser.parser.NO_MATCH };
            return false;
        };
        // A command can have an array of regexs, "antiRegexes" that will stop the command getting matched
        this._testNot = function (s) {
            if (!Array.isArray(this.antiRegexes))
                return true;
            for (const regex of this.antiRegexes) {
                if (regex instanceof RegExp) {
                    if (regex.test(s)) {
                        return false;
                    }
                }
                // else {
                //   if (regex.regex.test(s)) {
                //     return false
                //   }
                // }
            }
            return true;
        };
        // We want to see if this command is a good match to the string
        // This will involve trying to matching objects, according to the
        // values in the command
        //
        // The results go in an attribute, tmp, that should have alreadsy been set by test,
        // and is a dictionary containing:
        //
        // objectTexts - the matched object names from the player input
        // objects - the matched objects (lists of lists ready to be disabiguated)
        // score - a rating of how good the match is
        // error - a string to report why it failed, if it did!
        //
        // objects will be an array for each object role (so PUT HAT IN BOX is two),
        // of arrays for each object listed (so GET HAT, TEAPOT AND GUN is three),
        // of possible object matches (so GET HAT is four if there are four hats in the room)
        //
        // score is a rating for how well this command matches, based on the score attribute
        // of the command itself (defaults to 10); if zero or less, this is an error
        //
        // If this does give an error, it is only reported if no command is a success
        //
        // The parameter mod allows us to change how this is done, eg if the nouns are reversed
        // and will have been set in test
        this.matchItems = function (s) {
            if (!this._test(s))
                return;
            if (!this._testNot(s))
                return;
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
            Quest.Parser.parser.msg('---------------------------------------------------------');
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
            Quest.Parser.parser.msg(`* Looking at candidate: ${this.name}`);
            // this is a temporary set of data used while we parser one input
            this.tmp = this.tmp || {};
            this.tmp.objectTexts = [],
                this.tmp.objects = [],
                this.tmp.score = this.score ? this.score : 10;
            this.tmp.error = undefined;
            // Array of item positions corresponding to capture groups in the regex
            let arr = this.tmp.regex.exec(s);
            arr.shift(); // first element is the whole match, so discard
            if (this.tmp.mod.reverse)
                arr = arr.reverse();
            if (this.tmp.mod.func)
                arr = this.tmp.mod.func(arr);
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
            Quest.Parser.parser.msg(`..Base score: ${this.tmp.score}`);
            for (let i = 0; i < arr.length; i++) {
                const cmdParams = this.objects[i];
                if (!cmdParams) {
                    Quest.IO.errormsg(`The command "${this.name}" seems to have an error. It has more capture groups than there are elements in the 'objects' attribute.`, true);
                    return false;
                }
                if (arr[i] === undefined) {
                    Quest.IO.errormsg(`The command "${this.name}" seems to have an error. It has captured undefined. This is probably an issue with the command's regular expression.`, true);
                    return false;
                }
                let score = 0;
                this.tmp.objectTexts.push(arr[i]);
                if (cmdParams.special) {
                    // this capture group has been flagged to be special
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'specialText' does not exist on type '{}'... Remove this comment to see the full error message
                    const specialError = Quest.Parser.parser.specialText[cmdParams.special].error(arr[i], cmdParams);
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'BAD_SPECIAL' does not exist on type '{}'... Remove this comment to see the full error message
                    if (specialError)
                        return this.setError(Quest.Parser.parser.BAD_SPECIAL, specialError);
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'specialText' does not exist on type '{}'... Remove this comment to see the full error message
                    const special = Quest.Parser.parser.specialText[cmdParams.special].exec(arr[i], cmdParams);
                    if (special !== false)
                        this.tmp.objects.push(special);
                    score = 1;
                    if (special.name) {
                        // ts-error-fixed ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
                        Quest.Parser.parser.msg(`-> special match object found: ${special.name}`);
                    }
                    else {
                        // ts-error-fixed ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
                        Quest.Parser.parser.msg(`-> special match found: ${special}`);
                    }
                }
                else if (Quest.lang.all_regex.test(arr[i]) || Quest.lang.all_exclude_regex.test(arr[i])) {
                    // Handle ALL and ALL BUT
                    this.tmp.all = true;
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'DISALLOWED_MULTIPLE' does not exist on t... Remove this comment to see the full error message
                    if (!cmdParams.multiple)
                        return this.setError(Quest.Parser.parser.DISALLOWED_MULTIPLE, Quest.lang.no_multiples_msg);
                    if (!cmdParams.scope)
                        console.log(`WARNING: Command without scope - ${this.name}`);
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getScope' does not exist on type '{}'.
                    let scope = Quest.Parser.parser.getScope(cmdParams);
                    const exclude = [Quest.World.player];
                    // anything flagged as scenery should be excluded
                    for (const item of scope) {
                        if (item.scenery || item.excludeFromAll)
                            exclude.push(item);
                    }
                    if (Quest.lang.all_exclude_regex.test(arr[i])) {
                        // if this is ALL BUT we need to remove some things from the list
                        // excludes must be in isVisible
                        // if it is ambiguous or not recognised it does not get added to the list
                        // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'all_exclude_regex'.
                        const s = arr[i].replace(all_exclude_regex, '').trim();
                        // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'joiner_regex'.
                        const objectNames = s.split(joiner_regex).map((el) => el.trim());
                        for (const s in objectNames) {
                            // ts-error-fixed ts-migrate(2339) FIXME: Property 'findInList' does not exist on type '{}'.
                            const items = Quest.Parser.parser.findInList(s, Quest.World.world.scope);
                            if (items.length === 1)
                                exclude.push(items[0]);
                        }
                    }
                    scope = scope.filter((el) => !exclude.includes(el));
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'DISALLOWED_MULTIPLE' does not exist on t... Remove this comment to see the full error message
                    if (scope.length > 1 && !cmdParams.multiple)
                        return this.setError(Quest.Parser.parser.DISALLOWED_MULTIPLE, Quest.lang.no_multiples_msg);
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'NONE_FOR_ALL' does not exist on type '{}... Remove this comment to see the full error message
                    if (scope.length === 0)
                        return this.setError(Quest.Parser.parser.NONE_FOR_ALL, this.nothingForAll ? this.nothingForAll : Quest.lang.nothing_msg);
                    score = 2;
                    this.tmp.objects.push(scope.map((el) => [el]));
                }
                else {
                    if (!cmdParams.scope) {
                        console.warn('No scope found in command. This may be because the scope specified does not exist; check the spelling. The command in question is:');
                        console.log(this);
                        // ts-error-fixed ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
                        Quest.Parser.parser.msg('ERROR: No scope');
                        return null;
                    }
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getScopes' does not exist on type '{}'.
                    const scope = Quest.Parser.parser.getScopes(cmdParams);
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'matchToNames' does not exist on type '{}... Remove this comment to see the full error message
                    Quest.Parser.parser.matchToNames(arr[i], scope, cmdParams, this.tmp);
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
                    if (this.tmp.score === Quest.Parser.parser.NO_OBJECT) {
                        this.tmp.error = this.noobjecterror(this.tmp.error_s, i);
                        if (this.objects.length > 1)
                            this.tmp.score += 10;
                        // ts-error-fixed ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
                        Quest.Parser.parser.msg(`Result score is (no object): ${this.tmp.score}`);
                        return;
                    }
                }
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
                Quest.Parser.parser.msg(`...Adding to the score: ${score}`);
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
                Quest.Parser.parser.msg(`Result score is: ${this.tmp.score}`);
                this.tmp.score += score;
            }
        };
        // If this has multiple parts the error probably takes priority
        // GET STUFF -> assume item
        // FILL JUG WITH WATER -> assume fluid
        this.setError = function (score, msg) {
            this.tmp = this.tmp || {};
            this.tmp.error = msg;
            this.tmp.score = score;
            if (this.objects.length > 1)
                this.tmp.score += 10;
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
            Quest.Parser.parser.msg(`Match failed: ${this.tmp.score} (${msg})`);
        };
        // This is the default script for commands
        // Assumes objects is:
        // optionally the verb, a string
        // an array of objects - each object will have the attribute indicated by attName called
        // optionally an array of one object
        this.script = function (objects) {
            let success = false;
            let suppressEndturn = false;
            let verb;
            if (typeof objects[0] === 'string')
                verb = objects.shift();
            let secondItem;
            if (objects.length > 1)
                secondItem = objects[1][0];
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
            const multiple = objects[0] && (objects[0].length > 1 || Quest.Parser.parser.currentCommand.all);
            if (objects[0].length === 0) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
                Quest.IO.metamsg(Quest.lang.nothing_msg);
                return Quest.World.world.FAILED;
            }
            for (let i = 0; i < objects[0].length; i++) {
                const options = {
                    char: Quest.World.player, item: objects[0][i], multiple, secondItem, verb,
                };
                const obj = objects[0][i];
                if (!obj[`${this.attName}_count`])
                    obj[`${this.attName}_count`] = 0;
                if (!obj[this.attName]) {
                    this.default(options);
                }
                else {
                    const result = this.processCommand(options);
                    if (result === Quest.World.world.SUCCESS_NO_TURNSCRIPTS) {
                        suppressEndturn = true;
                        obj[`${this.attName}_count`]++;
                        success = true;
                    }
                }
            }
            if (success) {
                return (this.noTurnscripts || suppressEndturn ? Quest.World.world.SUCCESS_NO_TURNSCRIPTS : Quest.World.world.SUCCESS);
            }
            return Quest.World.world.FAILED;
        };
        // This is the second script for commands
        // Assumes a verb and two objects; the verb may or may not be the first object
        this.scriptWith = function (objects) {
            let success = false;
            let suppressEndturn = false;
            let verb;
            if (objects.length > 2)
                verb = objects.shift();
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
            const multiple = objects[0] && (objects[0].length > 1 || Quest.Parser.parser.currentCommand.all);
            if (objects[0].length === 0) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
                Quest.IO.metamsg(Quest.lang.nothing_msg);
                return Quest.World.world.FAILED;
            }
            for (let i = 0; i < objects[0].length; i++) {
                const options = {
                    char: player, item: objects[0][i], multiple, verb, with: objects[1][0],
                };
                if (!objects[0][i][this.attName]) {
                    this.default(options);
                }
                else {
                    let result = this.processCommand(options);
                    if (result === Quest.World.world.SUCCESS_NO_TURNSCRIPTS) {
                        suppressEndturn = true;
                        result = true;
                    }
                    success = result || success;
                }
            }
            if (success) {
                return (this.noTurnscripts || suppressEndturn ? Quest.World.world.SUCCESS_NO_TURNSCRIPTS : Quest.World.world.SUCCESS);
            }
            return Quest.World.world.FAILED;
        };
        this.processCommand = function (options) {
            for (const rule of this.rules) {
                if (typeof rule !== 'function') {
                    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
                    Quest.IO.errormsg(`Failed to process command '${this.name}' as one of its rules is not a function.`);
                    console.log(this);
                    console.log(rule);
                }
                if (!rule(this, options))
                    return false;
            }
            let result = Quest.Utilities.printOrRun(options.char, options.item, this.attName, options);
            if (typeof result !== 'boolean' && result !== Quest.World.world.SUCCESS_NO_TURNSCRIPTS) {
                // Assume the author wants to return true from the verb
                result = true;
            }
            return result;
        };
        this.noobjecterror = function (s) {
            return Quest.lang.object_unknown_msg(s);
        };
        for (const key in hash) {
            this[key] = hash[key];
        }
        this.attName = this.attName ? this.attName : this.name.toLowerCase();
        for (const key in this.objects) {
            if (!this.objects[key].attName) {
                this.objects[key].attName = this.attName;
            }
        }
        if (!this.regex && !this.regexes) {
            // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            this.regexes = Array.isArray(Quest.lang.regex[this.name]) ? Quest.lang.regex[this.name] : [Quest.lang.regex[this.name]];
        }
        if (this.withScript)
            this.script = this.scriptWith;
    }
    defmsg(defmsg, options) {
        throw new Error('Method not implemented.');
    }
    noobjecterror(error_s, i) {
        throw new Error('Method not implemented.');
    }
    processCommand(options) {
        return 1;
    }
}
// Use only for NPC commands that you are not giving your
// own custom script attribute. Commands must be an order to a single
// NPC in the form verb-object.
export function NpcCmd(name, hash) {
    const cmd = new Cmd(name, hash);
    Object.assign(this, cmd);
    // Cmd.call(this, name, hash);
    if (!this.cmdCategory)
        this.cmdCategory = name;
    this.script = function (objects) {
        const npc = objects[0][0];
        if (!npc.npc) {
            Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
            return Quest.World.world.FAILED;
        }
        let success = false;
        let handled;
        if (objects.length !== 2) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.errormsg(`The command ${name} is trying to use a facility for NPCs to do it, but there is no object list; this facility is only for commands in the form verb-object.`);
            return Quest.World.world.FAILED;
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
        const multiple = (objects[1].length > 1 || Quest.Parser.parser.currentCommand.all);
        for (const obj of objects[1]) {
            const options = { char: npc, item: obj, multiple };
            if (!npc.getAgreement(this.cmdCategory, obj, this))
                continue;
            if (!obj[this.attName]) {
                this.default(options);
            }
            else {
                let result = this.processCommand({ char: npc, item: obj, multiple });
                if (result === Quest.World.world.SUCCESS_NO_TURNSCRIPTS) {
                    result = true;
                }
                success = result || success;
            }
        }
        if (success) {
            npc.pause();
            return (this.noTurnscripts ? Quest.World.world.SUCCESS_NO_TURNSCRIPTS : Quest.World.world.SUCCESS);
        }
        return Quest.World.world.FAILED;
    };
}
export function ExitCmd(name, dir, hash) {
    const cmd = new Cmd(name, hash);
    Object.assign(this, cmd);
    // Cmd.call(this, name, hash);
    this.exitCmd = true;
    this.dir = dir;
    this.objects = [{ special: 'ignore' }, { special: 'ignore' }],
        this.script = function (objects) {
            if (!Quest.World.currentLocation.hasExit(this.dir)) {
                const exitObj = Quest.lang.exit_list.find((el) => el.name === this.dir);
                // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                if (exitObj.not_that_way)
                    return Quest.IO.failedmsg(exitObj.not_that_way, { char: Quest.World.player, dir: this.dir });
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'customNoExitMsg' does not exist on type ... Remove this comment to see the full error message
                if (Quest.Settings.settings.customNoExitMsg)
                    return Quest.IO.failedmsg(Quest.Settings.settings.customNoExitMsg(Quest.World.player, dir));
                return Quest.IO.failedmsg(Quest.lang.not_that_way, { char: Quest.World.player, dir: this.dir });
            }
            const ex = Quest.World.currentLocation.getExit(this.dir);
            if (typeof ex === 'object') {
                if (!Quest.World.player.testMove(ex)) {
                    return Quest.World.world.FAILED;
                }
                if (typeof ex.use !== 'function') {
                    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
                    Quest.IO.errormsg("Quest.World.Exit's 'use' attribute is not a function (or does not exist).");
                    console.log('Bad exit:');
                    console.log(ex);
                    return Quest.World.world.FAILED;
                }
                const flag = ex.use(Quest.World.player, ex);
                if (typeof flag !== 'boolean') {
                    console.warn(`Quest.World.Exit on ${Quest.World.currentLocation.name} failed to return a Boolean value, indicating success or failure; assuming success`);
                    return Quest.World.world.SUCCESS;
                }
                if (flag && ex.extraTime)
                    Quest.World.game.elapsedTime += ex.extraTime;
                return flag ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
            }
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.errormsg('Unsupported type for direction');
            return Quest.World.world.FAILED;
        };
}
export function NpcExitCmd(name, dir, hash) {
    const cmd = new Cmd(name, hash);
    Object.assign(this, cmd);
    // Cmd.call(this, name, hash);
    this.exitCmd = true;
    this.dir = dir;
    this.objects = [{ attName: 'npc', scope: Quest.Parser.parser.isHere }, { special: 'ignore' }, { special: 'ignore' }],
        this.script = function (objects) {
            const npc = objects[0][0];
            if (!npc.npc)
                return Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
            if (!Quest.World.currentLocation.hasExit(this.dir)) {
                const exitObj = Quest.lang.exit_list.find((el) => el.name === this.dir);
                // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                if (exitObj.not_that_way)
                    return Quest.IO.failedmsg(exitObj.not_that_way, { char: npc, dir: this.dir });
                return Quest.IO.failedmsg(Quest.lang.not_that_way, { char: npc, dir: this.dir });
            }
            const ex = Quest.World.currentLocation.getExit(this.dir);
            if (typeof ex !== 'object') {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
                Quest.IO.errormsg('Unsupported type for direction');
                return Quest.World.world.FAILED;
            }
            if (npc.testMove && !npc.testMove(ex))
                return Quest.World.world.FAILED;
            if (!npc.getAgreement('Go', ex))
                return Quest.World.world.FAILED;
            const flag = ex.use(npc, ex);
            if (flag)
                npc.pause();
            return flag ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
        };
}
// Should be called during the initialisation process
export function initCommands() {
    const newCmds = [];
    for (const el of Quest.Commands.commands) {
        if (!el.regexes) {
            el.regexes = [el.regex];
        }
        if (el.npcCmd) {
            if (!Array.isArray(el.regexes))
                console.log(el);
            // console.log("creating NPC command for " + el.name)
            const regexAsStr = el.regexes[0]?.source.substr(1); // lose the ^ at the start, as we will prepend to it
            const objects = el.objects.slice();
            objects.unshift({ attName: 'npc', scope: Quest.Parser.parser.isHere });
            const data = {
                attName: el.attName,
                cmdCategory: el.cmdCategory ? el.cmdCategory : el.name,
                default: el.default,
                defmsg: el.defmsg,
                forNpc: true,
                objects,
                rules: el.rules,
                score: el.score,
            };
            // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
            const cmd = new NpcCmd(`Npc${el.name}`, data);
            cmd.regexes = [];
            for (const key in Quest.lang.tell_to_prefixes) {
                // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                cmd.regexes.push(new RegExp(`^${Quest.lang.tell_to_prefixes[key]}${regexAsStr}`));
            }
            if (el.useThisScriptForNpcs)
                cmd.script = el.script;
            cmd.scope = [];
            for (const el2 of el.objects) {
                cmd.scope.push(el2 === Quest.Parser.parser.isHeld ? Quest.Parser.parser.isHeldByNpc : el2);
                cmd.scope.push(el2 === Quest.Parser.parser.isWorn ? Quest.Parser.parser.isWornByNpc : el2);
            }
            newCmds.push(cmd);
        }
    }
    Quest.Commands.commands.push.apply(Quest.Commands.commands, newCmds);
    for (const el of Quest.lang.exit_list) {
        if (el.type !== 'nocmd') {
            let regex = `(${Quest.lang.go_pre_regex})(${el.name}|${el.abbrev.toLowerCase()}`;
            if (el.alt) {
                regex += `|${el.alt}`;
            }
            regex += ')$';
            // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
            Quest.Commands.commands.push(new ExitCmd(`Go${Quest.Utilities.sentenceCase(el.name)}`, el.name, { regexes: [new RegExp(`^${regex}`)] }));
            const regexes = [];
            for (const key in Quest.lang.tell_to_prefixes) {
                // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                regexes.push(new RegExp(`^${Quest.lang.tell_to_prefixes[key]}${regex}`));
            }
            // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
            Quest.Commands.commands.push(new NpcExitCmd(`NpcGo${Quest.Utilities.sentenceCase(el.name)}2`, el.name, { regexes }));
        }
    }
}
// Useful in a command's script when handling NPCs as well as the player
export function extractChar(cmd, objects) {
    let char;
    if (cmd.forNpc) {
        char = objects[0][0];
        if (!char.npc) {
            Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: char });
            return Quest.World.world.FAILED;
        }
        objects.shift();
    }
    else {
        char = Quest.World.player;
    }
    return char;
}
export function findCmd(name) {
    return Quest.Commands.commands.find((el) => el.name === name);
}
export function testCmd(name, s) {
    const cmd = findCmd(name);
    cmd.matchItems(s);
    console.log(cmd.tmp);
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg('See results in console (F12)');
}
export const cmdRules = {
    canTalkTo(cmd, options) {
        if (!options.char.testTalk(options.item))
            return false;
        if (!options.item.npc && !options.item.talker && !options.item.player)
            return Quest.IO.falsemsg(Quest.lang.not_able_to_hear, options);
        return true;
    },
    // Item's location is the char
    isHeld(cmd, options) {
        if (options.item.isAtLoc(options.char.name, Quest.World.world.PARSER))
            return true;
        if (options.item.loc) {
            options.holder = Quest.World.w[options.item.loc];
            if (options.holder.npc || options.holder.player)
                return Quest.IO.falsemsg(Quest.lang.char_has_it, options);
        }
        return Quest.IO.falsemsg(Quest.lang.not_carrying, options);
    },
    // Item's location is the char and it is not worn
    isHeldNotWorn(cmd, options) {
        if (!options.item.getWorn() && options.item.isAtLoc(options.char.name, Quest.World.world.PARSER))
            return true;
        if (options.item.isAtLoc(options.char.name, Quest.World.world.PARSER))
            return Quest.IO.falsemsg(Quest.lang.already_wearing, options);
        if (options.item.loc) {
            options.holder = Quest.World.w[options.item.loc];
            if (options.holder.npc || options.holder.player)
                return Quest.IO.falsemsg(Quest.lang.char_has_it, options);
        }
        return Quest.IO.falsemsg(Quest.lang.not_carrying, options);
    },
    // Item's location is the char's location or the char
    // or item is reachable, but not held by someone else
    isHere(cmd, options) {
        if (options.item.isAtLoc(options.char.loc, Quest.World.world.PARSER))
            return true;
        if (options.item.loc) {
            options.holder = Quest.World.w[options.item.loc];
            if (options.already && options.holder === options.char)
                return Quest.IO.falsemsg(Quest.lang.already_have, options);
            if (options.holder.npc || options.holder.player)
                return Quest.IO.falsemsg(Quest.lang.char_has_it, options);
        }
        if (options.item.scopeStatus.canReach || options.item.multiLoc)
            return true;
        return Quest.IO.falsemsg(Quest.lang.not_here, options);
    },
    // Used by take to note if player already holding
    isHereAlready(cmd, options) {
        options.already = true;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
        return isHere(cmd, options);
    },
    // Item's location is the char's location or the char
    // or item is reachable, but not held by someone else
    isPresent(cmd, options) {
        if (options.item.isAtLoc(options.char.loc, Quest.World.world.PARSER))
            return true;
        if (options.item.isAtLoc(options.char.name, Quest.World.world.PARSER))
            return true;
        if (options.item.loc) {
            options.holder = Quest.World.w[options.item.loc];
            // Has a specific location and held by someone
            if (options.holder.npc || options.holder.player)
                return Quest.IO.falsemsg(Quest.lang.char_has_it, options);
        }
        if (options.item.scopeStatus.canReach)
            return true;
        return Quest.IO.falsemsg(Quest.lang.not_here, options);
    },
    // In this location or held by this char, or in a container (used by eg TAKE)
    isPresentOrContained(cmd, options) {
        // use parser functions here as we do not want messages at this point
        if (!options.item.isAtLoc)
            console.log(options.item.name);
        if (!options.char)
            console.log(cmd.name);
        if (options.item.isAtLoc(options.char.name, Quest.World.world.PARSER))
            return true;
        if (Quest.Parser.parser.isHere(options.item))
            return true;
        if (options.item.loc) {
            options.holder = Quest.World.w[options.item.loc];
            if (options.holder && (options.holder.npc || options.holder.player))
                return Quest.IO.falsemsg(Quest.lang.char_has_it, options);
        }
        if (Quest.Parser.parser.isContained(options.item))
            return true;
        return Quest.IO.falsemsg(Quest.lang.not_here, options);
    },
    // Item's location is the char and it is worn
    isWorn(cmd, options) {
        if (options.item.getWorn() && options.item.isAtLoc(options.char.name, Quest.World.world.PARSER))
            return true;
        if (options.item.isAtLoc(options.char.name, Quest.World.world.PARSER))
            return Quest.IO.falsemsg(Quest.lang.not_wearing, options);
        if (options.item.loc) {
            options.holder = Quest.World.w[options.item.loc];
            if (options.holder.npc || options.holder.player)
                return Quest.IO.falsemsg(Quest.lang.char_has_it, options);
        }
        return Quest.IO.falsemsg(Quest.lang.not_carrying, options);
    },
    testManipulate(cmd, options) {
        if (!options.char.testManipulate(options.item, cmd.name))
            return false;
        return true;
    },
    testPosture(cmd, options) {
        if (!options.char.testPosture(cmd.name))
            return false;
        return true;
    },
};
export const Command = {
    Cmd,
    ExitCmd,
    NpcCmd,
    NpcExitCmd,
    cmdRules,
    extractChar,
    findCmd,
    initCommands,
    testCmd,
};
Quest.Command = Command;
//# sourceMappingURL=_command.js.map