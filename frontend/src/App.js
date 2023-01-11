import { Header } from './component/layout'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Header />} />
      <Route path='*' element={<h1>error</h1>} />
    </Routes>
  )
}

export default App
