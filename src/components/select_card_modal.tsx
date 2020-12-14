import bem from 'bem-ts';
import React, { useState } from 'react';
import { CardModel } from '../model/card_model';
import CardComponent from './card_component';

const b = bem('SelectCardModal');

export interface SelectCardProps {
  cards: CardModel[];
}

function SelectCardModal(props: SelectCardProps) {
  const { cards } = props;
  const [keywords, setKeywords] = useState('');

  const onChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  const filteredCards = keywords
    ? cards.filter((o) => o.name.toLowerCase().startsWith(keywords.toLowerCase(), 0))
    : cards;

  return (
    <div className={b()}>
      <input type="text" placeholder="Search.." name="search" onChange={onChanged} />
      <div className={b('cards')}>
        {filteredCards.map((o, i) => {
          return <CardComponent key={i} card={o}></CardComponent>;
        })}
      </div>
    </div>
  );
}

export default SelectCardModal;
