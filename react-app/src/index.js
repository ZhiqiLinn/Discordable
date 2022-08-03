import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { DarkModalProvider } from './context/DarkModal';


const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <DarkModalProvider>
      <ModalProvider>
        <Provider store={store}>
            <App />
        </Provider>
      </ModalProvider>
    </DarkModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
