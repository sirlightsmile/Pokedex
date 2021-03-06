import bem from 'bem-ts';
import React from 'react';
import { useRecoilState } from 'recoil';
import { isObjKey } from '../helper';
import { CardModel } from '../model/card_model';
import { myPokedexAtom } from '../recoil/card_recoil';
import { getStats } from '../stat_calculator';

const b = bem('Card');

const COLORS = {
  Psychic: '#f8a5c2',
  Fighting: '#f0932b',
  Fairy: '#c44569',
  Normal: '#f6e58d',
  Grass: '#badc58',
  Metal: '#95afc0',
  Water: '#3dc1d3',
  Lightning: '#f9ca24',
  Darkness: '#574b90',
  Colorless: '#FFF',
  Fire: '#eb4d4b',
};

export interface CardComponentProps {
  card: CardModel;
  canAdd: boolean;
  canUnselect: boolean;
}

function CardComponent(props: CardComponentProps) {
  const { card, canAdd, canUnselect } = props;
  const [myPokedex, setMyPokedex] = useRecoilState(myPokedexAtom);

  const onClickAdd = () => {
    const updatedPokedex = Array.from(myPokedex);
    updatedPokedex.push(card);
    setMyPokedex(updatedPokedex);
  };

  const onClickUnselect = () => {
    const updatedPokedex = myPokedex.filter((o) => o.id !== card.id);
    setMyPokedex(updatedPokedex);
  };

  const stats = getStats(card);
  let color = '';
  if (isObjKey(card.type, COLORS)) {
    color = COLORS[card.type];
  }

  const happinessIcon: JSX.Element[] = [];
  for (let i = 0; i < stats.happiness; i++) {
    happinessIcon.push(<div key={i} className={b('happiness', ['icon'])} />);
  }

  return (
    <div className={b()} style={{ backgroundColor: color }}>
      <img src={card.imageUrl} alt={card.name}></img>
      <section className={b('stats')}>
        <h1>{card.name}</h1>
        <p>HP : {stats.hp}</p>
        <p>STR : {stats.strength}</p>
        <p>WEAK : {stats.weakness}</p>
        <div className={b('happiness')}>{happinessIcon.map((o) => o)}</div>
      </section>
      <div className={b('buttons')}>
        <button className={b('buttons', ['add'])} disabled={!canAdd} onClick={onClickAdd} />
        <button className={b('buttons', ['remove'])} disabled={!canUnselect} onClick={onClickUnselect} />
      </div>
    </div>
  );
}

export default CardComponent;
