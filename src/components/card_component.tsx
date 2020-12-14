import bem from 'bem-ts';
import React from 'react';
import { CardModel } from '../model/card_model';
import { getStats } from '../stat_calculator';

const b = bem('Card');

export interface CardComponentProps {
  card: CardModel;
  canAdd: boolean;
  canUnselect: boolean;
}

function CardComponent(props: CardComponentProps) {
  const { card, canAdd, canUnselect } = props;

  const stats = getStats(card);

  const onClickAdd = () => {
    //TODO: add card to deck
  };

  const onClickUnselect = () => {
    //TODO: unselect card from deck
  };

  return (
    <div className={b()}>
      <img src={card.imageUrl}></img>
      <section className={b('stats')}>
        <h1>{card.name}</h1>
        <p>HP : {stats.hp}</p>
        <p>STR : {stats.strength}</p>
        <p>WEAK : {stats.weakness}</p>
        <p>HAPPINESS : {stats.happiness}</p>
      </section>
      <div className={b('buttons')}>
        <button disabled={!canAdd}>Add</button>
        <button disabled={!canUnselect}>Unselect</button>
      </div>
    </div>
  );
}

export default CardComponent;
