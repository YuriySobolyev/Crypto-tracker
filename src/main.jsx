import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Store from "./store/store.jsx";

import { FavoriteCryptoProvider } from './store/favoriteCryptoContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Store>
      <FavoriteCryptoProvider>
          <App />
      </FavoriteCryptoProvider>
  </Store>
)