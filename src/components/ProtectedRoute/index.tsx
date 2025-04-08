// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../contexts';

export default function ProtectedRoute() {
  const { userName } = useUser();

  if (!userName) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}
