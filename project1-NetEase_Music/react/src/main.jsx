import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './state'

import './index.css'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
)
