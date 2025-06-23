import './App.css';
import { Routes, Route } from 'react-router-dom';
import Productpage from './Components/Productpage';
import Carts from './Components/Carts';
import Register from './Components/Register';
import Login from './Components/Login';
import CheckOut from './Components/Checkout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Productpage />} />
      {/* <Route path="/registration" element={<Register />} />
      <Route path="/login" element={<Login />} /> */}
      <Route path="/cart" element={<Carts />} />
      <Route path="/checkout" element={<CheckOut />} />
    </Routes>
  );
}

export default App;