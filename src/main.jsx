import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Store from "./store/store.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Store>
    <App />
  </Store>
)