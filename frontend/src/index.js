import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Routes, Route } from 'react-router-dom'

import App from './App'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='*' element={<h1>error</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
