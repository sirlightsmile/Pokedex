import bem from 'bem-ts';
import React from 'react';
import { CardModel } from '../model/card_model';
import { getStats } from '../stat_calculator';

const b = bem('Card');

export interface CardComponentProps {
  card: CardModel;
}

function CardComponent(props: CardComponentProps) {
  const { card } = props;

  const stats = getStats(card);

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
    </div>
  );
}

export default CardComponent;
