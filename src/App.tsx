import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/css/styles.scss';
import { AppHeader } from './components/AppHeader';
import { CartPage } from './pages/CartPage';
import { EditShop } from './components/EditShop';
import { Login } from './pages/LoginPage';
import { PrivetRoute } from './components/common/PrivetRoute';
import { ShopApp } from './pages/ShopApp';
import { ContextProvider } from './context/ContextProvider';
import { useCartReducer } from './hooks/useCartReducer';
import { User } from './models/user.model';

const App: React.FC = () => {
  const { cart, cartDispatch } = useCartReducer()
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)





  return (
    <div className="App">
      <ContextProvider cartCtx={{ cart, cartDispatch }} userCtx={{ loggedInUser, setLoggedInUser }} >
        <AppHeader />
        <Routes>
          <Route path='' element={<ShopApp />} >
            <Route element={<PrivetRoute condition={!!loggedInUser?.isAdmin} redirect={'/login'} />}>
              <Route path='edit' element={<EditShop />} />
            </Route>
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='cart' element={<CartPage />} />
        </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
