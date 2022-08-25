import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Offline, Online } from 'react-detect-offline';
import ChromeDinoGame from 'react-chrome-dino';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Online>
      <BrowserRouter>
        <Provider store={store}>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </Provider>
      </BrowserRouter>
    </Online>
    <Offline>
      <ChromeDinoGame />
    </Offline>
  </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
