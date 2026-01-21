import {BrowserRouter,Routes,Route} from 'react-router-dom';
import SignUp from './component/SignUp';
import Dashboard from './component/Dashboard';
import MoneyTransfer from './component/MoneyTransfer';
import SignIn from './component/SignIn';

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/moneytransfer" element={<MoneyTransfer />} />
      <Route path="/signin" element={<SignIn />} />
      
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
