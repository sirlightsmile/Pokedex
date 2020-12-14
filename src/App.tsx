import bem from 'bem-ts';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import CardComponent from './components/card_component';
import SelectCardModal from './components/select_card_modal';
import { myPokedexAtom, pokedexCardState } from './recoil/card_recoil';

const b = bem('App');

function App() {
  const cardsData = useRecoilValue(pokedexCardState);
  const myPokedex = useRecoilValue(myPokedexAtom);
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
        {myPokedex.map((o, i) => {
          return <CardComponent key={i} card={o} canAdd={false} canUnselect={true}></CardComponent>;
        })}
      </main>
      <button className={b('addButton')} onClick={triggerModal}>
        Add
      </button>
      <div className={b('modal', { hidden: !showModal })}>
        <div className={b('modal', ['bg'])} onClick={triggerModal}></div>
        <div className={b('modal', ['content'])}>{showModal ? <SelectCardModal cards={cardsData} /> : null}</div>
      </div>
    </div>
  );
}

export default App;
