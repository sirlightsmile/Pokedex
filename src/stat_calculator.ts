import { clamp } from './helper';
import { CardModel } from './model/card_model';

const MIN_STATS_VALUE = 0;
const MAX_STATS_VALUE = 100;

//multiplier
const ATTACK_MULTIPLIER = 50;
const WEAKNESS_MULTIPLIER = 100;

export interface PokedexStat {
  hp: number;
  strength: string;
  weakness: string;
  damage: number;
  happiness: number;
}

export function getStats(card: CardModel) {
  const { hp, attacks, weaknesses } = card;

  const hpNum = isFinite(Number(hp)) ? Number(hp) : 0;
  const hpValue = clamp(hpNum, MIN_STATS_VALUE, MAX_STATS_VALUE);
  const strengthValue = clamp((attacks?.length ?? 0) * ATTACK_MULTIPLIER, MIN_STATS_VALUE, MAX_STATS_VALUE);
  const weaknessesValue = clamp((weaknesses?.length ?? 0) * WEAKNESS_MULTIPLIER, MIN_STATS_VALUE, MAX_STATS_VALUE);

  let totalDamage = 0;
  if (attacks && attacks.length > 0) {
    for (const data of attacks) {
      const damage = data.damage.replace(/[^0-9]/g, '');
      if (Number.isFinite(Number(damage))) {
        totalDamage += Number(damage);
      } else {
        throw Error(`Invalid damage ${damage}`);
      }
    }
  }

  const happinessValue = (hpValue / 10 + totalDamage / 10 + 10 - weaknessesValue) / 5;
  const stats: PokedexStat = {
    hp: hpValue,
    strength: strengthValue.toString() + '%',
    weakness: weaknessesValue.toString() + '%',
    damage: totalDamage,
    happiness: happinessValue,
  };

  return stats;
}
