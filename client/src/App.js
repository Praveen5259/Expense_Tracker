import {Routes, Route} from 'react-router-dom'
import Login from './login'
import Register from './register'
import Dashboard from './dashboard'
import Header from './header'
import Home from './home'
import AddExpense from './add-expense'
import WholeData from './wholeData'
const App = () => {

  return <div>
    <Header />
    <Routes>
    <Route element={<Login />} path='/login'/>
    <Route element={<Register />} path='/register'/>
    <Route element={<Dashboard />} path='/dashboard'/>
    <Route element={<Home />} path='/'/>
    <Route element={<AddExpense />} path='/add-expense'/>
    <Route element={<WholeData/>} path='/wholeData'></Route>
    </Routes>
    </div>
}
export default App