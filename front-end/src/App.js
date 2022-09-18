import './App.css';
import Nav from './pages/Nav';
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './pages/Footer';
import SignUp from './pages/SignUp';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import UpdateProduct from './pages/UpdateProduct';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/update/:id' element={<UpdateProduct />} />
          <Route path='/profile' element={<h1>Profile Product</h1>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
