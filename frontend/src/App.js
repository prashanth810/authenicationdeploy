import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './component/Signup';
import Signin from './component/Signin';
import Loginhome from './component/Loginhome';
import 'react-toastify/ReactToastify.css';
import { useState } from 'react';
import Refreshhandler from './component/Refreshhandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const Privaterouter = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />;
  };

  return (
    <div>
      <Refreshhandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/signup" />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/home' element={<Privaterouter element={<Loginhome />} />} />
      </Routes>
    </div>
  );
}

export default App;
