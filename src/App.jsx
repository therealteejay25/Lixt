import { Routes } from 'react-router-dom'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Main from './pages/Main'
import Home from './pages/Home'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Main />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
