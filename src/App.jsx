
import { Route, Routes } from 'react-router-dom'
import Actions from './components/Actions.jsx'
import Home from './Home'
import Hooks from './components/hooks.jsx'
import { Counter } from './features/counter/Counter'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/todo" element={ <Actions/> } />
        <Route path="/hooks" element={ <Hooks/> } />
        <Route path='/counter' element={<Counter />} />
      </Routes>
    </>
  )
}

export default App
