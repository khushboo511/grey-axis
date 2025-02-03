
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from './ThemeProvider.jsx';
import { Provider } from 'react-redux';
import store from './app/store';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
