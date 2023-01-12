import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Home } from './component'
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route path='*' element={<h1>error</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
