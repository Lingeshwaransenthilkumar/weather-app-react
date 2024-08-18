import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import Weatherapp from './weather_web'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*<App />*/}
    <Weatherapp/>
  </React.StrictMode>,
)
