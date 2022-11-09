import Home from './pages/Home';
import Dashboard from './pages/Dashbord';
import Onbording from './pages/Onbording';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useCookies } from 'react-cookie';

const App = () => {

  const [ cookies, setCookie, removeCookie ] = useCookies(['user'])

  const authtoken = cookies.AuthToken
 
  return  (
    <BrowserRouter>
    <Routes>
      <Route  path={"/"} element={<Home/>}/>
  
    {authtoken && <Route  path={"/dashboard"} element={<Dashboard/>}/>}
     {authtoken && <Route  path={"/onbording"} element={<Onbording/>}/>}
    </Routes>
  
    </BrowserRouter>
    );
  
}

export default App;
