import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.scss'
import './styles/Admin.scss'
import { LoaderProvider } from './context/LoaderContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoaderProvider>
      <App />
    </LoaderProvider>

  </React.StrictMode>,
)
