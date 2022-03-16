namespace Quest {
  // Language support
  export const lang = {

    already_have: "{multi}{pv:char:'ve:true} got {ob:item} already.",

    already_wearing: '{multi}{nv:char:be:true} already wearing {ob:item}.',

    cannot_drink: '{nv:item:be:true} not something {nv:char:can} drink.',

    cannot_drop: "{multi}{pv:char:can't:true} drop {ob:item}.",

    cannot_eat: '{nv:item:be:true} not something {nv:char:can} eat.',

    cannot_ingest: '{nv:item:be:true} not something {nv:char:can} ingest.',

    cannot_remove_under: "{nv:char:can't:true} take off {pa:char} {nm:item} whilst wearing {pa:char} {nm:outer}.",

    cannot_take: "{multi}{pv:char:can't:true} take {ob:item}.",

    cannot_take_component: "{multi}{pv:char:can't:true} take {ob:item}; {pv:item:be} part of {nm:whole:the}.",

    cannot_wear: "{multi}{nv:char:can't:true} wear {ob:item}.",

    cannot_open: "{nv:item:can't:true} be opened.",

    cannot_wear_ensemble: '{multi}Individual parts of an ensemble must be worn and removed separately.',

    cannot_lock_with: "{nv:player:can't:true} lock that with {nm:secondItem:the}.",

    cannot_wear_over: "{nv:char:can't:true} put {nm:item:the} on over {pa:char} {nm:outer}.",

    cannot_close: "{nv:item:can't:true} be closed.",

    close_and_lock_successful: '{nv:char:close:true} {nm:container:the} and {cj:char:lock} {sb:container}.',

    cannot_lock: "{nv:char:can't:true} lock {ob:item}.",

    close_successful: '{nv:char:close:true} {nm:container:the}.',

    cannot_open_with: "{nv:player:can't:true} open that with {nm:secondItem:the}.",

    drink_successful: '{nv:char:drink:true} {nm:item:the}.',

    cannot_unlock: "{nv:char:can't:true} unlock {ob:item}.",

    drop_successful: '{nv:char:drop:true} {nm:item:the}{ifIs:params:excess:true:, that is all {nv:char:have}}.',

    cannot_unlock_with: "{nv:player:can't:true} unlock that with {nm:secondItem:the}.",

    drop_successful_counted: '{nv:char:drop:true} {number:count} {nm:item}.',

    container_recursion: "What? {nv:char:want:true} to put {nm:item:the} in {nm:container:the} when {nm:container:the} is already in {nm:item:the}? That's just too freaky for me.",

    regex: {

      MetaAutoScrollMode: /^(?:scroll|autoscroll|toggle scroll|toggle autoscroll)$/,



      MetaCredits: /^(?:about|credits|version|info)$/,



      MetaDarkMode:              /^(?:dark|dark mode|toggle dark|toggle dark mode)$/,
      //----------------------------------------------------------------------------------------------
      // Regular Expressions for Commands
      // Meta commands
      MetaHelp:                  /^help$|^\?$/,
      MetaHint:                  /^(?:hint|clue)s?$/,
      MetaImages:                /^images$/,
      MetaNarrowMode:            /^(?:narrow|narrow mode|toggle narrow|toggle narrow mode|mobile|mobile mode|toggle mobile|toggle mobile mode)$/,
      MetaIntro:                 /^intro$/,
      MetaPlainFontMode:         /^(?:font|plain font|plain fonts|fonts)$/,
      MetaBrief:                 /^brief$/,
      MetaSilent:                /^(?:sh|silent)$/,
      MetaSpoken:                /^spoken$/,
      MetaWarnings: /^warn(?:ing|ings|)$/,
      MetaTerse:                 /^terse$/,
      MetaTranscript:            /^transcript$|^script$/,
      MetaTranscriptClear:       /^transcript clear$|^script clear$|^transcript delete$|^script delete$/,
      MetaTranscriptOff:         /^transcript off$|^script off$/,
      MetaTranscriptOn:          /^transcript on$|^script on$/,
      MetaSave: /^save$/,
      MetaVerbose: /^verbose$/,
      MetaFileSaveGame: /^(?:fsave) (.+)$/,
      MetaTranscriptStart: /^transcript on$|^script start$/,
      MetaLoad: /^(?:load|reload|restore)$/,
      MetaTranscriptShow:        /^transcript show$|^script show$|^show script$|^show transcript$|^showscript$/,
      MetaFileLoadGame: /^(?:fload|freload|frestore)$/,
      MetaTranscriptWalkthrough: /^(?:transcript|script) walk$/,
      MetaDeleteGame: /^(?:delete|del) (.+)$/,
      MetaUserComment: /^(?:\*|\;)(.+)$/,
      MetaAgain: /^(?:again|g)$/,
      MetaSaveGame: /^(?:save) (.+)$/,
      MetaDir:                   /^(?:reload|load|restore|dir|directory|ls|save ls|save dir)$/,
      MetaSaveOverwriteGame: /^(?:save) (.+) (?:overwrite|ow)$/,
      MetaLoadGame:              /^(?:load|reload|restore) (.+)$/,
      MetaOops:                  /^(?:oops)$/,
      // Kind of meta    
Look: /^l$|^look$/,
      
MetaPronouns:              /^pronouns$/,

      MetaUndo: /^undo$/,

      Exits:          /^exits$/,

      MetaRestart: /^restart$/,

      Inv:            /^inventory$|^inv$|^i$/,
      MetaScore: /^score$/,
      Map:            /^map$/,
      Listen: /^listen$/,

      MetaTopicsNote: /^topics?$/,

      // Use item
Examine: /^(?:examine|exam|ex|x) (.+)$/,

      
      Smell: /^smell$|^sniff$/,
      
      LookAt: /^(?:look at|look|l) (.+)$/,

      
LookBehind:       /^(?:look behind|check behind) (.+)$/,
      // Misc
Wait: /^wait$|^z$/,
      LookInside:       /^(?:look inside|look in) (.+)$/,
      LookOut:          /^(?:look out of|look out) (.+)$/,
      PurchaseFromList: /^buy$|^purchase$/,
      Drop:             /^(?:drop|d|discard) (.+)$/,
      LookThrough:      /^(?:look|peek|peer) (?:down|through) (.+)$/,
      LookUnder:        /^(?:look under|check under) (.+)$/,
      Remove:       /^(?:remove|doff|take off|unwear) (?:my |your |his |her |)(.+)$/,
      Search:           /^(?:search) (.+)$/,
      Read:             /^(?:read|r) (.+)$/,
      Take:             /^(?:take|get|pick up|pick|t|grab) (.+)$/,
      ListenToItem:     /^(?:listen to|listen) (.+)$/,
      Wear:             /^(?:wear|don|put on) (?:my |your |his |her |)(.+)$/,
      Purchase:         /^(?:purchase|buy) (.+)$/,
      Wear2: /^put (?:my |your |his |her |)(.+) on$/,
      Remove2:          /^take (?:my |your |his |her |)(.+) off$/,
      Sell:             /^(?:sell) (.+)$/,
      Smash:            /^(?:smash|break|destroy|burst|pierce|puncture|bust) (.+)$/,
      SmellItem:        /^(?:smell|sniff) (.+)$/,
      SwitchOff2: /^(?:turn|switch|deactivate|disable) (.+) off$/,
      SwitchOn:         /^(?:turn on|switch on|active|enable) (.+)$/,
      Open: /^(?:open) (.+)$/,
      Turn:             /^(?:turn|rotate|twist) (.+)$/,
      Close: /^(?:close) (.+)$/,
      TurnLeft:     /^(?:turn|rotate|twist) (.+) (?:left|anticlockwise|anti-clockwise|widdershins)$/,
      Lock:     /^(?:lock) (.+)$/,
      TurnRight: /^(?:turn|rotate|twist) (.+) (?:right|clockwise)$/,
      LockWith: [
        /^(?:lock) (.+) (?:with|using) (.+)$/,
        { mod: { reverse: true }, regex: /^(?:use|with|using) (.+?) (?:to lock|lock) (.+)$/ },
      ],
      SwitchOn2: /^(?:turn|switch) (.+) on$/,
      OpenWith: [
        /^(?:open) (.+) (?:with|using) (.+)$/,
        { mod: { reverse: true }, regex: /^(?:use|with|using) (.+?) (?:to open|open) (.+)$/ },
      ],
      SwitchOff: /^(?:turn off|switch off) (.+)$/,
      Fill:       /^(?:fill) (.+)$/,
      Eat: /^(eat|feed on|feed|partake of|partake|dine on|dine) (.+)$/,
      Push:       /^(?:push|press) (.+)$/,
      Drink:     /^(drink|imbibe|quaff|guzzle|knock back|swig|swill|sip|down|chug) (.+)$/,
      Unlock:     /^(?:unlock) (.+)$/,
      Empty:     /^(?:empty|discharge|decant|pour out|pour) (.+)$/,
      UnlockWith: [
        /^(?:unlock) (.+) (?:with|using) (.+)$/,
        { regex: /^(?:use|with|using) (.+?) (?:to unlock|unlock) (.+)$/, mod: { reverse: true } },
      ],
      Ingest:    /^(consume|swallow|ingest) (.+)$/,
      Pull: /^(?:pull|drag) (.+)$/,
      Recline:   /^(?:recline|lie down|lie)$/,
      GetOff:    /^(?:get off|off) (.+)$/,
      ReclineOn: /^(?:recline on|recline upon|recline|lie on|lie upon|lie) (.+)$/,
      Sit:       /^(?:sit down|sit)$/,
      Make: /^(?:make|build|construct) (.+)$/,
      SitOn:     /^(?:sit on|sit upon|sit) (.+)$/,
      MakeWith: [
        /^(?:make|build|construct) (.+) (?:with|from|using) (.+)$/,
        { mod: { reverse: true }, regex: /^(?:with:from|using) (.+) (?:make|build|construct) (.+)$/ },
        { mod: { reverse: true }, regex: /^(?:use) (.+) to (?:make|build|construct) (.+)$/ },
      ],
      StandOn:   /^(?:stand on|stand upon|stand) (.+)$/,
      GoInItem: /^(?:enter|go in|in|inside|go inside|climb in|climb inside|get in|get inside) (.+)$/,

      TalkTo:    /^(?:talk to|talk|speak to|speak|converse with|converse) (.+)$/,
      GoOutItem:     /^(?:exit|go out|out|outside|go outide|leave) (.+)$/,
      Use: /^(?:use) (.+)$/,
      GoDownItem:    /^(?:go down|down|climb down|descend) (.+)$/,

      Topics: /^topics? (?:for )?(.+)$/,
      GoThroughItem: /^(?:go through|walk through) (.+)$/,
      NpcMake: [
        /^(.+), ?(?:make|build|construct) (.+)$/,
        /^(?:tell|ask|instruct) (.+) to (?:make|build|construct) (.+)$/,
      ],
      GoUpItem:      /^(?:go up|up|climb up|climb|ascend) (.+)$/,
      NpcMakeWith: [
        /^(.+), ?(?:make|build|construct) (.+) (?:with|from|using) (.+)$/,
        /^(?:tell|ask|instruct) (.+) to (?:make|build|construct) (.+) (?:with|from|using) (.+)$/,
        { regex: /^(.+), ?(?:with:from|using) (.+) (?:make|build|construct) (.+)$/, mod: { reverse: true } },
        { regex: /^(?:tell|ask|instruct) (.+) to (?:with:from|using) (.+) (?:make|build|construct) (.+)$/, mod: { reverse: true } },
        { regex: /^(.+), ?(?:use) (.+) to (?:make|build|construct) (.+)$/, mod: { reverse: true } },
        { regex: /^(?:tell|ask|instruct) (.+) to (?:use) (.+) to (?:make|build|construct) (.+)$/, mod: { reverse: true } },
      ],
      NpcGoDownItem: [
        /^(.+), ?(?:go down|down|climb down|descend) (.+)$/,
        /^(?:tell|ask|instruct) (.+) to (?:go down|down|climb down|descend) (.+)$/,
      ],
      NpcGoInItem: [
        /^(.+), ?(?:enter|go in|in|inside|go inside|climb in|climb inside|get in|get inside) (.+)$/,
        /^(?:tell|ask|instruct) (.+) to (?:enter|go in|in|inside|go inside|climb in|climb inside|get in|get inside) (.+)$/,
      ],
      NpcGoOutItem: [
        /^(.+), ?(?:exit|go out|out|outside|go outide|leave) (.+)$/,
        /^(?:tell|ask|instruct) (.+) to (?:exit|go out|out|outside|go outide|leave) (.+)$/,
      ],
      NpcGoThroughItem: [
        /^(.+), ?(?:go through|walk through) (.+)$/,
        /^(?:tell|ask|instruct) (.+) to (?:go through|walk through) (.+)$/,
      ],
      FillWith: /^(?:fill) (.+) (?:with) (.+)$/,

      NpcGoUpItem: [
        /^(.+), ?(?:go up|up|climb up|climb|ascend) (.+)$/,
        /^(?:tell|ask|instruct) (.+) to (?:go up|up|climb up|climb|ascend) (.+)$/,
      ],

      NpcStand: [/^(.+), ?(?:stand|stand up|get up)$/, /^(?:tell|ask|instruct) (.+) to (?:stand|stand up|get up)$/],

      EmptyInto:      /^(?:empty|pour out|pour|discharge|decant) (.+) (?:into|in to|in|down|onto|on to|on) (.+)$/,
      
EmptyFluidInto: /^(?:empty|pour out|pour|discharge|decant) (.+) (?:into|in to|in|down|onto|on to|on) (.+)$/,
      // Misc again
Say:         /^(say|shout|whisper|holler|scream|yell) (.+)$/,
      GetFluid:          /^(?:get|take|scoop|pick|grab)(?:| up) (.+)$/,

      Stand: /^stand$|^stand up$|^get up$/,
      NpcEmptyFluidInto: [/^(.+), ?(?:empty|pour|discharge|decant) (.+) (?:into|in to|in|down|onto|on to|on) (.+)$/, /^(?:tell|ask|instruct) (.+) to (?:empty|pour|discharge) (.+) (?:into|in to|in|down|onto|on to|on) (.+)$/],
      NpcEmptyInto:      [/^(.+), ?(?:empty|pour|discharge|decant) (.+) (?:into|in to|in|down|onto|on to|on) (.+)$/, /^(?:tell|ask|instruct) (.+) to (?:empty|pour|discharge) (.+) (?:into|in to|in|down|onto|on to|on) (.+)$/],
      NpcFillWith:       [/^(.+), ?(?:fill) (.+) (?:with) (.+)$/, /^(?:tell|ask|instruct) (.+) to (?:fill) (.+) (?:with) (.+)$/],
      NpcPutIn:          [/^(.+), ?(?:put|place|drop|insert) (.+) (?:in to|into|in|on to|onto|on) (.+)$/, /^(?:tell|ask|instruct) (.+) to (?:put|place|drop) (.+) (?:in to|into|in|on to|onto|on) (.+)$/],

      GiveTo:     /^(?:give|offer|proffer) (.+) (?:to) (.+)$/,
      NpcTakeOut: [/^(.+), ?(?:take|get|remove) (.+) (?:from|out of|out|off of|off) (.+)$/, /^(?:tell|ask|instruct) (.+) to (?:take|get|remove) (.+) (?:from|out of|out|off of|off) (.+)$/],
      Give:       /^(?:give|offer|proffer) (.+)$/,
      PutFluidIn:        /^(?:put|place|drop) (.+) (?:in to|into|in|on to|onto|on) (.+)$/,
      NpcGive:    [/^(.+), ?(?:give|offer|proffer) (.+)$/, /^(?:tell|ask|instruct) (.+) to ?(?:give|offer|proffer) (.+)$/],
      PutIn: /^(?:put|place|drop) (.+) (?:in to|into|in|on to|onto|on) (.+)$/,
      NpcGiveTo:  [/^(.+), ?(?:give|offer|proffer) (.+) (?:to) (.+)$/, /^(?:tell|ask|instruct) (.+) to ?(?:give|offer|proffer) (.+) (?:to) (.+)$/],
      TakeOut: /^(?:take|get|remove) (.+) (?:from|out of|out|off of|off) (.+)$/,

      NpcTieTo: [/^(.+), ?(?:tie|fasten|attach|connect|hook) (.+) (?:to) (.+)$/, /^(?:tell|ask|instruct) (.+) to ?(?:tie|fasten|attach) (.+) (?:to) (.+)$/],

      NpcTieUp:     [/^(.+), ?(?:tie|fasten|attach|connect|hook) (.+)$/, /^(?:tell|ask|instruct) (.+) to ?(?:tie|fasten|attach) (.+)$/],

      TieTo: /^(?:tie|fasten|attach|connect|hook) (.+) (?:to) (.+)$/,

      NpcUntie:     [/^(.+), ?(?:untie|unfasten|detach|disconnect|unhook) (.+)$/, /^(?:tell|ask|instruct) (.+) to ?(?:untie|unfasten|detach) (.+)$/],
      
NpcUntieFrom: [/^(.+), ?(?:untie|unfasten|detach) (.+) (?:frm) (.+)$/, /^(?:tell|ask|instruct) (.+) to ?(?:untie|unfasten|detach) (.+) (?:from) (.+)$/],
      //NpcGiveToMe:[/^(.+), ?(?:give) me (.+)$/, /^(?:tell|ask|instruct) (.+) to ?(?:give) me (.+)$/],
TieUp: /^(?:tie|fasten|attach|connect|hook) (.+)$/,
      AskAbout: /^(?:ask) (.+?) (about|what|who|how|why|where|when) (.+)$/,
      PushExit:     /^(push|pull|move|shift) (.+) (northwest|nw|north|n|northeast|ne|in|in|enter|i|up|u|west|w|east|e|out|out|exit|o|down|dn|d|southwest|sw|south|s|southeast|se)$/,
      NpcPushExit: [
        /^(.+), ?(push|pull|move|shift) (.+) (northwest|nw|north|n|northeast|ne|in|in|enter|i|up|u|west|w|east|e|out|out|exit|o|down|dn|d|southwest|sw|south|s|southeast|se)$/,
        /^(?:tell|ask|instruct) (.+) to (push|pull|move|shift) (.+) (northwest|nw|north|n|northeast|ne|in|in|enter|i|up|u|west|w|east|e|out|out|exit|o|down|dn|d|southwest|sw|south|s|southeast|se)$/,
      ],

      Untie: /^(?:untie|unfasten|detach|disconnect|unhook) (.+)$/,
      FollowMe: [/^(.+), ?(?:follow|follow me)$/, /^(?:tell|ask|instruct) (.+) to (?:follow|follow me)$/],
      UntieFrom: /^(?:untie|unfasten|detach) (.+) (?:from) (.+)$/,
      // Debug
DebugWalkThrough: /^wt (.+)$/,
      
UseWith: /^(?:use) (.+) (?:with|on) (.+)$/,

      TalkAbout: [
        /^(?:talk to|talk with|talk|speak to|speak with|speak) (.+?) about (what|who|how|why|where|when) (.+)$/,
        /^(?:talk to|talk with|talk|speak to|speak with|speak) (.+?) (about|what|who|how|why|where|when) (.+)$/,
      ],

      DebugInspect: /^inspect (.+)$/,

      DebugInspectByName: /^inspect2 (.+)$/,
      TellAbout: /^(?:tell) (.+?) (about|what|who|how|why|where|when) (.+)$/,
      DebugInspectCommand: /^(?:cmd) (.+)$/,
      DebugListCommands:   /^cmds$/,
      WaitHere: [
        /^(.+), ?(?:stop follow|stop following|stop follow me|stop following me|wait|wait here|stay|stay here)$/,
        /^(?:tell|ask|instruct) (.+) to (?:stop follow|stop following|stop follow me|stop following me|wait|wait here|stay|stay here)$/,
      ],
      DebugHighlight:      /^highlight$/,
      DebugListCommands2:  /^cmds2$/,
      DebugParserToggle:   /^parser$/,
      DebugTest: /^test$/,
      DebugStats:         /^stats?$/,
    },

    container_closed: '{nv:container:be:true} closed.',

    


// Quest.Templates.EDIBLE
eat_successful: '{nv:char:eat:true} {nm:item:the}.',

    
    //----------------------------------------------------------------------------------------------
// Standard Responses
// Quest.Templates.TAKEABLE
take_successful: '{nv:char:take:true} {nm:item:the}{ifIs:params:excess:true:, that is all there is}.',

    
    
    inside_container: '{nv:item:be:true} inside {nm:container:the}.',

    // This will be added to the start of the regex of a command to make an NPC command
// The saved capture group is the NPC's name
tell_to_prefixes: {
      1: '(?:tell|ask|instruct) (.+) to ',   // TELL KYLE TO GET SPOON
      2: '(.+), ?',                 // KYLE, GET SPOON
    },

    cannot_purchase_again: "{nv:char:can't:true} buy {nm:item:the} here - probably because {pv:char:be} already holding {ob:item}.",

    invHoldingPrefix: 'holding',

    take_successful_counted: "{nv:char:take:true} {number:count} {nm:item}.",

    cannot_afford: "{nv:char:can't:true} afford {nm:item:the} (need {money:money}).",

    cannot_purchase_here: "{nv:char:can't:true} buy {nm:item:the} here.",

    invWearingPrefix: 'wearing',

    cannot_sell_here: "{nv:char:can't:true} sell {nm:item:the} here.",

    not_carrying: "{multi}{pv:char:don't:true} have {if:item:countable:any:{ob:item}}.",

    cannot_sit_on: '{nv:item:be:true} not something {nv:char:can} sit on.',

    cannot_recline_on: '{nv:item:be:true} not something {nv:char:can} lie on.',

    lock_successful: '{nv:char:lock:true} {nm:container:the}.',

    locked: '{nv:container:be:true} locked.',
    
    remove_successful: "{nv:char:take:true} {nm:item:the} off.",
    
    cannot_stand_on: '{nv:item:be:true} not something {nv:char:can} stand on.',

    
cannot_switch_off: "{nv:char:can't:true} turn {ob:item} off.",

    // Quest.Templates.WEARABLE
wear_successful: "{nv:char:put:true} on {nm:item:the}.",

    cannot_switch_on: "{nv:char:can't:true} turn {ob:item} on.",

    locked_exit: 'That way is locked.',

    look_inside: 'Inside {nm:container:the} {nv:char:can} see {show:list}.',

    not_wearing: "{multi}{nv:char:be:true} not wearing {ob:item}.",

    already_empty: '{nv:source:be:true} already empty.',

    empty_into_successful: '{nv:char:empty:true} {nm:source:the} into {nm:item:the}.',
    
    look_inside_it: 'Inside {sb:container} {nv:char:can} see {show:list}.',
    
    cannot_fill: '{nv:item:be:true} not something {nv:char:can} fill.',

    
empty_onto_successful: '{nv:char:empty:true} {nm:source:the} over {nm:item:the}, and then watch it all run down on to the ground.',

    // Quest.Templates.CONTAINER, etc.
open_successful: "{nv:char:open:true} {nm:container:the}.",

    cannot_get_fluid: '{nv:char:try:true} to scoop up {show:fluid} but it all slips through {pa:char} fingers. Perhaps {pv:char:need} some kind of vessel.',

    already_full: '{pv:item:be:true} already full of {show:fluid}.',

    unlock_successful: "{nv:char:unlock:true} {nm:container:the}.",

    cannot_mix: '{nv:item:be:true} not something {nv:char:can} mix liquids in.',

    // VESSEL (but source is referred to as "item" as it is caught by the general item handling)
cannot_empty: '{nv:item:be:true} not something {nv:char:can} empty.',

    
no_key: '{nv:char:do:true} not have the right key.',
    
    no_recline_object: 'There is nothing to lie down on here.',

    component_missing: '{nv:char:need:true} {nm:missing:a} to build {nm:item:a}.',

    not_container: "{nv:container:be:true} not a container.",

    // Quest.Templates.CONSTRUCTION
component_wrong: '{nv:char:cannot:true} make {nm:item:a} from {nm:wrong:a}.',

    
not_container_not_vessel: '{nv:container:be:true} not a container. It is a vessel, they are different, alright?',
    
    not_inside: '{nv:item:be:true} not inside that.',

    construction_already: '{nm:item:the:true} has already been made.',

    open_and_enter: '{nv:char:open:true} the {show:doorName} and walk through.',

    construction_done: '{nv:char:build:true} {nm:item:a} from {show:list}.',

    try_but_locked: '{nv:char:try:true} the {show:doorName}, but it is locked.',

    empty_successful: '{nv:char:empty:true} {nm:source:the} onto the ground, and it soaks away.',
    
    unlock_and_enter: '{nv:char:unlock:true} the {show:doorName}, open it and walk through.',
    
    already_following: "'I'm already following you!'",

    
cannot_follow: "'Follow me,' {nv:char:say} to {nm:npc:the}. Being an inanimate object, {nv:char:be} not too optimistic it will do as it is told.",

    // MECHANDISE
purchase_successful: '{nv:char:buy:true} {nm:item:the} for {money:money}.',

    already_waiting: "'I'm already waiting!'",

    recline_on_successful: '{nv:char:lie:true} down on {nm:item:the}.',

    cannot_ask_about: '{nv:char:can:true} ask {ob:item} about {show:text} all {pv:char:like}, but {pv:item:be} not about to reply.',

    sell_successful: '{nv:char:sell:true} {nm:item:the} for {money:money}.',

    cannot_talk_about: '{nv:char:can:true} talk to {ob:item} about {show:text} all {pv:char:like}, but {pv:item:be} not interested.',
    
    cannot_tell_about: '{nv:char:can:true} tell {ob:item} about {show:text} all {pv:char:like}, but {pv:item:be} not interested.',

    
cannot_talk_to: '{nv:char:chat:true} to {nm:item:the} for a few moments, before releasing that {pv:item:be} not about to reply.',

    // Quest.Templates.FURNITURE
sit_on_successful: '{nv:char:sit:true} on {nm:item:the}.',

    cannot_wait: "'Wait here,' {nv:char:say} to {nm:item:the}. Being an inanimate object, {nv:char:feel} pretty confident it will do as it is told.",

    stand_on_successful: '{nv:char:stand:true} on {nm:item:the}.',

    // VESSEL
fill_successful: '{nv:char:fill:true} {nm:item:the}.',

    
no_sit_object: 'There is nothing to sit on here.',


    cannot_push:          '{pv:item:be:true} not something {nv:char:can} move around like that.',
    
    switch_off_successful: '{nv:char:switch:true} {nm:item:the} off.',

    cannot_push_up: '{pv:char:be:true} not getting {nm:item:the} up there!',

    
no_fluid_here: "There's no {show:fluid} here.",

    // Quest.Templates.SWITCHABLE
switch_on_successful: '{nv:char:switch:true} {nm:item:the} on.',

    no_fluid_here_at_all: "There's nothing to fill anything with here.",

    no_generic_fluid_here: "There's nothing to fill {sb:item} with here.",

    no_topics: '{nv:char:have:true} nothing to talk to {nm:item:the} about.',

    not_a_fluid_here: "I don't know of a liquid (or similar substance) called {show:text}.",

    not_able_to_hear: 'Doubtful {nv:item:will} be interested in anything {sb:char} has to say.',

    not_carrying_fluid: '{nv:char:be:true} not carrying anything with {show:fluid} in it.',

    not_interested_for_give: '{nv:npc:be:true} not interested in {nm:item:the}.',

    // NPC
not_npc: "{nv:char:can:true} tell {nm:item:the} to do anything {pv:char:like}, but there is no way {pv:item:'ll} do it.",

    
not_sink: 'Trying to put a liquid (or similar substance) in {nm:item:the} is just going to cause a mess.',
    
    not_vessel: '{pv:item:be:true} not a vessel.',

    not_npc_for_give: 'Realistically, {nv:item:be} not interested in anything {sb:char} might give {ob:item}.',

    not_source:              '{pv:source:be:true} not something {nv:char:can} get a liquid (or similar substance) out of.',
    npc_dead:                '{nv:char:be:true} dead.',
    npc_no_interest_in:      '{nv:char:have:true} no interest in that subject.',
    pour_into_self:          'It is not possible to pour from a vessel into the same vessel!',
    // Quest.Templates.BUTTON
    press_button_successful: '{nv:char:push:true} {nm:item:the}.',

    // Quest.Templates.SHIFTABLE
    push_exit_successful: '{nv:char:push:true} {nm:item:the} {show:dir}.',

    rope_attach_success:       '{nv:char:attach:true} {nm:item:the} to {nm:obj:the}.',

    rope_attach_verb: 'tie',

    rope_attached_verb: 'tied',

    rope_cannot_move: '{nv:item:be:true} not long enough, {nv:char:cannot} go any further.',

    rope_detach_end_ambig: 'Which end of {nm:item:the} do you want to detach?',

    rope_detach_success: '{nv:char:detach:true} {nm:item:the} from {nm:obj:the}.',
    
    rope_detach_verb: 'untie',

    // Quest.Templates.ROPE
    rope_examine_attached_both_ends: ' It is {item.attachedVerb} to both {nm:obj1:the} and {nm:obj2:the}.',
    rope_examine_attached_one_end:   ' It is {item.attachedVerb} to {nm:obj1:the}.',
    rope_examine_end_attached:       'is {item.attachedVerb} to {nm:obj:the}.',
    // Movement
go_successful:                 '{nv:char:head:true} {show:dir}.',
    
rope_examine_end_headed:         'heads into {nm:loc:the}.',

    rope_examine_end_held: 'is held by {nm:holder:the}.',

    can_go: '{nv:char:think:true} {pv:char:can} go {exits}.',

    cannot_go_in: '{pv:item:be:true} not something {nv:char:can} get inside.',

    topics_ask_list: 'Some suggestions for what to ask {nm:item:the} about: {show:list}.',

    rope_no_attachable_here: 'There is nothing here {nv:char:can} attach {nm:item:the} to.',

    cannot_go_down: '{pv:item:be:true} not something {nv:char:can} go down.',

    topics_no_ask_tell: 'This character has no ASK/ABOUT or TELL/ABOUT options set up.',

    cannot_go_out: '{pv:item:be:true} not something from which {nv:char:can} go out.',

    cannot_go_through: '{pv:item:be:true} not something {nv:char:can} get through.',

    topics_none_found: 'No suggestions for what to ask or tell {nm:item:the} available.',

    cannot_go_up: '{pv:item:be:true} not something {nv:char:can} go up.',

    topics_tell_list: 'Some suggestions for what to tell {nm:item:the} about: {show:list}.',

    cannot_listen: '{nv:item:be:true} not making any noise.',

    cannot_look_out: 'Not something {nv:char:can} look out of.',

    rope_no_end: '{nv:char:cannot:true} see either end of {nm:item:the}.',

    // General cannot Messages
cannot_read: 'Nothing worth reading there.',

    
rope_not_attachable: '{nv:char:cannot:true} attach that to anything.',
    
    rope_not_attachable_to: 'That is not something {nv:char:can} attach {nm:item:the} to.',

    cannot_smash: '{nv:item:be:true} not something {nv:char:can} break.',

    rope_not_attached: '{nv:item:be:true} not {item.attachedVerb} to anything.',

    cannot_smell: '{nv:item:have:true} no smell.',

    take_not_push: 'Just pick the thing up already!',

    cannot_turn: '{nv:item:be:true} not something {nv:char:can} turn.',

    rope_not_attached_to: '{nv:item:be:true} not attached to {nm:obj:the}.',

    cannot_use: 'No obvious way to use {ob:item}.',

    disambig_msg: 'Which do you mean?',

    rope_one_end: 'One end',

    done_msg: '{multi}Done.',

    general_obj_error: 'So I kind of get what you want to do, but not what you want to do it with.',

    rope_other_end: 'The other end',

    char_has_it: '{multi}{nv:holder:have:true} {ob:item}.',

    rope_not_detachable: '{nv:char:cannot:true} attach that to - or detach it from - anything.',

    inventory_prefix: '{nv:char:be:true} carrying',

    rope_tethered: '{nv:char:can:true} not detach {nm:item:the} from {nm:obj:the}.',

    already: '{sb:item:true} already {cj:item:be}.',

    rope_tied_both_ends_already: '{pv:item:be:true} already attached to {nm:obj1:the} and {nm:obj12:the}.',

    it_is_empty: '{pv:container:be:true} empty.',

    rope_tied_both_end: 'It is tied to something.',

    default_examine: '{pv:item:be:true} just your typical, every day {nm:item}.',

    rope_tied_one_end: 'It is tied up at this end.',

    error: 'Oh dear, I seem to have hit an error trying to handle that (F12 for more details).',

    rope_unwind: '{nv:item:unwind:true} behind {nm:char:the}.',

    no_listen: "{pv:char:can't:true} hear anything of note here.",

    no_map: 'Sorry, no map available.',

    rope_wind: '{nv:char:wind:true} in {nm:item:the}.',

    // If the player does ASK MARY ABOUT HOUSE this will appear before the response.
ask_about_intro: function (char: any, text1: any, text2: any) {
      return `{nv:char:ask:true} ${lang.getName(char, { article: Quest.Utilities.DEFINITE })} ${text2} ${text1}.`;
    },

    

no_multiples_msg: 'You cannot use multiple objects with that command.',
    
    // Quest.Templates.TRANSIT
    transit_already_here: '{nv:char:press:true} the button; nothing happens.',

    no_receiver: "There's no one here to give things to.",

    // General command fails
no_smell: "{pv:char:can't:true} smell anything here.",

    
transit_go_to_dest: '{nv:char:press:true} the button; the door closes...',
    
    none_held: '{nv:char:have:true} no {nm:item}.',

    not_that_way: "{nv:char:can't:true} go {show:dir}.",

    none_here: "There's no {nm:item} here.",

    not_enough: 'There {ifMoreThan:count:1:are:is} only {show:count} {nm:item}.',

    not_here: '{pv:item:be:true} not here.',

    // General command messages
    not_known_msg: "I don't even know where to begin with that.",

    nothing_for_sale: 'Nothing for sale here.',

    mode_brief: "Game mode is now 'brief'; no room descriptions (except with LOOK).",

    nothing_inside: "There's nothing to see inside.",

    nothing_msg: 'Nothing there to do that with.',

    nothing_there: "{nv:char:be:true} sure there's nothing there.",

    
    
    mode_silent_on: 'Game is now in silent mode.',

    
    // none_here_countable:"There's no {nm:item} here.",
// none_held_countable:"{nv:char:have:true} no {nm:item}.",
nothing_useful: "That's not going to do anything useful.",
    
    // the NPC has already been moved, so npc.loc is the destination
    npc_entering_msg(npc: any, exit: any) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const flag = npc.inSight(Quest.World.w[exit.name]);
      if (!flag) return;
      if (exit.npcEnterMsg) {
        return exit.npcEnterMsg(npc);
      }
      let s = typeof flag === 'string' ? `${flag} {nv:npc:enter}` : '{nv:npc:enter:true}';
      s    += ' {nm:room:the} from {show:dir}.';
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.msg(s, { dir: exit.reverseNice(), npc, room: Quest.World.w[exit.name] });
    },

    // Use when the NPC leaves a room; will give a message if the player can observe it
    npc_leaving_msg(npc: any, exit: any) {
      const flag = npc.inSight(exit.origin);
      if (!flag) return;
      if (exit.npcLeaveMsg) {
        return exit.npcLeaveMsg(npc);
      }
      let s = typeof flag === 'string' ? `${flag} {nv:npc:leave}` : '{nv:npc:leave:true}';
      s    += ' {nm:room:the}, heading {show:dir}.';
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.msg(s, { dir: exit.dir, npc, room: exit.origin });
    },

    
    
    
    mode_silent_off: 'Silent mode off.',

    
    //----------------------------------------------------------------------------------------------
// Complex responses (requiring functions)
// Used deep in the parser, so prefer to use function, rather than string
object_unknown_msg(name: any) {
      return `There doesn't seem to be anything you might call '${name}' here.`;
    },

    
mode_terse: "Game mode is now 'terse'; room descriptions only shown on first entering and with LOOK.",

    // use (or potentially use) different verbs in the responses, so not simple strings
say_no_one_here: "{nv:char:say:true}, '{show:text},' but no one notices.",

    mode_verbose: "Game mode is now 'verbose'; room descriptions shown every time you enter a room.",

    say_no_response: 'No one seems interested in what {nv:char:say}.',

    new_tab_failed: 'I am unable to create a new tab. This is probably because your browser is blocking me! There may be a banner across the top of the screen where you can give permission. You will need to do the command again.',

    wait_msg:        "Time passes...",

    say_no_response_full: "{nv:char:say:true}, '{show:text},' but no one seem interested.",

    say_something: "{nv:char:say:true}, '{show:text}.'",

    again_not_available: 'There are no previous commands to repeat.',

    sl_already_exists: 'File already exists. To overwrite an existing file, use SAVE [filename] OVERWRITE or SAVE [filename] OW.',

    sl_bad_format: 'Improperly formatted file. Looks like this might be for a game called "{show:title}"?',

    sl_deleted: 'Deleted.',

    
    
    
    restart_are_you_sure: 'Do you really want to restart the game? {b:[Y/N]}',

    //----------------------------------------------------------------------------------------------
// Meta-command responses
// Save/load messages
sl_dir_headings: ['Filename', 'Game', 'Ver', 'Timestamp', 'Comment'],

    sl_dir_msg: 'Ver is the version of the game that was being played when saved. Loading a save game from a different version may or may not work. You can delete a file with the DEL command. Type SAVE for general instructions on saving and loading.',

    restart_no: 'Restart cancelled',

    sl_file_loaded: 'Loaded file "{filename}"',

    helpScript() {
      if (Quest.Settings.settings.textInput) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('Type commands in the command bar to interact with the Quest.World.world.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:Movement:} To move, use the eight compass directions (or just {class:help-eg:N}, {class:help-eg:NE}, etc.). When "Num Lock" is on, you can use the number pad for all eight compass directions. Also try - and + for {class:help-eg:UP} and {class:help-eg:DOWN}, / and * for {class:help-eg:IN} and {class:help-eg:OUT}.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:Other commands:} You can also {class:help-eg:LOOK} (or just {class:help-eg:L} or 5 on the number pad), {class:help-eg:HELP} (or {class:help-eg:?}) or {class:help-eg:WAIT} (or {class:help-eg:Z} or the dot on the number pad). Other commands are generally of the form {class:help-eg:GET HAT} or {class:help-eg:PUT THE BLUE TEAPOT IN THE ANCIENT CHEST}. Experiment and see what you can do!');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg("{b:Using items: }You can use {class:help-eg:ALL} and {class:help-eg:ALL BUT} with some commands, for example {class:help-eg:TAKE ALL}, and {class:help-eg:PUT ALL BUT SWORD IN SACK}. You can also use pronouns, so {class:help-eg:LOOK AT MARY}, then {class:help-eg:TALK TO HER}. The pronoun will refer to the last subject in the last successful command, so after {class:help-eg:PUT HAT AND FUNNY STICK IN THE DRAWER}, '{class:help-eg:IT}' will refer to the funny stick (the hat and the stick are subjects of the sentence, the drawer was the object).");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:Characters: }If you come across another character, you can ask him or her to do something. Try things like {class:help-eg:MARY,PUT THE HAT IN THE BOX}, or {class:help-eg:TELL MARY TO GET ALL BUT THE KNIFE}. Depending on the game you may be able to {class:help-eg:TALK TO} a character, to {class:help-eg:ASK} or {class:help-eg:TELL} a character {class:help-eg:ABOUT} a topic, or just {class:help-eg:SAY} something and they will respond..');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:Meta-commands:} Type {class:help-eg:ABOUT} to find out about the author, {class:help-eg:SCRIPT} to learn about transcripts or {class:help-eg:SAVE} to learn about saving games. Use {class:help-eg:WARNINGS} to see any applicable sex, violence or trigger warnings.');
        let s = 'You can also use {class:help-eg:BRIEF/TERSE/VERBOSE} to control room descriptions. Use {class:help-eg:SILENT} to toggle sounds and music (if implemented).';
        if (typeof map !== 'undefined') s += ' Use {class:help-eg:MAP} to toggle/show the map.';
        if (typeof imagePane !== 'undefined') s += ' Use {class:help-eg:IMAGES} to toggle/show the image pane.';
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg(s);
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:Accessibility:} Type {class:help-eg:DARK} to toggle dark mode or {class:help-eg:SPOKEN} to toggle the text being read out. Use {class:help-eg:FONT} to toggle replacing all the fonts the author carefully chose to a standard sans-serif font. Use {class:help-eg:Quest.Templates.SCROLL} to toggle whether the text automatically scrolling.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:Mobile:} If you are on a mobile phone, type {class:help-eg:NARROW} to reduce the width of the text. Type it again to reduce it even more, and a third time to go back to standard width.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg("{b:Shortcuts:} You can often just type the first few characters of an item's name and Quest will guess what you mean.  If fact, if you are in a room with Brian, who is holding a ball, and a box, Quest should be able to work out that {class:help-eg:B,PUT B IN B} mean you want Brian to put the ball in the box.");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('You can use the up and down arrows to scroll back though your previous typed commands - especially useful if you realise you spelled something wrong. If you do not have arrow keys, use {class:help-eg:OOPS} to retrieve the last typed command so you can edit it. Use {class:help-eg:AGAIN} or just {class:help-eg:G} to repeat the last typed command.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('See also {link:here:https://github.com/ThePix/QuestJS/wiki/How-To-Play} for more details, which will open in a new tab.');
      }
      if (Quest.Settings.settings.panes !== 'none') {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'inventoryPane' does not exist on type '{... Remove this comment to see the full error message
        if (Quest.Settings.settings.inventoryPane) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg('{b:User Interface:} To interact with an object, click on its name in the side pane, and a set of possible actions will appear under it. Click on the appropriate action.');
        }
        if (Quest.Settings.settings.compassPane) {
          if (Quest.Settings.settings.symbolsForCompass) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg('You can also use the compass rose at the top to move around. Click the eye symbol, &#128065;, to look at you current location, the clock symbol to wait or &#128712; for help.');
          } else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg("You can also use the compass rose at the top to move around. Click 'Lk' to look at you current location, 'Z' to wait or '?' for help.");
          }
        }
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'additionalHelp' does not exist on type '... Remove this comment to see the full error message
      if (Quest.Settings.settings.additionalHelp !== undefined) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'additionalHelp' does not exist on type '... Remove this comment to see the full error message
        for (const s of Quest.Settings.settings.additionalHelp) Quest.IO.metamsg(s);
      }
      return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
    },
    
    sl_file_not_found: 'Load failed: File not found.',
    
    hintScript() {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg('Sorry, no hints available.');
      return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
    },

    
aboutScript() {
      Quest.IO.metamsg('{i:{show:settings:title} version {show:settings:version}} was written by {show:settings:author} using QuestJS (Quest 6) version {show:settings:questVersion}.', { settings });
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'ifdb' does not exist on type '{ performa... Remove this comment to see the full error message
      if (Quest.Settings.settings.ifdb) Quest.IO.metamsg(`IFDB number: ${Quest.Settings.settings.ifdb}`);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'thanks' does not exist on type '{ perfor... Remove this comment to see the full error message
      if (Quest.Settings.settings.thanks && Quest.Settings.settings.thanks.length > 0) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg(`{i:Thanks to:} ${Quest.Utilities.formatList(Quest.Settings.settings.thanks, { lastJoiner: lang.list_and })}.`);
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'additionalAbout' does not exist on type ... Remove this comment to see the full error message
      if (Quest.Settings.settings.additionalAbout !== undefined) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'additionalAbout' does not exist on type ... Remove this comment to see the full error message
        for (const key in Quest.Settings.settings.additionalAbout) Quest.IO.metamsg(`{i:${key}:} ${Quest.Settings.settings.additionalAbout[key]}`);
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'ifid' does not exist on type '{ performa... Remove this comment to see the full error message
      if (Quest.Settings.settings.ifid) Quest.IO.metamsg(`{i:IFDB number:} ${Quest.Settings.settings.ifid}`);
      return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
    },

    // For furniture
stop_posture: function (char: any) {
      if (!char.posture) return '';
      if (!char.postureFurniture && char.posture === 'standing') return '';
      const options = { char };
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (Quest.World.w[char.postureFurniture]) options.item = Quest.World.w[char.postureFurniture];
      char.posture          = false;
      char.postureFurniture = false;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'item' does not exist on type '{ char: an... Remove this comment to see the full error message
      return Quest.Text.processText(options.item ? '{nv:char:get:true} off {nm:item:the}.' : '{nv:char:stand:true} up.', options);
    },

    saveLoadScript() {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'localStorageDisabled' does not exist on ... Remove this comment to see the full error message
      if (!Quest.Settings.settings.localStorageDisabled) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('QuestJS offers players two ways to save your progress - to LocalStorage or to file.');

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:Saving To LocalStorage}');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('LocalStorage is a part of your computer the browser has set aside; this is the easier way to save.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('Note, however, that if you clear your browsing data (or have your browser set to do so automatically when the browser is closed) you will lose your saved games. There is also a limit to how much can be saved to LocalStorage, and if this is a big game, you may not be allowed to save to LocalStorage.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('To save your progress to LocalStorage, type {class:help-eg:SAVE [filename]}. By default, if you have already saved the game, you will not be permitted to save with the same filename, to prevent you accidentally saving when you meant to load. However, you can overwrite a file with the same name by using {class:help-eg:SAVE [filename] OVERWRITE} or just {class:help-eg:SAVE [filename] OW}.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('To load your game, refresh/reload this page in your browser, then type {class:help-eg:LOAD [filename]}.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('To see a list of all your QuestJS save games, type {class:help-eg:DIR} or {class:help-eg:LS}. You can delete a saved file with {class:help-eg:DELETE [filename]} or {class:help-eg:DEL [filename]}.');

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:Saving To File}');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('Alternatively you can save the game as a file on your computer. It is a little more hassle, but probably more reliable.');
      }
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg('To save your progress to file, type {class:help-eg:FSAVE [filename]}. The file will be saved to wherever downloaded files get saved on your computer. If there is already a file with that name, the browser will probably append a number to the name.');
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg('To load your game, refresh/reload this page in your browser, then type {class:help-eg:FLOAD}. A dialog will open up, allowing you to navigate to the downloads folder and select your file.');
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg('There is no built-in facility to list or delete games saved as files, though you can delete through your normal file manager.');

      return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
    },

    scores_not_implemented: 'Scores are not a part of this game.',
    
    sl_no_filename: 'Trying to save with no filename.',
    
    sl_saved: 'Saved file "{filename}".',

    
betaTestIntro() {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg(`This version is for beta-testing (${Quest.Settings.settings.version}); the browser reports that it is running on: ${navigator.userAgent}`);
      if (Quest.Settings.settings.textInput) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('A transcript will be automatically recorded. When you finish, do Ctrl-Enter or type SCRIPT SHOW to open the transcript in a new tab, or click the link if you reach the end of the game; it can then be saved (you should see a save button at the top) and attached to an e-mail. Alternatively, copy-and-pasted into an e-mail.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('You can add your own comments to the transcript by starting a command with *.');
      } else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('A transcript will be automatically recorded. As this game has no text input, you will need to access the transcript through the developer tools. Press F12 to show the tools, and click on the "Console" tab. Type <code>Quest.IO.io.scriptShow()</code> and press return. the transcript should appear in a new tab.');
      }
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg('If you have not already done so, I recommend checking to ensure you can see the transcript before progressing too far though the game.');
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg('PLEASE NOTE: Transcripts and save games are saved in LocalStorage; if you have this set to be deleted when you close your browser, you will lose all progress!');
      Quest.SaveLoad.saveLoad.transcriptStart();
    },
    
    // If the player does SPEAK TO MARY and Mary has some topics, this will be the menu title.
speak_to_menu_title(char: any) {
      return `Talk to ${  lang.getName(char, { article: Quest.Utilities.DEFINITE })  } about:`;
    },
    
    game_over_html: '<p>G<br/>A<br/>M<br/>E<br/>/<br/>O<br/>V<br/>E<br/>R</p>',

    
//----------------------------------------------------------------------------------------------
//  Language Data
// Misc
list_and: 'and',

    
    
    
    // If the player does TELL MARY ABOUT HOUSE this will appear before the response.
tell_about_intro: function (char: any, text1: any, text2: any) {
      return '{nv:char:tell:true} ' + lang.getName(char, { article: Quest.Utilities.DEFINITE }) + ' ' + text2 + ' ' + text1 + '.';
    },
    
    default_description: "It's just scenery.",

    
buy: 'Buy',

    // If the player does TALK TO MARY ABOUT HOUSE this will appear before the response.
talk_about_intro: function (char: any, text1: any, text2: any) {
      return "{nv:char:talk:true} to " + lang.getName(char, { article: Quest.Utilities.DEFINITE }) + " " + text2 + " " + text1 + ".";
    },

    // used in the command link in the purchase table
buy_headings: ['Item', 'Cost', ''],

    
spoken_off: "Game mode is now 'unspoken'.",
    
    spoken_on: "Game mode is now 'spoken'. Type INTRO to hear the introductory text.",

    carrying: 'carrying',

    topicsScript() {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg('Use TOPICS FOR [name] to see a list of topic suggestions to ask a character about (if implemented in this game).');
      return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
    },

    // case insenstive as used early
article_filter_regex: /^(?:the |an |a )?(.+)$/,

    
transcript_already_off: 'Transcript is already turned off.',
    
    transcript_already_on: 'Transcript is already turned on.',

    all_regex: /^(all|everything)$/,

    transcript_cleared: 'Transcript cleared.',

    all_exclude_regex: /^((all|everything) (but|bar|except)\b)/,

    click_to_continue: 'Click to continue...',

    transcript_finish: 'To see the transcript, click {cmd:SCRIPT SHOW:here}.',

    command_split_regex: /\.| then |, then |,then |, and then |,and then /i,

    transcript_off: 'Transcript is now off.',

    current_money: 'Current money',

    transcript_on: 'Transcript is now on.',

    go_pre_regex: 'go to |goto |go |head |',

    transcript_none: 'Cannot show transcript, nothing has been recorded.',

    // Change the abbrev values to suit your game (or language)
// You may want to do that in settings, which is loaded first
exit_list: [
      {
        abbrev: 'NW', key: 103, name: 'northwest', niceDir: 'the northwest', opp: 'southeast', rotate: 45, symbol: 'fa-arrow-left', type: 'compass', x: -1, y: 1, z: 0,
      },
      {
        abbrev: 'N', key: 104, name: 'north', niceDir: 'the north', opp: 'south', symbol: 'fa-arrow-up', type: 'compass', x: 0, y: 1, z: 0,
      },
      {
        abbrev: 'NE', key: 105, name: 'northeast', niceDir: 'the northeast', opp: 'southwest', rotate: 45, symbol: 'fa-arrow-up', type: 'compass', x: 1, y: 1, z: 0,
      },
      {
        abbrev: 'In', alt: 'enter', key: 111, name: 'in', niceDir: 'inside', opp: 'out', symbol: 'fa-sign-in-alt', type: 'inout',
      },
      {
        abbrev: 'U', key: 109, name: 'up', niceDir: 'above', opp: 'down', symbol: 'fa-arrow-up', type: 'vertical', x: 0, y: 0, z: 1,
      },

      {
        abbrev: 'W', key: 100, name: 'west', niceDir: 'the west', opp: 'east', symbol: 'fa-arrow-left', type: 'compass', x: -1, y: 0, z: 0,
      },
      {
        abbrev: 'L', key: 101, name: 'Look', symbol: 'fa-eye', type: 'nocmd',
      },
      {
        abbrev: 'E', key: 102, name: 'east', niceDir: 'the east', opp: 'west', symbol: 'fa-arrow-right', type: 'compass', x: 1, y: 0, z: 0,
      },
      {
        abbrev: 'Out', alt: 'exit|o|leave', key: 106, name: 'out', niceDir: 'outside', opp: 'in', symbol: 'fa-sign-out-alt', type: 'inout',
      },
      {
        abbrev: 'Dn', alt: 'd', key: 107, name: 'down', niceDir: 'below', opp: 'up', symbol: 'fa-arrow-down', type: 'vertical', x: 0, y: 0, z: -1,
      },

      {
        abbrev: 'SW', key: 97, name: 'southwest', niceDir: 'the southwest', opp: 'northeast', rotate: 45, symbol: 'fa-arrow-down', type: 'compass', x: -1, y: -1, z: 0,
      },
      {
        abbrev: 'S', key: 98, name: 'south', niceDir: 'the south', opp: 'north', symbol: 'fa-arrow-down', type: 'compass', x: 0, y: -1, z: 0,
      },
      {
        abbrev: 'SE', key: 99, name: 'southeast', niceDir: 'the southeast', opp: 'northwest', rotate: 45, symbol: 'fa-arrow-right', type: 'compass', x: 1, y: -1, z: 0,
      },
      {
        abbrev: 'Z', key: 110, name: 'Wait', symbol: 'fa-clock', type: 'nocmd',
      },
      {
        abbrev: '?', name: 'Help', symbol: 'fa-info', type: 'nocmd',
      },
    ],

    

undo_disabled: 'Sorry, UNDO is not enabled in this game.',

    undo_done: 'Undoing...',

    inside: 'inside',

    conjugations: {
      i: [
        { name: 'be', value: 'am' },
        { name: "'be", value: "'m" },
        { name: 'were', value: 'was' },  // Used in present tense for, eg "I was going to do that"
      ],
      it: [
        { name: 'be', value: 'is' },
        { name: 'were', value: 'was' },
        { name: 'have', value: 'has' },
        { name: 'can', value: 'can' },
        { name: 'will', value: 'will' },
        { name: 'mould', value: 'moulds' },
        { name: '*ould', value: 'ould' },
        { name: 'must', value: 'must' },
        { name: "don't", value: "doesn't" },
        { name: "can't", value: "can't" },
        { name: "won't", value: "won't" },
        { name: 'cannot', value: 'cannot' },
        { name: "@n't", value: "n't" },
        { name: "'ve", value: "'s" },
        { name: "'be", value: "'s" },
        { name: "'ll", value: "'ll" },
        { name: '*ay', value: 'ays' },
        { name: '*uy', value: 'uys' },
        { name: '*oy', value: 'oys' },
        { name: '*ey', value: 'eys' },
        { name: '*y', value: 'ies' },
        { name: '*ss', value: 'sses' },
        { name: '*s', value: 'sses' },
        { name: '*sh', value: 'shes' },
        { name: '*ch', value: 'ches' },
        { name: '*o', value: 'oes' },
        { name: '*x', value: 'xes' },
        { name: '*z', value: 'zes' },
        { name: '*', value: 's' },
      ],
      they: [
        { name: 'be', value: 'are' },
        { name: "'be", value: "'re" },
      ],
      we: [
        { name: 'be', value: 'are' },
        { name: "'be", value: "'re" },
      ],
      you: [
        { name: 'be', value: 'are' },
        { name: "'be", value: "'re" },
      ],
    },

    undo_not_available: 'There are no saved game-states to UNDO back to.',

    // Flag the state of an item in a list
    invModifiers: {
      dead:     'dead',
      equipped: 'equipped',
      open:     'open',
      worn:     'worn',
    },
    
    transcriptScript() {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg('The TRANSCRIPT or SCRIPT commands can be used to handle recording the input and output. This can be very useful when testing a game, as the author can go back through it and see exactly what happened, and how the user got there.');
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg('Use SCRIPT ON to turn on recording and SCRIPT OFF to turn it off. To clear the stored data, use SCRIPT CLEAR. To clear the old data and turn recording on in one step, use SCRIPT START.');
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg('Use SCRIPT SHOW to display it - it will appear in a new tab; you will not lose your place in the game. Some browsers (Firefox especially) may block the new tab, but will probably give the option to allow it in a banner at the top. You will probably need to do the command again.');
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg('You can add a comment to the transcript by starting your text with an asterisk, {code:*}, or semi-colon, {code:;}, - Quest will record it, but otherwise just ignore it.');
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg('Everything gets saved to "LocalStorage", so will be saved between sessions. If you complete the game the text input will disappear, however if you have a transcript recording, a link will be available to access it.');
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg(`Transcript is currently: ${Quest.IO.io.transcript ? 'on' : 'off'}`);
      return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
    },

    addArticle(item: any, type: any) {
      if (!type || (type != Quest.Utilities.DEFINITE && type != Quest.Utilities.INDEFINITE)) return;
      return type === Quest.Utilities.DEFINITE ? lang.addDefiniteArticle(item) : lang.addIndefiniteArticle(item);
    },

    //----------------------------------------------------------------------------------------------
//                                   LANGUAGE FUNCTIONS
// @DOC
// ## Language Functions
// @UNDOC
// @DOC
// Returns "the " if appropriate for this item.
// If the item has 'defArticle' it returns that; if it has a proper name, returns an empty string.
addDefiniteArticle: function (item: any) {
      // test if player exists yet in case this is used during item creation
      if (Quest.World.player.ready && item.owner === Quest.World.player.name) return `${Quest.World.player.pronouns.poss_adj} `;
      if (item.owner) return `${lang.getName(Quest.World.w[item.owner], { possessive: true })} `;
      if (item.defArticle) return `${item.defArticle} `;
      return item.properNoun ? '' : 'the ';
    },

    
    
    
    
    
    
    
    
    transcriptStart() {
      const now = new Date();
      return `<p><i>Transcript started at ${now.toLocaleTimeString()} on ${now.toDateString()}</i></p>`;
    },

    // @DOC
// Returns "a " or "an " if appropriate for this item.
// If the item has 'indefArticle' it returns that; if it has a proper name, returns an empty string.
// If it starts with a vowel, it returns "an ", otherwise "a ".
addIndefiniteArticle(item: any) {
      // test if player exists yet in case this is used during item creation
      if (Quest.World.player.ready && item.owner === Quest.World.player.name) return `${Quest.World.player.pronouns.poss_adj} `;
      if (item.owner) return `${lang.getName(Quest.World.w[item.owner], { possessive: true })} `;
      if (item.indefArticle) return `${item.indefArticle} `;
      if (item.properNoun) return '';
      if (item.pronouns === lang.pronouns.plural) return 'some ';
      if (item.pronouns === lang.pronouns.massnoun) return '';
      if (/^[aeiou]/i.test(item.alias)) return 'an ';
      return 'a ';
    },

    



yes_regex: /^(y|yes)$/i,

    warningsScript() {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'warnings' does not exist on type '{ perf... Remove this comment to see the full error message
      switch (typeof Quest.Settings.settings.warnings) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        case 'undefined': Quest.IO.metamsg('No warning have been set for this game.'); break;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        case 'string': Quest.IO.metamsg(Quest.Settings.settings.warnings); break;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'warnings' does not exist on type '{ perf... Remove this comment to see the full error message
        default: for (const el of Quest.Settings.settings.warnings) Quest.IO.metamsg(el);
      }
      return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
    },

    contentsForData: {
      container: { prefix: 'containing ', suffix: '' },
      surface:   { prefix: 'with ', suffix: ' on it' },
    },

    transcriptTitle() {
      let html = '';
      html    += '<h2>QuestJS Transcript for "';
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
      html += `${Quest.Settings.settings.title}" (version ${Quest.Settings.settings.version}`;
      html += ')</h2>';
      html += '<p><a onclick="document.download()" style="cursor:pointer;border:black solid 1px;border-radius:5px;background:silver;line-height:1em">Click here</a> to save this file to your downloads folder as "transcript.html".</p>';
      html += '<hr/>';
      return html;
    },

    convertNumbers(s: any) {
      for (let i = 0; i < lang.numberUnits.length; i++) {
        const regex = new RegExp(`\\b${lang.numberUnits[i]}\\b`);
        if (regex.test(s)) s = s.replace(regex, `${i}`);
      }
      return s;
    },

    transcriptEnd() {
      const now = new Date();
      return `<p><i>Transcript ended at ${now.toLocaleTimeString()} on ${now.toDateString()}</i></p>`;
    },

    // Conjugating
    // @DOC
    // Returns the verb properly conjugated for the item, so "go" with a ball would return
    // "goes", but "go" with the player (if using second person pronouns).
    // @ts-expect-error ts-migrate(7023) FIXME: 'conjugate' implicitly has return type 'any' becau... Remove this comment to see the full error message
    conjugate(item: any, verb: any, options = {}) {
      let gender = item.pronouns.subjective;
      if (gender === 'he' || gender === 'she') {
        gender = 'it';
      }
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const arr = lang.conjugations[gender.toLowerCase()];

      if (!arr) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg(`No conjugations found: conjugations_${gender.toLowerCase()}`);
        return verb;
      }
      for (const conj of arr) {
        if (conj.name === verb) {
          return conj.value;
        }
      }

      for (const conj of arr) {
        const { name }  = conj;
        const { value } = conj;
        if (name.startsWith('@') && verb.endsWith(name.substring(1))) {
          return lang.conjugate(item, verb.substring(0, verb.length - name.length + 1)) + value;
        } if (name.startsWith('*') && verb.endsWith(name.substring(1))) {
          // @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
          return item, verb.substring(0, verb.length - name.length + 1) + value;
        }
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'capitalise' does not exist on type '{}'.
      return options.capitalise ? Quest.Utilities.sentenceCase(verb) : verb;
    },
    
    getName(item: any, options: any) {
      if (!options) options = {};
      if (!item.alias) item.alias = item.name;
      let s = '';
      // The count needs to be an item specific attribute because there could be several items in a list
      // and we need to be clear which item the count belongs to
      let count = options[`${item.name}_count`] ? options[`${item.name}_count`] : false;
      // Or we can set count_this to an attribute, and use that to get the number
      // Quest.Text.processText("Mandy watches as {nv:item:grow:false:count_this}.", {item:Quest.World.w.grown_tamarind_tree, count_this:'seedsPlanted'})
      if (options.count_this) count = item[options.count_this];
      // Or use suppressCount if we do not want the number, but do want it plural when it should
      if (!count && options.suppressCount) count = item[options.suppressCount];

      // Or if this is a countable, and loc is set, get the count from that location
      if (!count && options.loc && item.countable) count = item.countAtLoc(options.loc);

      if (item.getDisplayName) {
        options.count = count;
        s             = item.getDisplayName(options);
      } else if (item.pronouns === lang.pronouns.firstperson || item.pronouns === lang.pronouns.secondperson) {
        s = options.possessive ? item.pronouns.poss_adj : item.pronouns.subjective;
      } else {
        if (count === 'infinity') {
          s += item.infinity ? `${item.infinity} ` : 'a lot of ';
        } else if (options.article === Quest.Utilities.DEFINITE && options.suppressCount) {
          s += lang.addDefiniteArticle(item);
        } else if (!options.suppressCount && count && count > 1) {
          s += `${lang.toWords(count)} `;
        } else if (options.article === Quest.Utilities.DEFINITE) {
          s += lang.addDefiniteArticle(item);
        } else if (options.article === Quest.Utilities.INDEFINITE) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
          s += lang.addIndefiniteArticle(item, count);
        } else if (options.article === Quest.Utilities.COUNT) {
          s += 'one ';
        }
        if (item.getAdjective) {
          s += item.getAdjective();
        }
        if (!count || count === 1) {
          s += (options.enhanced && item.enhancedAlias ? item.enhancedAlias : item.alias);
        } else {
          s += item.pluralAlias;
        }
        if (options.possessive) {
          if (s.endsWith('s')) {
            s += "'";
          } else {
            s += "'s";
          }
        }
      }
      if (options.capital) s = Quest.Utilities.sentenceCase(s);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'nameTransformer' does not exist on type ... Remove this comment to see the full error message
      if (Quest.Settings.settings.nameTransformer) s = Quest.Settings.settings.nameTransformer(s, item, options);
      s += Quest.Utilities.util.getNameModifiers(item, options);
      return s;
    },

    list_nothing: 'nothing',

    getPlural(s: any) {
      if (s.match(/o$/)) return `${s}es`;
      if (s.match(/on$/)) return `${s}a`;
      if (s.match(/us$/)) return s.replace(/us$/, 'i');
      if (s.match(/um$/)) return s.replace(/um$/, 'a');
      if (s.match(/[aeiou]y$/)) return `${s}s`;
      if (s.match(/y$/)) return s.replace(/y$/, 'ies');
      if (s.match(/sis$/)) return s.replace(/sis$/, 'ses');
      if (s.match(/(s|ss|sh|ch|z|x)$/)) return `${s}es`;
      return `${s}s`;
    },

    list_nowhere: 'nowhere',

    createVerb(name: any, options = {}) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'words' does not exist on type '{}'.
      if (options.words === undefined) options.words = name.toLowerCase();
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'ing' does not exist on type '{}'.
      if (options.ing === undefined) options.ing = `${name}ing`;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'defmsg' does not exist on type '{}'.
      if (options.defmsg === undefined) options.defmsg = `${options.ing} {nm:item:the} is not going to achieve much.`;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'defmsg' does not exist on type '{}'.
      if (options.defmsg === true) options.defmsg = "{pv:item:'be:true} not something you can do that with.";
      // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
      Quest.Commands.commands.unshift(new Quest.Command.Cmd(name, {

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defmsg' does not exist on type '{}'.
        defmsg: options.defmsg,

        npcCmd: true,

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'held' does not exist on type '{}'.
          { scope: options.held ? Quest.Parser.parser.isHeld : Quest.Parser.parser.isHere },
        ],

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'words' does not exist on type '{}'.
        regex: new RegExp(`^(?:${options.words}) (.+)$`),
      }));
    },

    list_or: 'or',

    createVerbWith(name: any, options = {}) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'words' does not exist on type '{}'.
      if (options.words === undefined) options.words = name.toLowerCase();
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'ing' does not exist on type '{}'.
      if (options.ing === undefined) options.ing = `${name}ing`;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'defmsg' does not exist on type '{}'.
      if (options.defmsg === undefined) options.defmsg = `${options.ing} {nm:item:the} is not going to achieve much.`;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'defmsg' does not exist on type '{}'.
      if (options.defmsg === true) options.defmsg = "{pv:item:'be:true} not something you can do that with.";
      // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
      Quest.Commands.commands.unshift(new Quest.Command.Cmd(`${name}With`, {
        attName: name.toLowerCase(),
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defmsg' does not exist on type '{}'.
        defmsg:  options.defmsg,

        npcCmd: true,

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'held' does not exist on type '{}'.
          { scope: options.held ? Quest.Parser.parser.isHeld : Quest.Parser.parser.isHere },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isHeld },
        ],

        regexes: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'words' does not exist on type '{}'.
          new RegExp(`^(?:${options.words}) (.+) (?:using|with) (.+)$`),
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'words' does not exist on type '{}'.
          { mod: { reverse: true }, regex: new RegExp(`^(?:use|with|using) (.+) to (?:${options.words}) (.+)$`) },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'words' does not exist on type '{}'.
          { mod: { reverse: true }, regex: new RegExp(`^(?:use|with|using) (.+) (?:${options.words}) (.+)$`) },
        ],

        withScript: true,
      }));
    },

    never_mind: 'Never mind.',

    joiner_regex: /\band\b|\, ?and\b|\,/,

    // @DOC
    // Returns the name for the item, followed by the conjugated verb,
    // so "go" with a ball would return "the ball goes", but "go" with
    // a some bees would return "the bees go". For the player, (if using second person pronouns)
    // would return the pronoun "you go".
    // The first letter is capitalised if 'capitalise' is true.
    nounVerb(item: any, verb: any, options: any) {
      if (item === Quest.World.player && !Quest.World.player.useproperNoun) {
        return lang.pronounVerb(item, verb, options);
      }
      if (options.article === undefined) options.article = Quest.Utilities.DEFINITE;
      let s = `${lang.getName(item, options)} ${lang.conjugate(item, verb)}`;
      s     = s.replace(/ +\'/, "'");  // yes this is a hack!
      return options.capitalise ? Quest.Utilities.sentenceCase(s) : s;
    },

    numberTens: 'twenty;thirty;forty;fifty;sixty;seventy;eighty;ninety'.split(';'),

    numberUnits: 'zero;one;two;three;four;five;six;seven;eight;nine;ten;eleven;twelve;thirteen;fourteen;fifteen;sixteen;seventeen;eighteen;nineteen;twenty'.split(';'),

    on_top: 'on top',

    ordinalReplacements: [
      { regex: /one$/, replace: 'first' },
      { regex: /two$/, replace: 'second' },
      { regex: /three$/, replace: 'third' },
      { regex: /five$/, replace: 'fifth' },
      { regex: /eight$/, replace: 'eighth' },
      { regex: /nine$/, replace: 'ninth' },
      { regex: /twelve$/, replace: 'twelfth' },
      { regex: /y$/, replace: 'ieth' },
    ],

    // @DOC
    // Returns the pronoun for the item, followed by the conjugated verb,
    // so "go" with a ball would return "it goes", but "go" with the player (if using second person pronouns)
    // would return "you go".
    // The first letter is capitalised if 'capitalise' is true.
    pronounVerb(item: any, verb: any, options: any) {
      let s = `${item.pronouns.subjective} ${lang.conjugate(item, verb)}`;
      s     = s.replace(/ +\'/, "'");  // yes this is a hack!
      return options.capitalise ? Quest.Utilities.sentenceCase(s) : s;
    },

    pronounVerbForGroup(item: any, verb: any, options: any) {
      let s = `${item.groupPronouns().subjective} ${lang.conjugate(item.group(), verb)}`;
      s     = s.replace(/ +\'/, "'");  // yes this is a hack!
      return options.capitalise ? Quest.Utilities.sentenceCase(s) : s;
    },

    //----------------------------------------------------------------------------------------------
    // Language constructs
    pronouns: {
      female: {
        objective: 'her', poss_adj: 'her', possessive: 'hers', reflexive: 'herself', subjective: 'she',
      },
      firstperson: {
        objective: 'me', poss_adj: 'my', possessive: 'mine', reflexive: 'myself', subjective: "I",
      },
      male: {
        objective: 'him', poss_adj: 'his', possessive: 'his', reflexive: 'himself', subjective: "he",
      },
      massnoun: {
        objective: 'it', poss_adj: 'its', possessive: 'its', reflexive: 'itself', subjective: "it",
      },
      plural: {
        objective: 'them', poss_adj: 'their', possessive: 'theirs', reflexive: 'themselves', subjective: 'they',
      },
      secondperson: {
        objective: 'you', poss_adj: 'your', possessive: 'yours', reflexive: 'yourself', subjective: 'you',
      },
      thirdperson: {
        objective: 'it', poss_adj: "its", subjective: "it", possessive: 'its', reflexive: 'itself', 
},
    },

    // @DOC
    // Returns the given number in words as the ordinal, so 19 would be returned as 'nineteenth'.
    // Numbers uner -2000 and over 2000 are returned as a string of digits with 'th' appended,
    // so 2001 is returned as '2001th'.
    toOrdinal(number: any) {
      if (typeof number !== 'number') {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg('toOrdinal can only handle numbers');
        return number;
      }

      const s = lang.toWords(number);
      for (const or of lang.ordinalReplacements) {
        if (or.regex.test(s)) {
          return s.replace(or.regex, or.replace);
        }
      }
      return (`${s}th`);
    },

    // @DOC
    // Returns the given number in words, so 19 would be returned as 'nineteen'.
    // Numbers uner -2000 and over 2000 are returned as a string of digits,
    // so 2001 is returned as '2001'.
    toWords(number: any) {
      if (typeof number !== 'number') {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg('toWords can only handle numbers');
        return number;
      }

      let s = '';
      if (number < 0) {
        s      = 'minus ';
        number = -number;
      }
      if (number < 2000) {
        const hundreds = Math.floor(number / 100);
        number        %= 100;
        if (hundreds > 0) {
          s = `${s + lang.numberUnits[hundreds]} hundred`;
          if (number > 0) {
            s += ' and ';
          }
        }
        if (number < 20) {
          if (number !== 0 || s === '') {
            s += lang.numberUnits[number];
          }
        } else {
          const units = number % 10;
          const tens  = Math.floor(number / 10) % 10;
          s          += lang.numberTens[tens - 2];
          if (units !== 0) {
            s = `${s}-${lang.numberUnits[units]}`;
          }
        }
      } else {
        s = number.toString();
      }
      return (s);
    },
    
    tp_false: 'false',

    tp_true: 'true',

    verbNoun(item: any, verb: any, options: any) {
      if (item === Quest.World.player) {
        return lang.pronounVerb(item, verb, options);
      }
      if (options.article === undefined) options.article = Quest.Utilities.DEFINITE;
      let s = `${lang.conjugate(item, verb)} ${lang.getName(item, options)}`;
      s     = s.replace(/ +\'/, "'");  // yes this is a hack!
      return options.capitalise ? Quest.Utilities.sentenceCase(s) : s;
    },

    verbPronoun(item: any, verb: any, options: any) {
      let s = `${lang.conjugate(item, verb)} ${item.pronouns.subjective}`;
      s     = s.replace(/ +\'/, "'");  // yes this is a hack!
      return options.capitalise ? Quest.Utilities.sentenceCase(s) : s;
    },

    yesNo: ['Yes', 'No'],

    // Display verbs used in the side panel
    verbs: {
      close:     'Close',
      drop:      'Drop',
      examine:   'Examine',
      open:      'Open',
      remove:    'Remove',
      lookat:    'Look at',
      take:      "Take",
      eat:       'Eat',
      use: "Use",
      drink:     'Drink',
      push:      'Push',
      switchoff: 'Switch off',
      equip:     'Equip',
      switchon: "Switch on",
      attack:    'Attack',
      wear: "Wear",
      read:      'Read',
      fill:      "Fill",
      talkto: "Talk to",
      empty:     'Empty',
      reclineOn: 'Lie on',
      getOff:    'Get off',
      sitOn:     'Sit on',
      standOn:   'Stand on',
      unequip: "Unequip",
      turn:      'Turn',
    },
  };
}
