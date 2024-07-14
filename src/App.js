import './App.css';
import Layout from './Components/Layout';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Incident from './Components/Incident';
import CreateIncident from './Components/CreateIncident';
import Home from './Components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/incidents' element={<Incident />} />
          <Route path='/incidents/:id' element={<CreateIncident />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
