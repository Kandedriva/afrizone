import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Productpage from './Components/Productpage';
import Carts from './Components/Carts';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Login from './Components/Login';
import CheckOut from './Components/Checkout';

function App() {
  return (
  <>
  {/* <CheckOut/> */}
  
    <Routes>
  <Route path="/" element={<Productpage />} />
  <Route path="/registration" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/cart" element={<Carts />} />

    </Routes>

  
  
  {/* <Productpage/>
  <Carts/>
  <Register/>
  <Login/> */}
  

 
 
  </>
  );
}

export default App;
