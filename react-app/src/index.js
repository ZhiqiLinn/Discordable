import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { SmallModalProvider } from './context/SmallModal';
import { MsgModalProvider } from './context/MsgModal';
import { PicModalProvider } from './context/PicModal';


const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <PicModalProvider>
    <MsgModalProvider>
      <SmallModalProvider>
        <ModalProvider>
          <Provider store={store}>
              <App />
          </Provider>
        </ModalProvider>
      </SmallModalProvider>
    </MsgModalProvider>
    </PicModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
