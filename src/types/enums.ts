export const INDEFINITE = 1;
export const DEFINITE = 2;
export const COUNT = 3;

export const WORLD = {
  ALL:                    6,
  // constants for verbosity of room descriptions
  BRIEF:                  1,
  FAILED:                 -1,
  INVENTORY:              3,
  LIGHT_EXTREME:          4,
  LIGHT_FULL:             3,
  LIGHT_MEAGRE:           2,
  // VISIBLE:1,
  // REACHABLE:2,
  // constants for lighting levels
  LIGHT_NONE:             0,
  LIGHT_SELF:             1,
  // constants for isAtLoc situations
  LOOK:                   1,
  PARSER:                 2,
  PARSER_FAILURE:         -2,
  PURCHASE:               5,
  SIDE_PANE:              4,
  // constants for command responses
  // (but a verb will return true or false, so the command that uses it
  // can in turn return one of these - a verb is an attribute of an object)
  SUCCESS:                1,
  SUCCESS_NO_TURNSCRIPTS: 2,
  TERSE:                  2,
  VERBOSE:                3,
};
Object.freeze(WORLD);
