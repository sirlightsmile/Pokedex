import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <RecoilRoot>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </RecoilRoot>,
  document.getElementById('root')
);
