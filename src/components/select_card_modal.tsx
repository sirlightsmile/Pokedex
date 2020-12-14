import bem from 'bem-ts';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { CardModel } from '../model/card_model';
import { myPokedexAtom } from '../recoil/card_recoil';
import CardComponent from './card_component';

const b = bem('SelectCardModal');

enum SearchTypes {
  Name = 'byName',
  Type = 'byType',
}

export interface SelectCardProps {
  cards: CardModel[];
}

function SelectCardModal(props: SelectCardProps) {
  const { cards } = props;
  const [keywords, setKeywords] = useState('');
  const [searchType, setSearchType] = useState(SearchTypes.Name);
  const myPokedex = useRecoilValue(myPokedexAtom);
  const idMap = new Set<string>(myPokedex.map((o) => o.id));

  const onKeywordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  const onSearchTypeChanged = (type: SearchTypes) => {
    setSearchType(type);
  };

  const searchMap = {
    byName: (card: CardModel) => {
      return !idMap.has(card.id) && card.name.toLowerCase().startsWith(keywords.toLowerCase(), 0);
    },
    byType: (card: CardModel) => {
      return !idMap.has(card.id) && card.type.toLowerCase().startsWith(keywords.toLowerCase(), 0);
    },
  };

  const filteredCards = keywords ? cards.filter(searchMap[searchType]) : cards.filter((o) => !idMap.has(o.id));

  return (
    <div className={b()}>
      <div className={b('search')}>
        <input
          className={b('search', ['input'])}
          type="text"
          placeholder="Search.."
          name="search"
          onChange={onKeywordChanged}
        />
        <div className={b('search', ['checkbox'])}>
          <label>
            <input
              type="checkbox"
              name="byName"
              checked={searchType === SearchTypes.Name}
              onChange={(e) => onSearchTypeChanged(SearchTypes.Name)}
            />
            By Name
          </label>
          <label>
            <input
              type="checkbox"
              name="byType"
              checked={searchType === SearchTypes.Type}
              onChange={(e) => onSearchTypeChanged(SearchTypes.Type)}
            />
            By Type
          </label>
        </div>
      </div>
      <div className={b('cards')}>
        {filteredCards.map((o, i) => {
          return <CardComponent key={i} card={o} canAdd={true} canUnselect={false}></CardComponent>;
        })}
      </div>
    </div>
  );
}

export default SelectCardModal;
