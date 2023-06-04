import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Cart from 'pages/Cart';
import Main from 'pages/Main';
export const PATH = {
  MAIN: '/',
  CART: '/cart',
};
const AppRouter = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path={PATH.MAIN} element={<Main />} />
        <Route path={PATH.CART} element={<Cart />} />
      </Routes>
    </>
  );
};
export default AppRouter;
