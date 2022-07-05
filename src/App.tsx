import React, { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/css/styles.scss';
import { AppHeader } from './components/AppHeader';
import { CartPage } from './components/CartPage';
import { Login } from './components/LoginPage';
import ShopApp from './components/ShopApp';
import { useCartReducer } from './hooks/useCartReducer';
import { Cart } from './models/cart.model';
import { CartAction } from './models/cartAction.model';
import { User } from './models/user.model';

interface CartCtx {
  cart: Cart,
  cartDispatch?: React.Dispatch<CartAction>
}

interface UserCtx {
  loggedInUser: User | null
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const CartContext = createContext<CartCtx>(null!)
export const UserContext = createContext<UserCtx>(null!)

const App: React.FC = () => {
  const { cart, cartDispatch } = useCartReducer()
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)


  return (
    <div className="App">
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <CartContext.Provider value={{ cart, cartDispatch }}>
          <AppHeader />
          <Routes>
            <Route path='' element={<ShopApp />} />
            <Route path='login' element={<Login />} />
            <Route path='cart' element={<CartPage />} />
          </Routes>
        </CartContext.Provider>
      </UserContext.Provider>

    </div>
  );
}

export default App;
