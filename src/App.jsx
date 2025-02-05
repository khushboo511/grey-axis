
import { Route, Routes } from 'react-router-dom'
import Actions from './components/Actions.jsx'
import Home from './Home'
import Hooks from './components/Hooks.jsx'
import { Counter } from './features/counter/Counter'
import Pagination from './components/Pagination.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/todo" element={ <Actions/> } />
        <Route path="/hooks" element={ <Hooks/> } />
        <Route path='/counter' element={<Counter />} />
        <Route path='/products' element={<Pagination />} />
      </Routes>
    </>
  )
}

export default App
