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
  imageUrl: string;
  imageUrlHiRes: string;
  supertype: string;
  hp: string;
  attacks?: Attack[];
  weaknesses?: Weakness[];
  type: string;
}

//types guard
export function isCardModel(obj: unknown): obj is CardModel {
  const data = obj as CardModel;

  const { id, name, imageUrl, imageUrlHiRes, supertype, hp, attacks, weaknesses, type } = data;

  return (
    data &&
    id !== undefined &&
    name !== undefined &&
    imageUrl !== undefined &&
    imageUrlHiRes !== undefined &&
    supertype !== undefined &&
    hp !== undefined &&
    (attacks === undefined || Array.isArray(attacks)) &&
    (weaknesses === undefined || Array.isArray(weaknesses)) &&
    type !== undefined
  );
}
