import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { DarkModalProvider } from './context/DarkModal';
import { MsgModalProvider } from './context/MsgModal';


const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <MsgModalProvider>
      <DarkModalProvider>
        <ModalProvider>
          <Provider store={store}>
              <App />
          </Provider>
        </ModalProvider>
      </DarkModalProvider>
    </MsgModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
