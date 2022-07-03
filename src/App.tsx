import React, { createContext, useReducer, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/css/styles.scss';
import { AppHeader } from './components/AppHeader';
import { CartPage } from './components/CartPage';
import { Login } from './components/LoginPage';
import ShopApp from './components/ShopApp';
import { useCartReducer } from './hooks/useCartReducer';
import { Cart } from './models/cart.model';
import { CartAction } from './models/cartAction.model';

interface CartCont {
  cart: Cart,
  // setCart?: React.Dispatch<React.SetStateAction<Cart>>
  cartDispatch?: React.Dispatch<CartAction>
}
const initialContext: CartCont = {
  cart: {
    products: [],
    amount: 0
  },
}
export const CartContext = createContext(initialContext)

const App: React.FC = () => {
  // const [cart, setCart] = useState<Cart>({
  //   products: [],
  //   amount: 0
  // })
  const { cart, cartDispatch } = useCartReducer()


  return (
    <div className="App">
      <CartContext.Provider value={{ cart, cartDispatch }}>
        <AppHeader />
        <Routes>
          <Route path='/' element={<ShopApp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </CartContext.Provider>

    </div>
  );
}

export default App;
