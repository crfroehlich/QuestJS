namespace Quest {
    // regular expressions

// ts-error-fixed ts-migrate(2339) FIXME: Property 'Attack' does not exist on type '{ MetaHe... Remove this comment to see the full error message
    lang.regex.Attack = /^(?:attack|att) (.+)$/;
    lang.regex.Search = /^(?:search) (.+)$/;
// ts-error-fixed ts-migrate(2339) FIXME: Property 'Equip' does not exist on type '{ MetaHel... Remove this comment to see the full error message
    lang.regex.Equip = /^(?:equip|brandish|draw) (.+)$/;
// ts-error-fixed ts-migrate(2339) FIXME: Property 'Unequip' does not exist on type '{ MetaH... Remove this comment to see the full error message
    lang.regex.Unequip = /^(?:unequip|holster|sheath|put away) (.+)$/;
// ts-error-fixed ts-migrate(2339) FIXME: Property 'LearnSpell' does not exist on type '{ Me... Remove this comment to see the full error message
    lang.regex.LearnSpell = /^(?:learn) (.+)$/;
// ts-error-fixed ts-migrate(2339) FIXME: Property 'CastSpell' does not exist on type '{ Met... Remove this comment to see the full error message
    lang.regex.CastSpell = /^(?:cast|invoke) (.+)$/;
// ts-error-fixed ts-migrate(2339) FIXME: Property 'CastSpellAt' does not exist on type '{ M... Remove this comment to see the full error message
    lang.regex.CastSpellAt = /^(?:cast|invoke) (.+) (?:at|on) (.+)$/;

    // responses

// ts-error-fixed ts-migrate(2339) FIXME: Property 'attacking' does not exist on type '{ reg... Remove this comment to see the full error message
    lang.attacking = '{nv:attacker:attack:true} {nm:target:the}.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'primarySuccess' does not exist on type '... Remove this comment to see the full error message
    lang.primarySuccess = 'A hit!';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'primaryFailure' does not exist on type '... Remove this comment to see the full error message
    lang.primaryFailure = 'A miss!';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'noTarget' does not exist on type '{ rege... Remove this comment to see the full error message
    lang.noTarget = 'No target found for attack';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'equip' does not exist on type '{ regex: ... Remove this comment to see the full error message
    lang.equip = '{nv:char:draw:true} {nm:item:the}.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'unequip' does not exist on type '{ regex... Remove this comment to see the full error message
    lang.unequip = '{nv:char:put:true} away {nm:item:the}.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'unequipAndEquip' does not exist on type ... Remove this comment to see the full error message
    lang.unequipAndEquip = '{nv:char:put:true} away {show:list}, and equip {nm:item:the}.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'castSpell' does not exist on type '{ reg... Remove this comment to see the full error message
    lang.castSpell = '{nv:attacker:cast:true} the {i:{nm:skill}} spell.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'castSpellFrom' does not exist on type '{... Remove this comment to see the full error message
    lang.castSpellFrom = '{nv:attacker:cast:true} the {i:{nm:skill}} spell from {nm:source:the}.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'drinkPotion' does not exist on type '{ r... Remove this comment to see the full error message
    lang.drinkPotion = '{nv:attacker:drink:true} {nm:source:the}, casting the {i:{nm:skill}} spell.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultEffectExpires' does not exist on ... Remove this comment to see the full error message
    lang.defaultEffectExpires = 'The {i:{show:effect:alias}} effect on {nm:target:the} expires.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'damageReport' does not exist on type '{ ... Remove this comment to see the full error message
    lang.damageReport = 'The attack does {show:modifiedDamage} hits, {nms:target:the} health is now {show:target:health}.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'wayGuarded' does not exist on type '{ re... Remove this comment to see the full error message
    lang.wayGuarded = 'The way {show:exit:dir} is guarded!';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'summonSpellPre' does not exist on type '... Remove this comment to see the full error message
    lang.summonSpellPre = 'Summon';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'summonSpellDesc' does not exist on type ... Remove this comment to see the full error message
    lang.summonSpellDesc = function (spell: any) {
      return `Summons a ${spell.prototype.alias}; it will last about ${spell.duration} turns, unless it is destroyed before then.`;
    };

// ts-error-fixed ts-migrate(2339) FIXME: Property 'communeWithAnimalSpell' does not exist o... Remove this comment to see the full error message
    lang.communeWithAnimalSpell = 'Commune with animal';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'cannotTalkToBeast' does not exist on typ... Remove this comment to see the full error message
    lang.cannotTalkToBeast = '{nv:char:spend:true} a few minutes telling {nm:item:the} about {pa:char} life, but {pv:item:do} not seem interested. Possibly because {pv:item:be} just a dumb beast.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'teleport' does not exist on type '{ rege... Remove this comment to see the full error message
    lang.teleport = '{nv:attacker:feel:true} disorientated and the Quest.World.world around {sb:attacker} dissolves. A moment later, {nv:attacker:be} somewhere else.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'summoning_successful' does not exist on ... Remove this comment to see the full error message
    lang.summoning_successful = '{nv:item:appear:true} before {nm:attacker:the}.';

// ts-error-fixed ts-migrate(2339) FIXME: Property 'deadAddendum' does not exist on type '{ ... Remove this comment to see the full error message
    lang.deadAddendum = ' {pv:item:be:true} dead.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'asleepAddendum' does not exist on type '... Remove this comment to see the full error message
    lang.asleepAddendum = ' {pv:item:be:true} sleeping.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'injuredAddendum' does not exist on type ... Remove this comment to see the full error message
    lang.injuredAddendum = ' {pv:item:be:true} somewhat injured.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'badlyInjuredAddendum' does not exist on ... Remove this comment to see the full error message
    lang.badlyInjuredAddendum = ' {pv:item:be:true} badly injured.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'searchAlive' does not exist on type '{ r... Remove this comment to see the full error message
    lang.searchAlive = '{nv:char:think:true} searching {nm:item:the} whilst {pv:item:be} alive and awake is a bad idea.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'searchNothing' does not exist on type '{... Remove this comment to see the full error message
    lang.searchNothing = '{nv:char:search:true} {nm:item:the}, but find nothing.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'deathGeneral' does not exist on type '{ ... Remove this comment to see the full error message
    lang.deathGeneral = '{nv:target:fall:true} down, dead.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'deathConstruct' does not exist on type '... Remove this comment to see the full error message
    lang.deathConstruct = '{nv:target:fall:true} down; it seems to be inactive.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'deathUndead' does not exist on type '{ r... Remove this comment to see the full error message
    lang.deathUndead = '{nv:target:fall:true} down - no longer undead, merely dead.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'deathUndeadNoCorpse' does not exist on t... Remove this comment to see the full error message
    lang.deathUndeadNoCorpse = '{nv:target:vanish:true}, apparently defeated.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'deathElemental' does not exist on type '... Remove this comment to see the full error message
    lang.deathElemental = '{nv:target:disipate:true}, defeated.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'deathPhantom' does not exist on type '{ ... Remove this comment to see the full error message
    lang.deathPhantom = '{nv:target:vanish:true}.';
}
