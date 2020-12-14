import bem from 'bem-ts';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import CardComponent from './components/card_component';
import SelectCardModal from './components/select_card_modal';
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
  const [showModal, setShowModal] = useState(false);

  const triggerModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={b()}>
      <header>
        <h1>My pokedex</h1>
      </header>
      <main>
        {cardsData.map((o, i) => {
          return <CardComponent key={i} card={o} canAdd={false} canUnselect={true}></CardComponent>;
        })}
      </main>
      <button className={b('addButton')} onClick={triggerModal}>
        Add
      </button>
      <div className={b('modal', { hidden: !showModal })} onClick={triggerModal}>
        {showModal ? <SelectCardModal cards={cardsData} /> : null}
      </div>
    </div>
  );
}

export default App;
