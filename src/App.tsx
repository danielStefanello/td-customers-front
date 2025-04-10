import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Customers from './pages/Customers';
import Notfound from './pages/NotFound';

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
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
