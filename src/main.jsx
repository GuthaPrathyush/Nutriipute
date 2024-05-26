import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import WebsiteContextProvider from './Contexts/WebsiteContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <WebsiteContextProvider>
      <App />
    </WebsiteContextProvider>
)
