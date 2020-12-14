import bem from 'bem-ts';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { CardModel } from '../model/card_model';
import { myPokedexAtom } from '../recoil/card_recoil';
import CardComponent from './card_component';

const b = bem('SelectCardModal');

export interface SelectCardProps {
  cards: CardModel[];
}

function SelectCardModal(props: SelectCardProps) {
  const { cards } = props;
  const [keywords, setKeywords] = useState('');
  const myPokedex = useRecoilValue(myPokedexAtom);
  const idMap = new Set<string>(myPokedex.map((o) => o.id));

  console.log(idMap);

  const onChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  const filteredCards = keywords
    ? cards.filter((o) => !idMap.has(o.id) && o.name.toLowerCase().startsWith(keywords.toLowerCase(), 0))
    : cards.filter((o) => !idMap.has(o.id));

  return (
    <div className={b()}>
      <div className={b('search')}>
        <input type="text" placeholder="Search.." name="search" onChange={onChanged} />
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
