export interface Ability {
  name: string;
  text: string;
  type: string;
}

export interface Attack {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: number;
}

export interface Weakness {
  type: string;
  value: string;
}

export interface CardModel {
  id: string;
  name: string;
  nationalPokedexNumber: number;
  imageUrl: string;
  imageUrlHiRes: string;
  supertype: string;
  subtype: string;
  ability: Ability;
  hp: string;
  retreatCost: string[];
  convertedRetreatCost: number;
  number: string;
  artist: string;
  rarity: string;
  series: string;
  set: string;
  setCode: string;
  text: string[];
  attacks: Attack[];
  weaknesses: Weakness[];
  type: string;
}

//types guard
export function isCardModel(obj: unknown): obj is CardModel {
  const data = obj as CardModel;

  const {
    id,
    name,
    nationalPokedexNumber,
    imageUrl,
    imageUrlHiRes,
    supertype,
    subtype,
    ability,
    hp,
    retreatCost,
    convertedRetreatCost,
    number,
    artist,
    rarity,
    series,
    set,
    setCode,
    text,
    attacks,
    weaknesses,
    type,
  } = data;

  return (
    data &&
    id !== undefined &&
    name !== undefined &&
    Number.isFinite(nationalPokedexNumber) &&
    imageUrl !== undefined &&
    imageUrlHiRes !== undefined &&
    supertype !== undefined &&
    subtype !== undefined &&
    ability !== undefined &&
    hp !== undefined &&
    Array.isArray(retreatCost) &&
    Number.isFinite(convertedRetreatCost) &&
    number !== undefined &&
    artist !== undefined &&
    rarity !== undefined &&
    series !== undefined &&
    set !== undefined &&
    setCode !== undefined &&
    Array.isArray(text) &&
    Array.isArray(attacks) &&
    Array.isArray(weaknesses) &&
    type !== undefined
  );
}
