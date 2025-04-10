import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Customers from './pages/Customers';
import Notfound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastStyles.css';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/customers' element={<Customers />} />
          </Route>
          <Route path='*' element={<Notfound />} />
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
