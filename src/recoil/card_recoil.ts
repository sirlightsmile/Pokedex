import { atom, selector } from 'recoil';
import { CardModel } from '../model/card_model';
import { GetAllCardsRequest } from '../requests/get_all_cards_request';

export const pokedexCardState = selector({
  key: 'pokedexCardState',
  get: async () => {
    try {
      const res = await new GetAllCardsRequest().start();
      return res.cards;
    } catch (e) {
      throw e;
    }
  },
});

export const myPokedexAtom = atom<CardModel[]>({
  key: 'myPokedex',
  default: [],
});
