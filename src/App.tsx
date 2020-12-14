import bem from 'bem-ts';
import React from 'react';
import { useRecoilValue } from 'recoil';
import CardComponent from './components/card_component';
import { pokedexCardState } from './recoil/card_recoil';

const b = bem('App');

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

function App() {
  const cardsData = useRecoilValue(pokedexCardState);
  return (
    <div className={b()}>
      {cardsData.map((o, i) => {
        return <CardComponent key={i} card={o}></CardComponent>;
      })}
    </div>
  );
}

export default App;
