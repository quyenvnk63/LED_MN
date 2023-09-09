import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configureAppStore } from './redux/store/configureStore';
import { Provider as StoreProvider } from 'react-redux';


const store = configureAppStore();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
